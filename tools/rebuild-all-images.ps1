# ============================================================
#  알아볼괘 - 기존 테스트 OG / 공유카드 이미지 전체 재생성
# ------------------------------------------------------------
#  왜 필요한가:
#   1) 기존 이미지에 옛 사이트 이름('마음캐치')이 박혀 있었어요.
#   2) 참조는 되는데 파일이 없는 이미지가 75개 있었어요(공유 미리보기 깨짐).
#
#  무엇을 하는가:
#   페이지가 실제로 참조하는 이미지만 골라서, 페이지에 적힌 내용 그대로 다시 그립니다.
#   - 결과 OG/카드 : tests/<슬러그>/result-*.html 의 정적 내용에서 추출
#   - 소개 OG      : tests/<슬러그>/index.html 에서 추출
#   - 혈액형       : 페이지가 JS로 채워지므로 assets/js/bloodtype-data.js 에서 보완
#   - home.png     : 최상위 index.html 에서 추출
#
#  어디서도 참조하지 않는 이미지(타로 카드 78장 등)는 건드리지 않습니다.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\rebuild-all-images.ps1
#           powershell ... -File tools\rebuild-all-images.ps1 -WhatIf   (계획만 보기)
# ============================================================

param([switch] $WhatIf, [string[]] $Only)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib-card-image.ps1')

$root     = Split-Path -Parent $PSScriptRoot
$testsDir = Join-Path $root 'tests'
$ogDir    = Join-Path $root 'assets\img\og'
$cardDir  = Join-Path $root 'assets\img\card'
$u        = New-Object System.Text.UTF8Encoding($false)

$BRAND_PURPLE = HexColor '7C3AED'

function Read-Text([string] $p) { return [System.IO.File]::ReadAllText($p, $u) }
function M([string] $text, [string] $pat) {
  $m = [regex]::Match($text, $pat)
  if ($m.Success) { return $m.Groups[1].Value.Trim() }
  return ''
}
# HTML 조각에서 태그/공백 정리
function Clean([string] $s) {
  $s = $s -replace '<br\s*/?>', ' '
  $s = $s -replace '<[^>]+>', ''
  $s = $s -replace '&amp;', '&' -replace '&lt;', '<' -replace '&gt;', '>' -replace '&#39;', "'" -replace '&quot;', '"'
  return ($s -replace '\s+', ' ').Trim()
}

# ---------- 1) 실제로 참조되는 이미지 이름 모으기 ----------
$refOg   = New-Object System.Collections.Generic.HashSet[string]
$refCard = New-Object System.Collections.Generic.HashSet[string]
Get-ChildItem $testsDir -Recurse -Filter *.html | ForEach-Object {
  $c = Read-Text $_.FullName
  foreach ($m in [regex]::Matches($c, 'og:image"\s+content="[^"]*/([^"/]+\.png)"')) { [void]$refOg.Add($m.Groups[1].Value) }
  foreach ($m in [regex]::Matches($c, 'assets/img/card/([^"'']+\.png)'))            { [void]$refCard.Add($m.Groups[1].Value) }
}
$homeHtml = Read-Text (Join-Path $root 'index.html')
foreach ($m in [regex]::Matches($homeHtml, 'og:image"\s+content="[^"]*/([^"/]+\.png)"')) { [void]$refOg.Add($m.Groups[1].Value) }

Write-Host ("참조되는 이미지: OG {0}개 / 카드 {1}개" -f $refOg.Count, $refCard.Count)

$madeOg = 0; $madeCard = 0; $skipped = @()

