/* ============================================================
   꼰대력 테스트 - 문항 및 결과 데이터
   ============================================================ */

const KKONDAE_QUESTIONS = [
  { text: "후배가 일을 잘 못하면?", options: [ { text: "차근차근 알려준다", score: 1 }, { text: "요즘 애들은 왜 저러나 싶다", score: 2 }, { text: "그럴 수도 있다고 넘어간다", score: 0 } ] },
  { text: "회식 참석에 대한 내 생각은?", options: [ { text: "가고 싶은 사람만 가면 된다", score: 0 }, { text: "다 같이 가야 정이 쌓인다", score: 2 }, { text: "적당히 참석을 권유하는 편이다", score: 1 } ] },
  { text: "옛날 얘기가 나오면 나는?", options: [ { text: "'나 때는 말이야'를 자주 꺼낸다", score: 2 }, { text: "가끔 옛날 얘기를 하는 편이다", score: 1 }, { text: "옛날 얘기는 잘 안 하는 편이다", score: 0 } ] },
  { text: "후배가 칼같이 정시 퇴근하면?", options: [ { text: "당연한 권리라고 생각한다", score: 0 }, { text: "요즘 애들 열정이 부족하다 싶다", score: 2 }, { text: "부럽지만 이해는 한다", score: 1 } ] },
  { text: "모르는 신조어/밈을 보면?", options: [ { text: "적극적으로 찾아보고 배운다", score: 0 }, { text: "저런 걸 왜 쓰는지 모르겠다 싶다", score: 2 }, { text: "궁금하지만 굳이 안 찾아본다", score: 1 } ] },
  { text: "후배가 다른 의견을 내면?", options: [ { text: "경청하고 반영하려 한다", score: 0 }, { text: "일단 내 방식이 맞다고 우긴다", score: 2 }, { text: "듣긴 하지만 결정은 내가 한다", score: 1 } ] },
  { text: "후배의 옷차림/외모에 대해서는?", options: [ { text: "개인 자유라고 생각한다", score: 0 }, { text: "한마디 지적하고 싶어진다", score: 2 }, { text: "신경 쓰이지만 말은 안 한다", score: 1 } ] },
  { text: "야근/추가 근무에 대한 생각은?", options: [ { text: "성과와는 상관없다고 생각한다", score: 0 }, { text: "열심히 하면 야근도 당연하다 생각한다", score: 2 }, { text: "필요할 때만 하면 된다고 생각한다", score: 1 } ] },
  { text: "단체 메신저에서 후배가 이모티콘을 쓰면?", options: [ { text: "귀엽게 본다", score: 0 }, { text: "예의 없어 보인다고 느낀다", score: 2 }, { text: "딱히 신경 쓰지 않는다", score: 1 } ] },
  { text: "조언을 해주고 싶을 때 나는?", options: [ { text: "물어보면 그때 알려준다", score: 0 }, { text: "안 물어봐도 먼저 알려준다", score: 2 }, { text: "정말 필요해 보일 때만 알려준다", score: 1 } ] },
];

const KKONDAE_MAX_SCORE = 20;

