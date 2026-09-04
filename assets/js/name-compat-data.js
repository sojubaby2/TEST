// 이름궁합 데이터/로직
// 생년월일 없이 "이름 두 개"만으로 바로 나오는 클래식 이름궁합.
// 실제 성명학이 아니라 이름 글자(자음/모음 코드값) 조합을 시드로 만든 재미 콘텐츠예요.
// 두 이름 순서를 바꿔 넣어도(A↔B) 항상 같은 결과가 나오도록 정렬해서 시드를 만듦.

function hashSeedNameCompat(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

// 두 이름 중 무엇을 A/B로 넣어도 항상 같은 시드가 나오도록 정렬해서 합침
function buildNamePairSeed(nameA, nameB) {
  var arr = [nameA, nameB].sort();
  return arr[0] + "::" + arr[1];
}

var NAME_COMPAT_GRADE_META = [
  { min: 90, id: "destiny", emoji: "💞", title: "이름부터 운명이었던 사이", color: "#DB2777", desc: "이름 궁합으로 나올 수 있는 거의 최고 조합이에요! 부르는 것만으로도 어감이 착 붙는 이름 궁합이에요." },
  { min: 75, id: "great", emoji: "💘", title: "찰떡같은 이름궁합", color: "#EC4899", desc: "이름끼리 리듬이 잘 맞아떨어지는 조합이에요. 나란히 불러도 자연스럽게 어울려요." },
  { min: 60, id: "good", emoji: "😊", title: "듣기 좋은 조합", color: "#F59E0B", desc: "무난하면서도 편안하게 어울리는 이름궁합이에요. 부를수록 정드는 조합이에요." },
  { min: 40, id: "normal", emoji: "🙂", title: "무난한 이름궁합", color: "#0EA5E9", desc: "튀지도 부딪히지도 않는 평범한 조합이에요. 알아갈수록 매력이 드러나는 편이에요." },
  { min: 0, id: "effort", emoji: "🌱", title: "은근 신경 쓰이는 조합", color: "#64748B", desc: "처음엔 어색하게 느껴질 수 있지만, 부르다 보면 은근히 정드는 이름궁합이에요." },
];

function getNameCompatGrade(score) {
  for (var i = 0; i < NAME_COMPAT_GRADE_META.length; i++) {
    if (score >= NAME_COMPAT_GRADE_META[i].min) return NAME_COMPAT_GRADE_META[i];
  }
  return NAME_COMPAT_GRADE_META[NAME_COMPAT_GRADE_META.length - 1];
}

var NAME_COMPAT_STRENGTHS = [
  "이름을 나란히 불러보면 리듬이 자연스럽게 이어져요.",
  "부를 때 어감이 편안해서 자주 부르고 싶어지는 조합이에요.",
  "이름 첫 글자의 느낌이 서로 좋은 쪽으로 시너지를 내요.",
  "이름에 담긴 분위기가 은근히 닮아있어요.",
  "이름만 들어도 짝처럼 느껴진다는 얘기를 들을 수 있어요.",
  "이름 궁합상 서로의 기운을 부드럽게 채워주는 조합이에요.",
  "이름을 함께 쓸 때(커플템 각인 등) 디자인이 예쁘게 뽑히는 조합이에요.",
  "이름의 성조(높낮이)가 잘 어우러져서 듣기 편해요.",
  "줄임말이나 애칭을 지어도 잘 어울리는 조합이에요.",
  "이름 궁합상 서로에게 좋은 에너지를 주는 관계로 알려져 있어요.",
];

var NAME_COMPAT_CAUTIONS = [
  "이름 궁합만으로 모든 게 결정되진 않으니 재미로만 봐주세요.",
  "처음엔 이름이 살짝 안 어울린다고 느낄 수 있지만 부르다 보면 익숙해져요.",
  "이름 궁합보다 실제로 대화하고 지내보는 게 훨씬 중요해요.",
  "발음이 비슷해서 헷갈릴 수 있으니 애칭을 다르게 지어보는 것도 방법이에요.",
  "이름 궁합은 낮아도 실제 궁합은 얼마든지 좋을 수 있어요.",
  "이름 궁합 점수보다 서로를 알아가려는 마음이 더 중요해요.",
  "이름에 너무 의미를 부여하기보다 가볍게 즐겨보세요.",
  "이름 궁합이 낮게 나왔다고 실망하지 마세요, 재미 콘텐츠예요.",
];

function getNameCompatResult(nameA, nameB) {
  var cleanA = (nameA || "").trim().replace(/\s+/g, "");
  var cleanB = (nameB || "").trim().replace(/\s+/g, "");
  var seed = buildNamePairSeed(cleanA, cleanB);

  var pick = function (salt, arr) {
    return arr[hashSeedNameCompat(seed + "-" + salt) % arr.length];
  };

  var overall = hashSeedNameCompat(seed + "-score") % 41 + 60; // 60~100 사이 (재미 콘텐츠라 너무 낮게는 안 나오게)
  var grade = getNameCompatGrade(overall);

  // 두 이름에 겹치는 글자 수 — 이름 자체를 분석한 느낌을 주는 부가 포인트
  var setA = {};
  for (var i = 0; i < cleanA.length; i++) setA[cleanA[i]] = true;
  var sharedCount = 0;
  var seenB = {};
  for (var j = 0; j < cleanB.length; j++) {
    var ch = cleanB[j];
    if (setA[ch] && !seenB[ch]) {
      sharedCount++;
      seenB[ch] = true;
    }
  }

  var strengths = [];
  var cautions = [];
  var sIdx = hashSeedNameCompat(seed + "-s") % NAME_COMPAT_STRENGTHS.length;
  var cIdx = hashSeedNameCompat(seed + "-c") % NAME_COMPAT_CAUTIONS.length;
  for (var k = 0; k < 3; k++) {
    strengths.push(NAME_COMPAT_STRENGTHS[(sIdx + k) % NAME_COMPAT_STRENGTHS.length]);
  }
  for (var m = 0; m < 2; m++) {
    cautions.push(NAME_COMPAT_CAUTIONS[(cIdx + m) % NAME_COMPAT_CAUTIONS.length]);
  }

  return {
    overall: overall,
    grade: grade,
    sharedCount: sharedCount,
    totalLen: cleanA.length + cleanB.length,
    strengths: strengths,
    cautions: cautions,
  };
}
