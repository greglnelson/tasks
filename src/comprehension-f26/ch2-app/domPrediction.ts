/**
 * COMPREHENSION EXERCISE 1 — From JSX to the DOM.
 *
 * Read `QuestionCard.tsx`. Without running it, predict the set of ARIA roles
 * that its markup exposes, and the text of its heading.
 *
 * Roles are how both screen readers and `screen.getByRole(...)` see your page,
 * so being able to predict them is the difference between writing a test that
 * describes the user's experience and one that describes your div soup.
 *
 * List every DISTINCT role, lowercase, sorted alphabetically, with no duplicates
 * (three <li> elements contribute the role "listitem" once). Ignore the implicit
 * "generic" role that plain <div> elements carry -- it tells a reader nothing.
 *
 * The stub below is deliberately incomplete.
 */
export const PREDICTED_ROLES: string[] = ["button"];

/** The exact text of the heading element in QuestionCard. */
export const PREDICTED_HEADING_TEXT = "TODO: predict the heading text";
