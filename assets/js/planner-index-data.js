/* ============================================================
   계획형 vs 즉흥형 테스트 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const PLANNERINDEX_QUESTIONS = [
  { text: "여행을 가기로 했다면 나는?", options: [ { text: "동선, 맛집, 숙소까지 다 짜놓고 출발한다", score: 2 }, { text: "일단 항공권만 끊고 나머진 그때 정한다", score: 0 }, { text: "큰 틀만 정하고 세부는 가서 정한다", score: 1 } ] },
  { text: "하루 일과를 시작할 때", options: [ { text: "일단 시작하고 그때그때 정한다", score: 0 }, { text: "오늘 할 일 리스트를 미리 적어둔다", score: 2 }, { text: "대충 머릿속으로 순서만 정해둔다", score: 1 } ] },
  { text: "친구가 갑자기 \"지금 만날래?\"라고 물으면", options: [ { text: "선약이나 일정부터 확인하게 된다", score: 2 }, { text: "별생각 없이 바로 나간다", score: 0 }, { text: "상황 봐서 즉석에서 결정한다", score: 1 } ] },
  { text: "과제나 업무 마감이 일주일 남았을 때", options: [ { text: "마감 직전에 몰아서 한다", score: 0 }, { text: "미리 일정을 쪼개서 조금씩 해둔다", score: 2 }, { text: "중간쯤부터 슬슬 시작한다", score: 1 } ] },
  { text: "쇼핑을 하러 갈 때", options: [ { text: "살 목록을 미리 정리해서 간다", score: 2 }, { text: "일단 가서 눈에 띄는 대로 산다", score: 0 }, { text: "대충 뭘 살지 생각만 하고 간다", score: 1 } ] },
  { text: "새로운 취미나 운동을 시작하고 싶을 때", options: [ { text: "일단 바로 등록하거나 시작해버린다", score: 0 }, { text: "관련 정보를 찾아보고 계획을 세운 뒤 시작한다", score: 2 }, { text: "적당히 알아보고 시작한다", score: 1 } ] },
  { text: "주말 계획을 세울 때", options: [ { text: "며칠 전부터 뭘 할지 정해둔다", score: 2 }, { text: "당일 아침 기분에 따라 정한다", score: 0 }, { text: "전날 정도에 대충 정한다", score: 1 } ] },
  { text: "약속 장소에 갈 때", options: [ { text: "일단 출발하면서 길을 찾는다", score: 0 }, { text: "미리 경로와 소요 시간을 검색해둔다", score: 2 }, { text: "대충 방향만 알고 출발한다", score: 1 } ] },
  { text: "예상치 못한 일정 변경이 생기면", options: [ { text: "계획이 틀어져서 스트레스를 좀 받는다", score: 2 }, { text: "오히려 재밌는 변수라고 생각한다", score: 0 }, { text: "약간 당황하지만 금방 적응한다", score: 1 } ] },
  { text: "다이어리나 캘린더 앱을 쓰는 편이냐면", options: [ { text: "거의 쓰지 않고 머릿속으로 기억한다", score: 0 }, { text: "일정을 빼곡하게 기록하며 관리한다", score: 2 }, { text: "중요한 일정만 간단히 적는다", score: 1 } ] },
];

const PLANNERINDEX_MAX_SCORE = 20;

const PLANNERINDEX_RESULTS = [
  {
    id: 1, emoji: "🎈", title: "무계획이 계획형", subtitle: "그때그때 흐름에 몸을 맡기는 타입",
    min: 0, max: 4, color: "#DB2777",
    summary: "계획을 세워도 결국 그 순간 기분대로 움직이는 편. 정해진 틀보다는 즉흥적인 선택에서 오히려 에너지를 얻는 자유로운 영혼이야.",
    traits: ["예상 밖의 상황을 즐기는 편이다", "계획보다 순간의 감을 믿는다", "여행지에서도 발길 닿는 대로 다닌다"],
    compat: { best: { id: 3, reason: "적당히 계획을 잡아주는 3번과 있으면 균형이 잘 맞아요" }, worst: { id: 5, reason: "빈틈없이 계획하는 5번과는 여행 스타일부터 부딪힐 수 있어요" } },
  },
  {
    id: 2, emoji: "🌊", title: "가벼운 즉흥형", subtitle: "큰 틀만 정하고 나머진 흐름에 맡기는 타입",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "아예 계획이 없진 않지만 세부적인 건 그때그때 정하는 걸 편하게 여기는 편. 융통성 있게 상황에 맞춰 움직이는 걸 좋아해.",
    traits: ["큰 방향만 정해두고 디테일은 유연하게 간다", "갑작스러운 변화에도 크게 스트레스받지 않는다", "계획보다 그날 컨디션을 더 중요하게 생각한다"],
    compat: { best: { id: 4, reason: "꼼꼼한 4번이 큰 틀을 잡아주면 내가 편하게 따라갈 수 있어요" }, worst: { id: 5, reason: "빈틈없는 일정에 맞추다 보면 숨이 막힐 수 있어요" } },
  },
  {
    id: 3, emoji: "⚖️", title: "밸런스형", subtitle: "계획과 즉흥 사이 균형을 잘 잡는 타입",
    min: 9, max: 12, color: "#16A34A",
    summary: "중요한 일은 미리 계획하지만, 사소한 것까지 다 정해두진 않는 편. 상황에 따라 계획형과 즉흥형을 오가는 유연한 스타일이야.",
    traits: ["큰 일정은 계획하고 작은 건 즉흥적으로 정한다", "상황에 맞춰 계획을 수정하는 데 거부감이 없다", "계획형과 즉흥형 친구 모두와 잘 맞춰준다"],
    compat: { best: { id: 1, reason: "자유로운 1번의 즉흥성이 내 계획에 재미를 더해줘요" }, worst: { id: 5, reason: "지나치게 세세한 계획 앞에서는 나도 조금 답답해질 수 있어요" } },
  },
  {
    id: 4, emoji: "📌", title: "꼼꼼한 계획형", subtitle: "미리 준비해야 마음이 편한 타입",
    min: 13, max: 16, color: "#EA580C",
    summary: "뭘 하든 미리 정보를 찾아보고 순서를 정해야 마음이 놓이는 편. 갑작스러운 변화 앞에서는 적응하는 데 시간이 좀 필요한 스타일이야.",
    traits: ["일정 관리 앱이나 다이어리를 꼭 챙긴다", "할 일을 미리미리 처리하는 편이다", "변수가 생기면 스트레스를 좀 받는다"],
    compat: { best: { id: 2, reason: "여유로운 2번 덕분에 내 계획에 유연함이 더해져요" }, worst: { id: 1, reason: "즉흥적인 1번과 함께라면 일정 관리가 계속 틀어질 수 있어요" } },
  },
  {
    id: 5, emoji: "🗺️", title: "일정표 마스터형", subtitle: "분 단위 계획도 문제없는 완벽 계획형",
    min: 17, max: 20, color: "#7C3AED",
    summary: "여행 하나를 가도 시간표를 짜서 움직이는, 계획의 끝판왕. 미리 준비된 상태에서 안정감을 느끼고, 예상치 못한 변수는 최대한 피하고 싶어 해.",
    traits: ["모든 일정을 세밀하게 미리 짜둔다", "예상 밖의 변수를 극도로 싫어한다", "준비가 철저할수록 자신감이 생긴다"],
    compat: { best: { id: 2, reason: "느긋한 2번이 내 계획에 여유와 재미를 더해줘요" }, worst: { id: 1, reason: "정반대의 즉흥적인 1번과는 계획 자체가 성립되기 어려워요" } },
  },
];

function getPlannerIndexResult(score) {
  return PLANNERINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || PLANNERINDEX_RESULTS[PLANNERINDEX_RESULTS.length - 1];
}

function getPlannerIndexById(id) {
  return PLANNERINDEX_RESULTS.find((r) => r.id === Number(id));
}
