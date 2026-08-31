/* ============================================================
   연애 유형 테스트 - 문항 및 결과 데이터
   ============================================================ */

const LOVESTYLE_QUESTIONS = [
  {
    text: "좋아하는 사람이 생기면 나는?",
    options: [
      { text: "적극적으로 대시한다", score: 2 },
      { text: "친해지면서 자연스럽게 마음을 표현한다", score: 1 },
      { text: "티 안 내고 조심스럽게 다가간다", score: 0 },
    ],
  },
  {
    text: "연인과 매일 연락하는 것에 대해?",
    options: [
      { text: "하루종일 붙어있고 싶다", score: 2 },
      { text: "적당히 주고받으면 좋겠다", score: 1 },
      { text: "자주 연락 안 해도 괜찮다, 각자 시간이 중요", score: 0 },
    ],
  },
  {
    text: "다투고 나면 나는?",
    options: [
      { text: "상황 봐서 먼저 풀거나 기다린다", score: 1 },
      { text: "바로 연락해서 풀어야 마음이 편하다", score: 2 },
      { text: "시간을 두고 감정이 가라앉으면 얘기한다", score: 0 },
    ],
  },
  {
    text: "기념일에 대한 내 생각은?",
    options: [
      { text: "특별히 안 챙겨도 괜찮다", score: 0 },
      { text: "꼭 특별하게 챙기고 싶다", score: 2 },
      { text: "챙기면 좋지만 부담은 싫다", score: 1 },
    ],
  },
  {
    text: "썸 타는 상대에게 나는?",
    options: [
      { text: "어느 정도 밀당은 하되 진심도 보여준다", score: 1 },
      { text: "계속 밀당하며 신중하게 접근한다", score: 0 },
      { text: "마음이 다 티 나게 직진한다", score: 2 },
    ],
  },
  {
    text: "연애할 때 가장 중요한 건?",
    options: [
      { text: "서로의 자유와 독립성", score: 0 },
      { text: "서로에게 몰입하는 깊은 애정", score: 2 },
      { text: "균형잡힌 소통", score: 1 },
    ],
  },
  {
    text: "상대방의 SNS를 챙겨보는 편인가?",
    options: [
      { text: "거의 신경 안 쓴다", score: 0 },
      { text: "자주 확인하고 반응도 잘 남긴다", score: 2 },
      { text: "가끔 확인한다", score: 1 },
    ],
  },
  {
    text: "데이트 코스는 주로?",
    options: [
      { text: "미리 꼼꼼하게 계획한다", score: 2 },
      { text: "적당히 계획하고 적당히 즉흥적으로", score: 1 },
      { text: "즉흥적으로 정해도 좋다", score: 0 },
    ],
  },
  {
    text: "질투심이 생기는 상황이라면?",
    options: [
      { text: "크게 신경 안 쓰고 넘긴다", score: 0 },
      { text: "솔직하게 질투난다고 표현한다", score: 2 },
      { text: "신경은 쓰이지만 티는 안 낸다", score: 1 },
    ],
  },
  {
    text: "이상형에게 가장 바라는 건?",
    options: [
      { text: "편안하게 소통이 잘 되는 사람", score: 1 },
      { text: "뜨겁게 사랑해주는 사람", score: 2 },
      { text: "나만의 공간을 존중해주는 사람", score: 0 },
    ],
  },
];

const LOVESTYLE_MAX_SCORE = LOVESTYLE_QUESTIONS.length * 2; // 20

