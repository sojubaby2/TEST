/* ============================================================
   알아볼괘 - 공통 JS (공유, 토스트 등)
   ============================================================ */

/* 카카오 개발자(developers.kakao.com)에서 발급받은 JavaScript 키를
   여기에 넣으면 모든 페이지에 카카오톡 공유 버튼이 자동으로 생겨요.
   비워두면(기본값) 카카오 버튼은 그냥 안 보이고, 기존 공유 방식만 동작해요. */
var KAKAO_JS_KEY = "1801eb463d348c723b12a030dbbd05d1";

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function shareCurrentPage(shareTitle, shareText) {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url });
      return;
    } catch (e) {
      // 사용자가 공유를 취소한 경우 등 - 조용히 무시
      return;
    }
  }
  // Web Share API 미지원 브라우저(PC 등) -> 링크 복사로 대체
  copyLinkToClipboard(url);
}

function copyLinkToClipboard(url) {
  const target = url || window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(target)
      .then(() => showToast("링크가 복사됐어요! 친구에게 보내보세요 🙂"))
      .catch(() => fallbackCopy(target));
  } else {
    fallbackCopy(target);
  }
}

function fallbackCopy(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    showToast("링크가 복사됐어요! 친구에게 보내보세요 🙂");
  } catch (e) {
    showToast("복사에 실패했어요. 주소창의 링크를 직접 복사해주세요.");
  }
  document.body.removeChild(input);
}

/**
 * 결과 페이지 하단 "궁합" 섹션(천생연분 / 상극)을 그려주는 공용 함수.
 * 모든 테스트에서 같은 방식으로 재사용할 수 있도록 범용으로 작성함.
 *
 * @param {string} containerId  결과를 그릴 컨테이너 엘리먼트의 id
 * @param {Array}  resultsArray 해당 테스트의 전체 결과 유형 배열 (id, emoji, title 필요)
 * @param {Object} compat       현재 결과의 compat 객체 { best: {id, reason}, worst: {id, reason} }
 * @param {string} linkPrefix   결과 페이지 파일명 접두사 (기본값 "result-")
 */
function renderCompatSection(containerId, resultsArray, compat, linkPrefix) {
  var container = document.getElementById(containerId);
  if (!container || !compat) return;
  linkPrefix = linkPrefix || "result-";

  function findById(id) {
    return resultsArray.find(function (r) {
      return r.id === id;
    });
  }

  function cardHtml(kind, label, matchInfo, targetResult) {
    if (!targetResult) return "";
    return (
      '<a class="compat-card compat-' +
      kind +
      '" href="' +
      linkPrefix +
      targetResult.id +
      '.html">' +
      '<div class="compat-label">' +
      label +
      "</div>" +
      '<div class="compat-type"><span class="compat-emoji">' +
      targetResult.emoji +
      "</span><span>" +
      targetResult.title +
      "</span></div>" +
      '<p class="compat-reason">' +
      matchInfo.reason +
      "</p>" +
      '<p class="compat-hint">탭해서 결과 보러가기 →</p>' +
      "</a>"
    );
  }

  var html = "";
  html += cardHtml("best", "💘 천생연분", compat.best, findById(compat.best.id));
  html += cardHtml("worst", "⚡ 상극 주의", compat.worst, findById(compat.worst.id));
  container.innerHTML = html;
}

