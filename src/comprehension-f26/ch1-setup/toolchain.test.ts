import { CATCHES } from "./toolchain";
import { correctTools } from "./checks";

describe("Chapter 1 comprehension — the toolchain", () => {
    test("(5 pts) You can say which tool catches which failure", () => {
        expect(CATCHES).toEqual(correctTools());
    });
});
