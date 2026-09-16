# ============================================================
#  알아볼괘 - 사진 분석 테스트 3종의 OG 이미지 생성
# ------------------------------------------------------------
#  결과 공유 카드는 브라우저에서 직접 그리므로(내 사진을 넣을 수 있어야 해서)
#  여기서는 링크 미리보기용 OG 이미지만 만듭니다.
#
#  만드는 파일
#    assets/img/og/face-ratio-intro.png   + 얼굴형 5종
#    assets/img/og/king-face-intro.png    + 상(相) 6종
#    assets/img/og/animal-face-intro.png  + 동물상 15종
#
#  ※ GDI+ 는 컬러 이모지를 지원하지 않아 이모지는 흰색 라인으로 들어갑니다.
#     Segoe UI Emoji 에 없는 최신 이모지(🪭 🪙 🪨 등)는 두부로 나오니
#     새 이모지를 쓸 땐 먼저 렌더링을 확인하세요.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\make-face-og.ps1
# ============================================================

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root  = Split-Path -Parent $PSScriptRoot
$ogDir = Join-Path $root 'assets\img\og'
if (-not (Test-Path $ogDir)) { New-Item -ItemType Directory -Force -Path $ogDir | Out-Null }

. (Join-Path $PSScriptRoot 'lib-card-image.ps1')

# 결과 데이터는 각 테스트의 데이터 파일에서 읽습니다 (정의가 한 곳에만 있도록)
function Read-Results($jsPath, $arrayName) {
  $js = [IO.File]::ReadAllText($jsPath, [Text.Encoding]::UTF8)
  $start = $js.IndexOf('[', $js.IndexOf($arrayName))
  $json = $js.Substring($start, $js.LastIndexOf('];') - $start + 1)
  $json = $json -replace '(?m)^\s*(\w+):', '"$1":'
  $json = $json -replace '(?m),(\s*[\]\}])', '$1'
  return $json | ConvertFrom-Json
}

$n = 0

# ---------------- 내 얼굴 비율은? ----------------
$ratioTitle = '내 얼굴 비율은?'
$ratios = @(
  @{ id='long';   emoji='📏'; title='긴 얼굴형'; sub='세로로 시원하게 뻗은 비율';      color='#7C3AED' },
  @{ id='heart';  emoji='🔻'; title='역삼각형';  sub='위가 넓고 턱으로 모이는 비율';   color='#EC4899' },
  @{ id='round';  emoji='⭕'; title='둥근형';    sub='가로세로가 비슷한 넉넉한 비율';  color='#F59E0B' },
  @{ id='square'; emoji='🟦'; title='각진형';    sub='턱선이 넓고 각이 살아 있는 비율'; color='#475569' },
  @{ id='oval';   emoji='🥚'; title='계란형';    sub='가장 균형 잡힌 것으로 치는 비율'; color='#0EA5E9' }
)
Make-OG (Join-Path $ogDir 'face-ratio-intro.png') (HexColor '#7C3AED') '' '📏' `
        $ratioTitle '얼굴 특징점 68개로 진짜 재드려요'
$n++
foreach ($r in $ratios) {
  Make-OG (Join-Path $ogDir "face-ratio-$($r.id).png") (HexColor $r.color) $ratioTitle $r.emoji $r.title $r.sub
  $n++
}
Write-Host "  [OK] face-ratio   이미지 $($ratios.Count + 1)개"

# ---------------- 내가 왕이 될 상인가? ----------------
$kingTitle = '내가 왕이 될 상인가?'
Make-OG (Join-Path $ogDir 'king-face-intro.png') (HexColor '#B45309') '' '👑' `
        $kingTitle '얼굴 여섯 자리를 짚어 풀어드리리다'
$n++
$kings = Read-Results (Join-Path $root 'assets\js\king-face-data.js') 'KINGFACE_RESULTS'
foreach ($k in $kings) {
  Make-OG (Join-Path $ogDir "king-face-$($k.id).png") (HexColor $k.color) $kingTitle $k.emoji $k.title $k.subtitle
  $n++
}
Write-Host "  [OK] king-face    이미지 $($kings.Count + 1)개"

# ---------------- 사진으로 보는 동물상 ----------------
$animalTitle = '사진으로 보는 동물상'
Make-OG (Join-Path $ogDir 'animal-face-intro.png') (HexColor '#F59E0B') '' '🐾' `
        $animalTitle '얼굴 비율을 실제로 재서 찾아드려요'
$n++
$animals = Read-Results (Join-Path $root 'assets\js\animal-face-data.js') 'ANIMALFACE_RESULTS'
foreach ($a in $animals) {
  Make-OG (Join-Path $ogDir "animal-face-$($a.id).png") (HexColor $a.color) $animalTitle $a.emoji $a.title $a.subtitle
  $n++
}
Write-Host "  [OK] animal-face  이미지 $($animals.Count + 1)개"

Write-Host ''
Write-Host "OG 이미지 $n 개 생성"
