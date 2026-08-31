/* ============================================================
   사랑의 언어 테스트 - 문항 및 결과 데이터
   5가지 사랑의 언어(인정하는 말/함께하는 시간/선물/봉사/스킨십) 중 2개씩
   짝지은 10개 문항(5C2 = 10, 각 언어가 정확히 4번씩 등장)으로 구성.
   ============================================================ */

const LOVELANG_QUESTIONS = [
  {
    text: "연인과 있을 때 나에게 더 힘이 되는 건?",
    options: [
      { text: "'고마워', '사랑해' 같은 말 한마디", lang: "words" },
      { text: "바쁜 와중에도 시간 내서 함께 있어주는 것", lang: "time" },
    ],
  },
  {
    text: "기념일에 더 감동받는 건?",
    options: [
      { text: "진심 담긴 편지나 축하 메시지", lang: "words" },
      { text: "센스있게 준비한 선물", lang: "gifts" },
    ],
  },
  {
    text: "힘든 하루를 보냈을 때 위로가 되는 건?",
    options: [
      { text: "괜찮다고, 고생했다고 말해주는 것", lang: "words" },
      { text: "말없이 집안일을 대신 해주는 것", lang: "acts" },
    ],
  },
  {
    text: "애정을 느낄 때는?",
    options: [
      { text: "예쁘다, 멋지다는 말을 들을 때", lang: "words" },
      { text: "꼭 안아주거나 손을 잡아줄 때", lang: "touch" },
    ],
  },
  {
    text: "데이트할 때 더 중요한 건?",
    options: [
      { text: "무엇을 하든 함께 있는 시간 자체", lang: "time" },
      { text: "정성스럽게 준비한 선물이나 이벤트", lang: "gifts" },
    ],
  },
  {
    text: "연인이 나를 위해 이렇게 해줬으면 하는 건?",
    options: [
      { text: "다른 일 제쳐두고 온전히 나에게 집중해주는 것", lang: "time" },
      { text: "내가 힘든 일을 대신 처리해주는 것", lang: "acts" },
    ],
  },
  {
    text: "가장 편안하고 행복한 순간은?",
    options: [
      { text: "아무것도 안 해도 같이 있는 시간", lang: "time" },
      { text: "옆에 붙어서 스킨십하는 시간", lang: "touch" },
    ],
  },
  {
    text: "사랑을 표현하는 방식 중 더 끌리는 건?",
    options: [
      { text: "특별한 날 준비하는 선물", lang: "gifts" },
      { text: "귀찮은 일을 대신 해주는 배려", lang: "acts" },
    ],
  },
  {
    text: "사랑받는다고 느낄 때는?",
    options: [
      { text: "작은 선물을 받을 때", lang: "gifts" },
      { text: "다정하게 스킨십을 해줄 때", lang: "touch" },
    ],
  },
  {
    text: "지치고 피곤한 날 가장 바라는 건?",
    options: [
      { text: "말없이 내 할 일을 대신 해주는 것", lang: "acts" },
      { text: "꼭 안아주며 다독여주는 것", lang: "touch" },
    ],
  },
];

// 위 10문항 구조상 각 언어는 정확히 4번씩 선택지로 등장함 (5C2 조합)
const LOVELANG_APPEARANCES = 4;

