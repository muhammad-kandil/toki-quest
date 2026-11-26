// Supabase Edge Function: POST /functions/v1/record-progress
// Body: { initData, bestScores: {[levelId]: score}, badges: string[], lang?,
//         attempts?: {[levelId]: {[step]: n}}, outcomes?: {[levelId]: 'restored'|'partial'|'unchanged'} }
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
  const hasBadges = Array.isArray(body.badges);
  const badges = hasBadges ? body.badges.filter((b: unknown) => typeof b === "string" && (b as string).length < 40).slice(0, 16) : [];
  const lang = body.lang === "ar" ? "ar" : body.lang === "en" ? "en" : null;

  // Telemetry (optional, validated shape; unknown keys ignored).
  const OUTCOMES = new Set(["restored", "partial", "unchanged"]);
  const STEP = /^[a-z]{3,12}$/;
  const cleanAttempts = (raw: unknown): Record<string, number> | null => {
    if (!raw || typeof raw !== "object") return null;
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      const n = Number(v);
      if (STEP.test(k) && Number.isInteger(n) && n >= 1 && n <= 20) out[k] = n;
    }
    return Object.keys(out).length ? out : null;
  };
  const cleanOutcome = (o: unknown): string | null =>
    typeof o === "string" && OUTCOMES.has(o) ? o : null;
  const attemptsFor = (levelId: number) =>
    cleanAttempts(body.attempts?.[levelId] ?? body.attempts?.[String(levelId)]);
  const outcomeFor = (levelId: number) =>
    cleanOutcome(body.outcomes?.[levelId] ?? body.outcomes?.[String(levelId)]);

  // In-game feedback ("Was this classroom fair?"), optional. One row per
  // event; the client sends it alone, never with bestScores.
  const VERDICTS = new Set(["fair", "unsure", "disagree"]);
  const fb = body.feedback;
  const feedback = fb && typeof fb === "object" && validLevel(Number(fb.levelId)) && VERDICTS.has(fb.verdict)
    ? {
        level_id: Number(fb.levelId),
        verdict: fb.verdict as string,
        text: typeof fb.text === "string" && fb.text.trim().length > 0 ? fb.text.trim().slice(0, 240) : null,
        lang: fb.lang === "ar" ? "ar" : fb.lang === "en" ? "en" : null,
        outcome: cleanOutcome(fb.outcome),
        attempts: cleanAttempts(fb.attempts),
      }
    : null;

  // Player's own name + ranking visibility (sent from the name screen).
  const pr = body.profile;
  const profile = pr && typeof pr === "object" && typeof pr.displayName === "string"
    ? {
        displayName: pr.displayName.replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 40) || null,
        showOnBoard: pr.showOnBoard !== false,
      }
    : null;
  const wantBoard = body.action === "board";

  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false, max: 1 });
  let board: unknown = undefined;
  try {
    await sql.begin(async (tx) => {
      await tx`
        insert into public.toki_players (telegram_user_id, username, first_name, last_name, lang, badges, last_seen_at)
        values (${user.id}, ${user.username ?? null}, ${user.first_name ?? null}, ${user.last_name ?? null}, ${lang}, ${tx.json(badges)}, now())
        on conflict (telegram_user_id) do update set
          username = excluded.username, first_name = excluded.first_name, last_name = excluded.last_name,
          lang = coalesce(excluded.lang, public.toki_players.lang),
          badges = case when ${hasBadges} then excluded.badges else public.toki_players.badges end,
          last_seen_at = now()`;
      if (profile) {
        await tx`update public.toki_players set display_name = ${profile.displayName}, show_on_board = ${profile.showOnBoard}
                 where telegram_user_id = ${user.id}`;
      }
      for (const [level_id, score] of scores) {
        const att = attemptsFor(level_id);
        const outcome = outcomeFor(level_id);
        // attempts/outcome follow the best run: replaced when the score
        // improves, filled in when missing, otherwise kept.
        await tx`
          insert into public.toki_progress (telegram_user_id, level_id, best_score, attempts, outcome)
          values (${user.id}, ${level_id}, ${Math.round(score)}, ${att ? tx.json(att) : null}, ${outcome})
          on conflict (telegram_user_id, level_id) do update set
            attempts = case when excluded.best_score > public.toki_progress.best_score or public.toki_progress.attempts is null
                            then coalesce(excluded.attempts, public.toki_progress.attempts) else public.toki_progress.attempts end,
            outcome  = case when excluded.best_score > public.toki_progress.best_score or public.toki_progress.outcome is null
                            then coalesce(excluded.outcome, public.toki_progress.outcome) else public.toki_progress.outcome end,
            best_score = greatest(public.toki_progress.best_score, excluded.best_score),
            updated_at = case when excluded.best_score > public.toki_progress.best_score then now() else public.toki_progress.updated_at end`;
      }
      if (feedback) {
        // After the player upsert so the FK holds on a first-ever request.
        await tx`
          insert into public.toki_feedback (telegram_user_id, level_id, verdict, text, lang, outcome, attempts)
          values (${user.id}, ${feedback.level_id}, ${feedback.verdict}, ${feedback.text}, ${feedback.lang},
                  ${feedback.outcome}, ${feedback.attempts ? tx.json(feedback.attempts) : null})`;
      }
    });
    if (wantBoard) {
      // Top 20 among players who chose to appear, plus the caller's own
      // row (always, even if hidden — they see their rank, others don't).
      const rows = await sql`
        select telegram_user_id, name, total, rooms, show_on_board,
               rank() over (order by total desc) as rank
        from public.v_toki_board where show_on_board or telegram_user_id = ${user.id}`;
      const visible = rows.filter((r: any) => r.show_on_board);
      const ranked = visible.map((r: any, i: number, arr: any[]) => ({
        rank: 1 + arr.findIndex((x: any) => x.total === r.total), name: r.name, total: r.total, rooms: r.rooms,
        me: String(r.telegram_user_id) === String(user.id),
      }));
      const mine = rows.find((r: any) => String(r.telegram_user_id) === String(user.id));
      const myRank = mine ? 1 + rows.filter((r: any) => r.total > mine.total).length : null;
      board = {
        top: ranked.slice(0, 20),
        me: mine ? { rank: myRank, total: mine.total, rooms: mine.rooms, hidden: !mine.show_on_board, name: mine.name } : null,
        players: rows.length,
      };
    }
  } catch (e) {
    console.error("record-progress db error", e);
    return json(500, { error: "db" });
  } finally {
    await sql.end({ timeout: 2 });
  }
  return json(200, { ok: true, levels: scores.length, feedback: !!feedback, profile: !!profile, ...(board ? { board } : {}) });
});
