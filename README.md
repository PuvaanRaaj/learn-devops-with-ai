# 🐳 DevOps Learning Path

> A structured, **project-based** DevOps curriculum focused on containerization, cloud-native deployments, and infrastructure best practices.

**Focus:** Docker · ECS/Fargate · Serverless · free-tier hosting

This repo turns a DevOps curriculum into a hands-on, folder-by-folder learning path. Each **project is a folder**, and each folder contains numbered, do-this-next lessons that build on one another. Every lesson includes plain-English explanations, copy-paste commands, an AI prompt to unblock yourself, and a "Done when" checklist.

## 🌐 Learn interactively (web UI)

An interactive site ships with this repo — sidebar navigation, rendered lessons, and **progress tracking saved in your browser**.

- **Hosted:** [GitHub Pages site](https://puvaanraaj.github.io/learn-devops-with-ai/) _(live once Pages finishes building)_
- **Local:** clone the repo and run a static server (the site fetches the markdown files, so `file://` won't work):

  ```bash
  git clone https://github.com/PuvaanRaaj/learn-devops-with-ai.git
  cd learn-devops-with-ai
  python3 -m http.server 8000
  # open http://localhost:8000
  ```

## 📚 Curriculum

| # | Project | Difficulty | Hosting | Key skills |
|---|---|---|---|---|
| 1 | [Dockerize a Simple Web App](./01-dockerize-a-simple-web-app/) | 🟢 Beginner | Render | Multi-stage Dockerfile · non-root user · `.dockerignore` · Docker Compose · image push |

_More projects (ECS/Fargate, AWS Lambda, GCP Cloud Run) will be added as folders `02-…`, `03-…` and so on._

## 🗂 Repo structure

```text
learn-devops-with-ai/
├── README.md                       ← you are here
├── index.html                      ← interactive learning UI (GitHub Pages)
├── curriculum.json                 ← manifest the UI reads
└── 01-dockerize-a-simple-web-app/  ← Project 1 (folder = project)
    ├── README.md                   ← project overview & lesson index
    ├── 00-setup-wsl-ubuntu-docker.md
    ├── 01-choose-a-simple-app.md
    └── … 02 → 15 (lessons in order)
```

## ▶️ How to use this path

1. Start with **Project 1**, lesson `00`, and work through the numbers in order — each builds on the last.
2. Type the commands yourself instead of just reading. The point is muscle memory.
3. Stuck? Each lesson has a ready-to-use **AI prompt** — paste your error in and go.
4. Tick the **"Done when"** boxes (in the web UI, progress is saved automatically).

## 🧭 Conventions

- `🟢 Beginner` · `🟡 Intermediate` · `🔴 Advanced`
- `[Optional]` lessons are stretch goals — the core project works without them.
- **Never commit `.env`.** Every project uses environment variables for secrets.

## 📄 License

[MIT](./LICENSE) — use it, fork it, teach with it.

---

_Curriculum sourced from the "DevOps Learning Path" Notion workspace and rebuilt as an open, interactive repo._
