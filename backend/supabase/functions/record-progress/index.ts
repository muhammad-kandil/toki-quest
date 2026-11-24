// Supabase Edge Function: POST /functions/v1/record-progress
// Body: { initData, bestScores: {[levelId]: score}, badges: string[], lang? }
// Verifies Telegram's HMAC on initData with the bot token, then upserts.
// Deploy with "Verify JWT" OFF — Telegram's signature is the auth here.
import postgres from "npm:postgres@3.4.5";

const ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "https://muhammad-kandil.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });

async function hmac(key: BufferSource, data: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, new TextEncoder().encode(data));
}
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");

async function validateInitData(initData: string, botToken: string) {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const dcs = [...params.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, v]) => `${k}=${v}`).join("\n");
  const secret = await hmac(new TextEncoder().encode("WebAppData"), botToken);
  const expected = hex(await hmac(secret, dcs));
  if (expected.length !== hash.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ hash.charCodeAt(i);
  if (diff !== 0) return null;
  const authDate = Number(params.get("auth_date") ?? 0);
  if (!authDate || Math.abs(Date.now() / 1000 - authDate) > 86400) return null;
  try {
    const user = JSON.parse(params.get("user") ?? "null");
    return user && typeof user.id === "number" ? user : null;
  } catch {
    return null;
  }
}

const validLevel = (id: number) =>
  Number.isInteger(id) && ((id >= 1 && id <= 6) || (id >= 21 && id <= 85 && [1, 2, 3, 4, 5].includes(id % 10)));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json(405, { error: "method" });
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!token) return json(500, { error: "bot token not configured" });

  let body: any;
  try { body = await req.json(); } catch { return json(400, { error: "bad json" }); }
  const user = await validateInitData(String(body?.initData ?? ""), token);
  if (!user) return json(401, { error: "invalid initData" });

  const scores = Object.entries(body.bestScores ?? {})
    .map(([k, v]) => [Number(k), Number(v)] as [number, number])
    .filter(([id, s]) => validLevel(id) && Number.isFinite(s) && s >= 0 && s <= 500);
  const badges = Array.isArray(body.badges) ? body.badges.filter((b: unknown) => typeof b === "string" && (b as string).length < 40).slice(0, 16) : [];
  const lang = body.lang === "ar" ? "ar" : body.lang === "en" ? "en" : null;

  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false, max: 1 });
  try {
    await sql.begin(async (tx) => {
      await tx`
        insert into public.toki_players (telegram_user_id, username, first_name, last_name, lang, badges, last_seen_at)
        values (${user.id}, ${user.username ?? null}, ${user.first_name ?? null}, ${user.last_name ?? null}, ${lang}, ${tx.json(badges)}, now())
        on conflict (telegram_user_id) do update set
          username = excluded.username, first_name = excluded.first_name, last_name = excluded.last_name,
          lang = coalesce(excluded.lang, public.toki_players.lang), badges = excluded.badges, last_seen_at = now()`;
      for (const [level_id, score] of scores) {
        await tx`
          insert into public.toki_progress (telegram_user_id, level_id, best_score)
          values (${user.id}, ${level_id}, ${Math.round(score)})
          on conflict (telegram_user_id, level_id) do update set
            best_score = greatest(public.toki_progress.best_score, excluded.best_score),
            updated_at = case when excluded.best_score > public.toki_progress.best_score then now() else public.toki_progress.updated_at end`;
      }
    });
  } catch (e) {
    console.error("record-progress db error", e);
    return json(500, { error: "db" });
  } finally {
    await sql.end({ timeout: 2 });
  }
  return json(200, { ok: true, levels: scores.length });
});
