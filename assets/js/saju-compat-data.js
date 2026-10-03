/* ============================================================
   알아볼괘 - 사주명리학 궁합
   ------------------------------------------------------------
   예전에는 두 사람의 일간 오행만 비교하고 점수는 이름 해시로 만들었습니다.
   이제는 실제로 궁합에서 보는 것들을 계산해서 점수를 냅니다.

     1. 일지(배우자궁)끼리의 합·충   — 궁합에서 가장 크게 봅니다
     2. 용신 주고받기               — 상대가 나에게 보약이 되는 기운을 가졌는가
     3. 일간끼리의 상생·상극
     4. 오행 보완                   — 내게 없는 걸 상대가 채워주는가
     5. 띠(년지)끼리의 합·충
     6. 신강·신약의 조합

   점수는 이 여섯 가지의 합이라서, 같은 두 사람이면 언제 봐도 같은 값이 나옵니다.
   (saju-engine.js 가 먼저 로드되어 있어야 합니다)
   ============================================================ */

var ELEMENT_GENERATES = { 목:"화", 화:"토", 토:"금", 금:"수", 수:"목" };
var ELEMENT_OVERCOMES = { 목:"토", 화:"금", 토:"수", 금:"목", 수:"화" };

var CP_YUKHAP = [["자","축"],["인","해"],["묘","술"],["진","유"],["사","신"],["오","미"]];
var CP_CHUNG  = [["자","오"],["축","미"],["인","신"],["묘","유"],["진","술"],["사","해"]];
var CP_SAMHAP = [["신","자","진"],["인","오","술"],["사","유","축"],["해","묘","미"]];
var CP_HYUNG  = [["인","사"],["사","신"],["인","신"],["축","술"],["술","미"],["축","미"],["자","묘"]];
var CP_HAE    = [["자","미"],["축","오"],["인","사"],["묘","진"],["신","해"],["유","술"]];

function cpPair(list, a, b) {
  return list.some(function (p) {
    return (p[0] === a && p[1] === b) || (p[1] === a && p[0] === b);
  });
}
function cpSamhap(a, b) {
  return CP_SAMHAP.filter(function (g) {
    return g.indexOf(a) !== -1 && g.indexOf(b) !== -1 && a !== b;
  })[0] || null;
}

function getElementRelation(elA, elB) {
  if (elA === elB) return { type:"same" };
  if (ELEMENT_GENERATES[elA] === elB) return { type:"a-generates-b" };
  if (ELEMENT_GENERATES[elB] === elA) return { type:"b-generates-a" };
  if (ELEMENT_OVERCOMES[elA] === elB) return { type:"a-overcomes-b" };
  if (ELEMENT_OVERCOMES[elB] === elA) return { type:"b-overcomes-a" };
  return { type:"same" };
}

var SAJU_COMPAT_META = {
  best:  { id:"sangsaeng", emoji:"💞", title:"서로를 키워주는 궁합", color:"#16A34A" },
  good:  { id:"bihwa",     emoji:"🌤️", title:"무난하게 잘 맞는 궁합", color:"#0EA5E9" },
  mixed: { id:"mixed",     emoji:"🧩", title:"맞춰가면 좋아지는 궁합", color:"#7C3AED" },
  hard:  { id:"sanggeuk",  emoji:"⚡", title:"노력이 필요한 궁합", color:"#F97316" },
};

var EL_WORD_CP = { 목:"나무", 화:"불", 토:"흙", 금:"쇠", 수:"물" };

/* ------------------------------------------------------------
   항목별 채점
   ------------------------------------------------------------ */
