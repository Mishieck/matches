import { mod, toEqual, type ModuleRunner, toBeInstanceOf } from '../../deps.ts';
import type { Compare } from './match.types.ts';
import match from './match.ts';

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
  });
};

export const run = () => mod('Match', runMatch);
