export type WeightedItem<T> = {
  original: T;
  weight: number;
};

export type RandomFn = () => number;
