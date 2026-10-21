/* ============================================================
   내가 끌리는 사람 유형 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/ideal-type.json 을 고치세요
   ============================================================ */

const IDEALTYPE_QUESTIONS = [
  {
    text: "소개팅에서 회사 썰을 풀다가 말이 꼬였다. 더 끌리는 상대의 반응은?",
    options: [
      { text: "\"천천히 해요, 그래서요?\" 끝까지 들어줌", key: "warm" },
      { text: "\"방금 그거 개그 맞죠?\" 하고 빵 터짐", key: "funny" },
    ],
  },
  {
    text: "\"요즘 무슨 일 하세요?\" 하는 질문에 돌아온 대답. 더 끌리는 쪽은?",
    options: [
      { text: "자기 일 얘기할 때 눈빛이 달라지는 전문가", key: "cool" },
      { text: "\"회사 관두고 제주에서 서핑 가르쳐요\"", key: "free" },
    ],
  },
  {
    text: "썸 3주 차, 더 마음이 가는 카톡은?",
    options: [
      { text: "매일 밤 11시면 어김없이 오는 \"잘 자\"", key: "steady" },
      { text: "\"아까 머리 아프다던 거 괜찮아?\"", key: "warm" },
    ],
  },
  {
    text: "데이트 중 상대가 길을 잘못 들어 20분을 헤맸다. 더 끌리는 반응은?",
    options: [
      { text: "\"덕분에 동네 투어 했다\" 하고 웃는 사람", key: "funny" },
      { text: "지도 다시 보고 \"여기서 꺾었어야 했네\"", key: "cool" },
    ],
  },
  {
    text: "토요일 아침 9시, 더 설레는 카톡은?",
    options: [
      { text: "\"아무 버스나 타고 종점까지 가 볼래?\"", key: "free" },
      { text: "\"가고 싶다던 전시, 11시로 예약했어\"", key: "steady" },
    ],
  },
  {
    text: "퇴근길에 오늘 진짜 힘들었다고 보냈다. 더 고마운 반응은?",
    options: [
      { text: "아무 말 없이 떡볶이 들고 집 앞에 옴", key: "warm" },
      { text: "\"누가 그랬어? 상황 하나씩 정리해 봐\"", key: "cool" },
    ],
  },
  {
    text: "썸 상대 인스타를 몰래 내려 본다. 반하게 되는 피드는?",
    options: [
      { text: "3년째 매일 올라오는 아침 러닝 기록", key: "steady" },
      { text: "어제는 몽골 초원, 오늘은 동네 시장", key: "free" },
    ],
  },
  {
    text: "새벽 2시까지 통화가 안 끊기는 사람은?",
    options: [
      { text: "모르는 분야를 귀에 쏙쏙 들어오게 설명", key: "cool" },
      { text: "웃다가 배 아파서 끊을 타이밍을 놓침", key: "funny" },
    ],
  },
  {
    text: "기념일 편지 첫 줄로 받고 싶은 문장은?",
    options: [
      { text: "\"요즘 네가 좀 지쳐 보여서 걱정했어\"", key: "warm" },
      { text: "\"우리 다음 모험은 어디로 갈까?\"", key: "free" },
    ],
  },
  {
    text: "10년 뒤 결혼식, 친구가 축사에서 해 줬으면 하는 말은?",
    options: [
      { text: "\"한 번도 약속을 어긴 적 없는 사람입니다\"", key: "steady" },
      { text: "\"둘이 있으면 주변까지 시끄러운 커플\"", key: "funny" },
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
