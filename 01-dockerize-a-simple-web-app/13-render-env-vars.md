# 13 — [Optional] Configure env vars on Render

> **Category:** Hosting & Deploy · **Priority:** Low · **Optional**
>
> Never commit `.env` to git. Add all required env vars directly in Render's Environment section.

> ⚠️ **OPTIONAL** — Only needed if deploying to Render.

## 🎯 What is this task?

Your app reads config from environment variables (like `PORT` and `NODE_ENV`). On your computer these come from `.env`. On Render, you set them directly in their dashboard — never by uploading your `.env` file.

## 📋 Step-by-step

**Step 1 — Go to your Render service dashboard**

Click on your Web Service → click the **"Environment"** tab in the left sidebar.

**Step 2 — Add each variable**

Click "Add Environment Variable" for each one:

| Key | Value |
|---|---|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

If you added Postgres later, also add `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.

**Step 3 — Save and redeploy**

After adding all variables, click "Save Changes". Render will automatically trigger a new deployment.

## ✅ Done when

- [ ] All environment variables are set in the Render dashboard
- [ ] No `.env` file was ever committed to GitHub
- [ ] Render redeploys successfully after saving env vars
