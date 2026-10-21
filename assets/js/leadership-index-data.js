/* ============================================================
   리더십 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const LEADERSHIPINDEX_QUESTIONS = [
  {
    text: "팀플 단톡방에 6명이 들어왔는데 아무도 말이 없다.",
    options: [
      { text: "\"자료 조사 A, PPT B…\" 역할표 투척", score: 2 },
      { text: "누가 정리해 주겠지, 일단 읽고 대기", score: 0 },
      { text: "\"주제 이거 어때요?\" 아이디어만 던짐", score: 1 },
    ],
  },
  {
    text: "친구 넷이 제주도 2박 3일 여행을 가기로 했다.",
    options: [
      { text: "시간대별 동선표 짜서 공유", score: 2 },
      { text: "\"난 따라갈게, 비행기 표만 알려 줘\"", score: 0 },
      { text: "\"여기 카페 꼭 가자\" 링크 하나 올림", score: 1 },
    ],
  },
  {
    text: "회식 메뉴 투표, 고기 3표 회 3표로 30분째 동점이다.",
    options: [
      { text: "\"오늘 고기, 다음 달 회. 끝\" 정리", score: 2 },
      { text: "\"난 아무거나\" 하고 결과만 기다림", score: 0 },
      { text: "\"둘 다 파는 데 찾아볼게\" 검색 시작", score: 1 },
    ],
  },
  {
    text: "새로 들어간 러닝 크루 첫 모임, 다들 어색하게 서 있다.",
    options: [
      { text: "\"자기소개 한 바퀴 돌까요?\" 판 깔기", score: 2 },
      { text: "구석에서 신발 끈만 세 번째 묶는 중", score: 0 },
      { text: "옆 사람한테 \"처음 오셨어요?\" 말 걸기", score: 1 },
    ],
  },
  {
    text: "MT 숙소에 도착했는데 예약이 안 돼 있다고 한다.",
    options: [
      { text: "근처 숙소 세 곳에 바로 전화 돌림", score: 2 },
      { text: "\"어떡해…\" 하며 총무 얼굴만 쳐다봄", score: 0 },
      { text: "다 같이 검색하며 후보 찾아 공유", score: 1 },
    ],
  },
  {
    text: "동아리 축제 사회자를 뽑는데 지원자가 한 명도 없다.",
    options: [
      { text: "\"제가 할게요\" 손 번쩍", score: 2 },
      { text: "제비뽑기에 안 걸리길 기도", score: 0 },
      { text: "\"한 명 더 있으면 같이 할게요\" 조건부 지원", score: 1 },
    ],
  },
  {
    text: "단톡방에서 \"언제 한번 보자\"만 세 달째 반복 중이다.",
    options: [
      { text: "\"다음 주 토요일 7시, 강남역\" 날짜 박음", score: 2 },
      { text: "\"좋아!\" 하고 또 세 달 흘려보냄", score: 0 },
      { text: "가능한 날짜 투표만 올려 둠", score: 1 },
    ],
  },
  {
    text: "후배가 고객 메일에 다른 회사 이름을 써서 보냈다.",
    options: [
      { text: "사과 메일 대신 쓰고 체크리스트까지 만듦", score: 2 },
      { text: "못 본 척 내 일 계속함", score: 0 },
      { text: "\"괜찮아, 같이 정정 메일 쓰자\"", score: 1 },
    ],
  },
  {
    text: "화상회의, 팀장이 \"의견 있는 사람?\" 묻자 정적이 흐른다.",
    options: [
      { text: "마이크 켜고 \"제가 먼저 말씀드리면\"", score: 2 },
      { text: "카메라 끄고 음소거 한 번 더 확인", score: 0 },
      { text: "누가 말 꺼내면 채팅창에 \"+1\"", score: 1 },
    ],
  },
  {
    text: "새해, 친구들과 '올해 같이 할 목표'를 정하기로 했다.",
    options: [
      { text: "\"가을에 마라톤 완주!\" 일정까지 짬", score: 2 },
      { text: "다들 정한 거에 \"나도 할래\" 탑승", score: 0 },
      { text: "후보 몇 개 내고 같이 투표로 정함", score: 1 },
    ],
  },
];

const LEADERSHIPINDEX_MAX_SCORE = 20;

const LEADERSHIPINDEX_RESULTS = [
  {
    id: 1, emoji: "🙋", title: "든든한 팔로워", subtitle: "뒤에서 묵묵히 돕는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "앞에 나서기보다 뒤에서 묵묵히 돕는 걸 편하게 느끼는 타입이야. 리더보다는 신뢰가는 조력자 역할이 잘 어울리지.",
    traits: ["나서기보다 지켜보는 걸 편안해한다", "맡은 역할은 성실하게 해낸다", "갈등보다 조화를 중요하게 여긴다"],
    compat: { best: { id: 5, reason: "확실하게 이끌어주는 5번 유형과 있으면 마음 편하게 따라갈 수 있어" }, worst: { id: 2, reason: "둘 다 나서지 않으면 결정이 계속 미뤄질 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "숨은 실세", subtitle: "필요할 때 슬쩍 힘을 보태는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "앞장서진 않지만 필요할 땐 슬쩍 힘을 보태는 편이야. 리더 옆에서 실질적인 역할을 하는 경우가 많은, 은근히 존재감 있는 스타일.",
    traits: ["필요할 때만 나서서 힘을 보탠다", "겉으로 티는 안 나도 실속 있게 돕는다", "안정적인 조율자 역할을 잘한다"],
    compat: { best: { id: 4, reason: "믿음직한 4번 유형과 있으면 손발이 잘 맞아 든든해질 수 있어" }, worst: { id: 1, reason: "둘 다 소극적으로 뒤에 있으면 일이 진행되지 않을 수 있어" } },
  },
  {
    id: 3, emoji: "🧭", title: "밸런스 캡틴", subtitle: "필요할 때만 나서는 효율적인 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "필요할 때만 나서는 효율적인 리더 타입이야. 상황을 보고 나설 때와 물러설 때를 잘 아는, 눈치와 판단력이 좋은 스타일.",
    traits: ["상황을 보고 나설 타이밍을 잘 안다", "무리하게 나서지 않고 효율을 챙긴다", "누구와 있어도 무난하게 어울린다"],
    compat: { best: { id: 2, reason: "은근히 힘을 보태는 2번 유형과 있으면 손발이 잘 맞을 수 있어" }, worst: { id: 5, reason: "주도권이 강한 5번 유형과는 방향이 부딪힐 수 있어" } },
  },
  {
    id: 4, emoji: "🧑‍💼", title: "든든한 리더", subtitle: "자연스럽게 팀을 이끄는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "자연스럽게 팀을 이끄는 리더 기질이 강한 편이야. 책임감 있게 상황을 정리하고 사람들을 잘 챙기는, 믿을만한 스타일.",
    traits: ["책임감 있게 상황을 정리한다", "사람들을 세심하게 챙긴다", "결정이 필요할 때 먼저 나선다"],
    compat: { best: { id: 1, reason: "묵묵히 따라와주는 1번 유형과 있으면 안정적인 팀워크를 이룰 수 있어" }, worst: { id: 5, reason: "둘 다 주도권을 쥐려다 보면 방향이 겹쳐 부딪힐 수 있어" } },
  },
  {
    id: 5, emoji: "👑", title: "카리스마 리더", subtitle: "자연스럽게 중심에 서는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "어디서든 자연스럽게 중심에 서는 타입이야. 결정력과 추진력이 강해서 사람들이 믿고 따르는, 타고난 대장 기질의 소유자지.",
    traits: ["결단력이 빠르고 추진력이 강하다", "책임지는 걸 두려워하지 않는다", "사람들을 자연스럽게 이끈다"],
    compat: { best: { id: 1, reason: "믿고 따라와주는 1번 유형과 있으면 리더십을 마음껏 발휘할 수 있어" }, worst: { id: 4, reason: "둘 다 주도하려는 성향이 강해서 방향을 두고 부딪힐 수 있어" } },
  },
];

function getLeadershipIndexResult(score) {
  return LEADERSHIPINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || LEADERSHIPINDEX_RESULTS[LEADERSHIPINDEX_RESULTS.length - 1];
}

function getLeadershipIndexById(id) {
  return LEADERSHIPINDEX_RESULTS.find((r) => r.id === Number(id));
}
