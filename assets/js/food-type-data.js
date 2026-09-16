/* ============================================================
   내가 음식이라면? - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/food-type.json 을 고치세요
   ============================================================ */

const FOODTYPE_QUESTIONS = [
  {
    text: "처음 가본 식당에서 메뉴판을 펼쳤다. 나는?",
    options: [
      { text: "제일 맵고 자극적인 걸로 간다", key: "tteokbokki" },
      { text: "제일 무난한 걸로 안전하게 간다", key: "gomtang" },
    ],
  },
  {
    text: "친구가 \"아무거나 먹자\"고 했다. 내 반응은?",
    options: [
      { text: "\"그럼 여기 가자\" 하고 취향을 밀어붙인다", key: "malatang" },
      { text: "둘 다 무난하게 먹을 곳으로 정한다", key: "kimbap" },
    ],
  },
  {
    text: "모임에서 내 자리는?",
    options: [
      { text: "웃음소리 나는 쪽 한가운데", key: "chicken" },
      { text: "말은 짧게, 대신 임팩트 있게", key: "tteokbokki" },
    ],
  },
  {
    text: "누가 나를 알아가는 속도는?",
    options: [
      { text: "천천히, 오래 볼수록 알게 된다", key: "gomtang" },
      { text: "첫인상부터 강하게 남는다", key: "malatang" },
    ],
  },
  {
    text: "낯선 모임에 혼자 갔을 때 나는?",
    options: [
      { text: "어디에 껴도 어색하지 않게 섞인다", key: "kimbap" },
      { text: "금방 분위기를 띄우는 쪽이 된다", key: "chicken" },
    ],
  },
  {
    text: "내가 듣고 기분 좋은 말은?",
    options: [
      { text: "\"너 진짜 화끈하다\"", key: "tteokbokki" },
      { text: "\"너 은근 중독성 있어\"", key: "malatang" },
    ],
  },
  {
    text: "힘든 일이 있는 친구에게 나는?",
    options: [
      { text: "말없이 오래 곁에 있어준다", key: "gomtang" },
      { text: "일단 밥부터 먹이고 본다", key: "kimbap" },
    ],
  },
  {
    text: "내 취향에 대해 주변 반응은?",
    options: [
      { text: "\"넌 취향이 진짜 확실해\"", key: "malatang" },
      { text: "\"넌 뭘 해도 무난하게 잘해\"", key: "chicken" },
    ],
  },
  {
    text: "약속 시간이 갑자기 바뀌었다. 나는?",
    options: [
      { text: "\"그래서 몇 시?\" 바로 정리하고 끝", key: "tteokbokki" },
      { text: "\"난 다 괜찮아\" 하고 맞춰준다", key: "kimbap" },
    ],
  },
  {
    text: "10년 뒤에도 사람들이 나를 이렇게 기억했으면 좋겠다.",
    options: [
      { text: "\"그 사람 참 한결같았지\"", key: "gomtang" },
      { text: "\"걔 있으면 자리가 재밌었지\"", key: "chicken" },
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
