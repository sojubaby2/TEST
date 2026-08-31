#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""사랑의 언어 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "love-language-intro.png", "#EC4899", "🫶", "나의 사랑의 언어는?",
    "10문항 · 30초면 끝나는 심리테스트", badge="지금 바로 확인하기",
)

RESULTS = [
    dict(id="words", emoji="💬", title="말 한마디형", subtitle="다정한 말 한마디에 마음이 녹는 타입", color="#3B82F6"),
    dict(id="time", emoji="⏰", title="함께하는 시간형", subtitle="무엇을 하든 같이 있는 시간이 가장 소중한 타입", color="#8B5CF6"),
    dict(id="gifts", emoji="🎁", title="선물형", subtitle="정성 담긴 선물에 사랑을 느끼는 타입", color="#F59E0B"),
    dict(id="acts", emoji="🤝", title="헌신형", subtitle="말보다 행동으로 챙겨주는 걸 좋아하는 타입", color="#10B981"),
    dict(id="touch", emoji="🤗", title="스킨십형", subtitle="따뜻한 스킨십으로 사랑을 확인하는 타입", color="#EC4899"),
]

for r in RESULTS:
    gi.make_card("love-language-{}.png".format(r["id"]), r["color"], r["emoji"], r["title"], r["subtitle"], badge="나의 사랑의 언어는?")

print("사랑의 언어 이미지 생성 완료")