function Emit-OG([string] $file, $col, [string] $pill, [string] $emoji, [string] $title, [string] $sub) {
  if (-not $refOg.Contains($file)) { return }
  if ($WhatIf) { Write-Host "  (계획) og/$file"; $script:madeOg++; return }
  Make-OG (Join-Path $ogDir $file) $col $pill $emoji $title $sub
  $script:madeOg++
}
function Emit-Card([string] $file, $col, [string] $testName, [string] $emoji, [string] $title, [string] $sub, [string] $summary, [string[]] $traits, $bestR, [string] $bestWhy, $worstR, [string] $worstWhy) {
  if (-not $refCard.Contains($file)) { return }
  if ($WhatIf) { Write-Host "  (계획) card/$file"; $script:madeCard++; return }
  Make-Card (Join-Path $cardDir $file) $col $testName $emoji $title $sub $summary $traits $bestR $bestWhy $worstR $worstWhy
  $script:madeCard++
}

# ---------- 2) 테스트별 처리 ----------
Get-ChildItem $testsDir -Directory | Sort-Object Name | ForEach-Object {
  $slug = $_.Name
  if ($Only -and ($Only -notcontains $slug)) { return }
  $dir = $_.FullName

  $idxPath = Join-Path $dir 'index.html'
  if (-not (Test-Path $idxPath)) { return }
  $idx = Read-Text $idxPath

  $testTitle = Clean (M $idx '(?s)<section class="hero">.*?<h1>(.*?)</h1>')
  $testSub   = Clean (M $idx '(?s)<section class="hero">.*?<h1>.*?</h1>\s*<p>(.*?)</p>')
  $testEmoji = Clean (M $idx '(?s)<section class="hero">.*?<div style="font-size:56px[^"]*">(.*?)</div>')
  if (-not $testTitle) { $testTitle = Clean (M $idx '<title>(.*?)</title>') -replace '\s*\|\s*알아볼괘.*$', '' }

  # 결과 페이지들
  $results = @()
  Get-ChildItem $dir -Filter 'result-*.html' -ErrorAction SilentlyContinue | ForEach-Object {
    $c = Read-Text $_.FullName
    # 파일명을 규칙으로 만들지 않고, 그 페이지가 실제로 참조하는 이름을 그대로 씁니다.
    # (sociopath 처럼 명명 규칙이 다른 테스트가 있어요)
    $results += [pscustomobject]@{
      Id      = ($_.BaseName -replace '^result-', '')
      OgFile  = M $c 'og:image"\s+content="[^"]*/([^"/]+\.png)"'
      CardFile= M $c 'assets/img/card/([^"'']+\.png)'
      Color   = M $c 'result-hero"\s+style="background:\s*([^;"]+)'
      Emoji   = Clean (M $c '(?s)<div class="result-hero".*?<div class="emoji">(.*?)</div>')
      Title   = Clean (M $c '(?s)<div class="result-hero".*?<h1>(.*?)</h1>')
      Sub     = Clean (M $c '(?s)<p class="subtitle"[^>]*>(.*?)</p>')
      Summary = Clean (M $c '(?s)<div class="card">\s*<p style="margin:0;font-size:15px;">(.*?)</p>')
      Traits  = @([regex]::Matches($c, '<li>([^<]+)</li>') | ForEach-Object { Clean $_.Groups[1].Value })
    }
  }

  # 혈액형은 본문이 JS로 채워져서 데이터 파일에서 보완
  if ($slug -eq 'blood-type') {
    $bd = Read-Text (Join-Path $root 'assets\js\bloodtype-data.js')
    foreach ($r in $results) {
      $blk = [regex]::Match($bd, '\{\s*id:\s*"' + [regex]::Escape($r.Id) + '"[\s\S]*?\n  \},')
      if ($blk.Success) {
        if (-not $r.Sub)     { $r.Sub     = M $blk.Value 'oneLiner:\s*"([^"]+)"' }
        if (-not $r.Summary) { $r.Summary = (M $blk.Value '(?s)description:\s*\n?\s*"([^"]+)"') }
        if (-not $r.Emoji)   { $r.Emoji   = M $blk.Value 'emoji:\s*"([^"]+)"' }
      }
    }
  }

  # 궁합 정보는 데이터 js 에서 (있으면)
  $dataPath = Join-Path $root "assets\js\$slug-data.js"
  if ($slug -eq 'blood-type') { $dataPath = Join-Path $root 'assets\js\bloodtype-data.js' }
  $data = if (Test-Path $dataPath) { Read-Text $dataPath } else { '' }
  # 지수 테스트는 id 가 따옴표 없는 숫자(id: 1), 유형 테스트는 문자열(id: "words") 이라
  # 양쪽 다 받도록 따옴표를 선택적으로 둡니다.
  function Compat([string] $id, [string] $which) {
    if (-not $data) { return $null }
    $q = '"?' + [regex]::Escape($id) + '"?'
    $blk = [regex]::Match($data, '\{\s*\n?\s*id:\s*' + $q + '\s*,[\s\S]*?\n  \},')
    if (-not $blk.Success) { return $null }
    $m = [regex]::Match($blk.Value, $which + ':\s*\{\s*id:\s*"?([^",}]+)"?\s*,\s*reason:\s*"([^"]+)"')
    if (-not $m.Success) { return $null }
    return @{ Id = $m.Groups[1].Value.Trim(); Why = $m.Groups[2].Value }
  }

  # 소개 OG
  $introCol = if ($results.Count -and $results[0].Color) { HexColor $results[0].Color } else { $BRAND_PURPLE }
  Emit-OG "$slug-intro.png" $introCol '' $testEmoji $testTitle $testSub

  # 결과별 OG / 카드
  foreach ($r in $results) {
    if (-not $r.Title) { $skipped += "$slug/$($r.Id) (제목 없음)"; continue }
    $col = if ($r.Color) { HexColor $r.Color } else { $BRAND_PURPLE }
    $ogName = if ($r.OgFile) { $r.OgFile } else { "$slug-$($r.Id).png" }
    # 부제가 JS로 채워지는 페이지는 자리표시자가 테스트명과 같아서 두 번 찍혀요. 그럴 땐 생략.
    $ogSub = if ($r.Sub -and $r.Sub -ne $testTitle) { $r.Sub } else { '' }
    Emit-OG $ogName $col $testTitle $r.Emoji $r.Title $ogSub

    if ($r.Summary) {
      $b = Compat $r.Id 'best'; $w = Compat $r.Id 'worst'
      $bestR = $null; $worstR = $null
      if ($b) { $bestR  = $results | Where-Object { $_.Id -eq $b.Id } | Select-Object -First 1 }
      if ($w) { $worstR = $results | Where-Object { $_.Id -eq $w.Id } | Select-Object -First 1 }
      $cardName = if ($r.CardFile) { $r.CardFile } else { "$slug-$($r.Id).png" }
      Emit-Card $cardName $col $testTitle $r.Emoji $r.Title $r.Sub $r.Summary $r.Traits `
                $bestR $(if ($b) { $b.Why } else { '' }) $worstR $(if ($w) { $w.Why } else { '' })
    }
  }

  # 결과 페이지가 없는 테스트(사주·궁합 등)의 '-result' 이미지
  foreach ($extra in @("$slug-result.png")) {
    if ($refOg.Contains($extra)) { Emit-OG $extra $introCol '' $testEmoji $testTitle $testSub }
  }
}

# ---------- 3) 홈 OG ----------
if ($refOg.Contains('home.png')) {
  $ht  = Clean (M $homeHtml '(?s)<section class="hero">.*?<h1>(.*?)</h1>')
  $hs  = Clean (M $homeHtml '(?s)<section class="hero">.*?<h1>.*?</h1>\s*<p>(.*?)</p>')
  Emit-OG 'home.png' $BRAND_PURPLE '' '☰' $ht $hs
}

Write-Host ''
Write-Host ("OG {0}개 / 카드 {1}개 생성" -f $madeOg, $madeCard)
if ($skipped.Count) { Write-Host ("건너뜀 {0}개: {1}" -f $skipped.Count, (($skipped | Select-Object -First 5) -join ', ')) }
