# ============================================================
#  알아볼괘 - 로컬 미리보기 서버 (Node/Python 없이 동작)
# ------------------------------------------------------------
#  사용법: powershell -ExecutionPolicy Bypass -File tools\serve.ps1
#  그다음 브라우저에서 http://localhost:8787/ 로 접속하세요.
#  끄려면 이 창에서 Ctrl+C.
# ============================================================

param([int] $Port = 8787)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

$types = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.xml'  = 'application/xml; charset=utf-8'
  '.txt'  = 'text/plain; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.svg'  = 'image/svg+xml'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "서버 시작: http://localhost:$Port/   (루트: $root)"
Write-Host "끄려면 Ctrl+C"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq '') { $rel = 'index.html' }

    $path = Join-Path $root ($rel -replace '/', '\')
    if (Test-Path $path -PathType Container) { $path = Join-Path $path 'index.html' }

    if (Test-Path $path -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.StatusCode = 200
    }
    else {
      $ctx.Response.ContentType = 'text/plain; charset=utf-8'
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: /$rel")
      $ctx.Response.StatusCode = 404
    }

    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.OutputStream.Close()
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
