/* ============================================================
   나는 어떤 여행자? - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/travel-type.json 을 고치세요
   ============================================================ */

const TRAVELTYPE_QUESTIONS = [
  {
    text: "여행이 확정됐다. 제일 먼저 하는 일은?",
    options: [
      { text: "일정표부터 만든다. 시간 단위로", key: "planner" },
      { text: "현지 맛집부터 검색한다", key: "foodie" },
    ],
  },
  {
    text: "숙소를 고를 때 가장 중요한 건?",
    options: [
      { text: "조식과 수영장. 숙소 자체가 목적", key: "hotel" },
      { text: "잠만 자면 되니까 위치와 가격", key: "walker" },
    ],
  },
  {
    text: "여행지에서 제일 많이 하는 행동은?",
    options: [
      { text: "예쁜 장면이 보이면 일단 카메라부터", key: "camera" },
      { text: "다음 일정까지 남은 시간을 계산한다", key: "planner" },
    ],
  },
  {
    text: "맛집 대기가 90분이라고 한다.",
    options: [
      { text: "기다린다. 여기 오려고 온 거니까", key: "foodie" },
      { text: "숙소 라운지가 더 편할 것 같은데", key: "hotel" },
    ],
  },
  {
    text: "하루에 걷는 거리는?",
    options: [
      { text: "2만 보 기본. 다리는 나중에 생각", key: "walker" },
      { text: "좋은 장소 한 곳에서 오래 머문다", key: "camera" },
    ],
  },
  {
    text: "비가 와서 일정이 틀어졌다. 나는?",
    options: [
      { text: "미리 짜둔 대안 일정을 꺼낸다", key: "planner" },
      { text: "실내 맛집 리스트를 연다", key: "foodie" },
    ],
  },
  {
    text: "여행에서 돈을 제일 많이 쓰는 곳은?",
    options: [
      { text: "숙소. 좋은 데서 자야 여행이 산다", key: "hotel" },
      { text: "교통비와 입장료. 많이 볼수록 이득", key: "walker" },
    ],
  },
  {
    text: "여행이 끝나고 남는 건?",
    options: [
      { text: "정리된 사진 폴더와 영상", key: "camera" },
      { text: "먹었던 음식 사진과 가게 이름", key: "foodie" },
    ],
  },
  {
    text: "같이 간 친구가 \"오늘 뭐 할까?\"라고 묻는다.",
    options: [
      { text: "\"10시에 여기, 12시에 여기\" 이미 준비됨", key: "planner" },
      { text: "\"일단 나가서 생각하자\"", key: "hotel" },
    ],
  },
  {
    text: "다음 여행지를 고르는 기준은?",
    options: [
      { text: "걸어 다니기 좋은 골목이 많은 곳", key: "walker" },
      { text: "사진이 예쁘게 나오는 곳", key: "camera" },
    ],
  },
];

const TRAVELTYPE_APPEARANCES = 4;

