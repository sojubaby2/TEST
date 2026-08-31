/* ============================================================
   마음캐치 - 공통 JS (공유, 토스트 등)
   ============================================================ */

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
