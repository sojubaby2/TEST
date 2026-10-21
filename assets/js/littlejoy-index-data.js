/* ============================================================
   소확행 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const LITTLEJOYINDEX_QUESTIONS = [
  {
    text: "퇴근 후, 낮에 빨아서 바싹 말린 이불 속으로 들어갔다.",
    options: [
      { text: "이불에 얼굴 묻고 \"아 이 냄새…\" 10초 정지", score: 2 },
      { text: "들어가자마자 폰 보다 그대로 잠듦", score: 0 },
      { text: "\"오 보송하다\" 한마디 하고 눕기", score: 1 },
    ],
  },
  {
    text: "편의점에서 산 신상 디저트를 한 입 먹었다.",
    options: [
      { text: "눈 감고 음미, 바로 친구한테 사진 전송", score: 2 },
      { text: "폰 보면서 먹다 보니 어느새 빈 껍질", score: 0 },
      { text: "'다음에 또 사야지' 하고 이름 기억해 둠", score: 1 },
    ],
  },
  {
    text: "퇴근 버스, 셔플 재생에서 내 인생곡이 흘러나왔다.",
    options: [
      { text: "창밖 보며 뮤직비디오 주인공 빙의", score: 2 },
      { text: "노래 바뀐 줄도 모르고 웹툰 정주행", score: 0 },
      { text: "볼륨을 두 칸 올림", score: 1 },
    ],
  },
  {
    text: "점심 먹고 나왔더니 하늘이 유난히 파랗고 바람이 선선하다.",
    options: [
      { text: "사무실 복귀 전 한 바퀴 더 돌며 하늘 사진", score: 2 },
      { text: "하늘은 안 보고 사무실로 직행", score: 0 },
      { text: "단톡방에 \"날씨 미쳤다\" 한 줄", score: 1 },
    ],
  },
  {
    text: "기다리던 택배가 문 앞에 도착했다.",
    options: [
      { text: "테이프를 천천히 뜯으며 언박싱 의식 거행", score: 2 },
      { text: "내용물만 확인하고 상자째 구석에 둠", score: 0 },
      { text: "꺼내서 \"오\" 하고 한 번 써 봄", score: 1 },
    ],
  },
  {
    text: "아침 출근길, 빵집 앞에서 갓 구운 빵 냄새가 훅 들어온다.",
    options: [
      { text: "숨 크게 들이마시고 오늘은 좋은 날이라 확신", score: 2 },
      { text: "냄새가 났나? 못 느끼고 지나침", score: 0 },
      { text: "\"냄새 좋다\" 하고 걸음을 살짝 늦춤", score: 1 },
    ],
  },
  {
    text: "일요일, 약속도 할 일도 없이 하루가 통째로 비었다.",
    options: [
      { text: "이불 속에서 \"이게 천국이지\"", score: 2 },
      { text: "오후 2시쯤 심심해서 아무나 불러냄", score: 0 },
      { text: "낮잠 한 판 자고 나니 그럭저럭 괜찮음", score: 1 },
    ],
  },
  {
    text: "걷기 앱에 '오늘 10,000보 달성!' 알림이 떴다.",
    options: [
      { text: "캡처해 두고 상으로 아이스크림 하나", score: 2 },
      { text: "알림 밀어서 지우고 끝", score: 0 },
      { text: "\"오, 좀 걸었네\" 하고 숫자만 확인", score: 1 },
    ],
  },
  {
    text: "숏폼 피드에 아기 강아지가 하품하다 넘어지는 영상이 떴다.",
    options: [
      { text: "다섯 번 돌려 보고 저장까지", score: 2 },
      { text: "1초 보고 다음 영상으로 스와이프", score: 0 },
      { text: "피식 웃고 넘김", score: 1 },
    ],
  },
  {
    text: "자기 전 불 끄고 누웠는데 오늘 하루가 스쳐 간다.",
    options: [
      { text: "김치찌개, 노을, 칭찬 한마디… 줄줄이 떠오름", score: 2 },
      { text: "\"오늘 뭐 했더라?\" 기억이 안 남", score: 0 },
      { text: "그래도 아침 커피 맛있었던 건 떠오름", score: 1 },
    ],
  },
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
