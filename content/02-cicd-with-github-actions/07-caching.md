# 07 — Speed up builds with caching

> **Category:** Optimization · **Priority:** Medium · **Step:** 8
>
> Cache npm dependencies and Docker layers so repeat runs take seconds, not minutes.

## 🎯 What is this task?

CI re-downloads and rebuilds everything on a clean machine each time — which is slow. **Caching** stores expensive results between runs. You'll cache two things: npm packages (already easy via `setup-node`) and Docker build layers (via GitHub Actions cache).

## 🤖 AI Prompt

> "Add GitHub Actions caching to my Docker build so unchanged layers are reused between runs using `cache-from` and `cache-to` of type gha. Explain how layer caching saves time."

## 📋 Step-by-step

**npm cache** — you already have it from lesson 02:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"   # caches ~/.npm automatically
```

**Docker layer cache** — add to your `build-push-action` step:

```yaml
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

- `cache-from: type=gha` → pull cached layers from GitHub's cache.
- `cache-to: type=gha,mode=max` → save **all** layers (not just the final image) for next time.

The second run reuses unchanged layers and finishes far faster.

## ✅ Done when

- [ ] `cache: "npm"` is set on `setup-node`
- [ ] The Docker build uses `cache-from`/`cache-to: type=gha`
- [ ] A second run is noticeably faster than the first
