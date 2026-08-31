/* ============================================================
   리더십 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const LEADERSHIPINDEX_QUESTIONS = [
  { text: "조별과제나 팀플이 시작되면 나는?", options: [ { text: "먼저 역할 분담을 제안한다", score: 2 }, { text: "누가 정해주길 기다린다", score: 0 }, { text: "필요하면 의견을 낸다", score: 1 } ] },
  { text: "친구들과 여행 계획을 짤 때 나는?", options: [ { text: "일정과 동선을 직접 짜서 공유한다", score: 2 }, { text: "다른 사람이 짜는 대로 따라간다", score: 0 }, { text: "의견 정도는 낸다", score: 1 } ] },
  { text: "의견이 갈려서 결정이 안 날 때 나는?", options: [ { text: "먼저 나서서 결론을 정리한다", score: 2 }, { text: "누군가 정해주길 기다린다", score: 0 }, { text: "중간에서 조율해보려 한다", score: 1 } ] },
  { text: "새로운 모임에 처음 가면 나는?", options: [ { text: "먼저 사람들을 챙기고 분위기를 이끈다", score: 2 }, { text: "적응할 때까지 조용히 지켜본다", score: 0 }, { text: "분위기 봐서 자연스럽게 어울린다", score: 1 } ] },
  { text: "문제가 생겼을 때 나의 반응은?", options: [ { text: "바로 나서서 해결책을 제시한다", score: 2 }, { text: "누가 해결해주길 기다린다", score: 0 }, { text: "같이 해결 방법을 고민한다", score: 1 } ] },
  { text: "발표나 대표를 맡아야 할 상황에서 나는?", options: [ { text: "먼저 손을 들고 맡는다", score: 2 }, { text: "최대한 피하고 싶다", score: 0 }, { text: "필요하면 어쩔 수 없이 맡는다", score: 1 } ] },
  { text: "친구들 사이에서 나는 보통?", options: [ { text: "약속이나 모임을 주도적으로 만든다", score: 2 }, { text: "따라가는 역할이 편하다", score: 0 }, { text: "적당히 의견을 보태는 편이다", score: 1 } ] },
  { text: "팀원이 실수했을 때 나는?", options: [ { text: "책임지고 상황을 정리한 뒤 다음을 챙긴다", score: 2 }, { text: "그냥 넘어가고 나도 조용히 있는다", score: 0 }, { text: "같이 수습하며 다독인다", score: 1 } ] },
  { text: "회의나 모임에서 다들 조용할 때 나는?", options: [ { text: "먼저 침묵을 깨고 이야기를 시작한다", score: 2 }, { text: "나도 딱히 말을 안 한다", score: 0 }, { text: "누가 말하면 거들어준다", score: 1 } ] },
  { text: "목표를 정할 때 나는?", options: [ { text: "방향을 제시하고 사람들을 이끈다", score: 2 }, { text: "남들이 정한 목표를 따라간다", score: 0 }, { text: "함께 목표를 정하는 편이다", score: 1 } ] },
];

const LEADERSHIPINDEX_MAX_SCORE = 20;

const LEADERSHIPINDEX_RESULTS = [
  {
    id: 1, emoji: "🙋", title: "든든한 팔로워", subtitle: "뒤에서 묵묵히 돕는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "앞에 나서기보다 뒤에서 묵묵히 돕는 걸 편하게 느끼는 타입이야. 리더보다는 신뢰가는 조력자 역할이 잘 어울리지.",
    traits: ["나서기보다 지켜보는 걸 편안해한다", "맡은 역할은 성실하게 해낸다", "갈등보다 조화를 중요하게 여긴다"],
    compat: { best: { id: 5, reason: "확실하게 이끌어주는 5번 유형과 있으면 마음 편하게 따라갈 수 있어" }, worst: { id: 2, reason: "둘 다 나서지 않으면 결정이 계속 미뤄질 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "숨은 실세", subtitle: "필요할 때 슬쩍 힘을 보태는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "앞장서진 않지만 필요할 땐 슬쩍 힘을 보태는 편이야. 리더 옆에서 실질적인 역할을 하는 경우가 많은, 은근히 존재감 있는 스타일.",
    traits: ["필요할 때만 나서서 힘을 보탠다", "겉으로 티는 안 나도 실속 있게 돕는다", "안정적인 조율자 역할을 잘한다"],
    compat: { best: { id: 4, reason: "믿음직한 4번 유형과 있으면 손발이 잘 맞아 든든해질 수 있어" }, worst: { id: 1, reason: "둘 다 소극적으로 뒤에 있으면 일이 진행되지 않을 수 있어" } },
  },
  {
    id: 3, emoji: "🧭", title: "밸런스 캡틴", subtitle: "필요할 때만 나서는 효율적인 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "필요할 때만 나서는 효율적인 리더 타입이야. 상황을 보고 나설 때와 물러설 때를 잘 아는, 눈치와 판단력이 좋은 스타일.",
    traits: ["상황을 보고 나설 타이밍을 잘 안다", "무리하게 나서지 않고 효율을 챙긴다", "누구와 있어도 무난하게 어울린다"],
    compat: { best: { id: 2, reason: "은근히 힘을 보태는 2번 유형과 있으면 손발이 잘 맞을 수 있어" }, worst: { id: 5, reason: "주도권이 강한 5번 유형과는 방향이 부딪힐 수 있어" } },
  },
  {
    id: 4, emoji: "🧑‍💼", title: "든든한 리더", subtitle: "자연스럽게 팀을 이끄는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "자연스럽게 팀을 이끄는 리더 기질이 강한 편이야. 책임감 있게 상황을 정리하고 사람들을 잘 챙기는, 믿을만한 스타일.",
    traits: ["책임감 있게 상황을 정리한다", "사람들을 세심하게 챙긴다", "결정이 필요할 때 먼저 나선다"],
    compat: { best: { id: 1, reason: "묵묵히 따라와주는 1번 유형과 있으면 안정적인 팀워크를 이룰 수 있어" }, worst: { id: 5, reason: "둘 다 주도권을 쥐려다 보면 방향이 겹쳐 부딪힐 수 있어" } },
  },
  {
    id: 5, emoji: "👑", title: "카리스마 리더", subtitle: "자연스럽게 중심에 서는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "어디서든 자연스럽게 중심에 서는 타입이야. 결정력과 추진력이 강해서 사람들이 믿고 따르는, 타고난 대장 기질의 소유자지.",
    traits: ["결단력이 빠르고 추진력이 강하다", "책임지는 걸 두려워하지 않는다", "사람들을 자연스럽게 이끈다"],
    compat: { best: { id: 1, reason: "믿고 따라와주는 1번 유형과 있으면 리더십을 마음껏 발휘할 수 있어" }, worst: { id: 4, reason: "둘 다 주도하려는 성향이 강해서 방향을 두고 부딪힐 수 있어" } },
  },
];

function getLeadershipIndexResult(score) {
  return LEADERSHIPINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || LEADERSHIPINDEX_RESULTS[LEADERSHIPINDEX_RESULTS.length - 1];
}

function getLeadershipIndexById(id) {
  return LEADERSHIPINDEX_RESULTS.find((r) => r.id === Number(id));
}
