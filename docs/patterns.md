# Patterns

## Syntax

```ts
match(value).with(...entries: Array<MatchEntry>);
```

## Variables

- IDENTIFIER: A valid JavaScript identifier
- INEQUALITY_COMPARATOR: An inequality comparator; `<`, `<=`, `>=`, `>`

## Referential Equality

```ts
Primitive;
Is(unknown);
```

Matches values that are referentially equal to the given value. The helper
[`sameAs`]() is used for matching. The handler gets the value as the parameter.

## Structural Equality

```ts
Equal(unknown);
```

Matches values that are structurally equal to the given value. The helper
[`equals`]() is used for matching. The handler gets the value as the parameter.

## Any

```ts
_;
// or
Any;
```

Matches any value. The helper `isAny` is used for matching. The handler gets
the value as a parameter.

## Empty

```ts
Empty;
Empty([]);
Empty({});
Empty('');
Empty(Array);
Empty(TypedArray);
Empty(Object);
Empty(Set);
Empty(Map);
Empty(IterableClass);
```

Matches an empty `Iterable`. The helpers `equals`, `isInstanceOf`, and
`isEmpty` is used for matching. The handler gets the empty collection as a
parameter. The `IterableConstructor` is Any class of an iterable.

## Head

```ts
Pattern([${Primitive | Matcher}]);
```

Matches the first element of an `Iterable`. The helper `hasAtLeastOneElement`
is used for matching. The handler gets the first element as a parameter.

## Head and Tail

```ts
Pattern([${Primitive | Matcher}, ...Tail]);
```

Matches the first element and the rest of the elements in an `Iterable`. The
helper `hasAtLeastOneElement` is used for matching. The first parameter of the
handler is the first element of the iterable and the second parameter is the
rest of the elements of the iterable. The rest of the elements are collected
into an `Iterable` of the same type as the original iterable. If the iterable
has only one element, the second element will be an empty iterable. The
iterable is required to have a constructor that takes an array as an argument.

## Inequality

```ts
LessThan(Comparable);
LessThanOrEqual(Comparable);
GreaterThan(Comparable);
GreaterThanOrEqual(Comparable);
Between(Comparable | [Comparable], Comparable | [Comparable]);
Pattern`IDENTIFIER INEQUALITY_COMPARATOR ${Comparable}`;
Pattern`${Comparable} INEQUALITY_COMPARATOR IDENTIFIER INEQUALITY_COMPARATOR ${Comparable}`;
```

Matches a value that satisfies the given [`Inequality`](). The appropriate
helpers are used for each variant, for example [`isLessThan`]() is used for
`LessThan`. An array containing a `Comparable` in [`Between`]() indicates that
the limit is inclusive. The handler takes the value as a parameter.

### Examples

```ts
LessThan(1); // value < 1
Between(0, 1); // 0 < value < 1
Between([0], 1); // 0 <= value < 1
Pattern`value < ${1}`;
Pattern`${0} <= value < ${1}`;
```

## Truthy

```ts
Truthy;
Truthy(Primitive | Matcher);
Pattern`?`.when(Primitive | Matcher);
```

Matches a truthy value. The helper `isTruthy` is used for matching. The
handler gets the value as a parameter.

## Falsy

```ts
Falsy;
Falsy(Primitive | Matcher);
Pattern`!`;
```

Matches a falsy value. The helper `isFalsy` is used for matching. The handler
gets the value as a parameter.

## Nullish

```ts
None;
None(null | undefined);
Pattern`??`;
```

Matches a nullish value - any value that's `null` or `undefined`. The
helper `isNullish` is used for matching. The handler takes the value as a
parameter. When the second variant is used, it matches the parameters.

## Non Nullish

```ts
Some;
Some(Primitive | Matcher);
```

Matches a non-nullish value - any value that's not `null` or `undefined`. The
helper `isNonNullish` is used for matching. The handler takes the value as a
parameter. When the second variant is used, it matches the parameters.

## Regex

```ts
Regex(RegExp);
Regex(RegExp).when(Primitive | Matcher);
```

Matches a string that matches the given regex. The helper `matches` is
used for matching. The handler gets the string as a parameter.

## Object Property

```ts
Pattern({ property: Primitive | Matcher }).when(Primitive | Matcher);
```

Matches a property of an object. Spaces are optional. The helper `hasProperty`
is used for matching. The handler gets the value as a parameter.

### Examples

```ts
Pattern({ property: _ }); // { property: any }
Pattern({ property: 'value' }); // { property: 'value' }
Pattern({ property: Regex(/\[a-zA-Z]/) }); // { property: 'Value' }
```

## Object Properties

```ts
Pattern({
  ...properties: Record<string, Primitive | Matcher>
}).when(Primitive | Matcher);

Pattern({
  ...properties: Record<string, Primitive | Matcher>,
  ...Rest // As is - import Rest
}).when(Primitive | Matcher);
```

Matches a property of an object. The helper [`hasProperty`]() is used for matching.
The handler gets a `Record` with 2 properties. The first property is the
matched property. The second property is the one specified as `IDENTIFIER`. The
rest of the values in the record will be assigned to the second property.

### Examples

```ts
Pattern({ name: _, age: GreaterThan(21) }); // { name: 'Doe', age: 23 }
Pattern({ name: _, age: GreaterThan(21), ...Rest }); // { name: 'Doe', age: 23, salary: 1200 }
```

## Type

```ts
Type(DataType);
Type(DataType).when(Primitive | Matcher);
```

Matches a value that has the specified [`DataType`](). The helper [`isType`]()
is used for matching. The handler takes the value as the parameter.

### Examples

```ts
Type('number'); // 1
```

## Instance

```ts
Instance(Class);
Instance(Class).when(Primitive | Matcher);
```

Matches a value that is an instance of the given [`Class`](). The helper
[`isInstanceOf`]() is used for matching. The handler takes the value as the
parameter.

### Examples

```ts
Instance(Array); // [1]
```

## Length

```ts
Length(number);
Length(number).when();
```

Matches `ArrayLike` collections with the given length. The helper
[`hasLength`]() is used for matching. The handler takes the value as the
parameter.

### Examples

```ts
Length(3); // [1, 2, 3]
Length(2); // 'Hi'
```

## Size

```ts
Size(number);
Size(number).when();
```

Matches `ArrayOrMap` with the given size. The helper
[`hasSize`]() is used for matching. The handler takes the value as the
parameter.

### Examples

```ts
Size(1); // new Set([2])
Size(1); // new Map([['value', 2]])
```
