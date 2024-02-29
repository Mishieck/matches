import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { isFunction } from './is-function.ts';

export const runIsFunction: ModuleRunner = describe => {
  describe('isFunction', it => {
    it('should check if a value is a function', expect => {
      expect(
        isFunction()(() => {}),
        toEqual(true)
      );
      expect(
        isFunction()(function () {}),
        toEqual(true)
      );
      expect(isFunction()(Number), toEqual(true));
      expect(isFunction()({}), toEqual(false));
    });
  });
};

export const run = mod('IsFunction', runIsFunction);
