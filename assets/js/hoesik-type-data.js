/* ============================================================
   나의 회식 자리 유형 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/hoesik-type.json 을 고치세요
   ============================================================ */

const HOESIKTYPE_QUESTIONS = [
  {
    text: "팀 단톡방에 '이번 주 금요일 회식' 공지가 올라왔다.",
    options: [
      { text: "벌써 건배사랑 게임 순서 구상 중", key: "mc" },
      { text: "인원수 곱하기 1인 예산부터 계산 중", key: "manager" },
    ],
  },
  {
    text: "고깃집 도착, 다들 어디 앉을지 머뭇거린다.",
    options: [
      { text: "구석 끝자리. 테이블 전체가 한눈에 보임", key: "observer" },
      { text: "신발장 바로 앞. 탈출 동선 확보 완료", key: "firstround" },
    ],
  },
  {
    text: "부장님 군대 썰이 끝나고 테이블에 3초간 정적이 흐른다.",
    options: [
      { text: "\"자, 일단 짠!\" 외치고 잔부터 든다", key: "lastman" },
      { text: "옆 사람에게 \"요즘 뭐 보세요?\" 화제 패스", key: "mc" },
    ],
  },
  {
    text: "직원이 \"주문 도와드릴게요\" 하는데 다들 눈치만 본다.",
    options: [
      { text: "\"삼겹 여섯, 목살 넷, 공깃밥은 나중에요\"", key: "manager" },
      { text: "메뉴판 넘기며 누가 뭘 원하는지 표정 관찰", key: "observer" },
    ],
  },
  {
    text: "1차 막바지, 누군가 \"2차 갈 사람?\"을 외친다.",
    options: [
      { text: "가방끈은 이미 어깨에 걸려 있다", key: "firstround" },
      { text: "손이 먼저 올라감, 노래방 예약까지 완료", key: "lastman" },
    ],
  },
  {
    text: "이번 달 입사한 신입이 말없이 고기만 먹고 있다.",
    options: [
      { text: "\"신입님 MBTI 뭐예요?\" 대화 판 깔아 줌", key: "mc" },
      { text: "신입 앞 접시에 잘 익은 고기 쌓아 줌", key: "manager" },
    ],
  },
  {
    text: "회식 다음 날 아침 9시, 출근길의 나는?",
    options: [
      { text: "밤 10시에 잤다. 컨디션 최상", key: "firstround" },
      { text: "말 한마디 안 했는데 기 빨려서 녹초", key: "observer" },
    ],
  },
  {
    text: "택시 타고 집에 가는 길, 머릿속을 채운 생각은?",
    options: [
      { text: "\"아… 3차까지 갔어야 했는데\"", key: "lastman" },
      { text: "\"법카 영수증 단톡에 올렸나?\"", key: "manager" },
    ],
  },
  {
    text: "갑자기 부장님이 \"자, 이번엔 ○○ 씨가 건배사 한번 해 봐!\"",
    options: [
      { text: "삼행시 건배사로 빵 터뜨리고 착석", key: "mc" },
      { text: "\"위하여!\" 세 글자로 끝내고 착석", key: "firstround" },
    ],
  },
  {
    text: "일주일 뒤, 그 회식을 떠올리면 제일 먼저 생각나는 건?",
    options: [
      { text: "새벽 2시 포장마차에서 들은 과장님 연애사", key: "lastman" },
      { text: "누가 누구 말에 표정이 굳었는지", key: "observer" },
    ],
  },
];

const HOESIKTYPE_APPEARANCES = 4;

