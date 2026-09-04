/* ============================================================
   알아볼괘 - 조회수 API용 Worker
   - /api/view?slug=xxx 로 POST 요청이 오면 해당 테스트의
     실제 조회수(KV에 저장)를 1 늘리고 현재까지 쌓인 수를 돌려줌.
   - 그 외 모든 요청(정적 파일들)은 [assets] 설정이 그대로 처리하므로
     이 스크립트는 /api/ 로 시작하는 요청만 신경쓰면 됨.
   ============================================================ */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, corsHeaders()),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/view") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ error: "method not allowed" }, 405);
    }

    if (!env.VIEW_COUNTS) {
      // KV가 아직 연결 안 된 상태 (조회수설정.bat 실행 전) - 조용히 실패 처리
      return json({ error: "not configured" }, 503);
    }

    const slug = (url.searchParams.get("slug") || "").toLowerCase();
    if (!/^[a-z0-9-]{1,60}$/.test(slug)) {
      return json({ error: "invalid slug" }, 400);
    }

    const key = "v:" + slug;
    let current = parseInt((await env.VIEW_COUNTS.get(key)) || "0", 10);
    if (Number.isNaN(current)) current = 0;
    current += 1;
    await env.VIEW_COUNTS.put(key, String(current));

    return json({ count: current });
  },
};
