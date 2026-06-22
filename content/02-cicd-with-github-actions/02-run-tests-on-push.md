# 02 — Run your tests automatically on every push

> **Category:** Workflows · **Priority:** High · **Step:** 3
>
> This is the heart of CI: install dependencies and run the test suite on a clean machine.

## 🎯 What is this task?

A green "hello world" is nice, but real CI runs your **tests**. In this task the workflow installs your dependencies and runs `npm test` on a fresh `ubuntu-latest` machine — exactly as a teammate would on a clean checkout. If a test fails, the run goes red and the pull request is blocked.

## 🤖 AI Prompt

> "Update my GitHub Actions workflow to set up Node.js 20, install dependencies with `npm ci`, and run `npm test`. Explain why `npm ci` is preferred over `npm install` in CI."

## 📋 Step-by-step

Update `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

**Why `npm ci` and not `npm install`?**
`npm ci` installs the *exact* versions from `package-lock.json` and fails if the lockfile is out of sync. It's faster and reproducible — ideal for CI.

## ✅ Done when

- [ ] The workflow runs `npm ci` then `npm test`
- [ ] A passing test suite makes the run green
- [ ] Deliberately breaking a test turns the run red (then fix it)
