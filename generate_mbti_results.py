#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MBTI 간단 테스트 결과 페이지(16종) 생성 스크립트.
데이터 소스는 mbti_common.py 하나뿐이며, assets/js/mbti-data.js 도 같은 소스에서
build_mbti_js.py 로 생성되므로 서로 어긋나지 않는다.
"""
import os

import mbti_common as m

RESULTS = m.RESULTS

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 MBTI 테스트</title>
<meta name="description" content="{subtitle} - 알아볼괘 MBTI 간단 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 MBTI도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/mbti-{id}.png" />
<meta property="og:url" content="./result-{id}.html" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{emoji}</text></svg>" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html"><span class="logo-mark">☰</span> 알아볼괘</a>
</header>

<main class="wrap">
  <div class="result-hero" style="background:{color};">
    <div class="emoji">{emoji}</div>
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>

  <div class="card index-card">
    <p class="index-title">유형 선명도</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub">12문항 중 '{id}' 성향으로 답한 평균 비율이에요</p>

    <div class="quad-index-grid">
      <div class="index-mini">
        <p class="index-title">{l0}</p>
        <p class="index-percent-xs" id="pctEI">-</p>
        <div class="index-gauge-outer"><div class="index-gauge-inner" id="gaugeEI" style="width:0%;"></div></div>
      </div>
      <div class="index-mini">
        <p class="index-title">{l1}</p>
        <p class="index-percent-xs" id="pctSN">-</p>
        <div class="index-gauge-outer"><div class="index-gauge-inner" id="gaugeSN" style="width:0%;"></div></div>
      </div>
      <div class="index-mini">
        <p class="index-title">{l2}</p>
        <p class="index-percent-xs" id="pctTF">-</p>
        <div class="index-gauge-outer"><div class="index-gauge-inner" id="gaugeTF" style="width:0%;"></div></div>
      </div>
      <div class="index-mini">
        <p class="index-title">{l3}</p>
        <p class="index-percent-xs" id="pctJP">-</p>
        <div class="index-gauge-outer"><div class="index-gauge-inner" id="gaugeJP" style="width:0%;"></div></div>
      </div>
    </div>
  </div>

  <div class="card">
    <p style="margin:0;font-size:15px;">{summary}</p>
    <p class="section-title">이런 특징이 있어요</p>
    <ul class="trait-list">
      {traits_html}
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
    ⚠️ 이 테스트는 재미로 즐기는 간이 버전으로, 공식 MBTI® 검사와는 무관해요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/mbti-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getMbtiById("{id}");
    var params = new URLSearchParams(window.location.search);
    function pick(key, fallback) {{
      var v = params.get(key);
      return v !== null && !isNaN(Number(v)) ? Number(v) : fallback;
    }}
    var overall = pick("overall", 75);
    var ei = pick("ei", 75);
    var sn = pick("sn", 75);
    var tf = pick("tf", 75);
    var jp = pick("jp", 75);

    var indexPercent = document.getElementById("indexPercent");
    var indexGauge = document.getElementById("indexGauge");
    indexPercent.textContent = overall + "%";
    indexPercent.style.color = result.color;
    requestAnimationFrame(function () {{
      indexGauge.style.width = overall + "%";
    }});
    indexGauge.style.background = result.color;

    var axisData = [
      ["pctEI", "gaugeEI", ei],
      ["pctSN", "gaugeSN", sn],
      ["pctTF", "gaugeTF", tf],
      ["pctJP", "gaugeJP", jp],
    ];
    axisData.forEach(function (item) {{
      var pctEl = document.getElementById(item[0]);
      var gaugeEl = document.getElementById(item[1]);
      pctEl.textContent = item[2] + "%";
      pctEl.style.color = result.color;
      gaugeEl.style.background = result.color;
      requestAnimationFrame(function () {{
        gaugeEl.style.width = item[2] + "%";
      }});
    }});

    renderCompatSection("compatSection", MBTI_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나는 '" + result.title + "' " + result.emoji,
        "너의 MBTI는? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/mbti-{id}.png",
        "알아볼괘_" + result.id + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "mbti")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    code = r["id"]
    html = TEMPLATE.format(
        id=code, emoji=r["emoji"], title=r["title"], subtitle=r["subtitle"],
        summary=r["summary"], color=r["color"], traits_html=traits_html,
        l0=code[0], l1=code[1], l2=code[2], l3=code[3],
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(code))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
