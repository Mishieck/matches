import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isGreaterThan } from './is-greater-than.ts';

export const runIsGreaterThan: ModuleRunner = describe => {
  describe('isGreaterThan', it => {
    it('should check if given value is greater than another value', expect => {
      expect(isGreaterThan(0)(1), toEqual(true));
      expect(isGreaterThan(1)(1), toEqual(false));
    });
  });
};

export const run = mod('IsGreaterThan', runIsGreaterThan);
