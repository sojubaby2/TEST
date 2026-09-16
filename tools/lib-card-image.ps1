# ============================================================
#  알아볼괘 - 카드/OG 이미지 그리기 공용 라이브러리
# ------------------------------------------------------------
#  tools\make-test-images.ps1 (새 테스트용) 과
#  tools\rebuild-all-images.ps1 (기존 전체 재생성) 가 함께 씁니다.
#  ※ GDI+ 는 컬러 이모지를 지원하지 않아 이모지는 단색 라인으로 들어갑니다.
# ============================================================

Add-Type -AssemblyName System.Drawing
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$BRAND = '알아볼괘'

function HexColor([string] $hex) {
  $hex = $hex.TrimStart('#')
  return [System.Drawing.Color]::FromArgb(255,
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16))
}

function Shade([System.Drawing.Color] $c, [double] $f) {
  return [System.Drawing.Color]::FromArgb(255,
    [Math]::Min(255, [int]($c.R * $f)), [Math]::Min(255, [int]($c.G * $f)), [Math]::Min(255, [int]($c.B * $f)))
}

function NewG([System.Drawing.Bitmap] $bmp) {
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  return $g
}

# 가운데 정렬 문자열
function DrawCenter($g, [string] $text, $font, $brush, [int] $cx, [int] $y) {
  $sz = $g.MeasureString($text, $font)
  $g.DrawString($text, $font, $brush, [float]($cx - $sz.Width / 2), [float]$y)
  return $sz.Height
}

# 폭에 맞춰 줄바꿈해서 그리기 (반환: 그린 높이)
function DrawWrapped($g, [string] $text, $font, $brush, [int] $x, [int] $y, [int] $maxW, [int] $lineH) {
  $words = $text -split ' '
  $line = ''
  $cur = $y
  foreach ($w in $words) {
    $try = if ($line) { "$line $w" } else { $w }
    if ($g.MeasureString($try, $font).Width -gt $maxW -and $line) {
      $g.DrawString($line, $font, $brush, [float]$x, [float]$cur)
      $cur += $lineH
      $line = $w
    } else { $line = $try }
  }
  if ($line) { $g.DrawString($line, $font, $brush, [float]$x, [float]$cur); $cur += $lineH }
  return ($cur - $y)
}

function RoundRect($g, $brush, [int]$x, [int]$y, [int]$w, [int]$h, [int]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, $r*2, $r*2, 180, 90)
  $p.AddArc($x+$w-$r*2, $y, $r*2, $r*2, 270, 90)
  $p.AddArc($x+$w-$r*2, $y+$h-$r*2, $r*2, $r*2, 0, 90)
  $p.AddArc($x, $y+$h-$r*2, $r*2, $r*2, 90, 90)
  $p.CloseFigure()
  $g.FillPath($brush, $p)
  $p.Dispose()
}

$FONT = 'Noto Sans KR'
function F([single] $size, [string] $style = 'Bold') {
  return New-Object System.Drawing.Font($FONT, $size, [System.Drawing.FontStyle]::$style, [System.Drawing.GraphicsUnit]::Pixel)
}
function FE([single] $size) {
  return New-Object System.Drawing.Font('Segoe UI Emoji', $size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
}

# ---------- OG 1200x630 ----------
function Make-OG([string] $path, [System.Drawing.Color] $col, [string] $pill, [string] $emoji, [string] $title, [string] $sub) {
  $W = 1200; $H = 630
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = NewG $bmp
  $g.Clear($col)

  # 장식용 원 (아주 옅게)
  $deco = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26, 255, 255, 255))
  $g.FillEllipse($deco, 880, -190, 520, 520)
  $g.FillEllipse($deco, -170, 380, 430, 430)
  $deco.Dispose()

  $white = [System.Drawing.Brushes]::White
  $g.DrawString($BRAND, (F 40), $white, 62, 48)

  # 흰 알약 라벨
  if ($pill) {
    $pf = F 26
    $pw = [int]$g.MeasureString($pill, $pf).Width + 56
    $pillBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    RoundRect $g $pillBrush ([int](($W - $pw)/2)) 158 $pw 58 29
    $tb = New-Object System.Drawing.SolidBrush (Shade $col 0.72)
    [void](DrawCenter $g $pill $pf $tb ([int]($W/2)) 172)
    $tb.Dispose(); $pillBrush.Dispose(); $pf.Dispose()
  }

  [void](DrawCenter $g $emoji (FE 128) $white ([int]($W/2)) 240)
  [void](DrawCenter $g $title (F 66) $white ([int]($W/2)) 408)
  $subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(225,255,255,255))
  [void](DrawCenter $g $sub (F 30 'Regular') $subBrush ([int]($W/2)) 502)
  $subBrush.Dispose()

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

