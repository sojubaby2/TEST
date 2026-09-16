# ============================================================
#  알아볼괘 - 새 테스트 생성 스크립트 (유형 선택형)
# ------------------------------------------------------------
#  content/tests/<슬러그>.json 하나만 쓰면 아래를 전부 만들어줍니다.
#    assets/js/<슬러그>-data.js
#    tests/<슬러그>/index.html
#    tests/<슬러그>/quiz.html
#    tests/<슬러그>/result-<결과id>.html   (결과 수만큼)
#
#  판정 방식은 '사랑의 언어' 테스트와 같은 집계(tally) 방식이에요.
#  문항마다 고른 선택지의 key 를 세어 가장 많이 나온 유형이 결과가 됩니다.
#
#  사용법:  powershell -ExecutionPolicy Bypass -File tools\new-test.ps1
#           powershell ... -File tools\new-test.ps1 -Only food-type
# ============================================================

[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [string[]] $Only
)

$ErrorActionPreference = 'Stop'

$root     = Split-Path -Parent $PSScriptRoot
$specDir  = Join-Path $root 'content\tests'
$testsDir = Join-Path $root 'tests'
$jsDir    = Join-Path $root 'assets\js'

if (-not (Test-Path $specDir)) { throw "스펙 폴더가 없습니다: $specDir" }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$NL = "`n"

function Write-SiteFile([string] $path, [string] $text) {
  $dir = Split-Path -Parent $path
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  # 사이트 파일은 BOM 없는 UTF-8 + LF
  [System.IO.File]::WriteAllText($path, ($text -replace "`r`n", "`n"), $utf8NoBom)
}

function Esc([string] $s) { return ($s -replace '\\', '\\' -replace '"', '\"') }

$FAVICON_BRAND = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><linearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 stop-color=%22%237c3aed%22/><stop offset=%22100%25%22 stop-color=%22%23ec4899%22/></linearGradient></defs><rect width=%22100%22 height=%22100%22 rx=%2224%22 fill=%22url(%23g)%22/><text x=%2250%22 y=%2262%22 font-size=%2244%22 text-anchor=%22middle%22 fill=%22%23fff%22>☰</text></svg>'

function Favicon([string] $emoji) {
  return "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>$emoji</text></svg>"
}

$AD = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1329092235174593"' + $NL + '     crossorigin="anonymous"></script>'

$made = 0; $files = 0

