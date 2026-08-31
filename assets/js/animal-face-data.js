/* ============================================================
   동물상 테스트 - 문항 및 결과 데이터 (설문 기반, 사진 분석 아님)
   ============================================================ */

const ANIMALFACE_QUESTIONS = [
  {
    text: "낯선 사람과 처음 만났을 때 나는?",
    options: [
      { text: "먼저 반갑게 다가가서 말을 건다", animal: "dog" },
      { text: "낯을 가리며 거리를 둔다", animal: "cat" },
      { text: "상대를 슬쩍 관찰하며 적당히 맞춰준다", animal: "fox" },
    ],
  },
  {
    text: "친구들 사이에서 나의 포지션은?",
    options: [
      { text: "분위기 메이커, 에너지 담당", animal: "dog" },
      { text: "든든하게 챙겨주는 맏형/맏언니 스타일", animal: "bear" },
      { text: "예민하게 눈치보고 조심스러운 편", animal: "rabbit" },
    ],
  },
  {
    text: "갖고 싶은 게 있을 때 나는?",
    options: [
      { text: "솔직하게 표현하고 조른다", animal: "dog" },
      { text: "은근슬쩍 상황을 유리하게 만든다", animal: "fox" },
      { text: "그냥 참고 넘어간다", animal: "rabbit" },
    ],
  },
  {
    text: "스트레스 받을 때 나는?",
    options: [
      { text: "활동적으로 움직이며 푼다", animal: "dog" },
      { text: "혼자 조용히 있고 싶다", animal: "cat" },
      { text: "먹으면서 위안을 삼는다", animal: "bear" },
    ],
  },
  {
    text: "휴식에 대한 나의 태도는?",
    options: [
      { text: "느긋하게 늘어져서 푹 잔다", animal: "bear" },
      { text: "예민해서 깊이 못 잔다", animal: "cat" },
      { text: "조금만 소리 나도 바로 깬다", animal: "rabbit" },
    ],
  },
  {
    text: "사람들이 나에 대해 자주 하는 말은?",
    options: [
      { text: "\"너 은근 계산적이야\"", animal: "fox" },
      { text: "\"너 진짜 순딩순딩하다\"", animal: "bear" },
      { text: "\"너 은근 도도해\"", animal: "cat" },
    ],
  },
  {
    text: "연애할 때 나는?",
    options: [
      { text: "적극적으로 애정표현하는 편", animal: "dog" },
      { text: "밀당의 고수", animal: "fox" },
      { text: "부끄러워서 표현을 잘 못한다", animal: "rabbit" },
    ],
  },
  {
    text: "화가 나면 나는?",
    options: [
      { text: "표정에 다 드러난다", animal: "dog" },
      { text: "조용히 날카로워진다", animal: "cat" },
      { text: "웬만하면 참고 삭힌다", animal: "rabbit" },
    ],
  },
  {
    text: "새로운 도전 앞에서 나는?",
    options: [
      { text: "일단 저지르고 본다", animal: "dog" },
      { text: "계산기부터 두드린다", animal: "fox" },
      { text: "신중하게 생각만 하다 결국 안 한다", animal: "rabbit" },
    ],
  },
  {
    text: "친구가 힘들어할 때 나는?",
    options: [
      { text: "옆에서 든든하게 버팀목이 되어준다", animal: "bear" },
      { text: "살갑게 위로하고 챙겨준다", animal: "dog" },
      { text: "조용히 곁에 있어준다", animal: "cat" },
    ],
  },
];

