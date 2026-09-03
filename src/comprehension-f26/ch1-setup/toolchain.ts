import { Symptom, Tool } from "./types";

/**
 * COMPREHENSION EXERCISE 1 — Which tool catches which failure?
 *
 * This course gives you five different ways to find out that something is wrong.
 * They do NOT overlap. Each of the symptoms below is caught by exactly one of
 * them, and running the wrong one tells you nothing.
 *
 * Replace each answer below with the tool that would actually catch that symptom.
 * (Every stub here is deliberately set to "npm test" — that is a wrong answer for
 * four of the five.)
 *
 * The symptoms, in English:
 *
 *  - "unused-import":
 *        A file imports `Button` but never uses it.
 *
 *  - "wrong-return-type":
 *        A function is declared `: Question` but its body is `return {};`.
 *
 *  - "wrong-return-value":
 *        `shout("")` returns `""` when the specification says it must return "!".
 *        The types are fine. The value is wrong.
 *
 *  - "unstyled-page-but-green-tests":
 *        Every Bootstrap button renders as a plain grey browser button and your
 *        two columns stack on top of each other instead of sitting side by side.
 *        The whole test suite passes. (This really happened in this course —
 *        the stylesheet was never loaded, and no test could see it.)
 *
 *  - "wrong-deployed-asset-path":
 *        The site works on your machine, but you need to know what path the
 *        production bundle assumes it will be hosted at.
 */
export const CATCHES: Record<Symptom, Tool> = {
    "unused-import": "npm test",
    "wrong-return-type": "npm test",
    "wrong-return-value": "npm test",
    "unstyled-page-but-green-tests": "npm test",
    "wrong-deployed-asset-path": "npm test",
};
