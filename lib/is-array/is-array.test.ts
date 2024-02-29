import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isArray } from './is-array.ts';

export const runIsArray: ModuleRunner = describe => {
  describe('isArray', it => {
    it('should check if a given value is an array', expect => {
      expect(isArray()([]), toEqual(true));
      expect(isArray()(''), toEqual(false));
    });
  });
};

export const run = mod('IsArray', runIsArray);