function cpScoreItems(A, B, nameA, nameB) {
  var items = [];
  var dayA = A.pillars.day.charAt(1), dayB = B.pillars.day.charAt(1);
  var yearA = A.pillars.year.charAt(1), yearB = B.pillars.year.charAt(1);

  /* 1. 일지(배우자궁) — 가장 크게 봅니다 */
  var sam = cpSamhap(dayA, dayB);
  if (cpPair(CP_YUKHAP, dayA, dayB)) {
    items.push({ key:"배우자궁", score:18, good:true, label:dayA + "·" + dayB + " 육합",
      text:"두 사람의 <b>배우자 자리가 서로 짝을 이룹니다</b>. 궁합에서 가장 좋게 보는 모양이에요. " +
           "말로 설명하기 어렵게 편안하고, 함께 있는 시간이 쌓일수록 안정됩니다." });
  } else if (sam) {
    items.push({ key:"배우자궁", score:14, good:true, label:sam.join("") + " 삼합",
      text:"두 사람의 <b>배우자 자리가 같은 무리로 묶입니다</b>. 가는 방향이 비슷해서 " +
           "큰 그림에서 부딪힐 일이 적어요." });
  } else if (cpPair(CP_CHUNG, dayA, dayB)) {
    items.push({ key:"배우자궁", score:-14, good:false, label:dayA + "·" + dayB + " 충",
      text:"두 사람의 <b>배우자 자리가 정면으로 부딪힙니다</b>. 끌리는 힘도 세지만 " +
           "부딪히는 힘도 센 조합이에요. 가까워질수록 생활 습관 차이가 크게 느껴질 수 있습니다. " +
           "다만 '충'은 변화이지 파탄이 아니라서, 서로 다름을 인정하면 오히려 자극이 되는 관계가 됩니다." });
  } else if (cpPair(CP_HYUNG, dayA, dayB)) {
    items.push({ key:"배우자궁", score:-8, good:false, label:dayA + "·" + dayB + " 형",
      text:"두 사람의 배우자 자리가 <b>서로를 깎는 관계</b>입니다. 사소한 말에서 " +
           "오해가 생기기 쉬우니, 짐작하지 말고 바로 물어보는 습관이 특히 중요해요." });
  } else if (cpPair(CP_HAE, dayA, dayB)) {
    items.push({ key:"배우자궁", score:-5, good:false, label:dayA + "·" + dayB + " 해",
      text:"두 사람의 배우자 자리가 <b>미묘하게 어긋나는 관계</b>입니다. " +
           "작은 어긋남이 쌓이지 않게 그때그때 푸는 게 좋아요." });
  } else {
    items.push({ key:"배우자궁", score:3, good:true, label:"무난",
      text:"두 사람의 배우자 자리가 서로 간섭하지 않습니다. " +
           "끌어당기지도 밀어내지도 않는, 담백한 거리예요. 각자의 영역을 지켜주는 관계가 됩니다." });
  }

  /* 2. 용신 주고받기 — 상대가 나에게 보약이 되는 기운을 가졌는가 */
  function supply(from, to, fromName, toName) {
    var need = to.yongsin.primary;
    var have = from.elements.total[need] || 0;
    if (have >= 4) {
      return { score:9, good:true,
        text:"<b>" + fromName + "님이 " + toName + "님에게 보약이 되는 " + EL_WORD_CP[need] +
             " 기운을 넉넉히 가지고 있습니다.</b> 곁에 있는 것만으로 " + toName +
             "님의 부족한 쪽이 채워지는 구조예요. 궁합에서 아주 좋게 보는 대목입니다." };
    }
    if (have >= 2) {
      return { score:4, good:true,
        text:fromName + "님이 " + toName + "님에게 도움이 되는 " + EL_WORD_CP[need] +
             " 기운을 조금 가지고 있습니다." };
    }
    if (have >= 1) {
      return { score:0, good:true,
        text:fromName + "님이 " + toName + "님에게 필요한 " + EL_WORD_CP[need] +
             " 기운을 아주 조금 가지고 있습니다. 큰 도움이 되는 정도는 아니에요." };
    }
    return { score:-5, good:false,
      text:fromName + "님에게는 " + toName + "님이 필요로 하는 " + EL_WORD_CP[need] +
           " 기운이 없습니다. 서로 채워주는 관계라기보다 각자 채워야 하는 쪽이에요." };
  }
  var sAB = supply(A, B, nameA, nameB);
  var sBA = supply(B, A, nameB, nameA);
  items.push({ key:"기운 보급", score:sAB.score, good:sAB.good, label:nameA + " → " + nameB, text:sAB.text });
  items.push({ key:"기운 보급", score:sBA.score, good:sBA.good, label:nameB + " → " + nameA, text:sBA.text });

  /* 3. 일간끼리 */
  var elA = SajuEngine.STEM[A.dayStem].el, elB = SajuEngine.STEM[B.dayStem].el;
  var rel = getElementRelation(elA, elB);
  if (rel.type === "same") {
    items.push({ key:"성향", score:5, good:true, label:"둘 다 " + EL_WORD_CP[elA],
      text:"두 분 다 <b>" + EL_WORD_CP[elA] + " 기운</b>의 사람입니다. 말하지 않아도 통하는 게 많고 " +
           "취향도 비슷해요. 다만 장단점까지 닮아서 <b>같은 지점에서 함께 흔들릴</b> 수 있습니다." });
  } else if (rel.type.indexOf("generates") !== -1) {
    var gv = rel.type === "a-generates-b" ? nameA : nameB;
    var rc = rel.type === "a-generates-b" ? nameB : nameA;
    items.push({ key:"성향", score:12, good:true, label:"상생",
      text:"<b>" + gv + "님이 " + rc + "님을 북돋아주는</b> 흐름입니다. 한쪽이 힘을 실어주는 관계라 " +
           "함께 있을수록 " + rc + "님이 자라는 걸 느낄 수 있어요. " +
           "다만 주는 쪽만 계속 주면 지치니, 가끔은 방향을 바꿔 주고받아야 합니다." });
  } else {
    var dm = rel.type === "a-overcomes-b" ? nameA : nameB;
    var ot = rel.type === "a-overcomes-b" ? nameB : nameA;
    items.push({ key:"성향", score:-7, good:false, label:"상극",
      text:"<b>" + dm + "님의 기운이 " + ot + "님을 누르는</b> 관계입니다. " +
           ot + "님이 일방적으로 맞추는 느낌을 받기 쉬우니 배려가 필요해요. " +
           "다만 상극이 꼭 나쁜 건 아닙니다. 서로 다른 자극이 발전의 계기가 되기도 해요." });
  }

  /* 4. 오행 보완 */
  var order = ["목","화","토","금","수"];
  var filled = 0, detail = [];
  order.forEach(function (e) {
    var a = A.elements.total[e] || 0, b = B.elements.total[e] || 0;
    if (a === 0 && b >= 2) { filled++; detail.push(nameB + "님이 " + nameA + "님의 빈 " + EL_WORD_CP[e] + "을 채워줌"); }
    if (b === 0 && a >= 2) { filled++; detail.push(nameA + "님이 " + nameB + "님의 빈 " + EL_WORD_CP[e] + "을 채워줌"); }
  });
  if (filled) {
    items.push({ key:"오행 보완", score:Math.min(12, filled * 6), good:true, label:filled + "가지",
      text:"<b>" + detail.join(", ") + "</b>. 한쪽에 없는 기운을 상대가 가지고 있는 구조라, " +
           "서로의 빈 곳을 메워주는 관계입니다." });
  } else {
    items.push({ key:"오행 보완", score:0, good:true, label:"비슷함",
      text:"두 사람의 오행 분포가 비슷합니다. 서로 채워준다기보다 <b>같은 쪽이 강하고 같은 쪽이 약한</b> " +
           "구조예요. 잘 통하는 대신 부족한 부분은 함께 노력해야 합니다." });
  }

  /* 5. 띠(년지) */
  var ysam = cpSamhap(yearA, yearB);
  if (cpPair(CP_YUKHAP, yearA, yearB) || ysam) {
    items.push({ key:"띠 궁합", score:8, good:true, label:yearA + "·" + yearB,
      text:"태어난 해의 글자끼리도 잘 어울립니다. 흔히 말하는 <b>'띠 궁합이 좋다'</b>가 이 대목이에요. " +
           "집안 어른들 눈에도 무난해 보이는 조합입니다." });
  } else if (cpPair(CP_CHUNG, yearA, yearB)) {
    items.push({ key:"띠 궁합", score:-6, good:false, label:yearA + "·" + yearB + " 충",
      text:"태어난 해의 글자끼리 부딪힙니다. 예전에는 이걸 크게 봤지만, 요즘 해석에서는 " +
           "<b>배우자 자리보다 훨씬 가볍게</b> 봅니다. 참고만 하세요." });
  } else {
    items.push({ key:"띠 궁합", score:2, good:true, label:"무난",
      text:"태어난 해의 글자끼리 특별히 부딪히거나 끌어당기지 않습니다." });
  }

  /* 6. 신강·신약 조합 */
  var stA = A.strength.isStrong, stB = B.strength.isStrong;
  if (stA !== stB) {
    var strongName = stA ? nameA : nameB, softName = stA ? nameB : nameA;
    items.push({ key:"힘의 균형", score:6, good:true, label:"서로 보완",
      text:"<b>" + strongName + "님은 밀고 나가는 힘이 있고, " + softName +
           "님은 주변을 쓰는 데 능합니다.</b> 역할이 자연스럽게 나뉘는 조합이에요. " +
           "결정은 " + strongName + "님이, 조율은 " + softName + "님이 맡으면 잘 굴러갑니다." });
  } else if (stA && stB) {
    items.push({ key:"힘의 균형", score:-5, good:false, label:"둘 다 강함",
      text:"<b>두 분 다 주관이 뚜렷하고 밀고 나가는 힘이 셉니다.</b> 각자 능력은 좋지만 " +
           "주도권이 겹칠 때 부딪히기 쉬워요. 영역을 처음에 나눠두면 훨씬 수월합니다." });
  } else {
    items.push({ key:"힘의 균형", score:-2, good:false, label:"둘 다 여림",
      text:"<b>두 분 다 혼자 밀어붙이기보다 주변을 쓰는 쪽</b>입니다. 서로 배려가 깊은 대신, " +
           "중요한 결정을 미루다 때를 놓칠 수 있어요. 결정권자를 미리 정해두면 좋습니다." });
  }

  return items;
}

