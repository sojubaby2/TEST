/* ============================================================
   질투 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const JEALOUSYINDEX_QUESTIONS = [
  { text: "연인(또는 썸)이 다른 이성/사람과 톡을 오래 하고 있다는 걸 알게 됐다. 나는?", options: [ { text: "왜 그렇게 오래 얘기했는지 은근히 캐묻는다", score: 2 }, { text: "신경은 쓰이지만 티 내지 않는다", score: 1 }, { text: "그러려니 하고 넘어간다", score: 0 } ] },
  { text: "친한 친구가 나 말고 다른 친구랑 더 자주 놀러 다니는 걸 보면?", options: [ { text: "각자 친한 친구가 다를 수 있지 하고 넘긴다", score: 0 }, { text: "서운함이 며칠 동안 마음에 남는다", score: 2 }, { text: "살짝 섭섭하지만 금방 잊는다", score: 1 } ] },
  { text: "SNS에서 연인이 다른 사람 게시물에 하트를 눌렀다", options: [ { text: "누구인지 프로필을 정독하게 된다", score: 2 }, { text: "딱히 신경 안 쓴다", score: 0 }, { text: "한 번쯤 슬쩍 물어본다", score: 1 } ] },
  { text: "회사/학교에서 나보다 동료가 더 좋은 평가를 받았을 때", options: [ { text: "진심으로 축하해준다", score: 0 }, { text: "조금 부럽지만 넘긴다", score: 1 }, { text: "축하는 하지만 속으로는 배가 아프다", score: 2 } ] },
  { text: "연인의 휴대폰이 눈앞에 있을 때", options: [ { text: "무슨 알림이 왔는지 저절로 눈이 간다", score: 2 }, { text: "전혀 신경 쓰이지 않는다", score: 0 }, { text: "궁금하지만 참는다", score: 1 } ] },
  { text: "친구가 나한테는 얘기 안 해준 고민을 다른 친구한테는 미리 말했다는 걸 알았을 때", options: [ { text: "그냥 그럴 수도 있지 하고 넘긴다", score: 0 }, { text: "다음에 만나면 서운함을 티 낸다", score: 2 }, { text: "약간 신경 쓰이지만 내색은 안 한다", score: 1 } ] },
  { text: "연인이 전 애인 이야기를 아무렇지 않게 꺼낼 때", options: [ { text: "표정 관리가 잘 안 된다", score: 2 }, { text: "그냥 옛날 얘기려니 한다", score: 0 }, { text: "속으론 신경 쓰이지만 넘긴다", score: 1 } ] },
  { text: "내가 좋아하는 사람이 다른 사람과 즐겁게 대화하는 걸 보면", options: [ { text: "별 감흥이 없다", score: 0 }, { text: "괜히 그 자리에 끼고 싶어진다", score: 2 }, { text: "누구인지 궁금해진다", score: 1 } ] },
  { text: "단톡방에서 나만 빼고 다른 대화가 이어진 흔적을 봤을 때", options: [ { text: "무슨 얘기했는지 굳이 캐묻는다", score: 2 }, { text: "각자 대화 주제가 다를 수 있다고 생각한다", score: 0 }, { text: "잠깐 궁금하고 만다", score: 1 } ] },
  { text: "친구/연인이 나보다 다른 사람 칭찬을 더 많이 할 때", options: [ { text: "은근히 나랑 비교하게 된다", score: 2 }, { text: "오히려 나도 같이 칭찬한다", score: 0 }, { text: "그런가보다 한다", score: 1 } ] },
];

const JEALOUSYINDEX_MAX_SCORE = 20;

const JEALOUSYINDEX_RESULTS = [
  {
    id: 1, emoji: "🌊", title: "쿨内무심 마음", subtitle: "질투란 감정이 낯선 초연 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "어지간한 일에는 마음이 크게 흔들리지 않는 편. 연인이나 친구가 다른 사람과 친하게 지내도 \"그럴 수 있지\" 하며 넘어가는 여유파야.",
    traits: ["별일 아닌 일에 잘 흔들리지 않는다", "관계에 대한 믿음이 기본값이다", "가끔은 너무 무심해 보인다는 말을 듣기도 한다"],
    compat: { best: { id: 3, reason: "적당히 무던한 3번 유형과는 서로 편안하게 지낼 수 있어요" }, worst: { id: 5, reason: "감정 기복이 큰 5번 유형은 내 무심함을 서운해할 수 있어요" } },
  },
  {
    id: 2, emoji: "🍃", title: "잔잔한 신경 쓰임형", subtitle: "가끔 신경 쓰이지만 금방 털어내는 타입",
    min: 5, max: 8, color: "#16A34A",
    summary: "완전히 무심하진 않아서 가끔 마음이 콕 찔리지만, 오래 담아두지 않고 스스로 잘 다독이는 편이야.",
    traits: ["순간적으로 신경 쓰여도 금방 잊는다", "티는 잘 안 내는 편이다", "혼자 삭이는 걸 잘한다"],
    compat: { best: { id: 1, reason: "느긋한 1번과 있으면 서로 페이스가 잘 맞아요" }, worst: { id: 4, reason: "감정을 자주 확인받고 싶어하는 4번은 나를 답답해할 수 있어요" } },
  },
  {
    id: 3, emoji: "🌗", title: "케바케 질투형", subtitle: "상황 따라 질투 온도차가 큰 타입",
    min: 9, max: 12, color: "#7C3AED",
    summary: "평소엔 쿨한 편이지만 유독 신경 쓰이는 포인트가 있으면 마음이 확 요동치는, 예측하기 어려운 질투 스타일이야.",
    traits: ["평소엔 무던하다가 스위치가 켜지면 예민해진다", "좋아하는 상대일수록 더 예민해진다", "본인도 자기 질투 포인트를 정확히 안다"],
    compat: { best: { id: 2, reason: "잔잔한 2번은 내 급발진을 잘 받아줘요" }, worst: { id: 5, reason: "둘 다 예민해지면 감정싸움이 커질 수 있어요" } },
  },
  {
    id: 4, emoji: "🔥", title: "티 나는 질투형", subtitle: "신경 쓰이면 결국 티가 나는 타입",
    min: 13, max: 16, color: "#EA580C",
    summary: "신경 쓰이는 걸 숨기려 해도 표정이나 말투에서 다 드러나는 편. 좋아하는 마음이 큰 만큼 질투도 정직하게 나타나는 스타일이야.",
    traits: ["서운하면 티가 확실히 난다", "좋아하는 사람 앞에서 더 솔직해진다", "질투도 애정 표현의 일종이라고 생각한다"],
    compat: { best: { id: 1, reason: "여유로운 1번이 내 감정을 안정적으로 받아줘요" }, worst: { id: 3, reason: "종잡을 수 없는 3번의 태도에 더 불안해질 수 있어요" } },
  },
  {
    id: 5, emoji: "💢", title: "레이더 풀가동형", subtitle: "작은 신호도 놓치지 않는 촉 만렙 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "좋아하는 사람의 작은 행동 하나하나가 다 눈에 들어오는 편. 그만큼 관계에 진심이라는 뜻이지만, 가끔은 스스로도 지칠 만큼 신경을 많이 써.",
    traits: ["작은 신호도 예민하게 캐치한다", "좋아하는 만큼 불안도 커진다", "혼자 상상의 나래를 펼치기도 한다"],
    compat: { best: { id: 2, reason: "잔잔한 2번이 내 불안을 편안하게 눌러줘요" }, worst: { id: 1, reason: "너무 무심한 1번의 태도가 오히려 더 불안하게 만들 수 있어요" } },
  },
];

function getJealousyIndexResult(score) {
  return JEALOUSYINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || JEALOUSYINDEX_RESULTS[JEALOUSYINDEX_RESULTS.length - 1];
}

function getJealousyIndexById(id) {
  return JEALOUSYINDEX_RESULTS.find((r) => r.id === Number(id));
}
