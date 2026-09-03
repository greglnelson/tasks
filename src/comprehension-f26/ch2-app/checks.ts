/**
 * Shared checking logic for Chapter 2. Nothing here is an answer key: each
 * value is measured by rendering the real component and probing jsdom.
 * You do not need to edit this file.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { getRoles } from "@testing-library/dom";
import { QuestionCard } from "./QuestionCard";
import { Claim } from "./types";

/** Bootstrap 5's `.btn-primary` background colour. */
const BOOTSTRAP_PRIMARY = "rgb(13, 110, 253)";

/**
 * The distinct MEANINGFUL roles QuestionCard exposes, sorted.
 * Plain <div> elements carry an implicit "generic" role that says nothing about
 * the interface, so it is filtered out.
 */
export function actualRoles(): string[] {
    const { container, unmount } = render(React.createElement(QuestionCard));
    const roles = Object.keys(getRoles(container))
        .filter((role: string): boolean => role !== "generic")
        .sort();
    unmount();
    return roles;
}

/** The text of the heading QuestionCard actually renders. */
export function actualHeadingText(): string {
    const { unmount } = render(React.createElement(QuestionCard));
    const heading = screen.getByRole("heading");
    const text = heading.textContent ?? "";
    unmount();
    return text;
}

/**
 * Measures, for each claim, whether jsdom can actually verify it.
 * This is an experiment, not a lookup table.
 */
export function measureWhatJsdomCanSee(): Record<Claim, boolean> {
    const { unmount } = render(React.createElement(QuestionCard));
    const button = screen.getByRole("button", { name: /Log Hello World/i });
    const leftBox = screen.getByTestId("left-box");
    const rightBox = screen.getByTestId("right-box");

    // A class name lives in the markup, so jsdom has it.
    const hasClass = button.classList.contains("btn-primary");

    // The PAINT implied by that class comes from bootstrap's stylesheet, which
    // jsdom never loads. jsdom reports "ButtonFace" here -- the browser's own
    // default grey for a <button> -- which is precisely the unstyled button the
    // real bug produced on the real page.
    const painted = window.getComputedStyle(button).backgroundColor;
    const isPaintedBlue = painted === BOOTSTRAP_PRIMARY;

    // jsdom performs no layout: every element measures 0x0 at position 0,0,
    // so "side by side" is not a question it can answer.
    const left = leftBox.getBoundingClientRect();
    const right = rightBox.getBoundingClientRect();
    const sideBySide = left.width > 0 && right.width > 0 && right.x > left.x;

    // Text is in the DOM.
    const textPresent = screen.queryAllByText(/Log Hello World/i).length > 0;

    // An INLINE style is an attribute on the element, so jsdom does have it.
    // This is the distinction the chapter is teaching.
    const inlineRed = leftBox.style.backgroundColor === "red";

    unmount();
    return {
        "button-has-btn-primary-class": hasClass,
        "button-is-painted-blue": isPaintedBlue,
        "boxes-are-side-by-side": sideBySide,
        "button-text-is-present": textPresent,
        "boxes-have-inline-red-background": inlineRed,
    };
}
