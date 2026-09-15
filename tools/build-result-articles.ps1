# ============================================================
#  알아볼괘 - 결과 페이지 해설 주입 스크립트
# ------------------------------------------------------------
#  해설 조각은 두 가지 방식 중 편한 쪽으로 쓰면 됩니다.
#
#  (1) 결과마다 파일 하나
#      content/results/<테스트슬러그>/<결과파일명>.html
#      예) content/results/today-fortune/result-rat.html
#
#  (2) 테스트 하나당 파일 하나 (결과가 많을 때 편함)
#      content/results/<테스트슬러그>.html 안에서
#      아래 구분선으로 결과별 구간을 나눠 적습니다.
#          <!-- @@ result-1 -->
#          ...해설...
#          <!-- @@ result-2 -->
#          ...해설...
#
#  둘 다 tests/<테스트슬러그>/<결과파일명>.html 의
#  <div class="ad-slot"> 바로 위에 주입됩니다.
#
#  RESULT-ARTICLE:START ~ END 주석으로 감싸므로
#  여러 번 돌려도 교체만 되고 중복되지 않아요.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\build-result-articles.ps1
#           powershell ... -File tools\build-result-articles.ps1 -Only mbti,today-fortune
# ============================================================

[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [string[]] $Only
)

$ErrorActionPreference = 'Stop'

$root       = Split-Path -Parent $PSScriptRoot
$resultsDir = Join-Path $root 'content\results'
$testsDir   = Join-Path $root 'tests'

if (-not (Test-Path $resultsDir)) { throw "해설 폴더가 없습니다: $resultsDir" }

$startMark = '<!-- RESULT-ARTICLE:START (tools/build-result-articles.ps1 이 관리하는 영역 - 직접 수정하지 마세요) -->'
$endMark   = '<!-- RESULT-ARTICLE:END -->'

# 사이트 파일은 BOM 없는 UTF-8 이어야 합니다
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# ---------- 1단계: 조각 수집 ----------
# ForEach-Object 안에서 $jobs += 를 쓰면 부모 변수에 반영되지 않으므로
# (파이프라인 스크립트블록이 자기 스코프에 새 변수를 만들어버림) List 의 Add 를 씁니다.
$jobs = New-Object System.Collections.Generic.List[object]

# (1) 폴더 방식
Get-ChildItem $resultsDir -Directory -ErrorAction SilentlyContinue | Sort-Object Name | ForEach-Object {
  $slug = $_.Name
  if ($Only -and ($Only -notcontains $slug)) { return }
  Get-ChildItem $_.FullName -Filter '*.html' | Sort-Object Name | ForEach-Object {
    $jobs.Add([pscustomobject]@{
      Slug     = $slug
      Result   = $_.Name
      Fragment = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom).TrimEnd()
    })
  }
}

# (2) 한 파일에 여러 결과 방식
Get-ChildItem $resultsDir -File -Filter '*.html' -ErrorAction SilentlyContinue | Sort-Object Name | ForEach-Object {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  if ($Only -and ($Only -notcontains $slug)) { return }

  $text  = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom)
  $parts = [regex]::Split($text, '(?m)^\s*<!--\s*@@\s*(\S+?)\s*-->\s*$')

  # Split 결과: [머리말], 이름1, 본문1, 이름2, 본문2, ...
  for ($i = 1; $i -lt $parts.Count - 1; $i += 2) {
    $name = $parts[$i]
    if ($name -notmatch '\.html$') { $name = "$name.html" }
    $body = $parts[$i + 1].TrimEnd()
    if (-not $body.Trim()) { continue }
    $jobs.Add([pscustomobject]@{ Slug = $slug; Result = $name; Fragment = $body })
  }
}

# ---------- 2단계: 주입 ----------
$done = 0; $skipped = 0; $failed = 0
$perTest = @{}

foreach ($job in $jobs) {
  $target = Join-Path $testsDir "$($job.Slug)\$($job.Result)"

  if (-not (Test-Path $target)) {
    Write-Warning "[$($job.Slug)/$($job.Result)] 대상 파일이 없어 건너뜁니다."
    $skipped++
    continue
  }

  $html = [System.IO.File]::ReadAllText($target, $utf8NoBom)

  # 대상 파일이 쓰는 줄바꿈을 그대로 따라갑니다.
  # 고정으로 CRLF 를 쓰면 LF 파일 안에 CRLF 가 섞여 git 이 매번 수정된 것으로 봐요.
  $nl       = if ($html -match "`r`n") { "`r`n" } else { "`n" }
  $fragment = $job.Fragment -replace "`r`n", "`n"
  if ($nl -eq "`r`n") { $fragment = $fragment -replace "`n", "`r`n" }

  $block = "$startMark$nl$fragment$nl$endMark$nl$nl"

  if ($html -match [regex]::Escape($startMark)) {
    # 뒤쪽은 '개행만' 먹어야 합니다. \s* 로 두면 다음 줄(앵커)의 들여쓰기까지
    # 지워버려서 돌릴 때마다 결과가 달라져요.
    $pattern = [regex]::Escape($startMark) + '[\s\S]*?' + [regex]::Escape($endMark) + '(?:\r?\n)*'
    $updated = [regex]::Replace($html, $pattern, { $block })
  }
  else {
    $anchor = $null
    foreach ($cand in @('<div class="ad-slot">', '<p class="notice">', '<div class="footer">')) {
      if ($html.IndexOf($cand) -ge 0) { $anchor = $cand; break }
    }
    if (-not $anchor) {
      Write-Warning "[$($job.Slug)/$($job.Result)] 넣을 자리를 못 찾았습니다."
      $failed++
      continue
    }
    $idx       = $html.IndexOf($anchor)
    $lineStart = $html.LastIndexOf("`n", $idx) + 1
    $indent    = $html.Substring($lineStart, $idx - $lineStart)
    $updated   = $html.Substring(0, $lineStart) + $block + $indent + $html.Substring($idx)
  }

  if ($PSCmdlet.ShouldProcess("tests\$($job.Slug)\$($job.Result)", '결과 해설 주입')) {
    [System.IO.File]::WriteAllText($target, $updated, $utf8NoBom)
  }

  $chars = ($job.Fragment -replace '<[^>]+>', '' -replace '\s', '').Length
  if ($perTest.ContainsKey($job.Slug)) { $perTest[$job.Slug].N++; $perTest[$job.Slug].Sum += $chars }
  else { $perTest[$job.Slug] = [pscustomobject]@{ N = 1; Sum = $chars } }
  $done++
}

Write-Host ''
$perTest.GetEnumerator() | Sort-Object Name | ForEach-Object {
  Write-Host ("  [OK] {0,-22} {1,3}개 · 평균 {2,5}자" -f $_.Key, $_.Value.N, [math]::Round($_.Value.Sum / $_.Value.N, 0))
}
Write-Host ''
Write-Host "완료: $done 개 주입 / 건너뜀 $skipped / 실패 $failed"
