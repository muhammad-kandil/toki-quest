# Toki's Coaching Quest — progress store (admin-only)

> **Live setup (Nov 2026): Supabase.** Project `toki-quest` in the
> "Alef Amplitude" org (Free plan, Europe). Tables + views from
> `supabase/schema.sql`; Edge Function `record-progress` from
> `supabase/functions/record-progress/index.ts` (Verify JWT: off); repo
> variable `PROGRESS_URL` = `https://pebnwvwagmokhsfymhzh.supabase.co/functions/v1/record-progress`.
> One secret must be set in the dashboard (Edge Functions → Secrets):
> `TELEGRAM_BOT_TOKEN`. Admin view: SQL Editor → `select * from v_toki_admin`.
>
> The Azure Function + CX db variant below is built and tested but parked:
> the Alef account has no Azure subscription to host the Function. The CX db
> schema (`data_schema.toki_*`) already exists; a nightly sync from Supabase
> into it is a 20-line Python job when wanted.

The game keeps each player's save in Telegram CloudStorage. This folder adds a
**copy for the DLIS team**: who has completed what, so tasks can be assigned to
the most active coaches. It is not a leaderboard and the game never reads it.

```
Telegram Mini App ──POST {initData, bestScores, badges}──▶ Azure Function ──▶ CX db · data_schema
                                                          (verifies Telegram's
                                                           HMAC signature)
```

A browser can't talk to MySQL and must never hold DB credentials, so the
Function is the only thing that knows the password. The Function accepts a row
only if `initData` is signed by Telegram with `@TokiQuestBot`'s token — a DLIS
cannot post progress as someone else, and a replayed payload can't lower a score.

## 1 · Database (once, in DataGrip)
Run `sql/001_toki_schema.sql` against the CX db. It creates
`data_schema.toki_players`, `data_schema.toki_progress`, and two views:
`v_toki_admin` (one row per DLIS: levels, worlds, badges, last seen) and
`v_toki_levels` (completion per classroom). Create the `toki_api` user from the
commented lines at the bottom with a strong password.

## 2 · Function (once)
Requires an Azure subscription with rights to create a Function App.
```
cd backend/azure-function
az login
az functionapp create --consumption-plan-location uaenorth --runtime node --runtime-version 20 \
  --functions-version 4 --name toki-quest-api --storage-account <storage> --resource-group <rg>
az functionapp config appsettings set --name toki-quest-api --resource-group <rg> --settings \
  TELEGRAM_BOT_TOKEN=<BotFather token> MYSQL_HOST=cx-arura-v8-prod-cluster.mysql.database.azure.com \
  MYSQL_USER=toki_api MYSQL_PASSWORD=<password> MYSQL_DATABASE=data_schema \
  ALLOWED_ORIGIN=https://muhammad-kandil.github.io
func azure functionapp publish toki-quest-api
```
On the MySQL flexible server, **Networking → "Allow public access from any
Azure service"** must be on (or add the Function's outbound IPs).

The endpoint is `https://toki-quest-api.azurewebsites.net/api/record-progress`.

## 3 · Game (once)
GitHub → toki-quest → Settings → Secrets and variables → Actions → **Variables**
→ `PROGRESS_URL` = the endpoint above. The next deploy picks it up. Without it
the game runs exactly as before and reports nothing.

## Local test
`npm install && npm test` in `backend/azure-function` runs the signature and
handler tests with a stubbed DB (no credentials needed).

## Admin view
`SELECT * FROM data_schema.v_toki_admin ORDER BY last_completion_at DESC;` — or
point Power BI at the view through the MySQL connector.
