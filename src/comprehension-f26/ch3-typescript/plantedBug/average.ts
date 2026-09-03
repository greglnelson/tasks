/**
 * THE SPECIFICATION, as it was given to the AI assistant:
 *
 *   "Write `average(numbers)`, which returns the mean of the numbers.
 *    An empty list has an average of 0."
 *
 * This is the implementation the assistant produced. It has a real defect.
 * Do not fix it -- your job in this exercise is to catch it.
 */
export function average(numbers: number[]): number {
    return (
        numbers.reduce((total: number, n: number): number => total + n, 0) /
        numbers.length
    );
}

/**
 * These are the test cases the assistant wrote for its own implementation,
 * as [input, expectedOutput] pairs. Every one of them passes.
 *
 * A green suite is not the same as a correct implementation. Read these as a
 * reviewer: what did the assistant never think to ask about?
 */
export const AI_WRITTEN_CASES: [number[], number][] = [
    [[1, 2, 3], 2],
    [[10], 10],
    [[2, 4], 3],
    [[5, 5, 5, 5], 5],
];
