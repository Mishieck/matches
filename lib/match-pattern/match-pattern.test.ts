import { mod, toEqual, type ModuleRunner, toBeInstanceOf } from '../../deps.ts';
import type { PatternEntry } from './helpers.ts';
import matchPattern from './match-pattern.ts';

export const runMatch: ModuleRunner = describe => {
  describe('matchPattern', it => {
    const identity = (value: unknown) => value;

    it('should match literals', expect => {
      expect(matchPattern(1)(['1', identity]), toEqual(1));
      expect(matchPattern(1n)(['1n', identity]), toEqual(1n));
      expect(matchPattern('match')(['"match"', identity]), toEqual('match'));
      expect(matchPattern(0)(['', identity]), toBeInstanceOf(Error));
    });

    it('should match any value', expect => {
      expect(matchPattern(1)(['_', identity]), toEqual(1));
      expect(matchPattern(1n)(['_', identity]), toEqual(1n));
      expect(matchPattern('match')(['_', identity]), toEqual('match'));
      expect(matchPattern(null)(['_', identity]), toEqual(null));
      expect(matchPattern(undefined)(['_', identity]), toEqual(undefined));
    });

    it('should match only item', expect => {
      expect(matchPattern([1])(['[item]', identity]), toEqual(1));
    });

    it('should match head and tail', expect => {
      expect(
        matchPattern([1, 2])(['[head, ...tail]', identity]),
        toEqual([1, [2]])
      );
      expect(
        matchPattern([1])(['[head, ...tail]', identity]),
        toEqual([1, []])
      );
      expect(
        matchPattern('match')(['[head, ...tail]', identity]),
        toEqual(['m', 'atch'])
      );
      expect(
        matchPattern(['match', 'pattern'])(['[head, ...tail]', identity]),
        toEqual(['match', ['pattern']])
      );
    });

    it('should match last', expect => {
      expect(matchPattern([1, 2])(['[..._, last]', identity]), toEqual(2));
      expect(matchPattern([1])(['[..._, last]', identity]), toEqual(1));
    });

    it('should match binary operations', expect => {
      expect(matchPattern(0)(['value < 1', identity]), toEqual(0));
      expect(matchPattern(1)(['value <= 1', identity]), toEqual(1));
      expect(matchPattern(1)(['value >= 1', identity]), toEqual(1));
      expect(matchPattern(2)(['value > 1', identity]), toEqual(2));
      expect(matchPattern(1)(['value === 1', identity]), toEqual(1));
      expect(matchPattern(1)(['value != 0', identity]), toEqual(1));
    });

    it('should pick first correct match', expect => {
      const entries: Array<PatternEntry> = [
        ['1', (value: number) => `Matched number ${value}`],
        ['"match"', (value: number) => `Matched string "${value}"`],
        [
          '[head, ...tail]',
          (value: number) => `Matched head and tail ${JSON.stringify(value)}`
        ],
        ['[head]', (value: number) => `Matched head ${value}`],
        ['_', (value: number) => `Matched any ${value}`]
      ];

      expect(matchPattern(1)(...entries), toEqual('Matched number 1'));

      expect(
        matchPattern('match')(...entries),
        toEqual('Matched string "match"')
      );

      expect(
        matchPattern([1, 2])(...entries),
        toEqual('Matched head and tail [1,[2]]')
      );

      expect(matchPattern('')(...entries), toEqual('Matched any '));
    });
  });
};

export const run = () => mod('Match', runMatch);
