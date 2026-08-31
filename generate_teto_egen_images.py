#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
테토-에겐 테스트 공유용 OG 이미지(1200x630) 생성 스크립트.
generate_images.py 의 make_card() 로직을 재사용한다.
"""
import importlib.util
import os

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location(
    "generate_images", os.path.join(BASE_DIR, "generate_images.py")
)
gi = importlib.util.module_from_spec(spec)
# generate_images.py 를 다시 실행하면 이미지가 또 생성되므로,
# 함수만 가져오기 위해 실행은 하되 이미 만들어진 파일은 그대로 둔다(덮어써도 무방).
spec.loader.exec_module(gi)

# 1) 인트로 이미지
gi.make_card(
    "teto-egen-intro.png",
    "#111827",
    "🔥",
    "나는 테토? 에겐?",
    "지금 제일 핫한 심리테스트 · 30초 완성",
    badge="지금 바로 확인하기",
)

# 2) 결과 4종 이미지
RESULTS = [
    dict(id="teto-m", emoji="🦁", title="테토남", subtitle="상남자st 에너지, 든든한 리더 타입", color="#1E3A8A"),
    dict(id="teto-f", emoji="🐯", title="테토녀", subtitle="걸크러시 에너지, 확실한 자기주장", color="#9F1239"),
    dict(id="egen-m", emoji="🐰", title="에겐남", subtitle="부드럽고 섬세한, 다정한 에너지", color="#7C3AED"),
    dict(id="egen-f", emoji="🌸", title="에겐녀", subtitle="사랑스럽고 여린, 감성 충만 타입", color="#DB2777"),
]

for r in RESULTS:
    gi.make_card(
        "teto-egen-{}.png".format(r["id"]),
        r["color"],
        r["emoji"],
        r["title"],
        r["subtitle"],
        badge="나는 테토? 에겐?",
    )

print("테토-에겐 이미지 생성 완료")
