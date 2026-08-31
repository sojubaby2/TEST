/* ============================================================
   로맨티스트 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const ROMANTICINDEX_QUESTIONS = [
  { text: "연인과의 기념일이 다가오면 나는?", options: [ { text: "몇 주 전부터 이벤트를 준비한다", score: 2 }, { text: "그날그날 흘러가는 대로 보낸다", score: 0 }, { text: "간단하게라도 챙긴다", score: 1 } ] },
  { text: "연인에게 편지나 손글씨 메시지를 쓰는 것에 대해 나는?", options: [ { text: "기회가 있을 때마다 정성껏 써준다", score: 2 }, { text: "손발이 오그라들어서 잘 못 쓴다", score: 0 }, { text: "가끔 짧게라도 쓴다", score: 1 } ] },
  { text: "영화나 드라마에서 로맨틱한 장면이 나오면 나는?", options: [ { text: "나도 저런 순간을 만들고 싶어진다", score: 2 }, { text: "그냥 스토리로만 본다", score: 0 }, { text: "괜찮다 싶으면 여운이 좀 남는다", score: 1 } ] },
  { text: "데이트 장소를 고를 때 나는?", options: [ { text: "특별한 분위기의 장소를 미리 찾아본다", score: 2 }, { text: "편하고 익숙한 곳이면 충분하다", score: 0 }, { text: "분위기도 어느 정도 고려한다", score: 1 } ] },
  { text: "상대방의 사소한 습관이나 취향을 기억하는 편은?", options: [ { text: "작은 것 하나까지 다 메모해둔다", score: 2 }, { text: "가끔 까먹는다", score: 0 }, { text: "중요한 건 기억해두는 편이다", score: 1 } ] },
  { text: "길을 걷다 예쁜 꽃이나 소품을 보면 나는?", options: [ { text: "연인 생각이 나서 사진을 찍거나 사고 싶어진다", score: 2 }, { text: "그냥 지나친다", score: 0 }, { text: "예쁘다고 생각만 하고 지나간다", score: 1 } ] },
  { text: "커플 이벤트(백일, 1주년 등)를 챙기는 것에 대해 나는?", options: [ { text: "작은 숫자 하나까지 다 챙긴다", score: 2 }, { text: "숫자에 큰 의미를 두지 않는다", score: 0 }, { text: "적당히 의미 있는 날만 챙긴다", score: 1 } ] },
  { text: "연인과 다툰 후 화해할 때 나는?", options: [ { text: "직접 손편지나 이벤트로 마음을 표현한다", score: 2 }, { text: "시간이 지나면 자연스럽게 풀린다고 생각한다", score: 0 }, { text: "대화로 차분히 풀어간다", score: 1 } ] },
  { text: "SNS에 연인과의 사진을 올리는 것에 대해 나는?", options: [ { text: "순간순간을 기록하듯 자주 올린다", score: 2 }, { text: "굳이 잘 안 올린다", score: 0 }, { text: "가끔 기념삼아 올린다", score: 1 } ] },
  { text: "좋아하는 노래 가사나 시를 보면 나는?", options: [ { text: "나도 모르게 상대방이 떠오른다", score: 2 }, { text: "그냥 좋은 문장이다 정도로 넘긴다", score: 0 }, { text: "가끔 마음에 와닿는 구절이 있다", score: 1 } ] },
];

const ROMANTICINDEX_MAX_SCORE = 20;

const ROMANTICINDEX_RESULTS = [
  {
    id: 1, emoji: "😎", title: "현실주의 츤데레", subtitle: "표현보다 행동으로 마음을 보여주는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "이벤트보다는 편안하고 진솔한 연애를 선호하는 타입이야. 로맨틱한 말은 서툴지만, 그만큼 마음은 은근히 깊은 편이지.",
    traits: ["표현보다 행동으로 마음을 보여준다", "꾸밈없는 편안한 연애를 좋아한다", "이벤트에 크게 연연하지 않는다"],
    compat: { best: { id: 3, reason: "적당히 챙기는 3번 유형과 만나면 무리 없이 균형이 맞을 수 있어" }, worst: { id: 5, reason: "이벤트에 진심인 5번 유형과는 온도차로 서운함이 생길 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "잔잔한 진심파", subtitle: "꾸준한 마음 표현을 더 중요하게 여기는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "화려한 이벤트보단 소소하고 꾸준한 마음 표현을 더 중요하게 생각하는 편이야. 요란하진 않아도 진심은 확실하게 전하는 스타일.",
    traits: ["큰 이벤트보다 꾸준함을 더 중요하게 여긴다", "잔잔하지만 진심 어린 표현을 좋아한다", "무리하지 않는 선에서 마음을 챙긴다"],
    compat: { best: { id: 4, reason: "다정한 4번 유형의 이벤트를 편안하게 받아줄 수 있어" }, worst: { id: 5, reason: "이벤트에 대한 기대치 차이로 5번 유형은 조금 서운해할 수 있어" } },
  },
  {
    id: 3, emoji: "💛", title: "적당히 다정한 균형러", subtitle: "챙길 건 챙기고 편할 땐 편한 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "챙길 건 챙기고 편할 땐 편하게, 균형 잡힌 로맨스를 추구하는 타입이야. 과하지도 부족하지도 않은 딱 좋은 온도를 유지해.",
    traits: ["상황에 맞게 로맨틱함을 조절한다", "기념일은 챙기되 무리하지는 않는다", "편안함과 설렘을 둘 다 중요하게 여긴다"],
    compat: { best: { id: 1, reason: "무심한 듯 진심인 1번 유형과 무리 없는 케미를 보여줄 수 있어" }, worst: { id: 5, reason: "이벤트에 진심인 5번 유형에겐 조금 밋밋하게 느껴질 수 있어" } },
  },
  {
    id: 4, emoji: "💕", title: "이벤트 준비왕", subtitle: "기념일과 서프라이즈를 좋아하는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "기념일과 서프라이즈를 꽤 좋아하는 편이야. 상대방을 위한 작은 이벤트를 자주 계획하고, 그 순간을 준비하는 것 자체를 즐겨.",
    traits: ["작은 이벤트를 자주 계획한다", "서프라이즈 준비를 즐긴다", "기념일을 놓치지 않고 챙긴다"],
    compat: { best: { id: 2, reason: "잔잔하게 받아주는 2번 유형과 있으면 부담 없이 이벤트를 즐길 수 있어" }, worst: { id: 1, reason: "무심한 1번 유형과는 온도차로 서운함이 생길 수 있어" } },
  },
  {
    id: 5, emoji: "💐", title: "감성 폭발 로맨티스트", subtitle: "모든 순간을 특별하게 만들고 싶은 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "사랑에 있어서만큼은 낭만 그 자체인 타입이야. 편지, 이벤트, 기념일까지 모든 순간을 특별하게 만들고 싶어하는, 로맨스 영화 주인공 같은 스타일.",
    traits: ["작은 순간도 특별하게 만들고 싶어한다", "표현을 아끼지 않는다", "연애에 진심을 다한다"],
    compat: { best: { id: 2, reason: "잔잔하게 중심을 잡아주는 2번 유형과 있으면 안정적인 균형을 이룰 수 있어" }, worst: { id: 1, reason: "무심한 1번 유형의 반응에 서운함을 느낄 수 있어" } },
  },
];

function getRomanticIndexResult(score) {
  return ROMANTICINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || ROMANTICINDEX_RESULTS[ROMANTICINDEX_RESULTS.length - 1];
}

function getRomanticIndexById(id) {
  return ROMANTICINDEX_RESULTS.find((r) => r.id === Number(id));
}
