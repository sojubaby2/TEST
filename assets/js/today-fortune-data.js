// 오늘의 운세 (띠 기반) 데이터
// 12지신 + 오늘 날짜를 시드로 매일 다른 결과가 나오도록 결정론적으로 선택함.
// 궁합(육합/상충)은 전통 명리학의 지지 육합·지지상충 관계를 그대로 사용함.

// 지지육합(찰떡궁합) 1문장 이유
const BEST_REASON = {
  rat: "서로 부족한 부분을 채워주면서 안정감을 주는 궁합이에요.",
  ox: "묵묵히 서로를 보완해주면서 편안함을 느끼는 궁합이에요.",
  tiger: "서로를 든든하게 감싸주는 믿음직한 궁합이에요.",
  pig: "넉넉한 포용력과 추진력이 만나 서로를 지켜주는 궁합이에요.",
  rabbit: "잔잔하고 편안한 분위기 속에서 잘 맞아가는 궁합이에요.",
  dog: "말하지 않아도 서로를 이해해주는 편안한 궁합이에요.",
  dragon: "화려함과 꼼꼼함이 만나 멋진 시너지를 내는 궁합이에요.",
  rooster: "서로의 매력을 알아봐 주는 케미가 좋은 궁합이에요.",
  snake: "지혜와 재치가 만나 대화가 끊이지 않는 궁합이에요.",
  monkey: "서로의 감각을 높이 사주는 잘 통하는 궁합이에요.",
  horse: "밝고 따뜻한 에너지가 자연스럽게 잘 맞는 궁합이에요.",
  goat: "서로에게 좋은 기운을 나눠주는 다정한 궁합이에요.",
};
// 지지상충(상극) 1문장 이유
const WORST_REASON = {
  rat: "정반대 기질이라 사소한 일로 부딪히기 쉬운 궁합이에요.",
  horse: "속도 차이 때문에 서로 답답함을 느끼기 쉬운 궁합이에요.",
  ox: "고집끼리 만나면 마찰이 생기기 쉬운 궁합이에요.",
  goat: "서로 다른 방식을 고집하다 부딪히기 쉬운 궁합이에요.",
  tiger: "주도권을 두고 은근한 신경전이 생기기 쉬운 궁합이에요.",
  monkey: "서로 앞서려다 부딪히기 쉬운 궁합이에요.",
  rabbit: "성향 차이 때문에 오해가 쌓이기 쉬운 궁합이에요.",
  rooster: "꼼꼼함과 여유로움이 부딪혀 답답해지기 쉬운 궁합이에요.",
  dragon: "자존심 대결이 벌어지기 쉬운 궁합이에요.",
  dog: "고집과 카리스마가 부딪혀 팽팽해지기 쉬운 궁합이에요.",
  snake: "서로 다른 속도 때문에 답답함을 느끼기 쉬운 궁합이에요.",
  pig: "느긋함과 예민함이 부딪혀 오해가 생기기 쉬운 궁합이에요.",
};

// 지지육합(찰떡궁합) / 지지상충(상극) — 전통 명리학 기준, 1:1 대응
const ZODIAC_BEST = {
  rat: "ox", ox: "rat",
  tiger: "pig", pig: "tiger",
  rabbit: "dog", dog: "rabbit",
  dragon: "rooster", rooster: "dragon",
  snake: "monkey", monkey: "snake",
  horse: "goat", goat: "horse",
};
const ZODIAC_WORST = {
  rat: "horse", horse: "rat",
  ox: "goat", goat: "ox",
  tiger: "monkey", monkey: "tiger",
  rabbit: "rooster", rooster: "rabbit",
  dragon: "dog", dog: "dragon",
  snake: "pig", pig: "snake",
};

const ZODIAC_LIST = [
  { id: "rat", emoji: "🐭", name: "쥐띠", title: "쥐띠", hanja: "子", trait: "재빠른 판단력" },
  { id: "ox", emoji: "🐮", name: "소띠", title: "소띠", hanja: "丑", trait: "우직한 성실함" },
  { id: "tiger", emoji: "🐯", name: "호랑이띠", title: "호랑이띠", hanja: "寅", trait: "거침없는 추진력" },
  { id: "rabbit", emoji: "🐰", name: "토끼띠", title: "토끼띠", hanja: "卯", trait: "섬세한 배려심" },
  { id: "dragon", emoji: "🐲", name: "용띠", title: "용띠", hanja: "辰", trait: "타고난 카리스마" },
  { id: "snake", emoji: "🐍", name: "뱀띠", title: "뱀띠", hanja: "巳", trait: "날카로운 통찰력" },
  { id: "horse", emoji: "🐴", name: "말띠", title: "말띠", hanja: "午", trait: "넘치는 활력" },
  { id: "goat", emoji: "🐑", name: "양띠", title: "양띠", hanja: "未", trait: "따뜻한 온화함" },
  { id: "monkey", emoji: "🐵", name: "원숭이띠", title: "원숭이띠", hanja: "申", trait: "번뜩이는 재치" },
  { id: "rooster", emoji: "🐔", name: "닭띠", title: "닭띠", hanja: "酉", trait: "꼼꼼한 계획성" },
  { id: "dog", emoji: "🐶", name: "개띠", title: "개띠", hanja: "戌", trait: "변함없는 의리" },
  { id: "pig", emoji: "🐷", name: "돼지띠", title: "돼지띠", hanja: "亥", trait: "넉넉한 포용력" },
];

