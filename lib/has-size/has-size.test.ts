import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasSize } from './has-size.ts';

export const runHasSize: ModuleRunner = describe => {
  describe('hasSize', it => {
    it('should check if a set or map has a given size', expect => {
      expect(hasSize(0)(new Set()), toEqual(true));
      expect(hasSize(1)(new Set([1])), toEqual(true));
      expect(hasSize(0)(new Map()), toEqual(true));
      expect(hasSize(1)(new Map([[1, 1]])), toEqual(true));
    });
  });
};

export const run = mod('HasSize', runHasSize);
