/* ============================================================
   소확행 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const LITTLEJOYINDEX_QUESTIONS = [
  { text: "갓 세탁한 이불에 누웠을 때 나는?", options: [ { text: "행복하다고 느끼며 그 순간을 만끽한다", score: 2 }, { text: "별생각 없이 잔다", score: 0 }, { text: "포근하다고 잠깐 느낀다", score: 1 } ] },
  { text: "좋아하는 디저트를 한 입 먹었을 때 나는?", options: [ { text: "오늘 하루가 다 풀리는 기분이 든다", score: 2 }, { text: "그냥 먹는다", score: 0 }, { text: "맛있다고 느낀다", score: 1 } ] },
  { text: "퇴근길이나 하굣길에 좋아하는 노래가 나오면 나는?", options: [ { text: "괜히 발걸음이 가벼워지고 행복해진다", score: 2 }, { text: "별 감흥이 없다", score: 0 }, { text: "기분이 좀 좋아진다", score: 1 } ] },
  { text: "날씨가 화창한 날 밖에 나가면 나는?", options: [ { text: "괜히 기분이 좋아져서 산책이라도 하고 싶다", score: 2 }, { text: "특별히 신경 안 쓴다", score: 0 }, { text: "날씨 좋다고 잠깐 생각한다", score: 1 } ] },
  { text: "새로 산 물건의 포장을 뜯을 때 나는?", options: [ { text: "그 순간 자체가 소소한 행복이다", score: 2 }, { text: "그냥 필요해서 쓴다", score: 0 }, { text: "새 물건이라 기분이 좋다", score: 1 } ] },
  { text: "좋아하는 향(커피, 빵, 향초 등)을 맡으면 나는?", options: [ { text: "기분이 확 풀리며 힐링되는 느낌을 받는다", score: 2 }, { text: "잘 못 느낀다", score: 0 }, { text: "좋다고 느끼는 정도다", score: 1 } ] },
  { text: "주말에 계획 없이 집에서 뒹굴 때 나는?", options: [ { text: "이보다 행복할 수 없다고 느낀다", score: 2 }, { text: "심심하고 지루하게 느껴진다", score: 0 }, { text: "적당히 편안하다", score: 1 } ] },
  { text: "작은 목표(하루 만보 걷기 등)를 달성했을 때 나는?", options: [ { text: "스스로를 칭찬하며 소소하게 기뻐한다", score: 2 }, { text: "그냥 넘어간다", score: 0 }, { text: "뿌듯함을 잠깐 느낀다", score: 1 } ] },
  { text: "반려동물이나 아기 동물 영상을 보면 나는?", options: [ { text: "마음이 몽글몽글해지며 행복해진다", score: 2 }, { text: "그냥 귀엽네 정도로 넘긴다", score: 0 }, { text: "잠깐 미소 짓는다", score: 1 } ] },
  { text: "하루를 마무리하며 오늘을 돌아보면 나는?", options: [ { text: "소소하게 좋았던 순간들이 여러 개 떠오른다", score: 2 }, { text: "특별히 좋았던 순간이 잘 안 떠오른다", score: 0 }, { text: "몇 가지 괜찮았던 순간이 떠오른다", score: 1 } ] },
];

const LITTLEJOYINDEX_MAX_SCORE = 20;

const LITTLEJOYINDEX_RESULTS = [
  {
    id: 1, emoji: "😐", title: "잔잔한 무심러", subtitle: "작은 일에 크게 동요하지 않는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "작은 행복보다는 큰 목표나 결과에 집중하는 편이야. 소소한 순간들은 그냥 스쳐지나가는 경우가 많은, 담담한 스타일이지.",
    traits: ["작은 일에 크게 동요하지 않는다", "큰 목표나 성과에 집중하는 편이다", "감정 기복이 적고 담담하다"],
    compat: { best: { id: 4, reason: "소소한 행복을 잘 아는 4번 유형이 새로운 재미를 알려줄 수 있어" }, worst: { id: 5, reason: "매 순간 행복을 찾는 5번 유형과는 온도차를 느낄 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "은근한 행복 채집러", subtitle: "가끔씩 소소한 행복을 알아차리는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "가끔씩 소소한 행복을 알아차리는 편이야. 매일은 아니어도 좋은 순간을 놓치지 않으려 하는, 은근히 섬세한 스타일.",
    traits: ["가끔이지만 소소한 행복을 알아챈다", "무리하지 않는 선에서 만족을 찾는다", "일상의 작은 변화에 관심이 있다"],
    compat: { best: { id: 3, reason: "적당히 행복을 즐기는 3번 유형과 있으면 공감대가 잘 맞을 수 있어" }, worst: { id: 1, reason: "무덤덤한 1번 유형과는 공감대가 적을 수 있어" } },
  },
  {
    id: 3, emoji: "🙂‍↕️", title: "적당히 소확행러", subtitle: "큰 행복도 소소한 행복도 골고루 즐기는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "큰 행복도 소소한 행복도 골고루 즐길 줄 아는 밸런스형이야. 일상에서 적당히 만족을 찾는, 균형 잡힌 스타일이지.",
    traits: ["일상 속에서 적당히 만족을 찾는다", "큰 행복과 작은 행복을 둘 다 즐긴다", "무리하지 않고 편안하게 산다"],
    compat: { best: { id: 2, reason: "잔잔하게 행복을 즐기는 2번 유형과 있으면 편안한 케미를 보여줄 수 있어" }, worst: { id: 5, reason: "매사에 몰입하는 5번 유형에게는 살짝 맞춰가기 벅찰 수 있어" } },
  },
  {
    id: 4, emoji: "🌼", title: "행복 안테나", subtitle: "일상 곳곳의 작은 행복을 잘 캐치하는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "일상 곳곳의 작은 행복을 잘 캐치하는 편이야. 사소한 순간에도 기분 좋은 이유를 찾아내는, 안테나가 발달한 스타일.",
    traits: ["사소한 순간에도 기분 좋은 이유를 찾는다", "일상의 작은 변화를 잘 알아챈다", "긍정적인 감정을 자주 느낀다"],
    compat: { best: { id: 1, reason: "담담한 1번 유형이 균형을 잡아줘서 안정적인 조합이 될 수 있어" }, worst: { id: 5, reason: "둘 다 감성적이라 현실적인 부분을 놓칠 수 있어" } },
  },
  {
    id: 5, emoji: "☕", title: "행복 발견 전문가", subtitle: "하루하루 작은 순간에서 행복을 발견하는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "하루하루 작은 순간들 속에서 행복을 발견하는 데 진심인 타입이야. 이불 냄새 하나에도 행복해질 줄 아는, 소확행 마스터라고 할 수 있지.",
    traits: ["아주 작은 순간에서도 행복을 느낀다", "일상의 소소한 디테일을 잘 알아챈다", "긍정적인 에너지가 주변에 전해진다"],
    compat: { best: { id: 1, reason: "현실적인 시선을 가진 1번 유형이 균형을 잡아줄 수 있어" }, worst: { id: 4, reason: "둘 다 감성적이라 계획성이 부족해질 수 있어" } },
  },
];

function getLittlejoyIndexResult(score) {
  return LITTLEJOYINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || LITTLEJOYINDEX_RESULTS[LITTLEJOYINDEX_RESULTS.length - 1];
}

function getLittlejoyIndexById(id) {
  return LITTLEJOYINDEX_RESULTS.find((r) => r.id === Number(id));
}