// 각 띠에 compat(best/worst) 정보를 부여 (renderCompatSection 공용 함수와 호환되는 형태)
ZODIAC_LIST.forEach(function (z) {
  z.compat = {
    best: { id: ZODIAC_BEST[z.id], reason: BEST_REASON[z.id] },
    worst: { id: ZODIAC_WORST[z.id], reason: WORST_REASON[z.id] },
  };
});

const FORTUNE_TOTAL = [
  "오늘은 새로운 기회가 슬쩍 찾아오는 날이에요. 망설이지 말고 먼저 다가가 보세요.",
  "평소보다 마음이 차분해지는 하루예요. 미뤄뒀던 일을 정리하기 좋은 타이밍이에요.",
  "작은 실수가 생길 수 있지만 크게 번지진 않아요. 여유 있게 넘기면 무난하게 지나가요.",
  "주변 사람의 말 한마디에서 뜻밖의 힌트를 얻을 수 있어요. 귀 기울여 보세요.",
  "오늘따라 유독 컨디션이 좋게 느껴지는 날이에요. 미뤄둔 도전을 시작해보세요.",
  "생각이 많아지는 날이에요. 결정은 내일로 미뤄도 늦지 않아요.",
  "뜻밖의 칭찬이나 인정을 받을 수 있어요. 자신감을 가져도 좋아요.",
  "예상치 못한 지출이나 일정 변경이 생길 수 있으니 여유를 좀 남겨두세요.",
  "오랜만에 연락이 끊겼던 사람에게서 소식이 올 수 있어요.",
  "일이 술술 풀리기보다는 한 박자씩 천천히 진행돼요. 조급해하지 마세요.",
  "직감이 유독 잘 맞는 날이에요. 고민되는 선택이 있다면 마음이 가는 쪽으로 가보세요.",
  "괜히 예민해질 수 있는 날이라 사소한 일에 화내지 않도록 주의하세요.",
  "누군가에게 도움을 주면 그게 나중에 더 크게 돌아오는 하루예요.",
  "새로운 사람과의 만남이 좋은 인연으로 이어질 수 있어요.",
  "묵혀뒀던 고민이 의외로 쉽게 풀리는 날이에요.",
];

const FORTUNE_LOVE = [
  "솔직한 마음을 표현하면 생각보다 좋은 반응이 돌아와요.",
  "괜히 상대의 작은 행동에 서운함을 느낄 수 있어요. 오해라면 바로 풀어보세요.",
  "썸이나 새로운 만남을 기대하고 있다면 오늘 좋은 신호가 있을 수 있어요.",
  "연인과는 소소한 데이트만으로도 충분히 애정이 채워지는 날이에요.",
  "괜한 자존심 싸움은 피하는 게 좋아요. 먼저 다가가는 쪽이 이기는 하루예요.",
  "짝사랑 중이라면 자연스럽게 대화를 나눌 기회가 생길 수 있어요.",
  "혼자만의 시간이 더 편하게 느껴질 수 있어요. 억지로 만남을 만들지 않아도 괜찮아요.",
  "과거의 인연이 문득 떠오를 수 있지만, 지금에 집중하는 게 더 나아요.",
  "표현이 서툴러도 진심은 충분히 전달되는 날이에요.",
  "다툼이 있었다면 오늘이 화해하기 좋은 타이밍이에요.",
  "주변에서 소개팅이나 새로운 만남을 주선해줄 수 있어요.",
  "지나친 기대는 실망으로 이어질 수 있으니 마음을 편하게 가지세요.",
  "관심 있는 상대에게 스몰토크를 시도해보면 반응이 나쁘지 않아요.",
  "연인 사이에 작은 선물이나 이벤트가 큰 감동으로 이어져요.",
  "질투나 의심은 오늘만큼은 잠시 내려놓는 게 좋아요.",
];

