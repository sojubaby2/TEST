/* ============================================================
   알아볼괘 — 움직임 효과 (2026-11-04 신설)
   재성님: "알아볼괘도 효과 이쁘게 잘 넣어줘"

   main.js / quiz-plus.js 맨 위에서 이 파일을 불러옵니다(페이지마다 고칠 필요 없음).
   페이지가 다 뜬 뒤 한가할 때 도구 두 개를 불러와서 움직임을 입힙니다.
     · Motion   (assets/vendor/motion/motion.js)   — 스크롤하면 카드가 차례로 톡톡 떠오름,
                                                      카드 기울기(PC), 보기 단추 등장, 맨 위 진행 막대
     · Anime.js (assets/vendor/anime/anime.umd.min.js) — 티남이·티녀 둥실둥실, 괘 막대 그리기,
                                                      결과 숫자 올라가기, 결과 축하 색종이
   꾸밈은 assets/css/fx.css 에 있습니다.

   안전장치
     · 기기에서 "움직임 줄이기"를 켠 사람에게는 아무 효과도 주지 않습니다.
     · 첫 화면(스크롤 안 해도 보이는 부분)은 숨기지 않습니다 — 깜빡임 없음, 검색엔진도 그대로 읽음.
     · 도구를 못 불러와도 사이트는 지금 그대로 동작합니다.
   ★ 효과를 전부 끄고 싶으면 main.js·quiz-plus.js 맨 위 "움직임 효과 불러오기" 덩어리를 지우면 됩니다.
   ============================================================ */
