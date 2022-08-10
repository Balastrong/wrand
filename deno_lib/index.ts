import { Item } from "./types.ts";

export class RandomPicker<T> {
  constructor(private items: Item<T>[]) {}
}

export const wrand = () => true;
