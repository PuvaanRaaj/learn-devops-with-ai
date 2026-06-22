# 14 — [Optional] Trigger deploy and verify app is live

> **Category:** Hosting & Deploy · **Priority:** Low · **Optional**
>
> Check Render's deploy logs. Hit the public URL. Confirm the healthcheck endpoint returns 200.

> ⚠️ **OPTIONAL** — Only needed if deploying to Render.

## 🎯 What is this task?

After setting env vars, trigger a deploy and confirm your app is live and working on the public URL Render gave you.

## 📋 Step-by-step

**Step 1 — Trigger a manual deploy (if not already deploying)**

In your Render service dashboard, click **"Manual Deploy"** → **"Deploy latest commit"**.

**Step 2 — Watch the deploy logs**

Click on the deploy to expand its logs. You should see:
- `Building Docker image...`
- `Starting service...`
- `Server running on port 3000`

**Step 3 — Test your live URL**

Render gives you a URL like `https://my-docker-app-xxxx.onrender.com`. Open it in your browser:

- `https://your-app.onrender.com/` → should return `{ "message": "Hello from Docker!" }`
- `https://your-app.onrender.com/health` → should return `{ "status": "ok" }`

> 💡 Free-tier Render apps "spin down" after 15 minutes of inactivity. The first request after sleeping takes ~30 seconds to respond. This is normal on the free tier.

## ✅ Done when

- [ ] Deploy completes with no errors
- [ ] Public URL responds with correct JSON
- [ ] `/health` returns `{ "status": "ok" }`
