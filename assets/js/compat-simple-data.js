// 간단 궁합보기 데이터/로직
// 실제 역학/사주가 아니라, 이름 + 생년월일 두 사람 정보를 조합한 해시 기반
// 결과예요. 같은 두 사람 조합이면 순서를 바꿔 넣어도(A↔B) 항상 같은 결과가
// 나오도록 두 사람의 키를 정렬해서 시드를 만듦(실제 궁합처럼 "누가 먼저"는
// 의미가 없게 하기 위함).

function hashSeedCompat(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function normalizePersonKey(name, dateStr) {
  return (name || "").trim().replace(/\s+/g, "") + "-" + (dateStr || "");
}

// 두 값 중 무엇을 A/B로 넣어도 항상 같은 시드가 나오도록 정렬해서 합침
function buildCoupleSeed(keyA, keyB) {
  var arr = [String(keyA), String(keyB)].sort();
  return arr[0] + "::" + arr[1];
}

var COMPAT_GRADE_META = [
  { min: 90, id: "soulmate", emoji: "💞", title: "천생연분", color: "#DB2777", desc: "정말 찾기 힘든 궁합이에요! 서로가 서로에게 꼭 맞는 퍼즐 조각 같은 케미예요." },
  { min: 75, id: "great", emoji: "💘", title: "찰떡궁합", color: "#EC4899", desc: "정말 잘 어울리는 조합이에요. 함께 있으면 자연스럽게 시너지가 나는 사이예요." },
  { min: 60, id: "good", emoji: "😊", title: "좋은 인연", color: "#F59E0B", desc: "무난하면서도 편안한 궁합이에요. 서로 노력하는 만큼 좋은 관계로 이어질 수 있어요." },
  { min: 40, id: "normal", emoji: "🙂", title: "무난한 케미", color: "#0EA5E9", desc: "특별히 튀지도 부딪히지도 않는 사이예요. 서로를 알아가는 재미가 있는 조합이에요." },
  { min: 0, id: "effort", emoji: "🌱", title: "노력이 필요한 케미", color: "#64748B", desc: "처음엔 안 맞는 부분이 보일 수 있지만, 서로 다른 매력을 배워가면 의외로 오래가는 사이가 될 수 있어요." },
];

function getCompatGrade(score) {
  for (var i = 0; i < COMPAT_GRADE_META.length; i++) {
    if (score >= COMPAT_GRADE_META[i].min) return COMPAT_GRADE_META[i];
  }
  return COMPAT_GRADE_META[COMPAT_GRADE_META.length - 1];
}

var COMPAT_STRENGTHS = [
  "대화가 잘 통해서 같이 있으면 시간 가는 줄 몰라요.",
  "서로의 다른 점을 신기해하며 재밌어하는 스타일이에요.",
  "위기 상황에서 의외로 손발이 척척 맞는 편이에요.",
  "취향은 달라도 서로의 취향을 존중해주는 사이예요.",
  "같이 있으면 편안해서 있는 그대로의 모습을 보여줄 수 있어요.",
  "서로에게 좋은 자극이 되어서 함께 성장하는 관계예요.",
  "유머 코드가 잘 맞아서 같이 있으면 웃을 일이 많아요.",
  "말하지 않아도 은근히 서로를 잘 챙겨주는 편이에요.",
  "각자의 속도를 존중해줘서 부담 없이 편안한 사이예요.",
  "작은 기념일도 잘 챙기며 서로에게 정성을 쏟는 편이에요.",
];

var COMPAT_CAUTIONS = [
  "가끔 사소한 일로 오해가 생길 수 있으니 대화로 잘 풀어보세요.",
  "서로 표현 방식이 달라서 오해가 생기지 않게 조심하는 게 좋아요.",
  "한쪽이 너무 맞춰주다 보면 서운함이 쌓일 수 있어요.",
  "속도 차이가 있을 수 있으니 서로 페이스를 맞춰가면 좋아요.",
  "가끔은 솔직한 대화로 서로의 생각을 확인해보는 게 도움이 돼요.",
  "너무 잘 맞아서 오히려 권태로워질 수 있으니 새로운 자극을 더해보세요.",
  "고집을 부리기 시작하면 둘 다 지지 않으려는 편이니 한 발씩 양보해보세요.",
  "바쁘다는 핑계로 서로에게 소홀해지지 않도록 신경 써보세요.",
];

// 풀에서 시드 기반으로 서로 겹치지 않는 n개를 선택
function pickN(pool, seed, n) {
  var indices = [];
  var used = {};
  var i = 0;
  while (indices.length < n && i < pool.length * 4) {
    var idx = hashSeedCompat(seed + "-" + i) % pool.length;
    if (!used[idx]) {
      used[idx] = true;
      indices.push(idx);
    }
    i++;
  }
  return indices.map(function (idx) {
    return pool[idx];
  });
}

function getSimpleCompatResult(nameA, dateA, nameB, dateB) {
  var keyA = normalizePersonKey(nameA, dateA);
  var keyB = normalizePersonKey(nameB, dateB);
  var coupleSeed = buildCoupleSeed(keyA, keyB);

  var nameSeed = buildCoupleSeed((nameA || "").trim().replace(/\s+/g, ""), (nameB || "").trim().replace(/\s+/g, ""));
  var dateSeed = buildCoupleSeed(dateA, dateB);

  var nameScore = 40 + (hashSeedCompat(nameSeed + "-name") % 61); // 40~100
  var dateScore = 40 + (hashSeedCompat(dateSeed + "-date") % 61); // 40~100
  var bonus = hashSeedCompat(coupleSeed + "-bonus") % 11; // 0~10
  var overall = Math.round(nameScore * 0.45 + dateScore * 0.45 + bonus);
  overall = Math.max(15, Math.min(100, overall));

  var grade = getCompatGrade(overall);
  var strengths = pickN(COMPAT_STRENGTHS, coupleSeed + "-str", 2);
  var cautions = pickN(COMPAT_CAUTIONS, coupleSeed + "-caut", 1);

  return {
    overall: overall,
    nameScore: nameScore,
    dateScore: dateScore,
    grade: grade,
    strengths: strengths,
    cautions: cautions,
  };
}
