# 06 — Add a HEALTHCHECK to the Dockerfile

> **Category:** Dockerfile · **Priority:** Medium · **Step:** 7
>
> Use `curl -f http://localhost:3000/health || exit 1`. Teaches good habits before ECS, which depends on healthchecks.

## 🎯 What is this task?

A `HEALTHCHECK` tells Docker how to check if your app is actually working inside the container. Without it, Docker just checks if the process is running — but your app could be running yet returning errors on every request. A healthcheck fixes this by pinging the `/health` route you created.

This is especially important later when using ECS or any orchestrator — they use healthchecks to decide if a container should receive traffic.

## 🤖 AI Prompt

> "Add a `HEALTHCHECK` instruction to my Node.js Dockerfile. It should curl the `/health` endpoint on port 3000 every 30 seconds, timeout after 5 seconds, and mark the container unhealthy after 3 failures. The base image is `node:20-alpine`. Note that alpine doesn't have curl by default — install it first using `RUN`."

## 📋 Step-by-step

**Step 1 — Install curl in the runtime stage**

`node:20-alpine` is a very minimal image — it doesn't come with `curl`. Add this line before your `USER` instruction:

```dockerfile
RUN apk add --no-cache curl
```

**Step 2 — Add the HEALTHCHECK instruction**

Add this just before the `CMD` line:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

What each flag means:
- `--interval=30s` → check every 30 seconds
- `--timeout=5s` → if the check takes more than 5s, it fails
- `--start-period=10s` → wait 10s after startup before checking (gives app time to boot)
- `--retries=3` → mark unhealthy only after 3 consecutive failures

Your full runtime stage should now look like:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/package.json ./package.json

RUN apk add --no-cache curl

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
```

**Step 3 — Rebuild and test healthcheck**

```bash
docker build -t my-docker-app:v5 .
docker run -d -p 3000:3000 --name test-app my-docker-app:v5
```

Wait about 15 seconds, then:

```bash
docker inspect --format='{{.State.Health.Status}}' test-app
```

You should see `healthy`. Clean up:

```bash
docker stop test-app && docker rm test-app
```

## ✅ Done when

- [ ] `HEALTHCHECK` is in the Dockerfile
- [ ] `curl` is installed via `apk add` in the runtime stage
- [ ] `docker inspect` shows `healthy` after the container starts
