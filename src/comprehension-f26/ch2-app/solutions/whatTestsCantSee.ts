import { Claim } from "../types";

/**
 * Reference solution.
 *
 * The rule: jsdom has the MARKUP (class names, text, attributes, inline styles)
 * but neither a stylesheet nor a layout engine. So anything that depends on a
 * `.css` file being applied, or on elements having real size and position, is
 * invisible to a Jest test — which is exactly how finding F26-08 survived a
 * fully green test suite.
 */
export const SEEN_BY_JSDOM: Record<Claim, boolean> = {
    "button-has-btn-primary-class": true,
    "button-is-painted-blue": false,
    "boxes-are-side-by-side": false,
    "button-text-is-present": true,
    "boxes-have-inline-red-background": true,
};
