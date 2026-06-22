# 07 — Write docker-compose.yml for local dev (app only)

> **Category:** Docker Compose · **Priority:** High · **Step:** 8
>
> Define the service, map ports, set env vars via a `.env` file. Use `build: .` to build from the local Dockerfile.

## 🎯 What is this task?

So far you've been running Docker with long `docker run` commands. Docker Compose lets you define everything in a single `docker-compose.yml` file and start it all with one command: `docker compose up`. This is how developers run apps locally in a real team.

## 🤖 AI Prompt

> "Create a `docker-compose.yml` file for a Node.js Express app. The service should be called `app`, build from the local Dockerfile, map port 3000, and read environment variables from a `.env` file. Use Docker Compose v3.8 format. Add comments explaining each section."

## 📋 Step-by-step

**Step 1 — Create a `.env` file in your project root**

This file holds your local environment variables. Never commit this to Git.

```bash
PORT=3000
NODE_ENV=development
```

**Step 2 — Create `docker-compose.yml`**

```yaml
version: "3.8"

services:
  app:
    # Build the image from the Dockerfile in the current folder
    build: .

    # Map port 3000 on your computer to port 3000 in the container
    ports:
      - "3000:3000"

    # Load environment variables from the .env file
    env_file:
      - .env

    # Restart the container automatically if it crashes
    restart: unless-stopped
```

**Step 3 — Start the app**

```bash
docker compose up
```

This builds the image (if not already built) and starts the container. You'll see logs directly in your terminal. To run it in the background:

```bash
docker compose up -d
```

**Step 4 — Check it works**

Open `http://localhost:3000` — should respond.

**Step 5 — Useful Compose commands**

```bash
docker compose up -d       # Start in background
docker compose logs -f     # Watch logs
docker compose down        # Stop and remove containers
docker compose ps          # See running containers
docker compose build       # Rebuild the image
```

## ✅ Done when

- [ ] `docker-compose.yml` exists in your project root
- [ ] `.env` file exists (and is in `.gitignore`!)
- [ ] `docker compose up` starts the app
- [ ] `http://localhost:3000` responds
