# 01 — Choose a simple app to containerize

> **Category:** Dockerfile · **Priority:** High · **Step:** 2
>
> Keep it minimal — a single route returning JSON is enough. The focus is the Docker setup, not the app.

## 🎯 What is this task?

Before writing any Docker code, you need a real app to containerize. Don't build something complex — a single web page that returns a message is enough. The goal here is to have **working code** you can wrap in Docker.

## 🤖 AI Prompt to generate the app

Copy and paste this into Claude or ChatGPT:

> "Create a simple Node.js Express app. It should have two routes: `GET /` that returns a JSON response `{ "message": "Hello from Docker!" }`, and `GET /health` that returns `{ "status": "ok" }`. Use port 3000. Put everything in a single file called `index.js`. Also create a `package.json` for it."

## 📋 Step-by-step

**Step 1 — Install Node.js (if not installed)**

Go to <https://nodejs.org> and download the LTS version. After installing, verify it works:

```bash
node --version
npm --version
```

Both commands should print a version number.

**Step 2 — Create a project folder**

```bash
mkdir my-docker-app
cd my-docker-app
```

**Step 3 — Create the files**

Create `index.js` with this content:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Create `package.json` with this content:

```json
{
  "name": "my-docker-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Step 4 — Install dependencies and test it locally**

```bash
npm install
npm start
```

Open your browser and go to `http://localhost:3000` — you should see the JSON response. Press `Ctrl+C` to stop.

## ✅ Done when

- [ ] You have an `index.js` and `package.json` in your folder
- [ ] Running `npm start` shows the server running message
- [ ] `http://localhost:3000` shows `{ "message": "Hello from Docker!" }`
- [ ] `http://localhost:3000/health` shows `{ "status": "ok" }`
