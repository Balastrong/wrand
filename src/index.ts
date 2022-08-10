import { RandomPicker } from "./randomPicker";
import { WeightedItem } from "./types";

export const pick = <T>(items: WeightedItem<T>[]) =>
  new RandomPicker(items).pick();

export const pickMany = <T>(items: WeightedItem<T>[], amount: number) =>
  new RandomPicker(items).pickMany(amount);

export const flatten = <T>(items: WeightedItem<T>[]): WeightedItem<T>[] => {
  const map = new Map<T, number>();
  for (const item of items) {
    map.set(item.original, (map.get(item.original) || 0) + item.weight);
  }

  return [...map.entries()].map(([original, weight]) => ({ original, weight }));
};
