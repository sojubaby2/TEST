/* ============================================================
   테토-에겐 테스트 - 문항 및 결과 데이터
   ※ 성별에 대한 고정관념이 아닌, 재미로 즐기는 에너지 타입 콘텐츠입니다.
   ============================================================ */

const TETOEGEN_QUESTIONS = [
  {
    text: "친구들 사이에서 나는 주로?",
    options: [
      { text: "조용히 분위기를 맞추는 편", score: 0 },
      { text: "앞장서서 이끄는 편", score: 2 },
      { text: "상황 봐가며 나설 때는 나선다", score: 1 },
    ],
  },
  {
    text: "스타일링 할 때 나는?",
    options: [
      { text: "꾸미는 걸 좋아하고 디테일에 신경 쓴다", score: 0 },
      { text: "심플하고 터프한 스타일을 선호한다", score: 2 },
      { text: "편한 대로 적당히 신경 쓴다", score: 1 },
    ],
  },
  {
    text: "감정 표현 방식은?",
    options: [
      { text: "섬세하고 감정을 잘 드러내는 편", score: 0 },
      { text: "웬만해선 티 안 내는 편", score: 2 },
      { text: "상황에 따라 다르다", score: 1 },
    ],
  },
  {
    text: "연애할 때 나는?",
    options: [
      { text: "내가 먼저 이끌고 리드하는 편", score: 2 },
      { text: "서로 맞춰가는 편", score: 1 },
      { text: "상대에게 잘 맞춰주고 배려하는 편", score: 0 },
    ],
  },
  {
    text: "힘든 일이 생기면?",
    options: [
      { text: "상황 봐서 털어놓거나 참는다", score: 1 },
      { text: "혼자 해결하고 넘어가는 편", score: 2 },
      { text: "주변에 털어놓고 위로받고 싶다", score: 0 },
    ],
  },
  {
    text: "운동/액티비티에 대한 내 취향은?",
    options: [
      { text: "종류 상관없이 적당히 좋아함", score: 1 },
      { text: "몸을 쓰는 격한 운동을 좋아함", score: 2 },
      { text: "격렬한 운동보다 산책 같은 가벼운 활동", score: 0 },
    ],
  },
  {
    text: "목소리 톤이나 말투는?",
    options: [
      { text: "부드럽고 조곤조곤한 편", score: 0 },
      { text: "시원시원하고 직설적인 편", score: 2 },
      { text: "보통", score: 1 },
    ],
  },
  {
    text: "인간관계에서 나는 주로 어떤 말을 들을까?",
    options: [
      { text: "잘 챙겨주고 다정하다는 말", score: 0 },
      { text: "쿨하고 터프하다는 말", score: 2 },
      { text: "그때그때 다르다는 말", score: 1 },
    ],
  },
  {
    text: "갈등 상황에서 나는?",
    options: [
      { text: "최대한 부드럽게 풀려고 한다", score: 0 },
      { text: "할 말은 하고 직진하는 편", score: 2 },
      { text: "상황에 따라 다르게 대처한다", score: 1 },
    ],
  },
  {
    text: "나를 한마디로 표현한다면?",
    options: [
      { text: "상남자st, 걸크러시", score: 2 },
      { text: "여리여리, 다정", score: 0 },
      { text: "무난, 중간", score: 1 },
    ],
  },
];

const TETOEGEN_MAX_SCORE = TETOEGEN_QUESTIONS.length * 2; // 20

/*
  4가지 결과: teto-m(테토남), teto-f(테토녀), egen-m(에겐남), egen-f(에겐녀)
  성별(gender: "m" | "f")과 점수(score: 0~20, 10 이상이면 테토 / 미만이면 에겐)로 결정됨
*/
const TETOEGEN_RESULTS = [
  {
    id: "teto-m",
    gender: "m",
    type: "teto",
    emoji: "🦁",
    title: "테토남",
    subtitle: "상남자st 에너지, 든든한 리더 타입",
    summary:
      "시원시원하고 주도적인 테토 에너지가 강한 타입이에요. 눈치 안 보고 할 말은 하는 편이라 곁에 있으면 든든하다는 얘기를 자주 들어요. 감정 표현에 서툴러 보일 때도 있지만, 그만큼 위기 상황에서 믿음직한 모습을 보여줘요.",
    traits: ["직진적이고 솔직한 성격", "리더십이 강한 편", "감정 표현엔 다소 서투름"],
    color: "#1E3A8A",
    compat: {
      best: { id: "egen-f", reason: "정반대의 매력에 끌려요. 시원시원한 당신과 여리여리한 상대가 서로를 완성해줘요." },
      worst: { id: "teto-f", reason: "둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요." },
    },
  },
  {
    id: "teto-f",
    gender: "f",
    type: "teto",
    emoji: "🐯",
    title: "테토녀",
    subtitle: "걸크러시 에너지, 확실한 자기주장",
    summary:
      "눈치 보지 않고 당당하게 자기 의견을 말하는 걸크러시 타입이에요. 씩씩하고 쿨한 매력으로 주변 사람들을 이끄는 힘이 있어요. 부드러운 매력보다는 명확하고 시원한 매력으로 어필하는 편이에요.",
    traits: ["당당하고 자기주장이 확실함", "쿨하고 시원시원한 성격", "위기에 강한 멘탈"],
    color: "#9F1239",
    compat: {
      best: { id: "egen-m", reason: "부드럽게 맞춰주는 상대 덕분에 당신의 매력이 더 빛나요." },
      worst: { id: "teto-m", reason: "둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요." },
    },
  },
  {
    id: "egen-m",
    gender: "m",
    type: "egen",
    emoji: "🐰",
    title: "에겐남",
    subtitle: "부드럽고 섬세한, 다정한 에너지",
    summary:
      "다정하고 섬세한 에겐 에너지가 강한 타입이에요. 상대방의 감정을 잘 살피고 배려심이 깊어서 편안한 사람이라는 얘기를 자주 들어요. 꾸미는 것에도 관심이 많고 감성적인 매력이 돋보여요.",
    traits: ["섬세하고 배려심이 깊음", "감성적이고 다정한 편", "스타일에 관심이 많음"],
    color: "#7C3AED",
    compat: {
      best: { id: "teto-f", reason: "당당하게 리드해주는 상대 덕분에 편하게 마음을 열 수 있어요." },
      worst: { id: "egen-f", reason: "둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요." },
    },
  },
  {
    id: "egen-f",
    gender: "f",
    type: "egen",
    emoji: "🌸",
    title: "에겐녀",
    subtitle: "사랑스럽고 여린, 감성 충만 타입",
    summary:
      "여리여리하고 사랑스러운 에겐 에너지가 강한 타입이에요. 감정 표현이 풍부하고 공감을 잘해줘서 편안하게 마음을 털어놓고 싶은 사람이라는 얘기를 들어요. 부드러운 매력으로 주변을 편안하게 만들어줘요.",
    traits: ["감정 표현이 풍부함", "공감능력이 뛰어남", "부드럽고 사랑스러운 매력"],
    color: "#DB2777",
    compat: {
      best: { id: "teto-m", reason: "든든하게 이끌어주는 상대라 편안하게 기댈 수 있어요." },
      worst: { id: "egen-m", reason: "둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요." },
    },
  },
];

function getTetoEgenResult(score, gender) {
  const type = score >= 10 ? "teto" : "egen";
  return (
    TETOEGEN_RESULTS.find((r) => r.type === type && r.gender === gender) ||
    TETOEGEN_RESULTS[0]
  );
}

function getTetoEgenById(id) {
  return TETOEGEN_RESULTS.find((r) => r.id === id);
}
