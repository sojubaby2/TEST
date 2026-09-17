/* ============================================================
   알아볼괘 - 사진 분석 결과 페이지 공용 스크립트
   ------------------------------------------------------------
   · 주소창의 측정치(?m=)를 읽어 표로 보여줍니다.
   · 내 사진은 sessionStorage 에서만 읽어요. 링크에는 들어가지 않습니다.
   · 공유 카드는 브라우저에서 직접 그립니다(사진 포함은 선택).
   ============================================================ */

const FaceResult = (function () {
  const PHOTO_KEY = "arabol_face_photo";
  const RANK_KEY  = "arabol_face_rank";

  function getPhoto() {
    try { return sessionStorage.getItem(PHOTO_KEY); } catch (e) { return null; }
  }

  function renderMetrics(el, metrics) {
    if (!el) return;
    if (!metrics) {
      el.innerHTML = '<p style="margin:0;font-size:14px;color:var(--text-sub);">'
        + '사진으로 분석하면 내 얼굴 비율 수치가 여기에 표시돼요.</p>';
      return;
    }
    const rows = FaceClassify.readable(metrics);
    el.innerHTML = '<div class="metric-list">' + rows.map(function (r) {
      return '<div class="metric-row">'
           +   '<span class="metric-label">' + r.label + '</span>'
           +   '<span class="metric-value">' + r.value + '</span>'
           +   '<span class="metric-note">' + r.note + '</span>'
           + '</div>';
    }).join('') + '</div>';
  }

  /* ---------- 공유 카드 그리기 ---------- */
  // 사이트와 같은 시스템 글꼴 스택을 씁니다 (웹폰트를 쓰지 않아 로딩 대기가 없어요)
  const FF = '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif';
  const EF = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  const F  = function (w, s) { return w + " " + s + "px " + FF; };

  function drawCard(opts) {
    return new Promise(function (resolve) {
      const W = 1080, HERO = 700, H = 1500;
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const g = c.getContext("2d");

      g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
      g.fillStyle = opts.color; g.fillRect(0, 0, W, HERO);
      g.fillStyle = "rgba(255,255,255,0.10)";
      g.beginPath(); g.arc(950, 40, 230, 0, Math.PI * 2); g.fill();

      g.fillStyle = "#fff";
      g.font = F(800, 44);
      g.textAlign = "left";
      g.fillText("알아볼괘", 64, 96);
      g.font = F(400, 28);
      g.fillStyle = "rgba(255,255,255,0.85)";
      g.fillText(opts.testName, 66, 140);

      function finishHero() {
        g.textAlign = "center";
        g.fillStyle = "#fff";
        g.font = F(800, 74);
        g.fillText(opts.title, W / 2, 520);
        g.font = F(400, 30);
        g.fillStyle = "rgba(255,255,255,0.9)";
        g.fillText(opts.subtitle, W / 2, 578);

        // 실제로 잰 비율 (위에서 5개까지)
        const rows = opts.rows || [];
        let y = HERO + 96;
        if (rows.length) {
          g.textAlign = "left";
          g.fillStyle = "#9698a8";
          g.font = F(800, 28);
          g.fillText("실제로 잰 내 얼굴 비율", 72, y);
          y += 58;

          rows.slice(0, 5).forEach(function (r) {
            g.fillStyle = "#1f2029";
            g.font = F(700, 32);
            g.textAlign = "left";
            g.fillText(r.label, 72, y);
            g.fillStyle = opts.color;
            g.textAlign = "right";
            g.fillText(r.value, W - 72, y);
            y += 62;
          });
        }

        // 그린 만큼만 남기고 아래 여백을 잘라냅니다
        const bottom = Math.max(y + 40, HERO + 120);
        const out = document.createElement("canvas");
        out.width = W; out.height = bottom + 110;
        const og = out.getContext("2d");
        og.fillStyle = "#ffffff"; og.fillRect(0, 0, out.width, out.height);
        og.drawImage(c, 0, 0, W, bottom, 0, 0, W, bottom);
        og.textAlign = "center";
        og.fillStyle = "#a0a2b0";
        og.font = F(400, 28);
        og.fillText("알아볼괘에서 나도 해보기 →", W / 2, out.height - 44);
        resolve(out);
      }

      if (opts.photo) {
        const img = new Image();
        img.onload = function () {
          const R = 150, cx = W / 2, cy = 320;
          g.save();
          g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.closePath(); g.clip();
          g.drawImage(img, cx - R, cy - R, R * 2, R * 2);
          g.restore();
          g.lineWidth = 8; g.strokeStyle = "rgba(255,255,255,0.9)";
          g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
          finishHero();
        };
        img.onerror = function () { opts.photo = null; drawEmoji(); };
        img.src = opts.photo;
      } else {
        drawEmoji();
      }

      function drawEmoji() {
        g.textAlign = "center";
        g.fillStyle = "#fff";
        g.font = "150px " + EF;
        g.fillText(opts.emoji, W / 2, 380);
        finishHero();
      }
    });
  }

  function saveCard(opts, fileName) {
    return drawCard(opts).then(function (canvas) {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  /* ---------- 결과 페이지 초기화 ---------- */
  function init(cfg) {
    const params  = new URLSearchParams(window.location.search);
    const metrics = FaceAnalyze.decodeMetrics(params.get("m"));
    // p= 는 사진 분석, percent= 는 예전 설문형 링크 (옛 링크도 그대로 열리게)
    const percent = Number(params.get("p") !== null ? params.get("p") : params.get("percent"));

    // 일치도 게이지
    const pctEl = document.getElementById("indexPercent");
    const gauge = document.getElementById("indexGauge");
    if (pctEl) {
      const v = (!isNaN(percent) && percent > 0) ? percent : null;
      pctEl.textContent = v ? v + "%" : "-";
      pctEl.style.color = cfg.color;
      if (gauge) {
        gauge.style.background = cfg.color;
        // 백그라운드 탭에서는 requestAnimationFrame 이 멈춰서 게이지가 0 인 채로 남습니다.
        setTimeout(function () { gauge.style.width = (v || 0) + "%"; }, 60);
      }
    }

    renderMetrics(document.getElementById("metricBox"), metrics);

    // 관상 소견 (내가 왕이 될 상인가? 전용)
    const readEl = document.getElementById("readingBox");
    if (readEl && typeof KingReading !== "undefined") {
      if (metrics) {
        readEl.innerHTML = KingReading.compose(metrics).map(function (s) {
          return '<div class="gung">'
               +   '<p class="gung-name">' + s.gung + '</p>'
               +   '<p class="gung-where">' + s.where + '</p>'
               +   '<p class="gung-body">' + s.body + '</p>'
               + '</div>';
        }).join('');
        const closeEl = document.getElementById("closingBox");
        if (closeEl) {
          closeEl.innerHTML = KingReading.closing(cfg.id);
          closeEl.style.display = "block";
        }
      } else {
        readEl.innerHTML = '<p style="margin:0;font-size:14px;color:var(--text-sub);">'
          + '사진으로 보면 부위별 소견이 여기에 나옵니다.</p>';
      }
    }

    // 내 사진 (이 기기에서만)
    const photo = getPhoto();
    const shotEl = document.getElementById("faceShot");
    const toggleWrap = document.getElementById("photoToggleWrap");
    if (photo && shotEl) {
      shotEl.src = photo;
      shotEl.style.display = "block";
      const emojiEl = document.getElementById("heroEmoji");
      if (emojiEl) emojiEl.style.display = "none";
      if (toggleWrap) toggleWrap.style.display = "flex";
    }

    // 2·3위도 보여주기
    let rank = null;
    try { rank = JSON.parse(sessionStorage.getItem(RANK_KEY) || "null"); } catch (e) {}

    const alsoEl = document.getElementById("alsoBox");
    if (alsoEl && rank && rank.length > 1) {
      alsoEl.innerHTML = rank.slice(1, 3).map(function (r) {
        const t = cfg.nameOf(r.id);
        return '<div class="metric-row"><span class="metric-label">' + t
             + '</span><span class="metric-value">' + r.percent + '%</span></div>';
      }).join('');
      alsoEl.parentElement.style.display = "block";
    }

    // 1위와 2위가 붙어 있으면 단정하지 않고 '혼합형'이라고 알려줍니다.
    // (얼굴이 두 유형 경계에 있으면 사진 한 장 차이로 순위가 바뀌거든요)
    const blendEl = document.getElementById("blendNote");
    if (blendEl && rank && rank.length > 1) {
      const gap = rank[0].percent - rank[1].percent;
      // 유형이 5개냐 15개냐에 따라 퍼센트 자체가 달라지므로 '몇 %p 차이'가 아니라
      // '2위가 1위의 몇 %인가'로 봅니다. 유형이 많을수록 점수가 촘촘해지니
      // 기준도 같이 올려요 (5종 0.82 / 11종 0.92 / 15종 0.94).
      const thr = Math.min(0.95, Math.max(0.82, 1 - 0.15 * (6 / rank.length)));
      const close = rank[1].percent / (rank[0].percent || 1) >= thr;
      if (close) {
        blendEl.innerHTML = "이 얼굴은 <strong>" + cfg.nameOf(rank[0].id) + "</strong>과 <strong>"
          + cfg.nameOf(rank[1].id) + "</strong>의 경계에 있어요 (차이 " + gap + "%p). "
          + "어느 한쪽으로 딱 떨어지는 얼굴이 아니라 <strong>두 유형이 섞인 혼합형</strong>이라고 보시는 게 정확합니다. "
          + "다른 사진으로 찍으면 순서가 바뀔 수 있어요.";
        blendEl.style.display = "block";
      }
    }

    // 버튼
    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) shareBtn.addEventListener("click", function () {
      shareCurrentPage(cfg.shareLead + " '" + cfg.title + "' " + cfg.emoji,
                       "너는 어떤 결과 나와? 알아볼괘에서 확인해봐!");
    });
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn) copyBtn.addEventListener("click", function () { copyLinkToClipboard(); });

    const dlBtn = document.getElementById("downloadBtn");
    if (dlBtn) dlBtn.addEventListener("click", function () {
      const usePhoto = document.getElementById("withPhoto");
      dlBtn.disabled = true;
      saveCard({
        color: cfg.color, testName: cfg.testName, title: cfg.title,
        subtitle: cfg.subtitle, emoji: cfg.emoji,
        photo: (usePhoto && usePhoto.checked) ? photo : null,
        rows: metrics ? FaceClassify.readable(metrics).slice(0, 5) : [],
      }, "알아볼괘_" + cfg.title + ".png").then(function () { dlBtn.disabled = false; });
    });
  }

  return { init: init, renderMetrics: renderMetrics, drawCard: drawCard };
})();
