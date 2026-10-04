# ============================================================
#  알아볼괘 - 색인 정리
# ------------------------------------------------------------
#  구글 애드센스가 '가치 없는 콘텐츠'로 보는 가장 큰 원인은
#  템플릿으로 찍어낸 결과 페이지가 수백 개 색인되는 것입니다.
#
#  결과 페이지는 '사용자가 테스트를 푼 결과'이지 읽을거리가 아닙니다.
#  검색에 노출될 이유가 없고, 노출되면 비슷한 페이지가 수백 개로 보입니다.
#
#  이 스크립트가 하는 일
#    1. 모든 결과 페이지에 noindex, follow 를 넣습니다.
#       (noindex 여도 링크를 눌러 들어오는 건 그대로 됩니다 - 공유는 영향 없음)
#    2. 사이트맵을 실제 읽을거리만으로 다시 만듭니다.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\fix-indexing.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$SITE = "https://arabol.co.kr"
$TAG  = '<meta name="robots" content="noindex, follow" />'

# ---------- 1. 결과 페이지에 noindex ----------
$results = Get-ChildItem tests -Recurse -Filter "result*.html"
$added = 0; $already = 0

foreach ($f in $results) {
  $h = [System.IO.File]::ReadAllText($f.FullName)
  if ($h -match '<meta\s+name="robots"') {
    # 이미 있으면 noindex 가 들어있는지 확인하고, 아니면 바꿔줍니다
    if ($h -match '<meta\s+name="robots"[^>]*noindex') { $already++; continue }
    $h = [regex]::Replace($h, '<meta\s+name="robots"[^>]*/?>', $TAG, 1)
  }
  else {
    # <title> 바로 뒤에 넣습니다
    if ($h -notmatch '</title>') { continue }
    $h = [regex]::Replace($h, '</title>', "</title>`r`n$TAG", 1)
  }
  [System.IO.File]::WriteAllText($f.FullName, $h, (New-Object System.Text.UTF8Encoding($false)))
  $added++
}

Write-Output "[1] 결과 페이지 noindex"
Write-Output "    새로 넣음 : $added"
Write-Output "    이미 있음 : $already"
Write-Output "    합계      : $($results.Count)"

# ---------- 2. 사이트맵 다시 만들기 ----------
# 사람이 읽을 페이지만 넣습니다: 홈 / 테스트 소개 / 블로그 / 안내 페이지
$urls = @()

# 홈
$urls += [pscustomobject]@{ loc="$SITE/"; pri="1.0"; freq="daily" }

# 안내 페이지
foreach ($p in @("about","contact","privacy","terms")) {
  if (Test-Path "$p.html") {
    $urls += [pscustomobject]@{ loc="$SITE/$p.html"; pri="0.3"; freq="yearly" }
  }
}

# 테스트 소개 페이지 (결과 페이지는 넣지 않습니다)
Get-ChildItem tests -Directory | ForEach-Object {
  if (Test-Path (Join-Path $_.FullName "index.html")) {
    $urls += [pscustomobject]@{ loc="$SITE/tests/$($_.Name)/"; pri="0.9"; freq="weekly" }
  }
}

# 블로그
Get-ChildItem blog -Filter *.html | Where-Object { $_.Name -ne "index.html" } | ForEach-Object {
  $urls += [pscustomobject]@{ loc="$SITE/blog/$($_.Name)"; pri="0.7"; freq="monthly" }
}
if (Test-Path "blog\index.html") {
  $urls += [pscustomobject]@{ loc="$SITE/blog/"; pri="0.8"; freq="weekly" }
}

$today = (Get-Date).ToString("yyyy-MM-dd")
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sb.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($u in $urls) {
  [void]$sb.AppendLine("  <url>")
  [void]$sb.AppendLine("    <loc>$($u.loc)</loc>")
  [void]$sb.AppendLine("    <lastmod>$today</lastmod>")
  [void]$sb.AppendLine("    <changefreq>$($u.freq)</changefreq>")
  [void]$sb.AppendLine("    <priority>$($u.pri)</priority>")
  [void]$sb.AppendLine("  </url>")
}
[void]$sb.AppendLine('</urlset>')

[System.IO.File]::WriteAllText(
  (Join-Path $root "sitemap.xml"),
  $sb.ToString(),
  (New-Object System.Text.UTF8Encoding($false)))

Write-Output ""
Write-Output "[2] 사이트맵 다시 만듦"
Write-Output "    URL 개수 : $($urls.Count)  (이전 643)"
Write-Output "    결과 페이지는 제외했습니다"
Write-Output ""
Write-Output "완료."
