# `@n1ru4l/toposort`

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm](https://img.shields.io/npm/v/@n1ru4l/toposort.svg)](https://www.npmjs.com/package/@n1ru4l/toposort)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@n1ru4l/toposort)](https://bundlephobia.com/result?p=@n1ru4l/toposort)
[![Dependencies](https://img.shields.io/david/n1ru4l/toposort)](https://www.npmjs.com/package/@n1ru4l/toposort)
[![NPM](https://img.shields.io/npm/dm/@n1ru4l/toposort.svg)](https://www.npmjs.com/package/@n1ru4l/toposort)

## Why?

All toposort libraries I found where either JavaScript only, had a lot of dependencies, were cumbersome to deal with or did not produce dependency list that allowed detecting which tasks could be executed in parallel.

This library is basically a port of [batching-toposort](https://www.npmjs.com/package/batching-toposort) to TypeScript that uses modern ECMA structures such as `Map` and `Set`, as well as providing a utility `toposortReverse` function that I needed most of the time, when dealing with dependency lists.

This library also provides CommonJS and ES Module builds.

## Install

```bash
yarn add -E @n1ru4l/toposort
```

## Usage

### `toposort`

Sort list of tasks.

```ts
import { toposort } from "@n1ru4l/toposort";

const tasks = new Map([
  // after wakeUp is done we can do drinkCoffee and eatBreakfast
  ["wakeUp", ["drinkCoffee", "eatBreakfast"]],
  ["drinkCoffee", ["brushTeeth"]],
  ["eatBreakfast", ["brushTeeth"]],
  ["brushTeeth", ["floss"]],
  // after flossing is done no further task must be done
  ["floss", []],
]);

const sorted = toposort(tasks);
console.log(sorted);
// [
//   Set(1) { 'wakeUp' },
//   Set(2) { 'drinkCoffee', 'eatBreakfast' },
//   Set(1) { 'brushTeeth' },
//   Set(1) { 'floss' }
// ]
```

### `toposortReverse`

Most of the time I needed this instead of `toposort`. It is easier to grasp for my mind that task a depends on task b and c instead of declaring it the other way around. I am not sure about the naming. If you think a better naming is possible please send a pull request.

```ts
import { toposortReverse } from "@n1ru4l/toposort";

const graph = new Map([
  // before we can drinkCoffee, we need to wakeUp
  ["drinkCoffee", ["wakeUp"]],
  // before we can eatBreakfast, we need to wakeUp
  ["eatBreakfast", ["wakeUp"]],
  // before we can brushTeeth, we need to drinkCoffee and eatBreakfast
  ["brushTeeth", ["drinkCoffee", "eatBreakfast"]],
  // before we can floss, we need to brushTeeth
  ["floss", ["brushTeeth"]],
  // wakeUp can be done without any dependencies
  ["wakeUp", []],
]);

const sorted = toposortReverse(graph);
// [
//   Set(1) { 'wakeUp' },
//   Set(2) { 'drinkCoffee', 'eatBreakfast' },
//   Set(1) { 'brushTeeth' },
//   Set(1) { 'floss' }
// ]
```
