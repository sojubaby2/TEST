/* ============================================================
   긍정왕 지수 - 문항 및 결과 데이터
   ※ 본 콘텐츠는 재미 목적의 심리테스트이며 전문적인 진단이 아닙니다.
   ============================================================ */

const POSITIVITYINDEX_QUESTIONS = [
  { text: "아침에 눈을 뜨면", options: [ { text: "\"오늘도 좋은 일 있겠지\" 하고 기대된다", score: 2 }, { text: "그냥 평범하게 하루를 시작한다", score: 1 }, { text: "\"오늘도 힘들겠다\" 싶은 생각이 먼저 든다", score: 0 } ] },
  { text: "계획한 일이 틀어지면", options: [ { text: "\"다른 방법 찾아보자\"며 금방 전환한다", score: 2 }, { text: "잠깐 아쉬워하다 넘어간다", score: 1 }, { text: "한동안 계속 신경 쓰이고 속상하다", score: 0 } ] },
  { text: "실수를 했을 때", options: [ { text: "\"그럴 수도 있지\" 하고 훌훌 털어낸다", score: 2 }, { text: "잠깐 자책하다 넘긴다", score: 1 }, { text: "계속 곱씹으며 자책한다", score: 0 } ] },
  { text: "새로운 도전 앞에서", options: [ { text: "\"일단 해보자!\" 기대감이 앞선다", score: 2 }, { text: "고민은 되지만 결국 해본다", score: 1 }, { text: "걱정부터 앞서서 망설이게 된다", score: 0 } ] },
  { text: "안 좋은 일이 생기면", options: [ { text: "\"이것도 다 지나간다\"고 믿는다", score: 2 }, { text: "시간이 지나면 괜찮아진다", score: 1 }, { text: "오래도록 마음에 남는다", score: 0 } ] },
  { text: "미래를 생각하면", options: [ { text: "기대되고 설레는 일이 더 많다", score: 2 }, { text: "그럭저럭 괜찮을 거라 생각한다", score: 1 }, { text: "불안한 생각이 먼저 든다", score: 0 } ] },
  { text: "주변 사람들이 나를 보면", options: [ { text: "\"에너지 뿜뿜\"이라고 한다", score: 2 }, { text: "무난하다고 한다", score: 1 }, { text: "\"걱정이 많다\"고 한다", score: 0 } ] },
  { text: "일이 잘 안 풀릴 때 나는", options: [ { text: "\"잘 될 거야\" 하고 스스로 다독인다", score: 2 }, { text: "힘들지만 버텨본다", score: 1 }, { text: "\"역시 나는 안되나 봐\" 싶어진다", score: 0 } ] },
  { text: "남들과 비교될 때", options: [ { text: "별로 신경 안 쓰고 내 페이스대로 간다", score: 2 }, { text: "잠깐 신경 쓰이지만 곧 잊는다", score: 1 }, { text: "계속 비교하며 위축된다", score: 0 } ] },
  { text: "하루를 마무리할 때", options: [ { text: "오늘 있었던 좋은 일부터 떠올린다", score: 2 }, { text: "그냥 하루가 갔다고 생각한다", score: 1 }, { text: "아쉬웠던 일들이 자꾸 떠오른다", score: 0 } ] },
];

const POSITIVITYINDEX_MAX_SCORE = 20;

