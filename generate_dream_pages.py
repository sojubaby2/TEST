import json
import os

with open("assets/js/dream-fortune-data.js", encoding="utf-8") as f:
    js_content = f.read()

# dream-fortune-data.js 안의 두 JS 배열(JSON 호환)을 그대로 파싱해서 재사용
start = js_content.index("var DREAM_CATEGORIES = ") + len("var DREAM_CATEGORIES = ")
end = js_content.index(";\n\n", start)
CATEGORIES = json.loads(js_content[start:end])

start2 = js_content.index("var DREAM_LIST = ") + len("var DREAM_LIST = ")
end2 = js_content.index(";\n", start2)
DREAMS = json.loads(js_content[start2:end2])

print("categories:", len(CATEGORIES), "dreams:", len(DREAMS))

FORTUNE_GRADIENT = {
    "길몽": "linear-gradient(135deg, #16a34a, #15803d)",
    "흉몽": "linear-gradient(135deg, #64748b, #475569)",
    "길흉반반": "linear-gradient(135deg, #d97706, #b45309)",
}

FORTUNE_BADGE_CLASS = {
    "길몽": "dream-badge-good",
    "흉몽": "dream-badge-bad",
    "길흉반반": "dream-badge-mixed",
}

CAT_LABEL = {c["id"]: c["label"] for c in CATEGORIES}
CAT_EMOJI = {c["id"]: c["emoji"] for c in CATEGORIES}

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{keyword} 해몽 | 알아볼괘</title>
<meta name="description" content="{keyword} 의미가 궁금하다면? {summary} 알아볼괘 꿈해몽 사전에서 확인해보세요." />

<meta property="og:type" content="website" />
<meta property="og:title" content="{keyword} 해몽 {emoji}" />
<meta property="og:description" content="{summary}" />
<meta property="og:image" content="../../assets/img/og/dream-interpretation-intro.png" />
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
  <div class="dream-keyword-hero" style="background:{gradient};">
    <div class="emoji">{emoji}</div>
    <h1>{keyword}</h1>
    <span class="dream-badge" style="font-size:13px;padding:4px 12px;background:rgba(255,255,255,0.25);color:#fff;">{fortune}</span>
  </div>

  <div class="card">
    <p class="section-title" style="margin-top:0;">한눈에 보는 의미</p>
    <p style="margin:0;font-size:14.5px;line-height:1.7;color:var(--text-main);font-weight:600;">{summary}</p>
  </div>

  <div class="card">
    <p class="section-title" style="margin-top:0;">자세한 꿈해몽</p>
    <p style="margin:0;font-size:14px;line-height:1.8;color:var(--text-main);">{detail}</p>
  </div>

  <p class="section-title" style="margin-top:24px;">이런 검색어로도 찾아요</p>
  <div class="card">
    <div class="dream-chip-row" style="overflow-x:visible;flex-wrap:wrap;">
      {alias_chips}
    </div>
  </div>

  <p class="section-title" style="margin-top:28px;">{cat_emoji} {cat_label} 관련 꿈풀이 더 보기</p>
  <div class="dream-related-list" id="relatedList"></div>

  <div class="btn-row" style="margin-top:24px;">
    <button class="btn btn-primary" id="shareBtn" type="button">결과 공유하기</button>
  </div>
  <div class="btn-row">
    <button class="btn btn-secondary" id="copyBtn" type="button">🔗 링크 복사</button>
  </div>

  <a class="btn btn-secondary" href="index.html" style="margin-top:20px;">🔍 다른 꿈 검색하기</a>
  <a class="btn btn-secondary" href="../../index.html">🏠 다른 테스트 보러가기</a>

  <div class="ad-slot">광고 영역 (심사 통과 후 게재 예정)</div>

  <p class="notice">
    🌙 이 콘텐츠는 전통 해몽을 재미로 풀어낸 참고용 콘텐츠이며, 실제 길흉을 예언하거나 중요한 의사결정의 근거로 사용하기 위한 것이 아니에요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/dream-fortune-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var relatedList = document.getElementById("relatedList");
    var related = getDreamsByCategory("{category}")
      .filter(function (d) {{ return d.id !== "{id}"; }})
      .slice(0, 4);

    var fortuneBadgeClass = {{
      "길몽": "dream-badge-good",
      "흉몽": "dream-badge-bad",
      "길흉반반": "dream-badge-mixed"
    }};

    related.forEach(function (item) {{
      var a = document.createElement("a");
      a.className = "dream-result-item";
      a.href = "result-" + item.id + ".html";
      var badgeClass = fortuneBadgeClass[item.fortune] || "dream-badge-mixed";
      a.innerHTML =
        '<div class="dream-result-emoji">' + item.emoji + "</div>" +
        '<div class="dream-result-info">' +
        '<h3>' + item.keyword + '<span class="dream-badge ' + badgeClass + '">' + item.fortune + "</span></h3>" +
        '<p>' + item.summary + "</p>" +
        "</div>" +
        '<div class="arrow">›</div>';
      relatedList.appendChild(a);
    }});

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "{keyword} 해몽 {emoji} " + "{summary}",
        "알아볼괘 꿈해몽 사전에서 내 꿈도 검색해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
  }})();
</script>

</body>
</html>
"""

os.makedirs("tests/dream-interpretation", exist_ok=True)

for d in DREAMS:
    alias_chips = "".join(
        '<span class="dream-chip" style="cursor:default;">' + a + "</span>"
        for a in d["aliases"]
    )
    html = TEMPLATE.format(
        id=d["id"],
        keyword=d["keyword"],
        emoji=d["emoji"],
        fortune=d["fortune"],
        summary=d["summary"],
        detail=d["detail"],
        category=d["category"],
        cat_label=CAT_LABEL.get(d["category"], d["category"]),
        cat_emoji=CAT_EMOJI.get(d["category"], "✨"),
        gradient=FORTUNE_GRADIENT.get(d["fortune"], FORTUNE_GRADIENT["길흉반반"]),
        badge_class=FORTUNE_BADGE_CLASS.get(d["fortune"], "dream-badge-mixed"),
        alias_chips=alias_chips,
    )
    with open(f"tests/dream-interpretation/result-{d['id']}.html", "w", encoding="utf-8") as f:
        f.write(html)

print("done,", len(DREAMS), "files written")
