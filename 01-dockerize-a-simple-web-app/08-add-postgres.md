# 08 — Add Postgres to docker-compose.yml

> **Category:** Docker Compose · **Priority:** High · **Step:** 9
>
> Add a `postgres:16` service, a named volume for data persistence, and `depends_on` with `condition: service_healthy`.

## 🎯 What is this task?

Now you'll add a real database to your local setup. Docker Compose makes this easy — you just add a second service. Postgres will run in its own container, and your app container will connect to it. No need to install Postgres on your computer.

## 🤖 AI Prompt

> "Update my `docker-compose.yml` to add a Postgres 16 service. Name it `db`. Add a named volume so data persists between restarts. Add a healthcheck on the postgres service using `pg_isready`. Add `depends_on` with `condition: service_healthy` on the app service so it only starts once Postgres is ready. Use environment variables for the DB credentials. Add comments."

## 📋 Step-by-step

**Step 1 — Update your `.env` file**

Add the database credentials:

```bash
PORT=3000
NODE_ENV=development

DB_HOST=db
DB_PORT=5432
DB_NAME=myapp
DB_USER=myuser
DB_PASSWORD=mypassword
```

> ⚠️ `DB_HOST=db` — this is the service name in docker-compose, not `localhost`. Containers talk to each other by service name.

**Step 2 — Update `docker-compose.yml`**

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
    # Only start after the database is healthy
    depends_on:
      db:
        condition: service_healthy

  db:
    # Use the official Postgres 16 image
    image: postgres:16-alpine

    # Database credentials (must match what app expects)
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword

    # Persist data even if you run `docker compose down`
    volumes:
      - postgres_data:/var/lib/postgresql/data

    # Healthcheck so app waits for DB to be truly ready
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

# Named volume definition
volumes:
  postgres_data:
```

**Step 3 — Start everything**

```bash
docker compose up
```

Watch the logs — you'll see Postgres start first, then your app.

**Step 4 — Verify Postgres is running**

In a new terminal:

```bash
docker compose ps
```

Both `app` and `db` should show as `running (healthy)`. Connect to the DB directly to confirm:

```bash
docker compose exec db psql -U myuser -d myapp
```

You'll get a Postgres prompt. Type `\q` to exit.

## ✅ Done when

- [ ] `docker-compose.yml` has both `app` and `db` services
- [ ] Named volume `postgres_data` is defined
- [ ] `docker compose ps` shows both containers healthy
- [ ] You can connect to Postgres via `docker compose exec db psql`
