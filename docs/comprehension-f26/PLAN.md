# Comprehension-First, AI-Aware Redesign — Plan for Chapters 1–3

Author's note: this plan and the work under it were produced in one sequence — plan first,
then Chapter 1, 2, 3 in order, then a self-critique pass. Written on branch
`comprehension-f26`, based on `smoketest-f26` so the redesign sits on top of a repository
that has actually been verified to work.

## The problem we are solving

The current book is **build-first**: a chapter explains a construct, then hands the student
a failing test suite and asks them to make it green. That worked well when the bottleneck
was "can you write the code". In 2026 the bottleneck has moved. A student can now make any
of Chapters 1–3's tests green in about ninety seconds without reading a line of the chapter.

So a green test suite no longer evidences comprehension. Two things follow, and they are the
two pillars of this redesign.

**Pillar A — Comprehension before production.** Assess reading and explaining *before* and
*alongside* writing. Draw on what the literature actually supports: code tracing predicts
code writing; Parsons problems isolate structure from syntax; worked examples with faded
scaffolding beat unguided practice for novices; self-explanation prompts produce durable
gains; and "explain in plain English" (EiPE) performance tracks program comprehension better
than output prediction alone. The constraint we set ourselves: **a comprehension exercise a
machine can check is worth far more than one it cannot**, because it can be practised at
volume, graded at scale, and — critically — used as the measuring instrument in Pillar B.

**Pillar B — Learning to use AI, empirically.** Rather than banning AI or waving at it, make
the student *run experiments on it* and keep the data. Three questions, asked in every
chapter:

1. **Batch capacity** — can the assistant do N of this chapter's problems in one prompt as
   well as one at a time? Where does quality fall off?
2. **The specification gradient** — the same problem given four ways:
   - **A. Vague** — a one-line ask, no tests, no spec.
   - **B. Tests given** — the test file is handed to the assistant.
   - **C. Spec of the tests, in prose** — what the tests check, described in English; no test code.
   - **D. AI writes the tests** — the assistant derives tests from the chapter prose, then implements against them.
3. **Reviewing AI-written tests** — how do you tell a good generated test from a bad one?

Condition D is the one that matters most and is hardest to grade, which is why every chapter
also ships a rubric and at least one *planted-bug* exercise where a plausible generated test
suite passes over a real defect.

## Design decisions (and why)

**1. This branch behaves like a course task branch.** Upstream `task-*` branches ship stubs
whose tests fail by design; that is the idiom students already know. So student-facing files
here are stubs and their tests **fail on purpose**. Solvability is not left as a promise: each
chapter ships `solutions/` with a reference implementation and a solutions test that runs the
same assertions and passes. Expected pass/fail counts are recorded in `VERIFICATION.md` and
were produced by actually running the suite.

**2. Every stub type-checks.** The smoke test found that `task-objects` ships
`return {};` for a `Question`, so `npm run start` fails before the student writes anything
(finding F26-12). We do not repeat that mistake: every stub here compiles, and is wrong only
in its *values*.

**3. Comprehension answers are data, not prose.** Predictions are exported constants —
`PREDICTED_OUTPUT`, `CATCHES`, `MERGE_OUTCOME` — that a test compares against reality. The
student commits an answer, the machine grades it, and the same file doubles as the artifact
an instructor reads.

**4. The AI experiments reuse the chapter's own exercises.** No separate toy problems. The
thing the student just understood is the thing they measure the assistant on, so they are
qualified to judge the output. Results go in one CSV
(`docs/comprehension-f26/data/ai-experiment-log.csv`) that aggregates across a class.

**5. The redesign is grounded in the smoke test, not invented.** Chapter 2's centrepiece is
the real defect found while smoke-testing this book: Bootstrap's stylesheet was never
imported, so `<Button>` and the two-column layout were visibly broken **while all ten tests
passed** (finding F26-08), and the "change the header colour" test could never fail
(F26-09). That is the single best available demonstration that green tests are not
comprehension — and it is true, from this course, this semester.

## What each chapter gets

| Chapter | Comprehension target | Exercises | AI experiment |
| --- | --- | --- | --- |
| 1 — Setup | The toolchain as a system; git's three-way merge as a *model*, before Chapter 4 makes it urgent | `toolchain.ts`, `gitModel.ts` | Baseline: can the assistant tell you which tool catches which failure? |
| 2 — Basic App | JSX → DOM; **what a test can and cannot see** | `domPrediction.tsx`, `whatTestsCantSee.ts` | Batch (7 requirements at once) + full A/B/C/D gradient |
| 3 — TypeScript | Tracing `map`/`filter`/`reduce`; immutability; a type signature as a specification | `trace.ts`, `pipelineOrder.ts`, `plantedBug.ts` | Full gradient + reviewing generated tests against a planted bug |

Chapter 1 deliberately teaches the merge model early. The smoke test showed Chapter 4 hits
students with three-way merge conflicts — intentionally and well-documented — but the *model*
that makes those conflicts legible ("git compares both sides to the common ancestor") is
never taught. Two exported constants in Chapter 1 fix that at almost no cost.

## Out of scope for this pass

Chapters 4–7. Chapter 6 does not exist yet (finding F26-22) and needs content decisions that
are the instructor's to make, not a redesign pass's. Chapter 5's Quizzer is where the AI
experiments should eventually culminate — it is the only genuinely under-specified,
multi-requirement task in the book — but it needs `task-quizzer` regenerated first (F26-19).
