/* ============================================================
   알아볼괘 - 새해 계획 유형 테스트 (resolution-type)
   10문항, 보기 2개. 다섯 유형이 각각 4번씩 나옵니다. (life-genre 와 같은 방식)
   ============================================================ */
const RESOLUTIONTYPE_QUESTIONS = [
  { text: "1월 1일 아침, 나는?",
    options: [{ text: "일찍 일어나 운동화부터 신는다", key: "starter" }, { text: "평소처럼 일어나 어제 하던 걸 이어서 한다", key: "steady" }] },
  { text: "새해 목표가 생겼다. 먼저 하는 일은?",
    options: [{ text: "달별, 주별로 쪼개서 표로 만든다", key: "planner" }, { text: "단톡방에 \"나 올해 이거 한다\"고 올린다", key: "declare" }] },
  { text: "새 다이어리를 선물받았다",
    options: [{ text: "예쁘네. 서랍에 넣어 두고 필요할 때 쓴다", key: "free" }, { text: "그날 밤 첫 장부터 빽빽하게 채운다", key: "starter" }] },
  { text: "운동을 시작한다면?",
    options: [{ text: "매일 10분, 집 앞 걷기부터 한다", key: "steady" }, { text: "종목과 요일별 루틴부터 알아본다", key: "planner" }] },
  { text: "친구가 \"올해 목표 뭐야?\"라고 묻는다",
    options: [{ text: "기다렸다는 듯 세 가지를 말한다", key: "declare" }, { text: "\"음, 건강하게 사는 거?\" 하고 웃는다", key: "free" }] },
  { text: "사흘 만에 계획이 무너졌다",
    options: [{ text: "괜찮아, 다음 주 월요일에 다시 시작하면 돼", key: "starter" }, { text: "어디서 틀어졌는지 계획표를 고친다", key: "planner" }] },
  { text: "목표를 지키는 나만의 방법은?",
    options: [{ text: "아무에게도 말하지 않고 혼자 해 나간다", key: "steady" }, { text: "같이 할 사람을 구해서 서로 확인한다", key: "declare" }] },
  { text: "여행 전날 밤의 나는?",
    options: [{ text: "시간대별 일정표를 다시 확인한다", key: "planner" }, { text: "여권과 지갑만 챙기고 잔다", key: "free" }] },
  { text: "새로운 취미에 관심이 생겼다",
    options: [{ text: "\"같이 할 사람?\" 주변에 먼저 물어본다", key: "declare" }, { text: "그날 바로 장비부터 결제한다", key: "starter" }] },
  { text: "12월 31일, 올해를 돌아보면?",
    options: [{ text: "계획은 없었지만 재밌는 일이 많았다", key: "free" }, { text: "크게 한 건 없어도 매일 한 게 쌓였다", key: "steady" }] }
];

const RESOLUTIONTYPE_APPEARANCES = 4;

