#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
꼰대력 테스트 결과 페이지 생성 스크립트.
assets/js/kkondae-data.js 의 내용과 반드시 일치시킬 것.
"""
import generate_spectrum_common as common

RESULTS = [
    dict(
        id=1, emoji="🌱", title="MZ 인정형", subtitle="라떼는 안 찾는 쿨내 진동 어른",
        min=0, max=4, color="#10B981",
        summary="나이나 연차와 상관없이 열린 마음을 가진 타입이에요. 후배의 방식을 존중하고, 새로운 트렌드도 거부감 없이 받아들여요. '라떼는' 소리를 거의 안 해서 후배들에게 편한 선배로 통해요.",
        traits=["새로운 트렌드를 거부감 없이 받아들임", "후배의 방식을 존중함", "라떼 소리를 거의 안 함"],
        compat=dict(
            best=dict(id=2, emoji="😊", title="유연한 어른형", reason="비슷하게 유연한 성향이라 손발이 잘 맞아요."),
            worst=dict(id=5, emoji="📢", title="찐꼰대형", reason="가치관 차이가 커서 부딪힐 일이 많을 수 있어요."),
        ),
    ),
    dict(
        id=2, emoji="😊", title="유연한 어른형", subtitle="가끔 옛날 생각나지만 티는 안 내는 편",
        min=5, max=8, color="#0EA5E9",
        summary="속으로는 가끔 '예전엔 안 그랬는데' 싶을 때도 있지만, 겉으로 티 내지 않고 넘기는 편이에요. 대체로 후배 입장을 이해하려 노력하는 균형 잡힌 어른이에요.",
        traits=["속마음과 다르게 티를 안 냄", "후배 입장을 이해하려 노력함", "대체로 균형 잡힌 편"],
        compat=dict(
            best=dict(id=1, emoji="🌱", title="MZ 인정형", reason="서로 잘 맞춰가는 편안한 케미가 있어요."),
            worst=dict(id=4, emoji="😤", title="은근 꼰대형", reason="가끔 튀어나오는 잔소리에 서운함을 느낄 수 있어요."),
        ),
    ),
    dict(
        id=3, emoji="🤔", title="평균 꼰대형", subtitle="누구나 조금씩은 가지고 있는 딱 그 정도",
        min=9, max=12, color="#F59E0B",
        summary="특별히 심하지도, 완전히 자유롭지도 않은 딱 평균적인 타입이에요. 상황에 따라 '나 때는' 소리가 나올 때도 있지만, 대체로 스스로 자제하려 노력하는 편이에요.",
        traits=["상황에 따라 다름", "가끔 옛날 생각이 남", "스스로 자제하려 노력함"],
        compat=dict(
            best=dict(id=3, emoji="🤔", title="평균 꼰대형", reason="비슷한 성향이라 서로의 잔소리를 이해해줘요."),
            worst=dict(id=1, emoji="🌱", title="MZ 인정형", reason="너무 쿨한 상대에게 은근히 서운함을 느낄 수 있어요."),
        ),
    ),
    dict(
        id=4, emoji="😤", title="은근 꼰대형", subtitle="'나 때는' 소리가 은근히 자주 나오는 편",
        min=13, max=16, color="#EA580C",
        summary="본인은 아니라고 생각하지만, 주변에선 은근히 꼰대력을 느끼는 타입이에요. '나 때는 말이야'가 저도 모르게 툭 튀어나오고, 후배의 새로운 방식이 낯설게 느껴질 때가 많아요.",
        traits=["'나 때는' 소리가 자주 나옴", "새로운 방식이 낯설게 느껴짐", "본인은 꼰대가 아니라고 생각함"],
        compat=dict(
            best=dict(id=2, emoji="😊", title="유연한 어른형", reason="적당히 맞춰주는 상대라 크게 부딪히지 않아요."),
            worst=dict(id=1, emoji="🌱", title="MZ 인정형", reason="가치관 차이로 자주 부딪힐 수 있어요."),
        ),
    ),
    dict(
        id=5, emoji="📢", title="찐꼰대형", subtitle="회식·군기·라떼 3종세트 완비",
        min=17, max=20, color="#92400E",
        summary="누가 봐도 인정하는 진성 꼰대력의 소유자예요. 회식은 필수, 옛날 얘기는 국룰, 안 물어봐도 조언은 기본 탑재. 다만 본인만 모르고 있을 가능성이 높으니, 가끔은 후배 입장에서 한 번쯤 생각해보는 것도 좋아요.",
        traits=["회식은 무조건 참석이 국룰", "안 물어봐도 조언을 해줌", "옛날 얘기를 자주 꺼냄"],
        compat=dict(
            best=dict(id=5, emoji="📢", title="찐꼰대형", reason="같은 세대 감성이라 통하는 게 많아요."),
            worst=dict(id=1, emoji="🌱", title="MZ 인정형", reason="너무 다른 가치관 때문에 답답함을 느낄 수 있어요."),
        ),
    ),
]

common.generate(
    slug="kkondae", dir_name="kkondae", test_label="꼰대력 테스트", title_word="꼰대력",
    index_title="나의 꼰대력 지수", get_by_id="getKkondaeById", max_score_var="KKONDAE_MAX_SCORE",
    results_var="KKONDAE_RESULTS", results=RESULTS,
)
