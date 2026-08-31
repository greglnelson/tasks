/**
 * Reference solution.
 *
 * The specification says an empty list averages 0. The implementation divides
 * the sum by `numbers.length`, so on an empty list it computes 0 / 0 = NaN.
 *
 * None of the assistant's four test cases uses an empty list. That is the
 * pattern to look for when reviewing generated tests: they cover the shape of
 * the example the author was picturing, and skip the boundaries -- empty,
 * single element, duplicates, negatives, zero.
 */
export const COUNTEREXAMPLE: number[] = [];
