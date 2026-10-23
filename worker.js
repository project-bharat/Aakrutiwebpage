const MAX_BODY_BYTES = 20_000;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only the API path reaches this handler; all website pages and assets
    // remain the original static files served by Cloudflare.
    if (url.pathname !== "/api/analytics") {
      return json({ ok: false, error: "Not found." }, 404);
    }

    if (request.method === "GET") {
      return json({ ok: true, service: "aakruti-analytics-proxy" });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed." }, 405);
    }

    if (!env.ANALYTICS_ENDPOINT) {
      return json({ ok: false, error: "Submission service is not configured." }, 503);
    }

    let target;
    try {
      target = new URL(env.ANALYTICS_ENDPOINT);
    } catch {
      return json({ ok: false, error: "Submission service configuration is invalid." }, 503);
    }

    // Prevent the secret from being used as an arbitrary server-side proxy.
    if (
      target.protocol !== "https:" ||
      target.hostname !== "script.google.com" ||
      !target.pathname.startsWith("/macros/s/") ||
      !target.pathname.endsWith("/exec")
    ) {
      return json({ ok: false, error: "Submission service configuration is invalid." }, 503);
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: "Request is too large." }, 413);
    }

    const body = await request.text();
    if (!body || new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: "Invalid request body." }, 400);
    }

    try {
      const upstream = await fetch(target.toString(), {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        redirect: "follow"
      });

      if (!upstream.ok) {
        return json({ ok: false, error: "The submission service returned an error." }, 502);
      }

      return json({ ok: true });
    } catch {
      return json({ ok: false, error: "The submission service is temporarily unavailable." }, 502);
    }
  }
};
