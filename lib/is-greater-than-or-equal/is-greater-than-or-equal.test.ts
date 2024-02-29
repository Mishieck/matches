import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isGreaterThanOrEqual } from './is-greater-than-or-equal.ts';

export const runIsGreaterThanOrEqual: ModuleRunner = describe => {
  describe('isGreaterThanOrEqual', it => {
    it('should check if given value is greater than or equal to another value', expect => {
      expect(isGreaterThanOrEqual(1)(2), toEqual(true));
      expect(isGreaterThanOrEqual(1)(1), toEqual(true));
      expect(isGreaterThanOrEqual(1)(0), toEqual(false));
    });
  });
};

export const run = mod('IsGreaterThanOrEqual', runIsGreaterThanOrEqual);
