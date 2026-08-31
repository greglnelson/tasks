import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("The Quizzer renders", () => {
        // Up to you to decide what the rest of your tests are!
        // Add more tests, more components, more test files!
        expect(screen.getByText(/Quizzer/i)).toBeInTheDocument();
    });
});
