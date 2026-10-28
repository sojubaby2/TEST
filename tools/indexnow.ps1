# ============================================================
#  알아볼괘 - IndexNow 제출 (네이버 · 빙 등에 "새 글/바뀐 글 있어요" 알림)
# ------------------------------------------------------------
#  업데이트하기.bat 가 배포를 마친 뒤 자동으로 실행합니다.
#  sitemap.xml 의 주소들 중 지난번 제출 이후 파일 내용이 바뀐 것만 보냅니다.
#  (처음 실행할 때는 전부 보냅니다)
#  바뀐 기록은 tools\indexnow-state.json 에 남습니다. (사이트에는 안 올라감)
#
#  따로 실행하려면:  powershell -ExecutionPolicy Bypass -File tools\indexnow.ps1
#  전부 다시 보내려면: ... -File tools\indexnow.ps1 -All
# ============================================================
param([switch] $All)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root  = Split-Path -Parent $PSScriptRoot
$key   = '43df6924dd03faebdc1d6fa2e5fcb7ce'
$host_ = 'arabol.co.kr'
$state = Join-Path $PSScriptRoot 'indexnow-state.json'

# 사이트맵에서 주소 읽기
[xml]$sm = [System.IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
$urls = @($sm.urlset.url | ForEach-Object { $_.loc })

# 주소 -> 내 컴퓨터 파일
function FileOf([string] $u) {
  $p = ([System.Uri]$u).AbsolutePath.TrimStart('/')
  if ($p -eq '' -or $p.EndsWith('/')) { $p = $p + 'index.html' }
  return Join-Path $root ($p -replace '/', '\')
}

$old = @{}
if ((Test-Path $state) -and -not $All) {
  (Get-Content $state -Raw -Encoding UTF8 | ConvertFrom-Json).PSObject.Properties | ForEach-Object { $old[$_.Name] = $_.Value }
}

$new = @{}
$send = New-Object System.Collections.Generic.List[string]
foreach ($u in $urls) {
  $f = FileOf $u
  if (-not (Test-Path $f)) { continue }
  $h = (Get-FileHash $f -Algorithm SHA256).Hash
  $new[$u] = $h
  if ($old[$u] -ne $h) { $send.Add($u) }
}

if ($send.Count -eq 0) {
  Write-Host "IndexNow: 바뀐 페이지가 없어서 보낼 게 없어요."
  exit 0
}

$body = @{
  host        = $host_
  key         = $key
  keyLocation = "https://$host_/$key.txt"
  urlList     = $send.ToArray()
} | ConvertTo-Json -Depth 3

try {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
  $res = Invoke-WebRequest -Uri 'https://api.indexnow.org/indexnow' -Method Post -Body $bytes `
           -ContentType 'application/json; charset=utf-8' -UseBasicParsing
  Write-Host ("IndexNow: 페이지 {0}개를 알렸어요. (응답 {1})" -f $send.Count, $res.StatusCode)
  $new | ConvertTo-Json | Set-Content $state -Encoding UTF8
} catch {
  $code = $_.Exception.Response.StatusCode.value__
  Write-Host ("IndexNow: 알리기 실패 (응답 {0}). 다음 업데이트 때 다시 보내요." -f $code)
  if ($code -eq 403) { Write-Host "  -> 열쇠 파일이 아직 사이트에 안 올라갔을 수 있어요. 1~2분 뒤 다시 실행해 보세요." }
  if ($code -eq 422) { Write-Host "  -> 주소가 arabol.co.kr 이 아닌 게 섞였는지 확인해 주세요." }
}
