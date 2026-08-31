#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
자존감 테스트 결과 페이지 생성 스크립트.
assets/js/self-esteem-data.js 의 내용과 반드시 일치시킬 것.
"""
import generate_spectrum_common as common

RESULTS = [
    dict(
        id=1, emoji="🪫", title="자존감 충전 필요형", subtitle="지금은 나에게 조금 더 다정해질 시간",
        min=0, max=4, color="#64748B",
        summary="요즘 스스로에게 유독 박한 시기를 보내고 있을 가능성이 높아요. 남과 비교하며 위축되기 쉽고, 작은 실수에도 오래 자책하는 편이에요. 지금은 자신을 몰아붙이기보다, 잘하고 있는 부분을 스스로 인정해주는 연습이 필요한 때예요.",
        traits=["비교와 비판에 쉽게 위축됨", "실수를 오래 곱씹는 편", "칭찬을 어색해하고 잘 못 믿음"],
        compat=dict(
            best=dict(id=4, emoji="🌳", title="단단한 자존감형", reason="흔들릴 때마다 든든하게 붙잡아주는 상대라 안정감을 느껴요."),
            worst=dict(id=5, emoji="👑", title="자존감 만렙형", reason="넘치는 자신감이 가끔은 비교당하는 기분이 들게 할 수 있어요."),
        ),
    ),
    dict(
        id=2, emoji="🌊", title="흔들리는 자존감형", subtitle="괜찮다가도 훅 흔들리는 타입",
        min=5, max=8, color="#0EA5E9",
        summary="평소엔 괜찮다가도 특정 상황에서 자존감이 크게 흔들리는 타입이에요. 컨디션이나 주변 반응에 따라 스스로에 대한 평가가 달라지기 쉬워요. 흔들릴 때 나를 다잡아줄 수 있는 나만의 루틴을 만들어두면 도움이 돼요.",
        traits=["상황에 따라 자존감 기복이 큼", "타인의 반응에 예민하게 반응함", "컨디션에 따라 자기평가가 달라짐"],
        compat=dict(
            best=dict(id=5, emoji="👑", title="자존감 만렙형", reason="흔들릴 때마다 중심을 잡아주는 상대라 큰 힘이 돼요."),
            worst=dict(id=4, emoji="🌳", title="단단한 자존감형", reason="확고한 상대 앞에서 내 감정 기복이 더 크게 느껴질 수 있어요."),
        ),
    ),
    dict(
        id=3, emoji="⚖️", title="그때그때 다른 자존감형", subtitle="잘하는 분야에선 당당, 낯선 곳에선 위축",
        min=9, max=12, color="#F59E0B",
        summary="영역에 따라 자신감의 편차가 큰 타입이에요. 잘하는 분야에서는 당당하지만, 익숙하지 않은 상황에서는 유독 위축되는 편이에요. 나의 강점과 약점을 있는 그대로 받아들이면 훨씬 편안해질 수 있어요.",
        traits=["잘하는 분야에서는 자신감이 넘침", "낯선 상황에서는 유독 위축됨", "상황별로 자기평가가 크게 달라짐"],
        compat=dict(
            best=dict(id=1, emoji="🪫", title="자존감 충전 필요형", reason="서로의 기분을 세심하게 살펴주는 케미가 잘 맞아요."),
            worst=dict(id=5, emoji="👑", title="자존감 만렙형", reason="일관되게 당당한 상대의 페이스를 따라가기 벅찰 수 있어요."),
        ),
    ),
    dict(
        id=4, emoji="🌳", title="단단한 자존감형", subtitle="웬만한 일엔 잘 흔들리지 않는 타입",
        min=13, max=16, color="#16A34A",
        summary="웬만한 일에는 크게 흔들리지 않는 단단한 자존감을 가진 타입이에요. 비판을 받아도 필요한 부분만 받아들이고 금방 회복하는 편이라, 주변 사람들에게 든든한 존재로 여겨져요. 가끔은 스스로에게도 좀 더 다정해져도 좋아요.",
        traits=["웬만한 비판에도 잘 흔들리지 않음", "실수해도 빠르게 회복함", "주변에서 든든하다는 말을 자주 들음"],
        compat=dict(
            best=dict(id=1, emoji="🪫", title="자존감 충전 필요형", reason="내가 채워줄 수 있는 상대라 함께 있으면 뿌듯하고 든든해요."),
            worst=dict(id=2, emoji="🌊", title="흔들리는 자존감형", reason="감정 기복이 큰 상대를 맞춰주다 지칠 수 있어요."),
        ),
    ),
    dict(
        id=5, emoji="👑", title="자존감 만렙형", subtitle="나 자신을 있는 그대로 사랑하는 타입",
        min=17, max=20, color="#7C3AED",
        summary="나 자신을 있는 그대로 인정하고 사랑할 줄 아는 타입이에요. 비교보다는 자신의 페이스를 믿고, 실패도 배움의 과정으로 받아들이는 편이에요. 그 당당함이 주변 사람들에게도 좋은 에너지를 전해줘요.",
        traits=["비교보다 나의 페이스를 믿음", "실패를 배움의 기회로 받아들임", "주변에 긍정적인 에너지를 전함"],
        compat=dict(
            best=dict(id=2, emoji="🌊", title="흔들리는 자존감형", reason="당신의 단단한 에너지가 상대에게 좋은 자극과 힘이 돼요."),
            worst=dict(id=1, emoji="🪫", title="자존감 충전 필요형", reason="자존감을 채워주는 데 에너지를 많이 쏟아야 할 수 있어요."),
        ),
    ),
]

common.generate(
    slug="self-esteem", dir_name="self-esteem", test_label="자존감 테스트", title_word="자존감 지수",
    index_title="나의 자존감 지수", get_by_id="getSelfEsteemById", max_score_var="SELFESTEEM_MAX_SCORE",
    results_var="SELFESTEEM_RESULTS", results=RESULTS,
)
