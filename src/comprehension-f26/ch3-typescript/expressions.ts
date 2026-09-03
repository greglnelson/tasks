/**
 * The code the Chapter 3 comprehension exercises ask you about.
 * Read it. Do not change it.
 */

/** E1: keep the even numbers, then multiply each by 10. */
export function e1(): number[] {
    return [1, 2, 3, 4, 5, 6]
        .filter((n: number): boolean => n % 2 === 0)
        .map((n: number): number => n * 10);
}

/** E2: parse each string, turning anything unparseable into 0. */
export function e2(): number[] {
    return ["1", "x", "30", "$4"].map((text: string): number => {
        const parsed = parseInt(text);
        return isNaN(parsed) ? 0 : parsed;
    });
}

/** E3: add up the numbers, starting from 0. */
export function e3(): number {
    return [1, 2, 3, 4].reduce(
        (total: number, n: number): number => total + n,
        0,
    );
}

/** E4: filter, then reduce -- note the starting value. */
export function e4(): number {
    return [1, 2, 3, 4, 5]
        .filter((n: number): boolean => n > 3)
        .reduce((total: number, n: number): number => total + n, 100);
}

// ---------------------------------------------------------------------------
// Four ways to "add an item to a list". Two of them change the caller's array.

/** A1 */
export function addWithPush(list: number[], value: number): number[] {
    list.push(value);
    return list;
}

/** A2 */
export function addWithSpread(list: number[], value: number): number[] {
    return [...list, value];
}

/** A3 */
export function addWithConcat(list: number[], value: number): number[] {
    return list.concat(value);
}

/** A4 */
export function addWithSplice(list: number[], value: number): number[] {
    list.splice(list.length, 0, value);
    return list;
}
