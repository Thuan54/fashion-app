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

The root [`vercel.json`](../vercel.json) configures this repository as one Vercel project
with separate `backend` and `frontend` services. Import the repository using the root
directory. Requests under `/api/` are routed to the backend; all other paths are routed
to the frontend. The browser calls the same-domain `/api/...` URL, so no service binding
is needed. Bindings are for server-side service-to-service requests.

Add these environment variables in the Vercel project's Settings → Environment
Variables for Production and Preview:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server-only; do not use a `VITE_` prefix)
- `SUPABASE_JWKS_URL`
- `VITE_SUPABASE_URL` (frontend build-time public setting)
- `VITE_SUPABASE_PUBLISHABLE_KEY` (frontend build-time public key)
- `FRONTEND_ORIGIN` — the deployed Vercel origin, such as `https://fashion.vercel.app`

Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor before
using account and post features. The frontend uses relative `/api/...` requests and
local Vite development proxies those requests to `http://localhost:3001`.

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
