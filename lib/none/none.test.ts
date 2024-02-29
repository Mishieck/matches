import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { contains } from '../contains/contains.ts';
import { equals } from '../equals/equals.ts';
import { none } from './none.ts';
import { Compare } from '../types/match.types.ts';

export const runNone: ModuleRunner = describe => {
  describe('none', it => {
    it('should check if none of the items in an iterable satisfies a particular condition', expect => {
      expect(none(equals(2))([1]), toEqual(true));
      expect(none(equals(2))([1, 1]), toEqual(true));
      expect(none(equals('b'))('cc'), toEqual(true));
      expect(none(equals(2))(new Set([1, 1])), toEqual(true));
      expect(none(equals(1))(new Set([1, 1])), toEqual(false));
      expect(none(contains(2) as Compare)(new Map([['a', 1]])), toEqual(true));
      expect(none(contains(1) as Compare)(new Map([['a', 1]])), toEqual(false));
      expect(none(equals(1))([1, 2]), toEqual(false));
    });
  });
};

export const run = mod('None', runNone);
