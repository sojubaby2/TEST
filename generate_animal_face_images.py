#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""동물상 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "animal-face-intro.png", "#F59E0B", "🐾", "나는 무슨 동물상?",
    "10문항 · 30초면 끝나는 심리테스트", badge="지금 바로 확인하기",
)

RESULTS = [
    dict(id="dog", emoji="🐶", title="강아지상", subtitle="사교적이고 애정표현이 풍부한 사랑둥이", color="#F59E0B"),
    dict(id="cat", emoji="🐱", title="고양이상", subtitle="도도하고 시크하지만 은근 매력있는 타입", color="#6366F1"),
    dict(id="fox", emoji="🦊", title="여우상", subtitle="눈치 빠르고 영리한 매력덩어리 타입", color="#EA580C"),
    dict(id="bear", emoji="🐻", title="곰상", subtitle="듬직하고 순박한 든든이 타입", color="#92400E"),
    dict(id="rabbit", emoji="🐰", title="토끼상", subtitle="여리여리하고 조심스러운 순둥이 타입", color="#EC4899"),
]

for r in RESULTS:
    gi.make_card("animal-face-{}.png".format(r["id"]), r["color"], r["emoji"], r["title"], r["subtitle"], badge="나는 무슨 동물상?")

print("동물상 이미지 생성 완료")
