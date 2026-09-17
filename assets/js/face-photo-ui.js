/* ============================================================
   알아볼괘 - 사진 선택 → 분석 → 결과 페이지 이동 (관상/동물상 공용)
   ------------------------------------------------------------
   사용법: 페이지에서 FacePhotoUI.init({ mode: "animal" | "face" })
   ============================================================ */

const FacePhotoUI = (function () {

  /* ---------- 분석 중 로딩 화면 ----------
     얼굴 윤곽을 그리고 스캔선이 훑으면서 부위별 점이 찍힙니다.
     문구는 실제 분석 단계(도구 준비 → 얼굴 찾기 → 비율 재기)에 맞춰 넘어가요. */
  const SCAN_SVG =
    '<svg viewBox="0 0 200 250" aria-hidden="true">' +
      // 얼굴 윤곽 — 광대가 가장 넓고 턱으로 완만하게 좁아지는 형태
      '<path class="scan-outline" d="M100 30C136 30 160 54 161 94C162 124 154 156 136 182C127 196 114 212 100 222C86 212 73 196 64 182C46 156 38 124 39 94C40 54 64 30 100 30Z"/>' +
      // 삼정 경계선 (상정 | 중정 | 하정)
      '<line class="scan-court" x1="40" y1="86"  x2="160" y2="86"/>' +
      '<line class="scan-court" x1="40" y1="150" x2="160" y2="150"/>' +
      '<text class="scan-court-label" x="167" y="60"  text-anchor="start">상정</text>' +
      '<text class="scan-court-label" x="167" y="122" text-anchor="start">중정</text>' +
      '<text class="scan-court-label" x="167" y="188" text-anchor="start">하정</text>' +
      // 이목구비
      '<g class="scan-feature">' +
        '<path d="M60 80q16-8 33-2"/><path d="M107 78q17-6 33 2"/>' +
        '<path d="M62 103q14-9 28 0q-14 9-28 0Z"/><path d="M110 103q14-9 28 0q-14 9-28 0Z"/>' +
        '<path d="M100 108v34"/><path d="M90 150q10 6 20 0"/>' +
        '<path d="M80 178q20 10 40 0"/>' +
      '</g>' +
      // 실제로 재는 지점들
      '<g>' +
        '<circle class="scan-dot" cx="37"  cy="100" r="3.4" style="animation-delay:0s"/>' +
        '<circle class="scan-dot" cx="163" cy="100" r="3.4" style="animation-delay:.12s"/>' +
        '<circle class="scan-dot" cx="76"  cy="103" r="3.4" style="animation-delay:.3s"/>' +
        '<circle class="scan-dot" cx="124" cy="103" r="3.4" style="animation-delay:.42s"/>' +
        '<circle class="scan-dot" cx="90"  cy="150" r="3.4" style="animation-delay:.62s"/>' +
        '<circle class="scan-dot" cx="110" cy="150" r="3.4" style="animation-delay:.72s"/>' +
        '<circle class="scan-dot" cx="80"  cy="178" r="3.4" style="animation-delay:.9s"/>' +
        '<circle class="scan-dot" cx="120" cy="178" r="3.4" style="animation-delay:1s"/>' +
        '<circle class="scan-dot" cx="100" cy="226" r="3.4" style="animation-delay:1.2s"/>' +
      '</g>' +
      // 훑고 지나가는 스캔선
      '<g class="scan-beam">' +
        '<defs><linearGradient id="beamG" x1="0" x2="1" y1="0" y2="0">' +
          '<stop offset="0"   stop-color="#ec4899" stop-opacity="0"/>' +
          '<stop offset=".5"  stop-color="#ec4899" stop-opacity=".95"/>' +
          '<stop offset="1"   stop-color="#ec4899" stop-opacity="0"/>' +
        '</linearGradient></defs>' +
        '<rect x="30" y="0" width="140" height="2.6" fill="url(#beamG)"/>' +
      '</g>' +
    '</svg>';

  // 부위별 문구 — 관상 모드는 궁 이름으로, 나머지는 일반 부위명으로
  const STEPS = {
    king: [
      ["삼정을 가늠하는 중", "이마·코·턱 세 구간의 균형"],
      ["관록궁을 보는 중",   "이마 — 벼슬과 이름"],
      ["명궁을 보는 중",     "두 눈썹 사이 — 마음자리"],
      ["감찰관을 보는 중",   "두 눈 — 사람을 보는 힘"],
      ["재백궁을 보는 중",   "코 — 재물이 머무는 곳"],
      ["지각을 보는 중",     "턱 — 말년과 아랫사람"],
    ],
    other: [
      ["얼굴 윤곽을 잡는 중", "광대 폭과 얼굴 길이"],
      ["턱선을 재는 중",     "턱 폭과 턱 끝 각도"],
      ["눈매를 재는 중",     "눈 크기와 눈 사이 간격"],
      ["코와 입을 재는 중",  "얼굴 폭 대비 비중"],
      ["비율을 맞춰보는 중", "거의 다 됐어요"],
    ],
  };

  function makeScan(mode) {
    const box = document.createElement("div");
    box.className = "face-scan";
    box.innerHTML = '<div class="face-scan-stage">' + SCAN_SVG + '</div>'
                  + '<p class="scan-caption"></p><p class="scan-sub"></p>';
    const cap = box.querySelector(".scan-caption");
    const sub = box.querySelector(".scan-sub");
    const outline = box.querySelector(".scan-outline");
    const steps = STEPS[mode === "king" ? "king" : "other"];
    let i = 0, timer = null;

    function paint() {
      cap.style.opacity = 0;
      setTimeout(function () {
        cap.textContent = steps[i][0];
        sub.textContent = steps[i][1];
        cap.style.opacity = 1;
      }, 180);
      i = (i + 1) % steps.length;
    }
    return {
      el: box,
      start: function () {
        i = 0; paint();
        box.classList.add("on");
        // 윤곽선은 CSS 키프레임 대신 여기서 직접 그립니다.
        // 경로 길이가 바뀌어도 알아서 맞고, 인라인 스타일과 충돌하지도 않아요.
        try {
          const len = Math.ceil(outline.getTotalLength());
          outline.style.transition = "none";
          outline.style.strokeDasharray = len;
          outline.style.strokeDashoffset = len;
          void outline.getBoundingClientRect();   // 되돌린 값을 확정시킵니다
          outline.style.transition = "stroke-dashoffset 1.2s ease-out";
          outline.style.strokeDashoffset = "0";
        } catch (e) { /* 구형 브라우저면 그냥 선이 바로 보입니다 */ }
        clearInterval(timer);
        timer = setInterval(paint, 1400);
      },
      stop: function () {
        clearInterval(timer); timer = null;
        box.classList.remove("on");
      },
    };
  }

  const MSG = {
    NO_FACE:    "얼굴을 찾지 못했어요. 정면을 보고 찍은 사진으로 다시 시도해주세요.",
    MANY_FACES: "얼굴이 여러 개 보여요. 한 사람만 나온 사진으로 골라주세요.",
    TOO_SMALL:  "얼굴이 너무 작게 나왔어요. 얼굴이 크게 나온 사진이 정확해요.",

    // 사진 자체를 못 연 경우 — 아이폰 HEIC 가 가장 흔합니다
    BAD_IMAGE:  "이 사진 형식은 브라우저가 열지 못했어요.\n" +
                "아이폰 사진(HEIC)이라면 설정 › 카메라 › 포맷을 '높은 호환성'으로 바꿔 다시 찍거나, " +
                "사진을 JPG로 저장해서 올려주세요.",

    // 분석 도구 쪽 문제
    LIB_MISSING:  "분석 도구를 불러오지 못했어요. 새로고침 후 다시 시도해주세요.",
    MODEL_LOAD:   "분석 도구를 내려받지 못했어요. 인터넷 연결을 확인하고 새로고침해주세요.",
    FILE_PROTOCOL:"파일을 직접 열면 분석 도구를 불러올 수 없어요. 사이트 주소(https://arabol.co.kr)로 접속해주세요.",
    DETECT_FAIL:  "분석 도구가 사진을 처리하지 못했어요. 새로고침 후 다시 시도해주세요.",

    UNKNOWN:    "분석 중 문제가 생겼어요. 다른 사진으로 다시 시도해주세요.",
  };

  function init(cfg) {
    const fileInput  = document.getElementById("photoInput");
    const pickBtn    = document.getElementById("pickBtn");
    const previewWrap= document.getElementById("previewWrap");
    const previewImg = document.getElementById("previewImg");
    const runBtn     = document.getElementById("runBtn");
    const statusEl   = document.getElementById("statusText");
    const guideEl    = document.getElementById("guideBox");
    const runLabel   = runBtn.textContent;   // 페이지마다 문구가 달라서 원래 것을 기억해둡니다
    let currentFile  = null;

    // 로딩 애니메이션은 상태 문구 바로 위에 끼워 넣습니다
    const scan = makeScan(cfg.mode);
    statusEl.parentNode.insertBefore(scan.el, statusEl);

    function setStatus(text, busy, detail) {
      statusEl.textContent = text || "";
      if (detail) {
        const small = document.createElement("span");
        small.className = "photo-status-detail";
        small.textContent = "(" + detail + ")";
        statusEl.appendChild(document.createElement("br"));
        statusEl.appendChild(small);
      }
      statusEl.style.display = text ? "block" : "none";
      runBtn.disabled = !!busy || !currentFile;
      runBtn.textContent = busy ? "분석 중..." : runLabel;
    }

    pickBtn.addEventListener("click", function () { fileInput.click(); });

    fileInput.addEventListener("change", function () {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      // 윈도우에서 HEIC 같은 형식은 type 이 비어 오기도 해서 확장자도 함께 봅니다.
      const looksLikeImage = /^image\//.test(f.type)
                          || /\.(jpe?g|png|gif|webp|bmp|heic|heif|avif|tiff?)$/i.test(f.name || "");
      if (!looksLikeImage) { setStatus("이미지 파일만 선택할 수 있어요."); return; }
      currentFile = f;
      previewImg.src = URL.createObjectURL(f);
      previewWrap.style.display = "block";
      if (guideEl) guideEl.style.display = "none";
      pickBtn.textContent = "다른 사진 고르기";
      setStatus("", false);
      // 미리보기를 보는 동안 미리 예열해둡니다 (버튼을 눌렀을 때 바로 결과가 나오도록)
      FaceAnalyze.warmup();
    });

    // 예열이 끝나면 분석이 30ms 만에 끝나 애니메이션이 번쩍하고 사라집니다.
    // 뭘 보고 있는지 읽을 시간은 주는 게 나아서 최소 표시 시간을 둡니다.
    const MIN_SCAN_MS = cfg.mode === "king" ? 2600 : 1800;
    const wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

    runBtn.addEventListener("click", async function () {
      if (!currentFile) return;
      const startedAt = Date.now();
      const settle = function () {
        return wait(Math.max(0, MIN_SCAN_MS - (Date.now() - startedAt)));
      };
      scan.start();
      // 애니메이션이 상황을 말해주니 상태 문구는 비워둡니다 (중복 안내 방지)
      setStatus("", true);
      try {
        await FaceAnalyze.load();
        await FaceAnalyze.warmup();   // 사진 고를 때 이미 돌려놨으면 바로 지나갑니다
        const res = await FaceAnalyze.analyze(currentFile);

        if (!res.ok) { await settle(); scan.stop(); setStatus(MSG[res.reason] || MSG.UNKNOWN, false); return; }

        await settle();

        const ranked = cfg.mode === "animal" ? FaceClassify.classifyAnimal(res.metrics)
                     : cfg.mode === "king"   ? FaceClassify.classifyKing(res.metrics)
                     :                         FaceClassify.classifyFace(res.metrics);
        const top = ranked[0];

        // 사진은 이 기기 안에서만 씁니다. 주소창에도 서버에도 올라가지 않아요.
        try {
          sessionStorage.setItem("arabol_face_photo", FaceAnalyze.cropFace(res.canvas, res.box, 420));
          sessionStorage.setItem("arabol_face_rank", JSON.stringify(ranked));
        } catch (e) { /* 저장이 막혀 있어도 결과 보기에는 지장 없음 */ }

        const q = "?m=" + encodeURIComponent(FaceAnalyze.encodeMetrics(res.metrics))
                + "&p=" + top.percent;
        window.location.href = "result-" + top.id + ".html" + q;
      } catch (e) {
        // 무슨 일이 있었는지는 콘솔에 그대로 남겨둡니다 (문의가 오면 여기를 봐요)
        if (window.console && console.error) console.error("[알아볼괘] 사진 분석 실패:", e);
        await settle();
        scan.stop();
        const code = e && e.message;
        setStatus(MSG[code] || MSG.UNKNOWN, false, code && MSG[code] ? null : code);
      }
    });

    setStatus("", false);
  }

  return { init: init };
})();
