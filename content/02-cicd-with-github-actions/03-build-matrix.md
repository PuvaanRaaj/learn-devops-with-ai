# 03 — Test across multiple versions with a build matrix

> **Category:** Workflows · **Priority:** Medium · **Step:** 4
>
> Run the same job against several Node.js versions in parallel using a `matrix`.

## 🎯 What is this task?

Your app might run on Node 18 in one place and Node 20 in another. A **matrix** lets one job fan out into several parallel runs — one per version — so you catch "works on my machine" bugs early. GitHub runs them simultaneously and shows each as its own check.

## 🤖 AI Prompt

> "Add a build matrix to my GitHub Actions job so my tests run on Node.js 18, 20, and 22 in parallel. Explain how `matrix` and `${{ matrix.node }}` work."

## 📋 Step-by-step

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: ["18", "20", "22"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: "npm"
      - run: npm ci
      - run: npm test
```

- `matrix.node` expands into three runs.
- `${{ matrix.node }}` is the current value for each run.
- `fail-fast: false` lets the other versions finish even if one fails, so you see the full picture.

## ✅ Done when

- [ ] The Actions tab shows three parallel `test` checks
- [ ] Each uses a different Node.js version
- [ ] You understand what `${{ matrix.node }}` resolves to
