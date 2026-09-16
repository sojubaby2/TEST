# ============================================================
#  알아볼괘 - 테스트 OG / 공유카드 이미지 생성 (Windows 전용)
# ------------------------------------------------------------
#  content/tests/<슬러그>.json 을 읽어서 아래를 만듭니다.
#    assets/img/og/<슬러그>-intro.png      1200x630  (테스트 소개용)
#    assets/img/og/<슬러그>-<결과id>.png   1200x630  (결과 공유 미리보기)
#    assets/img/card/<슬러그>-<결과id>.png 1080x1558 (이미지 저장 버튼용)
#
#  ※ GDI+ 는 컬러 이모지를 지원하지 않아 이모지는 흰색 라인으로 들어갑니다.
#     (기존 파이썬 생성기는 리눅스 NotoColorEmoji 를 썼는데 이 PC엔 없어요)
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\make-test-images.ps1
#           powershell ... -File tools\make-test-images.ps1 -Only food-type
# ============================================================

param([string[]] $Only)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root    = Split-Path -Parent $PSScriptRoot
$specDir = Join-Path $root 'content\tests'
$ogDir   = Join-Path $root 'assets\img\og'
$cardDir = Join-Path $root 'assets\img\card'
foreach ($d in @($ogDir, $cardDir)) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Force -Path $d | Out-Null } }

# 그리기 함수는 공용 라이브러리에서 가져옵니다
. (Join-Path $PSScriptRoot 'lib-card-image.ps1')

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$specDir = Join-Path $root 'content\tests'

$n = 0
Get-ChildItem $specDir -Filter '*.json' | Sort-Object Name | ForEach-Object {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  if ($Only -and ($Only -notcontains $slug)) { return }
  $spec = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom) | ConvertFrom-Json

  $introCol = HexColor $spec.results[0].color
  Make-OG (Join-Path $ogDir "$slug-intro.png") $introCol '' $spec.emoji $spec.title $spec.introLine1
  $n++

  foreach ($r in $spec.results) {
    $col = HexColor $r.color
    $bestR  = $spec.results | Where-Object { $_.id -eq $r.compat.best.id }  | Select-Object -First 1
    $worstR = $spec.results | Where-Object { $_.id -eq $r.compat.worst.id } | Select-Object -First 1
    Make-OG   (Join-Path $ogDir   "$slug-$($r.id).png") $col $spec.title $r.emoji $r.title $r.subtitle
    Make-Card (Join-Path $cardDir "$slug-$($r.id).png") $col $spec.title $r.emoji $r.title $r.subtitle $r.summary $r.traits $bestR $r.compat.best.reason $worstR $r.compat.worst.reason
    $n += 2
  }
  Write-Host ("  [OK] {0,-16} 이미지 {1}개" -f $slug, (1 + $spec.results.Count * 2))
}

Write-Host ''
Write-Host "이미지 $n 개 생성"
