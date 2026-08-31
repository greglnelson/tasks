# Textbook Upgrade Proposal — Chapters 1–3

Three rewrites, one per chapter. Each is finished prose, ready to paste into the
book, not a note about what someone should write later.

---

## Chapter 1 — Setup

### The problem

The chapter introduces five commands (`npm run start`, `npm run test:cov`,
`npm run lint`, `npm run build`, and the type checker via VS Code) without ever
saying what distinguishes them. Students come away believing the tests are the
authority on whether their work is correct. The smoke test of this book found a
defect that had made every Bootstrap component in the course render unstyled for a
semester, with a fully green test suite the whole time (finding F26-08). The
students were not careless. They were told the wrong thing.

The chapter also never introduces git's merge model, and then Chapter 4 deliberately
hands students three-way merge conflicts.

### BEFORE

> So far, we only have one test, which checks to make sure that the text `COS420`
> is in your website's content somewhere. If you ever decide to remove that text,
> remember to update that test case to check something similar.

### AFTER

> So far, we only have one test, which checks that the text `COS420` is in your
> website's content somewhere. If you ever decide to remove that text, remember to
> update that test case to check something similar.
>
> Before you go further, it is worth being precise about what that test does and
> does not tell you, because this course gives you **five different instruments**
> and they do not overlap:
>
> | Command | Answers the question |
> | --- | --- |
> | `npm run lint` | Is this code written the way this project writes code? |
> | `npx tsc --noEmit` | Do the types fit together? |
> | `npm test` | Does the code produce the right *values*? |
> | `npm run build` | Will this compile and deploy? |
> | `npm run start`, then *look at it* | Does the page actually work for a person? |
>
> Notice the last row. It is not a command that reports a verdict; it is you,
> looking. There is a real class of failure that only that row can catch — and it
> is not hypothetical. For an entire semester, this course shipped a repository
> where every Bootstrap button rendered as a plain grey box and two-column layouts
> stacked vertically, because the Bootstrap stylesheet was never loaded. All the
> tests passed, every time, for everyone. The tests were not badly written. They run
> in a simulated browser called jsdom that does not load `.css` files at all, so
> the styling simply was not there to check.
>
> A green test suite means "the cases somebody thought of still behave as they
> did". It does not mean "this works". Run the app and look at it.

### Also add to Chapter 1: the merge model

Two paragraphs, placed at the end of *Branching Out*, immediately after the existing
warning about merge conflicts:

> That warning is going to come true, on purpose, in Chapter 4 — so let's make sure
> conflicts are boring before they are urgent.
>
> When you merge, git does not compare your branch to theirs. It compares **both of
> them to their common ancestor**, one file at a time. If only you moved away from
> the ancestor, there is nothing to decide and your version stands. If only they
> moved, theirs does. Git only stops and asks you when *both* sides changed the same
> region — because that is the only case where it has no basis for choosing. A
> conflict is not an error. It is git declining to guess.

### Exercises added

`src/comprehension-f26/ch1-setup/` — `toolchain.ts` (map five real symptoms to the
instrument that catches them) and `gitModel.ts` (predict three merge outcomes).
The merge exercise does not grade against an answer key: it builds three throwaway
repositories, runs the three real merges, and compares the student's prediction to
what git actually did.

---

## Chapter 2 — Basic App

### The problem

The chapter's contract with the student is "pass the tests". The smoke test found
that one of its graded tests — worth 2 of the 14 points — **passed on completely
unmodified code** (finding F26-09), and that the whole task could be completed with
a visibly broken page. This is the best available teaching moment in the entire book
and the chapter currently spends it on nothing.

### BEFORE

> To earn full points, you must pass all the tests.

### AFTER

> To earn full points, you must pass all the tests **and the page must actually
> look right when you run it**. Those are two different requirements, and this is
> the chapter where you find out why.
>
> Before you start, open `src/comprehension-f26/ch2-app/` and do the two prediction
> exercises there. The second one asks you to decide, for five true statements about
> a page, which ones a test could actually verify. The answers are not in an answer
> key — the test renders the component and measures what the testing environment can
> and cannot see.
>
> Here is the short version, which you should confirm rather than take on faith:
> a test can see the **markup** — class names, text, attributes, inline styles —
> because those are in the document. It cannot see anything that requires a
> stylesheet to have been loaded or a layout to have been performed. So
> `expect(button).toHaveClass("btn-primary")` is a real assertion, and
> "the button is blue" and "the columns are side by side" are, in a Jest test,
> unverifiable no matter how you phrase them.
>
> This is not a quirk to memorise. It is the reason the last section of this task
> asks you to *look at your page in a browser* before you submit, and it is why the
> requirement above has two halves.

---

## Chapter 3 — TypeScript

### The problem

The chapter's four tasks are the most automatable content in the book: pure
functions, fully specified by tests, in a popular language. A student can make all
44 tests green in about ninety seconds with an assistant and learn nothing. The
chapter's own framing invites exactly that.

### BEFORE

> This stuff never makes sense just reading about it. Let's try working on some
> problems instead!

### AFTER

> This stuff never makes sense just reading about it — but "working on problems"
> now means something different than it did a few years ago. An assistant can make
> every test in this chapter green in about a minute, and if you let it, you will
> arrive at Chapter 4 unable to read the code you shipped.
>
> So this chapter asks you to do three things in order.
>
> **First, trace.** Before you write any of the array functions, do the tracing
> exercises in `src/comprehension-f26/ch3-typescript/`. You predict what four
> pipelines evaluate to; the test runs them and compares. The ability to predict
> what `filter().map().reduce()` produces is the single best predictor of being able
> to write it, and it is the thing an assistant cannot do on your behalf.
>
> **Second, audit.** Four functions in that folder all add an item to a list, all
> return the same values, and all pass a test that checks only return values. Two of
> them quietly modify the caller's array. Predict which. This is the immutability
> rule the task is about to enforce, turned into something you can see rather than
> something you are told.
>
> **Third, review.** Then, and only then, bring in an assistant — and run the
> experiments in `docs/comprehension-f26/AI-EXPERIMENTS.md` while you do. You will
> give the same problem four ways: vaguely, with the tests, with a written
> description of the tests, and with the assistant writing its own tests. Write down
> what happens. The last of those is where the interesting failure lives, and the
> planted-bug exercise shows you the shape of it: an implementation with a real
> defect, and four generated tests that all pass and never once try an empty list.

### Exercises added

`src/comprehension-f26/ch3-typescript/` — `trace.ts` (four predictions, checked by
running the real expressions), `mutationAudit.ts` (four predictions, checked by
running each implementation on a real array and watching it), and `plantedBug.ts`
(find an input that exposes a defect the AI's own tests miss).
