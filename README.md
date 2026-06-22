# 🐳 DevOps Learning Path

> A structured, **project-based** DevOps curriculum focused on containerization, CI/CD, cloud-native deployments, and infrastructure best practices.

**Focus:** Docker · CI/CD · ECS/Fargate · Serverless · free-tier hosting

This repo turns a DevOps curriculum into a hands-on, project-by-project learning path with an interactive web app. Each **project is a folder** of numbered, do-this-next lessons that build on one another. Every lesson includes plain-English explanations, copy-paste commands, a ready-to-use **AI prompt**, a **quiz**, and a "Done when" checklist. Pass every quiz in a project to unlock a printable **certificate**.

## 🌐 Interactive web app (Next.js)

The site is a **Next.js** app (App Router + TypeScript) that statically exports — so it runs anywhere, with **progress, quiz results, and certificates saved in your browser** (no backend, no login).

- **Lessons** rendered from the markdown in `content/`, with a highlighted AI prompt and code highlighting.
- **Quizzes** gate completion — you must answer every question correctly to complete a lesson.
- **Certificates** unlock once all required lessons in a project are passed; add your name and print/save as PDF.
- **Dark/light theme** and **progress tracking** persist locally.

### Run it locally

```bash
git clone https://github.com/PuvaanRaaj/learn-devops-with-ai.git
cd learn-devops-with-ai
npm install
npm run dev          # http://localhost:3000
```

### Build & test

```bash
npm test             # run the Vitest suite
npm run build        # produce a static export in ./out
```

## 📚 Curriculum

| # | Project | Difficulty | Hosting | Key skills |
|---|---|---|---|---|
| 1 | [Dockerize a Simple Web App](./content/01-dockerize-a-simple-web-app/) | 🟢 Beginner | Render | Multi-stage Dockerfile · non-root user · `.dockerignore` · Docker Compose · image push |
| 2 | [CI/CD with GitHub Actions](./content/02-cicd-with-github-actions/) | 🟡 Intermediate | GHCR + Render | Workflows · build matrix · automated tests · Docker build/push in CI · secrets · caching · deploy on merge |

_More projects (ECS/Fargate, AWS Lambda, GCP Cloud Run) will be added as folders `03-…`, `04-…` and so on._

## 🗂 Repo structure

```text
learn-devops-with-ai/
├── README.md
├── app/                      ← Next.js App Router pages
│   ├── page.tsx              ← home / project picker
│   ├── projects/[project]/[lesson]/page.tsx
│   └── certificate/[project]/page.tsx
├── components/               ← Sidebar, Quiz, Certificate, LessonView, …
├── lib/
│   ├── curriculum.ts         ← single source of truth: lessons, AI prompts, quizzes
│   └── progress.ts           ← client-side progress + certificate logic
├── content/                  ← lesson markdown (one folder per project)
│   ├── 01-dockerize-a-simple-web-app/
│   └── 02-cicd-with-github-actions/
├── test/                     ← Vitest unit + component tests
└── .github/workflows/        ← CI (test + build) and Pages deploy
```

## ▶️ How to use this path

1. Start with **Project 1**, lesson `00`, and work through the numbers in order — each builds on the last.
2. Type the commands yourself instead of just reading. The point is muscle memory.
3. Stuck? Each lesson has a ready-to-use **AI prompt** — copy it, paste your error in, and go.
4. Pass the **quiz** at the end of each lesson to mark it complete.
5. Finish every required lesson in a project to unlock your **certificate**.

## 🚀 Hosting

The static export in `out/` can be hosted anywhere. Two paths are wired up:

- **Vercel** — zero-config; it detects Next.js and builds automatically.
- **GitHub Pages** — `.github/workflows/deploy-pages.yml` builds with the correct `basePath` and deploys on merge to `main`. (Set repo **Settings → Pages → Source** to **GitHub Actions**.)

## 🧭 Conventions

- `🟢 Beginner` · `🟡 Intermediate` · `🔴 Advanced`
- `[Optional]` lessons are stretch goals — they don't block the project certificate.
- **Never commit `.env`.** Every project uses environment variables for secrets.

## 📄 License

[MIT](./LICENSE) — use it, fork it, teach with it.
