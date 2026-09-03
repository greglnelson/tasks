import { SEEN_BY_JSDOM } from "./whatTestsCantSee";
import { measureWhatJsdomCanSee } from "./checks";

describe("Chapter 2 comprehension — what a test can and cannot see", () => {
    test("(5 pts) You predicted which claims jsdom can verify", () => {
        expect(SEEN_BY_JSDOM).toEqual(measureWhatJsdomCanSee());
    });
});
