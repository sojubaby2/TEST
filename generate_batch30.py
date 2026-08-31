#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
30개 신규 '10문항 스펙트럼형' 테스트 일괄 생성 스크립트.
/tmp/test_specs/merged.json 의 콘텐츠(질문/결과)를 읽어서
- tests/<slug>/index.html, quiz.html, result-1~5.html
- assets/js/<slug>-data.js
- assets/img/og/<slug>-intro.png, <slug>-1~5.png
- assets/img/card/<slug>-1~5.png
를 전부 생성한다. 홈페이지/사이트맵 반영은 별도 스크립트에서 처리.
"""
import json
import os
import importlib.util

BASE_DIR = os.path.dirname(__file__)
SPEC_PATH = "/tmp/test_specs/merged.json"


def load_module(name, filename):
    spec = importlib.util.spec_from_file_location(name, os.path.join(BASE_DIR, filename))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


gi = load_module("generate_images", "generate_images.py")
common = load_module("generate_spectrum_common", "generate_spectrum_common.py")

OG_DIR = os.path.join(BASE_DIR, "assets", "img", "og")
CARD_DIR = os.path.join(BASE_DIR, "assets", "img", "card")
JS_DIR = os.path.join(BASE_DIR, "assets", "js")
TESTS_DIR = os.path.join(BASE_DIR, "tests")


def js_prefix(slug):
    return "".join(slug.split("-")).upper()


def func_part(slug):
    return "".join(w.capitalize() for w in slug.split("-"))


INDEX_TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{title} | 마음캐치</title>
<meta name="description" content="{meta_description}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="10문항, 30초면 끝! {title_word}를 확인해보세요." />
<meta property="og:image" content="../../assets/img/og/{slug}-intro.png" />
<meta property="og:url" content="./" />

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{emoji}</text></svg>" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html">🧠 마음캐치</a>
</header>

<main class="wrap">
  <section class="hero">
    <div style="font-size:56px;margin-bottom:8px;">{emoji}</div>
    <h1>{title}</h1>
    <p>{hero_desc}</p>
  </section>

  <div class="card">
    <p style="margin:0 0 10px;font-size:14px;color:var(--text-sub);">✅ 총 10문항 · 예상 소요시간 30초</p>
    <p style="margin:0;font-size:14px;color:var(--text-sub);">✅ 결과는 5가지 유형 중 하나로 확인돼요</p>
  </div>

  <a class="btn btn-primary" href="quiz.html" style="margin-top:20px;">테스트 시작하기</a>

  <p class="notice">
    ⚠️ 이 테스트는 재미로 즐기는 콘텐츠이며 전문적인 심리 진단이나 의학적 진단이 아니에요. 실제 정신건강 관련 어려움이 있으시다면 반드시 전문가와 상담해 주세요.
  </p>

  <div class="footer">
    <p><a href="../../index.html">← 다른 테스트도 보러가기</a></p>
    <p><a href="../../privacy.html">개인정보처리방침</a> · <a href="../../terms.html">이용약관</a></p>
  </div>
</main>

</body>
</html>
"""

QUIZ_TEMPLATE = """<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{title} 진행중... | 마음캐치</title>
<meta name="robots" content="noindex" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{emoji}</text></svg>" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<header class="site-header">
  <a class="logo" href="../../index.html">🧠 마음캐치</a>
</header>

<main class="wrap">
  <div class="progress-outer">
    <div class="progress-inner" id="progressBar" style="width:0%;"></div>
  </div>
  <div class="progress-label" id="progressLabel">0 / 10</div>

  <div class="card">
    <div class="question-num" id="qNum">Q1</div>
    <p class="question-text" id="qText"></p>
    <div id="options"></div>
  </div>
</main>

<script src="../../assets/js/{slug}-data.js"></script>
<script>
  let current = 0;
  let totalScore = 0;

  const qNum = document.getElementById("qNum");
  const qText = document.getElementById("qText");
  const optionsEl = document.getElementById("options");
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  function renderQuestion() {{
    const q = {questions_var}[current];
    qNum.textContent = "Q" + (current + 1);
    qText.textContent = q.text;
    optionsEl.innerHTML = "";

    q.options.forEach((opt) => {{
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => selectOption(opt.score));
      optionsEl.appendChild(btn);
    }});

    const pct = Math.round((current / {questions_var}.length) * 100);
    progressBar.style.width = pct + "%";
    progressLabel.textContent = current + " / " + {questions_var}.length;
  }}

  function selectOption(score) {{
    totalScore += score;
    current += 1;

    if (current >= {questions_var}.length) {{
      progressBar.style.width = "100%";
      progressLabel.textContent = {questions_var}.length + " / " + {questions_var}.length;
      finishQuiz();
      return;
    }}
    renderQuestion();
    window.scrollTo({{ top: 0, behavior: "smooth" }});
  }}

  function finishQuiz() {{
    const result = {get_result_fn}(totalScore);
    const url = "result-" + result.id + ".html?score=" + encodeURIComponent(totalScore);
    setTimeout(() => {{
      window.location.href = url;
    }}, 350);
  }}

  renderQuestion();
</script>

</body>
</html>
"""


