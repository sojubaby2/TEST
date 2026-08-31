#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
오늘의 운세(띠 기반) 결과 페이지 생성 스크립트.
assets/js/today-fortune-data.js 의 ZODIAC_LIST 내용과 반드시 일치시킬 것.
결과 내용은 사용자가 페이지를 열 때마다 오늘 날짜 기준으로 JS가 동적으로 계산해서 채움
(이 스크립트는 정적 뼈대만 생성함).
"""
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(BASE_DIR, "tests", "today-fortune")

ZODIAC = [
    dict(id="rat", emoji="🐭", title="쥐띠", trait="재빠른 판단력", color="#64748B"),
    dict(id="ox", emoji="🐮", title="소띠", trait="우직한 성실함", color="#7C5C3E"),
    dict(id="tiger", emoji="🐯", title="호랑이띠", trait="거침없는 추진력", color="#EA580C"),
    dict(id="rabbit", emoji="🐰", title="토끼띠", trait="섬세한 배려심", color="#EC4899"),
    dict(id="dragon", emoji="🐲", title="용띠", trait="타고난 카리스마", color="#7C3AED"),
    dict(id="snake", emoji="🐍", title="뱀띠", trait="날카로운 통찰력", color="#16A34A"),
    dict(id="horse", emoji="🐴", title="말띠", trait="넘치는 활력", color="#DC2626"),
    dict(id="goat", emoji="🐑", title="양띠", trait="따뜻한 온화함", color="#0EA5E9"),
    dict(id="monkey", emoji="🐵", title="원숭이띠", trait="번뜩이는 재치", color="#D97706"),
    dict(id="rooster", emoji="🐔", title="닭띠", trait="꼼꼼한 계획성", color="#F59E0B"),
    dict(id="dog", emoji="🐶", title="개띠", trait="변함없는 의리", color="#0369A1"),
    dict(id="pig", emoji="🐷", title="돼지띠", trait="넉넉한 포용력", color="#DB2777"),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>오늘의 {title} 운세 | 마음캐치</title>
<meta name="description" content="{title} 오늘의 총운, 애정운, 금전운, 건강운과 행운의 아이템을 확인해보세요." />

<meta property="og:type" content="website" />
<meta property="og:title" content="오늘의 {title} 운세 {emoji}" />
<meta property="og:description" content="오늘의 총운 · 애정운 · 금전운 · 건강운을 확인해보세요!" />
<meta property="og:image" content="../../assets/img/og/today-fortune-{id}.png" />
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
    <p class="subtitle" id="todayDateLabel">오늘의 운세</p>
  </div>

  <div class="card">
    <p style="margin:0;font-size:14px;color:var(--text-sub);">{title}는(은) <b style="color:var(--text-main);">{trait}</b>이 돋보이는 띠예요.</p>
    <ul class="fortune-list" id="fortuneList"></ul>
  </div>

  <p class="section-title" style="margin-top:24px;">오늘의 행운 정보</p>
  <div class="card">
    <div class="lucky-grid" id="luckyGrid"></div>
  </div>

  <p class="section-title" style="margin-top:28px;">나와 잘 맞는 띠는?</p>
  <div id="compatSection"></div>

  <div class="btn-row">
    <button class="btn btn-primary" id="shareBtn" type="button">결과 공유하기</button>
  </div>
  <div class="btn-row">
    <button class="btn btn-secondary" id="copyBtn" type="button">🔗 링크 복사</button>
    <button class="btn btn-secondary" id="downloadBtn" type="button">🖼️ 이미지 저장</button>
  </div>

  <a class="btn btn-secondary" href="index.html" style="margin-top:20px;">🔄 다른 띠 보기</a>
  <a class="btn btn-secondary" href="../../index.html">🏠 다른 테스트 보러가기</a>

  <div class="ad-slot">광고 영역 (심사 통과 후 게재 예정)</div>

  <p class="notice">
    ⚠️ 이 콘텐츠는 재미로 즐기는 운세이며, 실제 미래를 예측하거나 중요한 의사결정의 근거로 사용하기 위한 것이 아니에요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/today-fortune-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var zodiacId = "{id}";
    var z = getZodiacById(zodiacId);
    var fortune = getTodayFortune(zodiacId);

    var dateParts = fortune.dateStr.split("-");
    document.getElementById("todayDateLabel").textContent =
      dateParts[0] + "년 " + Number(dateParts[1]) + "월 " + Number(dateParts[2]) + "일의 운세";

    var items = [
      {{ icon: "🌟", label: "총운", text: fortune.total }},
      {{ icon: "💕", label: "애정운", text: fortune.love }},
      {{ icon: "💰", label: "금전운", text: fortune.money }},
      {{ icon: "🌿", label: "건강운", text: fortune.health }},
    ];
    var listEl = document.getElementById("fortuneList");
    items.forEach(function (item) {{
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="fortune-icon">' + item.icon + "</span>" +
        '<div><p class="fortune-label">' + item.label + '</p><p class="fortune-text">' + item.text + "</p></div>";
      listEl.appendChild(li);
    }});

    var luckyGrid = document.getElementById("luckyGrid");
    luckyGrid.innerHTML =
      '<div class="lucky-item"><p class="lucky-label">행운의 색</p><div class="lucky-swatch" style="background:' +
      fortune.color.hex + '"></div><p class="lucky-value">' + fortune.color.name + "</p></div>" +
      '<div class="lucky-item"><p class="lucky-label">행운의 숫자</p><div class="lucky-swatch" style="background:var(--bg);display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--brand-1);">' +
      fortune.number + '</div><p class="lucky-value">' + fortune.number + "</p></div>" +
      '<div class="lucky-item"><p class="lucky-label">행운의 아이템</p><div class="lucky-swatch" style="background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:14px;">🍀</div><p class="lucky-value">' +
      fortune.item + "</p></div>";

    renderCompatSection("compatSection", ZODIAC_LIST, z.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "오늘의 " + z.title + " 운세 " + z.emoji,
        "내 오늘의 운세는? 마음캐치에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/today-fortune-" + zodiacId + ".png",
        "마음캐치_오늘의운세_" + z.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

for z in ZODIAC:
    html = TEMPLATE.format(**z)
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(z["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