const KKONDAE_RESULTS = [
  {
    id: 1, emoji: "🌱", title: "MZ 인정형", subtitle: "라떼는 안 찾는 쿨내 진동 어른",
    min: 0, max: 4, color: "#10B981",
    summary: "나이나 연차와 상관없이 열린 마음을 가진 타입이에요. 후배의 방식을 존중하고, 새로운 트렌드도 거부감 없이 받아들여요. '라떼는' 소리를 거의 안 해서 후배들에게 편한 선배로 통해요.",
    traits: ["새로운 트렌드를 거부감 없이 받아들임", "후배의 방식을 존중함", "라떼 소리를 거의 안 함"],
    compat: { best: { id: 2, reason: "비슷하게 유연한 성향이라 손발이 잘 맞아요." }, worst: { id: 5, reason: "가치관 차이가 커서 부딪힐 일이 많을 수 있어요." } },
  },
  {
    id: 2, emoji: "😊", title: "유연한 어른형", subtitle: "가끔 옛날 생각나지만 티는 안 내는 편",
    min: 5, max: 8, color: "#0EA5E9",
    summary: "속으로는 가끔 '예전엔 안 그랬는데' 싶을 때도 있지만, 겉으로 티 내지 않고 넘기는 편이에요. 대체로 후배 입장을 이해하려 노력하는 균형 잡힌 어른이에요.",
    traits: ["속마음과 다르게 티를 안 냄", "후배 입장을 이해하려 노력함", "대체로 균형 잡힌 편"],
    compat: { best: { id: 1, reason: "서로 잘 맞춰가는 편안한 케미가 있어요." }, worst: { id: 4, reason: "가끔 튀어나오는 잔소리에 서운함을 느낄 수 있어요." } },
  },
  {
    id: 3, emoji: "🤔", title: "평균 꼰대형", subtitle: "누구나 조금씩은 가지고 있는 딱 그 정도",
    min: 9, max: 12, color: "#F59E0B",
    summary: "특별히 심하지도, 완전히 자유롭지도 않은 딱 평균적인 타입이에요. 상황에 따라 '나 때는' 소리가 나올 때도 있지만, 대체로 스스로 자제하려 노력하는 편이에요.",
    traits: ["상황에 따라 다름", "가끔 옛날 생각이 남", "스스로 자제하려 노력함"],
    compat: { best: { id: 3, reason: "비슷한 성향이라 서로의 잔소리를 이해해줘요." }, worst: { id: 1, reason: "너무 쿨한 상대에게 은근히 서운함을 느낄 수 있어요." } },
  },
  {
    id: 4, emoji: "😤", title: "은근 꼰대형", subtitle: "'나 때는' 소리가 은근히 자주 나오는 편",
    min: 13, max: 16, color: "#EA580C",
    summary: "본인은 아니라고 생각하지만, 주변에선 은근히 꼰대력을 느끼는 타입이에요. '나 때는 말이야'가 저도 모르게 툭 튀어나오고, 후배의 새로운 방식이 낯설게 느껴질 때가 많아요.",
    traits: ["'나 때는' 소리가 자주 나옴", "새로운 방식이 낯설게 느껴짐", "본인은 꼰대가 아니라고 생각함"],
    compat: { best: { id: 2, reason: "적당히 맞춰주는 상대라 크게 부딪히지 않아요." }, worst: { id: 1, reason: "가치관 차이로 자주 부딪힐 수 있어요." } },
  },
  {
    id: 5, emoji: "📢", title: "찐꼰대형", subtitle: "회식·군기·라떼 3종세트 완비",
    min: 17, max: 20, color: "#92400E",
    summary: "누가 봐도 인정하는 진성 꼰대력의 소유자예요. 회식은 필수, 옛날 얘기는 국룰, 안 물어봐도 조언은 기본 탑재. 다만 본인만 모르고 있을 가능성이 높으니, 가끔은 후배 입장에서 한 번쯤 생각해보는 것도 좋아요.",
    traits: ["회식은 무조건 참석이 국룰", "안 물어봐도 조언을 해줌", "옛날 얘기를 자주 꺼냄"],
    compat: { best: { id: 5, reason: "같은 세대 감성이라 통하는 게 많아요." }, worst: { id: 1, reason: "너무 다른 가치관 때문에 답답함을 느낄 수 있어요." } },
  },
];

function getKkondaeResult(score) {
  return KKONDAE_RESULTS.find((r) => score >= r.min && score <= r.max) || KKONDAE_RESULTS[KKONDAE_RESULTS.length - 1];
}

function getKkondaeById(id) {
  return KKONDAE_RESULTS.find((r) => r.id === Number(id));
}
