#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
공유용 OG 이미지(1200x630) 생성 스크립트.
- 홈 대표 이미지 1장
- 소시오패스 테스트 인트로 이미지 1장
- 소시오패스 결과 유형별 이미지 5장
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "img", "og")
os.makedirs(OUT_DIR, exist_ok=True)

FONT_BLACK = "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc"
FONT_BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FONT_MEDIUM = "/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc"
EMOJI_FONT = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_text_centered(draw, text, y, f, fill, canvas_w=W):
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    x = (canvas_w - tw) / 2 - bbox[0]
    draw.text((x, y), text, font=f, fill=fill)
    return bbox[3] - bbox[1]


def draw_emoji_centered(img, draw, emoji, y, size=160):
    """NotoColorEmoji는 고정 픽셀 크기(보통 109px)만 지원하는 비트맵 폰트라서
    109px로 그린 뒤 원하는 크기로 리사이즈해서 붙여넣는다."""
    try:
        native_size = 109
        ef = font(EMOJI_FONT, native_size)
        tmp = Image.new("RGBA", (native_size * 2, native_size * 2), (0, 0, 0, 0))
        tdraw = ImageDraw.Draw(tmp)
        tdraw.text((native_size // 2, 0), emoji, font=ef, embedded_color=True)
        bbox = tmp.getbbox()
        if not bbox:
            return False
        cropped = tmp.crop(bbox)
        scale = size / cropped.height
        new_w = max(1, int(cropped.width * scale))
        new_h = max(1, int(cropped.height * scale))
        resized = cropped.resize((new_w, new_h), Image.LANCZOS)
        x = int((W - new_w) / 2)
        img.paste(resized, (x, int(y)), resized)
        return True
    except Exception as e:
        print("이모지 렌더링 실패, 도형으로 대체:", e)
        return False


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def make_gradient(color_hex):
    base = hex_to_rgb(color_hex)
    # 살짝 밝은 톤 -> base 톤 대각선 그라디언트
    lighten = tuple(min(255, int(c + (255 - c) * 0.28)) for c in base)
    img = Image.new("RGB", (W, H), base)
    top = Image.new("RGB", (W, H), lighten)
    mask = Image.new("L", (W, H))
    mask_data = []
    for y in range(H):
        for x in range(W):
            # 좌상단(밝음) -> 우하단(진함) 대각선
            t = (x / W + y / H) / 2
            mask_data.append(int(255 * (1 - t)))
    mask.putdata(mask_data)
    img = Image.composite(top, img, mask)
    return img


def add_decoration(img, color_hex):
    base = hex_to_rgb(color_hex)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([W - 260, -160, W + 220, 300], fill=base + (60,))
    d.ellipse([-180, H - 220, 240, H + 180], fill=(255, 255, 255, 25))
    img.paste(Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB"), (0, 0))
    return img


def brand_mark(draw):
    draw.text((56, 46), "마음캐치", font=font(FONT_BLACK, 34), fill=(255, 255, 255, 235))


def make_card(filename, color_hex, emoji, title, subtitle, badge=None):
    img = make_gradient(color_hex)
    img = add_decoration(img, color_hex)
    draw = ImageDraw.Draw(img)

    brand_mark(draw)

    if badge:
        bf = font(FONT_BOLD, 26)
        bbox = draw.textbbox((0, 0), badge, font=bf)
        bw = bbox[2] - bbox[0] + 44
        bh = 50
        bx = (W - bw) / 2
        by = 158
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=25, fill=(255, 255, 255, 235))
        draw_text_centered(draw, badge, by + 9, bf, (31, 32, 41))

    emoji_y = 220
    ok = draw_emoji_centered(img, draw, emoji, emoji_y, size=140)
    if not ok:
        draw.ellipse([W / 2 - 70, emoji_y, W / 2 + 70, emoji_y + 140], fill=(255, 255, 255, 200))

    title_y = emoji_y + 168
    draw_text_centered(draw, title, title_y, font(FONT_BLACK, 56), (255, 255, 255))

    sub_y = title_y + 78
    draw_text_centered(draw, subtitle, sub_y, font(FONT_MEDIUM, 30), (255, 255, 255, 235))

    out_path = os.path.join(OUT_DIR, filename)
    img.convert("RGB").save(out_path, "PNG", quality=92)
    print("생성 완료:", out_path)


# 1) 홈 대표 이미지
make_card(
    "home.png",
    "#7C3AED",
    "🧠",
    "마음캐치",
    "재미로 보는 심리테스트 모음 · MBTI · 연애운 · IQ/EQ",
    badge="무료 · 30초 완성",
)

# 2) 소시오패스 테스트 인트로 이미지
make_card(
    "sociopath-intro.png",
    "#312E81",
    "🧊",
    "나의 소시오패스 지수는?",
    "10문항 · 30초면 끝나는 심리테스트",
    badge="지금 바로 확인하기",
)

# 3) 결과 5종 이미지
RESULTS = [
    dict(id=1, emoji="🐑", title="순한 양 마음형", subtitle="공감능력 최상, 정 많은 당신", color="#10B981"),
    dict(id=2, emoji="⚖️", title="균형잡힌 현실주의형", subtitle="감정과 이성의 균형을 잘 잡는 당신", color="#3B82F6"),
    dict(id=3, emoji="♟️", title="냉철한 전략가형", subtitle="머릿속에 늘 다음 수가 있는 당신", color="#8B5CF6"),
    dict(id=4, emoji="🎭", title="타고난 설계자형", subtitle="매력과 계산을 동시에 갖춘 당신", color="#EC4899"),
    dict(id=5, emoji="🧊", title="얼음같은 지배자형", subtitle="흔들리지 않는 얼음멘탈의 소유자", color="#1E1B4B"),
]

for r in RESULTS:
    make_card(
        "sociopath-result-{}.png".format(r["id"]),
        r["color"],
        r["emoji"],
        r["title"],
        r["subtitle"],
        badge="나의 소시오패스 지수는?",
    )

print("전체 이미지 생성 완료")


# ============================================================
# 아래는 "결과 저장 카드"(설명 + 궁합까지 포함된 세로형 이미지) 생성을 위한
# 공용 헬퍼 함수들. generate_share_cards.py 에서 import 해서 사용한다.
# ============================================================

CARD_W = 1080


def wrap_text_lines(draw, text, f, max_width):
    """단어(어절) 단위로 줄바꿈. 한 단어가 max_width보다 길면 글자 단위로 강제 분할."""
    words = text.split(" ")
    lines = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        tw = draw.textbbox((0, 0), trial, font=f)[2]
        if tw <= max_width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)

    final = []
    for line in lines:
        if draw.textbbox((0, 0), line, font=f)[2] <= max_width:
            final.append(line)
        else:
            buf = ""
            for ch in line:
                trial = buf + ch
                if draw.textbbox((0, 0), trial, font=f)[2] <= max_width:
                    buf = trial
                else:
                    if buf:
                        final.append(buf)
                    buf = ch
            if buf:
                final.append(buf)
    return final


def draw_wrapped_text(draw, text, x, y, f, fill, max_width, line_height):
    lines = wrap_text_lines(draw, text, f, max_width)
    for line in lines:
        draw.text((x, y), line, font=f, fill=fill)
        y += line_height
    return y


def draw_emoji_at(img, emoji, x, y, size):
    """지정한 좌상단 좌표(x, y)에 이모지를 그린다. 실패 시 아무것도 그리지 않고 False 반환."""
    try:
        native_size = 109
        ef = font(EMOJI_FONT, native_size)
        tmp = Image.new("RGBA", (native_size * 2, native_size * 2), (0, 0, 0, 0))
        tdraw = ImageDraw.Draw(tmp)
        tdraw.text((native_size // 2, 0), emoji, font=ef, embedded_color=True)
        bbox = tmp.getbbox()
        if not bbox:
            return False
        cropped = tmp.crop(bbox)
        scale = size / cropped.height
        new_w = max(1, int(cropped.width * scale))
        new_h = max(1, int(cropped.height * scale))
        resized = cropped.resize((new_w, new_h), Image.LANCZOS)
        img.paste(resized, (int(x), int(y)), resized)
        return True
    except Exception as e:
        print("이모지 렌더링 실패:", e)
        return False


def make_share_card(filename, out_dir, color_hex, emoji, title, subtitle, summary, traits, best, worst, test_label):
    """설명 + 특징 + 천생연분/상극 궁합까지 한 장에 담은 세로형 '결과 저장 카드' 생성.
    best/worst 는 {"emoji":..., "title":..., "reason":...} 형태."""
    os.makedirs(out_dir, exist_ok=True)
    PAD = 56
    content_w = CARD_W - PAD * 2

    # 넉넉한 높이로 캔버스를 만들고, 실제 그려진 만큼만 나중에 잘라낸다.
    canvas_h = 2600
    base = hex_to_rgb(color_hex)
    lighten = tuple(min(255, int(c + (255 - c) * 0.28)) for c in base)

    hero_h = 520
    hero = Image.new("RGB", (CARD_W, hero_h), base)
    top = Image.new("RGB", (CARD_W, hero_h), lighten)
    mask = Image.new("L", (CARD_W, hero_h))
    mask_data = []
    for yy in range(hero_h):
        for xx in range(CARD_W):
            t = (xx / CARD_W + yy / hero_h) / 2
            mask_data.append(int(255 * (1 - t)))
    mask.putdata(mask_data)
    hero = Image.composite(top, hero, mask)

    img = Image.new("RGB", (CARD_W, canvas_h), (255, 255, 255))
    img.paste(hero, (0, 0))
    draw = ImageDraw.Draw(img)

    # 브랜드 + 테스트명
    draw.text((PAD, 44), "마음캐치", font=font(FONT_BLACK, 32), fill=(255, 255, 255))
    draw.text((PAD, 90), test_label, font=font(FONT_MEDIUM, 24), fill=(255, 255, 255, 220))

    # 이모지 + 타이틀 + 서브타이틀 (히어로 영역, 중앙 정렬)
    draw_emoji_at(img, emoji, CARD_W / 2 - 75, 150, 150)
    y = 150 + 150 + 26
    y += draw_text_centered(draw, title, y, font(FONT_BLACK, 52), (255, 255, 255), canvas_w=CARD_W)
    y += 14
    draw_text_centered(draw, subtitle, y, font(FONT_MEDIUM, 28), (255, 255, 255), canvas_w=CARD_W)

    # 본문 시작
    y = hero_h + 56
    body_font = font(FONT_MEDIUM, 32)
    y = draw_wrapped_text(draw, summary, PAD, y, body_font, (55, 56, 66), content_w, 48)

    y += 24
    draw.text((PAD, y), "이런 특징이 있어요", font=font(FONT_BOLD, 28), fill=(140, 142, 156))
    y += 46
    trait_font = font(FONT_BOLD, 30)
    for t in traits:
        draw.text((PAD, y), "✓ " + t, font=trait_font, fill=(55, 56, 66))
        y += 46

    y += 30
    draw.text((PAD, y), "나와 잘 맞는 유형은?", font=font(FONT_BOLD, 30), fill=(31, 32, 41))
    y += 54

    def render_compat_card(y, label_emoji, label_text, label_color, box_fill, item):
        box_pad = 32
        # 예상 텍스트 줄 수를 계산해서 박스 높이를 먼저 확정한다.
        reason_lines = wrap_text_lines(draw, item["reason"], font(FONT_MEDIUM, 26), content_w - box_pad * 2)
        box_h = box_pad + 42 + 74 + len(reason_lines) * 38 + box_pad - 10
        box_x0, box_x1 = PAD, PAD + content_w
        box_y0, box_y1 = y, y + box_h
        draw.rounded_rectangle([box_x0, box_y0, box_x1, box_y1], radius=28, fill=box_fill)

        cy = box_y0 + box_pad
        draw_emoji_at(img, label_emoji, box_x0 + box_pad, cy - 4, 32)
        draw.text((box_x0 + box_pad + 40, cy), label_text, font=font(FONT_BOLD, 26), fill=label_color)
        cy += 42
        draw_emoji_at(img, item["emoji"], box_x0 + box_pad, cy, 52)
        draw.text((box_x0 + box_pad + 66, cy + 6), item["title"], font=font(FONT_BLACK, 34), fill=(31, 32, 41))
        cy += 74
        for line in reason_lines:
            draw.text((box_x0 + box_pad, cy), line, font=font(FONT_MEDIUM, 26), fill=(90, 92, 105))
            cy += 38
        return box_y1

    y = render_compat_card(y, "💘", "천생연분", (5, 150, 105), (236, 253, 245), best)
    y += 20
    y = render_compat_card(y, "⚡", "상극 주의", (220, 38, 38), (254, 242, 242), worst)

    y += 50
    draw_text_centered(draw, "마음캐치에서 나도 테스트하기 →", y, font(FONT_BOLD, 26), (140, 142, 156), canvas_w=CARD_W)
    y += 60

    final_img = img.crop((0, 0, CARD_W, min(int(y), canvas_h)))
    out_path = os.path.join(out_dir, filename)
    final_img.save(out_path, "PNG", quality=92)
    print("저장 카드 생성 완료:", out_path)
