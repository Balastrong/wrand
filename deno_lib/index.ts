import { RandomPicker } from "./randomPicker.ts";
import { Options, WeightedItem } from "./types.ts";
export { RandomPicker };

export const pick = <T>(items: WeightedItem<T>[], options?: Options) =>
  new RandomPicker(items, options).pick();

export const pickMany = <T>(
  items: WeightedItem<T>[],
  amount: number,
  options?: Options
) => new RandomPicker(items, options).pickMany(amount);

export const flatten = <T>(items: WeightedItem<T>[]): WeightedItem<T>[] => {
  const map = new Map<T, number>();
  for (const item of items) {
    map.set(item.original, (map.get(item.original) || 0) + item.weight);
  }

  return [...map.entries()].map(([original, weight]) => ({ original, weight }));
};

export const pickManyDistinct = <T>(
  items: WeightedItem<T>[],
  amount: number,
  options?: Options
) => new RandomPicker(items, options).pickManyDistinct(amount);
