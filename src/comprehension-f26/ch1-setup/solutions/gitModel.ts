import { MergeOutcome, MergeScenario } from "../types";

/**
 * Reference solution for the merge-prediction exercise.
 *
 * Git compares both sides to the common ancestor. If only one side moved away
 * from the ancestor, there is nothing to decide and that side wins. Only when
 * both sides changed the same region does git hand the decision back to you.
 */
export const MERGE_OUTCOME: Record<MergeScenario, MergeOutcome> = {
    "only-you-changed-it": "keeps your version",
    "only-they-changed-it": "takes their version",
    "you-both-changed-the-same-lines": "conflict",
};
