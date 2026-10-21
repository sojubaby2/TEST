/* ============================================================
   나의 카톡 답장 유형 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/reply-style.json 을 고치세요
   ============================================================ */

const REPLYSTYLE_QUESTIONS = [
  {
    text: "친구가 \"주말에 뭐 해?\" 한 줄을 보냈다.",
    options: [
      { text: "알림 뜨자마자 3초 컷 \"아무것도 ㅋ\"", key: "speed" },
      { text: "주말 계획을 서론·본론·결론으로 답장", key: "novel" },
    ],
  },
  {
    text: "친구가 \"나 오늘 팀장한테 엄청 깨졌어\"라고 보냈다.",
    options: [
      { text: "일단 엉엉 우는 이모티콘 3연발", key: "emoji" },
      { text: "위로 문장 다듬다가 다음 날이 됨", key: "ghost" },
    ],
  },
  {
    text: "엄마가 내 카톡 대화창을 슬쩍 봤다. 엄마의 한마디는?",
    options: [
      { text: "\"너는 친구한테도 'ㅇㅇ'만 하니?\"", key: "short" },
      { text: "\"읽자마자 답하네, 폰을 손에 들고 사니?\"", key: "speed" },
    ],
  },
  {
    text: "친구 셋이랑 여행 계획을 정해야 한다. 내 메시지는?",
    options: [
      { text: "날짜, 숙소, 예산을 번호 매겨서 한 번에", key: "novel" },
      { text: "\"가자!!\" + 비행기 이모티콘 + 신난 짤", key: "emoji" },
    ],
  },
  {
    text: "일주일 전에 온 카톡에 아직 답을 안 했다. 이유는?",
    options: [
      { text: "각 잡고 답하려다 일주일이 지났음", key: "ghost" },
      { text: "미리보기로 다 봤고 딱히 할 말이 없었음", key: "short" },
    ],
  },
  {
    text: "단톡방에 \"오늘 회식 장소 어디야?\"가 올라왔다.",
    options: [
      { text: "누구보다 빠르게 지도 링크 투척", key: "speed" },
      { text: "고기 굽는 짤로 일단 분위기부터 띄움", key: "emoji" },
    ],
  },
  {
    text: "1년 만에 연락 온 친구가 \"언제 밥 한번 먹자\"라고 했다.",
    options: [
      { text: "가능한 날짜 세 개와 식당 후보까지 정리", key: "novel" },
      { text: "\"그래 좋아!\" 하고 그 방은 다시 안 열림", key: "ghost" },
    ],
  },
  {
    text: "친구가 맛집 후기를 스크롤 세 번 분량으로 보냈다.",
    options: [
      { text: "\"ㄱㄱ\"", key: "short" },
      { text: "침 흘리는 이모티콘 하나로 감상 끝", key: "emoji" },
    ],
  },
  {
    text: "새벽 1시 반, 친구가 \"아 배고파\"라고 보냈다.",
    options: [
      { text: "바로 \"ㅇㅇ 나도\" 하고 야식 토론 시작", key: "speed" },
      { text: "\"아침에 답해야지\" 하다가 점심에 답함", key: "ghost" },
    ],
  },
  {
    text: "알림을 보자마자 한숨부터 나오는 메시지는?",
    options: [
      { text: "\"자니?\" 하고 용건 없는 침묵", key: "novel" },
      { text: "\"할 말 있는데... 이따 말할게\"", key: "short" },
    ],
  },
];

const REPLYSTYLE_APPEARANCES = 4;

