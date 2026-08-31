# Fall 2026 Textbook Smoke Test — Findings

Smoke test of <https://greglnelson.github.io/react-hooks-typescript-tome/> against the
`tasks` repository, one chapter at a time, following the book's own instructions verbatim.

## Summary

Every task in the book was merged and solved by following the chapters exactly. **The book
works.** All 12 task branches merge, all tasks are solvable as written, and the finished
project ends at **89/89 tests passing**, `tsc` clean, `npm run lint` clean, and
`npm run build` successful. Each chapter's app was also rendered in a real headless browser,
not just asserted against in jsdom — which is how the most serious defect was found.

| # | Chapter | Task branches | Outcome |
| --- | --- | --- | --- |
| 1 | Setup | `task-first-branch` | ✅ works |
| 2 | Basic App | `task-html-css` | ✅ works — 2 bugs found and fixed |
| 3 | TypeScript | `task-functions`, `task-arrays`, `task-objects`, `task-nested` | ✅ works |
| 4 | Using State | `task-state`, `task-components`, `task-forms` | ✅ works — 1 bug found and fixed |
| 5 | Complex Representations | `task-quizzer` | ⚠️ scaffolding stale — 1 bug fixed, 1 needs upstream |
| 6 | Your Own App | — | ❌ page does not exist |
| 7 | The Lost Chapters | — | ✅ content complete — 1 sample does not compile |

### Fixed in this repository

| ID | Problem |
| --- | --- |
| F26-08 | Bootstrap's CSS was never installed or imported, so every `<Button>`, `Container`, `Row` and `Col` in the course rendered unstyled and columns stacked vertically — while all tests passed |
| F26-09 | The Chapter 2 "change the header background color" test could never fail; students got 2 points for doing nothing |
| F26-16 | `task-state` shipped a second ESLint config (`.eslintrc.json`) that ESLint silently ignores |
| F26-20 | The provided Chapter 5 `Quizzer.tsx` / `Quizzer.test.tsx` failed `npm run lint` out of the box |

### Needs a decision from you (cannot be fixed from this repo)

| ID | Problem |
| --- | --- |
| F26-01 | The book still forks and pulls from `COS420-Fall24`. Every `git fetch upstream task-*` in every chapter resolves there. **Gates everything else for F26.** |
| F26-22 | Chapter 6 ("Your Own App") is an empty "Coming soon" stub, exactly where the book hands off to the team project |
| F26-19 | `task-quizzer` is still the Delaware CISC275 branch; its merge conflict traps a student into importing a component that no longer exists |
| F26-12 | `task-objects` starter code does not type-check, so `npm run start` fails before the student writes a line |
| F26-23 | The "CORRECT version" in the Re-wrapping States page does not compile (`error TS1005`) |

The single most valuable finding is **F26-08**: it is a case where a green test suite
certified a visibly broken page for the entire course. It is also the best teaching example
in the whole smoke test — tests passed because jsdom never loads CSS, so the classes
`btn btn-primary` were present with no stylesheet behind them.

Full detail, with commands and output, follows.

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

---

## Chapter 2 — Basic App

### 2-app/concepts.html — All the Concepts

Reading-only page, no task. Reads fine.

#### F26-07 — Unfinished `TODO` is visible to students · **PAPERCUT**

The "What is Bootstrap?" section renders this line to the reader:

> TODO: Put an image of a Bootstrap website here

### 2-app/editing.html — Basics of HTML and CSS

The book's commands were run verbatim:

```
$> git pull upstream main
$> git fetch upstream task-html-css
$> git checkout -b solved-html-css
$> git merge upstream/task-html-css
```

Merged cleanly, adding `src/HtmlCss.test.tsx` and `public/tasks/task-html-css.md`.
As the book promises, the new tests fail immediately: **6 failed, 4 passed**.

All seven listed requirements were then implemented in `src/App.tsx` / `src/App.css`
(heading, image with alt text, 3-item list, header background color, Bootstrap button
reading `Log Hello World` that logs `Hello World!`, and inline-styled red rectangles in two
columns). Result: **10/10 tests pass**, `npm run lint` clean.

So the chapter is *solvable exactly as written*. Two real defects showed up anyway.

#### F26-08 — Bootstrap's CSS is never installed or imported · **BUG · FIXED**

This chapter introduces Bootstrap ("We're going to use the Bootstrap library quite a lot"),
has students render a `<Button>`, and ends with a **Two Column Layout** section using
`Container` / `Row` / `Col`. But the repository depended only on `react-bootstrap` — the
`bootstrap` package that carries the actual stylesheet was never installed, and nothing
imported it.

