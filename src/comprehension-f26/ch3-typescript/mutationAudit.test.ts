import { MUTATES } from "./mutationAudit";
import { measureMutation } from "./checks";

describe("Chapter 3 comprehension — the immutability audit", () => {
    test("(4 pts) You predicted which implementations mutate their input", () => {
        expect(MUTATES).toEqual(measureMutation());
    });
});
