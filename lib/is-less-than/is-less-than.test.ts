import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isLessThan } from './is-less-than.ts';

export const runIsLessThan: ModuleRunner = describe => {
  describe('isLessThan', it => {
    it('should check if given value is less than another value', expect => {
      expect(isLessThan(1)(0), toEqual(true));
      expect(isLessThan(1)(1), toEqual(false));
    });
  });
};

export const run = mod('IsLessThan', runIsLessThan);
