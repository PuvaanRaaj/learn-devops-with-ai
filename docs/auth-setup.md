# Accounts, sync & verifiable certificates (Supabase)

The site works **guest-only** out of the box (progress saved in the browser).
To enable accounts — synced progress across devices, social logins, and
verifiable certificates — connect a free Supabase project.

## 1. Create the Supabase project

1. Go to <https://supabase.com> → **New project** (the free tier is plenty).
2. When it's ready, open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Create the database tables

Open **SQL Editor → New query**, paste the contents of
[`supabase/schema.sql`](../supabase/schema.sql), and **Run**. This creates the
`user_progress` and `certificates` tables, row-level security, and the public
`verify_certificate()` function.

## 3. Configure auth providers

In **Authentication → Providers**:

- **Email** is on by default (used for magic-link sign-in).
- **Google** — enable it and paste an OAuth client ID/secret from the
  [Google Cloud console](https://console.cloud.google.com/apis/credentials).
- **GitHub** — enable it and paste a client ID/secret from
  **GitHub → Settings → Developer settings → OAuth Apps**.

In **Authentication → URL Configuration**, set:

- **Site URL**: your production URL (e.g. `https://learn-devops-with-ai.vercel.app`)
- **Redirect URLs**: add your production URL and `http://localhost:3000` for local dev.

> The app redirects OAuth/magic-link back to `window.location.origin`, so no
> redirect URLs are hard-coded.

## 4. Add the env vars

**Local:** copy `.env.local.example` to `.env.local` and fill in the two values.

**Vercel:** Project → **Settings → Environment Variables** → add both
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then redeploy.

## How it works

- **Progress sync** — on sign-in, your browser (guest) progress is merged with
  your cloud progress; thereafter every change upserts to `user_progress`.
- **Certificates** — when you complete all required lessons in a project, a row
  is written to `certificates` with a deterministic code (`DLP-XXXXXXXX`).
- **Verification** — anyone can confirm a certificate at `/verify?code=…`, which
  calls the `verify_certificate()` function (no table access required).

Nothing here is secret: the anon key is meant for the browser, and row-level
security ensures users can only read/write their own rows.
