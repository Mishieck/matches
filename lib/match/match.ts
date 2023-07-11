import type { Compare } from './match.types.ts';

export type Entry = [Compare | Array<Compare>, CallableFunction];
export type MatchResult<Result = unknown> = Result | Error;

/**
 * Matches a value against conditions and executes the function related to the
 *   first condition for which the value passes. It works like the switch
 *   statement. The check for matches can be performed by any of numerous
 *   checkers that are provided for you.
 *
 * @param value - The value to match against.
 * @returns a function that takes a list of arguments where each argument is
 *   and array of two values. The first value is a function or an array of
 *   functions that check the value against a particular condition. The second
 *   value is the function to be executed if the related check passes. The
 *   function (second value) takes the value passed to `match` as an argument
 *   and returns any type of value. The return value of `match` is the value
 *   returned by the executed function. If no match is found, an Error is
 *   returned.
 * @example
 * ```ts
 * const value = 3;
 *
 * const increment = match(value)(
 *   [isLessThan(0) as Compare, () => -1],
 *   [equals(0) as Compare, () => 0],
 *   [isGreaterThan(0) as Compare, () => 1]
 * );
 *
 * console.log(increment) // 1
 * ```
 * @example
 * ```ts
 * const sum = (numbers: Array<number>) => match<number>(numbers)(
 *     [hasLength(0) as Compare, () => 0],
 *     [
 *       hasMinLength(1) as Compare,
 *       (arr: Array<number>) => arr[0] + (sum(arr.slice(1) as number))
 *     ]
 *   );
 *
 * const total = sum([1, 2, 3]);
 * console.log(total) // 6
 * ```
 */
const match =
  <Result = unknown>(value: unknown) =>
  (...entries: Array<Entry>): MatchResult<Result> => {
    for (const [isMatch, handleMatch] of entries) {
      const matches =
        typeof isMatch === 'function'
          ? isMatch(value)
          : isMatch.every(matches => matches(value));

      if (matches) return handleMatch(value);
    }

    return new Error(`No match found for value ${JSON.stringify(value)}.`);
  };

export default match;
