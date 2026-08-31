#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""전생 테스트 공유용 OG 이미지(1200x630) 생성 스크립트."""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

gi.make_card(
    "past-life-intro.png", "#7C3AED", "🔮", "나의 전생은?",
    "10문항 · 30초면 끝나는 심리테스트", badge="지금 바로 확인하기",
)

RESULTS = [
    dict(id="pharaoh", emoji="👑", title="이집트 파라오", subtitle="타고난 카리스마로 사람들을 이끄는 리더", color="#D4A017"),
    dict(id="viking", emoji="🛡️", title="바이킹 전사", subtitle="두려움 없이 새로운 땅을 개척하던 모험가", color="#475569"),
    dict(id="scholar", emoji="📜", title="조선시대 선비", subtitle="원칙과 배움을 중시하던 학자", color="#1E3A8A"),
    dict(id="merchant", emoji="🐫", title="실크로드 상인", subtitle="각지를 누비며 사람과 재물을 다루던 협상가", color="#C2703D"),
    dict(id="artist", emoji="🎨", title="르네상스 예술가", subtitle="아름다움을 좇던 자유로운 영혼", color="#7C3AED"),
]

for r in RESULTS:
    gi.make_card("past-life-{}.png".format(r["id"]), r["color"], r["emoji"], r["title"], r["subtitle"], badge="나의 전생은?")

print("전생 테스트 이미지 생성 완료")
