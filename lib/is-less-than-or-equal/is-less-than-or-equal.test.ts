import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isLessThanOrEqual } from './is-less-than-or-equal.ts';

export const runIsLessThanOrEqual: ModuleRunner = describe => {
  describe('isLessThanOrEqual', it => {
    it('should check if given value is less than or equal to another value', expect => {
      expect(isLessThanOrEqual(1)(0), toEqual(true));
      expect(isLessThanOrEqual(1)(1), toEqual(true));
      expect(isLessThanOrEqual(1)(2), toEqual(false));
    });
  });
};

export const run = mod('IsLessThanOrEqual', runIsLessThanOrEqual);
