# 🟢 Project 1 — Dockerize a Simple Web App

| | |
|---|---|
| **Difficulty** | 🟢 Beginner |
| **Hosting** | Render (free tier) |
| **Key skills** | Multi-stage Dockerfile · non-root user · `.dockerignore` · Docker Compose · image push (Docker Hub / GHCR) |
| **Stretch goal** | Add `docker-compose.yml` with Postgres + app wired together, named volumes and healthchecks |

---

## 🎯 Project Overview

In this project, you take a simple web application and **package it into a Docker container** — the same way real companies ship software to production. By the end, your app runs consistently on any computer or server, with no "it works on my machine" problems.

This is the foundation of everything in DevOps. Every project after this builds on what you learn here.

## 🧠 What you will learn

- What Docker is and why it exists
- How to write a `Dockerfile` from scratch (basic → production-quality)
- How to use Docker Compose to run your app + a database locally with one command
- How to push your Docker image to a registry so others can use it
- The habits every DevOps engineer follows: non-root users, healthchecks, secrets in env vars

## 🗂 Project Structure

By the end of this project, your folder should look like this:

```text
my-docker-app/
├── Dockerfile           ← recipe to build the container image
├── docker-compose.yml   ← local dev setup (app + database)
├── .dockerignore        ← files to exclude from the image
├── .env                 ← local secrets (never commit this!)
├── .gitignore           ← tells git to ignore .env and node_modules
├── index.js             ← your Node.js app
└── package.json         ← Node.js dependencies
```

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| Node.js + Express | The web app you'll containerize |
| Docker | Build and run containers |
| Docker Compose | Orchestrate app + DB locally |
| PostgreSQL | Database running as a container |
| Docker Hub | Registry to store and share your image |

## 📋 Task Order

Complete the lessons **in order** — each builds on the previous.

| # | Lesson | Category |
|---|---|---|
| 00 | [Install WSL, Ubuntu & Docker](./00-setup-wsl-ubuntu-docker.md) | Setup |
| 01 | [Choose a simple app to containerize](./01-choose-a-simple-app.md) | Dockerfile |
| 02 | [Write a basic single-stage Dockerfile](./02-basic-single-stage-dockerfile.md) | Dockerfile |
| 03 | [Refactor to multi-stage Dockerfile](./03-multi-stage-dockerfile.md) | Dockerfile |
| 04 | [Add a non-root USER](./04-non-root-user.md) | Dockerfile |
| 05 | [Create a .dockerignore file](./05-dockerignore.md) | Dockerfile |
| 06 | [Add a HEALTHCHECK](./06-healthcheck.md) | Dockerfile |
| 07 | [Write docker-compose.yml (app only)](./07-docker-compose-app-only.md) | Docker Compose |
| 08 | [Add Postgres to docker-compose.yml](./08-add-postgres.md) | Docker Compose |
| 09 | [Wire app to Postgres via env vars](./09-wire-app-to-postgres.md) | Docker Compose |
| 10 | [Push image to Docker Hub](./10-push-to-docker-hub.md) | Registry |
| 11 | [\[Optional\] Push to GHCR](./11-push-to-ghcr.md) | Registry |
| 12 | [\[Optional\] Deploy to Render](./12-deploy-to-render.md) | Hosting |
| 13 | [\[Optional\] Configure env vars on Render](./13-render-env-vars.md) | Hosting |
| 14 | [\[Optional\] Trigger deploy and verify live](./14-verify-live.md) | Hosting |
| 15 | [\[Optional\] Add managed Postgres on Render](./15-render-managed-postgres.md) | Hosting |

## ⚠️ Rules to follow throughout this project

1. **Never hardcode credentials** — always use environment variables
2. **Never commit `.env`** — add it to `.gitignore` before your first `git add`
3. **Always add a healthcheck** — even locally, it's a good habit
4. **Rebuild after dependency changes** — run `docker compose up --build` when you change `package.json`

## 🤖 Stuck? Use this general AI prompt

> "I am learning Docker for the first time. I am working on task **\[task name\]**. Here is my current **\[Dockerfile / docker-compose.yml / error message\]**: \[paste it here\]. Please explain what is wrong and give me the corrected version with comments explaining each change."
