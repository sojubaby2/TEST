/* ============================================================
   관종력 테스트 - 문항 및 결과 데이터
   ============================================================ */

const ATTENTION_QUESTIONS = [
  { text: "SNS에 사진을 올렸는데 좋아요가 안 눌리면?", options: [
      { text: "신경 안 쓴다, 원래 그런거지", score: 0 },
      { text: "괜히 몇 번 더 들어가본다", score: 1 },
      { text: "안절부절 못하고 계속 확인한다", score: 2 } ] },
  { text: "단체 사진을 찍을 때 나는?", options: [
      { text: "구석에 조용히 서 있는다", score: 0 },
      { text: "적당한 자리에 자연스럽게 선다", score: 1 },
      { text: "가운데 자리를 은근히 노린다", score: 2 } ] },
  { text: "회식이나 모임에서 나는?", options: [
      { text: "말수가 적고 듣는 편이다", score: 0 },
      { text: "분위기 봐가며 적당히 이야기한다", score: 1 },
      { text: "분위기를 주도하며 계속 말한다", score: 2 } ] },
  { text: "새 옷이나 헤어스타일을 하면?", options: [
      { text: "아무도 몰라도 상관없다", score: 0 },
      { text: "누가 알아봐주면 기분 좋다", score: 1 },
      { text: "알아봐줄 때까지 은근히 티를 낸다", score: 2 } ] },
  { text: "특별한 일이 생기면 나는?", options: [
      { text: "가까운 사람에게만 조용히 말한다", score: 0 },
      { text: "친한 친구들에게는 이야기한다", score: 1 },
      { text: "SNS에 바로 올려서 다같이 알았으면 한다", score: 2 } ] },
  { text: "사람들 앞에서 노래방 마이크를 잡으면?", options: [
      { text: "빨리 넘기고 싶다", score: 0 },
      { text: "분위기 맞춰 한 곡 정도는 부른다", score: 1 },
      { text: "마이크를 놓기 싫어한다", score: 2 } ] },
  { text: "내 이야기를 할 때 나는?", options: [
      { text: "굳이 먼저 꺼내지 않는다", score: 0 },
      { text: "물어보면 편하게 이야기한다", score: 1 },
      { text: "먼저 나서서 이야기하는 걸 좋아한다", score: 2 } ] },
  { text: "길에서 시선이 느껴지면?", options: [
      { text: "괜히 불편하고 신경쓰인다", score: 0 },
      { text: "그런가보다 하고 넘긴다", score: 1 },
      { text: "은근히 기분이 좋다", score: 2 } ] },
  { text: "친구들 사이에서 나의 포지션은?", options: [
      { text: "조용히 분위기를 맞추는 편", score: 0 },
      { text: "적당히 나서고 적당히 듣는 편", score: 1 },
      { text: "분위기 메이커, 시선을 즐기는 편", score: 2 } ] },
  { text: "많은 사람 앞에서 발표를 해야 한다면?", options: [
      { text: "너무 떨리고 피하고 싶다", score: 0 },
      { text: "긴장되지만 무난하게 해낸다", score: 1 },
      { text: "오히려 신나고 잘 해낼 자신이 있다", score: 2 } ] },
];

const ATTENTION_MAX_SCORE = 20;