# ---------- 공유카드 1080x1558 ----------
function Make-Card([string] $path, [System.Drawing.Color] $col, [string] $testName, [string] $emoji, [string] $title, [string] $sub, [string] $summary, [string[]] $traits, $bestR, [string] $bestWhy, $worstR, [string] $worstWhy) {
  # 요약문 길이에 따라 세로가 달라지므로 넉넉한 캔버스에 그린 뒤 실제 높이로 잘라냅니다.
  $W = 1080; $HMAX = 2400; $HERO = 640
  $bmp = New-Object System.Drawing.Bitmap $W, $HMAX
  $g = NewG $bmp
  $g.Clear([System.Drawing.Color]::White)

  $heroBrush = New-Object System.Drawing.SolidBrush $col
  $g.FillRectangle($heroBrush, 0, 0, $W, $HERO)
  $heroBrush.Dispose()

  $deco = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26,255,255,255))
  $g.FillEllipse($deco, 760, -150, 460, 460)
  $deco.Dispose()

  $white = [System.Drawing.Brushes]::White
  $g.DrawString($BRAND, (F 44), $white, 64, 56)
  $nameBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(215,255,255,255))
  $g.DrawString($testName, (F 28 'Regular'), $nameBrush, 66, 112)
  $nameBrush.Dispose()

  [void](DrawCenter $g $emoji (FE 150) $white ([int]($W/2)) 208)
  [void](DrawCenter $g $title (F 72) $white ([int]($W/2)) 412)
  $sb = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(225,255,255,255))
  [void](DrawCenter $g $sub (F 30 'Regular') $sb ([int]($W/2)) 516)
  $sb.Dispose()

  # 본문
  $textDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,31,32,41))
  $y = $HERO + 70
  $y += DrawWrapped $g $summary (F 32 'Regular') $textDark 72 $y 936 52

  $y += 44
  $label = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,150,152,168))
  $g.DrawString('이런 특징이 있어요', (F 28), $label, 72, $y)
  $label.Dispose()
  $y += 58

  $accent = New-Object System.Drawing.SolidBrush $col
  foreach ($t in $traits) {
    $g.DrawString('✓', (F 32), $accent, 72, $y)
    $g.DrawString($t, (F 32), $textDark, 116, $y)
    $y += 56
  }
  $accent.Dispose()

  # 나와 잘 맞는 유형 / 조심할 유형 (정보가 있을 때만)
  if ($bestR -or $worstR) {
    $y += 34
    $label2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,150,152,168))
    $g.DrawString('나와 잘 맞는 유형은?', (F 28), $label2, 72, $y)
    $label2.Dispose()
    $y += 58
  }

  $boxes = @(
    @{ Tag = '천생연분'; R = $bestR;  Why = $bestWhy;  Bg = [System.Drawing.Color]::FromArgb(255,236,253,245); Fg = [System.Drawing.Color]::FromArgb(255,21,128,61) },
    @{ Tag = '상극 주의'; R = $worstR; Why = $worstWhy; Bg = [System.Drawing.Color]::FromArgb(255,254,242,242); Fg = [System.Drawing.Color]::FromArgb(255,220,38,38) }
  )
  foreach ($b in $boxes) {
    if (-not $b.R) { continue }
    $bh = 168
    $bgBrush = New-Object System.Drawing.SolidBrush $b.Bg
    RoundRect $g $bgBrush 72 $y 936 $bh 22
    $bgBrush.Dispose()

    $tagBrush = New-Object System.Drawing.SolidBrush $b.Fg
    $g.DrawString($b.Tag, (F 24), $tagBrush, 108, ($y + 22))
    $tagBrush.Dispose()

    $emBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,90,92,108))
    $g.DrawString($b.R.emoji, (FE 34), $emBrush, 108, ($y + 62))
    $emBrush.Dispose()

    $nameBrush2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,31,32,41))
    $g.DrawString($b.R.title, (F 34), $nameBrush2, 160, ($y + 60))
    $nameBrush2.Dispose()

    $whyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,107,109,128))
    [void](DrawWrapped $g $b.Why (F 24 'Regular') $whyBrush 108 ($y + 110) 864 34)
    $whyBrush.Dispose()

    $y += $bh + 24
  }
  $textDark.Dispose()

  $y += 22
  $footBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,160,162,176))
  [void](DrawCenter $g ($BRAND + '에서 나도 테스트하기 →') (F 28 'Regular') $footBrush ([int]($W/2)) $y)
  $footBrush.Dispose()
  $y += 74

  $g.Dispose()

  # 실제로 쓴 높이만큼 잘라서 저장
  $finalH = [Math]::Min($y, $HMAX)
  $rect = New-Object System.Drawing.Rectangle 0, 0, $W, $finalH
  $crop = $bmp.Clone($rect, $bmp.PixelFormat)
  $crop.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
  $bmp.Dispose()
}
