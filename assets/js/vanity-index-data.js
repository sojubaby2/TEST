/* ============================================================
   허세 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const VANITYINDEX_QUESTIONS = [
  { text: "비싼 물건을 샀을 때 나는?", options: [ { text: "SNS나 대화에서 은근슬쩍 티를 낸다", score: 2 }, { text: "그냥 조용히 잘 쓴다", score: 0 }, { text: "친한 사람한테만 살짝 자랑한다", score: 1 } ] },
  { text: "잘 모르는 분야 얘기가 나오면?", options: [ { text: "아는 척하며 대화에 낀다", score: 2 }, { text: "모른다고 솔직히 말한다", score: 0 }, { text: "아는 만큼만 얘기하고 나머진 듣는다", score: 1 } ] },
  { text: "명품이나 고급 브랜드에 대한 내 생각은?", options: [ { text: "하나쯤은 있어야 급이 산다고 생각한다", score: 2 }, { text: "별로 관심 없다, 실용성이 더 중요하다", score: 0 }, { text: "예쁘면 좋지만 필수는 아니라고 생각한다", score: 1 } ] },
  { text: "소개팅이나 첫 만남에서 나는?", options: [ { text: "능력이나 스펙을 은근히 어필한다", score: 2 }, { text: "있는 그대로 편하게 얘기한다", score: 0 }, { text: "좋은 인상을 주려고 조금 포장한다", score: 1 } ] },
  { text: "맛집에 가면 나는?", options: [ { text: "사진부터 예쁘게 찍어서 SNS에 올린다", score: 2 }, { text: "그냥 맛있게 먹고 끝이다", score: 0 }, { text: "가끔 기록 삼아 사진 정도는 남긴다", score: 1 } ] },
  { text: "친구가 새로 산 물건을 자랑하면?", options: [ { text: "나도 모르게 더 좋은 걸로 맞대응하고 싶어진다", score: 2 }, { text: "진심으로 축하해주고 끝이다", score: 0 }, { text: "부럽다고 인정하고 넘어간다", score: 1 } ] },
  { text: "차나 집처럼 큰 소비를 할 때 가장 신경 쓰는 건?", options: [ { text: "남들이 봤을 때 어떻게 보일지", score: 2 }, { text: "순수하게 내가 쓰기 편한지", score: 0 }, { text: "어느 정도는 남 시선도, 실용성도 같이 고려한다", score: 1 } ] },
  { text: "실수를 했을 때 나는?", options: [ { text: "어떻게든 그럴듯한 핑계를 대고 넘어가려 한다", score: 2 }, { text: "바로 인정하고 사과한다", score: 0 }, { text: "조금 머뭇거리다 결국 인정한다", score: 1 } ] },
  { text: "SNS에 글을 올릴 때 나는?", options: [ { text: "실제보다 더 있어 보이게 꾸며서 올린다", score: 2 }, { text: "있는 그대로 편하게 올린다", score: 0 }, { text: "조금 예쁘게 다듬어서 올린다", score: 1 } ] },
  { text: "대화 중 내 성과나 경험을 얘기할 때?", options: [ { text: "나도 모르게 조금씩 부풀려서 말한다", score: 2 }, { text: "있는 그대로 담백하게 말한다", score: 0 }, { text: "재밌으라고 살짝 양념을 치는 정도다", score: 1 } ] },
];

const VANITYINDEX_MAX_SCORE = 20;

const VANITYINDEX_RESULTS = [
  {
    id: 1, emoji: "🌾", title: "꾸밈없는 리얼리스트", subtitle: "있는 그대로가 제일 편한 타입",
    min: 0, max: 4, color: "#16A34A",
    summary: "굳이 포장하지 않아도 스스로에게 당당한 타입. 남들 시선보다 내가 편한 게 우선이라 꾸밈없는 모습 그대로를 보여줘. 가끔은 조금 포장해도 매력 포인트가 될 텐데 싶을 정도로 솔직함.",
    traits: ["잘 모르면 모른다고 바로 말한다", "SNS도 있는 그대로 편하게 올린다", "실수하면 바로 인정하는 편이다"],
    compat: { best: { id: 3, reason: "적당히 있어 보이고 싶어하는 사람 옆에서 솔직함이 매력으로 통해" }, worst: { id: 5, reason: "허세가 심한 사람 앞에서는 대화가 좀 피곤하게 느껴질 수 있어" } },
  },
  {
    id: 2, emoji: "🌤️", title: "센스있는 어필러", subtitle: "필요할 때만 살짝 포장할 줄 아는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "평소엔 솔직하지만 필요한 순간엔 나를 조금 더 좋게 보이도록 어필할 줄 아는 눈치 빠른 타입. 과하지 않은 선에서 스스로를 잘 포장하는 센스가 있어.",
    traits: ["첫인상에서는 조금 포장해서 보여준다", "웬만하면 솔직하게 얘기하는 편이다", "자랑은 친한 사람한테만 살짝 한다"],
    compat: { best: { id: 1, reason: "꾸밈없는 사람 옆에 있으면 편안하게 진짜 모습을 나눌 수 있어" }, worst: { id: 4, reason: "허세가 심한 사람 옆에 있으면 은근히 비교당하는 느낌이 들 수 있어" } },
  },
  {
    id: 3, emoji: "✨", title: "적당히 있어 보이는 타입", subtitle: "있어 보이고 싶은 마음, 인정할 건 인정",
    min: 9, max: 12, color: "#7C3AED",
    summary: "남들 눈에 어떻게 비칠지 신경 쓰는 편이라 가끔 있어 보이려고 애쓸 때가 있어. 그렇다고 무리하게 부풀리진 않고, 적당한 선에서 스스로를 잘 꾸밀 줄 아는 타입.",
    traits: ["맛집 가면 사진부터 예쁘게 찍는다", "성과를 말할 때 살짝 양념을 친다", "명품 하나쯤은 있으면 좋겠다고 생각한다"],
    compat: { best: { id: 2, reason: "센스있게 어필하는 사람과는 서로 스타일이 잘 맞아" }, worst: { id: 5, reason: "둘 다 있어 보이려고 하면 은근한 신경전이 생길 수 있어" } },
  },
  {
    id: 4, emoji: "🎁", title: "인생은 포장이다형", subtitle: "이왕이면 있어 보이게! 를 실천하는 타입",
    min: 13, max: 16, color: "#F59E0B",
    summary: "남들에게 어떻게 보일지가 꽤 중요한 타입. 소비도, 말투도, SNS도 조금씩 포장하는 걸 좋아해서 있어 보이는 순간을 즐길 줄 알아. 가끔 본모습도 편하게 보여주면 사람들이 더 좋아할지도.",
    traits: ["큰 소비를 할 때 남들 시선을 꽤 신경 쓴다", "실수하면 그럴듯한 핑계부터 생각난다", "성과를 얘기할 때 자연스럽게 부풀려진다"],
    compat: { best: { id: 1, reason: "솔직한 사람 옆에 있으면 스스로 힘을 빼는 법을 배울 수 있어" }, worst: { id: 3, reason: "둘 다 있어 보이려 애쓰면 서로 피곤해질 수 있어" } },
  },
  {
    id: 5, emoji: "💸", title: "허세 끝판왕", subtitle: "있어 보이는 게 인생 최우선 과제인 타입",
    min: 17, max: 20, color: "#EA580C",
    summary: "있어 보이고 싶은 마음이 누구보다 큰 타입. 모르는 것도 아는 척, 작은 것도 크게 포장하는 데 진심이야. 그 자신감과 표현력 자체는 매력이지만, 가끔은 있는 그대로의 나도 충분히 멋지다는 걸 잊지 말길.",
    traits: ["잘 모르는 얘기도 일단 아는 척하고 본다", "SNS 속 나와 실제 나는 꽤 다르다", "자랑거리는 어떻게든 대화에 끼워 넣는다"],
    compat: { best: { id: 1, reason: "솔직한 사람 옆에서 편안하게 진짜 내 모습을 찾을 수 있어" }, worst: { id: 4, reason: "둘 다 포장에 진심이면 서로 과시전이 벌어질 수 있어" } },
  },
];

function getVanityIndexResult(score) {
  return VANITYINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || VANITYINDEX_RESULTS[VANITYINDEX_RESULTS.length - 1];
}

function getVanityIndexById(id) {
  return VANITYINDEX_RESULTS.find((r) => r.id === Number(id));
}
