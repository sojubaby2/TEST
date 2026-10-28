/* ============================================================
   알아볼괘 - 이모지를 3D 그림으로 바꾸기 (2026-10-28)
   - 화면에 나오는 이모지(🔥💘👑 …)를 assets/img/e3d/ 의 3D 그림으로 바꿔 끼움
   - 그림: Microsoft Fluent Emoji 3D (MIT 라이선스, @lobehub/fluent-emoji-3d 판)
   - 나중에 화면에 새로 생기는 글자(결과 궁합, 추천 테스트, 괘 뽑기 등)도 자동으로 바꿈
   - 목록에 없는 이모지는 원래 글자 그대로 둠
   - main.js / quiz-plus.js 가 이 파일을 불러옴
   ============================================================ */
(function () {
  "use strict";
  if (window.E3D) return;
  var MAP = {"☯️":"262f-fe0f","🔥":"1f525","🔤":"1f524","👑":"1f451","🧊":"1f9ca","👶":"1f476","🍽️":"1f37d-fe0f","💬":"1f4ac","🎬":"1f3ac","🎮":"1f3ae","💘":"1f498","✈️":"2708-fe0f","🧘":"1f9d8","😴":"1f634","🍻":"1f37b","🐾":"1f43e","📏":"1f4cf","🔮":"1f52e","🧩":"1f9e9","🐺":"1f43a","💅":"1f485","🪫":"1faab","🫶":"1faf6","🔗":"1f517","💐":"1f490","😤":"1f624","🍀":"1f340","🥹":"1f979","🕺":"1f57a","🧠":"1f9e0","📢":"1f4e2","🌑":"1f311","📸":"1f4f8","🥺":"1f97a","🎩":"1f3a9","🗣️":"1f5e3-fe0f","🙄":"1f644","🙈":"1f648","🌈":"1f308","🛋️":"1f6cb-fe0f","🐚":"1f41a","📐":"1f4d0","🌇":"1f307","🪙":"1fa99","🌀":"1f300","🗓️":"1f5d3-fe0f","😭":"1f62d","⚡":"26a1","☕":"2615","✨":"2728","🩸":"1fa78","🌙":"1f319","💕":"1f495","💌":"1f48c","©":"00a9-fe0f","🫥":"1fae5","😎":"1f60e","🎤":"1f3a4","🧭":"1f9ed","🥰":"1f970","🔍":"1f50d","🦁":"1f981","🐼":"1f43c","🌾":"1f33e","🎯":"1f3af","🍃":"1f343","🌤️":"1f324-fe0f","🌗":"1f317","🌹":"1f339","😌":"1f60c","🙂":"1f642","🙆":"1f646","🧐":"1f9d0","🌊":"1f30a","⚖️":"2696-fe0f","💨":"1f4a8","🪨":"1faa8","💧":"1f4a7","🌸":"1f338","🥷":"1f977","👹":"1f479","🤝":"1f91d","🫧":"1fae7","🔋":"1f50b","🌤":"1f324-fe0f","🎉":"1f389","🌷":"1f337","💫":"1f4ab","🌶️":"1f336-fe0f","🍲":"1f372","🍙":"1f359","🍗":"1f357","🛡️":"1f6e1-fe0f","⚔️":"2694-fe0f","💚":"1f49a","🗡️":"1f5e1-fe0f","🧾":"1f9fe","👀":"1f440","🚪":"1f6aa","🌅":"1f305","🌡️":"1f321-fe0f","😂":"1f602","💼":"1f4bc","🌳":"1f333","🌵":"1f335","📖":"1f4d6","🎭":"1f3ad","↔":"2194-fe0f","🦉":"1f989","🧪":"1f9ea","🦋":"1f98b","💢":"1f4a2","🌱":"1f331","😊":"1f60a","🤔":"1f914","🎲":"1f3b2","😪":"1f62a","🛏️":"1f6cf-fe0f","🙋":"1f64b","🧑‍💼":"1f9d1-200d-1f4bc","🔪":"1f52a","😆":"1f606","🧙":"1f9d9","😐":"1f610","🌼":"1f33c","⏰":"23f0","🎁":"1f381","🤗":"1f917","🦅":"1f985","🍵":"1f375","🎣":"1f3a3","⚠️":"26a0-fe0f","🔬":"1f52c","🚀":"1f680","💡":"1f4a1","🌿":"1f33f","📘":"1f4d8","📋":"1f4cb","🔧":"1f527","🎨":"1f3a8","🎪":"1f3aa","🌥":"1f325-fe0f","🌆":"1f306","☀️":"2600-fe0f","⛰️":"26f0-fe0f","🌟":"1f31f","💛":"1f49b","📣":"1f4e3","🐢":"1f422","🦊":"1f98a","📜":"1f4dc","🐫":"1f42b","🌦️":"1f326-fe0f","🌥️":"1f325-fe0f","🔎":"1f50e","🏆":"1f3c6","🐶":"1f436","🐱":"1f431","🐹":"1f439","🐠":"1f420","🦜":"1f99c","🎈":"1f388","📌":"1f4cc","🗺️":"1f5fa-fe0f","🌧️":"1f327-fe0f","🐰":"1f430","😏":"1f60f","🐑":"1f411","🐥":"1f425","📡":"1f4e1","🫣":"1fae3","😅":"1f605","👔":"1f454","🐦":"1f426","♟️":"265f-fe0f","💸":"1f4b8","🛍️":"1f6cd-fe0f","🐷":"1f437","🍰":"1f370","🏃":"1f3c3","🎧":"1f3a7","🐯":"1f42f","🍜":"1f35c","🛎️":"1f6ce-fe0f","🥾":"1f97e","📷":"1f4f7","🌻":"1f33b","🏖️":"1f3d6-fe0f","✅":"2705","🖼️":"1f5bc-fe0f","🔄":"1f504","🏠":"1f3e0","☎":"260e-fe0f","®":"00ae-fe0f","🪞":"1fa9e","🏁":"1f3c1","☯":"262f-fe0f","🥁":"1f941"};
  var me = document.currentScript || document.querySelector('script[src*="emoji3d.js"]');
  var BASE = me ? me.src.replace(/js\/emoji3d\.js.*$/, "img/e3d/") : "/assets/img/e3d/";
  var RE;
  try {
    RE = new RegExp("\\p{Extended_Pictographic}(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}])?(?:\\u200D\\p{Extended_Pictographic}(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}])?)*", "gu");
  } catch (e) { return; }   // 아주 오래된 브라우저는 그냥 원래 이모지
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, TITLE: 1, NOSCRIPT: 1, OPTION: 1, SELECT: 1 };

  function src(e) { return MAP[e] ? BASE + MAP[e] + ".webp" : null; }

  function swapText(node) {
    var t = node.nodeValue;
    if (!t || !RE.test(t)) { RE.lastIndex = 0; return; }
    RE.lastIndex = 0;
    var frag = document.createDocumentFragment(), last = 0, m, hit = false;
    while ((m = RE.exec(t))) {
      var s = src(m[0]);
      if (!s) continue;
      hit = true;
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      var img = document.createElement("img");
      img.className = "e3d"; img.src = s; img.alt = m[0]; img.draggable = false;
      img.decoding = "async"; img.setAttribute("aria-hidden", "true");
      frag.appendChild(img);
      last = m.index + m[0].length;
    }
    if (!hit) return;
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }

  function scan(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (root.parentNode && !SKIP[root.parentNode.nodeName]) swapText(root); return; }
    if (root.nodeType !== 1 || SKIP[root.nodeName] || (root.closest && root.closest(".no-e3d"))) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP[p.nodeName] || (p.closest && p.closest(".no-e3d"))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(swapText);
  }

  // 3D 그림 크기: 글자 크기에 맞춰 자동 (홈·새 옷 페이지에서만 쓰임)
  var st = document.createElement("style");
  st.textContent = "img.e3d{display:inline-block;width:1.2em;height:1.2em;vertical-align:-0.24em;object-fit:contain;-webkit-user-drag:none;user-select:none;pointer-events:none}";
  document.head.appendChild(st);

  function start() {
    // 새 디자인 페이지(홈, 테스트 새 옷)에서만 바꿈. 사주·타로 등 옛 화면은 크기가 맞지 않을 수 있어 건드리지 않음
    if (!document.body.classList.contains("qp") && !document.body.classList.contains("home4")) return;
    scan(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === "characterData") scan(m.target);
        else m.addedNodes.forEach(function (n) { if (!(n.nodeType === 1 && n.classList.contains("e3d"))) scan(n); });
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);

  window.E3D = { src: src, scan: scan };
})();
