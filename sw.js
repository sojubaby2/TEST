/* 알아볼괘 서비스워커
   - 목적: PWA "홈 화면에 추가" 설치 조건 충족용
   - 오프라인 캐싱은 하지 않음(콘텐츠가 계속 늘어나는 사이트라, 캐싱하면
     새 배포가 반영 안 되는 문제가 생길 수 있어 의도적으로 비워둠) */

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function () {
  // 항상 네트워크로 그대로 통과 (캐싱 없음)
});
