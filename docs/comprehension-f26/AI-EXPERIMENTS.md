# The AI Experiments

You are going to use AI assistants for the rest of your career. This course's
position is that you should find out *empirically* what they are good at, on
problems where you are qualified to judge the answer — which is why every
experiment here runs on exercises you have just done yourself.

Record every run in `data/ai-experiment-log.csv`. One row per run. The columns are
already there; fill them in as you go, and do not go back and tidy the failures out.
The failures are the data.

## The specification gradient

Four conditions. The **same problem** each time. Use a fresh chat for every
condition — a warmed-up conversation is a contaminated experiment.

| Condition | What the assistant gets |
| --- | --- |
| **A. Vague** | One line, the way you would naturally type it. "Make the header look better." "Write an average function." Nothing else. |
| **B. Tests given** | The test file, pasted in. |
| **C. Spec of the tests, in prose** | An English description of what the tests check — every case, every boundary — but no test code. |
| **D. AI writes the tests** | The chapter prose only. Ask it to write tests first, then implement against them. |

For each run, record: how many of the *real* tests pass, how many defects you find
by reading the code, and — for D — how the generated tests score on the rubric in
`REVIEWING-AI-TESTS.md`.

The question to answer in your write-up is not "which condition won". It is:
**what is the cheapest artefact I can write that gets the assistant to a correct
answer?** If C does as well as B, then writing prose specifications is a better use
of your time than writing tests first. If only B works, that tells you something
about how much of your job is now writing tests. If D looks great until you read the
tests, that is the most important result of all.

## Batch capacity

Take N independent problems from the chapter. Run them two ways:

- **One at a time**, fresh chat each, N prompts.
- **All at once**, a single prompt containing all N.

Record tests passed per problem in each mode, and where in the batch the failures
land. The specific thing to look for: does quality decay toward the *end* of a batch,
and does it decay faster for stateful UI code (Chapter 4) than for pure functions
(Chapter 3)?

Chapter 2 is the natural batch experiment: its task is already seven independent
requirements. Chapter 3 is the natural gradient experiment: its functions are pure,
so "correct" is unambiguous.

## Per-chapter protocol

### Chapter 1 — baseline

Before you have written anything, ask an assistant: *"In this project, which command
would catch each of these five problems?"* and paste the five symptoms from
`toolchain.ts`. Do not tell it the answers. Score it out of 5 against your own
now-graded answers.

This is a deliberately easy question that assistants often get partly wrong, because
the interesting one — the unstyled page with a green test suite — has no command that
catches it. Note whether the assistant invents one.

### Chapter 2 — batch, plus the blind-test problem

1. Run the batch experiment on the seven HTML/CSS requirements.
2. Then the real one: paste `QuestionCard.tsx` and ask the assistant *"write a test
   that proves this button is styled correctly."* Read what it gives you against
   your `whatTestsCantSee.ts` answers. Does it write an assertion that cannot fail?
   That is exactly the bug that survived a whole semester of this course.

### Chapter 3 — the full gradient

Run all four conditions on the Arrays functions. Then run condition D on `average`
from `plantedBug/` and compare the tests it writes to the ones already in that file.
Did it think of the empty list?

## Writing it up

One page. What you measured, what surprised you, and what you will do differently
next time you reach for an assistant. Include at least one run where the assistant
was confidently wrong, and say how you noticed.
