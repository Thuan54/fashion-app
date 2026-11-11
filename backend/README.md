# Fashion app API

## Setup

1. Copy `.env.example` to `.env` only if you do not already have a configured `.env`.
2. Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, and `SUPABASE_JWKS_URL`.
   The secret key is server-only; never add it to frontend environment variables or commit it.
3. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
4. Install and start the API:

   ```sh
   npm install
   npm run dev
   ```

The API listens on `http://localhost:3001` by default. Run the Vite frontend separately
with `cd ../frontend && npm run dev`; its `/api` requests are proxied to this server.

Set `SUPABASE_JWKS_URL` to the project's Auth JWKS endpoint, normally
`https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json`. Configure Supabase
Auth email confirmation as desired; when enabled, users must confirm before signing in.
To sign users in immediately after email/password registration, disable **Confirm email**
in Supabase Dashboard → Authentication → Sign In / Providers (Email). With confirmation
enabled, Supabase intentionally returns no authenticated session until the user verifies
their email; the app displays a confirmation notice instead.

This API uses the Supabase secret key only on the server for database access and verifies
user access tokens against the project's JWKS before allowing account or write operations.
The SQL schema enables RLS; frontend clients should not access these tables directly.

## Deploy to Vercel

The recommended setup deploys this repository as **one Vercel project**:

1. Import the repository in Vercel and set **Root Directory** to `.` (the repository
   root). Do not set it to `frontend` or `backend`.
2. Leave the commands and output directory at their `vercel.json` values. The root
   config installs both apps, compiles the API, builds `frontend`, publishes
   `frontend/dist`, and deploys the API function from `api/[...path].ts`.
3. Add these environment variables in the Vercel project's Settings → Environment
   Variables for Production and Preview:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (server-only; do not use a `VITE_` prefix)
   - `SUPABASE_JWKS_URL`
   - `VITE_SUPABASE_URL` (frontend build-time public setting)
   - `VITE_SUPABASE_PUBLISHABLE_KEY` (frontend build-time public key)
   - `FRONTEND_ORIGIN` — the deployed Vercel origin, such as
     `https://fashion.vercel.app`
4. Run [`supabase/schema.sql`](./supabase/schema.sql) in Supabase SQL Editor, then
   redeploy. After changing environment variables, trigger a new deployment.

The single-project frontend calls its own `/api/...` endpoints, so
`VITE_API_BASE_URL` should be unset. The separate `frontend/vercel.json` and
`backend/vercel.json` configs remain available if you intentionally deploy as two
Vercel projects; in that case, set the frontend Root Directory to `frontend`, backend
Root Directory to `backend`, and set the frontend's `VITE_API_BASE_URL` to the backend
deployment origin.

### Enable Google sign-in

1. In Supabase Dashboard → Authentication → Sign In / Providers, enable Google.
2. Create a Google OAuth client in Google Cloud. Add the Supabase callback URL shown by
   Supabase to the Google client's **Authorized redirect URIs** (usually
   `https://<project-ref>.supabase.co/auth/v1/callback`), then enter the Google client ID
   and client secret in Supabase's Google provider settings. Do not put the Google secret
   in this repository or Vercel.
3. In Supabase Authentication → URL Configuration, set the Site URL to the deployed
   frontend origin and add allowed redirect URLs for the deployed Vercel domain and
   local development (`http://localhost:5173/**`).
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel, then redeploy.
   The publishable key is intended for browser use; the Supabase secret key is not.
