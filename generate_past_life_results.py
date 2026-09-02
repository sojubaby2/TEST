#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
전생 테스트 결과 페이지 생성 스크립트.
assets/js/past-life-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id="pharaoh", emoji="👑", title="이집트 파라오", subtitle="타고난 카리스마로 사람들을 이끄는 리더",
        summary="전생에 사람들 위에 서서 나라를 다스리던 리더였을 가능성이 높아요. 타고난 카리스마와 위엄으로 자연스럽게 분위기를 주도하고, 완벽을 추구하는 성향이 강해요. 다만 그만큼 책임감의 무게도 크게 느끼는 편이니 가끔은 내려놓는 여유도 필요해요.",
        traits=["타고난 리더십과 카리스마", "완벽주의 성향", "품위와 명예를 중요하게 여김"],
        color="#D4A017", fallback_percent=40,
        compat=dict(
            best=dict(id="merchant", emoji="🐫", title="실크로드 상인", reason="카리스마 있는 리더와 노련한 협상가가 만나면 환상의 파트너십을 이뤄요."),
            worst=dict(id="artist", emoji="🎨", title="르네상스 예술가", reason="자유분방한 상대의 즉흥적인 스타일이 통제하기 어렵게 느껴질 수 있어요."),
        ),
    ),
    dict(
        id="viking", emoji="🛡️", title="바이킹 전사", subtitle="두려움 없이 새로운 땅을 개척하던 모험가",
        summary="거친 파도를 헤치고 미지의 땅을 개척하던 용맹한 전사였을 가능성이 높아요. 두려움보다 호기심이 앞서고, 일단 부딪히며 배우는 실행력이 남달라요. 직설적인 성격 때문에 가끔 오해를 사기도 하지만, 그만큼 솔직하고 믿음직한 사람이에요.",
        traits=["뛰어난 용기와 실행력", "직설적이고 솔직한 성격", "새로운 도전을 두려워하지 않음"],
        color="#475569", fallback_percent=40,
        compat=dict(
            best=dict(id="artist", emoji="🎨", title="르네상스 예술가", reason="거침없는 전사와 자유로운 예술가, 서로 다른 매력에 강하게 끌려요."),
            worst=dict(id="scholar", emoji="📜", title="조선시대 선비", reason="신중하게 재고 따지는 상대의 속도가 답답하게 느껴질 수 있어요."),
        ),
    ),
    dict(
        id="scholar", emoji="📜", title="조선시대 선비", subtitle="원칙과 배움을 중시하던 학자",
        summary="책과 씨름하며 원칙을 지키던 조용한 학자였을 가능성이 높아요. 깊이 있게 탐구하는 걸 좋아하고, 신중하게 생각한 뒤에 행동하는 스타일이에요. 절제된 언행 덕분에 신뢰를 받지만, 가끔은 감정을 더 표현해도 좋아요.",
        traits=["신중하고 원칙적인 성향", "깊이 있는 탐구를 좋아함", "절제된 언행으로 신뢰를 받음"],
        color="#1E3A8A", fallback_percent=30,
        compat=dict(
            best=dict(id="artist", emoji="🎨", title="르네상스 예술가", reason="이성적인 학자와 감성적인 예술가가 만나 서로의 부족한 부분을 채워줘요."),
            worst=dict(id="viking", emoji="🛡️", title="바이킹 전사", reason="즉흥적이고 저돌적인 상대의 행동이 불안하게 느껴질 수 있어요."),
        ),
    ),
    dict(
        id="merchant", emoji="🐫", title="실크로드 상인", subtitle="각지를 누비며 사람과 재물을 다루던 협상가",
        summary="낙타에 짐을 싣고 이 나라 저 나라를 누비던 노련한 상인이었을 가능성이 높아요. 사교성이 좋고 현실감각이 뛰어나 어떤 상황에서도 실속을 챙기는 편이에요. 다재다능하고 협상에 능하지만, 가끔은 손익을 따지지 않는 순수한 마음도 필요해요.",
        traits=["뛰어난 사교성과 협상력", "현실적이고 실속있는 판단", "다재다능한 만능형"],
        color="#C2703D", fallback_percent=40,
        compat=dict(
            best=dict(id="pharaoh", emoji="👑", title="이집트 파라오", reason="현실적인 협상가가 카리스마 있는 리더를 든든하게 뒷받침해줘요."),
            worst=dict(id="viking", emoji="🛡️", title="바이킹 전사", reason="계산 없이 저지르는 상대의 즉흥성에 마음을 놓기 어려울 수 있어요."),
        ),
    ),
    dict(
        id="artist", emoji="🎨", title="르네상스 예술가", subtitle="아름다움을 좇던 자유로운 영혼",
        summary="화려한 예술의 시대, 붓과 조각칼을 들고 아름다움을 좇던 예술가였을 가능성이 높아요. 감성이 풍부하고 틀에 얽매이지 않는 자유로운 발상을 좋아해요. 영감이 떠오르면 몰입하는 편이라 현실적인 부분은 가끔 놓치기도 해요.",
        traits=["풍부한 감성과 창의력", "자유롭고 개성있는 사고방식", "몰입하면 주변을 잊는 편"],
        color="#7C3AED", fallback_percent=40,
        compat=dict(
            best=dict(id="viking", emoji="🛡️", title="바이킹 전사", reason="자유로운 예술가와 용맹한 전사, 서로의 열정에 이끌리는 조합이에요."),
            worst=dict(id="pharaoh", emoji="👑", title="이집트 파라오", reason="위엄과 격식을 중시하는 상대에게 자유로운 영혼이 억눌리는 느낌을 받을 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 전생 테스트</title>
<meta name="description" content="{subtitle} - 알아볼괘 전생 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 전생은 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 전생도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/past-life-{id}.png" />
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
    <p class="index-title">전생 일치도</p>
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

  <p class="section-title" style="margin-top:28px;">나와 잘 맞는 전생은?</p>
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
    ⚠️ 이 테스트는 성격 기반의 재미용 콘텐츠이며 실제 전생과는 무관해요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/past-life-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getPastLifeById("{id}");
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

    renderCompatSection("compatSection", PASTLIFE_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나의 전생은 '" + result.title + "' " + result.emoji,
        "너의 전생은? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/past-life-{id}.png",
        "알아볼괘_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "past-life")

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
