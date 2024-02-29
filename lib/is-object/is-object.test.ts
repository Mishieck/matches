import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isObject } from './is-object.ts';

export const runIsObject: ModuleRunner = describe => {
  describe('isObject', it => {
    it('should check if a given value is object', expect => {
      expect(isObject()({}), toEqual(true));
      expect(isObject()(null), toEqual(true));
      expect(isObject()([]), toEqual(true));
      expect(isObject()(true), toEqual(false));
    });
  });
};

export const run = mod('IsObject', runIsObject);
