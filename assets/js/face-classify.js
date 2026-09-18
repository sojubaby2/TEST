/* ============================================================
   알아볼괘 - 측정한 비율을 분류에 대입하는 부분
   ------------------------------------------------------------
   face-analyze.js 가 잰 숫자를 받아서
   (1) 전통 오행 관상 5형  (2) 동물상 5종 으로 나눕니다.

   ※ 얼굴 비율로 성격·운명을 알 수 있다는 근거는 없습니다.
      아래 기준값은 전통 분류에서 말하는 '생김새의 특징'을
      측정 가능한 수치로 옮겨둔 것이고, 해석은 재미용이에요.
   ============================================================ */

const FaceClassify = (function () {

  // 특징값이 목표치에 얼마나 가까운지 0~1 로 점수화
  function near(value, target, tolerance) {
    const d = Math.abs(value - target) / tolerance;
    return Math.exp(-d * d);
  }

  function scoreAll(profiles, m) {
    const scored = profiles.map(function (p) {
      let sum = 0, wsum = 0;
      p.f.forEach(function (f) {
        const v = f.k === "upper" ? m.courts.upper
                : f.k === "lower" ? m.courts.lower
                : m[f.k];
        if (typeof v !== "number" || isNaN(v)) return;
        sum += f.w * near(v, f.t, f.tol);
        wsum += f.w;
      });
      return { id: p.id, raw: wsum ? sum / wsum : 0 };
    });

    // 1등이 몇 %인지 (합 대비) — 결과 페이지 게이지에 씁니다
    const total = scored.reduce(function (a, b) { return a + b.raw; }, 0) || 1;
    scored.forEach(function (s) { s.percent = Math.round((s.raw / total) * 100); });
    scored.sort(function (a, b) { return b.raw - a.raw; });
    return scored;
  }

  /* ============================================================
     ※ 기준값 보정 이력 (중요)
     ------------------------------------------------------------
     처음에는 해부학 문헌의 평균치를 그대로 기준으로 삼았는데,
     실제 사진으로 재보니 이 랜드마크 모델이 내놓는 값은 그 척도와 달랐습니다.
     같은 사람 사진 3장 + 두 종류 모델(경량/정밀)로 확인한 결과:

       · 코 폭  : 모델이 0.16~0.17 만 내놓음 (문헌 기준 0.22~0.32)
                  → 68점 규약에서 31·35 번 점이 콧방울 바깥이 아니라
                    안쪽에 찍히기 때문. 경량·정밀 모델이 동일하게 나와
                    모델 성능이 아니라 '점을 찍는 규약' 문제로 봅니다.
       · 눈사이 : 모델 1.5~1.6 (문헌 기준 ≈1.0)
       · 입 폭  : 모델 0.33~0.37 (문헌 기준 0.35~0.48)

     그래서 아래 기준값은 '문헌 수치'가 아니라 '이 모델이 실제로 내놓는
     척도'에 맞춰 옮겨둔 것입니다. 안 그러면 코·눈사이 항목은 어떤 얼굴을
     넣어도 점수가 0 에 가까워 분류에서 죽어버립니다.

     ⚠ 다만 표본이 한 사람뿐이라 '중심값'은 잠정입니다.
       여러 사람 사진이 모이면 tools/calibrate.html 로 다시 잡아야 해요.
       확신이 낮은 항목(코 폭·눈사이)은 가중치를 낮춰 뒀습니다.
     ============================================================ */

  /* ---------- 얼굴형 5가지 ('내 얼굴 비율은?') ----------
     예전엔 오행(목·화·토·금·수)으로 불렀는데, 실제로 재는 건 결국
     얼굴의 가로세로와 턱 모양이라 이름을 그대로 '얼굴형'으로 바꿨습니다.
     신비로운 해석은 '관상가 양반 내가 왕이 될 상인가?' 쪽으로 옮겼어요. */
  const FACE_PROFILES = [
    { id: "long",   f: [ {k:"faceRatio",t:1.64,tol:.13,w:3.5}, {k:"jawRatio",t:.78,tol:.06,w:2}, {k:"chinAngle",t:136,tol:16,w:1} ] },
    { id: "heart",  f: [ {k:"chinAngle",t:118,tol:13, w:3}, {k:"jawRatio",t:.73,tol:.05,w:3}, {k:"faceRatio",t:1.52,tol:.12,w:1.5} ] },
    { id: "round",  f: [ {k:"faceRatio",t:1.33,tol:.11,w:3.5}, {k:"chinAngle",t:146,tol:14,w:2}, {k:"jawRatio",t:.86,tol:.06,w:2} ] },
    { id: "square", f: [ {k:"jawRatio",t:.93,tol:.05,w:3.5}, {k:"chinAngle",t:150,tol:13, w:2.5}, {k:"faceRatio",t:1.45,tol:.12,w:1.5} ] },
    { id: "oval",   f: [ {k:"faceRatio",t:1.50,tol:.10,w:3}, {k:"jawRatio",t:.82,tol:.04,w:3}, {k:"chinAngle",t:134,tol:12, w:2} ] },
  ];

  const FACE_TYPES = {
    long: {
      id: "long", emoji: "📏", title: "긴 얼굴형", subtitle: "세로로 시원하게 뻗은 비율",
      color: "#7C3AED",
      summary: "광대 폭보다 얼굴 길이가 뚜렷하게 긴 비율이에요. 이목구비가 세로로 여유 있게 배치돼 정면에서 단정하고 시원한 인상을 줍니다. 가로 폭이 좁아 얼굴이 실제보다 작아 보이는 이점이 있어요. 다만 표정이 작으면 무표정하게 읽히기 쉬우니, 사진에서는 평소보다 조금 크게 웃는 편이 실제 분위기에 가깝게 나옵니다.",
      traits: ["세로 길이가 광대 폭의 1.6배 이상", "이목구비가 여유 있게 배치됨", "얼굴이 작아 보이는 비율"],
      compat: { best: { id: "round", reason: "가로로 넉넉한 비율과 나란히 두면 서로의 특징이 또렷해져요." },
                worst: { id: "oval", reason: "둘 다 세로가 긴 편이라 함께 있으면 차이가 잘 안 드러납니다." } },
    },
    heart: {
      id: "heart", emoji: "🔻", title: "역삼각형", subtitle: "위가 넓고 턱으로 모이는 비율",
      color: "#EC4899",
      summary: "광대에서 턱으로 내려오면서 폭이 뚜렷하게 좁아지는 비율이에요. 턱 끝 각도가 좁게 측정되는 것이 이 얼굴형의 핵심입니다. 흔히 말하는 갸름한 얼굴, V라인이 여기에 들어가요. 시선이 자연스럽게 눈과 이마 쪽으로 올라가서 눈매의 인상이 전체 분위기를 크게 좌우합니다.",
      traits: ["턱 끝 각도가 120도 근처로 좁음", "광대보다 턱 폭이 확연히 작음", "아래로 모이는 윤곽선"],
      compat: { best: { id: "square", reason: "각진 윤곽 옆에서 갸름한 선이 가장 도드라집니다." },
                worst: { id: "heart", reason: "같은 흐름끼리라 나란히 두면 밋밋해져요." } },
    },
    round: {
      id: "round", emoji: "⭕", title: "둥근형", subtitle: "가로세로가 비슷한 넉넉한 비율",
      color: "#F59E0B",
      summary: "얼굴 길이와 폭의 차이가 작고 턱 끝이 평평하게 마무리되는 비율이에요. 윤곽에 각이 적어 전체가 둥글게 이어집니다. 표정이 움직이는 면적이 커서 멀리서도 기분이 잘 읽히고, 나이보다 어려 보이는 이점이 있어요. 정면보다 살짝 각도를 준 사진에서 입체감이 더 살아납니다.",
      traits: ["세로가 가로의 1.35배 이하", "턱 끝이 평평하게 마무리됨", "각이 적고 둥글게 이어지는 윤곽"],
      compat: { best: { id: "long", reason: "세로가 긴 비율과 만나면 대비가 재밌게 살아나요." },
                worst: { id: "oval", reason: "둘 다 선이 부드러워 함께 두면 구분이 흐려집니다." } },
    },
    square: {
      id: "square", emoji: "🟦", title: "각진형", subtitle: "턱선이 넓고 각이 살아 있는 비율",
      color: "#475569",
      summary: "턱 폭이 광대 폭에 가깝게 유지되고 턱 끝이 평평하게 끝나는 비율이에요. 정면에서 위아래 폭 차이가 작아 사각형에 가까운 윤곽이 만들어집니다. 신뢰감을 주는 인상이라 프로필 사진처럼 정돈된 자리에서 강점이 크고, 친근함이 필요할 땐 눈매와 입꼬리를 조금 풀면 균형이 맞아요.",
      traits: ["턱 폭이 광대 폭의 90% 이상", "턱 끝 각도가 150도 근처로 넓음", "정면에서 안정적인 사각 흐름"],
      compat: { best: { id: "heart", reason: "갸름한 선 옆에서 각진 윤곽이 더 멋있게 보입니다." },
                worst: { id: "long", reason: "둘 다 직선이 강해 나란히 두면 인상이 세져요." } },
    },
    oval: {
      id: "oval", emoji: "🥚", title: "계란형", subtitle: "가장 균형 잡힌 것으로 치는 비율",
      color: "#0EA5E9",
      summary: "세로가 가로보다 적당히 길고 턱이 완만하게 좁아지는, 어느 쪽으로도 치우치지 않은 비율이에요. 미용 쪽에서 오랫동안 기준형으로 삼아온 얼굴형입니다. 특정 헤어스타일에 크게 구애받지 않는 것이 가장 큰 이점이에요. 다만 특징이 도드라지지 않아 개성이 약해 보일 수 있으니, 포인트는 스타일링에서 주는 편이 좋습니다.",
      traits: ["세로가 가로의 1.5배 안팎", "턱이 완만하게 좁아짐", "어느 쪽으로도 치우치지 않은 균형"],
      compat: { best: { id: "square", reason: "각이 분명한 쪽과 만나면 부드러운 선이 더 살아납니다." },
                worst: { id: "round", reason: "둘 다 완만한 곡선이라 특징이 서로 묻혀요." } },
    },
  };

  /* ---------- 동물상 5종 ---------- */
  /* 가중치는 '같은 사람 사진에서 얼마나 안 흔들리는가'로 정했습니다.
     실측 변동률: 턱폭 1.9% · 코폭 3.1% · 얼굴비 4.2% · 눈사이 7.2%
                  입폭 9.3% · 턱각도 14.8% · 눈세로 18.3%
     눈 크기는 깜빡임과 각도에 가장 크게 흔들려서, 예전처럼 최고 가중치를
     주면 사진 한 장 바뀔 때마다 결과가 뒤집힙니다. 구조적인 값(얼굴비·턱폭)에
     무게를 싣고 눈은 보조로 씁니다. */
  const ANIMAL_PROFILES = [
    // 각 유형마다 '이것 때문에 이 동물' 이라 할 만한 특징 하나에 힘을 실었습니다.
    { id: "dog",      f: [ {k:"faceRatio",t:1.45,tol:.12,w:3}, {k:"jawRatio",t:.84,tol:.06,w:3}, {k:"chinAngle",t:146,tol:14,w:2}, {k:"eyeOpen",t:.38,tol:.05,w:2} ] },
    { id: "cat",      f: [ {k:"faceRatio",t:1.54,tol:.11,w:3}, {k:"jawRatio",t:.78,tol:.05,w:3}, {k:"eyeSlant",t:-.10,tol:.05,w:2.5}, {k:"eyeOpen",t:.30,tol:.04,w:2} ] },
    { id: "fox",      f: [ {k:"faceRatio",t:1.63,tol:.11,w:3}, {k:"jawRatio",t:.73,tol:.05,w:3}, {k:"eyeOpen",t:.25,tol:.04,w:2.5}, {k:"chinAngle",t:120,tol:14,w:2} ] },
    { id: "rabbit",   f: [ {k:"faceRatio",t:1.46,tol:.11,w:2.5}, {k:"eyeOpen",t:.43,tol:.04,w:3}, {k:"mouthRatio",t:.305,tol:.025,w:2.5}, {k:"jawRatio",t:.80,tol:.05,w:2} ] },
    { id: "bear",     f: [ {k:"faceRatio",t:1.33,tol:.11,w:3}, {k:"jawRatio",t:.91,tol:.05,w:3}, {k:"noseRatio",t:.190,tol:.018,w:2.5}, {k:"eyeOpen",t:.30,tol:.05,w:1.5} ] },
    { id: "deer",     f: [ {k:"faceRatio",t:1.61,tol:.11,w:3}, {k:"eyeOpen",t:.41,tol:.04,w:2.5}, {k:"eyeGap",t:1.70,tol:.12,w:2.5}, {k:"jawRatio",t:.76,tol:.05,w:2} ] },
    { id: "wolf",     f: [ {k:"jawRatio",t:.89,tol:.05,w:3}, {k:"eyeOpen",t:.27,tol:.04,w:2.5}, {k:"faceRatio",t:1.57,tol:.11,w:2.5}, {k:"eyeSlant",t:-.08,tol:.06,w:1.5} ] },
    { id: "horse",    f: [ {k:"faceRatio",t:1.73,tol:.12,w:3.5}, {k:"jawRatio",t:.82,tol:.06,w:2}, {k:"eyeOpen",t:.32,tol:.05,w:1.5}, {k:"chinAngle",t:138,tol:16,w:1.2} ] },
    { id: "hamster",  f: [ {k:"faceRatio",t:1.31,tol:.10,w:3.5}, {k:"eyeOpen",t:.40,tol:.04,w:2.5}, {k:"jawRatio",t:.86,tol:.05,w:2}, {k:"chinAngle",t:145,tol:14,w:1.5} ] },
    { id: "squirrel", f: [ {k:"faceRatio",t:1.39,tol:.10,w:3}, {k:"eyeOpen",t:.44,tol:.04,w:3}, {k:"chinAngle",t:126,tol:13,w:2.5}, {k:"jawRatio",t:.77,tol:.05,w:2} ] },
    { id: "penguin",  f: [ {k:"eyeGap",t:1.42,tol:.11,w:3}, {k:"eyeOpen",t:.27,tol:.04,w:2.5}, {k:"chinAngle",t:150,tol:14,w:2}, {k:"faceRatio",t:1.43,tol:.11,w:2} ] },
    { id: "owl",      f: [ {k:"eyeGap",t:1.78,tol:.11,w:3}, {k:"eyeOpen",t:.45,tol:.04,w:3}, {k:"faceRatio",t:1.38,tol:.11,w:2}, {k:"jawRatio",t:.83,tol:.06,w:1.5} ] },
    { id: "panda",    f: [ {k:"faceRatio",t:1.36,tol:.10,w:3}, {k:"jawRatio",t:.89,tol:.05,w:2.5}, {k:"eyeOpen",t:.39,tol:.04,w:2.5}, {k:"noseRatio",t:.185,tol:.018,w:2} ] },
    { id: "dino",     f: [ {k:"jawRatio",t:.94,tol:.05,w:3.5}, {k:"mouthRatio",t:.395,tol:.028,w:2.5}, {k:"faceRatio",t:1.50,tol:.12,w:2}, {k:"chinAngle",t:134,tol:15,w:1.5} ] },
    { id: "monkey",   f: [ {k:"eyeGap",t:1.38,tol:.10,w:3}, {k:"mouthRatio",t:.385,tol:.028,w:2.5}, {k:"faceRatio",t:1.44,tol:.11,w:2}, {k:"jawRatio",t:.81,tol:.06,w:1.5} ] },
  ];

  /* ---------- '관상가 양반 내가 왕이 될 상인가?' 열한 가지 상 ----------
     관상에서 실제로 보던 부위를 측정값에 대응시켰습니다.
       이마=상정(관록궁) · 턱폭/턱각도=지각 · 코폭=재백궁 · 눈=감찰관 · 눈사이=명궁

     ※ 기준값을 정한 방법
       처음엔 왕상을 '모든 항목이 평균'으로 잡았더니 시뮬레이션에서
       53%가 왕상으로 나왔습니다. 평균적인 얼굴이 전부 한쪽으로 쏠린 거예요.
       그래서 나머지 열 상은 분포의 바깥쪽(약 ±1.3σ)으로 밀고,
       왕상은 '모든 항목이 동시에 가운데'라는 빡센 조건으로 바꿨습니다.
       그 결과 3만 개 표본에서 왕상 15%, 가장 드문 재상상 6%로 자리 잡았어요.
       (균등하게 나오면 9.1%씩) */
  const KING_PROFILES = [
    // 왕상: 모든 자리가 동시에 균형을 이뤄야 합니다. 하나만 치우쳐도 탈락이에요.
    { id: "king",    f: [ {k:"faceRatio",t:1.50,tol:.030,w:3}, {k:"jawRatio",t:.830,tol:.019,w:3}, {k:"upper",t:34.5,tol:1.10,w:3}, {k:"chinAngle",t:137,tol:4.0,w:2.5}, {k:"noseRatio",t:.166,tol:.0085,w:2} ] },
    // 장군상: 턱이 가장 넓고 평평하며 눈에 힘이 있음
    { id: "general", f: [ {k:"jawRatio",t:.905,tol:.040,w:3.5}, {k:"chinAngle",t:151,tol:7.5,w:2.5}, {k:"eyeOpen",t:.300,tol:.033,w:2} ] },
    // 재상상: 이마가 가장 높고 눈이 가늘며 얼굴이 긺
    { id: "scholar", f: [ {k:"upper",t:38.5,tol:2.0,w:3}, {k:"eyeOpen",t:.275,tol:.030,w:3}, {k:"faceRatio",t:1.61,tol:.060,w:2} ] },
    // 거상상: 코가 가장 넉넉하고 얼굴 가로 비중이 큼
    { id: "trader",  f: [ {k:"noseRatio",t:.185,tol:.0100,w:3.5}, {k:"faceRatio",t:1.38,tol:.060,w:3}, {k:"jawRatio",t:.880,tol:.042,w:1.5} ] },
    // 예인상: 눈과 입이 동시에 큼
    { id: "artist",  f: [ {k:"eyeOpen",t:.420,tol:.030,w:3.5}, {k:"mouthRatio",t:.390,tol:.018,w:3} ] },
    // 은일상: 턱·코·입이 모두 작아 선이 조용함
    { id: "hermit",  f: [ {k:"jawRatio",t:.745,tol:.038,w:3}, {k:"noseRatio",t:.150,tol:.0100,w:2.5}, {k:"mouthRatio",t:.318,tol:.018,w:2.5} ] },
    // 내시상: 눈이 가운데로 모이고 입이 작으며 턱이 둥긂
    { id: "eunuch",  f: [ {k:"eyeGap",t:1.40,tol:.075,w:3.5}, {k:"mouthRatio",t:.320,tol:.018,w:2.5}, {k:"chinAngle",t:147,tol:7.5,w:1.5} ] },
    // 거지상: 코는 작은데 입은 크고 이마가 좁음
    { id: "beggar",  f: [ {k:"noseRatio",t:.148,tol:.0100,w:3}, {k:"mouthRatio",t:.390,tol:.018,w:3}, {k:"upper",t:30.5,tol:2.0,w:2} ] },
    // 역적상: 눈꼬리가 치켜올라가고 턱이 각짐
    { id: "rebel",   f: [ {k:"eyeSlant",t:-.105,tol:.033,w:3.5}, {k:"jawRatio",t:.885,tol:.042,w:2.5}, {k:"eyeOpen",t:.300,tol:.033,w:2} ] },
    // 한량상: 눈이 크고 턱이 둥글며 얼굴이 짧음
    { id: "idler",   f: [ {k:"eyeOpen",t:.410,tol:.030,w:3}, {k:"chinAngle",t:149,tol:7.5,w:2.5}, {k:"faceRatio",t:1.39,tol:.060,w:2.5} ] },
    // 무당상: 눈 사이가 가장 넓고 눈이 큼
    { id: "shaman",  f: [ {k:"eyeGap",t:1.72,tol:.075,w:3.5}, {k:"eyeOpen",t:.400,tol:.030,w:2.5}, {k:"faceRatio",t:1.60,tol:.060,w:2} ] },
  ];

  function classifyFace(m)   { return scoreAll(FACE_PROFILES, m); }
  function classifyAnimal(m) { return scoreAll(ANIMAL_PROFILES, m); }
  function classifyKing(m)   { return scoreAll(KING_PROFILES, m); }

  /* ---------- 측정치를 사람이 읽을 수 있는 줄로 ---------- */
  // 기준선도 문헌이 아니라 이 모델이 실제로 내놓는 척도에 맞췄습니다.
  // (예전 기준으로는 누가 해도 '코 좁은 편 / 눈사이 넓은 편 / 입 작은 편'이 나왔어요)
  function band(v, low, high, lowTxt, highTxt) {
    return v <= low ? lowTxt : v >= high ? highTxt : "평균 범위";
  }

  function readable(m) {
    return [
      { label: "얼굴 가로세로비", value: "1 : " + m.faceRatio.toFixed(2),
        note: band(m.faceRatio, 1.35, 1.58, "넓은 편", "긴 편") },
      { label: "턱 폭 (광대 대비)", value: Math.round(m.jawRatio * 100) + "%",
        note: band(m.jawRatio, 0.76, 0.88, "갸름한 편", "각진 편") },
      { label: "턱 끝 각도", value: Math.round(m.chinAngle) + "°",
        note: band(m.chinAngle, 118, 148, "뾰족한 편", "둥근 편") },
      { label: "눈 사이 간격", value: "눈 폭의 " + m.eyeGap.toFixed(2) + "배",
        note: band(m.eyeGap, 1.38, 1.72, "좁은 편", "넓은 편") },
      { label: "눈 세로 비율", value: Math.round(m.eyeOpen * 100) + "%",
        note: band(m.eyeOpen, 0.29, 0.38, "가늘고 긴 편", "동그란 편") },
      { label: "코 폭 (얼굴 대비)", value: Math.round(m.noseRatio * 100) + "%",
        note: band(m.noseRatio, 0.148, 0.185, "좁은 편", "넓은 편") },
      { label: "입 폭 (얼굴 대비)", value: Math.round(m.mouthRatio * 100) + "%",
        note: band(m.mouthRatio, 0.320, 0.385, "작은 편", "큰 편") },
      { label: "삼정 비율 (상:중:하)",
        value: Math.round(m.courts.upper) + " : " + Math.round(m.courts.mid) + " : " + Math.round(m.courts.lower),
        note: "이마 높이는 추정치예요" },
    ];
  }

  // renderCompatSection 은 배열을 받으므로 순서대로 펼쳐둡니다
  const FACE_LIST = ["long", "heart", "round", "square", "oval"].map(function (k) {
    return FACE_TYPES[k];
  });

  return {
    classifyFace: classifyFace,
    classifyAnimal: classifyAnimal,
    classifyKing: classifyKing,
    FACE_TYPES: FACE_TYPES,
    FACE_LIST: FACE_LIST,
    readable: readable,
  };
})();