`react-bootstrap` ships components, not CSS. So the tests passed while the page was wrong:
the button rendered as a bare grey browser button, and the two columns **stacked
vertically instead of sitting side by side**. A student who did everything right saw a
broken-looking page with a green test suite, and had no way to tell whether they had made a
mistake. `src/index.tsx` carries the comment "You will not need to modify this file", so a
student could not reasonably be expected to fix this themselves — it had to be fixed here.

The tests could not catch it because jsdom does not apply `.css` files, so the classes
`btn btn-primary` were present in the markup even with no stylesheet behind them.

**Fix applied:** added `bootstrap@^5.3.3` to `dependencies` and
`import "bootstrap/dist/css/bootstrap.min.css";` to `src/index.tsx`, ahead of the project's
own stylesheets so student CSS still wins. Verified in a real headless browser: the button
now renders as a Bootstrap primary button and the two columns render side by side. Tests
still 10/10, lint still clean.

#### F26-09 — The "background color of the header" test could never fail · **BUG · FIXED**

The task sheet grades "Change the background color of the header area" at 2 points. The
test was:

```tsx
const banner = screen.getByRole("banner");
expect(banner).not.toHaveStyle({ "background-color": "rgb(40, 44, 52)" });
```

Because jsdom never loads `App.css`, the `<header>` has *no* background color during the
test, so `not.toHaveStyle(...)` is trivially satisfied. **Verified: this test passed on a
completely unmodified `App.css`.** Students got the 2 points for doing nothing, and a
student who genuinely wanted feedback got none.

**Fix applied:** the test now reads `src/App.css`, extracts the `background-color`
declaration from the `.App-header` rule, and asserts it is no longer `#282c34`. Verified
both directions: it **fails** on the original stylesheet and **passes** once the color is
changed.

#### F26-10 — The task sheet asks for more than the tests check · **PAPERCUT**

The book's requirement reads:

> Put a red-filled rectangle in **each column** using a `div` tag with `width`, `height`, and `backgroundColor` styles.

but the test only scans for *any one* element with a red background, and nothing anywhere
checks that a `Container`/`Row`/`Col` layout exists at all. A student can score full marks
without ever building the two-column layout the section teaches. Worth either testing the
columns or softening the prose so the graded contract matches what is checked.

#### F26-11 — Chapter 1's test is satisfiable by Chapter 2's button · **NOTE**

`src/text.test.tsx` matches `/Hello World/`, and this chapter has students add a button
labelled `Log Hello World`. The Chapter 1 requirement is therefore silently satisfied by
Chapter 2's work. Harmless here, but it is the kind of overlap that can hide a regression.

---

## Chapter 3 — TypeScript

Four tasks, run in the book's order. All four merge cleanly and **all are solvable exactly
as written**, under the book's own constraints (no `for`/`while`/recursion, no mutation).

| Task | Branch | Result |
| --- | --- | --- |
| Primitives and Control Flow | `task-functions` | ✅ 15/15 |
| Arrays | `task-arrays` | ✅ 24/24 cumulative |
| Objects | `task-objects` | ✅ 34/34 cumulative |
| Nested Data | `task-nested` | ✅ **44/44 cumulative** |

`npx tsc --noEmit` clean and `npm run lint` clean at every step.

The immutability enforcement in these tests deserves praise: every describe block carries an
`afterEach` that re-asserts the input constants are unchanged, with the comment "If you fail
these, you aren't using map/filter/reduce/etc. properly!". That is a well-designed way to
make an invisible requirement (immutability) produce a visible failure.

#### F26-12 — `task-objects` starter code does not type-check · **BUG**

Immediately after `git merge upstream/task-objects`, before the student writes a line:

```
$> npx tsc --noEmit
src/objects.ts(13,5): error TS2740: Type '{}' is missing the following properties
from type 'Question': id, name, body, type, and 4 more.
```

`makeBlankQuestion` is stubbed as `return {};`. Every *other* stub in the book's starter
files returns a type-correct placeholder (`return 0;`, `return "";`, `return question;`,
`return [];`), so this one is an oversight rather than a design choice.

It matters because the two commands the book has already taught disagree. `npm run test:cov`
works (Jest strips types via Babel and never type-checks), but `npm run start` — the command
students learned in Chapter 1 and are most likely to reach for — fails to compile with an
error in code they did not write.

