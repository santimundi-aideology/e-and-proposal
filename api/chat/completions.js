import { AIDEOLOGY_EMPLOYEE_INSTRUCTIONS, PROPOSAL_CONTEXT } from "../../src/proposalContext.js";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  return auth.toLowerCase().startsWith("bearer ") ? auth.slice(7) : "";
}

function getHost(value) {
  if (!value) return "";

  try {
    return new URL(value).host;
  } catch {
    return "";
  }
}

function isAuthorized(req) {
  const expected = process.env.CUSTOM_LLM_API_KEY;
  if (!expected) return true;

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const originHost = getHost(req.headers.origin);
  const refererHost = getHost(req.headers.referer);
  const isSameOriginBrowserRequest = host && (originHost === host || refererHost === host);

  return isSameOriginBrowserRequest || getBearerToken(req) === expected || req.headers["x-api-key"] === expected;
}

function normalizeMessages(messages = []) {
  const incoming = Array.isArray(messages) ? messages : [];

  return [
    { role: "system", content: `${AIDEOLOGY_EMPLOYEE_INSTRUCTIONS}\n\n${PROPOSAL_CONTEXT}` },
    ...incoming.filter((message) => message && message.role !== "system"),
  ];
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: { message: "Method not allowed" } });
    return;
  }

  if (!isAuthorized(req)) {
    sendJson(res, 401, { error: { message: "Unauthorized" } });
    return;
  }

  const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  if (!openaiKey) {
    sendJson(res, 500, { error: { message: "Missing OPENAI_API_KEY server environment variable" } });
    return;
  }

  const body = req.body || {};
  const payload = {
    ...body,
    model: body.model || process.env.OPENAI_MODEL || process.env.VITE_OPENAI_MODEL || "gpt-4o",
    messages: normalizeMessages(body.messages),
    temperature: body.temperature ?? 0.7,
    max_tokens: body.max_tokens ?? 1500,
  };

  try {
    const upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify(payload),
    });

    res.statusCode = upstream.status;

    if (payload.stream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");

      if (!upstream.body) {
        res.end();
        return;
      }

      for await (const chunk of upstream.body) {
        res.write(Buffer.from(chunk));
      }
      res.end();
      return;
    }

    const data = await upstream.json().catch(() => ({}));
    sendJson(res, upstream.status, data);
  } catch (error) {
    sendJson(res, 500, { error: { message: error.message || "Chat completion failed" } });
  }
}