const LOVELANG_RESULTS = [
  {
    id: "words",
    emoji: "💬",
    title: "말 한마디형",
    subtitle: "다정한 말 한마디에 마음이 녹는 타입",
    summary:
      "다정한 말 한마디에 하루가 달라지는 타입이에요. '고마워', '사랑해' 같은 말을 직접 들을 때 사랑받고 있다는 확신이 들고, 반대로 아무 말이 없으면 서운함을 느끼기 쉬워요. 표현에 서툰 상대에게는 먼저 다가가 어떤 말이 힘이 되는지 알려주는 것도 좋은 방법이에요.",
    traits: ["칭찬과 인정에 약함", "말로 하는 표현을 중요하게 생각함", "무심한 말 한마디에 상처받기도 함"],
    color: "#3B82F6",
    compat: {
      best: { id: "touch", reason: "말로 표현하는 사랑과 따뜻한 스킨십이 만나면 애정표현이 풍부한 커플이 돼요." },
      worst: { id: "acts", reason: "행동이 앞서는 상대라 말로 확인받고 싶은 마음이 서운함으로 쌓일 수 있어요." },
    },
  },
  {
    id: "time",
    emoji: "⏰",
    title: "함께하는 시간형",
    subtitle: "무엇을 하든 같이 있는 시간이 가장 소중한 타입",
    summary:
      "무엇을 하든 '함께'라는 사실 자체가 가장 큰 사랑의 증거인 타입이에요. 거창한 이벤트보다 온전히 집중해서 같이 보내는 시간을 더 소중하게 여기고, 바쁘다는 이유로 계속 미뤄지면 마음이 멀어진다고 느껴요.",
    traits: ["온전한 집중과 함께하는 시간이 중요", "소소한 일상 데이트를 선호", "약속이 자주 미뤄지면 서운함을 느낌"],
    color: "#8B5CF6",
    compat: {
      best: { id: "acts", reason: "함께하는 시간과 실질적인 챙김이 더해져 든든하고 편안한 관계가 돼요." },
      worst: { id: "gifts", reason: "선물보다 함께하는 시간이 중요한데, 이벤트에만 신경쓰는 상대라면 아쉬움이 남을 수 있어요." },
    },
  },
  {
    id: "gifts",
    emoji: "🎁",
    title: "선물형",
    subtitle: "정성 담긴 선물에 사랑을 느끼는 타입",
    summary:
      "정성이 담긴 선물 하나에 사랑받는 기분을 느끼는 타입이에요. 선물의 가격보다 '나를 생각하며 골랐다'는 마음 자체가 중요하고, 기념일이나 특별한 날을 잘 챙겨주는 상대에게 큰 감동을 느껴요.",
    traits: ["정성이 담긴 선물에 감동함", "기념일을 잘 챙기는 걸 중요하게 여김", "깜짝 이벤트를 좋아함"],
    color: "#F59E0B",
    compat: {
      best: { id: "words", reason: "정성스런 선물과 다정한 말이 만나 사랑을 확실하게 느낄 수 있는 조합이에요." },
      worst: { id: "time", reason: "선물보다 그냥 같이 있는 시간을 더 중요하게 여기는 상대라 서운할 수 있어요." },
    },
  },
  {
    id: "acts",
    emoji: "🤝",
    title: "헌신형",
    subtitle: "말보다 행동으로 챙겨주는 걸 좋아하는 타입",
    summary:
      "말보다 행동으로 보여주는 사랑을 더 신뢰하는 타입이에요. 힘들 때 옆에서 대신 해결해주거나 챙겨주는 실질적인 배려에서 사랑을 느끼고, 입으로만 하는 약속보다는 직접 움직여주는 모습에 더 마음이 움직여요.",
    traits: ["행동으로 보여주는 사랑을 신뢰함", "실질적인 도움과 배려를 중요하게 여김", "말뿐인 약속에는 시큰둥함"],
    color: "#10B981",
    compat: {
      best: { id: "time", reason: "함께 시간을 보내주면서 실질적으로 챙겨주는 상대와 찰떡궁합이에요." },
      worst: { id: "touch", reason: "스킨십으로 애정을 표현하는 상대에게는 당신의 헌신이 잘 안 와닿을 수 있어요." },
    },
  },
  {
    id: "touch",
    emoji: "🤗",
    title: "스킨십형",
    subtitle: "따뜻한 스킨십으로 사랑을 확인하는 타입",
    summary:
      "따뜻한 스킨십으로 사랑을 확인하는 타입이에요. 손을 잡거나 꼭 안아주는 것만으로도 마음이 편안해지고, 스킨십이 부족하면 사랑받지 못한다는 불안을 느끼기도 해요. 스킨십에 서툰 상대라면 조금씩 자연스럽게 늘려가 보세요.",
    traits: ["스킨십으로 안정감을 느낌", "가까운 거리와 접촉을 편안해함", "스킨십이 부족하면 불안해질 수 있음"],
    color: "#EC4899",
    compat: {
      best: { id: "words", reason: "다정한 말과 따뜻한 스킨십이 함께라면 사랑이 풍부하게 느껴지는 조합이에요." },
      worst: { id: "gifts", reason: "스킨십보다 선물에 집중하는 상대라 스킨십 욕구가 채워지지 않을 수 있어요." },
    },
  },
];

function tallyToLoveLangResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["words", "time", "gifts", "acts", "touch"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getLoveLangById(best);
}

function getLoveLangById(id) {
  return LOVELANG_RESULTS.find((r) => r.id === id);
}
