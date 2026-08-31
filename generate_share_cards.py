#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
'결과 이미지 저장' 버튼으로 다운로드되는 세로형 카드 이미지를 생성하는 스크립트.
설명(요약+특징) + 궁합(천생연분/상극)까지 한 장에 모두 담는다.
각 테스트의 generate_*_results.py 안의 RESULTS(compat 포함)를 그대로 재사용해서
데이터가 어긋나지 않도록 한다.
"""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)


def load_module(name, filename):
    spec = importlib.util.spec_from_file_location(name, os.path.join(BASE_DIR, filename))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


gi = load_module("generate_images", "generate_images.py")
soc = load_module("generate_results", "generate_results.py")
teto = load_module("generate_teto_egen_results", "generate_teto_egen_results.py")
iqeq = load_module("generate_iqeq_results", "generate_iqeq_results.py")
love = load_module("generate_love_style_results", "generate_love_style_results.py")
animal = load_module("generate_animal_face_results", "generate_animal_face_results.py")
lovelang = load_module("generate_love_language_results", "generate_love_language_results.py")
pastlife = load_module("generate_past_life_results", "generate_past_life_results.py")
mbti = load_module("mbti_common", "mbti_common.py")
selfesteem = load_module("generate_self_esteem_results", "generate_self_esteem_results.py")
attention = load_module("generate_attention_results", "generate_attention_results.py")
darkside = load_module("generate_dark_side_results", "generate_dark_side_results.py")
insaassa = load_module("generate_insa_assa_results", "generate_insa_assa_results.py")
nunchi = load_module("generate_nunchi_results", "generate_nunchi_results.py")

CARD_DIR = os.path.join(BASE_DIR, "assets", "img", "card")

JOBS = [
    (soc.RESULTS, "sociopath-{}.png", "소시오패스 테스트"),
    (teto.RESULTS, "teto-egen-{}.png", "테토-에겐 테스트"),
    (iqeq.RESULTS, "iqeq-{}.png", "IQ/EQ 테스트"),
    (love.RESULTS, "love-style-{}.png", "연애 유형 테스트"),
    (animal.RESULTS, "animal-face-{}.png", "동물상 테스트"),
    (lovelang.RESULTS, "love-language-{}.png", "사랑의 언어 테스트"),
    (pastlife.RESULTS, "past-life-{}.png", "전생 테스트"),
    (mbti.RESULTS, "mbti-{}.png", "MBTI 테스트"),
    (selfesteem.RESULTS, "self-esteem-{}.png", "자존감 테스트"),
    (attention.RESULTS, "attention-{}.png", "관종력 테스트"),
    (darkside.RESULTS, "dark-side-{}.png", "흑화 지수 테스트"),
    (insaassa.RESULTS, "insa-assa-{}.png", "인싸-아싸 지수 테스트"),
    (nunchi.RESULTS, "nunchi-{}.png", "눈치 테스트"),
]

for results, filename_pattern, test_label in JOBS:
    for r in results:
        gi.make_share_card(
            filename_pattern.format(r["id"]),
            CARD_DIR,
            r["color"],
            r["emoji"],
            r["title"],
            r["subtitle"],
            r["summary"],
            r["traits"],
            r["compat"]["best"],
            r["compat"]["worst"],
            test_label,
        )

print("모든 저장 카드 이미지 생성 완료")
