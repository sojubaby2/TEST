#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""연애 유형 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "love-style-intro.png", "#DB2777", "💘", "나의 연애 유형은?",
    "10문항 · 30초면 끝나는 심리테스트", badge="지금 바로 확인하기",
)

RESULTS = [
    dict(id=1, emoji="🦅", title="자유로운 독립연애형", subtitle="연애도 좋지만 내 공간이 더 소중해", color="#0EA5E9"),
    dict(id=2, emoji="🍵", title="잔잔한 안정 추구형", subtitle="요란하지 않지만 편안한 연애가 좋아", color="#10B981"),
    dict(id=3, emoji="🎣", title="밀당의 고수형", subtitle="적당한 긴장감이 있어야 재밌지", color="#F59E0B"),
    dict(id=4, emoji="💌", title="다정한 로맨티스트형", subtitle="표현하는 사랑이 진짜 사랑이지", color="#EC4899"),
    dict(id=5, emoji="🔥", title="올인 불꽃연애형", subtitle="한번 빠지면 화끈하게 올인", color="#EF4444"),
]

for r in RESULTS:
    gi.make_card("love-style-{}.png".format(r["id"]), r["color"], r["emoji"], r["title"], r["subtitle"], badge="나의 연애 유형은?")

print("연애 유형 이미지 생성 완료")
