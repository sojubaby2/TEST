#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
동물상 테스트 결과 페이지 생성 스크립트.
assets/js/animal-face-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id="dog", emoji="🐶", title="강아지상", subtitle="사교적이고 애정표현이 풍부한 사랑둥이",
        summary="누구에게나 먼저 다가가는 밝고 사교적인 타입이에요. 애정표현이 풍부하고 감정이 얼굴에 다 드러나서 곁에 있으면 편안하고 즐거운 사람이라는 얘기를 자주 들어요. 그만큼 상처도 잘 받으니 스스로를 잘 챙겨주세요.",
        traits=["뛰어난 사교성", "풍부한 애정표현", "감정에 솔직함"],
        color="#F59E0B", fallback_percent=60,
        compat=dict(
            best=dict(id="cat", emoji="🐱", title="고양이상", reason="정반대 매력에 끌려요! 활발한 당신과 도도한 상대가 밀당의 재미를 만들어요."),
            worst=dict(id="fox", emoji="🦊", title="여우상", reason="능글맞은 상대의 페이스에 자꾸 휘둘릴 수 있어요."),
        ),
    ),
    dict(
        id="cat", emoji="🐱", title="고양이상", subtitle="도도하고 시크하지만 은근 매력있는 타입",
        summary="쉽게 곁을 안 주는 도도하고 시크한 매력의 타입이에요. 낯을 가리고 예민한 편이지만, 한번 마음을 열면 은근한 다정함을 보여줘요. 그 밀당 아닌 밀당이 사람들을 끌어당기는 매력 포인트예요.",
        traits=["도도하고 시크한 매력", "예민하고 섬세함", "독립적인 성향"],
        color="#6366F1", fallback_percent=50,
        compat=dict(
            best=dict(id="dog", emoji="🐶", title="강아지상", reason="한결같이 다가와주는 상대 덕분에 마음을 열게 돼요."),
            worst=dict(id="bear", emoji="🐻", title="곰상", reason="너무 무던한 반응에 심심함을 느낄 수 있어요."),
        ),
    ),
    dict(
        id="fox", emoji="🦊", title="여우상", subtitle="눈치 빠르고 영리한 매력덩어리 타입",
        summary="상황 파악이 빠르고 영리하게 처세하는 타입이에요. 눈치가 빨라서 어떤 자리에서든 분위기를 잘 맞추고, 은근한 매력으로 사람들의 마음을 사로잡아요. 다만 너무 계산적으로 보이지 않게 가끔은 솔직함도 보여주세요.",
        traits=["빠른 눈치와 센스", "영리한 상황 판단력", "은근한 매력"],
        color="#EA580C", fallback_percent=50,
        compat=dict(
            best=dict(id="bear", emoji="🐻", title="곰상", reason="순박한 상대를 요리조리 챙겨주는 재미가 있어요."),
            worst=dict(id="dog", emoji="🐶", title="강아지상", reason="직진하는 상대의 순수함에 오히려 당신이 부담을 느낄 수 있어요."),
        ),
    ),
    dict(
        id="bear", emoji="🐻", title="곰상", subtitle="듬직하고 순박한 든든이 타입",
        summary="느긋하고 순박한 매력의 든든한 타입이에요. 웬만한 일에는 화를 잘 안 내고 곁에 있는 사람을 편안하게 만들어줘서 은근히 인기가 많아요. 가끔은 눈치도 빠르게 발휘해서 손해 보는 일을 줄여보세요.",
        traits=["느긋하고 순박한 성격", "높은 포용력", "든든한 존재감"],
        color="#92400E", fallback_percent=50,
        compat=dict(
            best=dict(id="fox", emoji="🦊", title="여우상", reason="영리한 상대가 든든한 당신을 잘 이끌어줘요."),
            worst=dict(id="cat", emoji="🐱", title="고양이상", reason="예민한 상대의 마음을 잘 못 읽어서 서운하게 만들 수 있어요."),
        ),
    ),
    dict(
        id="rabbit", emoji="🐰", title="토끼상", subtitle="여리여리하고 조심스러운 순둥이 타입",
        summary="여리여리하고 조심스러운 순둥이 타입이에요. 놀랄 일이 생기면 금방 예민해지고, 화가 나도 웬만하면 참는 편이라 손해를 보기도 해요. 그 여린 매력이 사람들을 챙겨주고 싶게 만드는 포인트이기도 해요.",
        traits=["여리고 조심스러운 성격", "높은 눈치와 배려심", "감정을 잘 참는 편"],
        color="#EC4899", fallback_percent=50,
        compat=dict(
            best=dict(id="dog", emoji="🐶", title="강아지상", reason="든든하게 챙겨주는 상대 덕분에 편하게 마음을 열 수 있어요."),
            worst=dict(id="fox", emoji="🦊", title="여우상", reason="영리하고 계산적인 상대에게 자꾸 휘둘릴 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 마음캐치 동물상 테스트</title>
<meta name="description" content="{subtitle} - 마음캐치 동물상 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 동물상도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/animal-face-{id}.png" />
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
    <p class="index-title">동물상 일치도</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub" id="indexSub">10문항 중 '{title}'에 가장 가깝게 답한 비율이에요</p>
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
    ⚠️ 이 테스트는 사진 분석이 아닌 성격 기반 설문형 테스트예요. 재미로 즐겨주세요!
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/animal-face-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getAnimalFaceById("{id}");
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

    renderCompatSection("compatSection", ANIMALFACE_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나는 '" + result.title + "' " + result.emoji,
        "너의 동물상은? 마음캐치에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/animal-face-{id}.png",
        "마음캐치_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "animal-face")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    html = TEMPLATE.format(
        id=r["id"], emoji=r["emoji"], title=r["title"], subtitle=r["subtitle"],
        summary=r["summary"], color=r["color"], traits_html=traits_html,
        fallback_percent=r["fallback_percent"],
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
