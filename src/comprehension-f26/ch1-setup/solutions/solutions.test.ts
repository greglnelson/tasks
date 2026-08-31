import { CATCHES } from "./toolchain";
import { MERGE_OUTCOME } from "./gitModel";
import { correctTools, actualMergeOutcomes } from "../checks";

/**
 * Proof that the Chapter 1 exercises are solvable: the reference solutions are
 * measured by exactly the same functions as the student answers.
 */
describe("Chapter 1 reference solutions", () => {
    test("the toolchain solution passes", () => {
        expect(CATCHES).toEqual(correctTools());
    });
    test("the merge-model solution matches real git", () => {
        expect(MERGE_OUTCOME).toEqual(actualMergeOutcomes());
    }, 60000);
});
