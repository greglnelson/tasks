import { COUNTEREXAMPLE } from "./plantedBug";
import { evaluateCounterexample } from "./checks";

describe("Chapter 3 comprehension — reviewing the AI's tests", () => {
    test("(4 pts) You found an input the AI's tests never covered", () => {
        expect(evaluateCounterexample(COUNTEREXAMPLE)).toEqual({
            aiSuiteIsGreen: true,
            isNewCase: true,
            exposesTheBug: true,
        });
    });
});