Get-ChildItem $specDir -Filter '*.json' | Sort-Object Name | ForEach-Object {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  if ($Only -and ($Only -notcontains $slug)) { return }

  $spec = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom) | ConvertFrom-Json
  $P    = $spec.prefix     # 예: FOODTYPE
  $Fn   = $spec.fnName     # 예: FoodType
  $results = $spec.results
  $questions = $spec.questions

  # 각 유형이 선택지로 몇 번 등장하는지 (백분율 분모)
  $appear = @{}
  foreach ($q in $questions) { foreach ($o in $q.options) { $appear[$o.key] = 1 + [int]$appear[$o.key] } }
  $maxAppear = ($appear.Values | Measure-Object -Maximum).Maximum

  # ---------- 1) 데이터 js ----------
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.AppendLine("/* ============================================================")
  [void]$sb.AppendLine("   $($spec.title) - 문항 및 결과 데이터")
  [void]$sb.AppendLine("   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.")
  [void]$sb.AppendLine("   tools/new-test.ps1 로 생성됨 - content/tests/$slug.json 을 고치세요")
  [void]$sb.AppendLine("   ============================================================ */")
  [void]$sb.AppendLine("")
  [void]$sb.AppendLine("const ${P}_QUESTIONS = [")
  foreach ($q in $questions) {
    [void]$sb.AppendLine("  {")
    [void]$sb.AppendLine("    text: `"$(Esc $q.text)`",")
    [void]$sb.AppendLine("    options: [")
    foreach ($o in $q.options) {
      [void]$sb.AppendLine("      { text: `"$(Esc $o.text)`", key: `"$($o.key)`" },")
    }
    [void]$sb.AppendLine("    ],")
    [void]$sb.AppendLine("  },")
  }
  [void]$sb.AppendLine("];")
  [void]$sb.AppendLine("")
  [void]$sb.AppendLine("const ${P}_APPEARANCES = $maxAppear;")
  [void]$sb.AppendLine("")
  [void]$sb.AppendLine("const ${P}_RESULTS = [")
  foreach ($r in $results) {
    [void]$sb.AppendLine("  {")
    [void]$sb.AppendLine("    id: `"$($r.id)`",")
    [void]$sb.AppendLine("    emoji: `"$($r.emoji)`",")
    [void]$sb.AppendLine("    title: `"$(Esc $r.title)`",")
    [void]$sb.AppendLine("    subtitle: `"$(Esc $r.subtitle)`",")
    [void]$sb.AppendLine("    summary: `"$(Esc $r.summary)`",")
    $tr = ($r.traits | ForEach-Object { "`"$(Esc $_)`"" }) -join ', '
    [void]$sb.AppendLine("    traits: [$tr],")
    [void]$sb.AppendLine("    color: `"$($r.color)`",")
    [void]$sb.AppendLine("    compat: {")
    [void]$sb.AppendLine("      best: { id: `"$($r.compat.best.id)`", reason: `"$(Esc $r.compat.best.reason)`" },")
    [void]$sb.AppendLine("      worst: { id: `"$($r.compat.worst.id)`", reason: `"$(Esc $r.compat.worst.reason)`" },")
    [void]$sb.AppendLine("    },")
    [void]$sb.AppendLine("  },")
  }
  [void]$sb.AppendLine("];")
  [void]$sb.AppendLine("")
  $order = ($results | ForEach-Object { "`"$($_.id)`"" }) -join ', '
  [void]$sb.AppendLine("function get${Fn}ById(id) {")
  [void]$sb.AppendLine("  return ${P}_RESULTS.find((r) => r.id === id);")
  [void]$sb.AppendLine("}")
  [void]$sb.AppendLine("")
  [void]$sb.AppendLine("function tallyTo${Fn}Result(tally) {")
  [void]$sb.AppendLine("  let best = null;")
  [void]$sb.AppendLine("  let bestCount = -1;")
  [void]$sb.AppendLine("  const order = [$order]; // 동점 시 우선순위")
  [void]$sb.AppendLine("  order.forEach((key) => {")
  [void]$sb.AppendLine("    const count = tally[key] || 0;")
  [void]$sb.AppendLine("    if (count > bestCount) {")
  [void]$sb.AppendLine("      bestCount = count;")
  [void]$sb.AppendLine("      best = key;")
  [void]$sb.AppendLine("    }")
  [void]$sb.AppendLine("  });")
  [void]$sb.AppendLine("  return get${Fn}ById(best);")
  [void]$sb.AppendLine("}")
  Write-SiteFile (Join-Path $jsDir "$slug-data.js") $sb.ToString()
  $files++

  # ---------- 2) 소개 페이지 ----------
  $qCount = $questions.Count
  $idx = @"
<!doctype html>
<html lang="ko">
<head>
$AD

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>$($spec.title) | 알아볼괘</title>
<meta name="description" content="$($spec.metaDesc)" />

<meta property="og:type" content="website" />
<meta property="og:title" content="$($spec.title)" />
<meta property="og:description" content="$($spec.ogDesc)" />
<meta property="og:image" content="../../assets/img/og/$slug-intro.png" />
<meta property="og:url" content="./" />

<link rel="icon" href="$(Favicon $spec.emoji)" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html"><span class="logo-mark">☰</span> 알아볼괘</a>
</header>

<main class="wrap">
  <section class="hero">
    <div style="font-size:56px;margin-bottom:8px;">$($spec.emoji)</div>
    <h1>$($spec.title)</h1>
    <p>$($spec.introLine1)<br />$($spec.introLine2)</p>
  </section>

  <div class="card">
    <p style="margin:0 0 10px;font-size:14px;color:var(--text-sub);">✅ 총 $qCount 문항 · 예상 소요시간 1분</p>
    <p style="margin:0;font-size:14px;color:var(--text-sub);">✅ $($spec.bullet2)</p>
  </div>

  <a class="btn btn-primary" href="quiz.html" style="margin-top:20px;">테스트 시작하기</a>

  <p class="notice">
    ⚠️ $($spec.notice)
  </p>

  <div class="footer">
    <p><a href="../../index.html">← 다른 테스트도 보러가기</a></p>
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

</body>
</html>
"@
  Write-SiteFile (Join-Path $testsDir "$slug\index.html") $idx
  $files++

  # ---------- 3) 진행 페이지 ----------
  $tallyInit = (($results | ForEach-Object { "$($_.id): 0" }) -join ', ')
  $quiz = @"
<!doctype html>
<html lang="ko">
<head>
$AD

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>$($spec.title) 진행중... | 알아볼괘</title>
<meta name="robots" content="noindex" />
<link rel="icon" href="$(Favicon $spec.emoji)" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html"><span class="logo-mark">☰</span> 알아볼괘</a>
</header>

<main class="wrap">
  <div class="progress-outer">
    <div class="progress-inner" id="progressBar" style="width:0%;"></div>
  </div>
  <div class="progress-label" id="progressLabel">0 / $qCount</div>

  <div class="card">
    <div class="question-num" id="qNum">Q1</div>
    <p class="question-text" id="qText"></p>
    <div id="options"></div>
  </div>
</main>

<script src="../../assets/js/$slug-data.js"></script>
<script>
  let current = 0;
  const tally = { $tallyInit };

  const qNum = document.getElementById("qNum");
  const qText = document.getElementById("qText");
  const optionsEl = document.getElementById("options");
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  function renderQuestion() {
    const q = ${P}_QUESTIONS[current];
    qNum.textContent = "Q" + (current + 1);
    qText.textContent = q.text;
    optionsEl.innerHTML = "";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => selectOption(opt.key));
      optionsEl.appendChild(btn);
    });

    const pct = Math.round((current / ${P}_QUESTIONS.length) * 100);
    progressBar.style.width = pct + "%";
    progressLabel.textContent = current + " / " + ${P}_QUESTIONS.length;
  }

  function selectOption(key) {
    tally[key] = (tally[key] || 0) + 1;
    current += 1;

    if (current >= ${P}_QUESTIONS.length) {
      progressBar.style.width = "100%";
      progressLabel.textContent = ${P}_QUESTIONS.length + " / " + ${P}_QUESTIONS.length;
      finishQuiz();
      return;
    }
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishQuiz() {
    const result = tallyTo${Fn}Result(tally);
    const percent = Math.round(((tally[result.id] || 0) / ${P}_APPEARANCES) * 100);
    const url = "result-" + result.id + ".html?percent=" + Math.min(percent, 100);
    setTimeout(() => {
      window.location.href = url;
    }, 350);
  }

  renderQuestion();
</script>

</body>
</html>
"@
  Write-SiteFile (Join-Path $testsDir "$slug\quiz.html") $quiz
  $files++

  # ---------- 4) 결과 페이지들 ----------
  foreach ($r in $results) {
    $traitsHtml = ($r.traits | ForEach-Object { "      <li>$_</li>" }) -join $NL
    $res = @"
<!doctype html>
<html lang="ko">
<head>
$AD

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '$($r.title)' | 알아볼괘 $($spec.title)</title>
<meta name="description" content="$($r.subtitle) - 알아볼괘 $($spec.title) 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '$($r.title)' $($r.emoji)" />
<meta property="og:description" content="$($r.subtitle) 너의 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/$slug-$($r.id).png" />
<meta property="og:url" content="./result-$($r.id).html" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="$(Favicon $r.emoji)" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html"><span class="logo-mark">☰</span> 알아볼괘</a>
</header>

<main class="wrap">
  <div class="result-hero" style="background:$($r.color);">
    <div class="emoji">$($r.emoji)</div>
    <h1>$($r.title)</h1>
    <p class="subtitle">$($r.subtitle)</p>
  </div>

  <div class="card index-card">
    <p class="index-title">$($spec.resultLabel)</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub">이 유형의 성향이 얼마나 뚜렷하게 나왔는지를 나타내요</p>
  </div>

  <div class="card">
    <p style="margin:0;font-size:15px;">$($r.summary)</p>
    <p class="section-title">이런 특징이 있어요</p>
    <ul class="trait-list">
$traitsHtml
    </ul>
  </div>

  <p class="section-title" style="margin-top:28px;">나와 잘 맞는 유형은?</p>
  <div id="compatSection"></div>

  <div class="btn-row">
    <button class="btn btn-primary" id="shareBtn" type="button">결과 공유하기</button>
  </div>
  <div class="btn-row">
    <button class="btn btn-secondary" id="copyBtn" type="button">🔗 링크 복사</button>
    <button class="btn btn-secondary" id="downloadBtn" type="button">🖼️ 이미지 저장</button>
  </div>

  <a class="btn btn-secondary" href="index.html" style="margin-top:20px;">🔄 테스트 다시 하기</a>
  <a class="btn btn-secondary" href="../../index.html">🏠 다른 테스트 보러가기</a>

  <div class="ad-slot">광고 영역 (심사 통과 후 게재 예정)</div>

  <p class="notice">
    ⚠️ $($spec.notice)
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/$slug-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {
    var result = get${Fn}ById("$($r.id)");
    var params = new URLSearchParams(window.location.search);
    var percentParam = params.get("percent");
    var percent = percentParam !== null && !isNaN(Number(percentParam)) ? Number(percentParam) : 75;

    var indexPercent = document.getElementById("indexPercent");
    var indexGauge = document.getElementById("indexGauge");
    indexPercent.textContent = percent + "%";
    indexPercent.style.color = result.color;
    requestAnimationFrame(function () {
      indexGauge.style.width = percent + "%";
    });
    indexGauge.style.background = result.color;

    renderCompatSection("compatSection", ${P}_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {
      shareCurrentPage(
        "$($spec.shareLead) '" + result.title + "' " + result.emoji,
        "너의 결과는? 알아볼괘에서 확인해봐!"
      );
    });
    document.getElementById("copyBtn").addEventListener("click", function () {
      copyLinkToClipboard();
    });
    document.getElementById("downloadBtn").addEventListener("click", function () {
      downloadImage(
        "../../assets/img/card/$slug-$($r.id).png",
        "알아볼괘_" + result.title + ".png"
      );
    });
  })();
</script>

</body>
</html>
"@
    Write-SiteFile (Join-Path $testsDir "$slug\result-$($r.id).html") $res
    $files++
  }

  Write-Host ("  [OK] {0,-18} 문항 {1}개 · 결과 {2}개" -f $slug, $qCount, $results.Count)
  $made++
}

Write-Host ''
Write-Host "생성한 테스트: $made 개 / 파일 $files 개"
