# 00 — What is CI/CD? (and why GitHub Actions)

> **Category:** Concepts · **Priority:** High · **Step:** 1
>
> Understand the problem CI/CD solves before writing a single workflow.

## 🎯 What is this task?

**CI/CD** stands for **Continuous Integration / Continuous Delivery**. In plain English:

- **CI (Continuous Integration):** every time you push code, a robot automatically builds it and runs your tests — so broken code is caught in minutes, not after it ships.
- **CD (Continuous Delivery/Deployment):** once the tests pass, that same robot can automatically package and ship your app to a registry or a server.

**GitHub Actions** is the robot. It lives inside your GitHub repo, watches for events (like a `push` or a pull request), and runs jobs you describe in a YAML file.

Think of it like a kitchen pass: a developer plates a dish (pushes code), and before it reaches a customer it must pass the expediter (CI checks). Only dishes that pass go out (CD).

## 🤖 AI Prompt

> "Explain CI/CD to me like I'm new to DevOps. What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment? Give me one concrete example for a Node.js app."

## 📋 Key vocabulary

| Term | Meaning |
|---|---|
| **Workflow** | A YAML file in `.github/workflows/` that defines automation. |
| **Event** | What triggers a workflow (`push`, `pull_request`, `schedule`…). |
| **Job** | A set of steps that run on one machine (runner). |
| **Step** | A single command or action inside a job. |
| **Runner** | The machine GitHub spins up to run your job (e.g. `ubuntu-latest`). |
| **Action** | A reusable unit of code, e.g. `actions/checkout@v4`. |

## ✅ Done when

- [ ] You can explain CI and CD in one sentence each
- [ ] You know what `.github/workflows/` is for
- [ ] You can name the difference between a job and a step
