import * as matchHelpers from '../match/helpers.ts';
import type { IsMatch, IsMatchSame, Inequable } from '../match/helpers.ts';
import type { Compare } from '../match/match.types.ts';

type EmptyPattern = '';
type AnyPattern = '_';
type IdentifierPattern = `${'_' | string}${string | ''}`;
type HeadPattern = `[${IdentifierPattern}]`;
type HeadAndTailPattern = `[${IdentifierPattern}, ...${IdentifierPattern}]`;
type LastPattern = `[...${AnyPattern}, ${IdentifierPattern}]`;
type LastAndRestPattern = `[...${IdentifierPattern}, ${IdentifierPattern}]`;
type LiteralPattern = `${string | number}`;
type OperandPattern = LiteralPattern | IdentifierPattern;
type ComparisonOperatorPattern = '==' | '===' | '!=' | '<' | '<=' | '>' | '>=';
type BinaryOperationPattern =
  `${OperandPattern} ${ComparisonOperatorPattern} ${OperandPattern}`;

type Pattern =
  | EmptyPattern
  | AnyPattern
  | HeadPattern
  | HeadAndTailPattern
  | LastPattern
  | LastAndRestPattern
  | LiteralPattern
  | IdentifierPattern
  | BinaryOperationPattern;

type GetValue = (value: unknown) => unknown;
type Matcher = [Compare, GetValue];
export type HeadAndTail<Item> = [Item, Array<Item>];
export type PatternEntry = [Pattern, CallableFunction];

export const anyPattern = /^_$/;
export const emptyPattern = /^\[\]$/;
export const headPattern = /^\[([_a-zA-Z$][\w$]*)\]$/;
export const headAndTailPattern =
  /^\[([_a-zA-Z$][\w$]+),\s+\.\.\.([_a-zA-Z$][\w$]*)\]$/;
export const lastPattern = /^\[\.\.\._,\s+([_a-zA-Z$][\w$]*)\]$/;
export const literalPattern = /(^['"].*['"]$|^\d+$|^\d+n$)/;
export const binaryOperationPattern =
  /(^[_a-zA-Z$][\w$]*)\s([<>]|<=|>=|==|===|!=)\s(['"].*['"]|\d+n|\d+)/;

const identity = (value: unknown) => value;

export const getOnlyItem: GetValue = arrayLike =>
  (arrayLike as ArrayLike<unknown>)[0];

export const getHeadAndTail: GetValue = iterable => {
  if (typeof iterable === 'string') return [iterable[0], iterable.substring(1)];
  const [head, ...tail] = iterable as Iterable<unknown>;
  return [head, tail];
};

export const getLast: GetValue = arrayLike => {
  const al = arrayLike as ArrayLike<unknown>;
  return al[al.length - 1];
};

export const getMatches = (pattern: string, regex: RegExp) =>
  (pattern.match(regex) || []).slice(1);

export const getPatternValue = (value: string) => {
  const func = new Function(`return ${value};`);
  return func();
};

const binaryOps: Record<string, IsMatch | IsMatchSame<Inequable>> = {
  '<': matchHelpers.isLessThan,
  '>': matchHelpers.isGreaterThan,
  '<=': matchHelpers.isLessThanOrEqual,
  '>=': matchHelpers.isGreaterThanOrEqual,
  '===': matchHelpers.equals,
  '!=': (value: unknown) => matchHelpers.not(matchHelpers.equals(value))
};

export const getBinaryOpComparator = (
  pattern: string
): Compare | Compare<Inequable> => {
  const [_, operator, second] = getMatches(pattern, binaryOperationPattern);
  console.log({ second });
  const value = getPatternValue(second);
  console.log({ value });
  return binaryOps[operator](value);
};

export const getMatcher = (pattern: Pattern): Matcher => {
  switch (true) {
    case matchHelpers.matches(literalPattern)(pattern):
      return [
        matchHelpers.equals(getPatternValue(pattern)) as Compare,
        identity
      ];
    case matchHelpers.matches(anyPattern)(pattern):
      return [matchHelpers.isAny(), identity];
    case matchHelpers.matches(emptyPattern)(pattern):
      return [matchHelpers.hasLength(0) as Compare, identity];
    case matchHelpers.matches(headPattern)(pattern):
      return [matchHelpers.hasLength(1) as Compare, getOnlyItem];
    case matchHelpers.matches(headAndTailPattern)(pattern):
      return [matchHelpers.hasMinLength(1) as Compare, getHeadAndTail];
    case matchHelpers.matches(lastPattern)(pattern):
      return [matchHelpers.hasMinLength(1) as Compare, getLast];
    case matchHelpers.matches(binaryOperationPattern)(pattern):
      return [getBinaryOpComparator(pattern) as Compare, identity];
    default:
      return [
        matchHelpers.isAny(),
        () => new Error(`Invalid pattern ${pattern}`)
      ];
  }
};
