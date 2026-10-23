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

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS_ENDPOINT) {
    return json({ ok: false, error: "Analytics endpoint is not configured." }, 503);
  }

  let target;
  try {
    target = new URL(env.ANALYTICS_ENDPOINT);
  } catch {
    return json({ ok: false, error: "Analytics endpoint configuration is invalid." }, 503);
  }

  // Restrict the server-side destination to the intended Google Apps Script endpoint.
  if (
    target.protocol !== "https:" ||
    target.hostname !== "script.google.com" ||
    !target.pathname.startsWith("/macros/s/") ||
    !target.pathname.endsWith("/exec")
  ) {
    return json({ ok: false, error: "Analytics endpoint configuration is invalid." }, 503);
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

export async function onRequestGet() {
  return json({ ok: true, service: "aakruti-analytics-proxy" });
}
