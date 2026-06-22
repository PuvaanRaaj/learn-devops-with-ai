# 06 — Push your image to GHCR from Actions

> **Category:** Docker in CI · **Priority:** High · **Step:** 7
>
> Turn CI into CD: on a push to `main`, build and publish the image to GitHub Container Registry.

## 🎯 What is this task?

Now you publish the image automatically. Using the built-in `GITHUB_TOKEN`, the workflow logs in to **GHCR** (`ghcr.io`) and pushes a tagged image — no manual `docker push` ever again. This is your first taste of **Continuous Delivery**.

> 🔗 **Builds on:** Project 1, lesson 11 (Push to GHCR) — same registry, now automated.

## 🤖 AI Prompt

> "Write a GitHub Actions job that, only on pushes to main, builds my Docker image and pushes it to ghcr.io/OWNER/REPO using the built-in GITHUB_TOKEN. Tag it with both `latest` and the commit SHA."

## 📋 Step-by-step

```yaml
  publish:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

- `if: github.ref == 'refs/heads/main'` → only publish from `main`, not from feature branches or PRs.
- `permissions: packages: write` → lets `GITHUB_TOKEN` push to GHCR.
- Tagging with `${{ github.sha }}` gives every build a unique, traceable tag.

## ✅ Done when

- [ ] A push to `main` publishes an image to `ghcr.io/<owner>/<repo>`
- [ ] The package appears under your repo's **Packages**
- [ ] Feature branches build but do **not** publish
