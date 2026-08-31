import { MergeOutcome, MergeScenario } from "./types";

/**
 * COMPREHENSION EXERCISE 2 — Predict what a merge does.
 *
 * In Chapter 4 you will run `git merge upstream/task-state` and it will produce
 * merge conflicts. That is intentional and the chapter says so. Conflicts are
 * only frightening if you do not have a model of what git is doing, so let's
 * build the model now, while nothing is at stake.
 *
 * The model, in one sentence: **git compares BOTH your side and their side
 * against the common ancestor**, and only asks you to decide when both sides
 * changed the same region.
 *
 * Predict the outcome for each situation. Then run the test — it does not check
 * you against an answer key. It creates three real git repositories, performs
 * the three real merges, and compares your prediction to what git actually did.
 *
 * (All three stubs are set to "conflict"; that is the right answer for only one.)
 */
export const MERGE_OUTCOME: Record<MergeScenario, MergeOutcome> = {
    "only-you-changed-it": "conflict",
    "only-they-changed-it": "conflict",
    "you-both-changed-the-same-lines": "conflict",
};
