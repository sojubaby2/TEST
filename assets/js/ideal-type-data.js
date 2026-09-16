/* ============================================================
   내가 끌리는 사람 유형 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/ideal-type.json 을 고치세요
   ============================================================ */

const IDEALTYPE_QUESTIONS = [
  {
    text: "소개팅 첫 만남. 상대의 어떤 모습에 마음이 놓이나요?",
    options: [
      { text: "내 말을 끝까지 들어주는 모습", key: "warm" },
      { text: "농담으로 어색함을 풀어주는 모습", key: "funny" },
    ],
  },
  {
    text: "상대가 자기 일 이야기를 한다. 언제 매력을 느끼나요?",
    options: [
      { text: "자기 분야를 정확히 아는 모습", key: "cool" },
      { text: "남들이 안 가는 길을 택한 이야기", key: "free" },
    ],
  },
  {
    text: "연락 빈도에 대한 내 기준은?",
    options: [
      { text: "특별한 일 없어도 꾸준한 게 좋다", key: "steady" },
      { text: "작은 일도 챙겨 물어봐주면 좋다", key: "warm" },
    ],
  },
  {
    text: "상대가 실수했을 때 더 호감이 가는 반응은?",
    options: [
      { text: "웃으면서 넘길 줄 아는 여유", key: "funny" },
      { text: "바로 원인을 찾아 정리하는 태도", key: "cool" },
    ],
  },
  {
    text: "주말 데이트 제안 중 더 설레는 쪽은?",
    options: [
      { text: "\"일단 나가서 정하자\"", key: "free" },
      { text: "\"지난번에 가고 싶다던 데 예약했어\"", key: "steady" },
    ],
  },
  {
    text: "내가 힘들다고 했을 때 가장 고마운 반응은?",
    options: [
      { text: "말없이 곁에 있어주는 것", key: "warm" },
      { text: "현실적인 해결책을 같이 찾아주는 것", key: "cool" },
    ],
  },
  {
    text: "상대의 SNS에서 더 눈길이 가는 건?",
    options: [
      { text: "한결같이 이어지는 일상 기록", key: "steady" },
      { text: "예상 못한 곳에서 찍힌 사진", key: "free" },
    ],
  },
  {
    text: "오래 대화하고 싶어지는 사람은?",
    options: [
      { text: "자기 분야를 쉽게 설명해주는 사람", key: "cool" },
      { text: "같이 있으면 계속 웃게 되는 사람", key: "funny" },
    ],
  },
  {
    text: "상대에게 가장 듣고 싶은 말은?",
    options: [
      { text: "\"오늘 하루 어땠어?\"", key: "warm" },
      { text: "\"너랑 있으면 뭘 해도 재밌어\"", key: "free" },
    ],
  },
  {
    text: "10년 뒤에도 옆에 있었으면 하는 사람은?",
    options: [
      { text: "변하지 않고 자리를 지켜준 사람", key: "steady" },
      { text: "같이 있으면 늘 웃게 해준 사람", key: "funny" },
    ],
  },
];

const IDEALTYPE_APPEARANCES = 4;

