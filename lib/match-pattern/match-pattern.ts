import match, { type Entry } from '../match/match.ts';
import { getMatcher, type PatternEntry } from './helpers.ts';

const matchPattern =
  <Result = unknown>(value: unknown) =>
  (...entries: Array<PatternEntry>) =>
    match<Result>(value)(
      ...entries.map(([pattern, handle]) => {
        const [isMatch, getValue] = getMatcher(pattern);
        console.log({ pattern, isMatch, getValue });
        return [isMatch, (value: unknown) => handle(getValue(value))] as Entry;
      })
    );

export default matchPattern;
