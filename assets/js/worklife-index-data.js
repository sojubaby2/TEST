/* ============================================================
   워라밸 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const WORKLIFEINDEX_QUESTIONS = [
  { text: "퇴근 후 회사 메신저 알림이 오면", options: [ { text: "바로 확인하고 답장까지 한다", score: 0 }, { text: "내용만 슬쩍 보고 급한 거 아니면 넘긴다", score: 1 }, { text: "칼같이 안 보고 다음 날 확인한다", score: 2 } ] },
  { text: "주말에 문득 드는 생각은", options: [ { text: "\"오늘 뭐하고 놀지\"가 먼저다", score: 2 }, { text: "가끔 일 생각이 스치지만 금방 잊는다", score: 1 }, { text: "월요일 할 일이 머릿속에서 안 떠난다", score: 0 } ] },
  { text: "연차를 쓸 때 나는", options: [ { text: "눈치 안 보고 당당하게 쓴다", score: 2 }, { text: "눈치는 좀 보이지만 결국 쓴다", score: 1 }, { text: "웬만하면 참고 안 쓴다", score: 0 } ] },
  { text: "퇴근 시간이 되면", options: [ { text: "칼같이 짐 싸서 나간다", score: 2 }, { text: "하던 거 마무리하고 조금 늦게 나간다", score: 1 }, { text: "눈치 보다가 남들 갈 때까지 자리 지킨다", score: 0 } ] },
  { text: "취미나 자기계발 시간은", options: [ { text: "매일 꾸준히 챙기는 편이다", score: 2 }, { text: "가끔 시간 날 때 한다", score: 1 }, { text: "일에 치여서 거의 못 챙긴다", score: 0 } ] },
  { text: "휴가 중에 회사 연락이 오면", options: [ { text: "안 보이는 곳에 폰을 치워둔다", score: 2 }, { text: "확인만 하고 급한 거 아니면 무시한다", score: 1 }, { text: "결국 일 처리까지 하게 된다", score: 0 } ] },
  { text: "저녁 약속이 잡히면", options: [ { text: "별 고민 없이 편하게 잡는다", score: 2 }, { text: "그날 업무량을 봐가며 잡는다", score: 1 }, { text: "야근 걱정에 약속을 잘 못 잡는다", score: 0 } ] },
  { text: "잠자리에 누웠을 때 드는 생각은", options: [ { text: "오늘 있었던 재밌는 일들", score: 2 }, { text: "이런저런 잡생각", score: 1 }, { text: "내일 해야 할 업무 목록", score: 0 } ] },
  { text: "일이 많아서 야근해야 하는 상황이면", options: [ { text: "\"오늘은 여기까지\" 하고 내일로 넘긴다", score: 2 }, { text: "최대한 끝내려 하지만 무리는 안 한다", score: 1 }, { text: "끝날 때까지 남아서 다 처리한다", score: 0 } ] },
  { text: "주변에서 나를 보면", options: [ { text: "\"저 사람은 삶을 즐길 줄 안다\"고 한다", score: 2 }, { text: "그냥저냥 평범하게 산다고 한다", score: 1 }, { text: "\"일 중독 아니야?\"라는 말을 듣는다", score: 0 } ] },
];

const WORKLIFEINDEX_MAX_SCORE = 20;

const WORKLIFEINDEX_RESULTS = [
  {
    id: 1, emoji: "🔥", title: "열정 풀충전형", subtitle: "일할 때 제일 신나는 워커홀릭 타입",
    min: 0, max: 4, color: "#EA580C",
    summary: "일에 몰입할 때 에너지가 폭발하는 타입이에요. 성취감과 성장에 대한 욕심이 커서 퇴근 후에도 일 생각이 머릿속을 떠나지 않아요. 열정은 최고지만 가끔은 의식적으로 꺼두는 스위치도 필요해요.",
    traits: ["일할 때 몰입도와 책임감이 남달라요", "퇴근 후에도 업무 생각이 계속 나요", "쉬는 것보다 성과를 낼 때 더 뿌듯해요"],
    compat: { best: { id: 3, reason: "적당히 밸런스형이 쉼표를 찍어주는 좋은 파트너가 돼요" }, worst: { id: 5, reason: "워라밸 만렙형의 칼퇴 마인드가 나에겐 너무 여유로워 보일 수 있어요" } },
  },
  {
    id: 2, emoji: "💼", title: "성실 밸런스형", subtitle: "일도 삶도 놓치기 싫은 노력파",
    min: 5, max: 8, color: "#F59E0B",
    summary: "일도 열심히, 삶도 잘 챙기고 싶어서 늘 애쓰는 타입이에요. 아직은 일 쪽으로 조금 더 기울어 있지만, 균형을 찾으려는 노력이 돋보여요. 조금만 더 나를 위한 시간에 우선순위를 줘도 좋을 것 같아요.",
    traits: ["일과 개인 시간 사이에서 늘 저울질해요", "책임감이 강해서 마무리는 확실히 해요", "쉬는 날에도 살짝 일 생각이 스쳐요"],
    compat: { best: { id: 4, reason: "저녁이 있는 삶형과 함께라면 워라밸의 좋은 예시를 배울 수 있어요" }, worst: { id: 1, reason: "열정 풀충전형과는 둘 다 일에 빠져서 서로를 못 챙길 수 있어요" } },
  },
  {
    id: 3, emoji: "⚖️", title: "적당히 밸런스형", subtitle: "일과 삶 사이 저울을 잘 맞추는 타입",
    min: 9, max: 12, color: "#16A34A",
    summary: "일할 땐 집중하고 퇴근하면 확실히 스위치를 끄는 타입이에요. 상황에 따라 유연하게 조절할 줄 알아서 번아웃도 적은 편이에요. 워라밸의 정석 같은 모범 케이스라고 할 수 있어요.",
    traits: ["일과 개인 시간의 경계가 비교적 뚜렷해요", "필요할 때 몰입하고 필요없을 땐 확실히 쉬어요", "번아웃 관리를 스스로 잘 하는 편이에요"],
    compat: { best: { id: 1, reason: "열정 풀충전형에게 쉼의 중요성을 알려줄 수 있어요" }, worst: { id: 5, reason: "워라밸 만렙형은 나보다 훨씬 더 일과 거리를 두려고 해서 온도차가 있을 수 있어요" } },
  },
  {
    id: 4, emoji: "🌇", title: "저녁이 있는 삶형", subtitle: "퇴근 후 내 시간을 확실히 챙기는 타입",
    min: 13, max: 16, color: "#0EA5E9",
    summary: "업무 시간엔 확실히 일하고, 퇴근 후엔 취미와 사람들에게 집중하는 타입이에요. 자기 시간을 잘 챙길 줄 알아서 삶의 만족도가 높은 편이에요. 워라밸 좀 지킬 줄 아는 사람으로 소문나 있을 거예요.",
    traits: ["퇴근 후 시간을 알차게 즐길 줄 알아요", "취미나 자기계발에 꾸준히 시간을 투자해요", "일 얘기는 퇴근과 함께 미련 없이 놔둬요"],
    compat: { best: { id: 2, reason: "성실 밸런스형에게 여유 있게 사는 법을 보여줄 수 있어요" }, worst: { id: 1, reason: "열정 풀충전형은 내 저녁 시간까지 일로 채우려 해서 부딪힐 수 있어요" } },
  },
  {
    id: 5, emoji: "🏖️", title: "워라밸 만렙형", subtitle: "삶을 즐기는 데 진심인 타입",
    min: 17, max: 20, color: "#7C3AED",
    summary: "퇴근하는 순간 일은 완전히 머릿속에서 지워지는 타입이에요. 연차도 당당하게 쓰고, 내 삶의 즐거움을 최우선으로 두는 게 확실한 사람이에요. 가끔은 조금만 더 열정을 발휘해도 괜찮을 정도로 여유가 넘쳐요.",
    traits: ["일과 삶의 경계를 완벽하게 지켜요", "연차와 개인 시간을 당당하게 챙겨요", "삶의 즐거움을 최우선 가치로 둬요"],
    compat: { best: { id: 4, reason: "저녁이 있는 삶형과는 함께 여유로운 시간을 즐기기 좋아요" }, worst: { id: 1, reason: "열정 풀충전형의 워커홀릭 텐션과는 온도차가 커서 서로 답답할 수 있어요" } },
  },
];

function getWorklifeIndexResult(score) {
  return WORKLIFEINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || WORKLIFEINDEX_RESULTS[WORKLIFEINDEX_RESULTS.length - 1];
}

function getWorklifeIndexById(id) {
  return WORKLIFEINDEX_RESULTS.find((r) => r.id === Number(id));
}