const LOVESTYLE_RESULTS = [
  {
    id: 1,
    min: 0,
    max: 4,
    emoji: "🦅",
    title: "자유로운 독립연애형",
    subtitle: "연애도 좋지만 내 공간이 더 소중해",
    percentile: "상위 74%",
    summary:
      "연애를 하면서도 나만의 시간과 공간을 소중히 여기는 타입이에요. 상대에게 집착하지 않고 쿨한 매력을 보여주지만, 그만큼 상대가 서운함을 느낄 수도 있으니 가끔은 마음을 더 적극적으로 표현해보는 것도 좋아요.",
    traits: ["독립적인 연애 스타일", "감정 기복이 적음", "자유로운 분위기 선호"],
    color: "#0EA5E9",
    compat: { best: { id: 5, reason: "뜨겁게 다가와주는 상대 덕분에 연애의 설렘을 제대로 느낄 수 있어요." }, worst: { id: 4, reason: "잦은 애정표현이 부담스럽게 느껴질 수 있어요." } },
  },
  {
    id: 2,
    min: 5,
    max: 8,
    emoji: "🍵",
    title: "잔잔한 안정 추구형",
    subtitle: "요란하지 않지만 편안한 연애가 좋아",
    percentile: "상위 51%",
    summary:
      "화려하고 뜨거운 연애보다는 편안하고 안정적인 관계를 추구하는 타입이에요. 서로 부담을 주지 않는 잔잔한 케미를 만들어가는 걸 좋아해요. 가끔은 이벤트나 깜짝 표현으로 관계에 활력을 더해보세요.",
    traits: ["안정적인 관계 선호", "차분한 소통 스타일", "부담 없는 연애 지향"],
    color: "#10B981",
    compat: { best: { id: 3, reason: "적당한 긴장감이 편안한 관계에 활력을 더해줘요." }, worst: { id: 5, reason: "너무 뜨거운 온도차에 지칠 수 있어요." } },
  },
  {
    id: 3,
    min: 9,
    max: 12,
    emoji: "🎣",
    title: "밀당의 고수형",
    subtitle: "적당한 긴장감이 있어야 재밌지",
    percentile: "상위 29%",
    summary:
      "마음을 다 보여주기보다는 적당한 밀당으로 관계에 긴장감을 유지하는 타입이에요. 그 밀고 당기는 재미를 즐기지만, 상대가 진심을 헷갈려할 수 있으니 중요한 순간엔 마음을 명확히 전달하는 게 좋아요.",
    traits: ["능숙한 밀당 스킬", "감정 표현에 신중함", "관계의 주도권을 즐김"],
    color: "#F59E0B",
    compat: { best: { id: 2, reason: "편안하게 받아주는 상대 덕분에 밀당도 부담 없이 즐길 수 있어요." }, worst: { id: 1, reason: "둘 다 마음을 잘 안 보여줘서 관계가 제자리걸음일 수 있어요." } },
  },
  {
    id: 4,
    min: 13,
    max: 16,
    emoji: "💌",
    title: "다정한 로맨티스트형",
    subtitle: "표현하는 사랑이 진짜 사랑이지",
    percentile: "상위 15%",
    summary:
      "생각과 마음을 아끼지 않고 표현하는 다정한 로맨티스트예요. 기념일도 잘 챙기고 애정표현도 풍부해서 연인을 늘 설레게 만들어요. 다만 상대의 온도에 맞춰가는 균형도 함께 신경 써보세요.",
    traits: ["풍부한 애정표현", "기념일을 잘 챙김", "다정하고 세심한 배려"],
    color: "#EC4899",
    compat: { best: { id: 2, reason: "차분하게 받아주는 상대 덕분에 다정함이 더 빛나요." }, worst: { id: 5, reason: "둘 다 감정 기복이 커서 관계가 롤러코스터가 될 수 있어요." } },
  },
  {
    id: 5,
    min: 17,
    max: 20,
    emoji: "🔥",
    title: "올인 불꽃연애형",
    subtitle: "한번 빠지면 화끈하게 올인",
    percentile: "상위 6%",
    summary:
      "연애를 시작하면 온 마음을 다해 뜨겁게 몰입하는 타입이에요. 상대에게 집중하는 만큼 사랑도 크고 깊지만, 감정 기복이 클 수 있으니 가끔은 한 발짝 떨어져서 여유를 가져보는 것도 관계에 도움이 돼요.",
    traits: ["강렬한 몰입형 연애", "풍부한 감정 표현", "상대에게 최선을 다함"],
    color: "#EF4444",
    compat: { best: { id: 1, reason: "적당히 밀고 당겨주는 상대 덕분에 연애가 더 짜릿해져요." }, worst: { id: 4, reason: "둘 다 감정 기복이 커서 관계가 롤러코스터가 될 수 있어요." } },
  },
];

function getLoveStyleResult(score) {
  return (
    LOVESTYLE_RESULTS.find((r) => score >= r.min && score <= r.max) ||
    LOVESTYLE_RESULTS[LOVESTYLE_RESULTS.length - 1]
  );
}

function getLoveStyleById(id) {
  return LOVESTYLE_RESULTS.find((r) => r.id === id);
}
