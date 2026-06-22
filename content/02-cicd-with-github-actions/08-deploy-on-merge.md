# 08 — Deploy automatically when you merge to main

> **Category:** Continuous Deployment · **Priority:** High · **Step:** 9
>
> Close the loop: a successful merge to `main` triggers a deploy. This is full CD.

## 🎯 What is this task?

You've built, tested, and published. The final piece is **deployment**: when code lands on `main` and the image is published, automatically tell your host (e.g. Render from Project 1) to pull the new image and go live — with **zero manual steps**.

> 🔗 **Builds on:** Project 1 Render deploy + lesson 06 (publish to GHCR).

## 🤖 AI Prompt

> "Show me how to trigger a Render deploy from GitHub Actions using a deploy hook URL stored as a secret, only after my publish job succeeds. Use `needs:` to chain jobs."

## 📋 Step-by-step

Chain a deploy job after `publish` using `needs:`:

```yaml
  deploy:
    runs-on: ubuntu-latest
    needs: publish              # only run if publish succeeded
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Trigger Render deploy
        run: curl -fsSL "${{ secrets.RENDER_DEPLOY_HOOK }}"
```

- `needs: publish` → `deploy` waits for `publish` and runs only if it passed.
- `RENDER_DEPLOY_HOOK` is a secret URL from Render → Settings → **Deploy Hook**.
- Hitting that URL tells Render to pull the latest image and redeploy.

**The full pipeline now:** push → test → build → publish → **deploy**, all automatic. That's CI/CD.

## ✅ Done when

- [ ] A `deploy` job runs only after `publish` succeeds (`needs:`)
- [ ] Merging to `main` updates the live site with no manual steps
- [ ] You can describe the full push-to-production pipeline end to end
