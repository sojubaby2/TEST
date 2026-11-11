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
  "익숙함에 권태로워지지 않도록 가끔 새로운 자극을 더해보세요.",
  "고집을 부리기 시작하면 둘 다 지지 않으려는 편이니 한 발씩 양보해보세요.",
  "바쁘다는 핑계로 서로에게 소홀해지지 않도록 신경 써보세요.",
];

// 풀에서 시드 기반으로 서로 겹치지 않는 n개를 선택
// [2026-11-11] 숫자를 골고루 섞는 함수.
//   예전에는 "잘 맞는 점" 두 개가 늘 목록에서 바로 붙어 있는 두 문장이라 45가지 짝 중 10가지만 나왔어요.
function mixCompat(h) {
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0;
  h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16; return h >>> 0;
}

function pickN(pool, seed, n) {
  var indices = [];
  var used = {};
  var i = 0;
  while (indices.length < n && i < pool.length * 4) {
    var idx = mixCompat(hashSeedCompat(seed + "-" + i)) % pool.length;
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

/* ============================================================
   [2026-11-11 추가] 생년월일로 실제로 따져 보는 부분
   - 위 점수는 이름·날짜로 만든 재미 점수라 근거 설명이 없었어요.
   - 여기서는 두 사람의 생년월일에서 띠·별자리·나이 차이·태어난 계절을 뽑아,
     전통 띠 궁합(삼합·육합·충·원진)과 별자리 원소 궁합 규칙으로 실제 풀이를 만듭니다.
   - 띠는 입춘(2월 4일 무렵)을 기준으로 바뀌는 것으로 계산합니다.
   ============================================================ */
var CS_ANIMALS = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
var CS_SAMHAP = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]];
var CS_SAMHAP_WORD = ["생각이 빠르고 꾀가 많다는", "꾸준하고 끈기가 있다는", "뜨겁고 행동이 앞선다는", "부드럽고 정이 많다는"];
var CS_YUKHAP = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
var CS_WONJIN = [[0, 7], [1, 6], [2, 9], [3, 8], [4, 11], [5, 10]];
var CS_SIGNS = [
  ["염소자리", 1, 19, "흙"], ["물병자리", 2, 18, "바람"], ["물고기자리", 3, 20, "물"], ["양자리", 4, 19, "불"],
  ["황소자리", 5, 20, "흙"], ["쌍둥이자리", 6, 21, "바람"], ["게자리", 7, 22, "물"], ["사자자리", 8, 22, "불"],
  ["처녀자리", 9, 22, "흙"], ["천칭자리", 10, 23, "바람"], ["전갈자리", 11, 22, "물"], ["사수자리", 12, 21, "불"]
];
function csParseDate(str) {
  var m = String(str || "").match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;
  return { y: +m[1], m: +m[2], d: +m[3] };
}
function csAnimalIndex(dt) {
  var y = (dt.m === 1 || (dt.m === 2 && dt.d < 4)) ? dt.y - 1 : dt.y;
  return (((y - 4) % 12) + 12) % 12;
}
function csSign(dt) {
  for (var i = 0; i < CS_SIGNS.length; i++) {
    if (dt.m === CS_SIGNS[i][1]) return dt.d <= CS_SIGNS[i][2] ? CS_SIGNS[i] : CS_SIGNS[(i + 1) % 12];
  }
  return CS_SIGNS[0];
}
function csSeason(m) { return m >= 3 && m <= 5 ? "봄" : m >= 6 && m <= 8 ? "여름" : m >= 9 && m <= 11 ? "가을" : "겨울"; }
function csHasPair(list, a, b) {
  return list.some(function (p) { return (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a); });
}
function csIga(w) { var c = w.charCodeAt(w.length - 1); return (c - 0xac00) % 28 !== 0 ? "과" : "와"; }
function getBirthCompatDetail(nameA, dateA, nameB, dateB) {
  var A = csParseDate(dateA), B = csParseDate(dateB);
  if (!A || !B) return [];
  var na = (nameA || "첫 번째 사람").trim(), nb = (nameB || "두 번째 사람").trim();
  var out = [];

  // 1) 띠 궁합
  var ia = csAnimalIndex(A), ib = csAnimalIndex(B), an = CS_ANIMALS[ia], bn = CS_ANIMALS[ib];
  var head = na + "님은 <b>" + an + "띠</b>, " + nb + "님은 <b>" + bn + "띠</b>예요. ";
  var body;
  var samIdx = -1;
  CS_SAMHAP.forEach(function (g, i) { if (g.indexOf(ia) !== -1 && g.indexOf(ib) !== -1) samIdx = i; });
  var diff = Math.abs(ia - ib);
  if (ia === ib) {
    body = "같은 띠끼리는 생각하는 방식이 닮아 <b>말이 잘 통하는 대신, 고집도 닮아</b> 한번 부딪히면 오래 간다고 봐요. 먼저 사과하는 사람을 정해 두면 편합니다.";
  } else if (samIdx !== -1) {
    body = "전통 띠 궁합에서 가장 좋게 치는 <b>삼합(三合)</b> 관계예요. 두 띠 모두 " + CS_SAMHAP_WORD[samIdx] + " 공통점이 있어, <b>목표가 같을 때 힘이 몇 배로 붙는다</b>고 풀이합니다.";
  } else if (csHasPair(CS_YUKHAP, ia, ib)) {
    body = "서로 짝을 이루는 <b>육합(六合)</b> 관계예요. 성격은 달라도 <b>한쪽의 모자란 부분을 다른 쪽이 메워 주는</b> 궁합으로, 오래 볼수록 편해진다고 전해져요.";
  } else if (diff === 6) {
    body = "열두 띠에서 정반대에 놓인 <b>충(沖)</b> 관계예요. 끌림은 강하지만 <b>생활 방식과 속도가 정반대</b>라 부딪히기 쉽다고 봅니다. 서로 고치려 들기보다 영역을 나누는 편이 좋아요.";
  } else if (csHasPair(CS_WONJIN, ia, ib)) {
    body = "전통적으로 <b>원진(怨嗔)</b>이라 부르는 관계예요. 큰 다툼보다 <b>사소한 말투와 습관이 거슬리기 쉬운</b> 사이로 풀이합니다. 서운한 건 쌓아 두지 말고 그때그때 가볍게 말하는 게 약이에요.";
  } else {
    body = "삼합·육합처럼 특별히 끌어당기는 관계도, 충·원진처럼 부딪히는 관계도 아닌 <b>무난한 사이</b>예요. 띠보다는 두 사람이 함께 보낸 시간이 궁합을 만들어 간다고 봅니다.";
  }
  out.push({ emoji: "🐾", title: "띠로 본 궁합", text: head + body });

  // 2) 별자리 원소
  var sa = csSign(A), sb = csSign(B), ea = sa[3], eb = sb[3];
  var pair = [ea, eb].sort().join("+");
  var signText = na + "님은 <b>" + sa[0] + "</b>(" + ea + "의 별자리), " + nb + "님은 <b>" + sb[0] + "</b>(" + eb + "의 별자리)예요. ";
  if (ea === eb) {
    signText += "같은 원소끼리라 <b>기본 온도가 비슷해요.</b> " +
      ({ "불": "둘 다 뜨겁고 빨라서 재미는 넘치지만, 화낼 때도 같이 타오르니 식힐 시간을 두세요.",
         "흙": "둘 다 현실적이고 꾸준해서 믿음이 쌓이지만, 변화가 필요할 때 서로 미루기 쉬워요.",
         "바람": "둘 다 대화와 호기심을 좋아해 지루할 틈이 없지만, 결정과 마무리는 누군가 맡아야 해요.",
         "물": "둘 다 감정이 깊어 말없이도 통하지만, 한쪽이 가라앉으면 같이 가라앉기 쉬워요." })[ea];
  } else if (pair === "바람+불") {
    signText += "바람은 불을 키워 줘요. <b>한쪽의 아이디어가 다른 쪽의 추진력을 만나는</b> 궁합으로, 같이 무언가를 벌일 때 가장 빛납니다.";
  } else if (pair === "물+흙") {
    signText += "흙은 물을 담아 주고 물은 흙을 적셔 줘요. <b>감정을 받아 주는 사람과 중심을 잡아 주는 사람</b>으로 역할이 나뉘는 안정적인 궁합입니다.";
  } else if (pair === "물+불") {
    signText += "불과 물은 온도가 정반대예요. <b>한쪽은 바로 말하고 한쪽은 속으로 삭이는</b> 식이라 오해가 생기기 쉽습니다. 표현 방식을 서로 알려 두면 크게 달라져요.";
  } else if (pair === "불+흙") {
    signText += "불은 앞서가고 흙은 지키려 해요. <b>속도 차이</b>가 가장 큰 숙제지만, 한쪽이 벌이고 한쪽이 다지면 오히려 탄탄한 조합이 됩니다.";
  } else if (pair === "물+바람") {
    signText += "바람은 머리로, 물은 마음으로 움직여요. <b>한쪽은 설명을, 한쪽은 공감을 먼저 바라는</b> 차이가 있습니다. 해결책보다 맞장구를 먼저 건네 보세요.";
  } else {
    signText += "바람은 자유롭고 흙은 한결같아요. <b>계획을 중시하는 쪽과 즉흥을 즐기는 쪽</b>으로 갈리기 쉬우니, 꼭 지킬 약속만 정해 두고 나머지는 풀어 두는 게 좋습니다.";
  }
  out.push({ emoji: "✨", title: "별자리로 본 궁합", text: signText });

  // 3) 나이 차이 · 태어난 계절
  var da = new Date(A.y, A.m - 1, A.d), db = new Date(B.y, B.m - 1, B.d);
  var gapDays = Math.abs(da - db) / 864e5, gapYears = Math.floor(gapDays / 365.25);
  var older = da <= db ? na : nb;
  var gapText;
  if (gapDays < 1) gapText = "두 사람은 <b>생일이 같아요.</b> 같은 날 태어난 사이는 흔치 않은 인연이에요.";
  else if (gapYears < 1) gapText = "두 사람은 <b>한 살 차이도 나지 않는 또래</b>예요. 겪어 온 유행과 추억이 같아 친구처럼 편한 대신, 서로 지지 않으려는 마음도 생기기 쉽습니다.";
  else if (gapYears <= 3) gapText = "<b>" + older + "님이 " + gapYears + "살 위</b>예요. 세대 차이는 거의 없고, 한 발 앞선 쪽이 자연스럽게 이끌어 주기 좋은 차이입니다.";
  else if (gapYears <= 7) gapText = "<b>" + older + "님이 " + gapYears + "살 위</b>예요. 겪어 온 시기가 조금 달라 관심사가 엇갈릴 수 있지만, 그만큼 서로에게 배울 것도 많은 차이예요.";
  else gapText = "<b>" + older + "님이 " + gapYears + "살 위</b>예요. 살아온 시대가 달라 당연하게 여기는 것이 다를 수 있어요. '그 나이 땐 다 그래'보다 '그때는 어땠어?'라고 묻는 쪽이 사이를 좁혀 줍니다.";
  var sA = csSeason(A.m), sB = csSeason(B.m);
  gapText += " 태어난 계절은 " + na + "님이 <b>" + sA + "</b>, " + nb + "님이 <b>" + sB + "</b>이에요. " +
    (sA === sB ? "같은 계절에 태어나 좋아하는 날씨와 기운이 오르는 시기가 비슷합니다."
               : "서로 다른 계절이라, 한 사람이 지치는 철에 다른 사람이 힘을 내 줄 수 있어요.");
  out.push({ emoji: "📅", title: "나이 차이와 태어난 계절", text: gapText });
  return out;
}
