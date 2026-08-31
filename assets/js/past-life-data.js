/* ============================================================
   전생 테스트 - 문항 및 결과 데이터
   ============================================================ */

const PASTLIFE_QUESTIONS = [
  {
    text: "낯선 곳에 떨어졌을 때 나는?",
    options: [
      { text: "일단 사람들을 모아 이끈다", who: "pharaoh" },
      { text: "혼자서라도 개척하며 나아간다", who: "viking" },
      { text: "주변을 관찰하고 기록부터 한다", who: "scholar" },
    ],
  },
  {
    text: "갈등 상황에서 나는?",
    options: [
      { text: "정면돌파로 부딪힌다", who: "viking" },
      { text: "타협점을 찾아 협상한다", who: "merchant" },
      { text: "감정을 표현하며 풀어간다", who: "artist" },
    ],
  },
  {
    text: "쉬는 날 가장 하고 싶은 건?",
    options: [
      { text: "박물관이나 전시회 관람", who: "artist" },
      { text: "책 읽고 사색하기", who: "scholar" },
      { text: "시장 구경하며 사람 구경", who: "merchant" },
    ],
  },
  {
    text: "일할 때 나의 스타일은?",
    options: [
      { text: "완벽한 결과물을 추구한다", who: "pharaoh" },
      { text: "일단 몸으로 부딪혀 배운다", who: "viking" },
      { text: "원칙과 절차를 중요하게 여긴다", who: "scholar" },
    ],
  },
  {
    text: "사람들과 있을 때 나는?",
    options: [
      { text: "자연스럽게 분위기를 주도한다", who: "pharaoh" },
      { text: "이야기를 재밌게 풀어내며 어울린다", who: "merchant" },
      { text: "조용히 관찰하며 영감을 얻는다", who: "artist" },
    ],
  },
  {
    text: "돈에 대한 나의 태도는?",
    options: [
      { text: "실속있게 굴리고 불린다", who: "merchant" },
      { text: "필요하면 아낌없이 쓴다", who: "pharaoh" },
      { text: "큰 관심 없고 자유롭게 쓴다", who: "artist" },
    ],
  },
  {
    text: "위기가 닥쳤을 때 나는?",
    options: [
      { text: "용감하게 맞서 싸운다", who: "viking" },
      { text: "냉정하게 상황을 분석한다", who: "scholar" },
      { text: "사람들을 설득해 함께 헤쳐나간다", who: "merchant" },
    ],
  },
  {
    text: "나를 표현할 때 나는?",
    options: [
      { text: "품위있고 위엄있게", who: "pharaoh" },
      { text: "솔직하고 거침없이", who: "viking" },
      { text: "감성적이고 자유롭게", who: "artist" },
    ],
  },
  {
    text: "새로운 지식을 접하면 나는?",
    options: [
      { text: "깊이 파고들어 탐구한다", who: "scholar" },
      { text: "실용적으로 써먹을 방법을 찾는다", who: "merchant" },
      { text: "영감을 얻어 무언가를 창작한다", who: "artist" },
    ],
  },
  {
    text: "여행을 간다면 나는?",
    options: [
      { text: "미지의 땅을 정복하듯 탐험한다", who: "viking" },
      { text: "각지의 시장과 사람들을 만난다", who: "merchant" },
      { text: "역사와 유적지를 찾아다닌다", who: "pharaoh" },
    ],
  },
];

