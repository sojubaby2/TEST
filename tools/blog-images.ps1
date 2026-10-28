# ============================================================
#  알아볼괘 - 블로그 사진 내려받기 (Unsplash 무료 사진)
# ------------------------------------------------------------
#  tools\blog-images.json 에 적힌 사진들을 Unsplash 에서 받아
#  assets\img\blog\<글이름>-<번호>.jpg 로 저장합니다. (가로 1200px 로 줄여서)
#  결과는 tools\blog-images-log.txt 에 남깁니다.
#  이미 받은 파일은 건너뜁니다. 다시 받으려면 그 파일을 지우고 돌리세요.
#
#  사용법: 이 파일과 같은 폴더의 "블로그사진받기.bat" 를 더블클릭
#
#  Unsplash 사진은 상업적 이용 포함 무료(출처 표기 의무 없음, Unsplash License)
#  유료(Unsplash+) 사진은 받기가 거절되므로 자동으로 FAIL 처리됩니다.
# ============================================================
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root   = Split-Path -Parent $PSScriptRoot
$plan   = Join-Path $PSScriptRoot 'blog-images.json'
$outDir = Join-Path $root 'assets\img\blog'
$log    = Join-Path $PSScriptRoot 'blog-images-log.txt'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

$items = Get-Content $plan -Raw -Encoding UTF8 | ConvertFrom-Json
$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
$lines = New-Object System.Collections.Generic.List[string]
$ok = 0; $fail = 0; $skip = 0; $i = 0

function Get-Location([string] $u) {
  $req = [System.Net.HttpWebRequest]::Create($u)
  $req.AllowAutoRedirect = $false
  $req.UserAgent = $UA
  $req.Timeout = 30000
  try { $res = $req.GetResponse() } catch [System.Net.WebException] { $res = $_.Exception.Response }
  if ($null -eq $res) { return $null }
  $loc = $res.Headers['Location']
  $code = [int]$res.StatusCode
  $res.Close()
  if ($code -ge 300 -and $code -lt 400 -and $loc) { return $loc }
  return $null
}

Add-Type -AssemblyName System.Drawing
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]78)

foreach ($it in $items) {
  $i++
  $name = "{0}-{1}.jpg" -f $it.slug, $it.n
  $dest = Join-Path $outDir $name
  if (Test-Path $dest) { $lines.Add("$($it.slug) $($it.n) OK $name (skip)"); $skip++; $ok++; continue }
  Write-Host ("[{0}/{1}] {2}" -f $i, $items.Count, $name)
  try {
    $loc = Get-Location ("https://unsplash.com/photos/{0}/download?force=true" -f $it.id)
    if (-not $loc -or $loc -notmatch 'images\.unsplash\.com') {
      # 받기 주소가 막히면 사진 페이지의 대표 그림(og:image) 주소를 씀
      $wc0 = New-Object System.Net.WebClient
      $wc0.Headers.Add('User-Agent', $UA)
      $wc0.Encoding = [System.Text.Encoding]::UTF8
      $page = $wc0.DownloadString(("https://unsplash.com/photos/{0}" -f $it.id))
      $wc0.Dispose()
      if ($page -match 'plus\.unsplash\.com') { throw "Unsplash+ (유료) 사진이라 건너뜀" }
      $m = [regex]::Match($page, 'property="og:image"\s+content="(https://images\.unsplash\.com/[^"]+)"')
      if (-not $m.Success) { $m = [regex]::Match($page, 'content="(https://images\.unsplash\.com/photo-[^"]+)"\s+property="og:image"') }
      if (-not $m.Success) { throw "무료 받기 주소를 못 찾음" }
      $loc = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
    }
    $base = $loc.Split('?')[0]
    $src = $base + '?w=1200&q=80&fm=jpg&fit=max'
    $tmp = [System.IO.Path]::GetTempFileName()
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add('User-Agent', $UA)
    $wc.DownloadFile($src, $tmp)
    $wc.Dispose()
    # 한 번 더 다시 저장 (용량 줄이기 + 진짜 그림 파일인지 확인)
    $img = [System.Drawing.Image]::FromFile($tmp)
    $w = $img.Width; $h = $img.Height
    if ($w -gt 1200) {
      $nh = [int]($h * 1200 / $w)
      $bmp = New-Object System.Drawing.Bitmap(1200, $nh)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.DrawImage($img, 0, 0, 1200, $nh)
      $g.Dispose(); $img.Dispose()
      $bmp.Save($dest, $jpg, $ep); $bmp.Dispose()
      $w = 1200; $h = $nh
    } else {
      $img.Save($dest, $jpg, $ep); $img.Dispose()
    }
    Remove-Item $tmp -ErrorAction SilentlyContinue
    $lines.Add("$($it.slug) $($it.n) OK $name ${w}x${h}")
    $ok++
  } catch {
    $lines.Add("$($it.slug) $($it.n) FAIL $($_.Exception.Message)")
    Write-Host "   -> 실패: $($_.Exception.Message)"
    $fail++
  }
  Start-Sleep -Milliseconds 400
}

[System.IO.File]::WriteAllLines($log, $lines, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ""
Write-Host ("완료: 성공 {0}장 (이미 있던 것 {1}장 포함), 실패 {2}장" -f $ok, $skip, $fail)
Write-Host "결과 기록: tools\blog-images-log.txt"
