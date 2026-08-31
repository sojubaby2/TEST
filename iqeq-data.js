/* ============================================================
   IQ/EQ 테스트 - 문항 및 결과 데이터
   ※ 재미로 즐기는 콘텐츠이며 공인된 IQ/EQ 검사가 아닙니다.
   ============================================================ */

// IQ 파트: 정답이 있는 논리 문제 (맞으면 1점, 틀리면 0점)
const IQEQ_IQ_QUESTIONS = [
  {
    type: "iq",
    text: "규칙을 찾아 빈칸에 들어갈 숫자는? 1, 3, 6, 10, __",
    options: [
      { text: "14", score: 0 },
      { text: "15", score: 1 },
      { text: "16", score: 0 },
    ],
  },
  {
    type: "iq",
    text: "의사 : 병원 = 교사 : ?",
    options: [
      { text: "학생", score: 0 },
      { text: "학교", score: 1 },
      { text: "칠판", score: 0 },
    ],
  },
  {
    type: "iq",
    text: "규칙을 찾아 빈칸에 들어갈 숫자는? 3, 6, 12, 24, __",
    options: [
      { text: "30", score: 0 },
      { text: "36", score: 0 },
      { text: "48", score: 1 },
    ],
  },
  {
    type: "iq",
    text: "다음 중 성격이 다른 하나는?",
    options: [
      { text: "사과", score: 0 },
      { text: "당근", score: 1 },
      { text: "포도", score: 0 },
    ],
  },
  {
    type: "iq",
    text: "어떤 수에 5를 더하고 2를 곱했더니 20이 되었다. 그 수는?",
    options: [
      { text: "5", score: 1 },
      { text: "10", score: 0 },
      { text: "8", score: 0 },
    ],
  },
  {
    type: "iq",
    text: "규칙을 찾아 빈칸에 들어갈 알파벳은? A, C, E, G, __",
    options: [
      { text: "H", score: 0 },
      { text: "I", score: 1 },
      { text: "J", score: 0 },
    ],
  },
];

// EQ 파트: 시나리오형 문제 (0~2점, 감정 인식/공감/조절 능력을 반영)
const IQEQ_EQ_QUESTIONS = [
  {
    type: "eq",
    text: "친구가 우울한 표정으로 대화 중 자꾸 말을 흐린다면 나는?",
    options: [
      { text: "별생각 없이 그냥 넘어간다", score: 0 },
      { text: "이상하다고 느끼지만 먼저 묻지는 않는다", score: 1 },
      { text: "\"무슨 일 있어? 괜찮아?\" 하고 먼저 물어본다", score: 2 },
    ],
  },
  {
    type: "eq",
    text: "화가 나는 상황에서 나는 주로?",
    options: [
      { text: "감정이 격해져서 바로 표출한다", score: 0 },
      { text: "잠깐 참지만 티가 난다", score: 1 },
      { text: "잠시 감정을 가라앉히고 차분하게 표현한다", score: 2 },
    ],
  },
  {
    type: "eq",
    text: "상대방이 나에게 서운한 티를 낼 때 나는?",
    options: [
      { text: "왜 그러는지 잘 모르겠고 신경 안 쓴다", score: 0 },
      { text: "눈치는 채지만 어떻게 반응해야 할지 모르겠다", score: 1 },
      { text: "상대의 감정을 먼저 살피고 대화로 풀어간다", score: 2 },
    ],
  },
  {
    type: "eq",
    text: "스트레스를 받을 때 나는?",
    options: [
      { text: "주변 사람들에게 짜증을 내기도 한다", score: 0 },
      { text: "티 내지 않으려 하지만 속으로 쌓인다", score: 1 },
      { text: "스스로 감정을 잘 조절하고 해소하는 방법을 안다", score: 2 },
    ],
  },
  {
    type: "eq",
    text: "팀 회의에서 의견 충돌이 생기면 나는?",
    options: [
      { text: "내 의견을 강하게 밀어붙인다", score: 0 },
      { text: "일단 상황을 지켜본다", score: 1 },
      { text: "양쪽 입장을 듣고 중재하려 한다", score: 2 },
    ],
  },
  {
    type: "eq",
    text: "다른 사람의 성공 소식을 들었을 때 내 감정은?",
    options: [
      { text: "솔직히 질투나 비교하는 마음이 먼저 든다", score: 0 },
      { text: "무덤덤하다", score: 1 },
      { text: "진심으로 축하해주는 마음이 먼저 든다", score: 2 },
    ],
  },
];

// 퀴즈 진행 순서: IQ 먼저, EQ 나중
const IQEQ_QUESTIONS = IQEQ_IQ_QUESTIONS.concat(IQEQ_EQ_QUESTIONS);

const IQEQ_MAX_IQ = IQEQ_IQ_QUESTIONS.length; // 6
const IQEQ_MAX_EQ = IQEQ_EQ_QUESTIONS.length * 2; // 12

