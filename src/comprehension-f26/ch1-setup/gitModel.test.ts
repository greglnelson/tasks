import { MERGE_OUTCOME } from "./gitModel";
import { actualMergeOutcomes } from "./checks";

describe("Chapter 1 comprehension — predicting a merge", () => {
    test("(3 pts) Your predictions match what real git does", () => {
        expect(MERGE_OUTCOME).toEqual(actualMergeOutcomes());
    }, 60000);
});
