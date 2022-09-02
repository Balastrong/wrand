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

  /**
   * picks distinct elements from the weighted array.
   * If the number of items required is more or equal to the length of weighted array, it will return all elements in array
   * @param amount - positive number of items to be picked, if more or equal to the length of the array, returns all items
   * @returns array of picked items
   * @example 
   * const items = [
   * { original: "Bronze", weight: 20 },
   * { original: "Silver", weight: 10 },
   * { original: "Gold", weight: 3 },
   * { original: "Platinum", weight: 1 },
   * ];
   * const pickerAlwaysLast = new RandomPicker(items);
   * const picked1 = pickerAlwaysLast.pickManyDistinct(1);
   * console.log(picked1.length) // 1
   * const picked3 = pickerAlwaysLast.pickManyDistinct(3);
   * console.log(picked3.length) // 3
   * const picked4 = pickerAlwaysLast.pickManyDistinct(4);
   * console.log(picked4.length) // 4
   * console.log(picked4) // ["Bronze", "Silver", "Gold", "Platinum"]
   * const picked8 = pickerAlwaysLast.pickManyDistinct(8);
   * console.log(picked8.length) // 4
   * console.log(picked8) // ["Bronze", "Silver", "Gold", "Platinum"]
   */
  pickManyDistinct(amount: number):T[] {
    if (amount < 0) throw new Error("number of items to be picked should be a positive integer")
    if(amount >= this.items.length) return this.items.map((i) => i.original)
    const items:T[] = []
    const copyOfItems = [...this.items]
    for (let i = 0; i < amount; i++) {
      const indexToPick = this.indexToPick(copyOfItems)
      items.push(copyOfItems[indexToPick].original);
      copyOfItems.splice(indexToPick, 1);
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

  private indexToPick(items=this.items):number {
    const random = this.safeNext() * items.reduce((acc, item) => acc + item.weight, 0);
    let currentWeight = 0;
    let index = -1

    for (const [inx, item] of items.entries()) {
      currentWeight += item.weight;
      if (random <= currentWeight) {
        index = inx
      }
    }
    return index
  }
}