# Verification

Nothing in this folder is claimed to work on the strength of having been written.
This is what was actually run, and what it actually printed.

## This branch behaves like a course task branch

Student-facing stubs **fail on purpose**, exactly as `upstream/task-*` branches do.
Each chapter also ships a `solutions/` folder whose reference answers are graded by
the *same* measurement functions as the student answers, which is what proves the
exercises are solvable rather than merely plausible.

Expected state of `npm test` on this branch:

```
Test Suites: 7 failed, 19 passed, 26 total
Tests:       11 failed, 97 passed, 108 total
```

Read that as:

| Group | Count | Expected result |
| --- | --- | --- |
| Pre-existing course tests (Chapters 1–5, from `smoketest-f26`) | 89 | **all pass** — the redesign breaks nothing |
| New reference-solution tests | 8 | **all pass** — every exercise is solvable |
| New student-facing stubs | 11 | **all fail** — this is the assignment |

Static checks, on the whole repository:

```
$> npx tsc --noEmit      # clean, no output
$> npm run lint          # clean, 0 warnings with --max-warnings 0
```

Every stub compiles. That is deliberate: the smoke test found that `task-objects`
ships `return {};` for a `Question`, so `npm run start` fails before a student
writes a line (finding F26-12). These stubs are wrong in their *values* only.

## The exercises measure, they do not consult an answer key

This mattered enough to design around, and it caught two of my own mistakes while
building these:

- **Chapter 1's merge exercise** shells out to real `git`. It creates three
  throwaway repositories, performs the three real merges, and reports what git did.
  If git's behaviour ever differs from the chapter's claim, the exercise fails and
  the *chapter* is wrong, not the student.
- **Chapter 2's jsdom exercise** renders the component and probes the environment.
  While writing it I asserted that jsdom would report no background colour for an
  unstyled Bootstrap button; the measurement disagreed — jsdom reports `ButtonFace`,
  the browser's own default grey. My reference solution was wrong and the harness
  said so. (The measured value is now compared against Bootstrap's actual
  `rgb(13, 110, 253)`, and `ButtonFace` turns out to be a better illustration of the
  original bug than what I had planned.)
- **Chapter 2's role exercise** initially disagreed with reality too: `getRoles`
  reports the implicit `generic` role that every plain `<div>` carries. Rather than
  bake that into an answer, the measurement now filters `generic` out and the stub
  says so, because "generic" tells a reader nothing about an interface.
- **Chapter 3's audits** run each implementation on a real array and watch whether
  it changed, and evaluate the counterexample by actually running the buggy code
  against its own specification.

Only Chapter 1's toolchain exercise uses a fixed key, because "which command
surfaces this class of failure" is a fact about the course's tooling rather than
something a unit test can observe about itself.

## Commands run

```
$> npx tsc --noEmit
$> npm run lint
$> CI=true npx react-scripts test --watchAll=false
$> CI=true npx react-scripts test --watchAll=false --testPathPattern comprehension-f26
```
