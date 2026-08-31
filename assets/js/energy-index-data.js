/* ============================================================
   텐션 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const ENERGYINDEX_QUESTIONS = [
  { text: "아침에 눈을 뜨면 나는?", options: [ { text: "바로 벌떡 일어나 하루를 시작한다", score: 2 }, { text: "알람을 몇 개나 꺼야 겨우 일어난다", score: 0 }, { text: "몇 번 더 뒤척이다 일어난다", score: 1 } ] },
  { text: "친구가 갑자기 '지금 놀러 나올래?'라고 물으면 나는?", options: [ { text: "당장 준비하고 나간다", score: 2 }, { text: "귀찮아서 다음에 보자고 한다", score: 0 }, { text: "고민하다 컨디션 보고 정한다", score: 1 } ] },
  { text: "좋아하는 노래가 나오면 나는?", options: [ { text: "몸이 먼저 반응해서 춤추듯 움직인다", score: 2 }, { text: "가만히 듣는다", score: 0 }, { text: "속으로 흥얼거린다", score: 1 } ] },
  { text: "단체 모임에서 나는 보통?", options: [ { text: "분위기를 살리는 역할을 자처한다", score: 2 }, { text: "조용히 앉아서 듣는 편이다", score: 0 }, { text: "적당히 리액션하며 어울린다", score: 1 } ] },
  { text: "게임이나 승부에서 이겼을 때 내 반응은?", options: [ { text: "자리에서 일어나 소리치며 환호한다", score: 2 }, { text: "속으로만 좋아한다", score: 0 }, { text: "가볍게 소리 내며 기뻐한다", score: 1 } ] },
  { text: "새로운 사람을 만났을 때 나는?", options: [ { text: "먼저 다가가서 말을 건다", score: 2 }, { text: "말 걸기 전까지 조용히 있는다", score: 0 }, { text: "상대가 다가오면 자연스럽게 대화한다", score: 1 } ] },
  { text: "카페인을 마셨을 때 체감 텐션 변화는?", options: [ { text: "바로 눈이 번쩍 뜨이고 에너지가 솟는다", score: 2 }, { text: "딱히 큰 차이를 못 느낀다", score: 0 }, { text: "약간 정신이 든다", score: 1 } ] },
  { text: "놀이공원에 가면 나는?", options: [ { text: "제일 무서운 것부터 줄 서서 탄다", score: 2 }, { text: "무서운 놀이기구는 웬만하면 피한다", score: 0 }, { text: "몇 개 정도는 도전해본다", score: 1 } ] },
  { text: "노래방에 가면 나는?", options: [ { text: "마이크를 놓지 않고 계속 부른다", score: 2 }, { text: "박수만 치며 분위기를 즐긴다", score: 0 }, { text: "적당히 몇 곡 부르고 즐긴다", score: 1 } ] },
  { text: "하루 일과를 마치고 집에 오면 나는?", options: [ { text: "그래도 뭔가 더 할 힘이 남아있다", score: 2 }, { text: "손가락 하나 까딱하기 힘들 정도로 지친다", score: 0 }, { text: "적당히 쉬면서 재충전한다", score: 1 } ] },
];

const ENERGYINDEX_MAX_SCORE = 20;

const ENERGYINDEX_RESULTS = [
  {
    id: 1, emoji: "🔋", title: "고요한 배터리 세이버", subtitle: "에너지를 최대한 아끼는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "평소엔 에너지를 최대한 아끼는 스타일이야. 조용하고 차분한 리듬으로 하루를 보내는 걸 선호하고, 필요한 순간에만 배터리를 꺼내 쓰는 편.",
    traits: ["필요할 때만 에너지를 쓴다", "혼자만의 시간에서 충전된다", "차분하고 안정적인 분위기를 좋아한다"],
    compat: { best: { id: 4, reason: "흥 많은 4번 유형이 슬쩍 텐션을 끌어올려줘서 시너지가 날 수 있어" }, worst: { id: 5, reason: "쉴 틈 없이 몰아붙이는 5번 유형 옆에 있으면 금방 지칠 수 있어" } },
  },
  {
    id: 2, emoji: "🌤", title: "은은한 미열형", subtitle: "필요할 때만 슬쩍 텐션을 맞추는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "크게 텐션이 오르내리진 않지만 필요할 땐 슬쩍 분위기에 맞춰주는 편이야. 무리하지 않는 선에서 즐길 줄 아는 스타일.",
    traits: ["평소엔 잔잔하지만 필요할 땐 맞춰준다", "무리해서 텐션을 끌어올리진 않는다", "조용한 분위기도 편하게 즐긴다"],
    compat: { best: { id: 3, reason: "적당히 신나는 3번 유형과 무리 없이 잘 어울릴 수 있어" }, worst: { id: 5, reason: "쉴 새 없이 텐션이 높은 5번 유형은 따라가기 벅찰 수 있어" } },
  },
  {
    id: 3, emoji: "🙂", title: "적당히 신남 밸런서", subtitle: "분위기에 맞춰 텐션을 조절하는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "분위기에 맞춰 텐션을 조절할 줄 아는 밸런스형이야. 놀 땐 놀고 쉴 땐 쉬는, 상황 파악이 빠른 스타일.",
    traits: ["상황에 맞게 텐션을 조절한다", "놀 때와 쉴 때를 잘 구분한다", "누구와 있어도 무난하게 어울린다"],
    compat: { best: { id: 2, reason: "잔잔한 2번 유형과 무리 없이 편안한 케미를 보여줄 수 있어" }, worst: { id: 1, reason: "너무 조용한 1번 유형과 있으면 가끔 심심하게 느껴질 수 있어" } },
  },
  {
    id: 4, emoji: "🎉", title: "에너자이저 예열형", subtitle: "모임에 활기를 불어넣는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "텐션이 높은 편이라 모임에 활기를 불어넣는 역할을 자주 맡는 편이야. 한번 흥이 오르면 잘 못 멈추는 타입.",
    traits: ["에너지가 넘쳐서 분위기를 이끈다", "새로운 자극을 좋아한다", "흥이 오르면 잘 멈추지 못한다"],
    compat: { best: { id: 1, reason: "차분한 1번 유형이 중심을 잘 잡아줘서 균형이 맞을 수 있어" }, worst: { id: 2, reason: "잔잔한 2번 유형에게는 텐션이 부담스럽게 느껴질 수 있어" } },
  },
  {
    id: 5, emoji: "⚡", title: "인간 에너지드링크", subtitle: "텐션이 항상 최고조인 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "텐션이 항상 최고조인 타입이야. 어디를 가든 분위기를 뒤집어놓는 폭발적인 에너지의 소유자로, 가만히 있는 걸 못 견디는 편.",
    traits: ["에너지가 넘쳐서 주변까지 신나게 만든다", "가만히 있는 걸 못 견딘다", "리액션이 크고 화끈하다"],
    compat: { best: { id: 1, reason: "차분한 1번 유형이 균형을 잡아줘서 오히려 편안한 조합이 될 수 있어" }, worst: { id: 2, reason: "텐션 차이가 커서 잔잔한 2번 유형은 부담스러워할 수 있어" } },
  },
];

function getEnergyIndexResult(score) {
  return ENERGYINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || ENERGYINDEX_RESULTS[ENERGYINDEX_RESULTS.length - 1];
}

function getEnergyIndexById(id) {
  return ENERGYINDEX_RESULTS.find((r) => r.id === Number(id));
}