(function () {
  if (window.__arabolFX) return;
  window.__arabolFX = true;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/js\/[^\/]*$/, "") : "/assets/";

  function css(href) {
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }
  function js(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = ok;
      s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  function idle(fn) {
    if ("requestIdleCallback" in window) requestIdleCallback(fn, { timeout: 1500 });
    else setTimeout(fn, 300);
  }

  css(base + "css/fx.css");

  function start() {
    Promise.all([js(base + "vendor/motion/motion.js"), js(base + "vendor/anime/anime.umd.min.js")])
      .then(run)
      .catch(function () {
        /* 못 불러오면 효과 없이 그대로 */
      });
  }
  if (document.readyState === "complete") idle(start);
  else window.addEventListener("load", function () { idle(start); });

  function run() {
    var M = window.Motion;
    var A = window.anime;
    if (!M || !A) return;
    var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* 1) 맨 위 진행 막대 — 오방색(빨강→노랑→파랑)으로 읽은 만큼 차오름 */
    try {
      var bar = document.createElement("div");
      bar.id = "fx-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
      M.scroll(M.animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));
    } catch (e) {}

    /* 2) 홈: 티남이·티녀 둥실둥실 (Anime.js) — 원래 기울기는 그대로 유지 */
    try {
      var girl = document.querySelector(".z-girl");
      var boy = document.querySelector(".z-boy");
      if (girl) A.animate(girl, { translateY: [0, 6], rotate: [-4, -6], duration: 1800, alternate: true, loop: true, ease: "inOutSine" });
      if (boy) A.animate(boy, { translateY: [0, 5], rotate: [3, 5], duration: 1600, delay: 300, alternate: true, loop: true, ease: "inOutSine" });
      var footGirl = document.querySelector(".z-foot-girl");
      if (footGirl) A.animate(footGirl, { translateY: [0, -6], duration: 2000, alternate: true, loop: true, ease: "inOutSine" });
    } catch (e) {}

    /* 3) 괘 막대 그리기 — 오늘의 괘 카드 큰 막대가 한 줄씩 그려짐 (Anime.js) */
    function drawGua(root) {
      if (!root) return;
      var bars = root.querySelectorAll(".g i");
      if (!bars.length) return;
      A.animate(bars, { scaleX: [0, 1], opacity: [0.3, 1], duration: 520, delay: A.stagger(110), ease: "outBack(1.6)" });
    }
    drawGua(document.querySelector(".z-draw-gua"));

    /* 괘 뽑기 / 다시 뽑기 — 새 괘가 나오면 카드가 통! 튀고 막대가 다시 그려짐 */
    var title = document.getElementById("drawTitle");
    var card = document.querySelector(".z-draw");
    if (title && card) {
      var last = title.textContent;
      new MutationObserver(function () {
        if (title.textContent === last) return;
        last = title.textContent;
        M.animate(card, { scale: [0.96, 1.02, 1], rotate: [0, -1.2, 0] }, { duration: 0.5, ease: "easeOut" });
        drawGua(document.querySelector(".z-draw-gua"));
        var emo = document.getElementById("drawEmo");
        if (emo) A.animate(emo, { scale: [0.4, 1], rotate: [-30, 0], duration: 700, ease: "outElastic(1, .5)" });
      }).observe(title, { childList: true, characterData: true, subtree: true });
    }

    /* 4) 스크롤하면 카드가 차례로 톡톡 떠오름 (Motion) */
    var REVEAL = ".z-item, .z-start-card, .z-read-list > *, .z-panel-head, .z-h2, .test-card, .index-card, .card, .compat-card, .trait-list li, .faq-q, .section-title, .article > h2, .article > p, .blog-card";
    var seen = new WeakSet();
    var queue = [];
    var qt = 0;
    function flush() {
      var els = queue;
      queue = [];
      els.forEach(function (el, i) {
        M.animate(el, { opacity: [0, 1], y: [26, 0], scale: [0.97, 1] }, { type: "spring", stiffness: 260, damping: 24, delay: Math.min(i, 8) * 0.05 }).then(function () {
          el.classList.remove("fx-pre");
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
        });
      });
    }
    function prep(el) {
      if (seen.has(el)) return;
      seen.add(el);
      var r = el.getBoundingClientRect();
      if (r.height === 0 || r.top < window.innerHeight * 0.92) return; // 첫 화면·숨은 칸은 그대로
      el.classList.add("fx-pre");
      M.inView(el, function () {
        queue.push(el);
        clearTimeout(qt);
        qt = setTimeout(flush, 16);
      }, { margin: "0px 0px -6% 0px" });
    }
    function scan() {
      try { document.querySelectorAll(REVEAL).forEach(prep); } catch (e) {}
    }
    scan();

    /* 5) 테스트 보기 단추 — 문제가 바뀔 때마다 아래에서 차례로 튀어 올라옴 (Motion) */
    var opts = document.getElementById("options");
    function popOptions() {
      if (!opts) return;
      var btns = opts.querySelectorAll(".option-btn");
      if (!btns.length) return;
      M.animate(btns, { opacity: [0, 1], y: [18, 0] }, { type: "spring", stiffness: 320, damping: 22, delay: M.stagger(0.05) });
    }
    if (opts) {
      new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].addedNodes.length) { popOptions(); break; }
        }
      }).observe(opts, { childList: true });
    }
    var qText = document.querySelector(".question-text");
    if (qText) {
      new MutationObserver(function () {
        M.animate(qText, { opacity: [0, 1], x: [-14, 0] }, { duration: 0.35, ease: "easeOut" });
      }).observe(qText, { childList: true, characterData: true, subtree: true });
    }

    /* 6) 결과 화면 — 숫자가 0부터 올라가고, 오방색 색종이가 팡! (Anime.js) */
    var pct = document.getElementById("indexPercent");
    function countUp() {
      var m = (pct.textContent || "").match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
      if (!m || pct.dataset.fxCounted) return;
      pct.dataset.fxCounted = "1";
      var target = parseFloat(m[2]);
      var digits = (m[2].split(".")[1] || "").length;
      var o = { v: 0 };
      A.animate(o, {
        v: target,
        duration: 1300,
        ease: "outExpo",
        onUpdate: function () { pct.textContent = m[1] + o.v.toFixed(digits) + m[3]; },
        onComplete: function () { pct.textContent = m[1] + m[2] + m[3]; }
      });
      A.animate(pct, { scale: [0.6, 1], duration: 900, ease: "outElastic(1, .6)" });
    }
    if (pct) {
      if (/\d/.test(pct.textContent)) countUp();
      else new MutationObserver(function (l, ob) { if (/\d/.test(pct.textContent)) { ob.disconnect(); countUp(); } }).observe(pct, { childList: true, characterData: true, subtree: true });
    }

    var hero = document.querySelector(".result-hero");
    // "두구두구" 카드가 뒤집혀 결과가 공개되는 순간에 맞춰 터뜨림(카드가 없는 옛 디자인은 바로)
    if (hero && /result/.test(location.pathname)) {
      if (hero.classList.contains("qp-hide-in") || hero.querySelector(".qp-cover")) {
        new MutationObserver(function (l, ob) {
          if (hero.classList.contains("qp-flip-b")) { ob.disconnect(); setTimeout(function () { confetti(hero); }, 120); }
        }).observe(hero, { attributes: true, attributeFilter: ["class"] });
      } else {
        confetti(hero);
      }
    }

    function confetti(target) {
      var colors = ["#FFC93C", "#C9381F", "#2450D8", "#1B1F3B", "#FFFFFF"];
      var r = target.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = Math.max(60, r.top + Math.min(r.height, 260) * 0.35);
      var layer = document.createElement("div");
      layer.className = "fx-confetti";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
      var pieces = [];
      for (var i = 0; i < 36; i++) {
        var p = document.createElement("i");
        p.style.left = cx + "px";
        p.style.top = cy + "px";
        p.style.background = colors[i % colors.length];
        if (i % 3 === 0) p.style.borderRadius = "50%";
        layer.appendChild(p);
        pieces.push(p);
      }
      A.animate(pieces, {
        translateX: function () { return A.utils.random(-170, 170); },
        translateY: [{ to: function () { return A.utils.random(-190, -70); }, duration: 600, ease: "outCubic" }, { to: function () { return A.utils.random(120, 260); }, duration: 1100, ease: "inQuad" }],
        rotate: function () { return A.utils.random(-360, 360); },
        opacity: [{ to: 1, duration: 100 }, { to: 0, delay: 1200, duration: 400 }],
        delay: A.stagger(12),
        onComplete: function () { layer.remove(); }
      });
    }

    /* 7) PC: 카드에 마우스를 올리면 그쪽으로 살짝 기울어짐 (Motion) */
    if (fine) {
      var TILT = ".z-start-card, .test-card, .z-draw, .compat-card, .index-card";
      var cur = null;
      document.addEventListener("pointermove", function (e) {
        var t = e.target instanceof Element ? e.target.closest(TILT) : null;
        if (cur && cur !== t) {
          M.animate(cur, { rotateX: 0, rotateY: 0 }, { type: "spring", stiffness: 220, damping: 18 });
        }
        cur = t;
        if (!t) return;
        var b = t.getBoundingClientRect();
        var px = (e.clientX - b.left) / b.width - 0.5;
        var py = (e.clientY - b.top) / b.height - 0.5;
        M.animate(t, { rotateX: -py * 7, rotateY: px * 9, transformPerspective: 700 }, { type: "spring", stiffness: 260, damping: 20 });
      }, { passive: true });
    }

    /* 8) 누르면 그 자리에서 오방색 물결 */
    var ri = 0;
    document.addEventListener("pointerdown", function (e) {
      var t = e.target instanceof Element ? e.target : null;
      if (!t || !t.closest("a, button, .option-btn, [role='button']")) return;
      var d = document.createElement("span");
      d.className = "fx-ripple fx-r" + (ri++ % 3);
      d.setAttribute("aria-hidden", "true");
      d.style.left = e.clientX + "px";
      d.style.top = e.clientY + "px";
      document.body.appendChild(d);
      M.animate(d, { scale: [0, 1], opacity: [0.5, 0] }, { duration: 0.55, ease: "easeOut" }).then(function () { d.remove(); });
    }, { passive: true });

    /* 새로 생긴 칸(탭 바꾸기·검색 결과·더 보기)도 다시 훑음 */
    var pend = 0;
    new MutationObserver(function () {
      cancelAnimationFrame(pend);
      pend = requestAnimationFrame(scan);
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
