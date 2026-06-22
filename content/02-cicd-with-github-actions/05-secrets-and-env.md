# 05 — Secrets & environment variables in Actions

> **Category:** Security · **Priority:** High · **Step:** 6
>
> Never hardcode tokens. Store them as encrypted repository secrets and read them with `${{ secrets.NAME }}`.

## 🎯 What is this task?

To push images or deploy, your workflow needs credentials — but credentials must **never** live in the YAML file (it's public in your repo). GitHub gives you **encrypted secrets**: you store them once in the repo settings, and workflows read them at runtime without ever exposing the value in logs.

## 🤖 AI Prompt

> "Explain the difference between a GitHub Actions repository secret, an environment variable, and the built-in `GITHUB_TOKEN`. When should I use each?"

## 📋 Step-by-step

**Step 1 — Add a secret**

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Name it e.g. `DOCKERHUB_TOKEN`.

**Step 2 — Use it in a workflow**

```yaml
    steps:
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

**Three things that hold values:**

| Source | Use for | Example |
|---|---|---|
| `secrets.X` | Passwords, tokens (encrypted) | `${{ secrets.DOCKERHUB_TOKEN }}` |
| `env:` / `vars.X` | Non-secret config | `${{ vars.IMAGE_NAME }}` |
| `GITHUB_TOKEN` | Auto-generated, scoped to the repo | push to GHCR, comment on PRs |

GitHub automatically **masks** secret values in logs — but never `echo` a secret on purpose.

## ✅ Done when

- [ ] You added at least one repository secret
- [ ] A workflow reads it via `${{ secrets.NAME }}`
- [ ] You can explain why secrets aren't written in the YAML
