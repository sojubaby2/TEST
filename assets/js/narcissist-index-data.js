/* ============================================================
   나르시시스트 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const NARCISSISTINDEX_QUESTIONS = [
  { text: "단체 사진을 받으면 나는?", options: [ { text: "내가 잘 나왔는지부터 확인한다", score: 2 }, { text: "다 같이 잘 나왔는지 본다", score: 0 }, { text: "그냥 재밌게 봤다는 정도로 넘긴다", score: 1 } ] },
  { text: "대화 중 화제가 갑자기 다른 사람 쪽으로 넘어가면?", options: [ { text: "은근히 다시 내 얘기로 돌리고 싶어진다", score: 2 }, { text: "딱히 신경 안 쓰인다", score: 0 }, { text: "잠깐 아쉽지만 곧 잊는다", score: 1 } ] },
  { text: "엘리베이터나 상점 유리창에 내 모습이 비치면?", options: [ { text: "나도 모르게 한 번 더 보게 된다", score: 2 }, { text: "거의 신경 안 쓴다", score: 0 }, { text: "가끔 흘깃 본다", score: 1 } ] },
  { text: "SNS에 올린 사진 반응이 예상보다 적으면?", options: [ { text: "왜 반응이 적은지 은근히 신경 쓰인다", score: 2 }, { text: "딱히 상관없다, 원래 그런 거지", score: 0 }, { text: "조금 아쉽지만 금방 잊는다", score: 1 } ] },
  { text: "누군가 나를 칭찬하면 나는?", options: [ { text: "속으로 \"그치, 알고 있었어\" 한다", score: 2 }, { text: "민망해서 얼른 화제를 돌린다", score: 0 }, { text: "고맙다고 하고 살짝 기분 좋아한다", score: 1 } ] },
  { text: "친구들과 얘기할 때 대화 주제는 주로?", options: [ { text: "자연스럽게 내 얘기로 흘러간다", score: 2 }, { text: "상대방 얘기를 듣는 게 더 편하다", score: 0 }, { text: "서로 번갈아가며 얘기하는 편이다", score: 1 } ] },
  { text: "내가 잘한 일이 있는데 아무도 몰라주면?", options: [ { text: "은근슬쩍 티를 낸다", score: 2 }, { text: "알아주지 않아도 딱히 상관없다", score: 0 }, { text: "조금 서운하지만 티는 안 낸다", score: 1 } ] },
  { text: "옷을 살 때 가장 중요하게 생각하는 건?", options: [ { text: "내가 얼마나 돋보이는지", score: 2 }, { text: "편하고 무난한지", score: 0 }, { text: "어느 정도 스타일은 신경 쓴다", score: 1 } ] },
  { text: "누군가 나에게 비판적인 피드백을 하면?", options: [ { text: "일단 방어부터 하고 싶어진다", score: 2 }, { text: "맞는 말이면 순순히 받아들인다", score: 0 }, { text: "조금 찔리지만 곱씹어본다", score: 1 } ] },
  { text: "내 인생 영화를 만든다면 주인공은?", options: [ { text: "당연히 나", score: 2 }, { text: "딱히 내가 주인공일 필요는 없다", score: 0 }, { text: "내가 주인공이면 재밌긴 하겠다", score: 1 } ] },
];

const NARCISSISTINDEX_MAX_SCORE = 20;

const NARCISSISTINDEX_RESULTS = [
  {
    id: 1, emoji: "🌱", title: "겸손 만렙형", subtitle: "나보다 상대를 먼저 챙기는 타입",
    min: 0, max: 4, color: "#16A34A",
    summary: "스스로를 앞세우기보다 주변을 먼저 살피는 타입. 칭찬을 받으면 오히려 민망해하고, 남이 잘 되는 걸 진심으로 기뻐해줄 줄 아는 사람이야. 가끔은 너무 겸손해서 네 매력을 스스로 못 알아채는 게 아쉬울 정도.",
    traits: ["칭찬을 받으면 손사래부터 친다", "내 얘기보다 남의 얘기를 듣는 게 더 편하다", "가끔은 나를 좀 더 어필해도 좋을 텐데 싶다"],
    compat: { best: { id: 3, reason: "적당한 자신감을 가진 사람과 있으면 서로 밀어주고 끌어주는 밸런스가 좋아" }, worst: { id: 5, reason: "매사 주인공 자리를 원하는 사람 옆에서는 계속 뒷전으로 밀릴 수 있어" } },
  },
  {
    id: 2, emoji: "🌤️", title: "은은한 자신감형", subtitle: "티 안 나게 자존감 챙기는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "나서서 자랑하진 않지만 스스로에 대한 만족감은 꽤 단단한 편. 남 눈치 보느라 위축되지도 않고, 그렇다고 과하게 자기 자랑을 하지도 않는 균형잡힌 타입이야.",
    traits: ["칭찬받으면 속으로 은근히 기분 좋아한다", "자랑은 안 해도 자존감은 낮지 않다", "필요할 때만 존재감을 드러낸다"],
    compat: { best: { id: 4, reason: "화려하게 나서는 사람 옆에서 편하게 서포트 역할을 즐길 수 있어" }, worst: { id: 1, reason: "둘 다 나서지 않으려 하면 대화가 붕 뜰 수 있어" } },
  },
  {
    id: 3, emoji: "✨", title: "적당한 주인공병", subtitle: "필요할 땐 나서고 아닐 땐 물러날 줄 아는 타입",
    min: 9, max: 12, color: "#7C3AED",
    summary: "내 얘기를 하는 것도 즐기고 남의 얘기를 들어주는 것도 즐기는, 밸런스형 인간. 가끔 스포트라이트를 받고 싶어지지만 눈치껏 선을 지킬 줄 알아.",
    traits: ["칭찬은 감사히, 비판은 담백하게 받아들인다", "대화 주도권을 잡을 때도 뺏길 때도 있다", "적당히 나서고 적당히 물러난다"],
    compat: { best: { id: 1, reason: "겸손한 사람과 있으면 자연스럽게 대화를 이끄는 역할을 맡을 수 있어" }, worst: { id: 5, reason: "매번 스포트라이트를 양보 안 하는 사람과는 은근히 부딪힐 수 있어" } },
  },
  {
    id: 4, emoji: "🌟", title: "화려한 스포트라이트형", subtitle: "있는 존재감 숨기지 못하는 타입",
    min: 13, max: 16, color: "#F59E0B",
    summary: "어디서든 자연스럽게 시선을 끌고, 자신감 넘치는 말과 행동으로 분위기를 주도하는 편. 자기애가 강해서 스스로를 아끼는 만큼 가끔 주변을 덜 살필 때도 있어.",
    traits: ["단체 사진에서 내 얼굴부터 확인한다", "칭찬받는 걸 당연하게 여긴다", "대화 주제가 자연스레 내 쪽으로 온다"],
    compat: { best: { id: 2, reason: "은은하게 챙겨주는 사람과 있으면 내 매력이 더 빛날 수 있어" }, worst: { id: 1, reason: "너무 겸손한 사람 옆에서는 혼자 떠드는 느낌이 들 수 있어" } },
  },
  {
    id: 5, emoji: "👑", title: "인생 원탑 주인공형", subtitle: "세상의 중심은 나! 를 진심으로 믿는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "자기애가 넘치다 못해 흘러넘치는 타입. 스스로를 정말 사랑하고 자신감 넘치는 매력이 있지만, 가끔은 주변 사람들의 마음도 한 번씩 들여다봐 주면 완벽할 듯.",
    traits: ["내가 주인공이 아닌 상황은 상상이 잘 안 된다", "비판을 받으면 일단 방어막부터 친다", "거울이나 유리창을 그냥 지나치지 못한다"],
    compat: { best: { id: 2, reason: "은은하게 서포트해주는 사람과 있으면 밸런스가 맞아" }, worst: { id: 4, reason: "둘 다 스포트라이트를 원하면 은근한 신경전이 생길 수 있어" } },
  },
];

function getNarcissistIndexResult(score) {
  return NARCISSISTINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || NARCISSISTINDEX_RESULTS[NARCISSISTINDEX_RESULTS.length - 1];
}

function getNarcissistIndexById(id) {
  return NARCISSISTINDEX_RESULTS.find((r) => r.id === Number(id));
}
