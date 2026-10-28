/* ============================================================
   알아볼괘 - 집계 API Worker
   KV(VIEW_COUNTS) 하나에 실제로 센 숫자만 저장합니다.

   POST /api/view?slug=xxx           테스트 참여 수 +1 (예전부터 있던 것)
   GET  /api/counts                  모든 테스트 참여 수 (홈 화면용, 10분 캐시)
   POST /api/result?slug=xxx&r=yyy   이 결과가 나온 수 +1, 전체 수 +1
   GET  /api/result?slug=xxx&r=yyy   위 숫자 보기만
   POST /api/react?slug=xxx&k=fun    재밌어요(fun) / 정확해요(acc) +1
   GET  /api/react?slug=xxx          위 숫자 보기만

   그 외 모든 요청(정적 파일)은 wrangler.toml 의 [assets] 가 처리합니다.
   ============================================================ */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status, extra) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, corsHeaders(), extra || {}),
  });
}

const SLUG_RE = /^[a-z0-9-]{1,60}$/;
const KEY_RE = /^[A-Za-z0-9-]{1,40}$/;

async function readInt(kv, key) {
  const n = parseInt((await kv.get(key)) || "0", 10);
  return Number.isNaN(n) ? 0 : n;
}

async function bump(kv, key) {
  const n = (await readInt(kv, key)) + 1;
  await kv.put(key, String(n));
  return n;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!path.startsWith("/api/")) {
      return new Response("Not found", { status: 404 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (!env.VIEW_COUNTS) {
      // KV가 아직 연결 안 된 상태 (조회수설정.bat 실행 전) - 조용히 실패 처리
      return json({ error: "not configured" }, 503);
    }
    const kv = env.VIEW_COUNTS;
    const isPost = request.method === "POST";
    const slug = (url.searchParams.get("slug") || "").toLowerCase();

    /* ---------- 참여 수 +1 ---------- */
    if (path === "/api/view") {
      if (!isPost) return json({ error: "method not allowed" }, 405);
      if (!SLUG_RE.test(slug)) return json({ error: "invalid slug" }, 400);
      return json({ count: await bump(kv, "v:" + slug) });
    }

    /* ---------- 전체 참여 수 (홈) ---------- */
    if (path === "/api/counts") {
      const cache = caches.default;
      const cacheKey = new Request(url.origin + "/api/counts", { method: "GET" });
      const hit = await cache.match(cacheKey);
      if (hit) return hit;

      const counts = {};
      let cursor;
      do {
        const page = await kv.list({ prefix: "v:", cursor: cursor });
        await Promise.all(page.keys.map(async (k) => {
          counts[k.name.slice(2)] = await readInt(kv, k.name);
        }));
        cursor = page.list_complete ? null : page.cursor;
      } while (cursor);

      const res = json({ counts: counts }, 200, { "Cache-Control": "public, max-age=600" });
      ctx.waitUntil(cache.put(cacheKey, res.clone()));
      return res;
    }

    /* ---------- 같은 결과 비율 ---------- */
    if (path === "/api/result") {
      const r = url.searchParams.get("r") || "";
      if (!SLUG_RE.test(slug) || !KEY_RE.test(r)) return json({ error: "invalid" }, 400);
      const ck = "rc:" + slug + ":" + r;
      const tk = "rt:" + slug;
      if (isPost) {
        const count = await bump(kv, ck);
        const total = await bump(kv, tk);
        return json({ count: count, total: total });
      }
      return json({ count: await readInt(kv, ck), total: await readInt(kv, tk) });
    }

    /* ---------- 재밌어요 / 정확해요 ---------- */
    if (path === "/api/react") {
      if (!SLUG_RE.test(slug)) return json({ error: "invalid slug" }, 400);
      if (isPost) {
        const k = url.searchParams.get("k");
        if (k !== "fun" && k !== "acc") return json({ error: "invalid kind" }, 400);
        await bump(kv, "re:" + slug + ":" + k);
      }
      return json({
        fun: await readInt(kv, "re:" + slug + ":fun"),
        acc: await readInt(kv, "re:" + slug + ":acc"),
      });
    }

    return json({ error: "not found" }, 404);
  },
};
