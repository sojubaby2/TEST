#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MBTI 간단 테스트의 단일 소스(Single Source of Truth).
16개 유형의 결과 데이터(RESULTS)를 8개의 '글자별 설명'을 조합해 프로그래밍적으로
생성한다. 이렇게 만든 RESULTS는 build_mbti_js.py 를 통해 assets/js/mbti-data.js 로,
generate_mbti_results.py 를 통해 정적 결과 HTML로 각각 반영되므로 둘 사이에
내용이 어긋날 일이 없다.

궁합(compat) 규칙(기계적 대합, 모순 없음이 수학적으로 보장됨):
  - 천생연분(best)  = S/N, T/F 두 글자만 뒤집은 유형 (E/I, J/P는 유지) → 항상 상호 관계
  - 상극(worst)     = 4글자를 모두 뒤집은 완전 반대 유형 → 항상 상호 관계
"""

LETTER_INFO = {
    "E": {"trait": "사람들과 어울리며 에너지를 얻음", "frag": "사람들과 어울릴 때 에너지가 차오르고"},
    "I": {"trait": "혼자만의 시간에서 에너지를 얻음", "frag": "혼자만의 시간을 통해 에너지를 충전하고"},
    "S": {"trait": "현실적이고 구체적인 정보를 선호함", "frag": "눈에 보이는 사실과 경험을 중요하게 여기며"},
    "N": {"trait": "가능성과 아이디어에 끌림", "frag": "가능성과 큰 그림을 상상하는 걸 좋아하며"},
    "T": {"trait": "논리와 원칙을 기준으로 판단함", "frag": "감정보다 논리와 원칙을 기준으로 판단하고"},
    "F": {"trait": "관계와 감정을 고려해 판단함", "frag": "논리보다 사람의 마음과 관계를 먼저 고려하고"},
    "J": {"trait": "계획적이고 체계적으로 움직임", "frag": "미리 계획을 세우고 체계적으로 움직이는 편이에요"},
    "P": {"trait": "융통성 있게 상황에 맞춰 움직임", "frag": "상황에 따라 유연하게 움직이는 걸 편하게 느껴요"},
}

# code, emoji, color, nickname(title), subtitle
MBTI_META = {
    "INTJ": ("🧩", "#4C1D95", "전략을 짜는 설계자", "치밀한 계획으로 목표를 이루는 전략가"),
    "INTP": ("🔬", "#1E40AF", "호기심 가득한 분석가", "궁금한 건 끝까지 파고드는 탐구가"),
    "ENTJ": ("🚀", "#B91C1C", "목표를 향해 돌진하는 지휘관", "카리스마로 팀을 이끄는 리더"),
    "ENTP": ("💡", "#C2410C", "아이디어 뱅크 도전자", "새로운 아이디어로 판을 뒤집는 논쟁가"),
    "INFJ": ("🌙", "#4338CA", "조용한 신념가", "조용하지만 확고한 신념을 가진 타입"),
    "INFP": ("🌿", "#059669", "마음이 따뜻한 몽상가", "따뜻한 마음으로 이상을 그리는 타입"),
    "ENFJ": ("🎤", "#DB2777", "사람을 이끄는 멘토", "사람들의 성장을 돕는 열정적인 멘토"),
    "ENFP": ("🎉", "#F59E0B", "에너지 넘치는 분위기 메이커", "어디서든 분위기를 살리는 에너자이저"),
    "ISTJ": ("📘", "#374151", "원칙을 지키는 실무자", "약속과 원칙을 철저히 지키는 실무자"),
    "ISFJ": ("🛡️", "#0D9488", "묵묵히 챙기는 수호자", "말없이 곁을 지켜주는 든든한 수호자"),
    "ESTJ": ("📋", "#7C2D12", "현실적인 지휘관", "체계적으로 조직을 이끄는 관리자"),
    "ESFJ": ("🤝", "#EA580C", "살가운 분위기 메이커", "주변 사람을 살뜰히 챙기는 분위기 메이커"),
    "ISTP": ("🔧", "#52525B", "손끝이 야무진 해결사", "손으로 뭐든 뚝딱 해결하는 해결사"),
    "ISFP": ("🎨", "#A855F7", "감성 충만한 예술가", "자기만의 감성으로 세상을 보는 예술가"),
    "ESTP": ("⚡", "#EF4444", "즉흥적인 승부사", "일단 몸으로 부딪히는 승부사"),
    "ESFP": ("🎪", "#EC4899", "무대 위의 자유인", "어디서든 무대의 주인공이 되는 타입"),
}

ALL_CODES = list(MBTI_META.keys())


def flip_sn_tf(code):
    e_i, s_n, t_f, j_p = code[0], code[1], code[2], code[3]
    s_n = "N" if s_n == "S" else "S"
    t_f = "F" if t_f == "T" else "T"
    return e_i + s_n + t_f + j_p


def flip_all(code):
    pairs = {"E": "I", "I": "E", "S": "N", "N": "S", "T": "F", "F": "T", "J": "P", "P": "J"}
    return "".join(pairs[c] for c in code)


def wa_gwa(word):
    """단어 마지막 글자의 받침 유무에 따라 '와'/'과' 조사를 반환."""
    last = word[-1]
    code = ord(last) - 0xAC00
    if 0 <= code <= 11171 and code % 28 != 0:
        return "과"  # 받침 있음
    return "와"  # 받침 없음


def build_results():
    results = []
    for code in ALL_CODES:
        emoji, color, nickname, subtitle = MBTI_META[code]
        e_i, s_n, t_f, j_p = code[0], code[1], code[2], code[3]
        frags = [LETTER_INFO[e_i]["frag"], LETTER_INFO[s_n]["frag"], LETTER_INFO[t_f]["frag"], LETTER_INFO[j_p]["frag"]]
        traits = [LETTER_INFO[e_i]["trait"], LETTER_INFO[s_n]["trait"], LETTER_INFO[t_f]["trait"], LETTER_INFO[j_p]["trait"]]
        summary = "{}, {}, {}, {}. 그래서 사람들은 당신을 '{}'라고 부르곤 해요.".format(
            frags[0], frags[1], frags[2], frags[3], nickname
        )

        best_code = flip_sn_tf(code)
        worst_code = flip_all(code)
        best_nick = MBTI_META[best_code][2]
        worst_nick = MBTI_META[worst_code][2]

        results.append(dict(
            id=code, emoji=emoji, title="{} · {}".format(code, nickname), subtitle=subtitle,
            summary=summary, traits=traits, color=color,
            compat=dict(
                best=dict(
                    id=best_code, emoji=MBTI_META[best_code][0], title="{} · {}".format(best_code, best_nick),
                    reason="정보를 받아들이고 결정하는 방식은 반대지만, 그래서 오히려 서로에게 없는 매력을 채워주는 '{}'{} 잘 맞아요.".format(best_nick, wa_gwa(best_nick)),
                ),
                worst=dict(
                    id=worst_code, emoji=MBTI_META[worst_code][0], title="{} · {}".format(worst_code, worst_nick),
                    reason="모든 성향이 정반대인 '{}'{}는 마음이 통하기까지 시간이 좀 걸릴 수 있어요.".format(worst_nick, wa_gwa(worst_nick)),
                ),
            ),
        ))
    return results


RESULTS = build_results()