const IDEALTYPE_RESULTS = [
  {
    id: "warm",
    emoji: "🫶",
    title: "다정한 사람에게 끌리는 타입",
    subtitle: "따뜻한 말과 챙김에 마음이 열리는 타입",
    summary: "상대의 배려와 따뜻함에 가장 크게 반응하는 타입이에요. 화려한 조건보다 나를 어떻게 대하는지를 먼저 봅니다. 오래 가는 관계를 만드는 데 유리한 기준이에요. 다만 다정함이 모두에게 같은 다정함인지는 한 번 확인해보세요. 나에게만 특별한지가 중요합니다.",
    traits: ["말투와 배려에 민감함", "조건보다 태도를 먼저 봄", "무심한 사람에게는 금방 마음이 식음"],
    color: "#EC4899",
    compat: {
      best: { id: "steady", reason: "다정함과 꾸준함이 만나면 가장 안정적인 관계가 돼요" },
      worst: { id: "free", reason: "자유로운 상대의 거리감이 서운함으로 쌓이기 쉬워요" },
    },
  },
  {
    id: "funny",
    emoji: "😂",
    title: "웃긴 사람에게 끌리는 타입",
    subtitle: "같이 웃는 시간이 기준인 타입",
    summary: "함께 있을 때 얼마나 즐거운지가 가장 중요한 타입이에요. 실제로 유머 코드가 맞는 관계는 갈등이 생겨도 회복이 빠릅니다. 웃음이 긴장을 풀어주니까요. 다만 진지한 이야기를 꺼낼 타이밍도 필요해요. 늘 웃기만 하면 깊은 대화가 미뤄집니다.",
    traits: ["유머 코드가 맞는지를 중요하게 봄", "같이 웃은 기억이 오래 남음", "지루한 대화를 견디기 어려워함"],
    color: "#F59E0B",
    compat: {
      best: { id: "free", reason: "둘 다 가벼운 리듬을 좋아해서 함께 있으면 편해요" },
      worst: { id: "cool", reason: "진지한 상대와 유머 코드가 어긋나면 벽이 느껴질 수 있어요" },
    },
  },
  {
    id: "cool",
    emoji: "💼",
    title: "능력 있는 사람에게 끌리는 타입",
    subtitle: "자기 일을 잘하는 모습에 반하는 타입",
    summary: "자기 분야에서 몰입하는 모습에 매력을 느끼는 타입이에요. 목표가 분명한 사람과 있을 때 나도 자극을 받습니다. 관계에서 성장을 중요하게 여기는 편이죠. 다만 '능력'을 관계의 기준으로만 두면, 상대가 흔들리는 시기에 마음도 같이 흔들릴 수 있어요.",
    traits: ["몰입하는 모습에 매력을 느낌", "대화의 밀도를 중요하게 봄", "상대에게 자극받는 관계를 선호함"],
    color: "#4F46E5",
    compat: {
      best: { id: "warm", reason: "일에 몰입한 나를 다정하게 챙겨주는 상대가 잘 맞아요" },
      worst: { id: "funny", reason: "가벼운 분위기가 나에겐 가끔 성의 없게 느껴질 수 있어요" },
    },
  },
  {
    id: "free",
    emoji: "🌊",
    title: "자유로운 사람에게 끌리는 타입",
    subtitle: "예측되지 않는 매력에 반응하는 타입",
    summary: "틀에 갇히지 않은 사람에게 끌리는 타입이에요. 뻔하지 않은 선택을 하는 상대에게서 에너지를 얻습니다. 함께 있으면 내 세계도 넓어지죠. 다만 자유로움과 무책임은 종이 한 장 차이예요. 설렘과 불안을 구분하는 눈을 같이 가지면 훨씬 안전해집니다.",
    traits: ["뻔한 걸 답답해함", "예측 안 되는 매력에 끌림", "구속받는 관계를 힘들어함"],
    color: "#0EA5E9",
    compat: {
      best: { id: "funny", reason: "가볍고 즐거운 리듬이 서로 잘 맞아떨어져요" },
      worst: { id: "steady", reason: "안정을 원하는 상대에게 내 변덕이 불안으로 읽혀요" },
    },
  },
  {
    id: "steady",
    emoji: "🌳",
    title: "한결같은 사람에게 끌리는 타입",
    subtitle: "변하지 않는 것에서 안심하는 타입",
    summary: "화려함보다 꾸준함에 마음이 놓이는 타입이에요. 실제로 관계 만족도를 가장 잘 예측하는 요인이 예측 가능성과 신뢰라는 점에서, 아주 현실적인 기준입니다. 다만 안정만 찾다 보면 시작 자체를 미루게 될 수 있어요. 확신은 대개 만나본 뒤에 생깁니다.",
    traits: ["꾸준함과 신뢰를 최우선으로 봄", "들쭉날쭉한 관계를 힘들어함", "관계를 길게 보고 시작함"],
    color: "#15803D",
    compat: {
      best: { id: "warm", reason: "따뜻하고 꾸준한 조합이라 서로 불안할 일이 없어요" },
      worst: { id: "free", reason: "예측 안 되는 상대의 리듬이 나에겐 불안으로 남아요" },
    },
  },
];

function getIdealTypeById(id) {
  return IDEALTYPE_RESULTS.find((r) => r.id === id);
}

function tallyToIdealTypeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["warm", "funny", "cool", "free", "steady"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getIdealTypeById(best);
}
