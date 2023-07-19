import { mod, toEqual, type ModuleRunner, expect } from '../../../deps.ts';
import * as helpers from './data-value-getters.ts';

export const runDataValueGetterTests: ModuleRunner = describe => {
  describe('Value Getters', it => {
    it('should get head of an iterable collection', expect => {
      expect(helpers.getOnlyItem([1]), toEqual(1));
      expect(helpers.getOnlyItem([1]), toEqual(1));
      expect(helpers.getOnlyItem('match'), toEqual('m'));
      expect(helpers.getOnlyItem('m'), toEqual('m'));
      expect(helpers.getOnlyItem(['match', 'pattern']), toEqual('match'));
      expect(helpers.getOnlyItem(new Set([1])), toEqual(1));
      expect(helpers.getOnlyItem(new Map([[1, true]])), toEqual([1, true]));
    });

    it('should get head and tail of iterables', expect => {
      expect(helpers.getHeadAndTail([1, 2]), toEqual([1, [2]]));
      expect(helpers.getHeadAndTail([1]), toEqual([1, []]));
      expect(helpers.getHeadAndTail('match'), toEqual(['m', 'atch']));
      expect(helpers.getHeadAndTail('m'), toEqual(['m', '']));
      expect(
        helpers.getHeadAndTail(['match', 'pattern']),
        toEqual(['match', ['pattern']])
      );
      expect(
        helpers.getHeadAndTail(new Set([1, 2])),
        toEqual([1, new Set([2])])
      );
      expect(
        helpers.getHeadAndTail(
          new Map([
            [1, 1],
            [2, 2]
          ])
        ),
        toEqual([[1, 1], new Map([[2, 2]])])
      );
    });

    it('should get the last element of array-like collection', expect => {
      expect(helpers.getLast([1, 2]), toEqual(2));
      expect(helpers.getLast([1]), toEqual(1));
      expect(helpers.getLast('match'), toEqual('h'));
      expect(helpers.getLast('m'), toEqual('m'));
      expect(helpers.getLast(['match', 'pattern']), toEqual('pattern'));
      expect(helpers.getLast(new Set([1])), toEqual(1));
      expect(helpers.getLast(new Set([1, 2])), toEqual(2));
      expect(helpers.getLast(new Map([[1, 2]])), toEqual([1, 2]));
    });

    it('should get the last and the rest of the elements of an iterable', expect => {
      expect(helpers.getLastAndRest([1, 2]), toEqual([[1], 2]));
      expect(helpers.getLastAndRest([1]), toEqual([[], 1]));
      expect(helpers.getLastAndRest('match'), toEqual(['matc', 'h']));
      expect(helpers.getLastAndRest('m'), toEqual(['', 'm']));
      expect(
        helpers.getLastAndRest(['match', 'pattern']),
        toEqual([['match'], 'pattern'])
      );
      expect(
        helpers.getLastAndRest(new Set([1, 2])),
        toEqual([new Set([1]), 2])
      );
      expect(
        helpers.getLastAndRest(
          new Map([
            [1, 1],
            [2, 2]
          ])
        ),
        toEqual([new Map([[1, 1]]), [2, 2]])
      );
    });

    it('should get object values', expect => {
      const { property, rest } = helpers.getPropertyValues([
        'property',
        'rest'
      ])({ property: 'value', another: '1' });

      expect(property, toEqual('value'));
      expect(rest, toEqual({ another: '1' }));
    });
  });
};

export const run = () => mod('dataValueGetters', runDataValueGetterTests);
