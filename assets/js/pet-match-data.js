/* ============================================================
   나와 잘 맞는 반려동물은? - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/pet-match.json 을 고치세요
   ============================================================ */

const PETMATCH_QUESTIONS = [
  {
    text: "집에 있는 시간이 하루에 얼마나 되나요?",
    options: [
      { text: "꽤 길다. 집에서 보내는 시간이 많다", key: "dog" },
      { text: "짧다. 대부분 밖에 나가 있다", key: "cat" },
    ],
  },
  {
    text: "반려동물에게 가장 바라는 건?",
    options: [
      { text: "작아도 매일 보는 재미", key: "hamster" },
      { text: "말없이 곁에 있는 편안함", key: "fish" },
    ],
  },
  {
    text: "퇴근하고 집에 왔을 때 원하는 반응은?",
    options: [
      { text: "이름 부르면 대답해주면 좋겠다", key: "bird" },
      { text: "문 앞에서 반겨주면 좋겠다", key: "dog" },
    ],
  },
  {
    text: "청소와 관리에 쓸 수 있는 시간은?",
    options: [
      { text: "필요하면 쓴다. 대신 규칙적으로", key: "cat" },
      { text: "짧게, 자주는 어렵다", key: "hamster" },
    ],
  },
  {
    text: "집에서 나는 소리에 대한 내 기준은?",
    options: [
      { text: "조용한 게 최고다", key: "fish" },
      { text: "시끌시끌해도 재밌으면 괜찮다", key: "bird" },
    ],
  },
  {
    text: "주말에 나는 주로?",
    options: [
      { text: "밖에 나가 걷거나 활동한다", key: "dog" },
      { text: "집에서 각자 시간을 보낸다", key: "cat" },
    ],
  },
  {
    text: "반려동물과의 거리감은 어느 정도가 좋나요?",
    options: [
      { text: "작고 아기자기하게 손 안에서", key: "hamster" },
      { text: "바라보는 것만으로 충분하다", key: "fish" },
    ],
  },
  {
    text: "새로운 걸 가르치는 일에 대해서는?",
    options: [
      { text: "재밌다. 반응이 오면 더 하고 싶다", key: "bird" },
      { text: "굳이. 알아서 지내는 게 편하다", key: "cat" },
    ],
  },
  {
    text: "내가 감당할 수 있는 책임의 크기는?",
    options: [
      { text: "산책과 병원까지, 길게 함께할 준비가 됐다", key: "dog" },
      { text: "작은 공간에서 부담 없이 시작하고 싶다", key: "hamster" },
    ],
  },
  {
    text: "인테리어에서 내가 중요하게 보는 건?",
    options: [
      { text: "바라보면 마음이 가라앉는 공간", key: "fish" },
      { text: "생기 있고 활기찬 분위기", key: "bird" },
    ],
  },
];

const PETMATCH_APPEARANCES = 4;

