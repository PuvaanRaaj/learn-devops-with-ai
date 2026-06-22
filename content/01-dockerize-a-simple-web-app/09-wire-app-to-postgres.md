# 09 — Wire app to Postgres using environment variables

> **Category:** Docker Compose · **Priority:** High · **Step:** 10
>
> Use `DB_HOST=db` (the service name), `DB_PORT=5432`. Never hardcode credentials — read them from the `.env` file.

## 🎯 What is this task?

Now you'll update your app so it actually reads from the Postgres database using environment variables. The key rule: **never hardcode database credentials in your code**. Always read them from `process.env`. This is how every real production app works.

## 🤖 AI Prompt

> "Update my Node.js Express app (`index.js`) to connect to Postgres using the `pg` npm package. Read all connection details from environment variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. Add a new route `GET /db-test` that runs a simple query `SELECT NOW()` and returns the result as JSON. Handle connection errors gracefully. Show the full updated `index.js` and the updated `package.json`."

## 📋 Step-by-step

**Step 1 — Install the Postgres client library**

```bash
npm install pg
```

This adds `pg` to your `package.json` dependencies.

**Step 2 — Update `index.js`**

```javascript
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection — reads from environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// New route to test DB connection
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      status: 'connected',
      db_time: result.rows[0].current_time
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Step 3 — Rebuild and restart**

Because you added a new npm package, you need to rebuild the Docker image:

```bash
docker compose down
docker compose up --build
```

The `--build` flag forces Docker to rebuild the image with the new `pg` dependency.

**Step 4 — Test the database connection**

Open `http://localhost:3000/db-test` in your browser. You should see something like:

```json
{
  "status": "connected",
  "db_time": "2026-03-09T12:00:00.000Z"
}
```

If you see an error, check `docker compose logs app` to see what went wrong.

## ✅ Done when

- [ ] `pg` is in `package.json` dependencies
- [ ] `index.js` reads DB credentials from `process.env`
- [ ] `http://localhost:3000/db-test` returns `{ "status": "connected" }`
- [ ] No credentials are hardcoded in the source code
