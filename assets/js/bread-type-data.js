/* ============================================================
   알아볼괘 - 나는 어떤 빵일까? (bread-type)
   10문항, 보기 2개. 다섯 유형이 각각 4번씩 나옵니다. (life-genre 와 같은 방식)
   ============================================================ */
const BREADTYPE_QUESTIONS = [
  { text: "처음 만난 사람들과의 자리, 나는?",
    options: [{ text: "누구와도 무난하게 잘 어울린다", key: "sikppang" }, { text: "분위기를 살피며 조심스럽게 말을 건다", key: "croissant" }] },
  { text: "요즘 뜨는 가게가 생겼다",
    options: [{ text: "줄을 서더라도 이번 주에 가 본다", key: "saltbread" }, { text: "늘 가던 단골집이 더 편하다", key: "danpat" }] },
  { text: "친구가 약속에 30분 늦었다",
    options: [{ text: "\"다음엔 미리 말해 줘\" 하고 분명히 말한다", key: "baguette" }, { text: "\"괜찮아, 나도 방금 왔어\" 하고 넘긴다", key: "sikppang" }] },
  { text: "주말에 더 끌리는 계획은?",
    options: [{ text: "조용한 카페에서 혼자 보내는 시간", key: "croissant" }, { text: "새로 생긴 곳에서 친구들과 사진 찍기", key: "saltbread" }] },
  { text: "후배가 실수를 했다",
    options: [{ text: "\"밥은 먹었어?\" 일단 마음부터 챙긴다", key: "danpat" }, { text: "어디가 틀렸는지 정확히 짚어 준다", key: "baguette" }] },
  { text: "옷을 살 때 나는?",
    options: [{ text: "어디에나 맞는 기본 아이템을 고른다", key: "sikppang" }, { text: "요즘 많이 입는 스타일을 골라 본다", key: "saltbread" }] },
  { text: "고마운 마음을 전할 때",
    options: [{ text: "정성 들인 편지나 메시지를 쓴다", key: "croissant" }, { text: "먹을 걸 한가득 싸서 안겨 준다", key: "danpat" }] },
  { text: "단톡방에서 나는?",
    options: [{ text: "새 소식과 재밌는 걸 제일 먼저 올린다", key: "saltbread" }, { text: "필요한 말만 짧고 정확하게 한다", key: "baguette" }] },
  { text: "오랜만에 친구에게 연락이 왔다",
    options: [{ text: "\"야, 얼굴 보자!\" 바로 날짜를 잡는다", key: "danpat" }, { text: "반갑게 답하고 편할 때 보자고 한다", key: "sikppang" }] },
  { text: "누군가 내 일을 지적했다",
    options: [{ text: "맞는 말이면 받아들이고, 아니면 반박한다", key: "baguette" }, { text: "괜찮은 척하지만 집에 와서 계속 생각난다", key: "croissant" }] }
];

const BREADTYPE_APPEARANCES = 4;

const BREADTYPE_RESULTS = [
  {
    id: "sikppang",
    emoji: "🍞",
    title: "식빵",
    subtitle: "무엇과도 잘 어울리는 편안한 사람",
    summary: "당신은 어디에 놓아도 어색하지 않은 사람이에요. 처음 보는 사람과도 무난하게 지내고, 모난 데가 없어 다들 편하게 느끼죠. 잼을 바르든 햄을 올리든 받아 주는 식빵처럼 상대에게 잘 맞춰 줘요. 다만 늘 맞춰 주다 보니 내 취향이 뭔지 헷갈릴 때가 있어요.",
    traits: ["\"아무거나 괜찮아\"를 진심으로 말함", "누구와 짝이 돼도 큰 문제 없이 지냄", "싫은 티를 잘 안 내서 속을 모르겠다는 말을 들음"],
    color: "#B45309",
    compat: {
      best: { id: "danpat", reason: "정 많은 단팥빵이 내 속마음을 먼저 물어봐 줘요" },
      worst: { id: "baguette", reason: "상대가 딱 잘라 말하면 나는 맞춰 주다 지쳐요" },
    },
  },
  {
    id: "croissant",
    emoji: "🥐",
    title: "크루아상",
    subtitle: "겹겹이 섬세한 감성의 소유자",
    summary: "당신은 결이 고운 사람이에요. 남들이 지나치는 작은 차이를 알아채고, 말 한마디에도 여러 겹의 뜻을 읽죠. 그 섬세함 덕분에 글, 선물, 배려에 정성이 묻어나요. 다만 그만큼 잘 부서져서, 무심코 들은 말을 며칠씩 곱씹기도 해요.",
    traits: ["분위기와 표정 변화를 금방 알아챔", "취향이 뚜렷하고 디테일에 강함", "상처받아도 그 자리에서는 티를 안 냄"],
    color: "#F59E0B",
    compat: {
      best: { id: "sikppang", reason: "편안한 식빵 옆에서는 긴장을 풀고 쉴 수 있어요" },
      worst: { id: "baguette", reason: "상대의 직설적인 한마디가 며칠씩 마음에 남아요" },
    },
  },
  {
    id: "saltbread",
    emoji: "🧈",
    title: "소금빵",
    subtitle: "요즘 뭐가 좋은지 제일 먼저 아는 사람",
    summary: "당신은 새로운 걸 빨리 알아보고 빨리 즐겨요. 뜨는 가게, 유행하는 말, 재밌는 영상을 제일 먼저 가져오는 사람이죠. 겉은 바삭하게 쿨하고 속은 촉촉하게 다정해서 주변에 사람이 많아요. 다만 유행이 지나가듯 관심도 금방 옮겨 가서 진득하게 하나를 붙잡기는 어려워해요.",
    traits: ["새로 생긴 곳은 일단 가 봐야 함", "단톡방에 재밌는 걸 제일 먼저 올림", "처음 본 사람과도 금방 친해짐"],
    color: "#2450D8",
    compat: {
      best: { id: "croissant", reason: "크루아상의 취향과 내 정보력이 만나면 좋은 곳만 골라 다녀요" },
      worst: { id: "danpat", reason: "나는 새 가게에 가고 싶은데 상대는 늘 가던 데만 가자고 해요" },
    },
  },
  {
    id: "danpat",
    emoji: "🫘",
    title: "단팥빵",
    subtitle: "속이 꽉 찬 정 많은 오랜 친구",
    summary: "당신은 겉은 수수해도 속이 꽉 찬 사람이에요. 한번 정을 주면 오래가고, 사람을 챙길 때는 먹을 것부터 떠올리죠. 유행은 잘 몰라도 곁에 있으면 든든해요. 다만 익숙한 것만 찾다 보니 새로운 사람이나 장소 앞에서는 발이 잘 안 떨어져요.",
    traits: ["십 년 넘은 친구와 단골집이 있음", "\"밥은 먹었어?\"가 안부 인사", "새로운 것보다 늘 하던 게 편함"],
    color: "#C9381F",
    compat: {
      best: { id: "sikppang", reason: "편안한 식빵과는 말없이 있어도 어색하지 않아요" },
      worst: { id: "saltbread", reason: "상대의 빠른 유행 이야기를 따라가다 보면 숨이 차요" },
    },
  },
  {
    id: "baguette",
    emoji: "🥖",
    title: "바게트",
    subtitle: "겉은 단단하고 속은 부드러운 원칙주의자",
    summary: "당신은 기준이 분명한 사람이에요. 옳고 그름을 흐리지 않고, 해야 할 말은 정확하게 하죠. 처음에는 딱딱해 보여서 다가가기 어렵다는 말을 듣지만, 가까워지면 속이 얼마나 부드러운지 알게 돼요. 다만 겉껍질이 단단해서 그 속을 보여 주기까지 시간이 걸려요.",
    traits: ["약속 시간과 맡은 일은 반드시 지킴", "돌려 말하는 걸 잘 못함", "친해지면 누구보다 잘 챙겨 줌"],
    color: "#16A34A",
    compat: {
      best: { id: "saltbread", reason: "소금빵의 붙임성이 내 딱딱한 첫인상을 풀어 줘요" },
      worst: { id: "croissant", reason: "나는 사실을 말했을 뿐인데 상대가 상처받아서 당황스러워요" },
    },
  }
];

