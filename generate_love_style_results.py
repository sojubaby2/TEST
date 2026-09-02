#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
연애 유형 테스트 결과 페이지(result-1~5) 생성 스크립트.
assets/js/love-style-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id=1, emoji="🦅", title="자유로운 독립연애형", subtitle="연애도 좋지만 내 공간이 더 소중해",
        percentile="상위 74%",
        summary="연애를 하면서도 나만의 시간과 공간을 소중히 여기는 타입이에요. 상대에게 집착하지 않고 쿨한 매력을 보여주지만, 그만큼 상대가 서운함을 느낄 수도 있으니 가끔은 마음을 더 적극적으로 표현해보는 것도 좋아요.",
        traits=["독립적인 연애 스타일", "감정 기복이 적음", "자유로운 분위기 선호"],
        color="#0EA5E9",
        compat=dict(
            best=dict(id=5, emoji="🔥", title="올인 불꽃연애형", reason="뜨겁게 다가와주는 상대 덕분에 연애의 설렘을 제대로 느낄 수 있어요."),
            worst=dict(id=4, emoji="💌", title="다정한 로맨티스트형", reason="잦은 애정표현이 부담스럽게 느껴질 수 있어요."),
        ),
    ),
    dict(
        id=2, emoji="🍵", title="잔잔한 안정 추구형", subtitle="요란하지 않지만 편안한 연애가 좋아",
        percentile="상위 51%",
        summary="화려하고 뜨거운 연애보다는 편안하고 안정적인 관계를 추구하는 타입이에요. 서로 부담을 주지 않는 잔잔한 케미를 만들어가는 걸 좋아해요. 가끔은 이벤트나 깜짝 표현으로 관계에 활력을 더해보세요.",
        traits=["안정적인 관계 선호", "차분한 소통 스타일", "부담 없는 연애 지향"],
        color="#10B981",
        compat=dict(
            best=dict(id=3, emoji="🎣", title="밀당의 고수형", reason="적당한 긴장감이 편안한 관계에 활력을 더해줘요."),
            worst=dict(id=5, emoji="🔥", title="올인 불꽃연애형", reason="너무 뜨거운 온도차에 지칠 수 있어요."),
        ),
    ),
    dict(
        id=3, emoji="🎣", title="밀당의 고수형", subtitle="적당한 긴장감이 있어야 재밌지",
        percentile="상위 29%",
        summary="마음을 다 보여주기보다는 적당한 밀당으로 관계에 긴장감을 유지하는 타입이에요. 그 밀고 당기는 재미를 즐기지만, 상대가 진심을 헷갈려할 수 있으니 중요한 순간엔 마음을 명확히 전달하는 게 좋아요.",
        traits=["능숙한 밀당 스킬", "감정 표현에 신중함", "관계의 주도권을 즐김"],
        color="#F59E0B",
        compat=dict(
            best=dict(id=2, emoji="🍵", title="잔잔한 안정 추구형", reason="편안하게 받아주는 상대 덕분에 밀당도 부담 없이 즐길 수 있어요."),
            worst=dict(id=1, emoji="🦅", title="자유로운 독립연애형", reason="둘 다 마음을 잘 안 보여줘서 관계가 제자리걸음일 수 있어요."),
        ),
    ),
    dict(
        id=4, emoji="💌", title="다정한 로맨티스트형", subtitle="표현하는 사랑이 진짜 사랑이지",
        percentile="상위 15%",
        summary="생각과 마음을 아끼지 않고 표현하는 다정한 로맨티스트예요. 기념일도 잘 챙기고 애정표현도 풍부해서 연인을 늘 설레게 만들어요. 다만 상대의 온도에 맞춰가는 균형도 함께 신경 써보세요.",
        traits=["풍부한 애정표현", "기념일을 잘 챙김", "다정하고 세심한 배려"],
        color="#EC4899",
        compat=dict(
            best=dict(id=2, emoji="🍵", title="잔잔한 안정 추구형", reason="차분하게 받아주는 상대 덕분에 다정함이 더 빛나요."),
            worst=dict(id=5, emoji="🔥", title="올인 불꽃연애형", reason="둘 다 감정 기복이 커서 관계가 롤러코스터가 될 수 있어요."),
        ),
    ),
    dict(
        id=5, emoji="🔥", title="올인 불꽃연애형", subtitle="한번 빠지면 화끈하게 올인",
        percentile="상위 6%",
        summary="연애를 시작하면 온 마음을 다해 뜨겁게 몰입하는 타입이에요. 상대에게 집중하는 만큼 사랑도 크고 깊지만, 감정 기복이 클 수 있으니 가끔은 한 발짝 떨어져서 여유를 가져보는 것도 관계에 도움이 돼요.",
        traits=["강렬한 몰입형 연애", "풍부한 감정 표현", "상대에게 최선을 다함"],
        color="#EF4444",
        compat=dict(
            best=dict(id=1, emoji="🦅", title="자유로운 독립연애형", reason="적당히 밀고 당겨주는 상대 덕분에 연애가 더 짜릿해져요."),
            worst=dict(id=4, emoji="💌", title="다정한 로맨티스트형", reason="둘 다 감정 기복이 커서 관계가 롤러코스터가 될 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 연애 유형 테스트</title>
<meta name="description" content="{subtitle} - 알아볼괘 연애 유형 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/love-style-{id}.png" />
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
    <p class="index-title">나의 열정 지수</p>
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
    ⚠️ 이 결과는 재미로 즐기는 콘텐츠예요. 실제 관계 상담이 필요하다면 전문가와 상담해 주세요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/love-style-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getLoveStyleById({id});
    var params = new URLSearchParams(window.location.search);
    var scoreParam = params.get("score");
    var hasScore = scoreParam !== null && !isNaN(Number(scoreParam));
    var scoreNum = hasScore ? Number(scoreParam) : Math.round((result.min + result.max) / 2);
    var percent = Math.round((scoreNum / LOVESTYLE_MAX_SCORE) * 100);

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
      ? "총점 " + scoreNum + " / " + LOVESTYLE_MAX_SCORE + "점 · 전체 응시자 중 " + result.percentile
      : result.title + " 유형의 평균 지수예요 (테스트를 하면 내 점수로 정확히 나와요)";

    renderCompatSection("compatSection", LOVESTYLE_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나의 연애 유형은 '" + result.title + "' " + result.emoji,
        "너의 결과는? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/love-style-{id}.png",
        "알아볼괘_연애유형_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "love-style")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    html = TEMPLATE.format(
        id=r["id"], emoji=r["emoji"], title=r["title"], subtitle=r["subtitle"],
        percentile=r["percentile"], summary=r["summary"], color=r["color"], traits_html=traits_html,
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
