import { WeightedItem } from "./types";

export class RandomPicker<T> {
  private totalWeight: number = 0;
  private items: WeightedItem<T>[] = [];

  constructor(items: WeightedItem<T>[]) {
    this.set(items);
  }

  pick(): T {
    const random = Math.random() * this.totalWeight;
    let currentWeight = 0;

    for (const item of this.items) {
      currentWeight += item.weight;
      if (random < currentWeight) {
        return item.original;
      }
    }

    /* istanbul ignore next */
    throw new Error(
      "No idea why this happened, get in touch with the wrand developer!"
    );
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
    this.items = items;
    this.updateTotalWeight();
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
        throw new Error("All weights must be positive!");
      }

      if (set.has(item.original)) {
        throw new Error("Items must be unique!");
      }
      set.add(item.original);
    }
  }

  private updateTotalWeight(): void {
    this.totalWeight = this.items.reduce((acc, item) => acc + item.weight, 0);
  }
}