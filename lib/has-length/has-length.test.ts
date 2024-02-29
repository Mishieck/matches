import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasLength } from './has-length.ts';

export const runHasLength: ModuleRunner = describe => {
  describe('hasLength', it => {
    it('should check if an ArrayLike collection has length equal to a given value', expect => {
      expect(hasLength(0)([]), toEqual(true));
      expect(hasLength(1)([1]), toEqual(true));
      expect(hasLength(0)(''), toEqual(true));
      expect(hasLength(4)('code'), toEqual(true));
    });
  });
};

export const run = mod('HasLength', runHasLength);