def js_escape(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def build_data_js(spec):
    prefix = js_prefix(spec["slug"])
    lines = []
    lines.append("/* ============================================================")
    lines.append("   {} - 문항 및 결과 데이터".format(spec["title"]))
    lines.append("   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.")
    lines.append("   ============================================================ */")
    lines.append("")
    lines.append("const {}_QUESTIONS = [".format(prefix))
    for q in spec["questions"]:
        opts = ", ".join(
            '{{ text: "{}", score: {} }}'.format(js_escape(o["text"]), o["score"])
            for o in q["options"]
        )
        lines.append('  {{ text: "{}", options: [ {} ] }},'.format(js_escape(q["text"]), opts))
    lines.append("];")
    lines.append("")
    lines.append("const {}_MAX_SCORE = 20;".format(prefix))
    lines.append("")
    lines.append("const {}_RESULTS = [".format(prefix))
    for r in spec["results"]:
        traits = ", ".join('"{}"'.format(js_escape(t)) for t in r["traits"])
        lines.append("  {")
        lines.append(
            '    id: {}, emoji: "{}", title: "{}", subtitle: "{}",'.format(
                r["id"], r["emoji"], js_escape(r["title"]), js_escape(r["subtitle"])
            )
        )
        lines.append('    min: {}, max: {}, color: "{}",'.format(r["min"], r["max"], r["color"]))
        lines.append('    summary: "{}",'.format(js_escape(r["summary"])))
        lines.append("    traits: [{}],".format(traits))
        lines.append(
            '    compat: {{ best: {{ id: {}, reason: "{}" }}, worst: {{ id: {}, reason: "{}" }} }},'.format(
                r["compat"]["best"]["id"], js_escape(r["compat"]["best"]["reason"]),
                r["compat"]["worst"]["id"], js_escape(r["compat"]["worst"]["reason"]),
            )
        )
        lines.append("  },")
    lines.append("];")
    lines.append("")
    fp = func_part(spec["slug"])
    lines.append("function get{}Result(score) {{".format(fp))
    lines.append("  return {}_RESULTS.find((r) => score >= r.min && score <= r.max) || {}_RESULTS[{}_RESULTS.length - 1];".format(prefix, prefix, prefix))
    lines.append("}")
    lines.append("")
    lines.append("function get{}ById(id) {{".format(fp))
    lines.append("  return {}_RESULTS.find((r) => r.id === Number(id));".format(prefix))
    lines.append("}")
    lines.append("")
    return "\n".join(lines)


def main():
    specs = json.load(open(SPEC_PATH, encoding="utf-8"))
    home_cards = []
    sitemap_entries = []

    for spec in specs:
        slug = spec["slug"]
        # min/max 자동 부여(고정 구간)
        ranges = [(0, 4), (5, 8), (9, 12), (13, 16), (17, 20)]
        for i, r in enumerate(spec["results"]):
            r["min"], r["max"] = ranges[i]

        dir_path = os.path.join(TESTS_DIR, slug)
        os.makedirs(dir_path, exist_ok=True)

        # index.html
        with open(os.path.join(dir_path, "index.html"), "w", encoding="utf-8") as f:
            f.write(
                INDEX_TEMPLATE.format(
                    title=spec["title"],
                    meta_description=spec["meta_description"],
                    title_word=spec["title_word"],
                    slug=slug,
                    emoji=spec["emoji"],
                    hero_desc=spec["hero_desc"],
                )
            )

        # quiz.html
        prefix = js_prefix(slug)
        fp = func_part(slug)
        with open(os.path.join(dir_path, "quiz.html"), "w", encoding="utf-8") as f:
            f.write(
                QUIZ_TEMPLATE.format(
                    title=spec["title"],
                    emoji=spec["emoji"],
                    slug=slug,
                    questions_var="{}_QUESTIONS".format(prefix),
                    get_result_fn="get{}Result".format(fp),
                )
            )

        # data js
        with open(os.path.join(JS_DIR, "{}-data.js".format(slug)), "w", encoding="utf-8") as f:
            f.write(build_data_js(spec))

        # result-N.html (공용 템플릿 재사용)
        common.generate(
            slug=slug,
            dir_name=slug,
            test_label=spec["title"],
            title_word=spec["title_word"],
            index_title="나의 {}".format(spec["title_word"]),
            get_by_id="get{}ById".format(fp),
            max_score_var="{}_MAX_SCORE".format(prefix),
            results_var="{}_RESULTS".format(prefix),
            results=spec["results"],
        )

        # og 인트로 이미지
        gi.make_card(
            "{}-intro.png".format(slug),
            spec["results"][2]["color"] if len(spec["results"]) > 2 else "#7C3AED",
            spec["emoji"],
            spec["title"],
            "10문항 · 30초면 끝나는 심리테스트",
            badge="지금 바로 확인하기",
        )

        # og 결과별 이미지 + 저장카드 이미지
        for r in spec["results"]:
            gi.make_card(
                "{}-{}.png".format(slug, r["id"]),
                r["color"],
                r["emoji"],
                r["title"],
                r["subtitle"],
                badge="나의 {}".format(spec["title_word"]),
            )
            gi.make_share_card(
                "{}-{}.png".format(slug, r["id"]),
                CARD_DIR,
                r["color"],
                r["emoji"],
                r["title"],
                r["subtitle"],
                r["summary"],
                r["traits"],
                {
                    "emoji": next(x["emoji"] for x in spec["results"] if x["id"] == r["compat"]["best"]["id"]),
                    "title": next(x["title"] for x in spec["results"] if x["id"] == r["compat"]["best"]["id"]),
                    "reason": r["compat"]["best"]["reason"],
                },
                {
                    "emoji": next(x["emoji"] for x in spec["results"] if x["id"] == r["compat"]["worst"]["id"]),
                    "title": next(x["title"] for x in spec["results"] if x["id"] == r["compat"]["worst"]["id"]),
                    "reason": r["compat"]["worst"]["reason"],
                },
                spec["title"],
            )

        home_cards.append(
            '  <a class="test-card" href="tests/{slug}/index.html">\n'
            '    <div class="emoji">{emoji}</div>\n'
            '    <div class="info">\n'
            '      <h3>{title}</h3>\n'
            '      <p>{title_word}는 몇 %? (10문항 · 30초)</p>\n'
            '    </div>\n'
            '    <div class="arrow">›</div>\n'
            '  </a>\n'.format(slug=slug, emoji=spec["emoji"], title=spec["title"], title_word=spec["title_word"])
        )

        sm = ['  <url><loc>https://YOUR-DOMAIN.com/tests/{}/</loc></url>'.format(slug)]
        for r in spec["results"]:
            sm.append('  <url><loc>https://YOUR-DOMAIN.com/tests/{}/result-{}.html</loc></url>'.format(slug, r["id"]))
        sitemap_entries.append("\n".join(sm))

        print("완료:", slug)

    with open("/tmp/test_specs/home_cards.html", "w", encoding="utf-8") as f:
        f.write("\n".join(home_cards))
    with open("/tmp/test_specs/sitemap_entries.xml", "w", encoding="utf-8") as f:
        f.write("\n\n".join(sitemap_entries))

    print("전체 30개 테스트 생성 완료")


if __name__ == "__main__":
    main()
