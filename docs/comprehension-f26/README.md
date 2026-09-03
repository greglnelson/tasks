# Comprehension Exercises — Chapters 1–3

This branch adds a short set of comprehension exercises that sit **before** each
chapter's existing coding task, plus a protocol for running experiments on AI coding
assistants.

Start with **`TASKS.md`**.

- `TASKS.md` — what to do, in order, and the one rule that matters (commit your
  predictions before you run the tests).
- `AI-EXPERIMENTS.md` — the four-condition specification gradient and the batch
  experiment. Record runs in `data/ai-experiment-log.csv`.
- `REVIEWING-AI-TESTS.md` — an 8-point checklist for reviewing tests an assistant
  wrote, with a worked example of a bad test and its repair.

The exercises themselves live in `src/comprehension-f26/`. Each one is an exported
constant you edit; run them with `npm test`.

`npm test` is red on this branch on purpose — the failing tests are the assignment.