const FORTUNE_MONEY = [
  "예상치 못한 작은 수입이 생길 수 있어요.",
  "충동구매가 생기기 쉬운 날이에요. 결제 전에 한 번 더 생각해보세요.",
  "돈 관리에 신경 쓰면 오늘의 절약이 나중에 큰 도움이 돼요.",
  "투자나 큰 지출은 오늘보다는 다음으로 미루는 게 안전해요.",
  "누군가에게 빌려준 돈이나 물건이 돌아올 수 있는 날이에요.",
  "생각보다 지출이 커질 수 있으니 가계부를 한번 점검해보세요.",
  "월급이나 용돈 관리 계획을 세우기 좋은 타이밍이에요.",
  "작은 부수입의 기회가 생길 수 있으니 눈여겨보세요.",
  "돈 문제로 주변과 오해가 생기지 않도록 확실하게 짚고 넘어가세요.",
  "저축이나 목돈 마련에 대한 좋은 아이디어가 떠오를 수 있어요.",
  "필요 없는 구독이나 지출을 정리하기 좋은 날이에요.",
  "금전적으로는 무난하게 흘러가는 하루예요.",
  "선물이나 뜻밖의 혜택으로 기분 좋은 지출 절약이 생길 수 있어요.",
  "동업이나 금전 거래는 조건을 꼼꼼히 확인하고 진행하세요.",
  "적은 금액이라도 꾸준히 모으는 습관이 빛을 발하는 시기예요.",
];

const FORTUNE_HEALTH = [
  "가벼운 스트레칭이나 산책만으로도 컨디션이 확 좋아지는 날이에요.",
  "수면 부족이 티가 날 수 있어요. 오늘은 조금 일찍 잠자리에 들어보세요.",
  "소화가 더딜 수 있으니 과식은 피하는 게 좋아요.",
  "몸보다 마음이 먼저 지치는 날일 수 있어요. 잠깐이라도 쉬어가세요.",
  "평소보다 컨디션이 좋아서 활동적으로 움직이기 좋은 하루예요.",
  "눈이나 목 주변 피로가 쌓이기 쉬우니 스트레칭을 해주세요.",
  "환절기 컨디션 관리에 신경 쓰면 좋은 날이에요.",
  "무리한 운동보다는 가벼운 움직임이 몸에 더 잘 맞는 날이에요.",
  "물을 충분히 마시는 것만으로도 컨디션이 한결 나아져요.",
  "두통이나 긴장성 피로가 생길 수 있으니 틈틈이 쉬어주세요.",
  "규칙적인 식사가 컨디션 유지에 도움이 되는 하루예요.",
  "몸이 보내는 신호를 무시하지 말고 무리하지 마세요.",
  "가벼운 야외 활동이 기분 전환과 체력 회복에 도움이 돼요.",
  "카페인 섭취를 조금 줄이면 컨디션이 더 안정돼요.",
  "전반적으로 무난하지만 자세 관리에는 신경 쓰는 게 좋아요.",
];

const LUCKY_COLORS = [
  { name: "코랄 핑크", hex: "#FF7F7F" },
  { name: "네이비 블루", hex: "#1E3A5F" },
  { name: "민트 그린", hex: "#3EB489" },
  { name: "레몬 옐로우", hex: "#F4D03F" },
  { name: "라벤더 퍼플", hex: "#9B7EDE" },
  { name: "화이트", hex: "#F5F5F5" },
  { name: "차콜 그레이", hex: "#4A4A4A" },
  { name: "테라코타", hex: "#C1694F" },
  { name: "스카이 블루", hex: "#87CEEB" },
  { name: "올리브 그린", hex: "#708238" },
];

const LUCKY_ITEMS = [
  "손목시계", "볼펜", "머그컵", "이어폰", "손수건", "다이어리",
  "향초", "우산", "선글라스", "텀블러", "책", "키링",
];

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getTodayDateStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function getZodiacById(id) {
  return ZODIAC_LIST.find((z) => z.id === id);
}

function getTodayFortune(zodiacId) {
  const dateStr = getTodayDateStr();
  const pick = (salt, arr) => arr[hashSeed(dateStr + "-" + zodiacId + "-" + salt) % arr.length];

  const color = pick("color", LUCKY_COLORS);
  const item = pick("item", LUCKY_ITEMS);
  const number = (hashSeed(dateStr + "-" + zodiacId + "-number") % 45) + 1;

  return {
    dateStr,
    total: pick("total", FORTUNE_TOTAL),
    love: pick("love", FORTUNE_LOVE),
    money: pick("money", FORTUNE_MONEY),
    health: pick("health", FORTUNE_HEALTH),
    color,
    item,
    number,
  };
}