Recommended fix in the refreshed task branch: give the stub a type-correct but wrong
placeholder, e.g. returning a fully-formed `Question` with `points: 0` and an empty name, so
the project compiles while the exercise stays unsolved.

#### F26-13 — `task-nested` depends on `task-objects` being solved, silently · **PAPERCUT**

`nested.ts` instructs: "Reuse the `makeBlankQuestion` you defined in the `objects.ts` file",
and `addNewQuestion`'s tests compare against fully-formed blank questions.

`upstream/task-nested` ships the **unsolved** `objects.ts` (verified: it still contains
`return {};`). Git's three-way merge means a student who already solved and merged
`task-objects` keeps their own version — that path works, and was verified end to end here.
But a student who skipped or has not yet merged the Objects task gets the stub, and then
sees `addNewQuestion` fail plus a project that will not compile, with nothing in the Nested
chapter explaining why. The chapter should state the prerequisite explicitly.

#### F26-14 — `fahrenheitToCelius` is misspelled · **NOTE**

The function is named `fahrenheitToCelius` (missing the `s` in "Celsius") in the starter
file, in `functions.test.ts`, and in the book. Purely cosmetic, and renaming it means
touching all three at once — but it is the first function students ever write in this course,
and it teaches them a misspelling.

#### F26-15 — Upstream has a stray `updated-task-nested` branch · **NOTE**

The upstream repo carries both `task-nested` and `updated-task-nested`. The book points at
`task-nested`, which is correct: the only difference between them is one `package-lock.json`
commit (the same `dev` → `devOptional` metadata churn as F26-05). Nothing is broken, but a
student browsing the branch list may reasonably think they are on the wrong one.

---

## Chapter 4 — Using State

Three tasks plus a Firebase page. All three tasks work; the chapter is in good shape.

| Task | Branch | Result |
| --- | --- | --- |
| State | `task-state` | ✅ 57/57 cumulative |
| Components | `task-components` | ✅ 71/71 cumulative |
| Forms | `task-forms` | ✅ **88/88 cumulative** |

`npx tsc --noEmit` clean and `npm run lint` clean after each task. The finished Chapter 4 app
was rendered in a real headless browser and every component behaves as the chapter describes.

### The merge conflicts here are deliberate, and the book handles them well

Merging `task-state` produces conflicts in `src/App.tsx` and `src/nested.ts`, and merging
`task-forms` conflicts in `src/App.tsx` again. This is **by design**, and the State chapter
devotes a whole "Merge Conflicts" section to it:

> Unfortunately, it is extremely likely that you will encounter "merge" conflicts between your code and our code. These conflicts occur because we are providing edits to a file that you have also edited.

It links an ~8 minute video, gives explicit permission to delete `HtmlCss.test.tsx` and
`text.test.tsx` on the new branch, and adds the nice guard rail:

> (Do not misinterpret this to mean the general way to "fix" merge conflicts is to just delete files)

That is genuinely good pedagogy and the smoke test confirms it plays out as written. One
caveat worth knowing: **`upstream/task-state` reformats every file** (Prettier's
`trailingComma` moved from `es5` to `all`), so the `nested.ts` conflict is *purely
whitespace* — a student is asked to resolve a scary-looking conflict where neither side
differs in meaning. Regenerating that branch with the current Prettier settings would remove
a conflict that teaches nothing.

Note also the one place where the book's guidance is load-bearing: `task-state`'s `App.tsx`
drops the Chapter 1 and 2 content entirely. Taking it wholesale breaks 7 previously-passing
tests — which is exactly why the chapter grants permission to delete those two test files.
Anyone reworking this chapter must keep that paragraph.

#### F26-16 — `task-state` ships a second, dead ESLint config · **BUG · FIXED**

`task-state` adds `.eslintrc.json` while `.eslintrc.js` already exists. ESLint 8 resolves
`.eslintrc.js` first and **silently ignores** the JSON file. Verified with
`npx eslint --print-config src/App.tsx`: none of the JSON config's rules (`quotes`, `indent`,
`brace-style`, `prettier/prettier`) are in effect, while `.eslintrc.js`'s rules are.

So the repo carries two configs that disagree with each other, one of which does nothing. A
student who tries to change a lint rule by editing `.eslintrc.json` will see no effect and
have no way to understand why.

**Fix applied:** deleted `.eslintrc.json`. `npm run lint` still passes.

#### F26-17 — The provided starter components are not lint-clean · **PAPERCUT**

Straight after merging `task-state`, before the student writes anything:

