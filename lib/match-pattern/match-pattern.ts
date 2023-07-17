import match, { type Entry } from '../match/match.ts';
import { getMatcher } from './helpers/get-matcher.ts';
import type { PatternEntry } from './helpers/data-value-getters.ts';

/**
 * Uses string pattern matching to conditionally execute code.
 *
 * @param value - The value to match against. It can be of any type.
 * @returns a function that takes a list of arguments where each argument is an
 *   array with 2 elements. The first element is a pattern against which the
 *   value is going to be matched. The second element is a function that will
 *   be executed if the pattern matches. The function (second element) takes
 *   different types of arguments depending on the nature of the pattern. The
 *   return value (of the function returned by `matchPattern`) is the value
 *   returned by the executed function.
 * @example
 * ```ts
 * const value = 300;
 *
 * const clampedValue = matchPattern(value)(
 *   ['value < 0', () => 0],
 *   ['value > 255', () => 255],
 *   ['_', (value: number) => value]
 * );
 *
 * console.log(clampedValue); // 255
 * ```
 * @example
 * ```ts
 * const sum = (numbers: Array<number>) => match(numbers)(
 *   ['[]', () => 0],
 *   [
 *     '[head, ...tail]',
 *     ([head, tail]: HeadAndTail) => head + (sum(tail) as number)
 *   ]
 * );
 *
 * const total = sum([1, 2, 3]);
 * console.log(total); // 6
 * ```
 */
const matchPattern =
  <Result = unknown>(value: unknown) =>
  (...entries: Array<PatternEntry>) =>
    match<Result>(value)(
      ...entries.map(([pattern, handle]) => {
        const [isMatch, getValue] = getMatcher(pattern);
        // console.log({ pattern, isMatch, getValue });
        return [isMatch, (value: unknown) => handle(getValue(value))] as Entry;
      })
    );

export default matchPattern;
