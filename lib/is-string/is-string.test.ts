import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isString } from './is-string.ts';

export const runIsString: ModuleRunner = describe => {
  describe('isString', it => {
    it('should check if a given value is string', expect => {
      expect(isString()(''), toEqual(true));
      expect(isString()(true), toEqual(false));
      expect(isString()(new String('')), toEqual(false));
    });
  });
};

export const run = mod('IsString', runIsString);