const RESOLUTIONTYPE_RESULTS = [
  {
    id: "starter",
    emoji: "🚀",
    title: "불꽃 스타터",
    subtitle: "시작만큼은 누구보다 빠른 사람",
    summary: "당신은 마음먹은 그날 바로 움직여요. 운동을 하기로 했으면 저녁에 벌써 운동화를 신고 있죠. 시작하는 힘은 다섯 유형 중 가장 세요. 다만 처음의 불꽃이 식으면 다른 새 목표로 눈이 가서, 끝까지 간 것보다 시작한 것이 더 많아요.",
    traits: ["결심한 날 바로 장비부터 사는 편", "첫 주의 열정은 아무도 못 따라옴", "방 한쪽에 한두 번 쓴 물건이 쌓여 있음"],
    color: "#C9381F",
    compat: {
      best: { id: "steady", reason: "꾸준러의 느린 걸음 옆에서 나도 멈추지 않는 법을 배워요" },
      worst: { id: "planner", reason: "나는 벌써 뛰고 있는데 상대는 아직 계획표를 그리고 있어 답답해요" },
    },
  },
  {
    id: "steady",
    emoji: "🐢",
    title: "조용한 꾸준러",
    subtitle: "티 내지 않고 매일 하는 사람",
    summary: "당신은 거창한 선언 없이 그냥 해요. 하루 10분, 한 쪽, 한 바퀴처럼 작게 정하고 날마다 이어 가죠. 눈에 띄는 변화는 느려도 일 년 뒤에 보면 가장 멀리 가 있는 사람이에요. 다만 너무 조용해서 본인도 자기가 얼마나 해냈는지 잘 몰라요.",
    traits: ["목표를 남에게 잘 말하지 않음", "하루 빠지면 다음 날 조용히 다시 함", "\"그냥 하던 거라서\"라고 답하는 편"],
    color: "#16A34A",
    compat: {
      best: { id: "declare", reason: "선언형이 내가 해 온 걸 대신 자랑해 주고, 나는 그 사람의 페이스를 잡아 줘요" },
      worst: { id: "starter", reason: "상대의 불같은 속도에 맞추다 보면 내 리듬이 흐트러져요" },
    },
  },
  {
    id: "planner",
    emoji: "📒",
    title: "계획표 장인",
    subtitle: "계획 세울 때가 제일 신나는 사람",
    summary: "당신에게 새해는 계획표를 새로 짜는 계절이에요. 목표를 달별, 주별로 나누고 색깔까지 입히면 벌써 반은 한 기분이 들죠. 일의 순서를 잡는 능력이 뛰어나요. 다만 계획이 한 번 어긋나면 표 전체가 무너진 것 같아 손을 놓기 쉬워요.",
    traits: ["새 다이어리와 펜을 고르는 데 진심", "할 일을 적고 줄 긋는 순간이 즐거움", "계획대로 안 되면 처음부터 다시 짜고 싶어짐"],
    color: "#2450D8",
    compat: {
      best: { id: "starter", reason: "내가 길을 그리면 스타터가 먼저 뛰어 줘요. 계획이 종이에서 나와요" },
      worst: { id: "free", reason: "나는 일정표가 있어야 편한데 상대는 그때 가서 보자고 해요" },
    },
  },
  {
    id: "declare",
    emoji: "📣",
    title: "선언형 도전자",
    subtitle: "말해 놓고 지키는 사람",
    summary: "당신은 목표가 생기면 주변에 먼저 알려요. 말해 놨으니 안 할 수 없게 스스로 판을 깔죠. 같이 할 사람을 모으는 데도 능해서 당신이 시작하면 주변도 덩달아 움직여요. 다만 혼자 남으면 힘이 빠지고, 지키지 못했을 때 민망함이 커요.",
    traits: ["\"나 이거 한다\"를 단톡방에 먼저 올림", "혼자 할 때보다 같이 할 때 훨씬 오래 감", "인증 사진을 올리는 게 동기 부여가 됨"],
    color: "#F59E0B",
    compat: {
      best: { id: "steady", reason: "꾸준러와 짝이 되면 매일 확인해 주는 든든한 동료가 생겨요" },
      worst: { id: "free", reason: "같이 하자고 불러도 상대가 가볍게 넘겨서 김이 빠져요" },
    },
  },
  {
    id: "free",
    emoji: "🍃",
    title: "무계획 자유인",
    subtitle: "계획 없이도 잘 굴러가는 사람",
    summary: "당신은 새해라고 특별히 뭘 정하지 않아요. 그때그때 끌리는 걸 하고, 기회가 오면 가볍게 올라타죠. 계획에 얽매이지 않아서 뜻밖의 재미를 잘 만나요. 다만 연말에 \"올해 뭐 했지\" 하는 허전함이 한 번씩 찾아와요.",
    traits: ["목표를 물으면 \"건강하게 사는 거\"라고 답함", "갑자기 생긴 약속에 잘 나감", "계획보다 그날 기분이 더 중요함"],
    color: "#7C3AED",
    compat: {
      best: { id: "planner", reason: "장인이 큰 틀을 잡아 주면 나는 그 안에서 자유롭게 놀 수 있어요" },
      worst: { id: "declare", reason: "상대가 같이 하자고 계속 권하면 숙제처럼 느껴져요" },
    },
  }
];

function getResolutionTypeById(id) {
  return RESOLUTIONTYPE_RESULTS.find((r) => r.id === id);
}

/* 동점이면 답 모양에 따라 골고루 하나를 정합니다. 같은 답이면 늘 같은 결과예요. */
function tallyToResolutionTypeResult(tally) {
  const order = ["starter", "steady", "planner", "declare", "free"];
  let bestCount = -1;
  order.forEach((key) => { bestCount = Math.max(bestCount, tally[key] || 0); });
  const tied = order.filter((key) => (tally[key] || 0) === bestCount);
  let mix = 7;
  order.forEach((key, i) => { mix = (mix * 31 + (tally[key] || 0) * (i + 3)) % 9973; });
  return getResolutionTypeById(tied[mix % tied.length]);
}

/* 결과 화면에 덧붙는 내용 (quiz-plus.js 가 카드로 그려요) */
window.QP_MORE = {
  "starter": {"m": ["1월 1일에 세 가지를 동시에 시작함", "\"이번엔 진짜\"를 진심으로 말함", "새로 산 운동복을 입고 찍은 사진이 여러 장 있음"], "t": "멈춘 적이 많다는 건 그만큼 많이 시작했다는 뜻이에요. 올해도 겁내지 말고 일단 시작하세요."},
  "steady": {"m": ["같은 시간에 같은 일을 하는 날이 많음", "기록 앱에 줄이 끊기지 않고 이어져 있음", "남들이 \"언제부터 했어?\" 하고 놀람"], "t": "매일 한 일은 사라지지 않아요. 올해는 그동안 쌓은 걸 한 번 꺼내서 스스로 칭찬해 주세요."},
  "planner": {"m": ["12월부터 내년 다이어리를 꾸미고 있음", "여행 일정표를 시간 단위로 만듦", "계획 세우다 지쳐서 정작 시작이 늦어진 적 있음"], "t": "잘 짠 계획은 이미 큰 자산이에요. 올해는 표의 절반만 지켜도 스스로 잘했다고 말해 주세요."},
  "declare": {"m": ["새해 목표를 SNS에 올린 적 있음", "같이 하던 친구가 그만두면 나도 흔들림", "주변에서 \"너 그거 아직 해?\"라는 질문을 받음"], "t": "당신의 선언은 주변 사람도 움직이게 해요. 못 지킨 약속이 있어도 다시 말하고 다시 하면 돼요."},
  "free": {"m": ["다이어리는 2월부터 빈칸임", "\"그때 가서 생각하자\"를 자주 말함", "계획 없이 떠난 여행이 제일 기억에 남음"], "t": "계획이 없어도 한 해는 잘 흘러갔어요. 올해는 단어 하나만 품고 편하게 가 보세요."}
};
