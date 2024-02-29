import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasMaxLength } from './has-max-length.ts';

export const runHasMaxLength: ModuleRunner = describe => {
  describe('hasMaxLength', it => {
    it('should check if an ArrayLike collection has length less than or equal to specified value', expect => {
      expect(hasMaxLength(1)([1]), toEqual(true));
      expect(hasMaxLength(4)('code'), toEqual(true));
    });
  });
};

export const run = mod('HasMaxLength', runHasMaxLength);