const TRAVELTYPE_RESULTS = [
  {
    id: "planner",
    emoji: "📋",
    title: "엑셀 설계자",
    subtitle: "출발 전에 여행이 이미 끝나 있는 타입",
    summary: "동선과 시간을 미리 짜두고 움직이는 타입이에요. 덕분에 놓치는 게 없고 헤매는 시간도 적습니다. 같이 가는 사람 입장에서는 정말 편하죠. 다만 계획에 없던 골목에서 인생 장면을 만나기도 하니, 하루에 한 칸은 비워두면 여행이 훨씬 넓어져요.",
    traits: ["동선과 예산을 미리 계산함", "헤매는 시간을 아까워함", "돌발 상황에도 대안이 준비되어 있음"],
    color: "#2563EB",
    compat: {
      best: { id: "walker", reason: "잘 짠 동선을 지치지 않고 따라와주는 최고의 짝이에요" },
      worst: { id: "hotel", reason: "\"그냥 숙소에서 쉬자\"는 말에 서로 답답해질 수 있어요" },
    },
  },
  {
    id: "foodie",
    emoji: "🍜",
    title: "맛집 순례자",
    subtitle: "여행지는 식당 사이의 이동 구간인 타입",
    summary: "여행의 목적이 분명한 타입이에요. 뭘 먹을지부터 정하고 나머지 일정을 그에 맞춥니다. 덕분에 실패하는 끼니가 거의 없고, 여행 후 제일 또렷하게 남는 기억도 맛이죠. 다만 대기 줄에 쓰는 시간이 만만치 않으니 하루에 한 곳만 '꼭'으로 정해두면 여유가 생겨요.",
    traits: ["식사 시간을 기준으로 일정을 짬", "대기 줄을 기꺼이 감수함", "여행 기억이 맛으로 정리됨"],
    color: "#EA580C",
    compat: {
      best: { id: "camera", reason: "음식 사진을 제대로 남겨주는 상대라 서로 만족도가 높아요" },
      worst: { id: "walker", reason: "쉴 새 없이 걷자는 상대와 식사 페이스가 어긋나기 쉬워요" },
    },
  },
  {
    id: "hotel",
    emoji: "🛎️",
    title: "호캉스파",
    subtitle: "숙소가 곧 목적지인 타입",
    summary: "여행을 '회복'으로 정의하는 타입이에요. 무리해서 많이 보는 것보다 좋은 공간에서 푹 쉬는 쪽을 택합니다. 사실 이게 여행 후 피로도가 가장 낮은 방식이기도 해요. 다만 함께 간 사람이 밖을 돌고 싶어 할 수 있으니, 오전은 따로 오후는 같이 같은 합의가 잘 통합니다.",
    traits: ["숙소 퀄리티에 투자함", "빡빡한 일정을 선호하지 않음", "여행 후 피로가 적은 편"],
    color: "#7C3AED",
    compat: {
      best: { id: "camera", reason: "한 곳에 오래 머무는 걸 좋아해서 속도가 잘 맞아요" },
      worst: { id: "planner", reason: "분 단위 일정이 나에겐 또 다른 노동처럼 느껴질 수 있어요" },
    },
  },
  {
    id: "walker",
    emoji: "🥾",
    title: "뚜벅이 탐험가",
    subtitle: "발바닥으로 도시를 읽는 타입",
    summary: "걷다가 우연히 만나는 장면을 가장 좋아하는 타입이에요. 지도 없이 골목으로 들어가 보는 걸 두려워하지 않습니다. 같은 도시를 가도 남들이 못 본 걸 제일 많이 보고 오죠. 다만 체력 관리가 관건이라, 중간에 앉는 시간을 일정에 넣어두면 끝까지 즐길 수 있어요.",
    traits: ["하루 이동량이 압도적", "골목과 우연한 발견을 좋아함", "택시보다 걷기를 택함"],
    color: "#15803D",
    compat: {
      best: { id: "planner", reason: "동선을 잘 짜주는 상대를 만나면 체력을 훨씬 아낄 수 있어요" },
      worst: { id: "hotel", reason: "밖으로 나가려는 나와 쉬려는 상대가 자주 부딪혀요" },
    },
  },
  {
    id: "camera",
    emoji: "📷",
    title: "사진 수집가",
    subtitle: "기록으로 여행을 완성하는 타입",
    summary: "좋은 장면을 놓치지 않고 담아두는 타입이에요. 여행이 끝난 뒤에도 사진을 정리하며 한 번 더 여행합니다. 덕분에 일행 모두가 인생 사진을 건져 가죠. 다만 렌즈 너머로만 보다 보면 정작 그 순간의 공기를 놓칠 수 있으니, 한 곳에서는 카메라를 내려놓고 그냥 보세요.",
    traits: ["좋은 장면을 놓치지 않음", "한 장소에 오래 머무는 편", "일행의 인생 사진을 책임짐"],
    color: "#DB2777",
    compat: {
      best: { id: "foodie", reason: "찍을 거리가 확실한 코스라 서로 원하는 걸 다 얻어요" },
      worst: { id: "planner", reason: "\"사진 그만 찍고 가자\"는 말에 아쉬움이 쌓일 수 있어요" },
    },
  },
];

function getTravelTypeById(id) {
  return TRAVELTYPE_RESULTS.find((r) => r.id === id);
}

function tallyToTravelTypeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["planner", "foodie", "hotel", "walker", "camera"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getTravelTypeById(best);
}
