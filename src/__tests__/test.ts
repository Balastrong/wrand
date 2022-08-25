import { flatten, pick, pickMany } from "../index";
import { RandomPicker } from "../randomPicker";

const items = [
  { original: "Bronze", weight: 20 },
  { original: "Silver", weight: 10 },
  { original: "Gold", weight: 3 },
  { original: "Platinum", weight: 1 },
];

describe("RandomPicker", () => {
  it("should be created with a list of items with their weight", () => {
    const picker = new RandomPicker(items);

    expect(picker).toBeDefined();
  });

  it("should throw an error if created with a wrong set of items", () => {
    // Duplicate item
    expect(
      () => new RandomPicker([...items, { original: "Platinum", weight: 5 }])
    ).toThrow();

    // Empty list
    expect(() => new RandomPicker([])).toThrow();

    // Negative weight
    expect(
      () => new RandomPicker([{ original: "Wood", weight: -5 }])
    ).toThrow();
  });

  it("should have some utility getters", () => {
    const picker = new RandomPicker(items);

    expect(picker.getItems()).toEqual(["Bronze", "Silver", "Gold", "Platinum"]);
    expect(picker.getWeights()).toEqual([20, 10, 3, 1]);
    expect(picker.getTotalWeight()).toEqual(34);
    expect(picker.getCount()).toEqual(4);
  });

  it("should be able to pick an item", () => {
    const picker = new RandomPicker(items);

    const pickedItem = picker.pick();

    expect(items.some((i) => i.original === pickedItem)).toBeTruthy();
  });

  it("should be able to pick N items", () => {
    const picker = new RandomPicker(items);
    const picked = picker.pickMany(3);

    expect(picked.length).toBe(3);
    expect(
      picked.every((p) => items.some((i) => i.original === p))
    ).toBeTruthy();
  });

  it("works with objects", () => {
    const objectItems = [
      { original: { name: "Bronze" }, weight: 20 },
      { original: { name: "Silver" }, weight: 10 },
      { original: { name: "Gold" }, weight: 3 },
      { original: { name: "Platinum" }, weight: 1 },
    ];
    const picker = new RandomPicker(objectItems);

    const pickedItem = picker.pick();
    expect(
      objectItems.some((item) => item.original.name === pickedItem.name)
    ).toBeTruthy();
  });

  it("uses the custom random generator when passed", () => {
    const pickerAlwaysFirst = new RandomPicker(items, { next: () => 0 });
    const picked1 = pickerAlwaysFirst.pick();
    const picked2 = pickerAlwaysFirst.pick();
    const picked3 = pickerAlwaysFirst.pick();

    const testFirstItem = items.at(0)?.original;
    expect(
      [picked1, picked2, picked3].every((item) => item === testFirstItem)
    ).toBeTruthy();

    const pickerAlwaysLast = new RandomPicker(items, { next: () => 1 });
    const picked4 = pickerAlwaysLast.pick();
    const picked5 = pickerAlwaysLast.pick();
    const picked6 = pickerAlwaysLast.pick();

    const testLastItem = items.at(-1)?.original;
    expect(
      [picked4, picked5, picked6].every((item) => item === testLastItem)
    ).toBeTruthy();
  });

  it("should not allow random generator going outside boundaries of [0-1]", () => {
    const picker = new RandomPicker(items, { next: () => 5 });

    expect(() => picker.pick()).toThrow();
  });

  it("should remove items if flag is enabled", () => {
    const picker = new RandomPicker(items, { removeOnPick: true });

    expect(picker.getCount()).toBe(4);
    picker.pick();
    expect(picker.getCount()).toBe(3);
    picker.pickMany(2);
    expect(picker.getCount()).toBe(1);
    picker.pick();
    expect(picker.getCount()).toBe(0);
    expect(() => picker.pick()).toThrow();
  });
});

describe("pick", () => {
  it("should pick", () => {
    const pickedItem = pick(items);
    expect(items.some((i) => i.original === pickedItem)).toBeTruthy();
  });
});

describe("pickMany", () => {
  it("should pick many", () => {
    const picked = pickMany(items, 3);

    expect(picked.length).toBe(3);
    expect(
      picked.every((p) => items.some((i) => i.original === p))
    ).toBeTruthy();
  });
});

describe("flatten", () => {
  const itemsWithDuplicates = [...items, { original: "Gold", weight: 1 }];
  const flat = flatten(itemsWithDuplicates);

  expect(flat.length).toBe(4);
  expect(flat.find((i) => i.original === "Gold")).toStrictEqual({
    original: "Gold",
    weight: 4,
  });
});
