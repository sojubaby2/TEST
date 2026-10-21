/* ============================================================
   테토-에겐 테스트 - 문항 및 결과 데이터
   ※ 성별에 대한 고정관념이 아닌, 재미로 즐기는 에너지 타입 콘텐츠입니다.
   ============================================================ */

const TETOEGEN_QUESTIONS = [
  {
    text: "친구 넷 여행 단톡방, 아무도 숙소를 안 정한다.",
    options: [
      { text: "다들 정하면 맞추겠다고 이모티콘만", score: 0 },
      { text: "'여기로 한다' 링크 올리고 바로 예약", score: 2 },
      { text: "후보 세 개 추려서 투표를 올린다", score: 1 },
    ],
  },
  {
    text: "약속 나가기 30분 전, 거울 앞에 섰다.",
    options: [
      { text: "액세서리, 향수까지 톤 맞춰 고른다", score: 0 },
      { text: "검은 티에 청바지, 5분이면 끝", score: 2 },
      { text: "옷은 대충, 머리만 공들여 만진다", score: 1 },
    ],
  },
  {
    text: "친구들과 슬픈 영화를 보다 엔딩 장면이 나왔다.",
    options: [
      { text: "제일 먼저 훌쩍여서 휴지 담당이 된다", score: 0 },
      { text: "'그래서 결말이 뭐야?' 하고 무덤덤", score: 2 },
      { text: "눈물은 참는데 목이 메어 말이 없다", score: 1 },
    ],
  },
  {
    text: "애인과 저녁 메뉴 정하는 중, 둘 다 '아무거나'라고 한다.",
    options: [
      { text: "'고기 먹자, 내가 아는 데 있어' 결정", score: 2 },
      { text: "후보 두 개 던지고 같이 고른다", score: 1 },
      { text: "애인이 좋아하던 집 기억해 뒀다가 거기로", score: 0 },
    ],
  },
  {
    text: "회사에서 크게 실수해서 혼난 날, 퇴근길이다.",
    options: [
      { text: "제일 친한 친구 한 명에게만 짧게 털어놓음", score: 1 },
      { text: "헬스장 가서 땀 빼고 잊어버린다", score: 2 },
      { text: "단톡방에 '나 오늘 너무 힘들어' 위로 요청", score: 0 },
    ],
  },
  {
    text: "친구가 주말에 같이 운동하자고 한다. 끌리는 건?",
    options: [
      { text: "볼링이나 탁구처럼 노는 느낌 운동", score: 1 },
      { text: "크로스핏이나 복싱으로 땀 범벅", score: 2 },
      { text: "카페 들르는 동네 산책 코스", score: 0 },
    ],
  },
  {
    text: "카페에서 주문한 음료가 잘못 나왔다. 내 말투는?",
    options: [
      { text: "'혹시... 제가 주문한 게 아닌 것 같아서요'", score: 0 },
      { text: "'이거 아니에요, 아아로 바꿔 주세요'", score: 2 },
      { text: "'저기, 이거 바뀐 것 같아요' 웃으면서", score: 1 },
    ],
  },
  {
    text: "친구 생일, 내가 보낸 축하 메시지는?",
    options: [
      { text: "장문 편지에 추억 사진까지 첨부", score: 0 },
      { text: "'생축. 밥 사 줄게' 끝", score: 2 },
      { text: "기프티콘에 '축하해!' 한 줄", score: 1 },
    ],
  },
  {
    text: "친구가 약속을 세 번째로 당일 취소했다.",
    options: [
      { text: "'괜찮아, 다음에 보자' 서운함은 삼킨다", score: 0 },
      { text: "'이번이 세 번째야' 바로 짚고 넘어간다", score: 2 },
      { text: "일단 넘기고 다음에 만나서 슬쩍 꺼낸다", score: 1 },
    ],
  },
  {
    text: "노래방에서 내 18번 장르는?",
    options: [
      { text: "목 터지는 록 발라드, 샤우팅 필수", score: 2 },
      { text: "잔잔한 어쿠스틱 감성곡", score: 0 },
      { text: "다 같이 떼창하는 아이돌 노래", score: 1 },
    ],
  },
];

const TETOEGEN_MAX_SCORE = TETOEGEN_QUESTIONS.length * 2; // 20