const POSITIVITYINDEX_RESULTS = [
  {
    id: 1, emoji: "🌧️", title: "걱정 많은 신중형", subtitle: "매사에 한 번 더 생각하는 타입",
    min: 0, max: 4, color: "#475569",
    summary: "새로운 일 앞에서 걱정과 고민이 먼저 앞서는 신중한 타입이에요. 그만큼 리스크를 잘 파악하고 실수를 미리 방지하는 능력이 뛰어나요. 가끔은 '잘 될 거야'라는 믿음도 함께 챙겨보면 더 편안해질 수 있어요.",
    traits: ["새로운 일 앞에서 걱정이 먼저 앞서요", "위험 요소를 꼼꼼히 따져보는 편이에요", "안 좋은 일은 오래 마음에 남는 편이에요"],
    compat: { best: { id: 3, reason: "밸런스 긍정형이 적당한 낙관을 나눠줘서 마음이 한결 편해져요" }, worst: { id: 5, reason: "긍정왕 끝판왕의 근거 없는 자신감이 나에겐 불안하게 느껴질 수 있어요" } },
  },
  {
    id: 2, emoji: "🌥️", title: "담담 현실형", subtitle: "일희일비하지 않는 담담한 타입",
    min: 5, max: 8, color: "#0891B2",
    summary: "좋은 일에도 나쁜 일에도 크게 흔들리지 않는 담담한 타입이에요. 지나친 낙관도 비관도 아닌, 있는 그대로를 받아들이는 현실적인 시선을 가졌어요. 묵묵히 자기 페이스를 지키는 뚝심이 매력이에요.",
    traits: ["좋은 일에도 나쁜 일에도 크게 흔들리지 않아요", "감정 기복 없이 담담하게 하루를 살아요", "현실적인 시선으로 상황을 판단해요"],
    compat: { best: { id: 4, reason: "에너자이저 긍정형의 밝은 에너지가 내게 활력을 불어넣어줘요" }, worst: { id: 1, reason: "걱정 많은 신중형과 있으면 둘 다 가라앉는 분위기가 될 수 있어요" } },
  },
  {
    id: 3, emoji: "🌤️", title: "밸런스 긍정형", subtitle: "적당히 낙관하는 균형 잡힌 타입",
    min: 9, max: 12, color: "#16A34A",
    summary: "안 좋은 일이 있어도 금방 툭툭 털고 일어나는 회복탄력성이 좋은 타입이에요. 무조건 긍정도, 무조건 걱정도 아닌 현실적인 낙관주의자예요. 주변 사람들에게 '같이 있으면 편안하다'는 말을 자주 들어요.",
    traits: ["안 좋은 일도 금방 툭툭 털고 일어나요", "현실적이면서도 낙관적인 균형을 가졌어요", "같이 있으면 마음이 편안해지는 타입이에요"],
    compat: { best: { id: 1, reason: "걱정 많은 신중형에게 든든한 안정감을 나눠줄 수 있어요" }, worst: { id: 5, reason: "긍정왕 끝판왕의 과한 에너지를 따라가려면 나도 좀 벅찰 수 있어요" } },
  },
  {
    id: 4, emoji: "☀️", title: "에너자이저 긍정형", subtitle: "밝은 에너지로 주변을 물들이는 타입",
    min: 13, max: 16, color: "#F59E0B",
    summary: "어떤 상황에서도 밝은 면을 먼저 찾아내는 긍정 에너지 부자예요. 그 에너지가 전염성이 강해서 주변 사람들 기분까지 좋아지게 만들어요. 다만 가끔은 힘든 감정도 충분히 느끼고 넘어가는 시간이 필요해요.",
    traits: ["어떤 상황에서도 밝은 면을 먼저 찾아요", "에너지가 넘쳐서 주변까지 밝게 만들어요", "실패해도 금방 다시 일어서는 회복력이 좋아요"],
    compat: { best: { id: 2, reason: "담담 현실형이 내 에너지에 안정감을 더해줘요" }, worst: { id: 1, reason: "걱정 많은 신중형에게는 내 넘치는 텐션이 부담스러울 수 있어요" } },
  },
  {
    id: 5, emoji: "🌈", title: "긍정왕 끝판왕", subtitle: "근거 없는 자신감도 무기가 되는 타입",
    min: 17, max: 20, color: "#DC2626",
    summary: "'안 될 게 뭐 있어!'가 인생 모토인 타고난 낙천주의자예요. 어떤 시련이 와도 금방 훌훌 털고 다음 스텝으로 나아가는 강한 회복력을 가졌어요. 주변 사람들의 기운까지 북돋아주는 인간 비타민 같은 존재예요.",
    traits: ["'안 될 게 뭐 있어'가 인생 모토예요", "시련이 와도 금방 훌훌 털고 일어나요", "주변 사람들 기운까지 북돋아주는 비타민이에요"],
    compat: { best: { id: 2, reason: "담담 현실형이 내 텐션에 균형을 잡아주는 좋은 짝꿍이에요" }, worst: { id: 1, reason: "걱정 많은 신중형은 내 낙천적인 반응을 불안해할 수 있어요" } },
  },
];

function getPositivityIndexResult(score) {
  return POSITIVITYINDEX_RESULTS.find((r) => score >= r.min && score <= r.max) || POSITIVITYINDEX_RESULTS[POSITIVITYINDEX_RESULTS.length - 1];
}

function getPositivityIndexById(id) {
  return POSITIVITYINDEX_RESULTS.find((r) => r.id === Number(id));
}
