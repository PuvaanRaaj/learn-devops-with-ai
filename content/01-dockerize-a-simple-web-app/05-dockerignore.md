# 05 — Create a .dockerignore file

> **Category:** Dockerfile · **Priority:** Medium · **Step:** 6
>
> Exclude: `node_modules/`, `.env`, `.git`, `__pycache__`, `*.log`. Keeps the build context lean.

## 🎯 What is this task?

When Docker builds your image, it copies everything in your project folder into the build context. This includes things you don't need inside the container — like `node_modules`, `.env` files, the `.git` folder, and log files. A `.dockerignore` file tells Docker to skip those. It works exactly like a `.gitignore` file.

Without this, Docker might copy hundreds of MB of files unnecessarily, and could even leak secret `.env` values into your image.

## 🤖 AI Prompt

> "Create a `.dockerignore` file for a Node.js project. Exclude: `node_modules`, `.env` files, `.git` folder, log files, editor config files like `.vscode`, test files, and any OS junk like `.DS_Store`. Add a comment above each group explaining why it's excluded."

## 📋 Step-by-step

**Step 1 — Create `.dockerignore` in your project root**

This file goes in the same folder as your `Dockerfile`. Create a file named exactly `.dockerignore`:

```gitignore
# Dependencies — Docker will install these fresh via npm install
node_modules
npm-debug.log

# Environment secrets — NEVER bake these into an image
.env
.env.*
*.env

# Git history — not needed inside container
.git
.gitignore

# Editor files
.vscode
.idea
*.swp

# OS junk
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Test files
__tests__/
*.test.js
*.spec.js
```

**Step 2 — Verify it works by checking build output**

```bash
docker build -t my-docker-app:v4 .
```

Look at the first line of output — it shows `[+] Building X.Xs (Y steps)`. The "Sending build context" step should be small (a few KB, not MB).

**Step 3 — Confirm node_modules wasn't copied**

```bash
docker run --rm my-docker-app:v4 ls /app
```

You'll see `index.js`, `package.json`, and `node_modules` — but the `node_modules` inside was installed by `npm install` in the Dockerfile, not copied from your machine.

## ✅ Done when

- [ ] `.dockerignore` file exists in your project root
- [ ] Build context size in docker output is small
- [ ] `.env` files and `node_modules` from your machine are not baked into the image
