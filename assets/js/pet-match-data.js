/* ============================================================
   나와 잘 맞는 반려동물은? - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/pet-match.json 을 고치세요
   ============================================================ */

const PETMATCH_QUESTIONS = [
  {
    text: "평일 내 하루를 시간표로 그려 보면?",
    options: [
      { text: "재택이라 하루 대부분 집에 있다", key: "dog" },
      { text: "아침에 나가서 밤에야 들어온다", key: "cat" },
    ],
  },
  {
    text: "퇴근 후 멍때리는 5분, 더 보고 싶은 장면은?",
    options: [
      { text: "작은 녀석이 쳇바퀴 굴리는 모습", key: "hamster" },
      { text: "물속을 천천히 유영하는 모습", key: "fish" },
    ],
  },
  {
    text: "현관문을 열 때 상상하는 장면은?",
    options: [
      { text: "'안녕!' 하고 먼저 말 거는 목소리", key: "bird" },
      { text: "꼬리 흔들며 뛰어오는 발소리", key: "dog" },
    ],
  },
  {
    text: "반려동물 뒷정리, 내가 할 수 있는 건?",
    options: [
      { text: "매일 정해진 시간에 루틴처럼 착착", key: "cat" },
      { text: "가끔 한 번씩 몰아서 집 통째로 청소", key: "hamster" },
    ],
  },
  {
    text: "층간소음에 대한 나의 입장은?",
    options: [
      { text: "물소리 말고는 고요해야 꿀잠 잔다", key: "fish" },
      { text: "아침마다 지저귀는 소리면 알람으로 딱", key: "bird" },
    ],
  },
  {
    text: "비 그친 일요일 오후, 나는?",
    options: [
      { text: "운동화 신고 공원 한 바퀴 돌러 나간다", key: "dog" },
      { text: "창가에 누워 각자 낮잠 자기", key: "cat" },
    ],
  },
  {
    text: "반려동물과의 스킨십, 내 이상은?",
    options: [
      { text: "손바닥 위에 올려놓고 꼬물거림 감상", key: "hamster" },
      { text: "유리 너머로 바라보는 걸로 충분하다", key: "fish" },
    ],
  },
  {
    text: "반려동물에게 개인기를 가르칠 수 있다면?",
    options: [
      { text: "'사랑해' 따라 하게 매일 연습시킨다", key: "bird" },
      { text: "가르치긴 뭘, 각자 알아서 사는 거지", key: "cat" },
    ],
  },
  {
    text: "앞으로 10년, 반려동물과의 계획을 세운다면?",
    options: [
      { text: "산책, 병원, 노후까지 함께할 각오 완료", key: "dog" },
      { text: "작게 시작해서 차근차근 배우고 싶다", key: "hamster" },
    ],
  },
  {
    text: "인테리어 앱에 저장해 둔 사진들은?",
    options: [
      { text: "은은한 조명 아래 초록 수조가 있는 방", key: "fish" },
      { text: "햇살 가득, 화분과 컬러풀한 소품", key: "bird" },
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
