import { ModuleRunner, mod, toEqual } from '../../deps.ts';
import { hasProperty } from './has-property.ts';

export const runHasProperty: ModuleRunner = describe => {
  describe('hasProperty', it => {
    it('should check if an object has a given property', expect => {
      expect(hasProperty('property')({ property: 'property' }), toEqual(true));
    });
  });
};

export const run = mod('HasProperty', runHasProperty);
