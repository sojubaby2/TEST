/* ============================================================
   인싸/아싸 지수 테스트 - 문항 및 결과 데이터
   ============================================================ */

const INSAASSA_QUESTIONS = [
  { text: "새로운 모임에 초대받으면 나는?", options: [ { text: "일단 무조건 나가고 본다", score: 2 }, { text: "웬만하면 안 나가고 싶다", score: 0 }, { text: "고민하다가 마지못해 나간다", score: 1 } ] },
  { text: "주말 계획은 주로?", options: [ { text: "그때그때 다르다", score: 1 }, { text: "사람들과 약속으로 꽉 차 있다", score: 2 }, { text: "집에서 혼자 쉬는 게 최고다", score: 0 } ] },
  { text: "단체 채팅방에서 나는?", options: [ { text: "먼저 말을 걸고 분위기를 만든다", score: 2 }, { text: "읽기만 하고 거의 말이 없다", score: 0 }, { text: "필요할 때만 대답한다", score: 1 } ] },
  { text: "새로운 사람을 만나면?", options: [ { text: "상대가 다가오면 편하게 받아준다", score: 1 }, { text: "먼저 다가가기 어렵다", score: 0 }, { text: "내가 먼저 다가가서 친해진다", score: 2 } ] },
  { text: "인맥에 대한 생각은?", options: [ { text: "아는 사람이 많을수록 좋다", score: 2 }, { text: "적당히 넓고 적당히 깊으면 좋다", score: 1 }, { text: "소수의 깊은 관계면 충분하다", score: 0 } ] },
  { text: "축제나 행사에 가면 나는?", options: [ { text: "끝까지 놀고 사람들과 어울린다", score: 2 }, { text: "구경만 하다 조용히 나온다", score: 0 }, { text: "적당히 즐기다 온다", score: 1 } ] },
  { text: "연락처가 많이 저장된 걸 보면?", options: [ { text: "그런가보다 한다", score: 1 }, { text: "부담스럽다, 정리하고 싶다", score: 0 }, { text: "뿌듯하고 자랑스럽다", score: 2 } ] },
  { text: "즉흥적인 약속 제안을 받으면?", options: [ { text: "웬만하면 나간다", score: 2 }, { text: "웬만하면 거절한다", score: 0 }, { text: "상황 봐서 나갈 때도 있다", score: 1 } ] },
  { text: "에너지가 채워지는 방법은?", options: [ { text: "사람들과 함께 어울리는 시간", score: 2 }, { text: "혼자만의 시간", score: 0 }, { text: "상황에 따라 다르다", score: 1 } ] },
  { text: "SNS 팔로워/친구 수는?", options: [ { text: "많을수록 좋다고 생각한다", score: 2 }, { text: "많지 않아도 상관없다", score: 0 }, { text: "적당히 있으면 좋다", score: 1 } ] },
];

const INSAASSA_MAX_SCORE = 20;