/*
  4가지 결과: teto-m(테토남), teto-f(테토녀), egen-m(에겐남), egen-f(에겐녀)
  성별(gender: "m" | "f")과 점수(score: 0~20, 10 이상이면 테토 / 미만이면 에겐)로 결정됨
*/
const TETOEGEN_RESULTS = [
  {
    id: "teto-m",
    gender: "m",
    type: "teto",
    emoji: "🦁",
    title: "테토남",
    subtitle: "상남자st 에너지, 든든한 리더 타입",
    summary:
      "시원시원하고 주도적인 테토 에너지가 강한 타입이에요. 눈치 안 보고 할 말은 하는 편이라 곁에 있으면 든든하다는 얘기를 자주 들어요. 감정 표현에 서툴러 보일 때도 있지만, 그만큼 위기 상황에서 믿음직한 모습을 보여줘요.",
    traits: ["직진적이고 솔직한 성격", "리더십이 강한 편", "감정 표현엔 다소 서투름"],
    color: "#1E3A8A",
    compat: {
      best: { id: "egen-f", reason: "정반대의 매력에 끌려요. 시원시원한 당신과 여리여리한 상대가 서로를 완성해줘요." },
      worst: { id: "teto-f", reason: "둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요." },
    },
  },
  {
    id: "teto-f",
    gender: "f",
    type: "teto",
    emoji: "🐯",
    title: "테토녀",
    subtitle: "걸크러시 에너지, 확실한 자기주장",
    summary:
      "눈치 보지 않고 당당하게 자기 의견을 말하는 걸크러시 타입이에요. 씩씩하고 쿨한 매력으로 주변 사람들을 이끄는 힘이 있어요. 부드러운 매력보다는 명확하고 시원한 매력으로 어필하는 편이에요.",
    traits: ["당당하고 자기주장이 확실함", "쿨하고 시원시원한 성격", "위기에 강한 멘탈"],
    color: "#9F1239",
    compat: {
      best: { id: "egen-m", reason: "부드럽게 맞춰주는 상대 덕분에 당신의 매력이 더 빛나요." },
      worst: { id: "teto-m", reason: "둘 다 주도적인 성향이라 팽팽한 기 싸움이 생길 수 있어요." },
    },
  },
  {
    id: "egen-m",
    gender: "m",
    type: "egen",
    emoji: "🐰",
    title: "에겐남",
    subtitle: "부드럽고 섬세한, 다정한 에너지",
    summary:
      "다정하고 섬세한 에겐 에너지가 강한 타입이에요. 상대방의 감정을 잘 살피고 배려심이 깊어서 편안한 사람이라는 얘기를 자주 들어요. 꾸미는 것에도 관심이 많고 감성적인 매력이 돋보여요.",
    traits: ["섬세하고 배려심이 깊음", "감성적이고 다정한 편", "스타일에 관심이 많음"],
    color: "#7C3AED",
    compat: {
      best: { id: "teto-f", reason: "당당하게 리드해주는 상대 덕분에 편하게 마음을 열 수 있어요." },
      worst: { id: "egen-f", reason: "둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요." },
    },
  },
  {
    id: "egen-f",
    gender: "f",
    type: "egen",
    emoji: "🌸",
    title: "에겐녀",
    subtitle: "사랑스럽고 여린, 감성 충만 타입",
    summary:
      "여리여리하고 사랑스러운 에겐 에너지가 강한 타입이에요. 감정 표현이 풍부하고 공감을 잘해줘서 편안하게 마음을 털어놓고 싶은 사람이라는 얘기를 들어요. 부드러운 매력으로 주변을 편안하게 만들어줘요.",
    traits: ["감정 표현이 풍부함", "공감능력이 뛰어남", "부드럽고 사랑스러운 매력"],
    color: "#DB2777",
    compat: {
      best: { id: "teto-m", reason: "든든하게 이끌어주는 상대라 편안하게 기댈 수 있어요." },
      worst: { id: "egen-m", reason: "둘 다 서로 리드하기를 기다리다 관계가 더디게 진전될 수 있어요." },
    },
  },
];

function getTetoEgenResult(score, gender) {
  const type = score >= 10 ? "teto" : "egen";
  return (
    TETOEGEN_RESULTS.find((r) => r.type === type && r.gender === gender) ||
    TETOEGEN_RESULTS[0]
  );
}

function getTetoEgenById(id) {
  return TETOEGEN_RESULTS.find((r) => r.id === id);
}
