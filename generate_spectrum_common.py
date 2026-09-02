#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
소시오패스 테스트와 동일한 '단일 축 스펙트럼(0~2점 x 10문항 -> 5단계 결과)' 형태의
테스트들이 공통으로 쓰는 결과 HTML 생성 로직.
자존감/관종력/흑화지수/인싸아싸/눈치 테스트가 이 함수를 공유한다.

※ 이미지(og/이미지저장용 카드)는 이번 배치에서는 생성하지 않는다 (사용자 요청).
   나중에 이미지를 추가할 때는 다른 테스트들처럼
   generate_<slug>_images.py 를 새로 만들고 generate_share_cards.py 의
   JOBS 리스트에 추가해주면 된다.
"""
import os

BASE_DIR = os.path.dirname(__file__)

TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>나의 결과는 '{title}' | 알아볼괘 {test_label}</title>
<meta name="description" content="{subtitle} - 알아볼괘 {test_label} 결과" />

<meta property="og:type" content="website" />
<meta property="og:title" content="나의 결과는 '{title}' {emoji}" />
<meta property="og:description" content="{subtitle} 너의 결과도 확인해봐!" />
<meta property="og:image" content="../../assets/img/og/{slug}-{id}.png" />
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
    <p class="index-title">{index_title}</p>
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
    ⚠️ 이 테스트는 재미로 즐기는 콘텐츠이며 전문적인 심리 진단이 아니에요.
  </p>

  <div class="footer">
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

<script src="../../assets/js/{slug}-data.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  (function () {{
    var result = {get_by_id}({id});
    var params = new URLSearchParams(window.location.search);
    var scoreParam = params.get("score");
    var hasScore = scoreParam !== null && !isNaN(Number(scoreParam));
    var scoreNum = hasScore ? Number(scoreParam) : Math.round((result.min + result.max) / 2);
    var percent = Math.round((scoreNum / {max_score_var}) * 100);

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
      ? "총점 " + scoreNum + " / " + {max_score_var} + "점"
      : result.title + " 유형의 평균 지수예요 (테스트를 하면 내 점수로 정확히 나와요)";

    renderCompatSection("compatSection", {results_var}, result.compat);

    document.getElementById("shareBtn").addEventListener("click", function () {{
      shareCurrentPage(
        "나의 {title_word}는 '" + result.title + "' " + result.emoji,
        "너의 결과는? 알아볼괘에서 확인해봐!"
      );
    }});
    document.getElementById("copyBtn").addEventListener("click", function () {{
      copyLinkToClipboard();
    }});
    document.getElementById("downloadBtn").addEventListener("click", function () {{
      downloadImage(
        "../../assets/img/card/{slug}-{id}.png",
        "알아볼괘_" + result.title + ".png"
      );
    }});
  }})();
</script>

</body>
</html>
"""


def generate(slug, dir_name, test_label, title_word, index_title, get_by_id, max_score_var, results_var, results):
    out_dir = os.path.join(BASE_DIR, "tests", dir_name)
    for r in results:
        traits_html = "\n      ".join("<li>{}</li>".format(t) for t in r["traits"])
        html = TEMPLATE.format(
            id=r["id"], emoji=r["emoji"], title=r["title"], subtitle=r["subtitle"],
            summary=r["summary"], color=r["color"], traits_html=traits_html,
            slug=slug, test_label=test_label, title_word=title_word, index_title=index_title,
            get_by_id=get_by_id, max_score_var=max_score_var, results_var=results_var,
        )
        out_path = os.path.join(out_dir, "result-{}.html".format(r["id"]))
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("생성 완료:", out_path)
