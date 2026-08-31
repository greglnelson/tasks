# Fall 2026 Textbook Smoke Test — Findings

Smoke test of <https://greglnelson.github.io/react-hooks-typescript-tome/> against the
`tasks` repository, one chapter at a time, following the book's own instructions verbatim.

Environment used for the smoke test:

| Tool | Version |
| --- | --- |
| git | 2.43.0 |
| node | v22.22.2 |
| npm | 10.9.7 |
| OS | Linux (headless container) |

Severity key: **BLOCKER** (student cannot proceed) · **BUG** (something is wrong and
should be fixed) · **PAPERCUT** (works, but confuses or misleads) · **NOTE** (informational).

---

## Chapter 1 — Setup

### 1-setup/environment.html — Environment Setup

Every command in this page was run in order. Results:

| Step | Command | Result |
| --- | --- | --- |
| Install Git | `git --version` | ✅ `git version 2.43.0` |
| Install Node | `npm --version` | ✅ `10.9.7` (node `v22.22.2`) |
| Get the tasks | `git remote add upstream https://github.com/COS420-Fall24/tasks.git` | ✅ remote reachable, all task branches present |
| Install deps | `npm install` | ✅ exit 0 |
| Run the site | `npm run start` | ✅ compiled, served HTTP 200, rendered in a real browser |
| Edit the site | add name to `src/App.tsx` | ✅ already present in `main` ("Greg") |
| Run the tests | `npm run test:cov` | ✅ 2 suites / 2 tests passed, 100% coverage |
| Lint | `npm run lint` | ✅ clean, 0 warnings |
| Build | `npm run build` | ✅ compiled successfully |

The chapter works. The site renders exactly as the book describes: the dark `App-header`
banner reading "UM COS420 with React Hooks and TypeScript", followed by the
"Edit `src/App.tsx` and save." paragraph.

#### F26-01 — Fork link and upstream remote still point at the Fall 2024 course repo · **BLOCKER (for F26)**

The page tells students to fork ["tasks repo (refreshed 2024)"](https://github.com/COS420-Fall24/tasks/fork)
and then run:

```
$> git remote add upstream https://github.com/COS420-Fall24/tasks.git
```

`COS420-Fall24` is a Fall 2024 organization. Everything downstream of this — every
`git fetch upstream task-*` in every later chapter — resolves against that repo. For a
Fall 2026 offering this needs to point at a refreshed course repository, or the whole
book is pulling two-year-old task branches.

This is a *textbook* fix (and a course-infrastructure decision), not a `tasks` repo fix.
It is listed first because it gates every other chapter.

#### F26-02 — `homepage` is the literal string `"homepage"` · **PAPERCUT**

`package.json` ships `"homepage": "homepage"`. The deploy workflow overwrites this field
at build time (`.github/workflows/deploy.yml`, "Update package.json homepage"), so the
*deployed* site is correct. But locally, the very first command the book asks a student to
run prints:

```
You can now view react-typescript-starter in the browser.

  http://localhost:3000/homepage
```

and `npm run build` prints "The project was built assuming it is hosted at /homepage/."
Both are confusing at exactly the moment a student is least able to tell a real problem
from a cosmetic one. (`http://localhost:3000/` does serve correctly — verified 200 and
rendered — so this misleads rather than blocks.)

Suggested fix: `"homepage": "."`, which is correct locally and is still overwritten by the
deploy workflow.

#### F26-03 — "Install Node ... by running `npm --version`" · **PAPERCUT**

The book says:

> **Install Node**: You can use the LTS version. ... Make sure you have `node` on your path by running `npm --version`

To check that `node` is on the path, the command is `node --version`. `npm --version`
checks npm. Both are worth running; the sentence should say so.

#### F26-04 — `caniuse-lite` is outdated · **NOTE**

Every `npm run start` and `npm run build` prints a `Browserslist: caniuse-lite is outdated`
warning. Harmless, but it is noise in the students' first-ever build output. Refreshing the
committed lockfile periodically clears it.

#### F26-05 — `npm install` dirties `package-lock.json` · **NOTE**

On npm ≥ 10.9, `npm install` rewrites many `"dev": true` entries to `"devOptional": true`.
No package versions change. The book already warns students they may see
`package-lock.json` as changed and should commit it, so this is covered — worth knowing it
is metadata churn, not a dependency change.

### 1-setup/branching.html — Branching Out

The book's four commands were run against the upstream:

```
$> git pull upstream main
$> git fetch upstream task-first-branch
$> git checkout -b solved-first-branch
$> git merge upstream/task-first-branch
```

✅ Works. `upstream/task-first-branch` is already merged into this fork's `main`, the test
it adds (`src/text.test.tsx`, "renders the text 'Hello World' somewhere") passes, and the
required text is present in `src/App.tsx`.

#### F26-06 — Book names the new test file `src/text.Test.tsx` · **PAPERCUT**

> When we ran `git merge upstream/task-first-branch`, a new file appeared named `src/text.Test.tsx`.

The file is actually `src/text.test.tsx` (lowercase `test`). On a case-sensitive filesystem a
student searching for `text.Test.tsx` will not find it. Jest also only picks up the
lowercase form, so the capitalised name in the book is wrong in two ways.
