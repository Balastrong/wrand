import { Options, RandomFn, WeightedItem } from "./types.ts";

export class RandomPicker<T> {
  private totalWeight: number = 0;
  private items: WeightedItem<T>[] = [];

  constructor(items: WeightedItem<T>[], private options?: Options) {
    this.set(items);
  }

  pick(): T {
    const random = this.safeNext() * this.totalWeight;
    let currentWeight = 0;

    for (const item of this.items) {
      currentWeight += item.weight;
      if (random <= currentWeight) {
        if (this.options?.removeOnPick) {
          this.internalSet(this.items.filter((i) => i !== item));
        }

        return item.original;
      }
    }

    /* istanbul ignore next */
    if (this.items.length > 0) {
      throw new Error(
        "No idea why this happened, get in touch with the wrand developer!"
      );
    } else {
      throw new Error("The list is empty!");
    }
  }

  pickMany(amount: number): T[] {
    const items = [];
    for (let i = 0; i < amount; i++) {
      items.push(this.pick());
    }
    return items;
  }

  set(items: WeightedItem<T>[]) {
    this.validate(items);
    this.internalSet(items);
  }

  getItems(): T[] {
    return this.items.map((i) => i.original);
  }

  getWeights(): number[] {
    return this.items.map((i) => i.weight);
  }

  getTotalWeight(): number {
    return this.totalWeight;
  }

  getCount(): number {
    return this.items.length;
  }

  private validate(items: WeightedItem<T>[]) {
    if (items.length === 0) {
      throw new Error("Items list is empty!");
    }

    const set = new Set();
    for (const item of items) {
      if (item.weight <= 0) {
        throw new Error(
          `All weights must be positive! ${item.original} has weight ${item.weight}`
        );
      }

      if (set.has(item.original)) {
        throw new Error(`Items must be unique! ${item.original} is duplicate!`);
      }
      set.add(item.original);
    }
  }

  private updateTotalWeight(): void {
    this.totalWeight = this.items.reduce((acc, item) => acc + item.weight, 0);
  }

  private safeNext(): number {
    const random = this.options?.next ? this.options.next() : Math.random();
    if (random < 0 || random > 1) {
      throw new Error(
        `Invalid random number generated, value must be between 0 and 1, received ${random} instead!`
      );
    }

    return random;
  }

  private internalSet(items: WeightedItem<T>[]) {
    this.items = items;
    this.updateTotalWeight();
  }
}
