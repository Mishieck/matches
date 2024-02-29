import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isNumber } from './is-number.ts';

export const runIsNumber: ModuleRunner = describe => {
  describe('isNumber', it => {
    it('should check if a given value is a number', expect => {
      expect(isNumber()(1), toEqual(true));
      expect(isNumber()(NaN), toEqual(true));
      expect(isNumber()(1n), toEqual(false));
    });
  });
};

export const run = mod('IsNumber', runIsNumber);
