import { Symptom, Tool } from "../types";

/** Reference solution for the toolchain exercise. */
export const CATCHES: Record<Symptom, Tool> = {
    "unused-import": "npm run lint",
    "wrong-return-type": "npx tsc --noEmit",
    "wrong-return-value": "npm test",
    "unstyled-page-but-green-tests": "open the running app in a browser",
    "wrong-deployed-asset-path": "npm run build",
};
