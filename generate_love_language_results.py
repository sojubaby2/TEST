#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
사랑의 언어 테스트 결과 페이지 생성 스크립트.
assets/js/love-language-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id="words", emoji="💬", title="말 한마디형", subtitle="다정한 말 한마디에 마음이 녹는 타입",
        summary="다정한 말 한마디에 하루가 달라지는 타입이에요. '고마워', '사랑해' 같은 말을 직접 들을 때 사랑받고 있다는 확신이 들고, 반대로 아무 말이 없으면 서운함을 느끼기 쉬워요. 표현에 서툰 상대에게는 먼저 다가가 어떤 말이 힘이 되는지 알려주는 것도 좋은 방법이에요.",
        traits=["칭찬과 인정에 약함", "말로 하는 표현을 중요하게 생각함", "무심한 말 한마디에 상처받기도 함"],
        color="#3B82F6",
        compat=dict(
            best=dict(id="touch", emoji="🤗", title="스킨십형", reason="말로 표현하는 사랑과 따뜻한 스킨십이 만나면 애정표현이 풍부한 커플이 돼요."),
            worst=dict(id="acts", emoji="🤝", title="헌신형", reason="행동이 앞서는 상대라 말로 확인받고 싶은 마음이 서운함으로 쌓일 수 있어요."),
        ),
    ),
    dict(
        id="time", emoji="⏰", title="함께하는 시간형", subtitle="무엇을 하든 같이 있는 시간이 가장 소중한 타입",
        summary="무엇을 하든 '함께'라는 사실 자체가 가장 큰 사랑의 증거인 타입이에요. 거창한 이벤트보다 온전히 집중해서 같이 보내는 시간을 더 소중하게 여기고, 바쁘다는 이유로 계속 미뤄지면 마음이 멀어진다고 느껴요.",
        traits=["온전한 집중과 함께하는 시간이 중요", "소소한 일상 데이트를 선호", "약속이 자주 미뤄지면 서운함을 느낌"],
        color="#8B5CF6",
        compat=dict(
            best=dict(id="acts", emoji="🤝", title="헌신형", reason="함께하는 시간과 실질적인 챙김이 더해져 든든하고 편안한 관계가 돼요."),
            worst=dict(id="gifts", emoji="🎁", title="선물형", reason="선물보다 함께하는 시간이 중요한데, 이벤트에만 신경쓰는 상대라면 아쉬움이 남을 수 있어요."),
        ),
    ),
    dict(
        id="gifts", emoji="🎁", title="선물형", subtitle="정성 담긴 선물에 사랑을 느끼는 타입",
        summary="정성이 담긴 선물 하나에 사랑받는 기분을 느끼는 타입이에요. 선물의 가격보다 '나를 생각하며 골랐다'는 마음 자체가 중요하고, 기념일이나 특별한 날을 잘 챙겨주는 상대에게 큰 감동을 느껴요.",
        traits=["정성이 담긴 선물에 감동함", "기념일을 잘 챙기는 걸 중요하게 여김", "깜짝 이벤트를 좋아함"],
        color="#F59E0B",
        compat=dict(
            best=dict(id="words", emoji="💬", title="말 한마디형", reason="정성스런 선물과 다정한 말이 만나 사랑을 확실하게 느낄 수 있는 조합이에요."),
            worst=dict(id="time", emoji="⏰", title="함께하는 시간형", reason="선물보다 그냥 같이 있는 시간을 더 중요하게 여기는 상대라 서운할 수 있어요."),
        ),
    ),
    dict(
        id="acts", emoji="🤝", title="헌신형", subtitle="말보다 행동으로 챙겨주는 걸 좋아하는 타입",
        summary="말보다 행동으로 보여주는 사랑을 더 신뢰하는 타입이에요. 힘들 때 옆에서 대신 해결해주거나 챙겨주는 실질적인 배려에서 사랑을 느끼고, 입으로만 하는 약속보다는 직접 움직여주는 모습에 더 마음이 움직여요.",
        traits=["행동으로 보여주는 사랑을 신뢰함", "실질적인 도움과 배려를 중요하게 여김", "말뿐인 약속에는 시큰둥함"],
        color="#10B981",
        compat=dict(
            best=dict(id="time", emoji="⏰", title="함께하는 시간형", reason="함께 시간을 보내주면서 실질적으로 챙겨주는 상대와 찰떡궁합이에요."),
            worst=dict(id="touch", emoji="🤗", title="스킨십형", reason="스킨십으로 애정을 표현하는 상대에게는 당신의 헌신이 잘 안 와닿을 수 있어요."),
        ),
    ),
    dict(
        id="touch", emoji="🤗", title="스킨십형", subtitle="따뜻한 스킨십으로 사랑을 확인하는 타입",
        summary="따뜻한 스킨십으로 사랑을 확인하는 타입이에요. 손을 잡거나 꼭 안아주는 것만으로도 마음이 편안해지고, 스킨십이 부족하면 사랑받지 못한다는 불안을 느끼기도 해요. 스킨십에 서툰 상대라면 조금씩 자연스럽게 늘려가 보세요.",
        traits=["스킨십으로 안정감을 느낌", "가까운 거리와 접촉을 편안해함", "스킨십이 부족하면 불안해질 수 있음"],
        color="#EC4899",
        compat=dict(
            best=dict(id="words", emoji="💬", title="말 한마디형", reason="다정한 말과 따뜻한 스킨십이 함께라면 사랑이 풍부하게 느껴지는 조합이에요."),
            worst=dict(id="gifts", emoji="🎁", title="선물형", reason="스킨십보다 선물에 집중하는 상대라 스킨십 욕구가 채워지지 않을 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 마음캐치 사랑의 언어 테스트</title>
<meta name="description" content="{subtitle} - 마음캐치 사랑의 언어 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 사랑의 언어는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 사랑의 언어도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/love-language-{id}.png" />
<meta property="og:url" content="./result-{id}.html" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{emoji}</text></svg>" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html">🧠 마음캐치</a>
</header>

<main class="wrap">
  <div class="result-hero" style="background:{color};">
    <div class="emoji">{emoji}</div>
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>

  <div class="card index-card">
    <p class="index-title">사랑의 언어 지수</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub" id="indexSub">'{title}' 선택지 중 얼마나 이 언어를 선택했는지 보여주는 지수예요</p>
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
    ⚠️ 이 테스트는 심리학자 게리 채프먼의 '5가지 사랑의 언어' 개념에서 착안한 재미용 콘텐츠예요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/love-language-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getLoveLangById("{id}");
    var params = new URLSearchParams(window.location.search);
    var percentParam = params.get("percent");
    var percent = percentParam !== null && !isNaN(Number(percentParam)) ? Number(percentParam) : {fallback_percent};

    var indexPercent = document.getElementById("indexPercent");
    var indexGauge = document.getElementById("indexGauge");
    indexPercent.textContent = percent + "%";
    indexPercent.style.color = result.color;
    requestAnimationFrame(function () {{
      indexGauge.style.width = percent + "%";
    }});
    indexGauge.style.background = result.color;

    renderCompatSection("compatSection", LOVELANG_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나의 사랑의 언어는 '" + result.title + "' " + result.emoji,
        "너의 사랑의 언어는? 마음캐치에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/love-language-{id}.png",
        "마음캐치_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "love-language")

# 5C2 구조상 어떤 언어든 최소 2/4(50%)는 확보해야 결과로 선택될 수 있음(동점 시 우선순위로 결정)
FALLBACK_PERCENT = {"words": 75, "time": 50, "gifts": 50, "acts": 50, "touch": 50}

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    html = TEMPLATE.format(
        id=r["id"], emoji=r["emoji"], title=r["title"], subtitle=r["subtitle"],
        summary=r["summary"], color=r["color"], traits_html=traits_html,
        fallback_percent=FALLBACK_PERCENT[r["id"]],
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
