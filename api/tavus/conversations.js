const TAVUS_CONVERSATIONS_URL = "https://tavusapi.com/v2/conversations";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const tavusKey = process.env.TAVUS_API_KEY;
  if (!tavusKey) {
    sendJson(res, 500, { error: "Missing TAVUS_API_KEY server environment variable" });
    return;
  }

  const {
    replica_id = process.env.TAVUS_REPLICA_ID,
    persona_id = process.env.TAVUS_PERSONA_ID,
    conversation_name = "AIdeology x e& strategy meeting",
    custom_greeting = "Hello, I am joining as an AIdeology strategy consultant. I can discuss the e& commercial framework, the three pillars, financials, risks, and implementation strategy.",
    conversational_context,
  } = req.body || {};

  if (!replica_id || !persona_id) {
    sendJson(res, 400, { error: "replica_id and persona_id are required" });
    return;
  }

  try {
    const response = await fetch(TAVUS_CONVERSATIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": tavusKey,
      },
      body: JSON.stringify({
        replica_id,
        persona_id,
        conversation_name,
        custom_greeting,
        conversational_context,
      }),
    });

    const data = await response.json().catch(() => ({}));
    sendJson(res, response.status, data);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Failed to create Tavus conversation" });
  }
}