```
$> npx eslint src/components/RevealAnswer.tsx
  1:17  error  'useState' is defined but never used  @typescript-eslint/no-unused-vars
  2:10  error  'Button' is defined but never used    @typescript-eslint/no-unused-vars
```

The stubs import `useState` and `Button` for the student to use, which is a kindness — but
`npm run lint` runs with `--max-warnings 0`, and the deploy workflow runs `npm run
eslint-output` on every push to `main`. The course asks students to keep lint clean while
handing them code that is not. Worth either seeding the stubs so they lint clean, or saying
plainly in the chapter that lint will be red until the components are implemented.

### 4-state/firebase.html — Firebase

No task branch; this page sends students to a separate repository. Both linked repos are
reachable: `COS420-Fall24/cos420-broken-firebase` (branch `master`) and
`TSchotter/Getting-started-with-Firebase`. So the exercise is still runnable — subject to
F26-01, since the broken-firebase repo is also under the Fall 2024 org.

#### F26-18 — The Firebase page has an unfinished sentence and a missing screenshot · **PAPERCUT**

The page reads:

> Go ahead and glone the repository above, then run …
>
> Then run the tests to make sure they run. You should see this output:
>
> screnshot

"then run …" trails off unfinished, and "screnshot" is a placeholder where an image was
meant to go (also misspelled). Combined with `glone` for `clone`, `databse`, `gaurdrails`
and `similiarities` on the same page, this reads as the least-finished page in the book.
It is also the only page that asks students to set up a Google Cloud service, i.e. the place
where they can least afford ambiguity.

---

## Chapter 5 — Complex Representations

### 5-complex/examples.html — Nested Examples

Reading-only ("No Task"). The worked examples reference the companion application
`frontend-fun/movie-records`, which is **live and public** (verified by `git ls-remote`).
The prose links into it with pinned-commit permalinks, which is the right way to do it —
they will not rot as that repo evolves.

### 5-complex/complex.html — Full Application (Quizzer)

**Scope note:** this task is the open-ended, multi-week Quizzer project. The book itself
says "we do not really expect you to finish all of the task 100%", and grading is by rubric
(8 of 14 requirements plus tests plus a sketch = 100%). Building a full quiz application is
not what a smoke test can meaningfully verify, so what was checked here is that the *task
infrastructure* works: the branch merges, the provided scaffolding compiles, the tests run,
and the project still builds. Result: ✅ **89/89 tests pass**, `tsc` clean, lint clean —
after fixing two defects in the provided scaffolding.

#### F26-19 — `task-quizzer` is stale: it is still the Delaware CISC275 version · **BUG**

`upstream/task-quizzer` was branched before the Fall 2024 rework and never refreshed. Its
`src/App.tsx` still reads:

```tsx
<header className="App-header">
    UD CISC275 with React Hooks and TypeScript
</header>
```

and it imports six components that the current, reduced course never introduces:
`StartAttempt`, `CycleHoliday`, `ShoveBox`, `GiveAttempts`, `ChangeColor`, and it ships
their files and tests.

Git's three-way merge saves the student here — because our side deliberately deleted those
files and changed the header, those changes win and the merge only adds `src/quizzer/`.
**But the conflict it does raise is a trap.** The conflicting hunk is the import block:

```
<<<<<<< HEAD
=======
import { ChangeColor } from "./form-components/ChangeColor";
import { Quizzer } from "./quizzer/Quizzer";
>>>>>>> upstream/task-quizzer
```

A student who resolves this with VS Code's **"Accept Both Changes"** — the single most
natural action, and the one the video linked from Chapter 4 demonstrates — gets:

```
$> npx tsc --noEmit
src/App.tsx(13,29): error TS2307: Cannot find module './form-components/ChangeColor'
   or its corresponding type declarations.
```

**Verified by actually doing it.** The student is then debugging a missing module they never
heard of, in a file they did not write, at the start of the largest project in the course.
The fix belongs upstream: regenerate `task-quizzer` from the current `main` so it carries
only `src/quizzer/`.

#### F26-20 — The provided Quizzer scaffolding fails lint out of the box · **BUG · FIXED**

The two files the chapter hands students both fail `npm run lint`:

```
src/quizzer/Quizzer.test.tsx
  2:18  error  'screen' is defined but never used  @typescript-eslint/no-unused-vars
src/quizzer/Quizzer.tsx
  3:28  error  'JSX' is not defined                no-undef
```

