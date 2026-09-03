import { AddImplementation } from "./types";

/**
 * COMPREHENSION EXERCISE 2 — Which of these mutate their input?
 *
 * The Arrays task tells you: "You must also avoid mutating the original arrays -
 * all changes must be immutable!" That rule is only usable if you can look at an
 * implementation and tell whether it breaks it.
 *
 * All four functions in `expressions.ts` return a list with the value added, and
 * all four would pass a test that only checks the RETURN VALUE. Two of them also
 * change the array the caller passed in. That difference is invisible until it
 * suddenly is not -- it is the reason Chapter 4's components fail to re-render.
 *
 * For each one, predict whether calling it mutates the caller's array.
 *
 * There is no answer key. The test calls each function on a real array and
 * watches what happens to it.
 */
export const MUTATES: Record<AddImplementation, boolean> = {
    addWithPush: false,
    addWithSpread: false,
    addWithConcat: false,
    addWithSplice: false,
};
