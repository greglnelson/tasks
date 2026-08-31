import {
    PREDICTED_E1,
    PREDICTED_E2,
    PREDICTED_E3,
    PREDICTED_E4,
} from "./trace";
import { MUTATES } from "./mutationAudit";
import { COUNTEREXAMPLE } from "./plantedBug";
import { e1, e2, e3, e4 } from "../expressions";
import { measureMutation, evaluateCounterexample } from "../checks";

describe("Chapter 3 reference solutions", () => {
    test("the traces are right", () => {
        expect(PREDICTED_E1).toEqual(e1());
        expect(PREDICTED_E2).toEqual(e2());
        expect(PREDICTED_E3).toEqual(e3());
        expect(PREDICTED_E4).toEqual(e4());
    });
    test("the mutation audit matches measured behaviour", () => {
        expect(MUTATES).toEqual(measureMutation());
    });
    test("the counterexample really does expose the planted bug", () => {
        expect(evaluateCounterexample(COUNTEREXAMPLE)).toEqual({
            aiSuiteIsGreen: true,
            isNewCase: true,
            exposesTheBug: true,
        });
    });
});
