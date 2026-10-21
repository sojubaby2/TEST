/* ============================================================
   전생 테스트 - 문항 및 결과 데이터
   ============================================================ */

const PASTLIFE_QUESTIONS = [
  {
    text: "눈 떠 보니 무인도에 10명이 함께 떨어졌다.",
    options: [
      { text: "\"다들 모여! 역할 나눈다\"", who: "pharaoh" },
      { text: "나뭇가지 하나 들고 혼자 섬 반대편으로", who: "viking" },
      { text: "지형부터 그려서 지도 만들기", who: "scholar" },
    ],
  },
  {
    text: "층간소음 2주째, 오늘 밤에도 위층에서 쿵쿵 소리가 난다.",
    options: [
      { text: "바로 위층 올라가서 노크", who: "viking" },
      { text: "\"과일 드릴 테니 슬리퍼 좀…\" 협상", who: "merchant" },
      { text: "감정 꾹꾹 담은 손편지를 문에 붙임", who: "artist" },
    ],
  },
  {
    text: "아무 일정 없는 일요일 오후, 가장 끌리는 곳은?",
    options: [
      { text: "골목 안 작은 갤러리", who: "artist" },
      { text: "조용한 도서관 구석 자리", who: "scholar" },
      { text: "사람 북적이는 플리마켓", who: "merchant" },
    ],
  },
  {
    text: "회사에서 새 프로젝트를 맡았다. 첫날 나는?",
    options: [
      { text: "완성본 퀄리티 기준부터 높게 세움", who: "pharaoh" },
      { text: "일단 해 보면서 부딪혀 배움", who: "viking" },
      { text: "규정집이랑 지난 자료부터 정독", who: "scholar" },
    ],
  },
  {
    text: "열 명 넘게 모인 바비큐 파티에서 나는?",
    options: [
      { text: "고기 굽는 순서까지 자연스럽게 지휘", who: "pharaoh" },
      { text: "썰 풀며 이 테이블 저 테이블 순회", who: "merchant" },
      { text: "노을 보며 혼자 사진 찍는 중", who: "artist" },
    ],
  },
  {
    text: "통장에 갑자기 보너스 300만 원이 들어왔다.",
    options: [
      { text: "ETF랑 적금으로 바로 쪼개서 굴림", who: "merchant" },
      { text: "가족들 데리고 근사한 데서 한턱", who: "pharaoh" },
      { text: "사고 싶던 카메라 사고 나머진 기억 안 남", who: "artist" },
    ],
  },
  {
    text: "엘리베이터가 층 사이에 멈췄다. 안에 6명이 갇혔다.",
    options: [
      { text: "비상벨 연타하며 \"여기요!\" 우렁차게", who: "viking" },
      { text: "비상 안내문부터 읽고 차분히 상황 파악", who: "scholar" },
      { text: "\"다들 괜찮아요\" 분위기 달래며 단합", who: "merchant" },
    ],
  },
  {
    text: "SNS 프로필 사진을 바꾼다. 내가 고른 사진은?",
    options: [
      { text: "정장 차림의 각 잡힌 단독 샷", who: "pharaoh" },
      { text: "산 정상에서 소리 지르는 사진", who: "viking" },
      { text: "흔들린 필름 카메라 감성 사진", who: "artist" },
    ],
  },
  {
    text: "유튜브 알고리즘이 '고대 문명 미스터리' 영상을 띄웠다.",
    options: [
      { text: "관련 영상 12개 정주행, 논문까지 찾음", who: "scholar" },
      { text: "\"이걸로 굿즈 팔면 되겠는데?\"", who: "merchant" },
      { text: "보고 나서 영감 받아 그림 끄적임", who: "artist" },
    ],
  },
  {
    text: "한 달 휴가와 항공권이 공짜로 생겼다. 행선지는?",
    options: [
      { text: "지도에도 잘 안 나오는 북쪽 오지", who: "viking" },
      { text: "이스탄불 대시장에서 흥정하기", who: "merchant" },
      { text: "피라미드랑 고대 유적 투어", who: "pharaoh" },
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
