# 15 — [Optional] Add managed Postgres on Render

> **Category:** Hosting & Deploy · **Priority:** Low · **Optional**
>
> Render offers a free Postgres instance. Connect it to the app using the internal DB URL they provide.

> ⚠️ **OPTIONAL** — Only needed if deploying to Render with a database.

## 🎯 What is this task?

Render offers a free managed Postgres instance. Instead of running your own Postgres container in the cloud, you use Render's hosted database and connect your app to it via an internal connection URL.

## 📋 Step-by-step

**Step 1 — Create a Postgres database on Render**

1. Click "New +" → "PostgreSQL"
2. Name: `my-docker-app-db`
3. Instance Type: **Free**
4. Click "Create Database"

**Step 2 — Get the internal connection URL**

On the database page, find the **"Internal Database URL"** — it looks like:

```text
postgresql://myuser:password@dpg-xxxxx-a/myapp
```

Copy this URL.

**Step 3 — Update your app's environment variables on Render**

Go to your Web Service → Environment tab → Add:

| Key | Value |
|---|---|
| `DATABASE_URL` | paste the Internal Database URL here |

Then update your `index.js` to use `DATABASE_URL` if you prefer the single-URL connection style, or break it into individual vars. Ask AI:

> "Update my Node.js `pg` Pool connection to support both a single `DATABASE_URL` environment variable and individual `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD` variables as a fallback."

**Step 4 — Redeploy and test**

After saving env vars, redeploy and hit `https://your-app.onrender.com/db-test` to confirm the database connection works.

## ✅ Done when

- [ ] Render Postgres instance created
- [ ] `DATABASE_URL` set in Web Service environment variables
- [ ] `/db-test` endpoint returns `{ "status": "connected" }` on the live URL
