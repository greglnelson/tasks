/**
 * Shared checking logic for Chapter 3. Predictions are compared against
 * measured behaviour, not against an answer key. You do not need to edit this.
 */
import {
    addWithConcat,
    addWithPush,
    addWithSplice,
    addWithSpread,
} from "./expressions";
import { AddImplementation } from "./types";
import { average, AI_WRITTEN_CASES } from "./plantedBug/average";

/** Runs each implementation on a fresh array and reports whether it mutated it. */
export function measureMutation(): Record<AddImplementation, boolean> {
    const probe = (
        implementation: (list: number[], value: number) => number[],
    ): boolean => {
        const original = [1, 2, 3];
        implementation(original, 4);
        return original.length !== 3;
    };
    return {
        addWithPush: probe(addWithPush),
        addWithSpread: probe(addWithSpread),
        addWithConcat: probe(addWithConcat),
        addWithSplice: probe(addWithSplice),
    };
}

/**
 * The specification the AI was given, written out as code:
 * the mean of the numbers, and 0 for an empty list.
 */
export function averageAccordingToSpec(numbers: number[]): number {
    return numbers.length === 0 ?
            0
        :   numbers.reduce((total: number, n: number): number => total + n, 0) /
                numbers.length;
}

/** A report on whether the student's counterexample does its job. */
export interface CounterexampleReport {
    /** Every test case the assistant wrote for itself still passes. */
    aiSuiteIsGreen: boolean;
    /** The student found an input the assistant had not already covered. */
    isNewCase: boolean;
    /** On that input, the implementation disagrees with its specification. */
    exposesTheBug: boolean;
}

export function evaluateCounterexample(
    counterexample: number[],
): CounterexampleReport {
    const aiSuiteIsGreen = AI_WRITTEN_CASES.every(
        ([input, expected]: [number[], number]): boolean =>
            average(input) === expected,
    );
    const isNewCase = !AI_WRITTEN_CASES.some(
        ([input]: [number[], number]): boolean =>
            JSON.stringify(input) === JSON.stringify(counterexample),
    );
    const exposesTheBug = !Object.is(
        average(counterexample),
        averageAccordingToSpec(counterexample),
    );
    return { aiSuiteIsGreen, isNewCase, exposesTheBug };
}
