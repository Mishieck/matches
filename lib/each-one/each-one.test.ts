import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { equals } from '../equals/equals.ts';
import { eachOne } from './each-one.ts';

export const runEachOne: ModuleRunner = describe => {
  describe('eachOne', it => {
    it('should check if each item in an iterable satisfies a particular condition', expect => {
      expect(eachOne(equals(1))([1]), toEqual(true));
      expect(eachOne(equals(1))([1, 1]), toEqual(true));
      expect(eachOne(equals('c'))('cc'), toEqual(true));
      expect(eachOne(equals(1))(new Set([1, 1])), toEqual(true));
      expect(eachOne(equals(1))(new Map([['a', 1]])), toEqual(false));
      expect(eachOne(equals(1))([1, 2]), toEqual(false));
    });
  });
};

export const run = mod('EachOne', runEachOne);