const INSAASSA_RESULTS = [
  {
    id: 1, emoji: "🌵", title: "완전 아싸형", subtitle: "혼자만의 시간이 세상에서 제일 편안한 타입",
    min: 0, max: 4, color: "#64748B",
    summary: "혼자만의 시간이 세상에서 제일 편안한 타입이에요. 굳이 많은 사람과 어울리지 않아도 스스로 충분히 즐거운 시간을 보낼 줄 알아요. 그 독립적인 매력이 장점이지만, 가끔은 먼저 손을 내밀어보는 것도 좋은 경험이 될 거예요.",
    traits: ["혼자만의 시간을 가장 선호함", "소수와의 깊은 관계를 중요시함", "독립적이고 자기 페이스가 확실함"],
    compat: { best: { id: 2, reason: "둘 다 조용한 시간을 소중히 여겨서 편안한 케미가 잘 맞아요." }, worst: { id: 3, reason: "상황 따라 텐션이 달라지는 상대를 맞추기 벅찰 수 있어요." } },
  },
  {
    id: 2, emoji: "📖", title: "조용한 관찰자형", subtitle: "분위기를 조용히 살피는 걸 편안해하는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "무리하게 나서기보다 조용히 분위기를 살피는 걸 편안해하는 타입이에요. 필요할 땐 자연스럽게 대화에 참여하지만, 굳이 먼저 나서지는 않아요. 그 차분함이 사람들에게 편안한 인상을 줘요.",
    traits: ["분위기를 조용히 살피는 편", "필요할 때만 자연스럽게 참여함", "차분하고 편안한 인상을 줌"],
    compat: { best: { id: 1, reason: "서로의 페이스를 존중해주는 잔잔하고 편안한 관계예요." }, worst: { id: 4, reason: "화려하고 넓은 인맥의 상대를 따라가기 부담스러울 수 있어요." } },
  },
  {
    id: 3, emoji: "🎭", title: "상황별 인싸형", subtitle: "상황에 따라 텐션을 자유자재로 조절하는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "상황에 따라 텐션을 자유자재로 조절하는 타입이에요. 편한 자리에서는 누구보다 밝게 어울리지만, 낯선 자리에서는 한 발짝 물러서는 편이에요. 그 유연함이 어디서든 무난하게 잘 어울리는 비결이에요.",
    traits: ["상황에 따라 텐션을 조절함", "편한 자리에서 텐션이 확 올라감", "유연하게 분위기에 적응함"],
    compat: { best: { id: 4, reason: "적당히 즐기는 당신과 화려한 상대가 만나 즐거운 케미를 만들어요." }, worst: { id: 1, reason: "혼자만의 시간을 원하는 상대에게 서운함을 느낄 수 있어요." } },
  },
  {
    id: 4, emoji: "🎉", title: "준인싸형", subtitle: "웬만한 자리에서는 자연스럽게 어울리는 타입",
    min: 13, max: 16, color: "#EC4899",
    summary: "웬만한 자리에서는 자연스럽게 어울리는 사교적인 타입이에요. 먼저 다가가는 것도 편하고, 새로운 인연을 만드는 것도 즐거워해요. 아는 사람이 많고 여기저기서 찾는 사람일 가능성이 높아요.",
    traits: ["새로운 인연 만들기를 즐김", "먼저 다가가는 게 편함", "여기저기서 찾는 마당발"],
    compat: { best: { id: 3, reason: "당신의 텐션을 적당히 받아주는 상대라 편하게 잘 맞아요." }, worst: { id: 2, reason: "혼자 있는 걸 좋아하는 상대와는 리듬이 잘 안 맞을 수 있어요." } },
  },
  {
    id: 5, emoji: "🕺", title: "인싸력 만렙형", subtitle: "어디서든 분위기를 주도하는 타고난 타입",
    min: 17, max: 20, color: "#EF4444",
    summary: "어디서든 분위기를 주도하는 타고난 인싸 타입이에요. 즉흥적인 약속도 마다하지 않고, 사람들과 어울리는 시간에서 에너지를 얻어요. 그 넘치는 사교성이 최고의 무기지만, 가끔은 혼자만의 재충전 시간도 챙겨보세요.",
    traits: ["어디서든 분위기를 주도함", "즉흥적인 만남을 즐김", "사람들과 있을 때 에너지가 넘침"],
    compat: { best: { id: 1, reason: "정반대 매력에 끌려서 오히려 신선하고 편안하게 느껴져요." }, worst: { id: 3, reason: "둘 다 텐션이 강해서 주도권 다툼이 생길 수 있어요." } },
  },
];

function getInsaAssaResult(score) {
  return INSAASSA_RESULTS.find((r) => score >= r.min && score <= r.max) || INSAASSA_RESULTS[INSAASSA_RESULTS.length - 1];
}

function getInsaAssaById(id) {
  return INSAASSA_RESULTS.find((r) => r.id === Number(id));
}
