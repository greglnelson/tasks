# Reviewing Tests an AI Wrote

An assistant's test suite tells you which cases it thought of. The bug is always in
the ones it did not. This is a checklist you can actually apply, worth 8 points.

## The checklist

**1. Does any test fail on an empty implementation? (1 pt)**
Replace the implementation body with `return 0` / `return []` / `return <div />`
and re-run. If the suite still passes, it tests nothing. This is the single fastest
way to detect a worthless suite.

**2. Are the boundaries covered? (2 pts)**
For each parameter, ask: empty, one element, duplicates, negative, zero, the value
just below and just above any threshold. One point for numeric/collection
boundaries, one for the "nothing at all" case — empty array, empty string, no
selection. *This is the check that catches the planted bug in Chapter 3: the
assistant wrote four tests for `average` and not one of them used an empty list.*

**3. Would the test survive a correct refactor? (1 pt)**
If you rename an internal variable or restructure the JSX without changing what the
user sees, does the test still pass? Tests that assert on implementation details —
state variable names, exact DOM nesting, `container.firstChild` — will break on
every legitimate change and train you to ignore red.

**4. Does it query the way a user perceives the page? (1 pt)**
`getByRole`, `getByLabelText`, `getByText` describe what a person (or a screen
reader) encounters. `container.querySelector(".css-1x2y3z")` describes your div soup.

**5. Does any assertion actually constrain anything? (1 pt)**
Watch for assertions that cannot fail:
`expect(wrapper).toBeTruthy()`, `expect(result).toEqual(result)`,
`expect(fn).not.toThrow()` on a function that never throws — and, the real one from
this course, `expect(banner).not.toHaveStyle({"background-color": "rgb(40,44,52)"})`
in an environment that loads no stylesheets, so the element has no background colour
at all and the assertion is satisfied by doing nothing. See finding F26-09.

**6. Can the environment even see what is claimed? (1 pt)**
Jest runs in jsdom, which has no stylesheet and no layout engine. Any test claiming
something is *blue*, *centred*, *visible*, *side by side*, or *200 pixels wide* is
either lying or measuring an inline style. You did this exercise in Chapter 2.

**7. Do the test names describe behaviour? (1 pt)**
"returns the correct value" is not a description. "returns 0 for an empty list" is.
A suite whose names are all interchangeable is a suite nobody will maintain.

## Repairing a bad test — worked example

An assistant produced this for the `ColoredBox` component:

```tsx
test("the colored box works", () => {
    const { container } = render(<ColoredBox />);
    expect(container.firstChild).toBeTruthy();
    const button = container.querySelector("button");
    button?.click();
    expect(container).toBeTruthy();
});
```

Score: **0/8.** It fails checks 1, 3, 4, 5 and 7 outright. `toBeTruthy()` on a
rendered container is true for every component that renders anything at all,
including one that renders an empty `<div>`. The click's effect is never asserted.
`container.querySelector("button")` breaks the moment the button moves. And the name
says nothing.

The repair — same intent, actual constraints:

```tsx
test("clicking Next Color advances red -> blue -> green and wraps", async () => {
    render(<ColoredBox />);
    const button = screen.getByRole("button", { name: /Next Color/i });
    expect(screen.getByTestId("colored-box")).toHaveStyle({
        backgroundColor: "red"
    });
    await act(async () => button.click());
    expect(screen.getByTestId("colored-box")).toHaveStyle({
        backgroundColor: "blue"
    });
    await act(async () => button.click());
    expect(screen.getByTestId("colored-box")).toHaveStyle({
        backgroundColor: "green"
    });
    await act(async () => button.click());
    expect(screen.getByTestId("colored-box")).toHaveStyle({
        backgroundColor: "red"
    });
});
```

Note what makes this one legitimate under check 6: the colour is set as an **inline
style** on the element, which is an attribute in the DOM, so jsdom really can see it.
Had the component set the colour through a CSS class, this assertion would have been
unverifiable and the honest test would have to check the class name instead — and say
so in a comment.
