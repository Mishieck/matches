import match, { type Entry } from '../match/match.ts';
import { getMatcher, type PatternEntry } from './helpers.ts';

const matchPattern =
  (value: unknown) =>
  (...entries: Array<PatternEntry>) =>
    match(value)(
      ...entries.map(([pattern, handle]) => {
        const [isMatch, getValue] = getMatcher(pattern, value);
        console.log({ pattern, isMatch, getValue });
        return [isMatch, (value: unknown) => handle(getValue(value))] as Entry;
      })
    );

export default matchPattern;