/* ------------------------------------------------------------
   전체 결과
   ------------------------------------------------------------ */
function getSajuCompatResult(sajuA, sajuB, nameA, nameB) {
  var A = SajuEngine.analyze(sajuA, null);
  var B = SajuEngine.analyze(sajuB, null);

  var items = cpScoreItems(A, B, nameA, nameB);
  var sum = items.reduce(function (s, it) { return s + it.score; }, 0);

  // 무작위 4천 쌍을 돌려 실제 분포를 재고 맞춘 환산식입니다.
  // 원점수는 대략 -15 ~ 70 사이에 퍼지고, 가운데가 25 근처예요.
  // 이걸 늘려서 하위 5%가 38점, 상위 5%가 92점쯤 되도록 옮깁니다.
  // (이렇게 해야 '누구나 90점'이 되지 않고 점수가 뜻을 가집니다)
  var score = Math.round(sum * 1.16 + 35);
  if (score > 97) score = 97;
  if (score < 25) score = 25;

  var metaKey = score >= 82 ? "best" : score >= 68 ? "good" : score >= 52 ? "mixed" : "hard";
  var meta = SAJU_COMPAT_META[metaKey];

  var good = items.filter(function (i) { return i.good && i.score > 0; })
                  .sort(function (x, y) { return y.score - x.score; });
  var bad = items.filter(function (i) { return !i.good; })
                 .sort(function (x, y) { return x.score - y.score; });

  // 한줄평
  var headline;
  if (metaKey === "best") {
    headline = "서로에게 부족한 걸 채워주는 조합입니다. 함께 있을수록 둘 다 나아지는 관계예요.";
  } else if (metaKey === "good") {
    headline = "큰 마찰 없이 잘 지내는 조합입니다. 편안함이 가장 큰 강점이에요.";
  } else if (metaKey === "mixed") {
    headline = "잘 맞는 부분과 부딪히는 부분이 함께 있는 조합입니다. 서로 아는 만큼 좋아지는 관계예요.";
  } else {
    headline = "그대로 두면 부딪히기 쉬운 조합입니다. 다만 사주 궁합이 사람을 갈라놓지는 못해요. 아는 만큼 피할 수 있습니다.";
  }

  // 실천 조언 - 가장 약한 항목에서 뽑습니다
  var tip;
  if (bad.length && bad[0].key === "배우자궁") {
    tip = "생활 습관에서 부딪히기 쉬운 조합이에요. 같이 살기 전에 돈 쓰는 법, 잠자는 시간, 집안일 나누는 법을 한 번은 맞춰보세요.";
  } else if (bad.length && bad[0].key === "힘의 균형") {
    tip = "둘 다 비슷한 자리에서 힘을 쓰려 합니다. '이건 네가 정해'라고 영역을 나눠두면 다툼이 크게 줄어요.";
  } else if (bad.length && bad[0].key === "성향") {
    tip = "의견이 갈릴 때 누가 맞는지 따지기보다, 서로 다른 관점을 배운다는 마음으로 대화해보세요.";
  } else if (bad.length && bad[0].key === "기운 보급") {
    tip = "서로 채워주기 어려운 부분은 각자 밖에서 채우는 게 낫습니다. 상대에게 다 기대하지 않는 게 이 궁합의 지혜예요.";
  } else {
    tip = "잘 맞는 조합일수록 당연하게 여기기 쉬워요. 좋은 점을 가끔 말로 꺼내보세요.";
  }

  return {
    score: score,
    meta: meta,
    headline: headline,
    tip: tip,
    items: items,
    good: good.slice(0, 3),
    bad: bad.slice(0, 3),
    analysisA: A,
    analysisB: B,
    daystemA: getDaystemResult(A.dayStem),
    daystemB: getDaystemResult(B.dayStem),
    countsA: A.elements.total,
    countsB: B.elements.total,
    yongsinA: A.yongsin.primary,
    yongsinB: B.yongsin.primary,
  };
}