const ATTENTION_RESULTS = [
  {
    id: 1, emoji: "🫥", title: "존재감 파악불가형", subtitle: "있는 듯 없는 듯, 조용히 지내는 타입",
    min: 0, max: 4, color: "#64748B",
    summary: "있는 듯 없는 듯, 조용히 자기 할 일을 하는 타입이에요. 남의 시선에 크게 신경 쓰지 않고 묵묵히 지내는 편이라 스트레스가 적은 편이에요. 가끔은 존재감을 좀 더 드러내도 좋을 것 같아요.",
    traits: ["시선에 크게 신경 쓰지 않음", "묵묵히 내 할 일에 집중함", "나서는 것보다 듣는 걸 편해함"],
    compat: { best: { id: 2, reason: "서로 나서지 않아도 편안한 케미가 잘 맞아요." }, worst: { id: 3, reason: "적당히 관심을 즐기는 상대의 텐션을 따라가기 조금 벅찰 수 있어요." } },
  },
  {
    id: 2, emoji: "🌙", title: "은은한 존재감형", subtitle: "필요할 때만 살짝 나서는 타입",
    min: 5, max: 8, color: "#0369A1",
    summary: "필요할 때만 살짝 나서는 은은한 존재감의 소유자예요. 굳이 주목받으려 하지 않지만, 있을 땐 있는 듯 편안한 분위기를 만들어줘요. 그 잔잔한 매력이 은근히 사람들에게 신뢰를 줘요.",
    traits: ["필요할 때만 적당히 나섬", "편안한 분위기를 만들어줌", "은근한 신뢰를 주는 타입"],
    compat: { best: { id: 1, reason: "둘 다 편안하고 조용한 걸 좋아해서 잔잔하게 잘 맞아요." }, worst: { id: 4, reason: "화려한 상대 옆에서 나만 묻히는 기분이 들 수 있어요." } },
  },
  {
    id: 3, emoji: "😎", title: "적당한 관종력형", subtitle: "관심도 즐기고 선도 지킬 줄 아는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "적당히 관심받는 걸 즐기면서도 눈치껏 선을 지킬 줄 아는 타입이에요. 분위기를 살릴 땐 살리고, 빠질 땐 빠지는 균형 감각이 좋은 편이에요. 딱 적당한 텐션이 사람들과 잘 어울려요.",
    traits: ["적당히 관심받는 걸 즐김", "분위기를 눈치껏 조절함", "균형 잡힌 텐션 조절 능력"],
    compat: { best: { id: 4, reason: "적당히 즐기는 당신과 화려한 상대가 만나면 케미가 폭발해요." }, worst: { id: 1, reason: "리액션이 적은 상대에게 서운함을 느낄 수 있어요." } },
  },
  {
    id: 4, emoji: "📸", title: "타고난 관종형", subtitle: "시선을 즐기고 분위기를 주도하는 타입",
    min: 13, max: 16, color: "#EC4899",
    summary: "시선을 즐기고 분위기를 주도하는 걸 좋아하는 타입이에요. 사람들 앞에서 에너지가 더 살아나고, SNS나 모임에서 자연스럽게 중심이 되곤 해요. 그 자신감이 매력 포인트지만, 가끔은 남의 이야기에도 귀 기울여보세요.",
    traits: ["시선과 관심을 즐기는 편", "모임에서 자연스럽게 중심이 됨", "에너지 넘치는 분위기 메이커"],
    compat: { best: { id: 3, reason: "당신의 텐션을 적당히 받아주는 상대라 합이 잘 맞아요." }, worst: { id: 2, reason: "리액션이 적은 상대 옆에서 혼자 텐션이 붕 뜰 수 있어요." } },
  },
  {
    id: 5, emoji: "🎤", title: "관종력 만렙형", subtitle: "관심과 시선이 곧 에너지원인 타입",
    min: 17, max: 20, color: "#EF4444",
    summary: "관심과 시선 자체가 에너지원인 타입이에요. 마이크를 잡으면 놓기 싫고, 사람들의 반응 하나하나에 살아있음을 느껴요. 그 화끈한 매력으로 어디서든 눈에 띄지만, 가끔은 스포트라이트를 양보하는 여유도 필요해요.",
    traits: ["관심과 시선이 곧 에너지원", "화끈하고 거침없는 매력", "스포트라이트를 즐기는 타입"],
    compat: { best: { id: 1, reason: "정반대 매력이라 오히려 서로에게 신선하게 다가와요." }, worst: { id: 3, reason: "관심을 두고 은근히 신경전이 벌어질 수 있어요." } },
  },
];

function getAttentionResult(score) {
  return ATTENTION_RESULTS.find((r) => score >= r.min && score <= r.max) || ATTENTION_RESULTS[ATTENTION_RESULTS.length - 1];
}

function getAttentionById(id) {
  return ATTENTION_RESULTS.find((r) => r.id === Number(id));
}
