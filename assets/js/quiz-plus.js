/* ============================================================
   알아볼괘 - 테스트 화면 손맛 더하기 (2026-10-28)
   <body class="qp"> 페이지에서 동작. 화면 종류를 스스로 알아내서:
     1) 시작 화면: 이름 넣는 칸 (이름은 이 기기에만 저장, 서버로 안 보냄)
     2) 문제 화면: 고른 답 표시 → 다음 문제로 넘어가는 동작, "결과 뽑는 중" 화면
     3) 결과 화면: "OO님은", 같은 결과가 나온 사람 비율(실제 집계), 재밌어요/정확해요
   숫자는 Worker(/api/...)가 실제로 센 값만 보여주고, 적으면 숨깁니다.
   ============================================================ */
(function () {
  "use strict";
  var body = document.body;
  if (!body || !body.classList.contains("qp")) return;

  var slug = (location.pathname.match(/\/tests\/([^\/]+)\//) || [])[1] || "";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NAME_KEY = "arabol:name";
  var DONE_KEY = "arabol:done";

  function store(kind) {
    try { return window[kind]; } catch (e) { return null; }
  }
  function getName() {
    var s = store("localStorage");
    try { return s ? (s.getItem(NAME_KEY) || "").trim() : ""; } catch (e) { return ""; }
  }
  function setName(v) {
    var s = store("localStorage");
    try { if (s) { if (v) s.setItem(NAME_KEY, v); else s.removeItem(NAME_KEY); } } catch (e) {}
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(n) {
    if (n >= 10000) return (Math.round(n / 1000) / 10).toString().replace(/\.0$/, "") + "만";
    return n.toLocaleString("ko-KR");
  }
  function api(path, method) {
    if (location.protocol === "file:") return Promise.resolve(null);
    return fetch(path, { method: method || "GET" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }
  /* 한글 이름 뒤 조사: 받침 있으면 '이', 없으면 '' (예: 재성이 / 지수) */
  function callName(n) {
    var c = n.charCodeAt(n.length - 1);
    if (c >= 0xAC00 && c <= 0xD7A3) return n + "님";
    return n + "님";
  }

  /* ============ 1) 시작 화면 ============ */
  var startBtn = document.querySelector('.btn[href^="quiz.html"]');
  if (startBtn && document.querySelector(".hero")) {
    var box = el("div", "qp-name");
    var lab = el("label", null, "이름을 넣으면 결과에 불러드려요");
    lab.setAttribute("for", "qpName");
    var row = el("div", "qp-name-row");
    var inp = el("input");
    inp.id = "qpName"; inp.type = "text"; inp.maxLength = 10; inp.autocomplete = "nickname";
    inp.placeholder = "예: 지수 (안 넣어도 돼요)";
    inp.value = getName();
    row.appendChild(inp);
    row.appendChild(el("span", "qp-name-suffix", "님"));
    box.appendChild(lab); box.appendChild(row);
    box.appendChild(el("small", null, "이름은 이 기기에만 저장되고 어디에도 보내지 않아요."));
    startBtn.parentNode.insertBefore(box, startBtn);
    inp.addEventListener("input", function () { setName(inp.value.replace(/[<>]/g, "").trim()); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); startBtn.click(); } });

    // 참여자 수 (실제 집계가 100명 넘을 때만)
    api("/api/counts").then(function (d) {
      if (!d || !d.counts || !d.counts[slug] || d.counts[slug] < 100) return;
      var hero = document.querySelector(".hero");
      if (hero.querySelector(".view-counter")) return;
      hero.appendChild(el("p", "view-counter", "지금까지 " + fmt(d.counts[slug]) + "명이 해봤어요"));
    });
  }

  /* ============ 2) 문제 화면 ============ */
  var options = document.getElementById("options");
  var label = document.getElementById("progressLabel");
  if (options && label) {
    body.classList.add("qp-quiz");
    window.QP_DELAY = reduce ? 500 : 1500;
    var card = options.closest(".card");
    var selfFeedback = slug === "slang-quiz";   // 정답/오답을 스스로 보여주는 퀴즈
    var passing = false;

    if (!selfFeedback) {
      // 누른 답을 잠깐 칠해 보여준 뒤 원래 동작(다음 문제)을 실행
      options.addEventListener("click", function (e) {
        var btn = e.target.closest(".option-btn");
        if (!btn || passing) return;
        e.stopImmediatePropagation(); e.preventDefault();
        if (options.querySelector(".qp-picked")) return;
        btn.classList.add("qp-picked");
        setTimeout(function () {
          passing = true; btn.click(); passing = false;
        }, reduce ? 0 : 220);
      }, true);
    }

    // 문제가 바뀔 때 카드가 옆에서 들어오게
    var mo = new MutationObserver(function () {
      if (!card || reduce) return;
      card.classList.remove("qp-in"); void card.offsetWidth; card.classList.add("qp-in");
    });
    mo.observe(document.getElementById("qText") || options, { childList: true, characterData: true, subtree: true });

    // 마지막 문제를 풀면 "결과 뽑는 중"
    var shown = false;
    new MutationObserver(function () {
      var m = label.textContent.match(/(\d+)\s*\/\s*(\d+)/);
      if (!m || shown || m[1] !== m[2] || m[2] === "0") return;
      shown = true;
      try { var ss = store("sessionStorage"); if (ss) ss.setItem(DONE_KEY, slug); } catch (e) {}
      showLoading();
    }).observe(label, { childList: true, characterData: true, subtree: true });
  }

  function showLoading() {
    var name = getName();
    var ov = el("div", "qp-loading");
    ov.setAttribute("role", "status");
    var g = el("div", "qp-loading-gua");
    for (var i = 0; i < 3; i++) g.appendChild(el("i"));
    ov.appendChild(g);
    ov.appendChild(el("p", null, name ? callName(name) + "의 괘를 뽑는 중" : "결과를 뽑는 중"));
    ov.appendChild(el("small", null, "고른 답을 하나씩 맞춰보고 있어요"));
    body.appendChild(ov);
    if (reduce) return;
    var codes = ["111", "010", "101", "001", "110", "000", "011", "100"], n = 0;
    var bars = g.children;
    setInterval(function () {
      var c = codes[n++ % 8];
      for (var j = 0; j < 3; j++) bars[j].className = c.charAt(j) === "1" ? "" : "n";
    }, 120);
  }

  /* ============ 3) 결과 화면 ============ */
  var hero = document.querySelector(".result-hero");
  if (hero && slug) {
    var fresh = false;
    try { var ss2 = store("sessionStorage"); fresh = ss2 && ss2.getItem(DONE_KEY) === slug; if (fresh) ss2.removeItem(DONE_KEY); } catch (e) {}

    // 방금 테스트를 끝낸 사람에게만 이름을 붙임 (공유 링크로 온 사람에겐 안 붙임)
    var nm = getName();
    var h1 = hero.querySelector("h1");
    if (fresh && nm && h1) hero.insertBefore(el("p", "qp-who", callName(nm) + "은"), h1);

    var rkey = (location.pathname.match(/result-([A-Za-z0-9-]+)\.html$/) || [])[1];
    var pulse = el("div", "qp-pulse");
    var anchor = document.querySelector(".index-card") || hero;
    anchor.parentNode.insertBefore(pulse, anchor.nextSibling);

    // 같은 결과 비율
    if (rkey) {
      api("/api/result?slug=" + encodeURIComponent(slug) + "&r=" + encodeURIComponent(rkey), fresh ? "POST" : "GET")
        .then(function (d) {
          if (!d || !d.total || d.total < 100) return;
          var pct = Math.max(1, Math.round(d.count / d.total * 100));
          var p = el("p", "qp-same");
          p.appendChild(document.createTextNode("이 테스트를 한 " + fmt(d.total) + "명 중 "));
          p.appendChild(el("b", null, pct + "%"));
          p.appendChild(document.createTextNode("가 같은 결과예요"));
          pulse.insertBefore(p, pulse.firstChild);
        });
    }

    // 재밌어요 / 정확해요
    var RKEY = "arabol:react:" + slug;
    var mine = {};
    try { mine = JSON.parse((store("localStorage") || {}).getItem(RKEY) || "{}") || {}; } catch (e) { mine = {}; }
    var wrap = el("div", "qp-react");
    var btns = {};
    [["fun", "😆 재밌어요"], ["acc", "🎯 정확해요"]].forEach(function (k) {
      var b = el("button");
      b.type = "button";
      b.setAttribute("aria-pressed", mine[k[0]] ? "true" : "false");
      b.appendChild(el("span", null, k[1]));
      var n = el("span", "qp-n", "");
      b.appendChild(n);
      btns[k[0]] = n;
      b.addEventListener("click", function () {
        if (mine[k[0]]) return;
        mine[k[0]] = 1;
        try { localStorage.setItem(RKEY, JSON.stringify(mine)); } catch (e) {}
        b.setAttribute("aria-pressed", "true");
        b.classList.add("qp-pop");
        api("/api/react?slug=" + encodeURIComponent(slug) + "&k=" + k[0], "POST").then(showReact);
      });
      wrap.appendChild(b);
    });
    pulse.appendChild(wrap);
    function showReact(d) {
      if (!d) return;
      ["fun", "acc"].forEach(function (k) { if (d[k] >= 10) btns[k].textContent = fmt(d[k]); });
    }
    api("/api/react?slug=" + encodeURIComponent(slug)).then(showReact);
  }
})();

/* ============================================================
   드래그·복사·오른쪽 클릭 방지 (2026-10-28)
   입력칸(이름·검색)에서는 평소처럼 쓸 수 있게 둠
   ============================================================ */
(function () {
  if (window.__arabolGuard) return;
  window.__arabolGuard = true;
  function isField(t) {
    return t && t.closest && t.closest("input, textarea, select, [contenteditable='true']");
  }
  ["contextmenu", "dragstart", "selectstart", "copy", "cut"].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      if (!isField(e.target)) e.preventDefault();
    });
  });
})();
