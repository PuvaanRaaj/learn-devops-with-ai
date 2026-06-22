# 12 — [Optional] Deploy to Render

> **Category:** Hosting & Deploy · **Priority:** Low · **Optional**
>
> Use the free-tier Web Service. Select "Deploy from Dockerfile" — Render auto-detects the Dockerfile.

> ⚠️ **OPTIONAL** — This task is only needed if you want to deploy your app to the internet. The core project works 100% locally without this.

## 🎯 What is this task?

Render is a hosting platform that can run your Docker container for free. You connect your GitHub repo, point it at your Dockerfile, and Render handles the rest — no servers to manage.

## 📋 Step-by-step

**Step 1 — Push your code to GitHub first**

If you haven't already:

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
```

Then create a new repo on [github.com](https://github.com) and follow their instructions to push.

> ⚠️ Make sure `.env` is in your `.gitignore` before pushing!

**Step 2 — Create a Render account**

Go to <https://render.com> and sign up (free). Connect your GitHub account when asked.

**Step 3 — Create a new Web Service**

1. Click "New +" → "Web Service"
2. Select your GitHub repo
3. Under "Environment", select **Docker**
4. Render will auto-detect your Dockerfile

**Step 4 — Configure the service**

- Name: `my-docker-app`
- Region: pick closest to you
- Branch: `main`
- Instance Type: **Free**

Click "Create Web Service".

**Step 5 — Watch the deploy**

Render will pull your code, build the Docker image, and start the container. This takes 2–5 minutes. Watch the deploy logs for any errors.

## ✅ Done when

- [ ] Code is pushed to GitHub (without `.env`)
- [ ] Render Web Service created and linked to repo
- [ ] Deploy completes without errors
- [ ] Render provides a public URL ending in `.onrender.com`
