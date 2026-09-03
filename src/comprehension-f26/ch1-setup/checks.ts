/**
 * Shared checking logic for the Chapter 1 exercises.
 * Both your test file and the reference-solution test file use these, so the
 * two are graded by exactly the same code. You do not need to edit this file.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { MergeOutcome, MergeScenario, Symptom, Tool } from "./types";

/** Which tool actually surfaces each symptom. */
const CORRECT_TOOL: Record<Symptom, Tool> = {
    // ESLint is the only one of the five that reports an unused binding.
    "unused-import": "npm run lint",
    // A type error is a compile-time fact; Jest never type-checks (Babel just
    // strips the types), so only the TypeScript compiler sees this.
    "wrong-return-type": "npx tsc --noEmit",
    // Types are satisfied, so tsc is silent. Only running the code catches it.
    "wrong-return-value": "npm test",
    // jsdom does not load .css files at all, so no test can see this.
    "unstyled-page-but-green-tests": "open the running app in a browser",
    // `npm run build` prints the path the production bundle assumes.
    "wrong-deployed-asset-path": "npm run build",
};

export function correctTools(): Record<Symptom, Tool> {
    return { ...CORRECT_TOOL };
}

function git(cwd: string, args: string[]): { status: number; stdout: string } {
    const result = spawnSync("git", args, { cwd, encoding: "utf-8" });
    if (result.error !== undefined) {
        throw new Error(
            "Could not run `git`. This exercise checks your prediction against " +
                "real git, so git must be on your PATH: " +
                result.error.message,
        );
    }
    return { status: result.status ?? 1, stdout: result.stdout };
}

const ANCESTOR = "first line\nsecond line\nthird line\n";
const YOURS = "MY OWN FIRST LINE\nsecond line\nthird line\n";
const THEIRS = "THEIR FIRST LINE\nsecond line\nthird line\n";

/**
 * Builds a throwaway git repository, performs the real merge for `scenario`,
 * and reports what git actually did. No answer key involved.
 */
export function actualMergeOutcome(scenario: MergeScenario): MergeOutcome {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "merge-model-"));
    const file = path.join(dir, "shared.txt");
    try {
        git(dir, ["init", "-q"]);
        git(dir, ["config", "user.email", "student@example.com"]);
        git(dir, ["config", "user.name", "Student"]);
        git(dir, ["config", "commit.gpgsign", "false"]);

        // The common ancestor both sides are compared against.
        fs.writeFileSync(file, ANCESTOR);
        git(dir, ["add", "."]);
        git(dir, ["commit", "-q", "-m", "ancestor"]);
        const base = git(dir, [
            "rev-parse",
            "--abbrev-ref",
            "HEAD",
        ]).stdout.trim();

        // Their side (the instructor's task branch). Both sides always commit
        // something, so every case below is a genuine three-way merge and never
        // a fast-forward -- otherwise we would be demonstrating a different
        // mechanism than the one the exercise is about.
        git(dir, ["checkout", "-q", "-b", "theirs"]);
        if (scenario === "only-you-changed-it") {
            fs.writeFileSync(path.join(dir, "their-notes.txt"), "unrelated\n");
            git(dir, ["add", "."]);
        } else {
            fs.writeFileSync(file, THEIRS);
        }
        git(dir, ["commit", "-q", "-am", "their commit"]);

        // Your side.
        git(dir, ["checkout", "-q", base]);
        if (scenario === "only-they-changed-it") {
            fs.writeFileSync(path.join(dir, "my-notes.txt"), "unrelated\n");
            git(dir, ["add", "."]);
        } else {
            fs.writeFileSync(file, YOURS);
        }
        git(dir, ["commit", "-q", "-am", "my commit"]);

        git(dir, ["merge", "--no-edit", "theirs"]);

        // Unmerged paths are listed by `git ls-files -u`; non-empty means conflict.
        if (git(dir, ["ls-files", "-u"]).stdout.trim() !== "") {
            return "conflict";
        }
        const merged = fs.readFileSync(file, "utf-8");
        if (merged === YOURS) {
            return "keeps your version";
        }
        if (merged === THEIRS) {
            return "takes their version";
        }
        throw new Error("Unexpected merge result:\n" + merged);
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

/** Runs all three real merges and reports what git actually did. */
export function actualMergeOutcomes(): Record<MergeScenario, MergeOutcome> {
    return {
        "only-you-changed-it": actualMergeOutcome("only-you-changed-it"),
        "only-they-changed-it": actualMergeOutcome("only-they-changed-it"),
        "you-both-changed-the-same-lines": actualMergeOutcome(
            "you-both-changed-the-same-lines",
        ),
    };
}
