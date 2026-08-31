/* ============================================================
   프로불편러 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const COMPLAINERINDEX_QUESTIONS = [
  { text: "카페에서 내가 앉으려던 자리에 누가 짐만 놓고 사라졌을 때 나는?", options: [ { text: "눈에 띄게 기다리거나 직원에게 물어본다", score: 2 }, { text: "그냥 다른 자리에 앉는다", score: 0 }, { text: "좀 짜증나지만 그러려니 하고 다른 자리를 찾는다", score: 1 } ] },
  { text: "단체 채팅방에서 누군가 계속 맞춤법을 틀리게 쓸 때 나는?", options: [ { text: "전혀 신경 쓰지 않는다", score: 0 }, { text: "메신저로 살짝 정정해주고 싶은 마음이 든다", score: 2 }, { text: "눈에 띄긴 하지만 그냥 넘어간다", score: 1 } ] },
  { text: "영화관에서 옆자리 사람이 계속 다리를 떨 때 나는?", options: [ { text: "살짝 헛기침을 하거나 눈치를 준다", score: 2 }, { text: "신경 쓰이지만 참는다", score: 1 }, { text: "전혀 못 느낀다", score: 0 } ] },
  { text: "친구와 약속했는데 상대가 5분 늦었을 때 나는?", options: [ { text: "5분 정도야 신경도 안 쓴다", score: 0 }, { text: "다음엔 시간 좀 지키라고 한마디 한다", score: 2 }, { text: "속으로 조금 아쉽지만 티는 안 낸다", score: 1 } ] },
  { text: "SNS 피드에 광고성 게시물이 계속 뜰 때 나는?", options: [ { text: "댓글에 광고 티 난다고 남기고 싶어진다", score: 2 }, { text: "그런가보다 하고 넘긴다", score: 0 }, { text: "좀 거슬리지만 그냥 스크롤한다", score: 1 } ] },
  { text: "다 같이 쓰는 냉장고에 넣어둔 내 음식이 없어진 걸 발견했을 때 나는?", options: [ { text: "단톡방에 누구냐고 콕 집어 묻는다", score: 2 }, { text: "혼자 조용히 서운해한다", score: 1 }, { text: "누가 먹었나보다 하고 넘어간다", score: 0 } ] },
  { text: "배달 음식이 사진과 다르게 부실하게 왔을 때 나는?", options: [ { text: "리뷰에 바로 사진과 다르다고 남긴다", score: 2 }, { text: "그냥 먹는다", score: 0 }, { text: "아쉽지만 다음엔 딴 데 시켜야지 한다", score: 1 } ] },
  { text: "마트 계산대에서 누가 새치기를 했을 때 나는?", options: [ { text: "별생각 없이 넘어간다", score: 0 }, { text: "정중하게라도 순서를 짚어준다", score: 2 }, { text: "기분이 나쁘지만 말은 안 한다", score: 1 } ] },
  { text: "엘리베이터에서 앞사람이 열림 버튼을 안 눌러줄 때 나는?", options: [ { text: "괜찮다, 문 닫히면 다시 부르면 된다고 생각한다", score: 0 }, { text: "'저기요' 하고 붙잡거나 다음엔 내가 꼭 눌러줘야지 다짐한다", score: 2 }, { text: "조금 서운하지만 그냥 넘어간다", score: 1 } ] },
  { text: "조별과제나 팀플에서 한 명이 계속 무임승차할 때 나는?", options: [ { text: "단톡방에 역할 분담을 다시 정리하자고 말한다", score: 2 }, { text: "어쩔 수 없지 하고 내가 더 한다", score: 0 }, { text: "속으로만 답답해한다", score: 1 } ] },
];

const COMPLAINERINDEX_MAX_SCORE = 20;

const COMPLAINERINDEX_RESULTS = [
  {
    id: 1, emoji: "😌", title: "쿨내진동 무던러", subtitle: "웬만해선 그러려니 하는 타입",
    min: 0, max: 4, color: "#16A34A",
    summary: "어지간한 일에는 눈 하나 깜짝 안 하는 편이야. 남이 실수해도 '그럴 수도 있지'가 먼저 나오고, 불편함보다 편안함을 택하는 스타일이지.",
    traits: ["웬만한 불편함은 그냥 넘긴다", "갈등을 만들기보다 피하는 편이다", "같이 있으면 주변 사람들이 편하게 느낀다"],
    compat: { best: { id: 4, reason: "가끔은 대신 나서서 짚어주는 4번 유형 덕분에 마음이 편해질 수 있어" }, worst: { id: 5, reason: "매사에 지적할 거리를 찾는 5번 유형 옆에 있으면 살짝 피곤해질 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "순한 맛 불편러", subtitle: "속으로만 삭이는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "불편한 건 분명히 느끼지만 대부분 속으로 삭히는 편이야. 티는 잘 안 내지만 마음속 리스트는 은근히 차곡차곡 쌓이는 스타일.",
    traits: ["불편해도 겉으론 티를 잘 안 낸다", "혼자 생각을 정리하는 시간이 필요하다", "정말 필요할 때만 조심스레 말을 꺼낸다"],
    compat: { best: { id: 1, reason: "매사에 무던한 1번 유형 옆에 있으면 눈치 안 보고 편하게 지낼 수 있어" }, worst: { id: 5, reason: "사사건건 짚고 넘어가는 5번 유형과는 자꾸 부딪힐 수 있어" } },
  },
  {
    id: 3, emoji: "🙆", title: "할 말은 하는 균형러", subtitle: "넘길 건 넘기고 짚을 건 짚는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "정말 넘어가야 할 건 넘기고, 짚어야 할 건 확실히 짚는 균형 잡힌 스타일이야. 눈치도 있고 할 말도 하는, 딱 적당한 밸런스를 갖췄어.",
    traits: ["상황을 보고 나설 때와 참을 때를 구분한다", "필요하면 부드럽게 의견을 전달한다", "감정보다는 상황 판단이 먼저다"],
    compat: { best: { id: 2, reason: "속으로만 삭이는 2번 유형과는 서로 부담 없이 잘 맞을 수 있어" }, worst: { id: 1, reason: "너무 무던한 1번 유형과는 가끔 답답함을 느낄 수 있어" } },
  },
  {
    id: 4, emoji: "🧐", title: "예민 센서 보유형", subtitle: "웬만한 불편함은 다 캐치하는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "예리한 센서를 장착한 것처럼 웬만한 불편함은 다 눈에 들어오는 편이야. 마음속으로 지적할 거리가 계속 쌓이고, 가끔은 참지 못하고 한마디씩 던지기도 해.",
    traits: ["작은 디테일까지 잘 캐치한다", "불편한 건 참는 게 더 힘들다", "기준이 확실한 편이다"],
    compat: { best: { id: 1, reason: "매사에 무던한 1번 유형이 균형을 잘 잡아줄 수 있어" }, worst: { id: 5, reason: "둘 다 예민한 포인트가 많아서 사사건건 부딪힐 수 있어" } },
  },
  {
    id: 5, emoji: "😤", title: "정의구현 파이터", subtitle: "불편한 건 절대 그냥 넘기지 않는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "불편한 건 절대 그냥 넘기지 않는 타입이야. 잘못된 건 잘못됐다고 말해야 직성이 풀리고, 작은 디테일 하나하나까지 다 눈에 들어오는 편.",
    traits: ["작은 불편함도 놓치지 않는다", "할 말은 반드시 하고 넘어간다", "기준이 확실하고 원칙적이다"],
    compat: { best: { id: 1, reason: "스트레스 없이 다 받아주는 1번 유형과 있으면 마음이 한결 편해질 수 있어" }, worst: { id: 4, reason: "똑같이 예민한 포인트가 많은 4번 유형과는 자꾸 부딪힐 수 있어" } },
  },
];

function getComplainerIndexResult(score) {
  return COMPLAINERINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || COMPLAINERINDEX_RESULTS[COMPLAINERINDEX_RESULTS.length - 1];
}

function getComplainerIndexById(id) {
  return COMPLAINERINDEX_RESULTS.find((r) => r.id === Number(id));
}
