# Comprehension Tasks — Chapters 1–3

These sit *before* each chapter's existing coding task. They are quick. None of them
asks you to build anything; all of them ask you to say what you think will happen,
and then find out.

## How these are graded, and one rule that matters

Every exercise is an exported constant you edit. Run them with:

```
$> npm test
```

**Commit your predictions before you run the tests.** All of these exercises check
your answer by *measuring reality*, which means the failure message will often show
you the right answer. That is deliberate — you should find out immediately when your
model of the machine is wrong. But it also means the only evidence that you predicted
rather than copied is your git history. So: write your answers, `git commit`, then
run. Your commit log is part of what is being assessed.

If a test's failure message teaches you something surprising, write one sentence
about it in your commit message for the fix. Those sentences are the most useful
thing you will produce this week.

## Chapter 1 — Setup

**`ch1-setup/toolchain.ts`** — Five symptoms, five instruments. Say which instrument
catches which. One of the five is caught by no command at all; that one is the point
of the exercise.

**`ch1-setup/gitModel.ts`** — Predict the outcome of three merges. This test builds
three real git repositories and runs three real merges, so you are being compared
against git itself, not an answer key. Chapter 4 will hand you genuine merge
conflicts on purpose; this is where you get the model that makes them boring.

Then: the Chapter 1 baseline AI experiment in `AI-EXPERIMENTS.md`.

## Chapter 2 — Basic App

**`ch2-app/domPrediction.ts`** — Read `QuestionCard.tsx` and predict the ARIA roles
its markup exposes, and its heading text. Roles are how both a screen reader and
`screen.getByRole` see your page.

**`ch2-app/whatTestsCantSee.ts`** — Five statements, all of them true of the real
page. For each, decide whether a Jest test could actually verify it. This is the
most important exercise in the set, and it comes from a real defect in this course:
every Bootstrap component rendered unstyled for a semester with a fully green test
suite. It is a true story about this repository.

Then: the Chapter 2 batch experiment, and the blind-test exercise.

## Chapter 3 — TypeScript

**`ch3-typescript/trace.ts`** — Predict what four pipelines evaluate to. Do this by
hand, before running anything. Watch `e4`: `reduce` does not always start at 0.

**`ch3-typescript/mutationAudit.ts`** — Four functions that all add an item to a
list, all return the same values, and all pass a return-value test. Two of them
change the caller's array. Which two? The test finds out by running them.

**`ch3-typescript/plantedBug.ts`** — An implementation an assistant wrote, together
with the four tests it wrote for itself. All four pass. The code is still wrong.
Find an input that proves it. Do not fix the code; produce the evidence.

Then: the full four-condition specification gradient in `AI-EXPERIMENTS.md`, and
score the generated tests with `REVIEWING-AI-TESTS.md`.

## A note on how these are checked

Almost every exercise here grades you by **measuring the real system** rather than by
comparing you to a stored answer. The merge exercise runs real `git`. The jsdom
exercise renders the component and probes the test environment. The mutation audit
runs each function on a real array and watches what happens to it.

The one exception is the toolchain exercise in Chapter 1, which compares against a
fixed table inside `ch1-setup/checks.ts`, because "which command surfaces this kind
of failure" is a fact about the course's tooling rather than something a test can
observe about itself. You can go and read that table. You can also read the expected
values in `functions.test.ts` for the Chapter 3 task. Reading the tests is a good
habit and this course encourages it — but the exercises are worth nothing to you if
you look first, so predict, commit, and then look.

`npm test` is **red on this branch on purpose**. The failing tests are the
assignment, exactly like the other `task-` branches in this course.