const HOESIKTYPE_RESULTS = [
  {
    id: "mc",
    emoji: "🎤",
    title: "분위기 메이커",
    subtitle: "내가 있으면 자리가 사는 타입",
    summary: "어색한 공기를 견디지 못하고 먼저 판을 돌리는 타입이에요. 덕분에 회식이 고문이 아니라 자리가 됩니다. 다들 고마워하지만 정작 티를 안 내죠. 알아둘 건 하나예요. 분위기를 띄우는 것도 노동이고, 나도 피곤한 날이 있다는 걸 말해도 됩니다.",
    traits: ["어색한 침묵을 못 견딤", "먼저 말을 꺼내 판을 돌림", "즐거운 역할이 기본값이 되어 있음"],
    color: "#F97316",
    compat: {
      best: { id: "observer", reason: "내가 띄우면 조용히 받쳐줘서 균형이 잘 맞아요" },
      worst: { id: "firstround", reason: "이제 좀 달아오르려는데 상대는 이미 나갈 준비 중이에요" },
    },
  },
  {
    id: "manager",
    emoji: "🧾",
    title: "총무형",
    subtitle: "이 사람 없으면 회식이 안 굴러가는 타입",
    summary: "인원, 메뉴, 예산, 계산까지 알아서 정리되는 타입이에요. 눈에 잘 안 띄지만 빠지면 그제야 존재감이 드러납니다. 문제는 이 역할이 고정되기 쉽다는 점이에요. 가끔은 \"오늘은 다른 분이 해주세요\"라고 말해도 아무 일 안 생깁니다.",
    traits: ["숫자와 정산이 머릿속에 정리됨", "챙기는 게 습관이 되어 있음", "빠지면 그제야 티가 나는 역할"],
    color: "#0D9488",
    compat: {
      best: { id: "mc", reason: "분위기는 상대가, 진행은 내가 맡으면 완벽한 조합이에요" },
      worst: { id: "lastman", reason: "끝까지 가는 상대를 챙기다 보면 내 체력이 먼저 바닥나요" },
    },
  },
  {
    id: "observer",
    emoji: "👀",
    title: "조용한 관찰자",
    subtitle: "말은 적은데 다 보고 있는 타입",
    summary: "말수는 적지만 그 자리에서 정보를 가장 많이 가져가는 타입이에요. 누가 누구와 편한지, 분위기가 언제 바뀌었는지 제일 먼저 알아챕니다. 나서는 사람은 자기 말에 집중하느라 오히려 못 보죠. 다만 듣는 것도 에너지를 쓰니, 끝나고 지치는 건 당연한 일이에요.",
    traits: ["말수는 적고 관찰량은 많음", "분위기 변화를 제일 먼저 감지함", "조용히 있어도 끝나면 피곤함"],
    color: "#475569",
    compat: {
      best: { id: "mc", reason: "상대가 앞에서 끌어주니 나는 편하게 있을 수 있어요" },
      worst: { id: "lastman", reason: "자리가 길어질수록 내 방전 속도가 빨라져요" },
    },
  },
  {
    id: "firstround",
    emoji: "🚪",
    title: "1차 요정",
    subtitle: "박수 칠 때 떠나는 타입",
    summary: "1차까지는 성실하게, 그다음은 과감하게 사라지는 타입이에요. 자리의 흥을 깨지 않으면서 빠지는 기술이 있죠. 사실 이게 다음 날 컨디션까지 지키는 가장 현명한 방식입니다. 미안해하지 않으셔도 돼요. 끝까지 남는 게 성의의 척도는 아니니까요.",
    traits: ["빠질 타이밍을 정확히 안다", "다음 날 컨디션을 우선함", "출입구 쪽 자리를 선호함"],
    color: "#0EA5E9",
    compat: {
      best: { id: "observer", reason: "서로 무리하지 않아 부담 없이 함께할 수 있어요" },
      worst: { id: "mc", reason: "분위기가 달아오를 때 빠지면 아쉬워하는 소리를 듣게 돼요" },
    },
  },
  {
    id: "lastman",
    emoji: "🌅",
    title: "끝까지 남는 자",
    subtitle: "해 뜰 때까지 자리를 지키는 타입",
    summary: "좋은 자리를 쉽게 끝내지 못하는 타입이에요. 사람들과 있는 시간 자체를 즐기고, 2차 3차에서 오히려 진짜 대화가 나온다고 믿습니다. 실제로 관계가 깊어지는 순간이 거기 있기도 하죠. 다만 다음 날의 나에게도 발언권을 주면 좋겠어요.",
    traits: ["자리가 끝나는 걸 아쉬워함", "2차 이후에 진짜 대화가 나온다고 믿음", "다음 날 후회는 다음 날의 몫"],
    color: "#9333EA",
    compat: {
      best: { id: "mc", reason: "끝까지 텐션이 맞아서 자리가 늘어나도 즐거워요" },
      worst: { id: "firstround", reason: "이제 시작인데 상대는 이미 집에 가 있어요" },
    },
  },
];

function getHoesikTypeById(id) {
  return HOESIKTYPE_RESULTS.find((r) => r.id === id);
}

function tallyToHoesikTypeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["mc", "manager", "observer", "firstround", "lastman"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getHoesikTypeById(best);
}
