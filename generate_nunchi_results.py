#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
눈치 테스트 결과 페이지 생성 스크립트.
assets/js/nunchi-data.js 의 내용과 반드시 일치시킬 것.
"""
import generate_spectrum_common as common

RESULTS = [
    dict(
        id=1, emoji="🙈", title="눈치 제로형", subtitle="분위기보다는 내 할 말에 집중하는 타입",
        min=0, max=4, color="#64748B",
        summary="분위기 파악보다는 내 할 말, 내 할 일에 집중하는 타입이에요. 눈치 없다는 말을 종종 듣지만, 그만큼 솔직하고 꾸밈없는 매력이 있어요. 대화 중 상대의 표정이나 말투를 조금만 더 살펴보면 관계가 한결 편해질 거예요.",
        traits=["분위기보다 할 말에 집중함", "눈치 없다는 말을 종종 들음", "솔직하고 꾸밈없는 성격"],
        compat=dict(
            best=dict(id=2, emoji="🐢", title="눈치 초보형", reason="비슷한 속도로 서로를 이해해줘서 마음이 편안해요."),
            worst=dict(id=3, emoji="👀", title="평균 눈치형", reason="눈치 빠른 상대의 신호를 자꾸 놓쳐서 오해가 쌓일 수 있어요."),
        ),
    ),
    dict(
        id=2, emoji="🐢", title="눈치 초보형", subtitle="뒤늦게 '아, 그런거였구나' 하는 타입",
        min=5, max=8, color="#0EA5E9",
        summary="뭔가 이상하다는 느낌은 오지만, 정확히 캐치하는 데는 시간이 좀 걸리는 타입이에요. 나중에서야 '아, 그런 거였구나' 하고 깨닫는 경우가 많아요. 조금만 더 관찰하는 습관을 들이면 눈치가 빠르게 늘 수 있어요.",
        traits=["뒤늦게 상황을 파악하는 편", "느낌은 오지만 확신이 부족함", "관찰하는 습관을 기르면 발전 가능"],
        compat=dict(
            best=dict(id=1, emoji="🙈", title="눈치 제로형", reason="서로 급하지 않게 맞춰가는 편안한 케미가 있어요."),
            worst=dict(id=4, emoji="🦊", title="눈치 백단형", reason="빠르게 캐치하는 상대의 속도를 따라가기 벅찰 수 있어요."),
        ),
    ),
    dict(
        id=3, emoji="👀", title="평균 눈치형", subtitle="대체로 분위기를 잘 파악하는 무난한 타입",
        min=9, max=12, color="#F59E0B",
        summary="대체로 분위기를 잘 파악하지만, 가끔 놓치는 부분도 있는 무난한 타입이에요. 상대의 돌려 말하는 의도 정도는 캐치하지만, 아주 미묘한 신호까지는 못 잡을 때도 있어요. 딱 적당한 균형감을 가진 편이에요.",
        traits=["대체로 분위기를 잘 파악함", "가끔 미묘한 신호는 놓침", "무난하고 균형 잡힌 감각"],
        compat=dict(
            best=dict(id=4, emoji="🦊", title="눈치 백단형", reason="눈치 빠른 상대 덕분에 서로 편하게 잘 맞춰가요."),
            worst=dict(id=1, emoji="🙈", title="눈치 제로형", reason="신호를 잘 못 알아채는 상대에게 답답함을 느낄 수 있어요."),
        ),
    ),
    dict(
        id=4, emoji="🦊", title="눈치 백단형", subtitle="분위기 변화를 빠르게 캐치하는 센스쟁이",
        min=13, max=16, color="#10B981",
        summary="웬만한 분위기 변화는 바로 캐치하는 센스 있는 타입이에요. 돌려 말하는 속뜻도 금방 알아채고, 상황에 맞게 자연스럽게 대처해요. 그 눈치 빠른 매력 덕분에 어디서든 분위기 메이커로 활약해요.",
        traits=["분위기 변화를 빠르게 캐치함", "돌려 말하는 속뜻을 잘 파악함", "상황에 맞게 자연스럽게 대처함"],
        compat=dict(
            best=dict(id=3, emoji="👀", title="평균 눈치형", reason="당신의 눈치를 잘 따라와주는 상대라 합이 잘 맞아요."),
            worst=dict(id=2, emoji="🐢", title="눈치 초보형", reason="느린 상대의 반응을 계속 기다리다 지칠 수 있어요."),
        ),
    ),
    dict(
        id=5, emoji="🧠", title="눈치 만렙형", subtitle="말하지 않아도 이미 다 알아차리는 타입",
        min=17, max=20, color="#7C3AED",
        summary="말하지 않아도 이미 다 알아차리는 눈치의 끝판왕 타입이에요. 상대의 표정, 말투, 미묘한 침묵까지 모두 캐치해서 알아서 배려해줘요. 다만 너무 눈치를 많이 보다가 정작 내 마음을 표현하는 데 소홀해지지 않게 주의하세요.",
        traits=["말하지 않아도 다 알아차림", "미묘한 신호까지 놓치지 않음", "알아서 배려하는 섬세함"],
        compat=dict(
            best=dict(id=1, emoji="🙈", title="눈치 제로형", reason="정반대라 오히려 편하게 있는 그대로 다가갈 수 있어요."),
            worst=dict(id=3, emoji="👀", title="평균 눈치형", reason="서로 눈치를 너무 많이 봐서 정작 솔직한 대화가 어려울 수 있어요."),
        ),
    ),
]

common.generate(
    slug="nunchi", dir_name="nunchi", test_label="눈치 테스트", title_word="눈치 지수",
    index_title="나의 눈치 지수", get_by_id="getNunchiById", max_score_var="NUNCHI_MAX_SCORE",
    results_var="NUNCHI_RESULTS", results=RESULTS,
)
