# 04 — Add a non-root USER in the Dockerfile

> **Category:** Dockerfile · **Priority:** High · **Step:** 5
>
> Create a user like `appuser` and switch to it before `CMD`. Never run containers as root in production.

## 🎯 What is this task?

By default, everything inside a Docker container runs as the `root` user — which is like running your whole app as a system administrator. This is a security risk. If someone hacks your app, they'd have full control inside the container. The fix is simple: create a regular user inside the Dockerfile and switch to it before starting the app.

## 🤖 AI Prompt

> "Update my multi-stage Node.js Dockerfile to add a non-root user called `appuser`. Create the user in the final runtime stage, and switch to it using the `USER` instruction before the `CMD` line. Show me the full updated Dockerfile."

## 📋 Step-by-step

**Step 1 — Update the runtime stage of your Dockerfile**

Find the `# ---- Stage 2: Runtime ----` section and add the user creation lines:

```dockerfile
# ---- Stage 2: Runtime ----
FROM node:20-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/package.json ./package.json

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the /app folder to that user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
```

**Step 2 — Rebuild**

```bash
docker build -t my-docker-app:v3 .
```

**Step 3 — Verify the container runs as a non-root user**

```bash
docker run -p 3000:3000 --rm my-docker-app:v3
```

In a second terminal, while the container is running:

```bash
docker ps
docker exec <container_id> whoami
```

You should see `appuser` printed — not `root`.

**Step 4 — Test the app still works**

Open `http://localhost:3000` — should still respond correctly.

## ✅ Done when

- [ ] Dockerfile has `RUN adduser` and `USER appuser` lines
- [ ] `docker exec <container_id> whoami` returns `appuser`
- [ ] App still works at `http://localhost:3000`
