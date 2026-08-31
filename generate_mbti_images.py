#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""MBTI 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

import mbti_common as m

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "mbti-intro.png", "#4338CA", "🧠", "나의 MBTI는?",
    "12문항 · 1분이면 끝나는 심리테스트", badge="지금 바로 확인하기",
)

for r in m.RESULTS:
    gi.make_card("mbti-{}.png".format(r["id"]), r["color"], r["emoji"], r["title"], r["subtitle"], badge="나의 MBTI는?")

print("MBTI 이미지 생성 완료")
