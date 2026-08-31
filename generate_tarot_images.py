#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""타로 점괘 결과(78장) 공유용 카드 이미지 생성 스크립트."""
import importlib.util
import json
import os
import re

BASE_DIR = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("generate_images", os.path.join(BASE_DIR, "generate_images.py"))
gi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gi)

# tarot-data.js에서 카드 목록(id/name/emoji/color/keyword)만 정규식으로 추출
JS_PATH = os.path.join(BASE_DIR, "assets", "js", "tarot-data.js")
with open(JS_PATH, encoding="utf-8") as f:
    js = f.read()

block_match = re.search(r"const TAROT_CARDS = \[(.*?)\n\];", js, re.S)
block = block_match.group(1)
entries = re.findall(r"\{(.*?)\},", block, re.S)

cards = []
for e in entries:
    def field(name):
        m = re.search(r'%s: (null|"((?:[^"\\]|\\.)*)")' % name, e)
        if not m:
            return None
        return m.group(2) if m.group(1) != "null" else None

    cards.append(
        dict(
            id=field("id"),
            name=field("name"),
            emoji=field("emoji"),
            color=field("color"),
            keyword=field("keyword"),
        )
    )

assert len(cards) == 78, len(cards)

for c in cards:
    gi.make_card(
        "tarot-{}.png".format(c["id"]),
        c["color"],
        c["emoji"],
        c["name"],
        c["keyword"],
        badge="오늘의 타로 점괘",
    )

print("타로 카드 이미지 {}장 생성 완료".format(len(cards)))