/*
  4분면 결과: IQ 절반 이상(>=3)이면 "고IQ", 미만이면 "직관형"
              EQ 절반 이상(>=6)이면 "고EQ", 미만이면 "자유형"
*/
const IQEQ_RESULTS = [
  {
    id: "iq-hi-eq-hi",
    emoji: "🦉",
    title: "천재 전략가형",
    subtitle: "똑똑한 두뇌 + 따뜻한 마음까지",
    summary:
      "논리적으로 문제를 잘 풀어내면서도 사람의 감정까지 세심하게 살필 줄 아는 타입이에요. 일도 관계도 다 챙기는 만능형이라 어디서든 신뢰받는 사람이 될 가능성이 높아요. 다만 너무 완벽하려다 스스로를 몰아붙이지 않게 조심하세요.",
    traits: ["논리적 문제 해결력", "뛰어난 공감능력", "일과 관계 모두 잘 챙김"],
    color: "#1E3A5F",
    compat: {
      best: { id: "iq-lo-eq-lo", reason: "당신의 치밀함에 자유로움을 더해주는 상대라 새로운 균형을 찾을 수 있어요." },
      worst: { id: "iq-hi-eq-lo", reason: "둘 다 논리로 밀어붙이려다 보니 대화가 토론이 되기 쉬워요." },
    },
  },
  {
    id: "iq-hi-eq-lo",
    emoji: "🧪",
    title: "괴짜 천재형",
    subtitle: "번뜩이는 두뇌, 살짝 서투른 감정 표현",
    summary:
      "논리와 분석에 강한 타입이에요. 문제를 빠르고 정확하게 풀어내지만, 감정 표현이나 눈치 보는 건 살짝 서투른 편이에요. 주변에서 '똑똑한데 가끔 뜬금없다'는 얘기를 들어본 적 있을지도 몰라요. 그 엉뚱함이 사실 큰 매력이에요.",
    traits: ["뛰어난 논리력", "직설적인 화법", "감정 표현엔 다소 서투름"],
    color: "#0E7490",
    compat: {
      best: { id: "iq-lo-eq-hi", reason: "당신의 부족한 공감력을 채워주는 든든한 상대예요." },
      worst: { id: "iq-hi-eq-hi", reason: "둘 다 논리로 밀어붙이려다 보니 대화가 토론이 되기 쉬워요." },
    },
  },
  {
    id: "iq-lo-eq-hi",
    emoji: "🤝",
    title: "인간관계 마스터형",
    subtitle: "숫자보다 사람이 먼저인 타입",
    summary:
      "복잡한 논리 문제보다는 사람 마음을 읽는 데 훨씬 강한 타입이에요. 눈치가 빠르고 공감을 잘해줘서 곁에 있으면 편안한 사람이라는 얘기를 자주 들어요. 정답이 없는 상황에서 특히 빛을 발하는 스타일이에요.",
    traits: ["뛰어난 공감능력", "빠른 눈치와 센스", "관계를 부드럽게 이끎"],
    color: "#EA580C",
    compat: {
      best: { id: "iq-hi-eq-lo", reason: "엉뚱한 매력의 상대를 잘 이해해주고 챙겨줄 수 있어요." },
      worst: { id: "iq-lo-eq-lo", reason: "둘 다 계획성이 부족해서 관계가 붕 뜰 수 있어요." },
    },
  },
  {
    id: "iq-lo-eq-lo",
    emoji: "🦋",
    title: "자유로운 영혼형",
    subtitle: "논리보다 직감, 계획보다 즉흥",
    summary:
      "논리적인 분석이나 감정 계산보다는 타고난 직감과 즉흥적인 매력으로 사는 타입이에요. 계획에 얽매이지 않고 그때그때 순간을 즐길 줄 알아서 주변 사람들을 편안하게 만들어줘요. 가끔은 그 자유로움이 최고의 무기가 돼요.",
    traits: ["뛰어난 직감", "즉흥적이고 자유로운 성향", "긍정적인 에너지"],
    color: "#7C3AED",
    compat: {
      best: { id: "iq-hi-eq-hi", reason: "당신의 자유로움을 든든하게 받쳐주는 상대예요." },
      worst: { id: "iq-lo-eq-hi", reason: "둘 다 계획성이 부족해서 관계가 붕 뜰 수 있어요." },
    },
  },
];

function getIqEqResult(iqScore, eqScore) {
  const iqHigh = iqScore >= Math.ceil(IQEQ_MAX_IQ / 2);
  const eqHigh = eqScore >= Math.ceil(IQEQ_MAX_EQ / 2);
  const id = "iq-" + (iqHigh ? "hi" : "lo") + "-eq-" + (eqHigh ? "hi" : "lo");
  return getIqEqById(id) || IQEQ_RESULTS[0];
}

function getIqEqById(id) {
  return IQEQ_RESULTS.find((r) => r.id === id);
}
