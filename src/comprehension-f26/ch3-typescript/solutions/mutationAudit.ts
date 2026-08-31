import { AddImplementation } from "../types";

/**
 * Reference solution.
 *
 * `push` and `splice` are mutating methods: they change the array they are
 * called on and the caller sees it, because the caller handed over a reference.
 * The spread form and `concat` both build a NEW array and leave the original
 * alone. All four return the same values, which is exactly why a test that only
 * checks return values cannot tell them apart.
 */
export const MUTATES: Record<AddImplementation, boolean> = {
    addWithPush: true,
    addWithSpread: false,
    addWithConcat: false,
    addWithSplice: true,
};
