# 09 — [Optional] Status badges & branch protection

> **Category:** Polish · **Priority:** Low · **Step:** 10 · **Optional**
>
> Show a green build badge in your README and require CI to pass before merging.

## 🎯 What is this task?

Two finishing touches that make a repo look (and behave) professional:

1. A **status badge** in your README that shows live CI status.
2. **Branch protection** that blocks merging a pull request until CI is green.

## 🤖 AI Prompt

> "Give me the markdown for a GitHub Actions status badge for my workflow named CI, and explain how to make CI a required status check on the main branch."

## 📋 Step-by-step

**Status badge** — add to the top of `README.md`:

```markdown
![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)
```

Replace `OWNER/REPO` with your repo path. The badge turns green/red automatically.

**Branch protection**

Repo → **Settings** → **Branches** → **Add branch ruleset** (or classic protection rule) for `main`:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass → select your `test` check
- ✅ Require branches to be up to date before merging

Now a red pipeline physically blocks the **Merge** button.

## ✅ Done when

- [ ] A CI badge shows in your README
- [ ] `main` requires the `test` check to pass before merge
- [ ] A failing PR cannot be merged