const PASTLIFE_RESULTS = [
  {
    id: "pharaoh",
    emoji: "👑",
    title: "이집트 파라오",
    subtitle: "타고난 카리스마로 사람들을 이끄는 리더",
    summary:
      "전생에 사람들 위에 서서 나라를 다스리던 리더였을 가능성이 높아요. 타고난 카리스마와 위엄으로 자연스럽게 분위기를 주도하고, 완벽을 추구하는 성향이 강해요. 다만 그만큼 책임감의 무게도 크게 느끼는 편이니 가끔은 내려놓는 여유도 필요해요.",
    traits: ["타고난 리더십과 카리스마", "완벽주의 성향", "품위와 명예를 중요하게 여김"],
    color: "#D4A017",
    compat: {
      best: { id: "merchant", reason: "카리스마 있는 리더와 노련한 협상가가 만나면 환상의 파트너십을 이뤄요." },
      worst: { id: "artist", reason: "자유분방한 상대의 즉흥적인 스타일이 통제하기 어렵게 느껴질 수 있어요." },
    },
  },
  {
    id: "viking",
    emoji: "🛡️",
    title: "바이킹 전사",
    subtitle: "두려움 없이 새로운 땅을 개척하던 모험가",
    summary:
      "거친 파도를 헤치고 미지의 땅을 개척하던 용맹한 전사였을 가능성이 높아요. 두려움보다 호기심이 앞서고, 일단 부딪히며 배우는 실행력이 남달라요. 직설적인 성격 때문에 가끔 오해를 사기도 하지만, 그만큼 솔직하고 믿음직한 사람이에요.",
    traits: ["뛰어난 용기와 실행력", "직설적이고 솔직한 성격", "새로운 도전을 두려워하지 않음"],
    color: "#475569",
    compat: {
      best: { id: "artist", reason: "거침없는 전사와 자유로운 예술가, 서로 다른 매력에 강하게 끌려요." },
      worst: { id: "scholar", reason: "신중하게 재고 따지는 상대의 속도가 답답하게 느껴질 수 있어요." },
    },
  },
  {
    id: "scholar",
    emoji: "📜",
    title: "조선시대 선비",
    subtitle: "원칙과 배움을 중시하던 학자",
    summary:
      "책과 씨름하며 원칙을 지키던 조용한 학자였을 가능성이 높아요. 깊이 있게 탐구하는 걸 좋아하고, 신중하게 생각한 뒤에 행동하는 스타일이에요. 절제된 언행 덕분에 신뢰를 받지만, 가끔은 감정을 더 표현해도 좋아요.",
    traits: ["신중하고 원칙적인 성향", "깊이 있는 탐구를 좋아함", "절제된 언행으로 신뢰를 받음"],
    color: "#1E3A8A",
    compat: {
      best: { id: "artist", reason: "이성적인 학자와 감성적인 예술가가 만나 서로의 부족한 부분을 채워줘요." },
      worst: { id: "viking", reason: "즉흥적이고 저돌적인 상대의 행동이 불안하게 느껴질 수 있어요." },
    },
  },
  {
    id: "merchant",
    emoji: "🐫",
    title: "실크로드 상인",
    subtitle: "각지를 누비며 사람과 재물을 다루던 협상가",
    summary:
      "낙타에 짐을 싣고 이 나라 저 나라를 누비던 노련한 상인이었을 가능성이 높아요. 사교성이 좋고 현실감각이 뛰어나 어떤 상황에서도 실속을 챙기는 편이에요. 다재다능하고 협상에 능하지만, 가끔은 손익을 따지지 않는 순수한 마음도 필요해요.",
    traits: ["뛰어난 사교성과 협상력", "현실적이고 실속있는 판단", "다재다능한 만능형"],
    color: "#C2703D",
    compat: {
      best: { id: "pharaoh", reason: "현실적인 협상가가 카리스마 있는 리더를 든든하게 뒷받침해줘요." },
      worst: { id: "viking", reason: "계산 없이 저지르는 상대의 즉흥성에 마음을 놓기 어려울 수 있어요." },
    },
  },
  {
    id: "artist",
    emoji: "🎨",
    title: "르네상스 예술가",
    subtitle: "아름다움을 좇던 자유로운 영혼",
    summary:
      "화려한 예술의 시대, 붓과 조각칼을 들고 아름다움을 좇던 예술가였을 가능성이 높아요. 감성이 풍부하고 틀에 얽매이지 않는 자유로운 발상을 좋아해요. 영감이 떠오르면 몰입하는 편이라 현실적인 부분은 가끔 놓치기도 해요.",
    traits: ["풍부한 감성과 창의력", "자유롭고 개성있는 사고방식", "몰입하면 주변을 잊는 편"],
    color: "#7C3AED",
    compat: {
      best: { id: "viking", reason: "자유로운 예술가와 용맹한 전사, 서로의 열정에 이끌리는 조합이에요." },
      worst: { id: "pharaoh", reason: "위엄과 격식을 중시하는 상대에게 자유로운 영혼이 억눌리는 느낌을 받을 수 있어요." },
    },
  },
];

function tallyToPastLifeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["pharaoh", "viking", "scholar", "merchant", "artist"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getPastLifeById(best);
}

function getPastLifeById(id) {
  return PASTLIFE_RESULTS.find((r) => r.id === id);
}
