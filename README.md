# MatchES

A TypeScript library of curried predicates for pattern matching.

## Installation

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

### Predicates

```ts
import * as M from 'jsr:@mishieck/matches@0.4.3'; // Deno
// import * as M from '@mishieck/matches'; // Node or Bun

M.equals(1)(1); // true
M.equals(1)(2); // false

M.isArray()([]); // true
M.isArray()({}); // false

M.contains(1)([1, 2]); // true
M.contains(1)([2, 3]); // false

M.not(M.equals(1))(2); // true
M.not(M.equals(1))(1); // false
```

### Inline Switch Statements

```ts
type Suffix = "B" | "M" | "K" | "";

const suffix = ((_): Suffix => {
  switch (true) {
    case M.isGreaterThanOrEqual(1_000_000_000)(_):
      return "B";
    case M.isGreaterThanOrEqual(1_000_000)(_):
      return "M";
    case M.isGreaterThanOrEqual(1_000)(_):
      return "K";
    default:
      return "";
  }
})(1024); // suffix = "K"

type Data = { id: string };

type Result = {
  data: Array<Data> | null;
  error: Error | null;
};

type State = "loading" | "content" | "empty" | "error";

const state = (({ data, error }: Result): State => {
  if (M.isInstanceOf(Error)(error)) return "error"; // `Failure`
  else if (M.isNull()(data)) return "loading"; // `Success["data"] extends null`
  else if (M.isEmpty()(data!)) return "empty"; // `Success["data"] extends []`
  else return "content"; // `Success["data"] extends [Data, ...Array<Data>]`
})({ data: null, error: null }); // state = "loading"
```

## Contributing

Contributions are welcome.
