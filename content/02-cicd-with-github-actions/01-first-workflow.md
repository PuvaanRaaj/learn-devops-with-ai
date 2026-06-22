# 01 — Create your first GitHub Actions workflow

> **Category:** Workflows · **Priority:** High · **Step:** 2
>
> A "hello world" workflow that runs on every push. The goal is to see the pipeline turn green.

## 🎯 What is this task?

Workflows live in a special folder: `.github/workflows/`. Any `.yml` file there is picked up by GitHub automatically. In this task you create the smallest possible workflow so you can see it run in the **Actions** tab of your repo.

## 🤖 AI Prompt

> "Write a minimal GitHub Actions workflow file that runs on every push to any branch, checks out the code, and prints 'Hello CI'. Explain each line."

## 📋 Step-by-step

**Step 1 — Create the folder and file**

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/ci.yml`:

```yaml
name: CI

# Run on every push and pull request
on: [push, pull_request]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Say hello
        run: echo "Hello CI 👋"
```

**Step 2 — Commit and push**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add first workflow"
git push
```

**Step 3 — Watch it run**

Open your repo on GitHub → **Actions** tab. You'll see the `CI` workflow running. Click it to watch the logs stream in. A green ✓ means it passed.

## ✅ Done when

- [ ] `.github/workflows/ci.yml` exists and is pushed
- [ ] The workflow appears in the **Actions** tab
- [ ] The run finishes green and prints `Hello CI`
