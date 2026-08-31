/* ============================================================
   갬성 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const MOODINDEX_QUESTIONS = [
  { text: "노을 지는 하늘을 보면 나는?", options: [ { text: "사진을 찍고 한참 여운에 잠긴다", score: 2 }, { text: "그냥 예쁘네 하고 지나간다", score: 0 }, { text: "잠깐 멈춰서 바라본다", score: 1 } ] },
  { text: "카페를 고를 때 내가 가장 중요하게 보는 건?", options: [ { text: "인테리어와 분위기", score: 2 }, { text: "가성비와 접근성", score: 0 }, { text: "커피 맛", score: 1 } ] },
  { text: "비 오는 날이면 나는?", options: [ { text: "괜히 감성에 젖어 플레이리스트를 튼다", score: 2 }, { text: "그냥 불편하다고 느낀다", score: 0 }, { text: "빗소리가 잔잔하게 들린다", score: 1 } ] },
  { text: "사진을 찍을 때 나는?", options: [ { text: "필터, 조명, 각도까지 꼼꼼히 신경 쓴다", score: 2 }, { text: "있는 그대로 찍고 끝낸다", score: 0 }, { text: "구도 정도는 신경 쓴다", score: 1 } ] },
  { text: "좋아하는 노래를 고를 때 나의 기준은?", options: [ { text: "가사 속 분위기와 감정선", score: 2 }, { text: "듣기 편한 멜로디", score: 0 }, { text: "가사와 멜로디를 둘 다 본다", score: 1 } ] },
  { text: "여행지에서 나에게 가장 기억에 남는 건?", options: [ { text: "그 순간의 공기와 분위기", score: 2 }, { text: "맛집과 액티비티", score: 0 }, { text: "함께한 사람들과의 대화", score: 1 } ] },
  { text: "일기나 메모를 쓸 때 나는?", options: [ { text: "그날의 감정과 분위기까지 담아 쓴다", score: 2 }, { text: "거의 안 쓴다", score: 0 }, { text: "가끔 있었던 일을 적는다", score: 1 } ] },
  { text: "밤에 혼자 있는 시간이 생기면 나는?", options: [ { text: "조명을 낮추고 감성적인 시간을 보낸다", score: 2 }, { text: "그냥 잠들거나 할 일을 한다", score: 0 }, { text: "가볍게 영상이나 음악을 즐긴다", score: 1 } ] },
  { text: "영화를 고를 때 나는?", options: [ { text: "여운이 길게 남는 잔잔한 영화를 고른다", score: 2 }, { text: "재미있고 액션이 많은 걸 고른다", score: 0 }, { text: "스토리가 탄탄한 걸 고른다", score: 1 } ] },
  { text: "SNS에 글이나 사진을 올릴 때 나는?", options: [ { text: "분위기에 맞는 문장이나 캡션을 정성껏 고른다", score: 2 }, { text: "정보 전달 위주로 짧게 쓴다", score: 0 }, { text: "간단한 설명 정도만 덧붙인다", score: 1 } ] },
];

const MOODINDEX_MAX_SCORE = 20;

const MOODINDEX_RESULTS = [
  {
    id: 1, emoji: "😐", title: "군더더기 없는 팩폭러", subtitle: "실속을 먼저 챙기는 타입",
    min: 0, max: 4, color: "#0891B2",
    summary: "분위기보다는 실속을 먼저 챙기는 타입이야. 감성보다는 효율과 결과가 더 중요하고, 꾸밈없이 직진하는 스타일이지.",
    traits: ["군더더기 없이 실용적으로 판단한다", "감성보다 효율을 우선시한다", "꾸밈없는 스타일을 좋아한다"],
    compat: { best: { id: 3, reason: "적당히 낭만적인 3번 유형과 있으면 무리 없이 균형이 맞을 수 있어" }, worst: { id: 5, reason: "매사에 감성적인 5번 유형과는 결이 많이 달라 부딪힐 수 있어" } },
  },
  {
    id: 2, emoji: "🙂", title: "무드 살짝 아는 척러", subtitle: "가끔은 분위기에 스며드는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "평소엔 실용적이지만 가끔은 분위기에 스며드는 편이야. 갬성이 완전히 없진 않고, 필요할 땐 은근히 챙길 줄 알아.",
    traits: ["평소엔 담백하지만 가끔 감성에 젖는다", "필요할 때만 분위기를 챙긴다", "과하지 않은 선을 지킨다"],
    compat: { best: { id: 4, reason: "감성 충만한 4번 유형 덕분에 몰랐던 분위기를 알게 될 수 있어" }, worst: { id: 1, reason: "너무 실용적인 1번 유형과 있으면 살짝 심심하게 느껴질 수 있어" } },
  },
  {
    id: 3, emoji: "🌥", title: "적당히 낭만러", subtitle: "필요할 땐 감성을, 필요할 땐 현실을 챙기는 타입",
    min: 9, max: 12, color: "#F59E0B",
    summary: "필요할 땐 감성을, 필요할 땐 현실을 챙기는 밸런스형이야. 분위기도 알고 실속도 아는, 딱 적당한 온도를 유지하는 스타일.",
    traits: ["분위기와 실속을 둘 다 챙긴다", "상황에 맞게 감성을 조절한다", "과하지 않게 여운을 즐긴다"],
    compat: { best: { id: 1, reason: "현실적인 1번 유형과 있으면 서로 부족한 부분을 채워줄 수 있어" }, worst: { id: 5, reason: "매 순간 감성적인 5번 유형에게는 살짝 맞춰가기 벅찰 수 있어" } },
  },
  {
    id: 4, emoji: "🌆", title: "무드 큐레이터", subtitle: "분위기와 감성을 중요하게 여기는 타입",
    min: 13, max: 16, color: "#DB2777",
    summary: "분위기와 감성을 꽤 중요하게 여기는 편이야. 사진 한 장, 문장 하나에도 정성을 들이는, 디테일에 진심인 스타일.",
    traits: ["작은 디테일에도 정성을 들인다", "분위기 있는 공간과 순간을 좋아한다", "감정을 섬세하게 표현한다"],
    compat: { best: { id: 2, reason: "은근히 갬성을 아는 2번 유형과 있으면 편안하게 잘 통할 수 있어" }, worst: { id: 1, reason: "실용적인 1번 유형과는 온도차가 크게 느껴질 수 있어" } },
  },
  {
    id: 5, emoji: "🌇", title: "감성 폭발 아티스트", subtitle: "모든 순간에서 여운을 찾는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "모든 순간에서 분위기와 여운을 찾는 타입이야. 노을 하나에도 마음이 일렁이고, 작은 디테일 하나까지 감성으로 채우는 사람이지.",
    traits: ["작은 순간에서도 큰 감동을 느낀다", "분위기와 디테일을 세심하게 신경 쓴다", "여운이 길게 남는 걸 좋아한다"],
    compat: { best: { id: 2, reason: "잔잔하게 받아주는 2번 유형과 있으면 감성을 편안하게 나눌 수 있어" }, worst: { id: 1, reason: "현실적인 1번 유형의 무덤덤한 반응에 서운할 수 있어" } },
  },
];

function getMoodIndexResult(score) {
  return MOODINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || MOODINDEX_RESULTS[MOODINDEX_RESULTS.length - 1];
}

function getMoodIndexById(id) {
  return MOODINDEX_RESULTS.find((r) => r.id === Number(id));
}
