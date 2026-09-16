/* ============================================================
   알아볼괘 - 얼굴 비율 측정 엔진 (관상 / 동물상 공용)
   ------------------------------------------------------------
   ※ 사진은 서버로 전송되지 않습니다.
      face-api 라이브러리와 모델을 우리 사이트에서 직접 내려받아
      브라우저 안에서만 계산해요. 외부로 나가는 요청이 없습니다.

   ※ 얼굴 비율로 성격이나 운명을 알 수 있다는 과학적 근거는 없어요.
      여기서 하는 일은 '실제 비율을 재는 것'까지이고,
      그 수치를 전통 분류에 대입하는 건 재미를 위한 해석입니다.
   ============================================================ */

const FaceAnalyze = (function () {
  // 이 스크립트 자신의 위치를 기준으로 모델 경로를 잡습니다.
  // (페이지가 몇 단계 아래에 있든, 점검용 페이지에서 불러도 똑같이 동작하도록)
  const MODEL_URL = (function () {
    try {
      const s = document.currentScript && document.currentScript.src;
      if (s) return new URL("../vendor/face-api/model", s).href;
    } catch (e) { /* 아래 기본값으로 */ }
    return "../../assets/vendor/face-api/model";
  })();
  let loading = null;

  /* ---------- 모델 로드 (한 번만) ---------- */
  function load() {
    if (loading) return loading;
    loading = (async function () {
      if (typeof faceapi === "undefined") throw new Error("LIB_MISSING");
      // 파일을 직접 열면(file://) 모델을 fetch 할 수 없어 반드시 실패합니다.
      if (location.protocol === "file:") throw new Error("FILE_PROTOCOL");
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      } catch (e) {
        const err = new Error("MODEL_LOAD");
        err.detail = (e && (e.message || e)) + "";
        throw err;
      }
    })();
    // 실패한 약속을 붙들고 있으면 새로고침 전까지 재시도가 막힙니다.
    loading.catch(function () { loading = null; });
    return loading;
  }

  /* ---------- 파일 → 이미지 ----------
     1순위 createImageBitmap (EXIF 회전까지 보정),
     안 되면 <img> 로 한 번 더 시도합니다. 사파리는 HEIC 를 이쪽에서 여는 경우가 있어요. */
  async function decodeFile(file) {
    if (typeof createImageBitmap === "function") {
      try {
        // iPhone 사진은 회전 정보가 따로 들어있어서 그대로 그리면 눕습니다.
        return await createImageBitmap(file, { imageOrientation: "from-image" });
      } catch (e) { /* 아래로 */ }
      try { return await createImageBitmap(file); } catch (e) { /* 아래로 */ }
    }
    return await new Promise(function (resolve, reject) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload  = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        const err = new Error("BAD_IMAGE");
        err.detail = file.type || file.name || "unknown type";
        reject(err);
      };
      img.src = url;
    });
  }

  /* ---------- 파일 → 캔버스 (축소) ---------- */
  async function fileToCanvas(file, maxSide) {
    maxSide = maxSide || 640;
    const bitmap = await decodeFile(file);
    const bw = bitmap.naturalWidth  || bitmap.width;
    const bh = bitmap.naturalHeight || bitmap.height;
    if (!bw || !bh) {
      const err = new Error("BAD_IMAGE");
      err.detail = "width/height = 0";
      throw err;
    }
    const scale = Math.min(1, maxSide / Math.max(bw, bh));
    const w = Math.round(bw * scale);
    const h = Math.round(bh * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
    if (bitmap.close) bitmap.close();
    return canvas;
  }

  /* ---------- 기하 helper ---------- */
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  function polyWidth(pts) {
    let min = Infinity, max = -Infinity;
    pts.forEach((p) => { if (p.x < min) min = p.x; if (p.x > max) max = p.x; });
    return max - min;
  }
  function polyHeight(pts) {
    let min = Infinity, max = -Infinity;
    pts.forEach((p) => { if (p.y < min) min = p.y; if (p.y > max) max = p.y; });
    return max - min;
  }
  // 세 점이 이루는 각도(도). b가 꼭짓점.
  function angleAt(a, b, c) {
    const v1 = { x: a.x - b.x, y: a.y - b.y };
    const v2 = { x: c.x - b.x, y: c.y - b.y };
    const cos = (v1.x * v2.x + v1.y * v2.y) / (Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y));
    return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  }

  /* ---------- 68개 랜드마크 → 비율 ---------- */
  // face-api 68점 배치
  //  0-16 턱선 | 17-21,22-26 눈썹 | 27-35 코 | 36-41,42-47 눈 | 48-67 입
  function measure(pts) {
    const chin = pts[8];
    const cheekL = pts[0], cheekR = pts[16];         // 광대 바깥
    const jawL = pts[4], jawR = pts[12];             // 턱선 아래쪽
    const browPts = pts.slice(17, 27);
    const browTop = browPts.reduce((m, p) => (p.y < m.y ? p : m), browPts[0]);
    const noseTip = pts[30];
    const noseL = pts[31], noseR = pts[35];
    const mouthL = pts[48], mouthR = pts[54];
    const eyeR = pts.slice(36, 42);   // 화면 왼쪽 = 본인 오른쪽 눈
    const eyeL = pts.slice(42, 48);

    const faceWidth = dist(cheekL, cheekR);
    // 이마 위쪽(헤어라인)은 68점에 없어서 잽니다 → 눈썹~턱 길이로 추정합니다.
    const browToChin = Math.abs(chin.y - browTop.y);
    const faceHeightEst = browToChin * 1.5;          // 삼정이 같다고 보고 상정을 더한 추정치

    const eyeRW = polyWidth(eyeR), eyeLW = polyWidth(eyeL);
    const eyeW = (eyeRW + eyeLW) / 2;
    const eyeH = (polyHeight(eyeR) + polyHeight(eyeL)) / 2;
    const innerGap = dist(pts[39], pts[42]);

    // 눈꼬리가 올라갔는지 (음수면 올라간 눈)
    const slantR = (pts[36].y - pts[39].y) / (eyeRW || 1);
    const slantL = (pts[45].y - pts[42].y) / (eyeLW || 1);
    const eyeSlant = (slantR + slantL) / 2;

    // 눈썹 기울기
    const browSlope = ((pts[17].y - pts[21].y) / (dist(pts[17], pts[21]) || 1)
                     + (pts[26].y - pts[22].y) / (dist(pts[22], pts[26]) || 1)) / 2;

    // 삼정 (상정 추정 : 중정 : 하정)
    const midCourt = Math.abs(noseTip.y - browTop.y);
    const lowCourt = Math.abs(chin.y - noseTip.y);
    const upperEst = browToChin * 0.5;
    const courtSum = upperEst + midCourt + lowCourt;

    return {
      faceRatio:   faceHeightEst / faceWidth,                 // 세로/가로 (클수록 긴 얼굴)
      jawRatio:    dist(jawL, jawR) / faceWidth,              // 턱 폭 / 광대 폭 (클수록 각진 느낌)
      chinAngle:   angleAt(pts[6], chin, pts[10]),            // 턱 끝 각도 (작을수록 뾰족)
      eyeGap:      innerGap / (eyeW || 1),                    // 눈 사이 간격 (눈 하나 폭 기준)
      eyeOpen:     eyeH / (eyeW || 1),                        // 눈 세로/가로 (클수록 동그란 눈)
      eyeSlant:    eyeSlant,                                  // 음수 = 눈꼬리 올라감
      browSlope:   browSlope,                                 // 음수 = 눈썹 올라감
      noseRatio:   dist(noseL, noseR) / faceWidth,            // 코 폭 / 얼굴 폭
      mouthRatio:  dist(mouthL, mouthR) / faceWidth,          // 입 폭 / 얼굴 폭
      lipRatio:    polyHeight(pts.slice(48, 60)) / (dist(mouthL, mouthR) || 1),
      courts: {                                               // 삼정 비율 (합 100)
        upper: (upperEst / courtSum) * 100,
        mid:   (midCourt / courtSum) * 100,
        lower: (lowCourt / courtSum) * 100,
      },
      _px: { faceWidth: faceWidth, faceHeight: faceHeightEst },
    };
  }

  /* ---------- 예열 ----------
     첫 추론은 WebGL 셰이더를 컴파일하느라 3~4초가 걸리고, 그 다음부터는 30ms 안쪽이에요.
     그래서 사진을 고른 직후(사용자가 미리보기를 보는 동안) 빈 이미지로 한 번 돌려둡니다. */
  let warming = null;
  function warmup() {
    if (warming) return warming;
    warming = (async function () {
      try {
        await load();
        const c = document.createElement("canvas");
        c.width = 160; c.height = 160;
        const g = c.getContext("2d");
        g.fillStyle = "#808080"; g.fillRect(0, 0, 160, 160);
        const opts = new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.35 });
        await faceapi.detectAllFaces(c, opts).withFaceLandmarks(true);
      } catch (e) {
        // 예열 실패는 조용히 넘어갑니다. 다만 다시 시도할 수 있게 풀어둬요.
        warming = null;
      }
    })();
    return warming;
  }

  /* ---------- 사진 한 장 분석 ---------- */
  async function analyze(file) {
    await load();
    const canvas = await fileToCanvas(file, 640);

    const opts = new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.35 });
    let results;
    try {
      results = await faceapi.detectAllFaces(canvas, opts).withFaceLandmarks(true);
    } catch (e) {
      const err = new Error("DETECT_FAIL");
      err.detail = (e && (e.message || e)) + "";
      throw err;
    }

    if (!results || results.length === 0) return { ok: false, reason: "NO_FACE", canvas: canvas };
    if (results.length > 1)             return { ok: false, reason: "MANY_FACES", canvas: canvas, count: results.length };

    const det = results[0];
    const box = det.detection.box;
    // 얼굴이 사진에서 너무 작으면 비율이 부정확해집니다.
    if (box.width < 90) return { ok: false, reason: "TOO_SMALL", canvas: canvas };

    return {
      ok: true,
      canvas: canvas,
      box: box,
      points: det.landmarks.positions,
      metrics: measure(det.landmarks.positions),
    };
  }

  /* ---------- 결과 카드용: 얼굴 중심으로 잘라 작은 JPEG ---------- */
  function cropFace(canvas, box, size) {
    size = size || 420;
    const pad = box.width * 0.45;
    const sx = Math.max(0, box.x - pad);
    const sy = Math.max(0, box.y - pad * 1.2);
    const sw = Math.min(canvas.width - sx, box.width + pad * 2);
    const sh = Math.min(canvas.height - sy, box.height + pad * 2.2);
    const side = Math.min(sw, sh);
    const out = document.createElement("canvas");
    out.width = size; out.height = size;
    out.getContext("2d").drawImage(canvas, sx, sy, side, side, 0, 0, size, size);
    return out.toDataURL("image/jpeg", 0.82);
  }

  /* ---------- 측정치를 URL 에 싣기 (사진은 절대 싣지 않음) ---------- */
  function encodeMetrics(m) {
    const r = (v, d) => Number(v).toFixed(d === undefined ? 2 : d);
    return [
      r(m.faceRatio), r(m.jawRatio), r(m.chinAngle, 0), r(m.eyeGap),
      r(m.eyeOpen), r(m.noseRatio), r(m.mouthRatio), r(m.lipRatio),
      r(m.courts.upper, 0), r(m.courts.mid, 0), r(m.courts.lower, 0),
    ].join("_");
  }
  function decodeMetrics(s) {
    if (!s) return null;
    const a = String(s).split("_").map(Number);
    if (a.length < 11 || a.some(isNaN)) return null;
    return {
      faceRatio: a[0], jawRatio: a[1], chinAngle: a[2], eyeGap: a[3],
      eyeOpen: a[4], noseRatio: a[5], mouthRatio: a[6], lipRatio: a[7],
      courts: { upper: a[8], mid: a[9], lower: a[10] },
    };
  }

  return {
    load: load,
    warmup: warmup,
    analyze: analyze,
    cropFace: cropFace,
    encodeMetrics: encodeMetrics,
    decodeMetrics: decodeMetrics,
    measure: measure,   // 랜드마크 68점 → 비율 (점검용으로도 씁니다)
  };
})();
