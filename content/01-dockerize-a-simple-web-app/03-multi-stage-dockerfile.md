# 03 — Refactor to multi-stage Dockerfile

> **Category:** Dockerfile · **Priority:** High · **Step:** 4
>
> Build stage installs deps; runtime stage copies only what's needed. This reduces final image size significantly.

## 🎯 What is this task?

Your first Dockerfile works, but it creates a large image because it keeps everything including dev tools inside. A **multi-stage build** splits the process into two phases: a "build" stage (installs deps, compiles if needed) and a "runtime" stage (only copies the final files). The result is a much smaller, cleaner image.

Think of it like packing for a trip: you lay out everything first (build stage), then only put what you actually need in the suitcase (runtime stage).

## 🤖 AI Prompt

> "Rewrite my Node.js Dockerfile using a multi-stage build. Stage 1 should be called 'builder' and install all dependencies. Stage 2 should be the final runtime image using `node:20-alpine` (smaller base), copying only `node_modules` and `index.js` from the builder stage. Add comments explaining why each stage exists."

## 📋 Step-by-step

**Step 1 — Understand what changes**

The old Dockerfile had one `FROM`. The new one has two. Docker only keeps the last stage in the final image — the builder stage is thrown away after it's used.

**Step 2 — Replace your Dockerfile content**

```dockerfile
# ---- Stage 1: Builder ----
# This stage installs all dependencies
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# ---- Stage 2: Runtime ----
# This is the final image — smaller and cleaner
FROM node:20-alpine

WORKDIR /app

# Copy only what we need from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "index.js"]
```

**Step 3 — Rebuild and compare image sizes**

```bash
docker build -t my-docker-app:v2 .
docker images
```

Look at the SIZE column. Your new image should be noticeably smaller than `my-docker-app` (the old one).

**Step 4 — Test it still works**

```bash
docker run -p 3000:3000 my-docker-app:v2
```

Open `http://localhost:3000` — should still work perfectly.

## ✅ Done when

- [ ] Dockerfile uses two `FROM` statements
- [ ] Final stage uses `node:20-alpine`
- [ ] `docker images` shows the new image is smaller than the old one
- [ ] App still responds correctly at `http://localhost:3000`
