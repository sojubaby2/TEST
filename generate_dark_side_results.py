#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
흑화 지수 테스트 결과 페이지 생성 스크립트.
assets/js/dark-side-data.js 의 내용과 반드시 일치시킬 것.
"""
import generate_spectrum_common as common

RESULTS = [
    dict(
        id=1, emoji="🌸", title="순정만화 주인공형", subtitle="웬만한 일엔 화조차 잘 안 나는 타입",
        min=0, max=4, color="#22C55E",
        summary="웬만한 일에는 화조차 잘 안 나는 순둥순둥한 타입이에요. 배신을 당해도 상대를 이해해보려 하고, 좀처럼 나쁜 마음을 품지 않아요. 그 선함이 매력이지만, 가끔은 나를 지키기 위한 단호함도 필요해요.",
        traits=["웬만한 일에 화를 잘 안 냄", "상대를 먼저 이해하려 함", "복수보다 화해를 택함"],
        compat=dict(
            best=dict(id=2, emoji="🙂", title="평범한 이웃형", reason="둘 다 선한 마음을 가져서 편안하고 다정한 케미가 잘 맞아요."),
            worst=dict(id=3, emoji="🥷", title="안티히어로형", reason="속을 알 수 없는 상대의 태도에 자꾸 상처받을 수 있어요."),
        ),
    ),
    dict(
        id=2, emoji="🙂", title="평범한 이웃형", subtitle="감정을 무난하게 흘려보내는 타입",
        min=5, max=8, color="#3B82F6",
        summary="화가 나면 화가 나는 대로, 평범하게 감정을 흘려보내는 타입이에요. 크게 복수심을 품기보다는 자연스럽게 거리를 두는 쪽을 택해요. 무난하고 안정적인 성향이라 주변 사람들과 큰 마찰 없이 잘 지내는 편이에요.",
        traits=["감정을 무난하게 흘려보냄", "갈등보단 거리두기를 택함", "안정적이고 무던한 성향"],
        compat=dict(
            best=dict(id=1, emoji="🌸", title="순정만화 주인공형", reason="서로 무해한 매력에 이끌려 편안한 관계를 만들어가요."),
            worst=dict(id=4, emoji="🌑", title="흑화 진행중형", reason="어두운 기운의 상대를 감당하기 벅찰 수 있어요."),
        ),
    ),
    dict(
        id=3, emoji="🥷", title="안티히어로형", subtitle="겉은 웃지만 속으로 계산을 끝내는 타입",
        min=9, max=12, color="#F59E0B",
        summary="겉으론 웃지만 속으로는 확실하게 계산을 끝내는 타입이에요. 무시당하거나 손해 보는 걸 그냥 넘기지 않고, 조용히 자기만의 방식으로 정리하는 편이에요. 그 서늘한 매력이 은근히 사람들을 긴장하게 만들어요.",
        traits=["속을 잘 드러내지 않음", "손해 보는 걸 그냥 넘기지 않음", "조용하지만 확실하게 대응함"],
        compat=dict(
            best=dict(id=4, emoji="🌑", title="흑화 진행중형", reason="서로의 서늘한 매력을 알아보는 은근한 케미가 있어요."),
            worst=dict(id=1, emoji="🌸", title="순정만화 주인공형", reason="너무 순수한 상대를 대하는 게 오히려 불편할 수 있어요."),
        ),
    ),
    dict(
        id=4, emoji="🌑", title="흑화 진행중형", subtitle="감정이 서서히 어두운 쪽으로 기우는 타입",
        min=13, max=16, color="#7C3AED",
        summary="쌓이고 쌓인 감정이 서서히 어두운 쪽으로 기울고 있는 타입이에요. 배신이나 무시를 당하면 반드시 되갚아주겠다는 마음이 강하게 자리 잡아요. 아직 완전히 넘어간 건 아니니, 좋은 방향으로 에너지를 써보는 것도 좋아요.",
        traits=["당한 만큼 되갚으려는 마음이 강함", "눈빛부터 달라진다는 말을 자주 들음", "복수심이 서서히 쌓이는 편"],
        compat=dict(
            best=dict(id=3, emoji="🥷", title="안티히어로형", reason="비슷한 결의 어두움을 가진 상대와 묘하게 잘 통해요."),
            worst=dict(id=2, emoji="🙂", title="평범한 이웃형", reason="밝은 상대 옆에서 나만 이질적으로 느껴질 수 있어요."),
        ),
    ),
    dict(
        id=5, emoji="👹", title="완전체 다크로드형", subtitle="이미 완전히 흑화를 마친 최종 보스 타입",
        min=17, max=20, color="#1E1B4B",
        summary="이미 완전히 흑화를 마친 최종 보스 타입이에요. 감정을 완벽하게 숨기고, 손해나 무시는 반드시 확실한 결과로 되갚아주는 편이에요. 그 강렬한 카리스마가 무섭지만 동시에 묘하게 매력적으로 느껴져요.",
        traits=["완벽하게 감정을 숨김", "당한 건 반드시 되갚음", "강렬한 카리스마의 소유자"],
        compat=dict(
            best=dict(id=1, emoji="🌸", title="순정만화 주인공형", reason="정반대의 순수함이 오히려 강하게 끌리는 매력 포인트예요."),
            worst=dict(id=3, emoji="🥷", title="안티히어로형", reason="비슷하게 계산적인 상대와는 팽팽한 기싸움이 벌어질 수 있어요."),
        ),
    ),
]

common.generate(
    slug="dark-side", dir_name="dark-side", test_label="흑화 지수 테스트", title_word="흑화 지수",
    index_title="나의 흑화 지수", get_by_id="getDarkSideById", max_score_var="DARKSIDE_MAX_SCORE",
    results_var="DARKSIDE_RESULTS", results=RESULTS,
)
