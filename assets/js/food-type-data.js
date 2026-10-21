/* ============================================================
   내가 음식이라면? - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/food-type.json 을 고치세요
   ============================================================ */

const FOODTYPE_QUESTIONS = [
  {
    text: "처음 가 본 식당, 메뉴판에 '도전 메뉴'가 빨간 글씨로 적혀 있다.",
    options: [
      { text: "도전 메뉴! 일단 질러 보고 생각함", key: "tteokbokki" },
      { text: "늘 먹던 거랑 제일 비슷한 걸로", key: "gomtang" },
    ],
  },
  {
    text: "친구가 \"아무거나 먹자\"며 메뉴 결정을 나한테 넘겼다.",
    options: [
      { text: "\"나만 아는 데 있어\" 하고 끌고 감", key: "malatang" },
      { text: "친구 표정 보며 둘 다 좋아할 곳 고름", key: "kimbap" },
    ],
  },
  {
    text: "다섯 명이 모인 술자리, 대화가 잠깐 뚝 끊겼다.",
    options: [
      { text: "\"아 그거 알아?\" 하고 웃긴 썰 투척", key: "chicken" },
      { text: "한마디로 정곡 찔러서 다 빵 터지게 함", key: "tteokbokki" },
    ],
  },
  {
    text: "새로 온 팀원이 한 달 뒤 나에 대해 남긴 후기는?",
    options: [
      { text: "\"볼수록 진국이에요\"", key: "gomtang" },
      { text: "\"첫날부터 강렬했어요\"", key: "malatang" },
    ],
  },
  {
    text: "친구 따라 처음 보는 사람들 모임에 끼게 됐다.",
    options: [
      { text: "어느 테이블에 앉아도 어색하지 않음", key: "kimbap" },
      { text: "30분 뒤 내가 건배사 하고 있음", key: "chicken" },
    ],
  },
  {
    text: "생일 롤링페이퍼에서 제일 마음에 드는 한 줄은?",
    options: [
      { text: "\"넌 할 말 다 하는 게 멋있어\"", key: "tteokbokki" },
      { text: "\"이상하게 자꾸 생각나는 애\"", key: "malatang" },
    ],
  },
  {
    text: "이별한 친구가 새벽 1시에 \"잠깐 나와\"라고 연락했다.",
    options: [
      { text: "옆에 앉아 아무 말 없이 밤새 있어 줌", key: "gomtang" },
      { text: "편의점 털어서 먹을 거부터 쥐여 줌", key: "kimbap" },
    ],
  },
  {
    text: "내 플레이리스트를 들어 본 친구의 반응은?",
    options: [
      { text: "\"이런 노래는 대체 어디서 찾아?\"", key: "malatang" },
      { text: "\"이거 틀면 누구든 신나겠다\"", key: "chicken" },
    ],
  },
  {
    text: "약속 1시간 전, 단톡방에 \"시간 좀 바꾸자\"가 떴다.",
    options: [
      { text: "\"그래서 몇 시? 어디?\" 3초 정리", key: "tteokbokki" },
      { text: "\"난 다 돼, 편한 대로 해\"", key: "kimbap" },
    ],
  },
  {
    text: "10년 뒤 동창회에서 나를 두고 나올 말은?",
    options: [
      { text: "\"걔는 하나도 안 변했더라\"", key: "gomtang" },
      { text: "\"걔 오면 그날은 무조건 재밌었지\"", key: "chicken" },
    ],
  },
];

const FOODTYPE_APPEARANCES = 4;

