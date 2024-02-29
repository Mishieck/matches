import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasMaxSize } from './has-max-size.ts';

export const runHasMaxSize: ModuleRunner = describe => {
  describe('hasMaxSize', it => {
    it('should check if a set or map has a given size', expect => {
      expect(hasMaxSize(1)(new Set([1])), toEqual(true));
      expect(hasMaxSize(1)(new Map([[1, 1]])), toEqual(true));
    });
  });
};

export const run = mod('HasMaxSize', runHasMaxSize);
