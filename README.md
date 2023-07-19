# MatchES

## Methods

### Helper Functions

### Patterns

#### Variables

- IDENTIFIER: A valid JavaScript identifier
- LITERAL: A JavaScript primitive literal (except symbol); `boolean`, `string`,
  `number`, `bigint`, `null`, `undefined`.
- BINARY_OPERATOR: An of the following JavaScript binary operators; `===`,
  `!=`, `<`, `<=`, `>=`, `>`.
- PROPERTY_ACCESSOR: A JavaScript property or element access expression;
  `object.property`, `object["property"]`, or `array[0]`.
- PROPERTY: A JavaScript object property pattern; `property`, `["property"]`, or `[0]`

#### Literal

```
LITERAL
```

A JavaScript literal (as described in [Variables](#variables)). The helper
`equals` is used to check for matching. The handler gets the literal value
as a parameter.

#### Any

```
_
```

Matches any value. The helper `isAny` is used for matching. The handler gets
the value as a parameter.

#### Empty

```
[]
```

Matches an empty `Iterable`. The helper `isEmpty` is used for matching. The
handler gets the empty collection as a parameter.

#### Head

```
[IDENTIFIER]
```

Matches the first element of an `Iterable`. The helper `hasAtLeastOneElement`
is used for matching. The requirement is that the collection must have at
least 1 element. The handler gets the first element as a parameter.

#### Head and Tail

```
[IDENTIFIER, ...IDENTIFIER]
```

Matches the first element and the rest of the elements in an `Iterable`. The
helper `hasAtLeastOneElement` is used for matching. The handler gets an array
where the first element is the first element of the iterable and the second
element is the rest of the elements of the iterable. The rest of the elements
are collected into an `Iterable` of the same type as the original iterable. If
the iterable has only one element, the second element will be an empty
iterable. The iterable is required to have a constructor that takes an array as
an argument.

#### Binary Expression

```
IDENTIFIER BINARY_OPERATOR LITERAL
```

or

```
PROPERTY_ACCESSOR BINARY_OPERATOR LITERAL
```

Matches a value that makes the binary expression evaluate to true. The helper
`equals` is used for matching. The handler takes the value as a parameter.

#### Truthy

```
?
```

Matches a truthy value. The helper `isTruthy` is used for matching. The
handler gets the value as a parameter.

#### Falsy

```
!
```

Matches a falsy value. The helper `isFalsy` is used for matching. The handler
gets the value as a parameter.

#### Non Nullish

```
??
```

Matches a non-nullish value - any value that's not `null` or `undefined`. The
helper `isNonNullish` is used for matching. The handler takes the value as a
parameter.

#### Regex

Matches a string that matches the given regex literal. The helper `matches` is
used for matching. The handler gets the string as a parameter.

#### Object Property

```
{ PROPERTY }
```

Matches a property of an object. Spaces are optional. The helper `hasProperty`
is used for matching. The handler gets the value as a parameter.

#### Object Properties

```
{ PROPERTY, ...IDENTIFIER }
```

Matches a property of an object. The helper `hasProperty` is used for matching.
The handler gets a `Record` with 2 properties. The first property is the
matched property. The second property is the one specified as `IDENTIFIER`. The
rest of the values in the record will be assigned to the second property.