const FOODTYPE_RESULTS = [
  {
    id: "tteokbokki",
    emoji: "🌶️",
    title: "떡볶이형",
    subtitle: "매콤하게 치고 빠지는 타입",
    summary: "화끈하고 솔직해서 같이 있으면 답답할 일이 없는 타입이에요. 할 말은 하고 결정도 빠르죠. 자극적인 만큼 여운도 길게 남아서, 한번 만난 사람은 나를 쉽게 잊지 못해요. 다만 매운맛도 가끔은 쉬어가야 맛있다는 걸 기억해주세요.",
    traits: ["할 말은 하고 넘어가는 성격", "결정이 빠르고 뒤끝이 없음", "강한 인상을 남기는 타입"],
    color: "#DC2626",
    compat: {
      best: { id: "gomtang", reason: "내가 치고 나갈 때 뒤를 받쳐주는 든든한 조합이에요" },
      worst: { id: "malatang", reason: "둘 다 개성이 세서 취향이 부딪히면 팽팽해질 수 있어요" },
    },
  },
  {
    id: "gomtang",
    emoji: "🍲",
    title: "곰탕형",
    subtitle: "우려낼수록 깊어지는 타입",
    summary: "처음엔 심심해 보여도 알수록 깊이가 드러나는 타입이에요. 요란하게 표현하지 않을 뿐 한번 마음을 주면 오래갑니다. 주변에서 '힘들 때 제일 먼저 생각나는 사람'으로 꼽히는 경우가 많아요. 대신 내 마음도 가끔은 말로 꺼내주면 좋겠어요.",
    traits: ["시간이 지날수록 진가가 드러남", "표현은 적지만 한결같음", "힘들 때 먼저 찾게 되는 사람"],
    color: "#B45309",
    compat: {
      best: { id: "tteokbokki", reason: "화끈한 상대의 속도를 내가 받쳐주면 균형이 잘 맞아요" },
      worst: { id: "chicken", reason: "늘 북적이는 분위기가 나에겐 조금 버거울 수 있어요" },
    },
  },
  {
    id: "malatang",
    emoji: "🔥",
    title: "마라탕형",
    subtitle: "취향이 확실한 중독성 타입",
    summary: "호불호가 갈려도 상관없다는 태도가 오히려 매력이 되는 타입이에요. 내 것을 골라 담는 감각이 뚜렷하고, 남의 기준을 따라가지 않습니다. 한번 빠지면 헤어 나오기 어렵다는 말을 듣는 것도 이 때문이에요.",
    traits: ["취향이 분명하고 타협하지 않음", "호불호가 갈리는 걸 신경 쓰지 않음", "한번 빠지면 깊게 빠지는 타입"],
    color: "#7C2D12",
    compat: {
      best: { id: "kimbap", reason: "유연한 상대가 내 강한 취향을 잘 받아줘서 편해요" },
      worst: { id: "tteokbokki", reason: "둘 다 세다 보니 서로 물러서지 않으면 소모전이 돼요" },
    },
  },
  {
    id: "kimbap",
    emoji: "🍙",
    title: "김밥형",
    subtitle: "어디에 놓아도 어울리는 만능 타입",
    summary: "어느 자리에 가도 자연스럽게 섞이는 타입이에요. 튀지 않으면서 늘 제 역할을 하니 어디서나 환영받죠. 다만 '아무거나 괜찮다'는 말을 너무 자주 하고 있진 않은지 한 번 확인해보세요. 내 취향도 말해도 됩니다.",
    traits: ["어떤 무리에도 잘 섞임", "부탁을 잘 들어주는 편", "티 나지 않게 제 몫을 함"],
    color: "#059669",
    compat: {
      best: { id: "malatang", reason: "개성 강한 상대 옆에서 내 유연함이 제일 잘 살아나요" },
      worst: { id: "gomtang", reason: "둘 다 표현을 아껴서 속마음을 모른 채 지나갈 수 있어요" },
    },
  },
  {
    id: "chicken",
    emoji: "🍗",
    title: "치킨형",
    subtitle: "모두가 반기는 분위기 메이커",
    summary: "어느 자리든 내가 등장하면 분위기가 살아나는 타입이에요. 싫어하는 사람을 찾기 어려울 만큼 두루 사랑받죠. 다만 늘 즐거운 역할을 맡다 보면 가라앉은 날에도 그 역할을 하게 됩니다. 가끔은 쉬어가도 괜찮아요.",
    traits: ["어느 자리에서나 환영받음", "분위기를 살리는 데 재능이 있음", "싫어하는 사람이 드문 타입"],
    color: "#F59E0B",
    compat: {
      best: { id: "kimbap", reason: "서로 무리하지 않아서 오래 편하게 갈 수 있는 조합이에요" },
      worst: { id: "gomtang", reason: "내 텐션이 조용한 상대에겐 부담이 될 수 있어요" },
    },
  },
];

function getFoodTypeById(id) {
  return FOODTYPE_RESULTS.find((r) => r.id === id);
}

function tallyToFoodTypeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["tteokbokki", "gomtang", "malatang", "kimbap", "chicken"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getFoodTypeById(best);
}
