import { Claim } from "./types";

/**
 * COMPREHENSION EXERCISE 2 — What a test can and cannot see.
 *
 * This is the most important idea in the chapter, and it comes from a real bug
 * in this very course.
 *
 * For an entire semester, this repository used `react-bootstrap` (which ships
 * components) without ever installing `bootstrap` (which ships the stylesheet).
 * Every Bootstrap button rendered as a plain grey browser button and the
 * two-column layout stacked vertically. **All ten tests passed the whole time.**
 * See docs/smoketest-f26/FINDINGS.md, finding F26-08.
 *
 * The tests were not badly written. They were blind. Jest renders into jsdom,
 * and jsdom does not load `.css` files at all — so a class name is visible to a
 * test while the styling that class implies is not.
 *
 * Every claim in `types.ts` is TRUE of the real page. For each one, predict
 * whether a Jest test running in jsdom can actually verify it.
 *
 * The test does not use an answer key. It renders the component and probes
 * jsdom for each claim, then compares reality to your prediction.
 *
 * (Every stub is set to `true`; that is wrong for some of them.)
 */
export const SEEN_BY_JSDOM: Record<Claim, boolean> = {
    "button-has-btn-primary-class": true,
    "button-is-painted-blue": true,
    "boxes-are-side-by-side": true,
    "button-text-is-present": true,
    "boxes-have-inline-red-background": true,
};
