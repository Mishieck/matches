import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasMinLength } from './has-min-length.ts';

export const runHasMinLength: ModuleRunner = describe => {
  describe('hasMinLength', it => {
    it('should check if an ArrayLike collection has length greater than or equal to specified value', expect => {
      expect(hasMinLength(1)([1]), toEqual(true));
      expect(hasMinLength(3)('code'), toEqual(true));
    });
  });
};

export const run = mod('HasMinLength', runHasMinLength);
