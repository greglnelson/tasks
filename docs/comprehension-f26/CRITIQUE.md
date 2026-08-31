# Self-Critique

A pass over the Chapters 1–3 material, looking for the places where it is weaker
than it looks. Four things were found and fixed; four are real limitations that are
better stated than hidden.

## Fixed during this pass

**1. The merge exercise was demonstrating the wrong mechanism.**
In the "only they changed it" scenario, my side had no commit, so `git merge` did a
**fast-forward** — it moved a pointer rather than performing a three-way merge. The
outcome shown to the student was right, but it was produced by a different mechanism
than the one the exercise claims to teach, and it would not have generalised to the
real case in Chapter 4 (where the student always has commits of their own). Both
sides now always commit, so all three scenarios are genuine three-way merges. The
reference solution still passes, which is the point: the model held.

**2. My own reference solution for the jsdom exercise was wrong.**
I asserted that jsdom would report no background colour for an unstyled Bootstrap
button. It reports `ButtonFace` — the browser's own default grey. Because the
exercise measures rather than consults a key, the harness caught me. The check now
compares against Bootstrap's real `rgb(13, 110, 253)`, and `ButtonFace` turned out to
be a *better* illustration than what I had planned, since it is literally the grey
button the original bug produced.

**3. The role-prediction exercise disagreed with reality.**
`getRoles` reports the implicit `generic` role carried by every plain `<div>`.
Including it would have made the exercise about a testing-library implementation
detail instead of about interface semantics. It is now filtered out, and the stub
says so explicitly rather than leaving students to discover it from a diff.

**4. `checks.ts` called `expect()` outside a test file.**
This failed lint (`no-undef`, since the jest env is only enabled for `*.test.ts`),
and it was bad structure regardless: measurement and assertion were tangled. The
`checks` modules are now pure — they return measured values — and every assertion
lives in a test file. Same behaviour, better seam, and it means the measurement
functions could themselves be tested.

## Real limitations, stated rather than papered over

**1. A self-checking prediction exercise can be passed by running it first.**
This is inherent: the failure message shows the measured value, so a student who
runs before predicting can copy the answer. There is no way to have both immediate
feedback and tamper-proof prediction in the same artefact. The mitigation is
procedural, not technical — `TASKS.md` requires predictions to be committed before
the tests are run, which makes the git log the evidence. Worth being honest that
this is a norm backed by an audit trail, not an enforcement mechanism. If it needs
to be enforced, the right move is an instructor script that checks the prediction
commit precedes the passing commit, not a cleverer test.

**2. One exercise still uses a fixed answer key.**
`CORRECT_TOOL` in `ch1-setup/checks.ts` is a lookup table, and a student who reads
that file has the answers. Everything else is measured. This one resists measurement
because "which command surfaces this class of failure" is a fact about the course's
tooling, not something a unit test can observe about itself. It is no worse than the
course's existing tests — `functions.test.ts` spells out every expected value — but
it is the one place the "measure, don't assert" principle breaks, and `TASKS.md`
flags it for stripping.

**3. The exercises are heavily weighted toward prediction over generation.**
Five of the six ask the student to predict; only the planted-bug exercise asks them
to *produce* something (a counterexample). That is a deliberate trade against the
"reasonably simple" requirement, and it is defensible for a comprehension-first
pass placed *before* each chapter's existing coding task — the generation practice
is the existing task. But if these ever replace rather than precede that task, the
balance is wrong and at least one Parsons-style construction exercise per chapter
should be added.

**4. The AI experiments are designed but not yet run.**
`AI-EXPERIMENTS.md` specifies the four conditions, the batch protocol and the CSV
schema, and the planted-bug exercise is built from a realistic example of what
generated tests miss. But no actual runs have been done, so the claims about *what
students will find* are predictions, not results. The first cohort produces the
baseline. The CSV schema is the deliverable here, not a finding.

## One thing I would change if this went further

The three chapters share a shape — `types.ts`, stubs, `checks.ts`, `solutions/` —
that is now repeated three times with no shared abstraction. That is fine at three
chapters and would be a maintenance problem at seven. Before extending this to
Chapters 4–7, the measurement helpers should move to a single
`src/comprehension-f26/harness/` module, so a change to how predictions are graded
happens in one place instead of seven.
