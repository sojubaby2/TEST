/* ============================================================
   알아볼괘 - 사진 선택 → 분석 → 결과 페이지 이동 (관상/동물상 공용)
   ------------------------------------------------------------
   사용법: 페이지에서 FacePhotoUI.init({ mode: "animal" | "face" })
   ============================================================ */

const FacePhotoUI = (function () {
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

    runBtn.addEventListener("click", async function () {
      if (!currentFile) return;
      setStatus("분석 도구를 준비하고 있어요... (처음 한 번만 받아요)", true);
      try {
        await FaceAnalyze.load();
        await FaceAnalyze.warmup();   // 사진 고를 때 이미 돌려놨으면 바로 지나갑니다
        setStatus("얼굴 비율을 재는 중이에요...", true);
        const res = await FaceAnalyze.analyze(currentFile);

        if (!res.ok) { setStatus(MSG[res.reason] || MSG.UNKNOWN, false); return; }

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
        const code = e && e.message;
        setStatus(MSG[code] || MSG.UNKNOWN, false, code && MSG[code] ? null : code);
      }
    });

    setStatus("", false);
  }

  return { init: init };
})();