const PETMATCH_RESULTS = [
  {
    id: "dog",
    emoji: "🐶",
    title: "강아지형",
    subtitle: "함께 움직일 때 가장 행복한 타입",
    summary: "교감의 밀도가 높은 관계를 원하는 타입이에요. 반겨주고, 같이 나가고, 감정을 주고받는 걸 즐깁니다. 그만큼 시간과 체력을 많이 쓰는 선택이기도 해요. 산책·병원·훈련까지 10년 이상 이어지는 약속이라는 점을 꼭 함께 생각해주세요.",
    traits: ["교감이 많은 관계를 원함", "집에 있는 시간이 비교적 긺", "함께 움직이는 걸 좋아함"],
    color: "#F59E0B",
    compat: {
      best: { id: "bird", reason: "반응을 주고받는 걸 좋아하는 점에서 성향이 통해요" },
      worst: { id: "fish", reason: "교감을 원하는 나에겐 조용한 관계가 허전할 수 있어요" },
    },
  },
  {
    id: "cat",
    emoji: "🐱",
    title: "고양이형",
    subtitle: "각자의 거리가 지켜질 때 편한 타입",
    summary: "적당한 거리를 존중하는 관계가 편한 타입이에요. 늘 붙어 있기보다 같은 공간에 따로 있는 시간을 좋아합니다. 독립적인 생활 패턴과도 잘 맞아요. 다만 '손이 덜 간다'는 말은 오해예요. 화장실 관리와 정기 검진은 꾸준히 필요합니다.",
    traits: ["적당한 거리가 있는 관계를 선호", "혼자 있는 시간이 필요함", "규칙적인 관리에는 성실한 편"],
    color: "#8B5CF6",
    compat: {
      best: { id: "fish", reason: "조용한 공존을 좋아한다는 점에서 결이 비슷해요" },
      worst: { id: "dog", reason: "늘 붙어 있는 관계는 나에겐 조금 버거울 수 있어요" },
    },
  },
  {
    id: "hamster",
    emoji: "🐹",
    title: "햄스터형",
    subtitle: "작고 확실한 즐거움을 좋아하는 타입",
    summary: "부담은 적고 재미는 확실한 쪽을 택하는 타입이에요. 작은 공간에서 시작할 수 있고 관리 시간도 짧습니다. 매일 보는 소소한 장면에서 만족을 얻죠. 다만 수명이 짧은 편이라 이별이 생각보다 빨리 온다는 점은 미리 알아두시면 좋아요.",
    traits: ["부담이 적은 쪽을 선호함", "작고 소소한 재미를 좋아함", "관리에 쓰는 시간이 짧은 편"],
    color: "#D97706",
    compat: {
      best: { id: "fish", reason: "둘 다 손이 적게 가는 방식이라 함께 두기 좋아요" },
      worst: { id: "dog", reason: "요구되는 시간과 책임의 크기가 많이 달라요" },
    },
  },
  {
    id: "fish",
    emoji: "🐠",
    title: "물고기형",
    subtitle: "바라보는 것만으로 충전되는 타입",
    summary: "조용한 공간에서 회복하는 타입이에요. 소리와 활동량이 적은 환경을 좋아하고, 바라보는 것만으로 마음이 가라앉습니다. 인테리어와도 잘 어울리죠. 다만 물 관리와 수질 유지가 생각보다 꾸준한 일이라는 점은 감안해두세요.",
    traits: ["조용한 환경을 선호함", "보는 것만으로 안정감을 느낌", "차분한 공간을 중요하게 여김"],
    color: "#0EA5E9",
    compat: {
      best: { id: "cat", reason: "조용한 공존을 좋아하는 점이 서로 통해요" },
      worst: { id: "bird", reason: "활기찬 소리가 내가 원하는 고요함과 부딪혀요" },
    },
  },
  {
    id: "bird",
    emoji: "🦜",
    title: "앵무새형",
    subtitle: "주고받는 반응이 즐거운 타입",
    summary: "반응이 돌아오는 관계를 좋아하는 타입이에요. 말을 걸면 대답이 오고, 가르치면 배우는 재미가 큽니다. 집안 분위기가 생기 있어지죠. 다만 소리가 꽤 크고 사회성이 높은 동물이라 외로움도 많이 탄다는 점을 함께 고려해주세요.",
    traits: ["반응이 오가는 관계를 즐김", "가르치고 배우는 과정을 좋아함", "생기 있는 분위기를 선호함"],
    color: "#16A34A",
    compat: {
      best: { id: "dog", reason: "교감을 중요하게 여기는 성향이 서로 잘 맞아요" },
      worst: { id: "fish", reason: "내 활기가 조용한 취향과는 어긋날 수 있어요" },
    },
  },
];

function getPetMatchById(id) {
  return PETMATCH_RESULTS.find((r) => r.id === id);
}

function tallyToPetMatchResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["dog", "cat", "hamster", "fish", "bird"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getPetMatchById(best);
}
