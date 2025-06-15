# MatchES

A TypeScript library of curried predicates for pattern matching.

## addation

### Deno

```sh
deno add jsr:@mishieck/matches
```

### NPM

```sh
npx jsr add @mishieck/matches
```

### Bun

```sh
bun x jsr add @mishieck/matches
```

## Usage

```ts
import * as M from 'jsr:@mishieck/matches@0.2.2';

M.equals(1)(1); // true
M.equals(1)(2); // false

M.isArray()([]); // true
M.isArray()({}); // false

M.contains(1)([1, 2]); // true
M.contains(1)([2, 3]); // false

M.not(M.equals(1))(2); // true
M.not(M.equals(1))(1); // false
```
