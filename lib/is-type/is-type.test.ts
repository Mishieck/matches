import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isType } from './is-type.ts';

export const runIsType: ModuleRunner = describe => {
  describe('isType', it => {
    it('should handle data types', expect => {
      expect(isType('bigint')(1n), toEqual(true));
      expect(isType('boolean')(true), toEqual(true));
      expect(
        isType('function')(() => {}),
        toEqual(true)
      );
      expect(isType('object')({}), toEqual(true));
      expect(isType('number')(1), toEqual(true));
      expect(isType('string')(''), toEqual(true));
      expect(isType('symbol')(Symbol(1)), toEqual(true));
      expect(isType('undefined')(undefined), toEqual(true));
    });
  });
};

export const run = mod('IsType', runIsType);
