/**
 * Shared vocabulary for the Chapter 1 comprehension exercises.
 * You do not need to edit this file.
 */

/** The tools this course gives you for finding out that something is wrong. */
export type Tool =
    | "npm run lint"
    | "npx tsc --noEmit"
    | "npm test"
    | "npm run build"
    | "open the running app in a browser";

/** Symptoms you might observe. Each one is caught by exactly one Tool above. */
export type Symptom =
    | "unused-import"
    | "wrong-return-type"
    | "wrong-return-value"
    | "unstyled-page-but-green-tests"
    | "wrong-deployed-asset-path";

/**
 * What git does to one file when you merge a branch into yours.
 * Git compares BOTH sides against the common ancestor to decide.
 */
export type MergeOutcome =
    | "keeps your version"
    | "takes their version"
    | "conflict";

/** The three merge situations you will actually meet in this course. */
export type MergeScenario =
    /** You changed the file; the task branch did not touch it. */
    | "only-you-changed-it"
    /** You did not touch the file; the task branch changed it. */
    | "only-they-changed-it"
    /** You changed the file AND the task branch changed the same lines. */
    | "you-both-changed-the-same-lines";
