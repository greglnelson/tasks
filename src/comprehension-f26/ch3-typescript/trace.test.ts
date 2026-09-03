import {
    PREDICTED_E1,
    PREDICTED_E2,
    PREDICTED_E3,
    PREDICTED_E4,
} from "./trace";
import { e1, e2, e3, e4 } from "./expressions";

describe("Chapter 3 comprehension — tracing pipelines", () => {
    test("(1 pts) You traced e1 (filter then map)", () => {
        expect(PREDICTED_E1).toEqual(e1());
    });
    test("(1 pts) You traced e2 (map with a fallback)", () => {
        expect(PREDICTED_E2).toEqual(e2());
    });
    test("(1 pts) You traced e3 (reduce from 0)", () => {
        expect(PREDICTED_E3).toEqual(e3());
    });
    test("(1 pts) You traced e4 (reduce from a non-zero start)", () => {
        expect(PREDICTED_E4).toEqual(e4());
    });
});
