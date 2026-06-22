# 11 — [Optional] Push to GitHub Container Registry (GHCR)

> **Category:** Registry · **Priority:** Low · **Optional**
>
> Use `ghcr.io/username/myapp:latest`. Authenticate with `echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin`.

## 🎯 What is this task?

GitHub Container Registry (GHCR) is an alternative to Docker Hub — it stores your Docker images directly inside your GitHub account. It's useful because your image and your code live in the same place. This task is optional but good to know.

## 🤖 AI Prompt

> "Show me step by step how to create a GitHub Personal Access Token with the right permissions for GHCR, authenticate Docker with GHCR, tag my local Docker image for GHCR, and push it. My GitHub username is `yourusername` and image name is `my-docker-app`."

## 📋 Step-by-step

**Step 1 — Create a GitHub Personal Access Token (PAT)**

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like `docker-ghcr`
4. Select these scopes: `write:packages`, `read:packages`, `delete:packages`
5. Click "Generate token" and **copy it immediately** (you can't see it again)

**Step 2 — Log in to GHCR**

In your terminal (replace `yourusername` and paste your token):

```bash
echo "YOUR_TOKEN_HERE" | docker login ghcr.io -u yourusername --password-stdin
```

You should see `Login Succeeded`.

**Step 3 — Tag your image for GHCR**

```bash
docker tag my-docker-app:v5 ghcr.io/yourusername/my-docker-app:v1.0.0
docker tag my-docker-app:v5 ghcr.io/yourusername/my-docker-app:latest
```

**Step 4 — Push to GHCR**

```bash
docker push ghcr.io/yourusername/my-docker-app:v1.0.0
docker push ghcr.io/yourusername/my-docker-app:latest
```

**Step 5 — Verify**

Go to `https://github.com/yourusername?tab=packages` — your image should appear under "Packages".

## ✅ Done when

- [ ] GitHub PAT created with package permissions
- [ ] `docker login ghcr.io` succeeds
- [ ] Image pushed and visible at `github.com/yourusername?tab=packages`
