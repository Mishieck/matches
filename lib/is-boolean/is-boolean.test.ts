import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isBoolean } from './is-boolean.ts';

export const runIsBoolean: ModuleRunner = describe => {
  describe('isBoolean', it => {
    it('should check if a given value is boolean', expect => {
      expect(isBoolean()(true), toEqual(true));
      expect(isBoolean()(false), toEqual(true));
      expect(isBoolean()('true'), toEqual(false));
    });
  });
};

export const run = mod('IsBoolean', runIsBoolean);
