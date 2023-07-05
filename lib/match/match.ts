import type { Compare } from './match.types.ts';

export type Entry = [Compare | Array<Compare>, CallableFunction];

const match =
  (value: unknown) =>
  (...map: Array<Entry>) => {
    for (const [isMatch, handleMatch] of map) {
      const matches =
        typeof isMatch === 'function'
          ? isMatch(value)
          : isMatch.every(matches => matches(value));

      if (matches) return handleMatch(value);
    }

    return new Error(`No match found for value ${JSON.stringify(value)}.`);
  };

export default match;