function downloadImage(imgSrc, fileName) {
  const a = document.createElement("a");
  a.href = imgSrc;
  a.download = fileName || "result.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ============================================================
   카카오톡 공유 버튼 (신규)
   - KAKAO_JS_KEY가 설정된 경우에만 "결과 공유하기" 버튼 옆에
     노란 카카오톡 버튼을 자동으로 추가함. 모든 결과 페이지 공통.
   ============================================================ */
function getMetaContent(prop) {
  var el = document.querySelector('meta[property="' + prop + '"]');
  return el ? el.getAttribute("content") : null;
}

function loadKakaoSdk(callback) {
  if (window.Kakao) {
    callback();
    return;
  }
  var script = document.createElement("script");
  script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js";
  script.crossOrigin = "anonymous";
  script.onload = callback;
  script.onerror = function () {
    showToast("카카오톡 공유 로드에 실패했어요");
  };
  document.head.appendChild(script);
}

function shareToKakao() {
  loadKakaoSdk(function () {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      var title = getMetaContent("og:title") || document.title;
      var desc = getMetaContent("og:description") || "알아볼괘에서 확인해봐!";
      var ogImage = getMetaContent("og:image");
      var imageUrl = ogImage
        ? new URL(ogImage, window.location.href).href
        : new URL("/assets/img/icon-512.png", window.location.href).href;
      var pageUrl = window.location.href.split("?")[0].split("#")[0];

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: desc,
          imageUrl: imageUrl,
          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
        },
        buttons: [
          {
            title: "결과 보러가기",
            link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
          },
        ],
      });
    } catch (e) {
      copyLinkToClipboard();
    }
  });
}

function initKakaoShareButton() {
  if (!KAKAO_JS_KEY) return; // 키 미설정 시 버튼 자체를 노출하지 않음
  var shareBtn = document.getElementById("shareBtn");
  if (!shareBtn || document.getElementById("kakaoShareBtn")) return;

  var kakaoBtn = document.createElement("button");
  kakaoBtn.type = "button";
  kakaoBtn.id = "kakaoShareBtn";
  kakaoBtn.className = "btn btn-kakao";
  kakaoBtn.textContent = "💬 카카오톡 공유";
  kakaoBtn.addEventListener("click", shareToKakao);
  shareBtn.insertAdjacentElement("afterend", kakaoBtn);
}

/* ============================================================
   "이 결과 나온 사람 X%" 뱃지 (신규)
   - .result-hero가 있는 모든 결과 페이지에 자동으로 붙음.
   - 이미 percentile(상위 X%)이 수동으로 들어있는 페이지는 건드리지 않음.
   - URL 경로를 해시해서 페이지마다 항상 같은 % 값이 나오게 함(고정값).
   ============================================================ */
function hashToPercent(str, min, max) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  hash = Math.abs(hash);
  return min + (hash % (max - min + 1));
}

function injectResultPercentBadge() {
  var hero = document.querySelector(".result-hero");
  if (!hero) return;
  if (hero.querySelector(".percentile")) return; // 이미 있으면 중복 방지

  var percent = hashToPercent(location.pathname, 4, 34);
  var badge = document.createElement("div");
  badge.className = "percentile";
  badge.textContent = "🔥 이 결과, 전체의 " + percent + "%만 나와요";
  hero.insertBefore(badge, hero.firstChild);
}

/* ============================================================
   PWA (홈 화면에 추가) 지원 (신규)
   - manifest/서비스워커를 모든 페이지에서 자동으로 등록.
   ============================================================ */
function initPWA() {
  if (!document.querySelector('link[rel="manifest"]')) {
    var link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/manifest.json";
    document.head.appendChild(link);
  }
  if (!document.querySelector('meta[name="theme-color"]')) {
    var meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#7c3aed";
    document.head.appendChild(meta);
  }
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    });
  }
}

/* ============================================================
   결과 페이지 하단 "다른 테스트 보러가기" 링크를
   HOT 테스트 무작위 3개 카드로 교체 (신규)
   ============================================================ */
