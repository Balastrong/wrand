# wrand

Extract one or more random elements from a weighted array.

```ts
const items = [
  { original: "Bronze", weight: 20 },
  { original: "Silver", weight: 10 },
  { original: "Gold", weight: 3 },
  { original: "Platinum", weight: 1 },
];

const picker = new RandomPicker(items);

const result = picker.pick();
```

## Table of contents

- [Installation](#installation)
  - [Node](#node)
  - [Deno](#deno)
- [Usage](#usage)
- [Roadmap](#roadmap)

## Installation

### Node

```sh
# If you use npm
npm install wrand

# If you use yarn
yarn add wrand
```

### Deno

If you use Deno, you can just import the package from [deno.land/x](https://deno.land/x/wrand)

```ts
import { wrand } from "https://deno.land/x/wrand/mod.ts";
```

## Usage

// TODO

## Roadmap

- [x] RandomPicker class
  - [ ] Multiple picks with option for duplicates
- [x] Standalone methods
  - [x] pick
  - [x] pickMany
  - [x] flatten
- [ ] Allow for custom random function