function getBreadTypeById(id) {
  return BREADTYPE_RESULTS.find((r) => r.id === id);
}

/* 동점이면 답 모양에 따라 골고루 하나를 정합니다. 같은 답이면 늘 같은 결과예요. */
function tallyToBreadTypeResult(tally) {
  const order = ["sikppang", "croissant", "saltbread", "danpat", "baguette"];
  let bestCount = -1;
  order.forEach((key) => { bestCount = Math.max(bestCount, tally[key] || 0); });
  const tied = order.filter((key) => (tally[key] || 0) === bestCount);
  let mix = 7;
  order.forEach((key, i) => { mix = (mix * 31 + (tally[key] || 0) * (i + 3)) % 9973; });
  return getBreadTypeById(tied[mix % tied.length]);
}

/* 결과 화면에 덧붙는 내용 (quiz-plus.js 가 카드로 그려요) */
window.QP_MORE = {
  "sikppang": {"m": ["메뉴를 정할 때 \"난 다 좋아\"라고 답함", "어느 무리에 껴도 금방 섞임", "집에 와서야 \"사실 나 그거 별로였는데\" 생각함"], "t": "누구와도 잘 지내는 건 큰 재능이에요. 오늘은 당신이 먹고 싶은 걸 먼저 말해 보세요."},
  "croissant": {"m": ["메시지를 보내기 전에 여러 번 고쳐 씀", "카페 음악과 조명이 마음에 안 들면 집중이 안 됨", "지나간 대화를 자기 전에 다시 떠올림"], "t": "당신의 섬세함은 누군가에게 큰 위로가 돼요. 오늘은 스스로에게도 그만큼 부드럽게 대해 주세요."},
  "saltbread": {"m": ["\"거기 가 봤어?\"라는 질문에 대개 \"응\"이라고 답함", "휴대폰 사진첩이 맛집과 카페로 가득함", "지난달에 빠졌던 걸 이번 달엔 잊고 있음"], "t": "당신 덕분에 주변이 심심할 틈이 없어요. 가끔은 유행과 상관없이 오래 좋아한 걸 다시 꺼내 보세요."},
  "danpat": {"m": ["친구가 오면 \"더 먹어\"를 세 번쯤 말함", "휴대폰을 고장 날 때까지 씀", "오랜만에 만나도 어제 본 것처럼 대화가 이어짐"], "t": "변하지 않고 곁에 있어 주는 사람은 귀해요. 당신이 챙긴 사람들도 당신을 든든하게 생각하고 있어요."},
  "baguette": {"m": ["\"그건 아닌 것 같아\"를 그 자리에서 말함", "늦는 사람을 기다릴 때 속으로 시간을 잼", "가까운 친구들은 \"알고 보면 제일 여려\"라고 말함"], "t": "당신의 분명함 덕분에 믿고 맡기는 사람이 많아요. 가끔은 속의 부드러움을 먼저 보여 줘도 괜찮아요."}
};
