# 🟡 Project 2 — CI/CD with GitHub Actions

| | |
|---|---|
| **Difficulty** | 🟡 Intermediate |
| **Hosting** | GHCR + Render |
| **Key skills** | Workflows · build matrix · automated tests · Docker build/push in CI · secrets · layer caching · deploy on merge |
| **Stretch goal** | Add status badges and branch protection so a red pipeline blocks merging to `main` |

---

## 🎯 Project Overview

Automate everything you did by hand in Project 1. You'll build a pipeline that **tests, builds, and ships** your container on every push — the way professional teams deliver software. This is where "DevOps" stops being a buzzword and becomes muscle memory.

> 🔗 This project builds directly on **Project 1 — Dockerize a Simple Web App**. You'll automate the same Dockerfile and image push you did manually there.

## 🧠 What you will learn

- What CI/CD actually means, and the anatomy of a GitHub Actions workflow
- Running your test suite automatically on every push and pull request
- Testing across multiple language versions with a build matrix
- Building and publishing your Docker image from CI to GHCR
- Handling secrets safely with encrypted repository secrets
- Speeding up builds with npm and Docker layer caching
- Deploying automatically when code merges to `main`

## 🗂 Lessons

| # | Lesson | Priority |
|---|---|---|
| 00 | What is CI/CD? | High |
| 01 | Create your first workflow | High |
| 02 | Run tests on every push | High |
| 03 | Test across versions with a matrix | Medium |
| 04 | Build your Docker image in CI | High |
| 05 | Secrets & environment variables | High |
| 06 | Push your image to GHCR from Actions | High |
| 07 | Speed up builds with caching | Medium |
| 08 | Deploy automatically on merge to main | High |
| 09 | [Optional] Status badges & branch protection | Low |

## 💡 Real example in this repo

This very repository ships two workflows you can read as a reference:

- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) — installs deps, runs the test suite, and builds the site on every push.
- [`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml) — builds and deploys the static site on merge to `main`.
