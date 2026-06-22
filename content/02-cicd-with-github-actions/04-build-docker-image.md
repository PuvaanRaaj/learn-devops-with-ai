# 04 — Build your Docker image in CI

> **Category:** Docker in CI · **Priority:** High · **Step:** 5
>
> Reuse the Dockerfile from Project 1 — build it on every push to catch broken images early.

## 🎯 What is this task?

In Project 1 you wrote a `Dockerfile`. Here you make CI **build** that image automatically, so a change that breaks the build is caught before anyone deploys it. You'll use Docker's official `buildx` action.

> 🔗 **Prerequisite:** This builds on the `Dockerfile` you created in **Project 1 — Dockerize a Simple Web App**.

## 🤖 AI Prompt

> "Write a GitHub Actions job that builds my Docker image from the Dockerfile in the repo root using docker/build-push-action, without pushing it. Tag it `myapp:ci`."

## 📋 Step-by-step

Add a new job to `.github/workflows/ci.yml`:

```yaml
  docker-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build image (no push)
        uses: docker/build-push-action@v6
        with:
          context: .
          push: false
          tags: myapp:ci
```

`push: false` means "build only" — we verify the image compiles without uploading it anywhere yet. (Pushing comes in the next lesson.)

## ✅ Done when

- [ ] A `docker-build` job appears in the Actions tab
- [ ] The image builds successfully from your Dockerfile
- [ ] Breaking the Dockerfile turns the job red