`Quizzer.tsx` declares `function Quizzer(): JSX.Element` using the bare global `JSX`
namespace, while every other component in the repo uses `React.JSX.Element`. TypeScript
accepts it (`tsc` is clean), so this is ESLint-only — which makes it more confusing, not
less: the type checker says fine, the linter says undefined.

**Fix applied:** `Quizzer.tsx` now returns `React.JSX.Element`, matching the rest of the
repo; and the placeholder test now actually asserts the component renders
(`expect(screen.getByText(/Quizzer/i)).toBeInTheDocument()`) instead of importing `screen`
and never using it. That fixes the lint error *and* means the starter test is a real test.
The "Up to you to decide what the rest of your tests are!" invitation is preserved.

#### F26-21 — Worth knowing if the Quizzer is assigned as an AI exercise · **NOTE**

The 14 requirements on this page are stated as one flat bulleted list with no tests and no
data model, and the chapter explicitly says a vague requirement is the student's call. That
makes this page an unusually good instrument for studying how an AI assistant behaves on a
*poorly specified* brief versus a tested one — the requirements are real, independent, and
countable. If the Quizzer is used that way, F26-19 and F26-20 should be fixed first, so that
students are measuring the AI rather than fighting stale scaffolding.

---

## Chapter 6 — Your Own App

#### F26-22 — Chapter 6 does not exist · **BLOCKER (for anyone following the book start to finish)**

`https://greglnelson.github.io/react-hooks-typescript-tome/6-journey/` is a stub. The entire
page body is:

> **Coming soon**
>
> Oops! This page is not yet ready. Please be patient while we finish it up.

Its table of contents advertises three sections — *User stories*, *Agile*, *Sketching out
your app* — none of which exist, and there are no sub-pages. There is no task, no branch, no
content of any kind.

This is the chapter where the book hands off from guided tasks to the student's own team
project, so it is the single largest content gap. Chapter 5 sends students here ("Once
you're done submitting, we can start our own app"), and Chapter 5's Quizzer task explicitly
leans on process material — "Gather requirements / Sketch the application / Develop the data
model" — that Chapter 6 is supposed to teach.

## Chapter 7 — The Lost Chapters

Four reference pages, none with a task branch. All four are content-complete (no "coming
soon" stubs) and all six screenshots on the Sharing Code page load (verified HTTP 200).
The Records and Re-wrapping pages are the most conceptually valuable in the book — they are
the clearest treatment of lookup types and of why lifting state matters — and it is a shame
they are filed under "Lost Chapters".

#### F26-23 — The "CORRECT version" in Re-wrapping States does not compile · **BUG**

`7-extras/wrapping.html` contrasts a wrong example with a corrected one. The corrected one
declares:

```tsx
function TeamView(
    {team, teams, setTeams}: {team: Team, teams: Team[], setTeams: (t: Team[])}
): JSX.Element {
```

`setTeams: (t: Team[])` is not a valid type — a function type needs a return type. Compiled
with the exact TypeScript version this course pins (4.9.5):

```
error TS1005: '=>' expected.
```

It should be `setTeams: (t: Team[]) => void`. A student who copies the page's own *corrected*
code gets a syntax error, on the page whose entire purpose is showing them the right way.

#### F26-24 — Record examples omit the `key` prop the book insists on · **PAPERCUT**

`7-extras/records.html` renders lists in three separate examples like this:

```tsx
{Object.keys(GRADES).map((user: string) => (
    <li>User: {user}</li>
))}
```

No `key`. React logs "Each child in a list should have a unique key prop" for every one of
them. Chapter 4 is emphatic about this:

> the basic idea is that we must provide a `key` attribute to help React distinguish between different adjacent elements created from the `map`. It'll be easy to forget, but can often be the source of many errors.

The Re-wrapping page on the very next tab does use `key` correctly, so this is an
inconsistency within the same chapter rather than a difference of opinion.

#### F26-25 — Book-wide: code samples use `JSX.Element`, the repo uses `React.JSX.Element` · **PAPERCUT**

Every code sample in the book declares `function App(): JSX.Element`, using the bare global
`JSX` namespace. Every component in the tasks repository uses `React.JSX.Element`. TypeScript
accepts both, so this is invisible until a student pastes a book sample into their project,
at which point the course's own ESLint config rejects it:

```
error  'JSX' is not defined  no-undef
```

This is the same root cause as F26-20, where the provided `Quizzer.tsx` shipped with the
error. Worth a single pass over the book's samples, particularly because the global `JSX`
namespace is removed in React 19's types — so this will stop being cosmetic on the next
major React upgrade.