const REPLYSTYLE_RESULTS = [
  {
    id: "speed",
    emoji: "⚡",
    title: "초스피드 답장러",
    subtitle: "읽는 즉시 손가락이 먼저 나가는 타입",
    summary: "알림이 뜨면 거의 반사적으로 답하는 타입이에요. 상대 입장에서는 기다릴 일이 없으니 대화가 편하죠. 다만 모두가 나처럼 빠르진 않다는 걸 기억해주세요. 답장이 늦는 사람은 나를 무시하는 게 아니라 그냥 속도가 다른 겁니다.",
    traits: ["읽으면 바로 답하는 편", "대화가 끊기는 걸 답답해함", "상대 답장이 늦으면 은근히 신경 쓰임"],
    color: "#F59E0B",
    compat: {
      best: { id: "emoji", reason: "둘 다 반응이 빨라서 대화가 끊길 틈이 없어요" },
      worst: { id: "ghost", reason: "내 속도와 상대 속도가 가장 크게 어긋나는 조합이에요" },
    },
  },
  {
    id: "novel",
    emoji: "📜",
    title: "장문 소설가",
    subtitle: "한 번 보낼 때 제대로 보내는 타입",
    summary: "메시지를 나눠 보내기보다 정리해서 한 번에 보내는 타입이에요. 오해가 생길 여지를 줄이려는 성향이라 중요한 이야기를 할 때 특히 든든합니다. 다만 상대가 단답형이면 혼자 길게 쓴 것 같아 허전할 수 있어요. 길이가 마음의 크기는 아니랍니다.",
    traits: ["할 말을 정리해서 한 번에 보냄", "오해가 생기는 걸 싫어함", "단답이 돌아오면 허전함을 느낌"],
    color: "#4F46E5",
    compat: {
      best: { id: "ghost", reason: "느리게 오더라도 상대가 내 긴 글을 제대로 읽어주는 편이에요" },
      worst: { id: "short", reason: "정성껏 쓴 글에 \"ㅇㅇ\"이 돌아오면 서운해지기 쉬워요" },
    },
  },
  {
    id: "emoji",
    emoji: "🐥",
    title: "이모티콘 장인",
    subtitle: "말보다 짤이 빠른 타입",
    summary: "글자보다 이모티콘으로 감정을 전하는 게 편한 타입이에요. 덕분에 딱딱해질 수 있는 대화도 부드럽게 풀립니다. 표현이 풍부해 보여서 대화 상대로 인기가 많죠. 다만 진지한 이야기에서는 이모티콘 없이 말로만 해야 할 때도 있어요.",
    traits: ["감정을 이모티콘으로 표현함", "분위기를 부드럽게 만드는 데 능함", "이모티콘 구매에 돈을 아끼지 않음"],
    color: "#EC4899",
    compat: {
      best: { id: "speed", reason: "빠른 반응끼리 만나 대화 리듬이 잘 맞아요" },
      worst: { id: "short", reason: "내 반응이 상대에겐 과하게 느껴질 수 있어요" },
    },
  },
  {
    id: "ghost",
    emoji: "🌊",
    title: "읽씹 잠수함",
    subtitle: "악의는 없는데 답장이 사라지는 타입",
    summary: "제대로 답하려고 미루다가 그대로 묻혀버리는 타입이에요. 무시하려는 게 아니라 오히려 신경을 쓰다 생기는 일이라는 게 포인트입니다. 다만 상대는 그 사정을 모르니, \"나중에 제대로 답할게\" 한마디만 보내두면 오해가 확 줄어들어요.",
    traits: ["제대로 답하려다 타이밍을 놓침", "알림을 쌓아두는 편", "악의 없이 오해를 사는 경우가 많음"],
    color: "#0E7490",
    compat: {
      best: { id: "novel", reason: "상대가 한 번에 정리해서 보내주니 답하기가 훨씬 수월해요" },
      worst: { id: "speed", reason: "빠른 답장을 기대하는 상대에겐 내 침묵이 크게 느껴져요" },
    },
  },
  {
    id: "short",
    emoji: "🫥",
    title: "ㅇㅇ 단답러",
    subtitle: "필요한 말만 하는 효율 100% 타입",
    summary: "말을 아끼는 게 무심함이 아니라 효율이라고 생각하는 타입이에요. 용건이 분명하고 군더더기가 없어 일 얘기에서는 오히려 편합니다. 다만 가까운 사이에서는 짧은 답이 차갑게 읽힐 수 있어요. 끝에 한 글자만 덧붙여도 온도가 확 달라집니다.",
    traits: ["용건만 간단히가 기본값", "불필요한 대화를 늘리지 않음", "무심하다는 오해를 종종 받음"],
    color: "#64748B",
    compat: {
      best: { id: "ghost", reason: "서로 답장 속도에 부담을 주지 않아 편한 조합이에요" },
      worst: { id: "novel", reason: "상대의 긴 메시지에 내 단답이 서운함으로 쌓일 수 있어요" },
    },
  },
];

function getReplyStyleById(id) {
  return REPLYSTYLE_RESULTS.find((r) => r.id === id);
}

function tallyToReplyStyleResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["speed", "novel", "emoji", "ghost", "short"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getReplyStyleById(best);
}
