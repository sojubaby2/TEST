#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""IQ/EQ 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location(
    "generate_images", os.path.join(BASE_DIR, "generate_images.py")
)
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "iqeq-intro.png",
    "#111827",
    "🧩",
    "나의 IQ/EQ는 몇 점?",
    "논리 6문제 + 감성 6문제 · 1분 완성",
    badge="지금 바로 확인하기",
)

RESULTS = [
    dict(id="iq-hi-eq-hi", emoji="🦉", title="천재 전략가형", subtitle="똑똑한 두뇌 + 따뜻한 마음까지", color="#1E3A5F"),
    dict(id="iq-hi-eq-lo", emoji="🧪", title="괴짜 천재형", subtitle="번뜩이는 두뇌, 살짝 서투른 감정 표현", color="#0E7490"),
    dict(id="iq-lo-eq-hi", emoji="🤝", title="인간관계 마스터형", subtitle="숫자보다 사람이 먼저인 타입", color="#EA580C"),
    dict(id="iq-lo-eq-lo", emoji="🦋", title="자유로운 영혼형", subtitle="논리보다 직감, 계획보다 즉흥", color="#7C3AED"),
]

for r in RESULTS:
    gi.make_card(
        "iqeq-{}.png".format(r["id"]),
        r["color"],
        r["emoji"],
        r["title"],
        r["subtitle"],
        badge="나의 IQ/EQ는 몇 점?",
    )

print("IQ/EQ 이미지 생성 완료")
