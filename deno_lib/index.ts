import { RandomPicker } from "./randomPicker.ts";
import { RandomFn, WeightedItem } from "./types.ts";

export const pick = <T>(items: WeightedItem<T>[], next?: RandomFn) =>
  new RandomPicker(items, next).pick();

export const pickMany = <T>(
  items: WeightedItem<T>[],
  amount: number,
  next?: RandomFn
) => new RandomPicker(items, next).pickMany(amount);

export const flatten = <T>(items: WeightedItem<T>[]): WeightedItem<T>[] => {
  const map = new Map<T, number>();
  for (const item of items) {
    map.set(item.original, (map.get(item.original) || 0) + item.weight);
  }

  return [...map.entries()].map(([original, weight]) => ({ original, weight }));
};
