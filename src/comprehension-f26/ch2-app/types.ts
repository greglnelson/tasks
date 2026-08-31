/** Shared vocabulary for the Chapter 2 exercises. You do not need to edit this. */

/**
 * Claims about how <QuestionCard /> looks and behaves. Every one of these is
 * TRUE of the real page in a real browser. The question is a different one:
 * can a Jest test, running in jsdom, actually SEE it?
 */
export type Claim =
    /** The button element carries the CSS class `btn-primary`. */
    | "button-has-btn-primary-class"
    /** The button is actually painted Bootstrap blue. */
    | "button-is-painted-blue"
    /** The two red boxes sit side by side rather than stacked. */
    | "boxes-are-side-by-side"
    /** The text "Log Hello World" appears on the page. */
    | "button-text-is-present"
    /** The red boxes have an inline backgroundColor of red. */
    | "boxes-have-inline-red-background";
