/* ============================================================
   나의 수면 유형 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   tools/new-test.ps1 로 생성됨 - content/tests/sleep-type.json 을 고치세요
   ============================================================ */

const SLEEPTYPE_QUESTIONS = [
  {
    text: "알람 없는 일요일, 저절로 눈이 떠졌다. 시계를 보니?",
    options: [
      { text: "7시. 늦게 잤는데도 몸이 알아서 깸", key: "morning" },
      { text: "오후 1시. 해가 이미 꺾였다", key: "night" },
    ],
  },
  {
    text: "점심 먹고 돌아온 오후 2시의 사무실.",
    options: [
      { text: "책상에 엎드려 15분은 자야 오후가 산다", key: "nap" },
      { text: "옆자리 키보드 소리 하나에 집중이 와르르", key: "light" },
    ],
  },
  {
    text: "친구들과 펜션 1박, 거실 바닥에서 자야 한다.",
    options: [
      { text: "이불 한 장이면 충분, 제일 먼저 기절", key: "rock" },
      { text: "다들 떠들 때 먼저 자고 6시에 혼자 산책", key: "morning" },
    ],
  },
  {
    text: "기가 막힌 아이디어가 떠오르는 순간은?",
    options: [
      { text: "새벽 2시, 불 끄고 누웠을 때", key: "night" },
      { text: "20분 낮잠에서 막 깼을 때", key: "nap" },
    ],
  },
  {
    text: "새벽 3시, 윗집에서 쿵 소리가 났다.",
    options: [
      { text: "아침에 가족이 말해 줘서 처음 앎", key: "rock" },
      { text: "그 뒤로 해 뜰 때까지 천장만 봄", key: "light" },
    ],
  },
  {
    text: "친구가 토요일 아침 8시 브런치를 제안했다.",
    options: [
      { text: "\"좋아! 그 전에 운동도 하고 갈게\"", key: "morning" },
      { text: "\"그거 저녁 8시 말하는 거지?\"", key: "night" },
    ],
  },
  {
    text: "퇴근 지하철, 운 좋게 자리에 앉았다.",
    options: [
      { text: "두 정거장 만에 고개가 툭", key: "nap" },
      { text: "앉아서는 못 잠. 대신 누우면 3초 컷", key: "rock" },
    ],
  },
  {
    text: "불 끄고 누운 밤 12시, 내 머릿속은?",
    options: [
      { text: "낮에 한 말 하나 곱씹느라 뒤척뒤척", key: "light" },
      { text: "갑자기 정신이 맑아지며 할 일이 떠오름", key: "night" },
    ],
  },
  {
    text: "바빴던 이번 주, 컨디션을 지켜 준 비결은?",
    options: [
      { text: "매일 11시 취침, 6시 반 기상 루틴", key: "morning" },
      { text: "점심시간, 이동 시간마다 쪽잠 충전", key: "nap" },
    ],
  },
  {
    text: "밤새 야근한 다음 날의 나는?",
    options: [
      { text: "커피 한 잔이면 멀쩡, 그날 밤 꿀잠", key: "rock" },
      { text: "작은 소리에도 예민 폭발, 말 한마디에 욱", key: "light" },
    ],
  },
];

const SLEEPTYPE_APPEARANCES = 4;

