<p align="center">
  <a href="https://github.com/Balastrong/wrand/actions/workflows/testing.yml"><img src="https://github.com/Balastrong/wrand/actions/workflows/testing.yml/badge.svg" alt="CI status" /></a>
  <a href="https://www.npmjs.com/package/wrand"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/Balastrong/wrand"></a>
  <a href="https://chrome.google.com/webstore/detail/wrand/ncibjlmfhjcjnphnpphgphbflpdpliei" rel="nofollow"><img src="https://img.shields.io/github/stars/Balastrong/wrand" alt="Stars"></a>
  <a href="https://twitter.com/Balastrong" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@Balastrong-4BBAAB.svg" alt="created by Leonardo Montini"></a>
</p>

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

⭐️ If you like this library, don't forget to give it a star! ⭐️

## Table of contents

- [Installation](#installation)
  - [Node](#node)
  - [Deno](#deno)
- [Usage](#usage)
  - [RandomPicker object](#randompicker-object)
  - [Standalone methods](#standalone-methods)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

## Installation

### Node

```sh
# If you use npm
npm install wrand

# If you use yarn
yarn add wrand
```

### Deno

If you use Deno, you can just import what you need from [deno.land/x](https://deno.land/x/wrand)

```ts
import {
  RandomPicker,
  pick,
  pickMany,
  flatten,
} from "https://deno.land/x/wrand/mod.ts";
```

## Usage

_Hint:_ The [test.ts](./src/__tests__/test.ts) file contains all possible examples. Thi is the best source of usage documentation.

### RandomPicker object

You can use the RandomPicker object to pick one or more random elements from a weighted array. The array can be any type, objects are fine.

The best usage here is if you need to pick many items at different moments and you don't want to recreate the object every time.

```ts
const items = [
  { original: "Bronze", weight: 20 },
  { original: "Silver", weight: 10 },
  { original: "Gold", weight: 3 },
  { original: "Platinum", weight: 1 },
];

const picker = new RandomPicker(items);
```

Once the item is created, you can call all exposed methods, in particular pick and pickMany.

```ts
const result = picker.pick();

const results = picker.pickMany(10);
```

### Standalone methods

If you only need to pick one item sporadically, you can hide the object creation and use the standalone methods instead.

The syntax is much more concise but keep in mind that the object is created underneath, you just don't have the reference and the code looks shorter.

```ts
const items = [
  { original: "Bronze", weight: 20 },
  { original: "Silver", weight: 10 },
  { original: "Gold", weight: 3 },
  { original: "Platinum", weight: 1 },
];

const result = pick(items);
```

## Roadmap

This is a high-level roadmap. You can find more in the open issues.

- RandomPicker class
  - [ ] Multiple picks with option for duplicates
  - [ ] Handle duplicates
- Standalone methods
  - [x] pick
  - [x] pickMany
  - [x] flatten
- Extra features
  - [x] Add badges to the documentation
  - [ ] Allow for custom random function
  - [ ] Keep coverage high and not forget edge cases

## Contributing

Contributions of any kind are welcome! You can find more info on [CONTRIBUTING.md](./CONTRIBUTING.md).
