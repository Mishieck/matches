import { mod, toEqual, type ModuleRunner, toBeInstanceOf } from '../../deps.ts';
import type { Compare } from './match.types.ts';
import * as helpers from './helpers.ts';
import match, { type Entry } from './match.ts';

export const runMatch: ModuleRunner = describe => {
  describe('match', it => {
    const isEqualTo1: Compare = value => value === 1;
    const isNumber: Compare = value => typeof value == 'number';
    const constant = () => 1;

    it('should handle single matchers', expect => {
      let value = 0;
      const setValue = (val: number) => (value = val);

      expect(match(1)([isEqualTo1, setValue]), toEqual(1));
      expect(match(0)([isEqualTo1, constant]), toBeInstanceOf(Error));
      expect(value, toEqual(1));
    });

    it('should handle multiple matchers', expect => {
      let value = 0;
      const setValue = (val: number) => (value = val);

      expect(match(1)([[isNumber, isEqualTo1], setValue]), toEqual(1));
      expect(
        match(0)([[isNumber, isEqualTo1], constant]),
        toBeInstanceOf(Error)
      );
      expect(value, toEqual(1));
    });

    it('should pick the first match', expect => {
      const identity = (value: unknown) => value;
      const multiplyBy = (factor: number) => (value: number) => factor * value;

      const entries: Array<Entry> = [
        [helpers.isLessThan(1) as Compare, multiplyBy(0)],
        [helpers.equals(1) as Compare, multiplyBy(1)],
        [helpers.isGreaterThan(1) as Compare, multiplyBy(2)]
      ];

      expect(match(0)(...entries), toEqual(0));
      expect(match(1)(...entries), toEqual(1));
      expect(match(2)(...entries), toEqual(4));
    });
  });
};

export const run = () => mod('Match', runMatch);
