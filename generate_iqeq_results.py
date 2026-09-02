#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
IQ/EQ 테스트 결과 페이지 4종 생성 스크립트.
assets/js/iqeq-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id="iq-hi-eq-hi",
        emoji="🦉",
        title="천재 전략가형",
        subtitle="똑똑한 두뇌 + 따뜻한 마음까지",
        summary="논리적으로 문제를 잘 풀어내면서도 사람의 감정까지 세심하게 살필 줄 아는 타입이에요. 일도 관계도 다 챙기는 만능형이라 어디서든 신뢰받는 사람이 될 가능성이 높아요. 다만 너무 완벽하려다 스스로를 몰아붙이지 않게 조심하세요.",
        traits=["논리적 문제 해결력", "뛰어난 공감능력", "일과 관계 모두 잘 챙김"],
        color="#1E3A5F",
        iq_fallback=5,
        eq_fallback=9,
        compat=dict(
            best=dict(id="iq-lo-eq-lo", emoji="🦋", title="자유로운 영혼형", reason="당신의 치밀함에 자유로움을 더해주는 상대라 새로운 균형을 찾을 수 있어요."),
            worst=dict(id="iq-hi-eq-lo", emoji="🧪", title="괴짜 천재형", reason="둘 다 논리로 밀어붙이려다 보니 대화가 토론이 되기 쉬워요."),
        ),
    ),
    dict(
        id="iq-hi-eq-lo",
        emoji="🧪",
        title="괴짜 천재형",
        subtitle="번뜩이는 두뇌, 살짝 서투른 감정 표현",
        summary="논리와 분석에 강한 타입이에요. 문제를 빠르고 정확하게 풀어내지만, 감정 표현이나 눈치 보는 건 살짝 서투른 편이에요. 주변에서 '똑똑한데 가끔 뜬금없다'는 얘기를 들어본 적 있을지도 몰라요. 그 엉뚱함이 사실 큰 매력이에요.",
        traits=["뛰어난 논리력", "직설적인 화법", "감정 표현엔 다소 서투름"],
        color="#0E7490",
        iq_fallback=5,
        eq_fallback=3,
        compat=dict(
            best=dict(id="iq-lo-eq-hi", emoji="🤝", title="인간관계 마스터형", reason="당신의 부족한 공감력을 채워주는 든든한 상대예요."),
            worst=dict(id="iq-hi-eq-hi", emoji="🦉", title="천재 전략가형", reason="둘 다 논리로 밀어붙이려다 보니 대화가 토론이 되기 쉬워요."),
        ),
    ),
    dict(
        id="iq-lo-eq-hi",
        emoji="🤝",
        title="인간관계 마스터형",
        subtitle="숫자보다 사람이 먼저인 타입",
        summary="복잡한 논리 문제보다는 사람 마음을 읽는 데 훨씬 강한 타입이에요. 눈치가 빠르고 공감을 잘해줘서 곁에 있으면 편안한 사람이라는 얘기를 자주 들어요. 정답이 없는 상황에서 특히 빛을 발하는 스타일이에요.",
        traits=["뛰어난 공감능력", "빠른 눈치와 센스", "관계를 부드럽게 이끎"],
        color="#EA580C",
        iq_fallback=1,
        eq_fallback=9,
        compat=dict(
            best=dict(id="iq-hi-eq-lo", emoji="🧪", title="괴짜 천재형", reason="엉뚱한 매력의 상대를 잘 이해해주고 챙겨줄 수 있어요."),
            worst=dict(id="iq-lo-eq-lo", emoji="🦋", title="자유로운 영혼형", reason="둘 다 계획성이 부족해서 관계가 붕 뜰 수 있어요."),
        ),
    ),
    dict(
        id="iq-lo-eq-lo",
        emoji="🦋",
        title="자유로운 영혼형",
        subtitle="논리보다 직감, 계획보다 즉흥",
        summary="논리적인 분석이나 감정 계산보다는 타고난 직감과 즉흥적인 매력으로 사는 타입이에요. 계획에 얽매이지 않고 그때그때 순간을 즐길 줄 알아서 주변 사람들을 편안하게 만들어줘요. 가끔은 그 자유로움이 최고의 무기가 돼요.",
        traits=["뛰어난 직감", "즉흥적이고 자유로운 성향", "긍정적인 에너지"],
        color="#7C3AED",
        iq_fallback=1,
        eq_fallback=3,
        compat=dict(
            best=dict(id="iq-hi-eq-hi", emoji="🦉", title="천재 전략가형", reason="당신의 자유로움을 든든하게 받쳐주는 상대예요."),
            worst=dict(id="iq-lo-eq-hi", emoji="🤝", title="인간관계 마스터형", reason="둘 다 계획성이 부족해서 관계가 붕 뜰 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 IQ/EQ 테스트</title>
<meta name="description" content="{subtitle} - 알아볼괘 IQ/EQ 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 IQ/EQ 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/iqeq-{id}.png" />
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
    <div class="dual-index-grid">
      <div class="index-mini">
        <p class="index-title">IQ 지수</p>
        <p class="index-percent-sm" id="iqPercent">-</p>
        <div class="index-gauge-outer">
          <div class="index-gauge-inner" id="iqGauge" style="width:0%;"></div>
        </div>
      </div>
      <div class="index-mini">
        <p class="index-title">EQ 지수</p>
        <p class="index-percent-sm" id="eqPercent">-</p>
        <div class="index-gauge-outer">
          <div class="index-gauge-inner" id="eqGauge" style="width:0%;"></div>
        </div>
      </div>
    </div>
    <p class="index-sub" id="indexSub" style="margin-top:14px;"></p>
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
    ⚠️ 이 결과는 재미로 즐기는 콘텐츠이며, 공인된 IQ/EQ 검사가 아니에요. 실제 지능·정서 지수와는 차이가 있을 수 있어요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/iqeq-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getIqEqById("{id}");
    var params = new URLSearchParams(window.location.search);
    var iqParam = params.get("iq");
    var eqParam = params.get("eq");
    var hasScore = iqParam !== null && eqParam !== null && !isNaN(Number(iqParam)) && !isNaN(Number(eqParam));

    var iqNum = hasScore ? Number(iqParam) : {iq_fallback};
    var eqNum = hasScore ? Number(eqParam) : {eq_fallback};
    var iqPercent = Math.round((iqNum / IQEQ_MAX_IQ) * 100);
    var eqPercent = Math.round((eqNum / IQEQ_MAX_EQ) * 100);

    document.getElementById("iqPercent").textContent = iqPercent + "%";
    document.getElementById("iqPercent").style.color = result.color;
    document.getElementById("eqPercent").textContent = eqPercent + "%";
    document.getElementById("eqPercent").style.color = result.color;

    requestAnimationFrame(function () {{
      document.getElementById("iqGauge").style.width = iqPercent + "%";
      document.getElementById("eqGauge").style.width = eqPercent + "%";
    }});
    document.getElementById("iqGauge").style.background = result.color;
    document.getElementById("eqGauge").style.background = result.color;

    document.getElementById("indexSub").textContent = hasScore
      ? "IQ " + iqNum + "/" + IQEQ_MAX_IQ + "문제 정답 · EQ " + eqNum + "/" + IQEQ_MAX_EQ + "점"
      : result.title + " 유형의 평균적인 지수예요 (테스트를 하면 내 점수로 정확히 나와요)";

    renderCompatSection("compatSection", IQEQ_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나는 '" + result.title + "' " + result.emoji,
        "너의 IQ/EQ 결과는? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/iqeq-{id}.png",
        "알아볼괘_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "iqeq")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    html = TEMPLATE.format(
        id=r["id"],
        emoji=r["emoji"],
        title=r["title"],
        subtitle=r["subtitle"],
        summary=r["summary"],
        color=r["color"],
        traits_html=traits_html,
        iq_fallback=r["iq_fallback"],
        eq_fallback=r["eq_fallback"],
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