const ANIMALFACE_RESULTS = [
  {
    id: "dog",
    emoji: "🐶",
    title: "강아지상",
    subtitle: "사교적이고 애정표현이 풍부한 사랑둥이",
    summary:
      "누구에게나 먼저 다가가는 밝고 사교적인 타입이에요. 애정표현이 풍부하고 감정이 얼굴에 다 드러나서 곁에 있으면 편안하고 즐거운 사람이라는 얘기를 자주 들어요. 그만큼 상처도 잘 받으니 스스로를 잘 챙겨주세요.",
    traits: ["뛰어난 사교성", "풍부한 애정표현", "감정에 솔직함"],
    color: "#F59E0B",
    compat: { best: { id: "cat", reason: "정반대 매력에 끌려요! 활발한 당신과 도도한 상대가 밀당의 재미를 만들어요." }, worst: { id: "fox", reason: "능글맞은 상대의 페이스에 자꾸 휘둘릴 수 있어요." } },
  },
  {
    id: "cat",
    emoji: "🐱",
    title: "고양이상",
    subtitle: "도도하고 시크하지만 은근 매력있는 타입",
    summary:
      "쉽게 곁을 안 주는 도도하고 시크한 매력의 타입이에요. 낯을 가리고 예민한 편이지만, 한번 마음을 열면 은근한 다정함을 보여줘요. 그 밀당 아닌 밀당이 사람들을 끌어당기는 매력 포인트예요.",
    traits: ["도도하고 시크한 매력", "예민하고 섬세함", "독립적인 성향"],
    color: "#6366F1",
    compat: { best: { id: "dog", reason: "한결같이 다가와주는 상대 덕분에 마음을 열게 돼요." }, worst: { id: "bear", reason: "너무 무던한 반응에 심심함을 느낄 수 있어요." } },
  },
  {
    id: "fox",
    emoji: "🦊",
    title: "여우상",
    subtitle: "눈치 빠르고 영리한 매력덩어리 타입",
    summary:
      "상황 파악이 빠르고 영리하게 처세하는 타입이에요. 눈치가 빨라서 어떤 자리에서든 분위기를 잘 맞추고, 은근한 매력으로 사람들의 마음을 사로잡아요. 다만 너무 계산적으로 보이지 않게 가끔은 솔직함도 보여주세요.",
    traits: ["빠른 눈치와 센스", "영리한 상황 판단력", "은근한 매력"],
    color: "#EA580C",
    compat: { best: { id: "bear", reason: "순박한 상대를 요리조리 챙겨주는 재미가 있어요." }, worst: { id: "dog", reason: "직진하는 상대의 순수함에 오히려 당신이 부담을 느낄 수 있어요." } },
  },
  {
    id: "bear",
    emoji: "🐻",
    title: "곰상",
    subtitle: "듬직하고 순박한 든든이 타입",
    summary:
      "느긋하고 순박한 매력의 든든한 타입이에요. 웬만한 일에는 화를 잘 안 내고 곁에 있는 사람을 편안하게 만들어줘서 은근히 인기가 많아요. 가끔은 눈치도 빠르게 발휘해서 손해 보는 일을 줄여보세요.",
    traits: ["느긋하고 순박한 성격", "높은 포용력", "든든한 존재감"],
    color: "#92400E",
    compat: { best: { id: "fox", reason: "영리한 상대가 든든한 당신을 잘 이끌어줘요." }, worst: { id: "cat", reason: "예민한 상대의 마음을 잘 못 읽어서 서운하게 만들 수 있어요." } },
  },
  {
    id: "rabbit",
    emoji: "🐰",
    title: "토끼상",
    subtitle: "여리여리하고 조심스러운 순둥이 타입",
    summary:
      "여리여리하고 조심스러운 순둥이 타입이에요. 놀랄 일이 생기면 금방 예민해지고, 화가 나도 웬만하면 참는 편이라 손해를 보기도 해요. 그 여린 매력이 사람들을 챙겨주고 싶게 만드는 포인트이기도 해요.",
    traits: ["여리고 조심스러운 성격", "높은 눈치와 배려심", "감정을 잘 참는 편"],
    color: "#EC4899",
    compat: { best: { id: "dog", reason: "든든하게 챙겨주는 상대 덕분에 편하게 마음을 열 수 있어요." }, worst: { id: "fox", reason: "영리하고 계산적인 상대에게 자꾸 휘둘릴 수 있어요." } },
  },
];

function tallyToAnimalResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["dog", "cat", "fox", "bear", "rabbit"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getAnimalFaceById(best);
}

function getAnimalFaceById(id) {
  return ANIMALFACE_RESULTS.find((r) => r.id === id);
}
