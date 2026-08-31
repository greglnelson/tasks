import { PREDICTED_ROLES, PREDICTED_HEADING_TEXT } from "./domPrediction";
import { actualRoles, actualHeadingText } from "./checks";

describe("Chapter 2 comprehension — predicting the DOM", () => {
    test("(3 pts) You predicted the roles QuestionCard exposes", () => {
        expect(PREDICTED_ROLES).toEqual(actualRoles());
    });
    test("(1 pts) You predicted the heading text", () => {
        expect(PREDICTED_HEADING_TEXT).toEqual(actualHeadingText());
    });
});
