#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
테토-에겐 테스트 결과 페이지(result-teto-m/f, result-egen-m/f) 생성 스크립트.
assets/js/teto-egen-data.js 의 내용과 반드시 일치시킬 것.
"""
import os

RESULTS = [
    dict(
        id="teto-m",
        emoji="🦁",
        title="테토남",
        subtitle="상남자st 에너지, 든든한 리더 타입",
        summary="시원시원하고 주도적인 테토 에너지가 강한 타입이에요. 눈치 안 보고 할 말은 하는 편이라 곁에 있으면 든든하다는 얘기를 자주 들어요. 감정 표현에 서툴러 보일 때도 있지만, 그만큼 위기 상황에서 믿음직한 모습을 보여줘요.",
        traits=["직진적이고 솔직한 성격", "리더십이 강한 편", "감정 표현엔 다소 서투름"],
        color="#1E3A8A",
        compat=dict(
            best=dict(id="egen-f", emoji="🌸", title="에겐녀", reason="정반대의 매력에 끌려요. 시원시원한 당신과 여리여리한 상대가 서로를 완성해줘요."),
            worst=dict(id="teto-f", emoji="🐯", title="테토녀", reason="둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요."),
        ),
    ),
    dict(
        id="teto-f",
        emoji="🐯",
        title="테토녀",
        subtitle="걸크러시 에너지, 확실한 자기주장",
        summary="눈치 보지 않고 당당하게 자기 의견을 말하는 걸크러시 타입이에요. 씩씩하고 쿨한 매력으로 주변 사람들을 이끄는 힘이 있어요. 부드러운 매력보다는 명확하고 시원한 매력으로 어필하는 편이에요.",
        traits=["당당하고 자기주장이 확실함", "쿨하고 시원시원한 성격", "위기에 강한 멘탈"],
        color="#9F1239",
        compat=dict(
            best=dict(id="egen-m", emoji="🐰", title="에겐남", reason="부드럽게 맞춰주는 상대 덕분에 당신의 매력이 더 빛나요."),
            worst=dict(id="teto-m", emoji="🦁", title="테토남", reason="둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요."),
        ),
    ),
    dict(
        id="egen-m",
        emoji="🐰",
        title="에겐남",
        subtitle="부드럽고 섬세한, 다정한 에너지",
        summary="다정하고 섬세한 에겐 에너지가 강한 타입이에요. 상대방의 감정을 잘 살피고 배려심이 깊어서 편안한 사람이라는 얘기를 자주 들어요. 꾸미는 것에도 관심이 많고 감성적인 매력이 돋보여요.",
        traits=["섬세하고 배려심이 깊음", "감성적이고 다정한 편", "스타일에 관심이 많음"],
        color="#7C3AED",
        compat=dict(
            best=dict(id="teto-f", emoji="🐯", title="테토녀", reason="당당하게 리드해주는 상대 덕분에 편하게 마음을 열 수 있어요."),
            worst=dict(id="egen-f", emoji="🌸", title="에겐녀", reason="둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요."),
        ),
    ),
    dict(
        id="egen-f",
        emoji="🌸",
        title="에겐녀",
        subtitle="사랑스럽고 여린, 감성 충만 타입",
        summary="여리여리하고 사랑스러운 에겐 에너지가 강한 타입이에요. 감정 표현이 풍부하고 공감을 잘해줘서 편안하게 마음을 털어놓고 싶은 사람이라는 얘기를 들어요. 부드러운 매력으로 주변을 편안하게 만들어줘요.",
        traits=["감정 표현이 풍부함", "공감능력이 뛰어남", "부드럽고 사랑스러운 매력"],
        color="#DB2777",
        compat=dict(
            best=dict(id="teto-m", emoji="🦁", title="테토남", reason="든든하게 이끌어주는 상대라 편안하게 기댈 수 있어요."),
            worst=dict(id="egen-m", emoji="🐰", title="에겐남", reason="둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요."),
        ),
    ),
]

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 마음캐치 테토-에겐 테스트</title>
<meta name="description" content="{subtitle} - 마음캐치 테토-에겐 테스트 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/teto-egen-{id}.png" />
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
    <p class="index-title">나의 테토 지수</p>
    <p class="index-percent" id="indexPercent">-</p>
    <div class="index-gauge-outer">
      <div class="index-gauge-inner" id="indexGauge" style="width:0%;"></div>
    </div>
    <p class="index-sub" id="indexSub">낮을수록 에겐, 높을수록 테토 성향이에요</p>
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
    ⚠️ 테토-에겐은 성별에 대한 고정관념이 아니라, 재미로 즐기는 에너지 타입 콘텐츠예요. 전문적인 심리 진단이 아니에요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/teto-egen-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = getTetoEgenById("{id}");
    var params = new URLSearchParams(window.location.search);
    var scoreParam = params.get("score");
    var hasScore = scoreParam !== null && !isNaN(Number(scoreParam));
    var scoreNum = hasScore ? Number(scoreParam) : {fallback_score};
    var percent = Math.round((scoreNum / TETOEGEN_MAX_SCORE) * 100);

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
      ? "총점 " + scoreNum + " / " + TETOEGEN_MAX_SCORE + "점 · 낮을수록 에겐, 높을수록 테토 성향이에요"
      : "낮을수록 에겐, 높을수록 테토 성향이에요 (테스트를 하면 내 점수로 정확히 나와요)";

    renderCompatSection("compatSection", TETOEGEN_RESULTS, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나는 '" + result.title + "' " + result.emoji,
        "너의 테토-에겐 결과는? 마음캐치에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/teto-egen-{id}.png",
        "마음캐치_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""

OUT_DIR = os.path.join(os.path.dirname(__file__), "tests", "teto-egen")

for r in RESULTS:
    traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
    # 직접 접속(공유 링크로 유입 등) 시 보여줄 대표 점수: 테토 계열은 15점, 에겐 계열은 5점
    fallback_score = 15 if r["id"].startswith("teto") else 5
    html = TEMPLATE.format(
        id=r["id"],
        emoji=r["emoji"],
        title=r["title"],
        subtitle=r["subtitle"],
        summary=r["summary"],
        color=r["color"],
        traits_html=traits_html,
        fallback_score=fallback_score,
    )
    out_path = os.path.join(OUT_DIR, "result-{}.html".format(r["id"]))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("생성 완료:", out_path)
