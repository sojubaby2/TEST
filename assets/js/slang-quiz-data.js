/* ============================================================
   신조어 지식퀴즈 - 문항 및 결과 데이터
   ============================================================ */

// 정답이 있는 객관식 퀴즈. 매번 보기 순서를 섞어서 보여줌.
const SLANG_QUESTIONS = [
  {
    term: "얼죽아",
    correct: "얼어 죽어도 아이스 아메리카노",
    wrong: ["얼큰하게 죽여주는 아메리카노", "얼른 죽어도 할 건 한다", "얼굴에 죽고 못 사는 아이돌"],
  },
  {
    term: "중꺽마",
    correct: "중요한 건 꺾이지 않는 마음",
    wrong: ["중간에 꺾이면 마감", "중요한 건 꺾어야 맛", "중고로 꺾어 파는 마켓"],
  },
  {
    term: "이왜진",
    correct: "이게 왜 진짜야 (믿기 힘든 상황에 대한 반응)",
    wrong: ["이거 왜 진행 안 돼", "이왕이면 진짜로", "이거 왜 진동 울려"],
  },
  {
    term: "알잘딱깔쎈",
    correct: "알아서, 잘, 딱 깔끔하고 센스있게",
    wrong: ["알고 보니 딱 걸림", "알람 잘 딱 맞춰서 깨움", "알뜰하고 잘 딱 맞는 쎈 언니"],
  },
  {
    term: "킹받다",
    correct: "King + 열받다, 매우 화나고 짜증남",
    wrong: ["킹왕짱 기분 좋음", "킹사이즈로 배부름", "킹콩처럼 힘이 셈"],
  },
  {
    term: "억텐",
    correct: "억지 텐션, 무리해서 끌어올린 텐션",
    wrong: ["억울한 텐트", "억척스러운 텐션 다운", "억대 연봉"],
  },
  {
    term: "고트 (GOAT)",
    correct: "Greatest Of All Time, 역대 최고",
    wrong: ["염소처럼 고집이 셈", "고생 끝에 트로피", "고등학생 티 남"],
  },
  {
    term: "딜루루 (Delulu)",
    correct: "현실과 동떨어진 망상·판타지에 빠진 상태",
    wrong: ["딜레이되고 루즈해짐", "딜을 잘 하는 사람", "루틴을 딱 지키는 사람"],
  },
  {
    term: "파라소셜",
    correct: "실제로 만난 적 없는 유명인·AI에게 느끼는 일방적 친밀감",
    wrong: ["패러디로 유명해진 소셜미디어 계정", "파라솔 아래서 즐기는 소셜라이프", "사회성이 부족한 성격 유형"],
  },
  {
    term: "바이브 코딩",
    correct: "자연어로 AI에게 시켜서 코드를 작성하게 하는 개발 방식",
    wrong: ["신나는 음악을 들으며 코딩하는 것", "동료와 분위기 맞춰가며 협업하는 개발 문화", "코딩 대회에서 즉흥으로 짜는 코드"],
  },
];

const SLANG_TIERS = [
  { min: 9, max: 10, id: "master", emoji: "🔥", title: "신조어 마스터", subtitle: "찐 잼민이 인정, 트렌드 최전선", color: "#DB2777",
    desc: "요즘 유행하는 신조어를 거의 다 꿰고 있는 트렌드 마스터예요! 새로운 밈이나 유행어가 나와도 바로바로 캐치할 수 있는 감각의 소유자예요." },
  { min: 7, max: 8, id: "insider", emoji: "😎", title: "신조어 인싸러", subtitle: "웬만한 유행어는 다 알아듣는 편", color: "#7C3AED",
    desc: "대부분의 신조어를 알아듣고 자연스럽게 쓸 줄 아는 편이에요. 아주 최신 유행어 몇 개만 조금 더 챙기면 완벽한 트렌드세터가 될 수 있어요." },
  { min: 5, max: 6, id: "average", emoji: "🙂", title: "그럭저럭 따라가는 중", subtitle: "반은 알고 반은 모르는 딱 평균", color: "#F59E0B",
    desc: "아는 신조어도 있고 모르는 신조어도 있는, 딱 평균적인 감각이에요. 조금만 관심을 가지면 금방 트렌드를 따라잡을 수 있어요." },
  { min: 3, max: 4, id: "slow", emoji: "😅", title: "슬슬 감이 안 옴", subtitle: "요즘 애들 말이 어렵게 느껴지는 편", color: "#EA580C",
    desc: "요즘 신조어가 살짝 낯설게 느껴지는 편이에요. 젊은 사람들 대화를 들으면 가끔 '그게 뭔 소리야' 싶을 때가 있을 거예요." },
  { min: 0, max: 2, id: "boss", emoji: "👔", title: "부장님 등극", subtitle: "신조어보다는 정석 국어가 편한 타입", color: "#64748B",
    desc: "신조어와는 조금 거리가 있는 편이에요. 괜찮아요, 모든 유행어를 다 알 필요는 없어요. 그래도 궁금하면 하나씩 찾아보는 재미도 있어요." },
];

function getSlangTier(score) {
  for (var i = 0; i < SLANG_TIERS.length; i++) {
    if (score >= SLANG_TIERS[i].min && score <= SLANG_TIERS[i].max) return SLANG_TIERS[i];
  }
  return SLANG_TIERS[SLANG_TIERS.length - 1];
}

function shuffleArraySlang(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}
