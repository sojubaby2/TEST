// 사주명리학 궁합 데이터/로직
// 이 파일은 assets/js/vendor/manseryeok.min.js(실제 만세력 계산)와
// assets/js/saju-data.js(STEM_INFO, ELEMENT_META, DAYSTEM_RESULTS, countElements,
// getDaystemResult, hashSeedSaju 등)가 먼저 로드된 뒤에 사용해야 함.
//
// 두 사람의 일간(日干) 오행을 오행 상생상극(相生相剋) 관계로 비교해서
// 궁합을 판단함 - 이미 saju-data.js의 DAYSTEM_RESULTS[].compat 에 쓰인 것과
// 같은 원리(목생화/화생토/토생금/금생수/수생목 = 상생, 목극토/화극금/토극수/
// 금극목/수극화 = 상극)를 두 "실제 사람"의 사주 계산 결과에 적용하는 것.

var ELEMENT_GENERATES = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" };
var ELEMENT_OVERCOMES = { 목: "토", 화: "금", 토: "수", 금: "목", 수: "화" };

function getElementRelation(elA, elB) {
  if (elA === elB) return { type: "same" };
  if (ELEMENT_GENERATES[elA] === elB) return { type: "a-generates-b" };
  if (ELEMENT_GENERATES[elB] === elA) return { type: "b-generates-a" };
  if (ELEMENT_OVERCOMES[elA] === elB) return { type: "a-overcomes-b" };
  if (ELEMENT_OVERCOMES[elB] === elA) return { type: "b-overcomes-a" };
  return { type: "same" }; // 5행 순환상 도달할 일 없는 예외 대비 fallback
}

var SAJU_COMPAT_META = {
  same: { id: "bihwa", emoji: "👯", title: "닮은꼴 케미", color: "#0EA5E9", scoreRange: [65, 82] },
  generate: { id: "sangsaeng", emoji: "🌤️", title: "환상의 궁합", color: "#16A34A", scoreRange: [80, 97] },
  overcome: { id: "sanggeuk", emoji: "⚡", title: "노력이 필요한 케미", color: "#F97316", scoreRange: [42, 63] },
};

function buildSajuCoupleSeed(nameA, pillarA, nameB, pillarB) {
  var keyA = (nameA || "").trim().replace(/\s+/g, "") + "-" + pillarA;
  var keyB = (nameB || "").trim().replace(/\s+/g, "") + "-" + pillarB;
  var arr = [keyA, keyB].sort();
  return arr[0] + "::" + arr[1];
}

// 두 사람의 오행 개수를 비교해서 가장 차이가 큰 오행 하나를 "서로 채워주는 기운"으로 짚어줌
function getElementComplementNote(countsA, countsB, nameA, nameB) {
  var order = ["목", "화", "토", "금", "수"];
  var best = null;
  order.forEach(function (el) {
    var diff = countsA[el] - countsB[el];
    if (best === null || Math.abs(diff) > Math.abs(best.diff)) {
      best = { el: el, diff: diff };
    }
  });
  if (!best || best.diff === 0) return null;
  var richName = best.diff > 0 ? nameA : nameB;
  var poorName = best.diff > 0 ? nameB : nameA;
  return (
    richName + "님의 풍부한 " + ELEMENT_META[best.el].label + " 기운이, " +
    poorName + "님에게는 상대적으로 부족한 부분을 자연스럽게 채워줄 수 있어요."
  );
}

function getSajuCompatResult(sajuA, sajuB, nameA, nameB) {
  var stemA = sajuA.dayPillar.charAt(0);
  var stemB = sajuB.dayPillar.charAt(0);
  var elA = STEM_INFO[stemA].element;
  var elB = STEM_INFO[stemB].element;
  var rel = getElementRelation(elA, elB);

  var coupleSeed = buildSajuCoupleSeed(nameA, sajuA.dayPillar, nameB, sajuB.dayPillar);

  var metaKey = rel.type === "same" ? "same" : rel.type.indexOf("generates") !== -1 ? "generate" : "overcome";
  var meta = SAJU_COMPAT_META[metaKey];
  var range = meta.scoreRange;
  var score = range[0] + (hashSeedSaju(coupleSeed + "-score") % (range[1] - range[0] + 1));

  var relationLabel, desc, tip;
  var elAInfo = ELEMENT_META[elA];
  var elBInfo = ELEMENT_META[elB];

  if (rel.type === "same") {
    relationLabel = "비화(比和) · 둘 다 " + elAInfo.label;
    desc =
      nameA + "님과 " + nameB + "님은 두 분 다 " + elAInfo.label + " 기운의 일간이라 성향이 서로 비슷한 케미예요. " +
      "말하지 않아도 마음이 잘 통하고 취향도 잘 맞는 편이지만, 비슷한 장단점을 가지고 있어서 " +
      "같은 지점에서 함께 흔들릴 수도 있어요.";
    tip = "서로 다른 취미나 관심사를 하나씩 만들어보면 관계에 신선한 자극이 될 수 있어요.";
  } else if (rel.type === "a-generates-b" || rel.type === "b-generates-a") {
    var giverName = rel.type === "a-generates-b" ? nameA : nameB;
    var receiverName = rel.type === "a-generates-b" ? nameB : nameA;
    var giverEl = rel.type === "a-generates-b" ? elAInfo : elBInfo;
    var receiverEl = rel.type === "a-generates-b" ? elBInfo : elAInfo;
    relationLabel = "상생(相生) · " + giverEl.label + " → " + receiverEl.label;
    desc =
      giverName + "님의 " + giverEl.label + " 기운이 " + receiverName + "님의 " + receiverEl.label + " 기운을 " +
      "북돋아주는 상생 관계예요. 한쪽이 다른 쪽에게 힘을 실어주는 흐름이라, 함께 있을수록 서로 " +
      "성장하는 걸 느낄 수 있는 아주 좋은 궁합이에요.";
    tip = "받는 쪽이 너무 의지하지만 않도록, 가끔은 서로 주고받는 균형도 챙겨보세요.";
  } else {
    var dominantName = rel.type === "a-overcomes-b" ? nameA : nameB;
    var otherName = rel.type === "a-overcomes-b" ? nameB : nameA;
    var dominantEl = rel.type === "a-overcomes-b" ? elAInfo : elBInfo;
    var otherEl = rel.type === "a-overcomes-b" ? elBInfo : elAInfo;
    relationLabel = "상극(相剋) · " + dominantEl.label + " → " + otherEl.label;
    desc =
      dominantName + "님의 " + dominantEl.label + " 기운이 " + otherName + "님의 " + otherEl.label + " 기운을 " +
      "억누르는 상극 관계예요. 자칫 한쪽이 일방적으로 눌리는 느낌을 받기 쉬우니 서로 배려가 필요해요. " +
      "다만 상극이 꼭 나쁜 것만은 아니에요 - 서로 다른 자극이 오히려 발전의 계기가 되기도 해요.";
    tip = "의견 차이가 생기면 누가 맞는지보다, 서로 다른 관점을 배운다는 마음으로 대화해보세요.";
  }

  var countsA = countElements(sajuA);
  var countsB = countElements(sajuB);
  var complementNote = getElementComplementNote(countsA, countsB, nameA, nameB);

  return {
    score: score,
    meta: meta,
    relationLabel: relationLabel,
    desc: desc,
    tip: tip,
    complementNote: complementNote,
    daystemA: getDaystemResult(stemA),
    daystemB: getDaystemResult(stemB),
    countsA: countsA,
    countsB: countsB,
  };
}
