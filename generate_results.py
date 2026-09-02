#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
result-1.html ~ result-5.html 을 데이터 기반으로 생성하는 스크립트.
assets/js/sociopath-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id=1,
        emoji="🐑",
        title="순한 양 마음형",
        subtitle="공감능력 최상, 정 많은 당신",
        percentile="상위 78%",
        summary="당신은 타인의 감정에 깊이 공감하고 쉽게 마음을 여는 따뜻한 사람이에요. 소시오패스 성향과는 정반대에 가까워요. 다만 그만큼 정에 이끌려 손해를 보기도 쉬운 타입이니, 가끔은 스스로를 먼저 챙기는 연습도 필요해요.",
        traits=["높은 공감능력", "쉽게 마음을 여는 편", "갈등을 피하고 싶어함"],
        color="#10B981",
        compat=dict(
            best=dict(id=5, emoji="🧊", title="얼음같은 지배자형", reason="정반대의 매력에 끌려요. 당신의 따뜻함이 상대의 차가운 마음을 녹여줄 수 있어요."),
            worst=dict(id=4, emoji="🎭", title="타고난 설계자형", reason="매력적인 상대의 계산에 쉽게 이용당하고 상처받을 수 있으니 조심하세요."),
        ),
    ),
    dict(
        id=2,
        emoji="⚖️",
        title="균형잡힌 현실주의형",
        subtitle="감정과 이성 사이 균형을 잘 잡는 당신",
        percentile="상위 55%",
        summary="감정에 휘둘리지도, 그렇다고 너무 계산적이지도 않은 균형 잡힌 성향이에요. 상황에 따라 유연하게 대처할 줄 알아서 대인관계에서 스트레스를 비교적 덜 받는 편이에요. 다만 우유부단하게 보일 때도 있으니 결단이 필요한 순간엔 확실히 선을 그어보세요.",
        traits=["상황 판단력이 좋음", "감정 기복이 적은 편", "적당한 거리두기 가능"],
        color="#3B82F6",
        compat=dict(
            best=dict(id=3, emoji="♟️", title="냉철한 전략가형", reason="서로의 이성적인 판단을 존중하면서 편안하고 안정적인 관계를 유지할 수 있어요."),
            worst=dict(id=5, emoji="🧊", title="얼음같은 지배자형", reason="상대의 차가운 태도에 감정 소모가 커서 쉽게 지칠 수 있어요."),
        ),
    ),
    dict(
        id=3,
        emoji="♟️",
        title="냉철한 전략가형",
        subtitle="머릿속에 늘 다음 수가 있는 당신",
        percentile="상위 32%",
        summary="감정보다 논리와 계산이 앞서는 전략가 타입이에요. 위기 상황에서도 흔들리지 않고 상황을 객관적으로 분석하는 능력이 뛰어나요. 주변에서는 '속을 잘 모르겠다'는 말을 들어본 적이 있을지도 몰라요. 이 능력을 좋은 방향으로 쓰면 강력한 무기가 돼요.",
        traits=["뛰어난 상황 판단력", "감정 표현에 서툰 편", "목표 지향적"],
        color="#8B5CF6",
        compat=dict(
            best=dict(id=2, emoji="⚖️", title="균형잡힌 현실주의형", reason="서로의 이성적인 판단을 존중하면서 편안하고 안정적인 관계를 유지할 수 있어요."),
            worst=dict(id=1, emoji="🐑", title="순한 양 마음형", reason="감정적인 상대를 이해하기 어려워 서로 답답함을 느낄 수 있어요."),
        ),
    ),
    dict(
        id=4,
        emoji="🎭",
        title="타고난 설계자형",
        subtitle="매력과 계산을 동시에 갖춘 당신",
        percentile="상위 12%",
        summary="타인의 마음을 잘 읽고, 필요할 땐 자유자재로 설득력 있는 모습을 보여주는 타입이에요. 매력적이지만 그 이면엔 철저한 계산이 깔려 있죠. 리더십이나 협상 자리에서 강점이 되지만, 주변 사람들이 가끔 당신의 '진짜 마음'을 궁금해할 수 있어요.",
        traits=["뛰어난 설득력", "감정 컨트롤에 능함", "목적을 위해 유연하게 행동"],
        color="#EC4899",
        compat=dict(
            best=dict(id=2, emoji="⚖️", title="균형잡힌 현실주의형", reason="당신의 매력에 쉽게 흔들리지 않고 균형을 잡아주는 몇 안 되는 상대예요."),
            worst=dict(id=5, emoji="🧊", title="얼음같은 지배자형", reason="서로 주도권을 잡으려다 부딪히기 쉬워요. 팽팽한 신경전이 계속될 수 있어요."),
        ),
    ),
    dict(
        id=5,
        emoji="🧊",
        title="얼음같은 지배자형",
        subtitle="흔들리지 않는 얼음멘탈의 소유자",
        percentile="상위 4%",
        summary="웬만한 자극에는 감정이 크게 동요하지 않고, 상황을 철저히 이성과 이익으로 분석하는 극강의 멘탈이에요. 위기에 강하고 결단력이 뛰어나 어떤 조직에서든 핵심 역할을 맡을 가능성이 높아요. 다만 주변 사람들에게는 가끔 차갑게 느껴질 수 있으니, 의식적으로 따뜻함을 표현해보는 것도 좋아요.",
        traits=["최상급 위기 대처 능력", "낮은 감정 동요", "철저한 목표 지향"],
        color="#1E1B4B",
        compat=dict(
            best=dict(id=1, emoji="🐑", title="순한 양 마음형", reason="당신의 차가운 마음을 유일하게 녹여줄 수 있는 따뜻한 상대예요."),
            worst=dict(id=4, emoji="🎭", title="타고난 설계자형", reason="서로 주도권을 잡으려다 부딪히기 쉬워요. 팽팽한 신경전이 계속될 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 소시오패스 테스트</title>
<meta name="description" content="{subtitle} - 알아볼괘 소시오패스 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/sociopath-result-{id}.png" />
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
    <div class="percentile">{percentile}</div>
    <div class="emoji">{emoji}</div>
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>

  <div class="card index-card">
    <p class="index-title">나의 소시오패스 지수</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub" id="indexSub"></p>
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
    ⚠️ 이 결과는 재미로 즐기는 콘텐츠이며 전문적인 심리 진단이나 의학적 진단이 아니에요. 실제 정신건강 관련 어려움이 있으시다면 반드시 전문가와 상담해 주세요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/sociopath-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = SOCIOPATH_RESULTS.find(function (r) {{ return r.id === {id}; }});
    var params = new URLSearchParams(window.location.search);
    var scoreParam = params.get("score");
    var hasScore = scoreParam !== null && !isNaN(Number(scoreParam));
    var scoreNum = hasScore
      ? Number(scoreParam)
      : Math.round((result.min + result.max) / 2);
    var percent = Math.round((scoreNum / SOCIOPATH_MAX_SCORE) * 100);

    var indexPercent = document.getElementById("indexPercent");
    var indexGauge = document.getElementById("indexGauge");
    var indexSub = document.getElementById("indexSub");

    indexPercent.textContent = percent + "%";
    indexPercent.style.color = result.color;
    requestAnimationFrame(function () {{
      indexGauge.style.width = percent + "%";
    }});
    indexGauge.style.background = result.color;
    indexSub.textContent = hasScore
      ? "총점 " + scoreNum + " / " + SOCIOPATH_MAX_SCORE + "점 · 전체 응시자 중 " + result.percentile
      : result.title + " 유형의 평균 지수예요 (테스트를 하면 내 점수로 정확히 나와요)";

    renderCompatSection("compatSection", SOCIOPATH_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나의 소시오패스 지수는 '" + result.title + "' " + result.emoji,
        "너의 결과는? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/sociopath-{id}.png",
        "알아볼괘_소시오패스_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "sociopath")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    html = TEMPLATE.format(
        id=r["id"],
        emoji=r["emoji"],
        title=r["title"],
        subtitle=r["subtitle"],
        percentile=r["percentile"],
        summary=r["summary"],
        color=r["color"],
        traits_html=traits_html,
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
