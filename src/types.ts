export type WeightedItem<T> = {
  original: T;
  weight: number;
};

export type Options = {
  next?: RandomFn;
  removeOnPick?: boolean;
};

export type RandomFn = () => number;

export type Random = {
  next: RandomFn;
};
