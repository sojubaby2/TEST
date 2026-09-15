# ============================================================
#  알아볼괘 - 테스트 페이지 읽을거리(아티클) 주입 스크립트
# ------------------------------------------------------------
#  content/articles/<슬러그>.html 조각을
#  tests/<슬러그>/index.html 의 <p class="notice"> 바로 위에 넣어줍니다.
#
#  ARTICLE:START ~ ARTICLE:END 주석으로 감싸기 때문에,
#  여러 번 돌려도 기존 내용을 교체만 하고 중복되지 않아요.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\build-articles.ps1
#           (미리보기만 하려면 뒤에 -WhatIf 를 붙이세요)
# ============================================================

[CmdletBinding(SupportsShouldProcess = $true)]
param(
  # 특정 테스트만 처리하고 싶을 때. 예: -Only mbti,teto-egen
  [string[]] $Only
)

$ErrorActionPreference = 'Stop'

$root        = Split-Path -Parent $PSScriptRoot
$articlesDir = Join-Path $root 'content\articles'
$testsDir    = Join-Path $root 'tests'

if (-not (Test-Path $articlesDir)) {
  throw "아티클 폴더가 없습니다: $articlesDir"
}

$startMark = '<!-- ARTICLE:START (tools/build-articles.ps1 이 관리하는 영역 - 직접 수정하지 마세요) -->'
$endMark   = '<!-- ARTICLE:END -->'

# BOM 없는 UTF-8 로 고정 (BOM 이 붙으면 브라우저에서 빈 줄이 생겨요)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$done = 0; $skipped = 0; $failed = 0

Get-ChildItem $articlesDir -Filter '*.html' | Sort-Object Name | ForEach-Object {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

  if ($Only -and ($Only -notcontains $slug)) { return }

  $target = Join-Path $testsDir "$slug\index.html"
  if (-not (Test-Path $target)) {
    Write-Warning "[$slug] tests\$slug\index.html 이 없어서 건너뜁니다."
    $script:skipped++
    return
  }

  $fragment = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom).TrimEnd()
  $html     = [System.IO.File]::ReadAllText($target, $utf8NoBom)

  $block = "$startMark`r`n$fragment`r`n$endMark`r`n`r`n"

  if ($html -match [regex]::Escape($startMark)) {
    # 이미 들어있으면 그 구간만 통째로 교체
    $pattern = [regex]::Escape($startMark) + '[\s\S]*?' + [regex]::Escape($endMark) + '\s*'
    $updated = [regex]::Replace($html, $pattern, { $block })
  }
  else {
    $anchor = '<p class="notice">'
    $idx = $html.IndexOf($anchor)
    if ($idx -lt 0) {
      # notice 가 없는 페이지는 footer 앞에 넣기
      $anchor = '<div class="footer">'
      $idx = $html.IndexOf($anchor)
    }
    if ($idx -lt 0) {
      Write-Warning "[$slug] 넣을 자리(notice/footer)를 못 찾았습니다."
      $script:failed++
      return
    }

    # 앵커 줄의 들여쓰기를 살려서 그 앞에 삽입
    $lineStart = $html.LastIndexOf("`n", $idx) + 1
    $indent    = $html.Substring($lineStart, $idx - $lineStart)
    $updated   = $html.Substring(0, $lineStart) + $block + $indent + $html.Substring($idx)
  }

  if ($PSCmdlet.ShouldProcess("tests\$slug\index.html", '읽을거리 주입')) {
    [System.IO.File]::WriteAllText($target, $updated, $utf8NoBom)
  }

  $chars = ($fragment -replace '<[^>]+>', '' -replace '\s', '').Length
  Write-Host ("  [OK] {0,-22} 본문 {1,5}자" -f $slug, $chars)
  $script:done++
}

Write-Host ''
Write-Host "완료: $done 개 주입 / 건너뜀 $skipped / 실패 $failed"