const SLEEPTYPE_RESULTS = [
  {
    id: "morning",
    emoji: "🐦",
    title: "아침형 새",
    subtitle: "이른 시간에 가장 또렷해지는 타입",
    summary: "아침 시간대에 컨디션이 가장 좋은 타입이에요. 사회의 기본 일정과 리듬이 잘 맞아서 생활이 수월한 편입니다. 수면 연구에서도 규칙적인 기상 시간이 컨디션에 가장 크게 작용한다고 보는데, 이미 그걸 하고 있는 셈이죠. 주말에도 기상 시간을 크게 흔들지 않으면 계속 유지됩니다.",
    traits: ["이른 시간에 집중이 잘됨", "취침·기상 시간이 규칙적", "늦은 약속을 부담스러워함"],
    color: "#F59E0B",
    compat: {
      best: { id: "rock", reason: "둘 다 수면 리듬이 안정적이라 생활 패턴이 잘 맞아요" },
      worst: { id: "night", reason: "활동 시간대가 정반대라 같이 지내려면 조율이 필요해요" },
    },
  },
  {
    id: "night",
    emoji: "🌙",
    title: "새벽 감성러",
    subtitle: "모두가 잠든 시간에 살아나는 타입",
    summary: "밤이 깊을수록 집중력과 감성이 올라가는 타입이에요. 방해 없는 시간이라 몰입하기 좋죠. 다만 알아두면 좋은 게 있어요. 피로가 쌓이면 감정을 조절하는 기능이 약해집니다. 새벽의 감정이 유난히 크게 느껴지는 데는 이런 이유가 있어요. 중요한 연락은 아침에 하시는 걸 권합니다.",
    traits: ["밤에 집중력이 올라감", "아침 일정을 특히 힘들어함", "새벽에 감정이 커지는 편"],
    color: "#4F46E5",
    compat: {
      best: { id: "nap", reason: "부족한 잠을 낮에 메우는 방식이 서로 통해요" },
      worst: { id: "morning", reason: "깨어 있는 시간대가 거의 겹치지 않아요" },
    },
  },
  {
    id: "nap",
    emoji: "😪",
    title: "낮잠 요정",
    subtitle: "짧게 자고 다시 살아나는 타입",
    summary: "한 번에 길게 자기보다 틈틈이 충전하는 타입이에요. 짧은 낮잠이 실제로 집중력 회복에 도움이 된다는 연구가 많으니 꽤 효율적인 방식입니다. 다만 낮잠이 30분을 넘기면 오히려 더 무거워지고 밤잠에도 영향을 줘요. 20분 안쪽으로 끊는 게 요령입니다.",
    traits: ["짧은 잠으로 회복이 빠름", "어디서든 잠깐 졸 수 있음", "한 번에 길게 자는 일이 드묾"],
    color: "#0D9488",
    compat: {
      best: { id: "night", reason: "밤에 부족한 잠을 낮에 메우는 리듬이 비슷해요" },
      worst: { id: "light", reason: "아무 데서나 자는 나를 상대는 신기해하며 부러워해요" },
    },
  },
  {
    id: "rock",
    emoji: "🪨",
    title: "돌덩이 수면형",
    subtitle: "한번 자면 세상이 무너져도 모르는 타입",
    summary: "깊게 자고 웬만한 자극에 깨지 않는 타입이에요. 수면의 질이 좋은 편이라 잠으로 회복이 확실히 됩니다. 어디서든 잘 수 있다는 것도 큰 장점이죠. 다만 알람을 못 듣는 일이 잦다면 알람을 침대에서 먼 곳에 두는 고전적인 방법이 여전히 제일 잘 통합니다.",
    traits: ["소음과 빛에 잘 깨지 않음", "어디서든 잘 자는 편", "알람을 못 듣는 일이 종종 있음"],
    color: "#64748B",
    compat: {
      best: { id: "morning", reason: "수면이 안정적인 쪽끼리라 생활 리듬이 편해요" },
      worst: { id: "light", reason: "내 뒤척임이나 소리가 상대의 잠을 깨울 수 있어요" },
    },
  },
  {
    id: "light",
    emoji: "🌡️",
    title: "예민한 선잠형",
    subtitle: "작은 자극에도 잠이 흔들리는 타입",
    summary: "빛, 소리, 온도에 민감해서 수면 환경이 조금만 달라져도 영향을 받는 타입이에요. 감각이 예민한 기질과 이어지는 경우가 많습니다. 실질적으로 도움이 되는 건 환경을 바꾸는 쪽이에요. 암막, 귀마개, 일정한 실내 온도처럼 물리적인 조건을 먼저 정리해보세요.",
    traits: ["작은 소리와 빛에도 깸", "잠자리가 바뀌면 잘 못 잠", "잠들기까지 시간이 걸리는 편"],
    color: "#DB2777",
    compat: {
      best: { id: "morning", reason: "규칙적인 리듬을 가진 상대와 있으면 내 수면도 안정돼요" },
      worst: { id: "rock", reason: "상대의 뒤척임이나 소리에 내가 먼저 깨게 돼요" },
    },
  },
];

function getSleepTypeById(id) {
  return SLEEPTYPE_RESULTS.find((r) => r.id === id);
}

function tallyToSleepTypeResult(tally) {
  let best = null;
  let bestCount = -1;
  const order = ["morning", "night", "nap", "rock", "light"]; // 동점 시 우선순위
  order.forEach((key) => {
    const count = tally[key] || 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  });
  return getSleepTypeById(best);
}