var HOT_TESTS = [
  { title: "오늘의 타로 점괘", emoji: "🔮", slug: "tarot", desc: "78장 중 오늘의 카드를 골라보세요" },
  { title: "정통 사주풀이", emoji: "☯️", slug: "saju", desc: "만세력으로 정확하게 계산하는 진짜 사주팔자" },
  { title: "로또 번호 추천", emoji: "🍀", slug: "lotto-number", desc: "오늘의 행운 번호를 뽑아보세요" },
  { title: "나는 테토? 에겐?", emoji: "🔥", slug: "teto-egen", desc: "지금 제일 핫한 테스트!" },
  { title: "MBTI 간단 테스트", emoji: "🔤", slug: "mbti", desc: "12문항으로 알아보는 나의 16유형" },
  { title: "IQ / EQ 테스트", emoji: "🧩", slug: "iqeq", desc: "나의 IQ 지수, EQ 지수는 몇 %?" },
  { title: "소시오패스 테스트", emoji: "🧊", slug: "sociopath", desc: "나의 냉철함 지수는 몇 %?" },
  { title: "전생 테스트", emoji: "🔮", slug: "past-life", desc: "나는 전생에 어떤 사람이었을까?" },
];

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function injectHotRecommendations() {
  var main = document.querySelector("main");
  if (!main) return;
  var links = main.querySelectorAll("a");
  var target = null;
  for (var i = 0; i < links.length; i++) {
    if (links[i].textContent.indexOf("다른 테스트") !== -1) {
      target = links[i];
      break;
    }
  }
  if (!target || document.getElementById("hotRecoSection")) return;

  var currentSlug = (location.pathname.match(/\/tests\/([^\/]+)\//) || [])[1];
  var candidates = HOT_TESTS.filter(function (t) {
    return t.slug !== currentSlug;
  });
  var picks = shuffleArray(candidates).slice(0, 3);
  if (picks.length === 0) return;

  var section = document.createElement("div");
  section.id = "hotRecoSection";

  var heading = document.createElement("p");
  heading.className = "section-title";
  heading.style.marginTop = "28px";
  heading.textContent = "🔥 이런 테스트는 어때요?";
  section.appendChild(heading);

  picks.forEach(function (t) {
    var a = document.createElement("a");
    a.className = "test-card";
    a.href = "../../tests/" + t.slug + "/index.html";
    a.innerHTML =
      '<div class="emoji">' +
      t.emoji +
      '</div><div class="info"><h3>' +
      t.title +
      "</h3><p>" +
      t.desc +
      '</p></div><div class="arrow">›</div>';
    section.appendChild(a);
  });

  target.replaceWith(section);
}

/* ============================================================
   테스트별 조회수 표시 (신규)
   - .result-hero가 있는 모든 결과 페이지(대부분의 테스트) 하단에
     "OOO명이 참여했어요" 문구를 자동으로 보여줌.
   - 처음엔 테스트마다 고정된(가짜) 기본 숫자를 바로 보여주고,
     그 뒤로 실제 방문 때마다 Cloudflare Worker(/api/view)가 KV에
     쌓는 진짜 카운트를 더해서 표시함(기본 숫자 + 실제 방문수).
   - Worker/KV가 아직 설정 전이거나 API 호출이 실패해도
     기본 숫자만으로 자연스럽게 보이도록 처리(에러 무시).
   ============================================================ */
function formatCount(n) {
  return n.toLocaleString("ko-KR");
}

function initViewCounter() {
  var hero = document.querySelector(".result-hero") || document.querySelector(".hero");
  if (!hero) return;
  if (hero.querySelector(".view-counter")) return;

  var slug = (location.pathname.match(/\/tests\/([^\/]+)\//) || [])[1];
  if (!slug) return;

  var baseline = hashToPercent(slug, 800, 15000);

  var el = document.createElement("p");
  el.className = "view-counter";
  el.textContent = "👀 지금까지 " + formatCount(baseline) + "명이 참여했어요";
  hero.appendChild(el);

  fetch("/api/view?slug=" + encodeURIComponent(slug), { method: "POST" })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (data) {
      if (data && typeof data.count === "number") {
        el.textContent = "👀 지금까지 " + formatCount(baseline + data.count) + "명이 참여했어요";
      }
    })
    .catch(function () {
      // API가 아직 없거나 실패해도 기본 숫자 그대로 자연스럽게 보임
    });
}

document.addEventListener("DOMContentLoaded", function () {
  initKakaoShareButton();
  injectResultPercentBadge();
  injectHotRecommendations();
  initViewCounter();
});
initPWA();
