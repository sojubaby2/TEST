# ============================================================
#  알아볼괘 - 결과 페이지 해설 주입 스크립트
# ------------------------------------------------------------
#  content/results/<테스트슬러그>/<결과파일명>.html 조각을
#  tests/<테스트슬러그>/<결과파일명>.html 의
#  <div class="ad-slot"> 바로 위에 넣어줍니다.
#
#  예)  content/results/today-fortune/result-rat.html
#    -> tests/today-fortune/result-rat.html 에 주입
#
#  RESULT-ARTICLE:START ~ END 주석으로 감싸기 때문에
#  여러 번 돌려도 교체만 되고 중복되지 않아요.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\build-result-articles.ps1
#           powershell ... -File tools\build-result-articles.ps1 -Only today-fortune
# ============================================================

[CmdletBinding(SupportsShouldProcess = $true)]
param(
  # 특정 테스트만 처리. 예: -Only today-fortune,zodiac-fortune
  [string[]] $Only
)

$ErrorActionPreference = 'Stop'

$root        = Split-Path -Parent $PSScriptRoot
$resultsDir  = Join-Path $root 'content\results'
$testsDir    = Join-Path $root 'tests'

if (-not (Test-Path $resultsDir)) {
  throw "해설 폴더가 없습니다: $resultsDir"
}

$startMark = '<!-- RESULT-ARTICLE:START (tools/build-result-articles.ps1 이 관리하는 영역 - 직접 수정하지 마세요) -->'
$endMark   = '<!-- RESULT-ARTICLE:END -->'

# 사이트 파일은 BOM 없는 UTF-8 이어야 합니다
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$done = 0; $skipped = 0; $failed = 0
$perTest = @{}

Get-ChildItem $resultsDir -Directory | Sort-Object Name | ForEach-Object {
  $testSlug = $_.Name
  if ($Only -and ($Only -notcontains $testSlug)) { return }

  Get-ChildItem $_.FullName -Filter '*.html' | Sort-Object Name | ForEach-Object {
    $resultName = $_.Name
    $target = Join-Path $testsDir "$testSlug\$resultName"

    if (-not (Test-Path $target)) {
      Write-Warning "[$testSlug/$resultName] 대상 파일이 없어 건너뜁니다."
      $script:skipped++
      return
    }

    $fragment = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom).TrimEnd()
    $html     = [System.IO.File]::ReadAllText($target, $utf8NoBom)

    $block = "$startMark`r`n$fragment`r`n$endMark`r`n`r`n"

    if ($html -match [regex]::Escape($startMark)) {
      $pattern = [regex]::Escape($startMark) + '[\s\S]*?' + [regex]::Escape($endMark) + '\s*'
      $updated = [regex]::Replace($html, $pattern, { $block })
    }
    else {
      $anchor = $null
      foreach ($cand in @('<div class="ad-slot">', '<p class="notice">', '<div class="footer">')) {
        if ($html.IndexOf($cand) -ge 0) { $anchor = $cand; break }
      }
      if (-not $anchor) {
        Write-Warning "[$testSlug/$resultName] 넣을 자리를 못 찾았습니다."
        $script:failed++
        return
      }

      $idx       = $html.IndexOf($anchor)
      $lineStart = $html.LastIndexOf("`n", $idx) + 1
      $indent    = $html.Substring($lineStart, $idx - $lineStart)
      $updated   = $html.Substring(0, $lineStart) + $block + $indent + $html.Substring($idx)
    }

    if ($PSCmdlet.ShouldProcess("tests\$testSlug\$resultName", '결과 해설 주입')) {
      [System.IO.File]::WriteAllText($target, $updated, $utf8NoBom)
    }

    $chars = ($fragment -replace '<[^>]+>', '' -replace '\s', '').Length
    if ($perTest.ContainsKey($testSlug)) {
      $perTest[$testSlug].N++; $perTest[$testSlug].Sum += $chars
    } else {
      $perTest[$testSlug] = [pscustomobject]@{ N = 1; Sum = $chars }
    }
    $script:done++
  }
}

Write-Host ''
$perTest.GetEnumerator() | Sort-Object Name | ForEach-Object {
  Write-Host ("  [OK] {0,-22} {1,3}개 · 평균 {2,5}자" -f $_.Key, $_.Value.N, [math]::Round($_.Value.Sum / $_.Value.N, 0))
}
Write-Host ''
Write-Host "완료: $done 개 주입 / 건너뜀 $skipped / 실패 $failed"
