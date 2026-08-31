#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
mbti_common.py 의 RESULTS(단일 소스)를 assets/js/mbti-data.js 로 내보내는 스크립트.
문항(QUESTIONS)은 퀴즈 진행에만 쓰이므로 JS 쪽에 직접 작성한다.
"""
import json
import os

import mbti_common as m

BASE_DIR = os.path.dirname(__file__)

QUESTIONS_JS = """
const MBTI_QUESTIONS = [
  { axis: "EI", text: "주말에 에너지를 채우는 방법은?", options: [
      { text: "사람들과 어울리며 논다", letter: "E" },
      { text: "혼자 조용히 쉰다", letter: "I" } ] },
  { axis: "EI", text: "새로운 모임에 가면 나는?", options: [
      { text: "먼저 다가가서 말을 건다", letter: "E" },
      { text: "낯을 가리고 지켜본다", letter: "I" } ] },
  { axis: "EI", text: "말을 할 때 나는?", options: [
      { text: "생각을 말하면서 정리한다", letter: "E" },
      { text: "충분히 생각한 후에 말한다", letter: "I" } ] },
  { axis: "SN", text: "설명을 들을 때 나는?", options: [
      { text: "구체적인 사실과 예시를 좋아한다", letter: "S" },
      { text: "전체적인 개념과 가능성을 좋아한다", letter: "N" } ] },
  { axis: "SN", text: "미래에 대해 생각할 때 나는?", options: [
      { text: "현실적으로 가능한 것부터 생각한다", letter: "S" },
      { text: "다양한 가능성을 상상해본다", letter: "N" } ] },
  { axis: "SN", text: "일할 때 나는?", options: [
      { text: "경험과 매뉴얼을 믿고 따른다", letter: "S" },
      { text: "새로운 방법을 시도해본다", letter: "N" } ] },
  { axis: "TF", text: "친구가 고민을 상담할 때 나는?", options: [
      { text: "문제의 원인과 해결책을 짚어준다", letter: "T" },
      { text: "감정에 공감하며 위로해준다", letter: "F" } ] },
  { axis: "TF", text: "결정을 내릴 때 나는?", options: [
      { text: "논리적으로 옳은 쪽을 택한다", letter: "T" },
      { text: "사람들의 마음이 상하지 않는 쪽을 택한다", letter: "F" } ] },
  { axis: "TF", text: "비판을 받을 때 나는?", options: [
      { text: "타당하면 순순히 받아들인다", letter: "T" },
      { text: "감정적으로 먼저 상처받는다", letter: "F" } ] },
  { axis: "JP", text: "여행을 갈 때 나는?", options: [
      { text: "일정을 미리 꼼꼼하게 계획한다", letter: "J" },
      { text: "그때그때 즉흥적으로 정한다", letter: "P" } ] },
  { axis: "JP", text: "일을 처리할 때 나는?", options: [
      { text: "마감보다 미리 끝내야 마음이 편하다", letter: "J" },
      { text: "마감 직전에 몰아서 해도 괜찮다", letter: "P" } ] },
  { axis: "JP", text: "계획이 틀어지면 나는?", options: [
      { text: "스트레스를 받는 편이다", letter: "J" },
      { text: "그러려니 하고 유연하게 넘어간다", letter: "P" } ] },
];
""".strip("\n")

HELPERS_JS = """
// 3문항씩 4개 축(E/I, S/N, T/F, J/P)을 집계해 16유형 코드와 축별 비율(%)을 계산
function tallyToMbtiAxis(tally) {
  function axisResult(a, b) {
    const ca = tally[a] || 0;
    const cb = tally[b] || 0;
    const winner = ca >= cb ? a : b;
    const percent = Math.round(Math.max(ca, cb) / 3 * 100);
    return { winner: winner, percent: percent };
  }
  const ei = axisResult("E", "I");
  const sn = axisResult("S", "N");
  const tf = axisResult("T", "F");
  const jp = axisResult("J", "P");
  const code = ei.winner + sn.winner + tf.winner + jp.winner;
  const overall = Math.round((ei.percent + sn.percent + tf.percent + jp.percent) / 4);
  return { code: code, overall: overall, ei: ei.percent, sn: sn.percent, tf: tf.percent, jp: jp.percent };
}

function getMbtiById(id) {
  return MBTI_RESULTS.find((r) => r.id === id);
}
""".strip("\n")


def js_string(s):
    return json.dumps(s, ensure_ascii=False)


def js_list_of_strings(lst):
    return "[" + ", ".join(js_string(x) for x in lst) + "]"


def build_results_js():
    lines = ["const MBTI_RESULTS = ["]
    for r in m.RESULTS:
        best = r["compat"]["best"]
        worst = r["compat"]["worst"]
        lines.append("  {")
        lines.append("    id: {},".format(js_string(r["id"])))
        lines.append("    emoji: {},".format(js_string(r["emoji"])))
        lines.append("    title: {},".format(js_string(r["title"])))
        lines.append("    subtitle: {},".format(js_string(r["subtitle"])))
        lines.append("    summary: {},".format(js_string(r["summary"])))
        lines.append("    traits: {},".format(js_list_of_strings(r["traits"])))
        lines.append("    color: {},".format(js_string(r["color"])))
        lines.append("    compat: { best: { id: %s, reason: %s }, worst: { id: %s, reason: %s } }," % (
            js_string(best["id"]), js_string(best["reason"]), js_string(worst["id"]), js_string(worst["reason"])
        ))
        lines.append("  },")
    lines.append("];")
    return "\n".join(lines)


OUTPUT = """/* ============================================================
   MBTI 간단 테스트 - 문항 및 결과 데이터
   ⚠️ 이 파일은 mbti_common.py + build_mbti_js.py 로 자동 생성됩니다.
   결과 내용을 수정하려면 mbti_common.py 를 고친 뒤
   `python3 build_mbti_js.py` 를 다시 실행하세요.
   ============================================================ */

{questions}

{results}

{helpers}
""".format(questions=QUESTIONS_JS, results=build_results_js(), helpers=HELPERS_JS)

out_path = os.path.join(BASE_DIR, "assets", "js", "mbti-data.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(OUTPUT)
print("생성 완료:", out_path)
