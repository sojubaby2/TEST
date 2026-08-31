/* ============================================================
   츤데레 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const TSUNDEREINDEX_QUESTIONS = [
  { text: "친구가 고맙다고 말하면 나는?", options: [ { text: "\"별거 아니야\" 하며 괜히 툭 던진다", score: 2 }, { text: "\"고마워하지 않아도 돼\" 라며 쿨하게 넘긴다", score: 1 }, { text: "웃으면서 \"천만에\" 라고 살갑게 받아준다", score: 0 } ] },
  { text: "좋아하는 사람 앞에서 나는?", options: [ { text: "오히려 더 퉁명스럽게 군다", score: 2 }, { text: "평소보다 조금 조용해진다", score: 1 }, { text: "최대한 잘해주고 다정하게 대한다", score: 0 } ] },
  { text: "걱정되는 사람이 있으면 나는?", options: [ { text: "걱정된다는 티는 절대 안 내고 잔소리로 표현한다", score: 2 }, { text: "은근슬쩍 안부만 물어본다", score: 1 }, { text: "걱정된다고 솔직하게 말한다", score: 0 } ] },
  { text: "선물을 준비했을 때 전하는 방식은?", options: [ { text: "\"그냥 남는 거라 준다\" 며 무심하게 건넨다", score: 2 }, { text: "별말 없이 슬쩍 놓고 간다", score: 1 }, { text: "정성껏 포장해서 직접 웃으며 전해준다", score: 0 } ] },
  { text: "상대가 잘한 일이 있으면 나는?", options: [ { text: "칭찬 대신 괜히 딴지를 건다", score: 2 }, { text: "마음속으로만 인정하고 티는 안 낸다", score: 1 }, { text: "대놓고 잘했다고 칭찬해준다", score: 0 } ] },
  { text: "다투고 나서 화해하고 싶을 때 나는?", options: [ { text: "먼저 미안하다곤 못 하고 다른 걸로 풀려고 한다", score: 2 }, { text: "아무 일 없었던 듯 슬쩍 다가간다", score: 1 }, { text: "먼저 다가가서 솔직하게 미안하다고 말한다", score: 0 } ] },
  { text: "상대가 아파 보이면 나는?", options: [ { text: "\"약이나 먹어\" 하고 툭 던지듯 챙긴다", score: 2 }, { text: "걱정되지만 티 안 내고 지켜본다", score: 1 }, { text: "바로 다가가서 괜찮냐고 다정하게 챙긴다", score: 0 } ] },
  { text: "내 마음을 들켰을 때 반응은?", options: [ { text: "아니라고 발뺌부터 한다", score: 2 }, { text: "당황해서 얼버무린다", score: 1 }, { text: "순순히 맞다고 인정한다", score: 0 } ] },
  { text: "상대에게 서운한 게 있을 때 나는?", options: [ { text: "서운하다는 말 대신 괜히 쌀쌀맞게 군다", score: 2 }, { text: "티는 안 내지만 은근히 거리를 둔다", score: 1 }, { text: "서운한 이유를 솔직하게 얘기한다", score: 0 } ] },
  { text: "상대를 챙겨줄 때 나의 표현 방식은?", options: [ { text: "챙겨주면서도 생색은 절대 안 내고 오히려 시크하게 군다", score: 2 }, { text: "조용히 챙기고 티 없이 넘어간다", score: 1 }, { text: "챙겨준다고 확실히 표현하며 다정하게 대한다", score: 0 } ] },
];

const TSUNDEREINDEX_MAX_SCORE = 20;

const TSUNDEREINDEX_RESULTS = [
  {
    id: 1, emoji: "🌻", title: "솔직 다정형", subtitle: "마음을 그대로 보여주는 타입",
    min: 0, max: 4, color: "#F59E0B",
    summary: "좋으면 좋다, 고마우면 고맙다고 바로 표현하는 솔직한 타입. 굳이 돌려 말하지 않아도 다정함이 자연스럽게 드러나서 주변 사람들이 편하게 느끼는 편이야.",
    traits: ["고마운 마음을 바로바로 표현한다", "좋아하는 사람 앞에서 더 다정해진다", "화해할 때 먼저 다가가서 솔직하게 말한다"],
    compat: { best: { id: 4, reason: "츤데레 매력에 웃음이 끊이지 않아 케미가 좋아" }, worst: { id: 5, reason: "표현을 극도로 아끼는 사람 앞에서는 마음을 확인하기 어려워 답답할 수 있어" } },
  },
  {
    id: 2, emoji: "🌤️", title: "은은한 다정러", subtitle: "티는 안 내도 마음은 다 챙기는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "대놓고 살갑진 않지만 은근히 챙겨주는 스타일. 걱정도, 마음도 조용히 표현하는 편이라 알고 보면 다정함이 꽤 진한 타입이야.",
    traits: ["걱정되면 은근슬쩍 안부를 물어본다", "칭찬은 마음속으로만 하고 티는 잘 안 낸다", "챙겨주고도 생색은 잘 안 낸다"],
    compat: { best: { id: 1, reason: "솔직한 사람이 내 은은한 마음을 잘 알아채줘서 편해" }, worst: { id: 4, reason: "둘 다 표현을 아끼면 마음이 전달되기까지 시간이 오래 걸릴 수 있어" } },
  },
  {
    id: 3, emoji: "🌗", title: "숨겨진 다정 중간계", subtitle: "상황 따라 츤데레와 다정 사이를 오가는 타입",
    min: 9, max: 12, color: "#7C3AED",
    summary: "어떤 날은 솔직하게 다정하다가 어떤 날은 괜히 퉁명스러워지는, 종잡을 수 없는 매력의 소유자. 그때그때 기분과 상대에 따라 표현 방식이 달라지는 타입이야.",
    traits: ["기분에 따라 다정함의 온도가 달라진다", "좋아하는 사람 앞에서 오히려 조용해진다", "챙겨줄 땐 챙기면서도 티는 애매하게 낸다"],
    compat: { best: { id: 2, reason: "은은한 다정러와는 서로의 속도를 편하게 맞출 수 있어" }, worst: { id: 5, reason: "둘 다 마음을 숨기면 서로 눈치싸움만 하다 끝날 수 있어" } },
  },
  {
    id: 4, emoji: "🐱", title: "찐 츤데레형", subtitle: "겉바속촉 그 자체인 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "겉으로는 퉁명스럽고 무심해 보이지만 속마음은 누구보다 다정한 타입. 걱정도 챙김도 직접 말로는 못 하고 괜히 툭 던지듯 표현하지만, 알고 보면 다 마음 씀씀이야.",
    traits: ["걱정될수록 잔소리로 표현한다", "선물도 무심한 척 건넨다", "마음을 들키면 일단 발뺌부터 한다"],
    compat: { best: { id: 1, reason: "솔직한 사람이 내 진심을 잘 알아봐줘서 편해" }, worst: { id: 5, reason: "둘 다 표현을 극도로 아끼면 마음이 영영 전달 안 될 수도 있어" } },
  },
  {
    id: 5, emoji: "🧊", title: "완전체 츤데레", subtitle: "다정함을 꽁꽁 숨기는 데 도가 튼 타입",
    min: 17, max: 20, color: "#0891B2",
    summary: "마음속엔 누구보다 따뜻한 게 가득한데, 겉으로 드러내는 데는 진심으로 서툰 타입. 챙겨주면서도 시크한 태도를 유지하는 능력이 거의 예술 수준이야. 가끔은 솔직한 말 한마디가 큰 힘이 될 수 있다는 걸 기억해줘.",
    traits: ["칭찬 대신 괜히 딴지부터 건다", "화해하고 싶어도 먼저 미안하다는 말이 안 나온다", "다정함은 오직 행동으로만 표현한다"],
    compat: { best: { id: 1, reason: "솔직한 사람이 숨겨진 진심을 잘 캐치해줘서 마음이 편해져" }, worst: { id: 4, reason: "둘 다 마음을 숨기기 바쁘면 서로 오해가 쌓일 수 있어" } },
  },
];

function getTsundereIndexResult(score) {
  return TSUNDEREINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || TSUNDEREINDEX_RESULTS[TSUNDEREINDEX_RESULTS.length - 1];
}

function getTsundereIndexById(id) {
  return TSUNDEREINDEX_RESULTS.find((r) => r.id === Number(id));
}
