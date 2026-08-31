import { PREDICTED_ROLES, PREDICTED_HEADING_TEXT } from "./domPrediction";
import { SEEN_BY_JSDOM } from "./whatTestsCantSee";
import {
    actualRoles,
    actualHeadingText,
    measureWhatJsdomCanSee,
} from "../checks";

describe("Chapter 2 reference solutions", () => {
    test("the role prediction solution matches the rendered DOM", () => {
        expect(PREDICTED_ROLES).toEqual(actualRoles());
    });
    test("the heading prediction solution is right", () => {
        expect(PREDICTED_HEADING_TEXT).toEqual(actualHeadingText());
    });
    test("the jsdom-visibility solution matches measured reality", () => {
        expect(SEEN_BY_JSDOM).toEqual(measureWhatJsdomCanSee());
    });
});
