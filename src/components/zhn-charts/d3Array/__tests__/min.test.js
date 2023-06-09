import { min } from '../index';

const box = (value) => ({
 value: value
})
, unbox = (box) => box.value;

describe('d3Array min', () => {
  it("min(array) returns the least numeric value for numbers", () => {
    expect(min([1])).toBe(1);
    expect(min([5, 1, 2, 3, 4])).toBe(1);
    expect(min([20, 3])).toBe(3);
    expect(min([3, 20])).toBe(3);
  });

  it("min(array) returns the least lexicographic value for strings", () => {
    expect(min(["c", "a", "b"])).toBe("a");
    expect(min(["20", "3"])).toBe("20");
    expect(min(["3", "20"])).toBe("20");
  });

  it("min(array) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(min([NaN, 1, 2, 3, 4, 5])).toBe(1);
    expect(min([o, 1, 2, 3, 4, 5])).toBe(1);
    expect(min([1, 2, 3, 4, 5, NaN])).toBe(1);
    expect(min([1, 2, 3, 4, 5, o])).toBe(1);
    expect(min([10, null, 3, undefined, 5, NaN])).toBe(3);
    expect(min([-1, null, -3, undefined, -5, NaN])).toBe(-5);
  });

  it("min(array) compares heterogenous types as numbers", () => {
    expect(min([20, "3"])).toBe("3");
    expect(min(["20", 3])).toBe(3);
    expect(min([3, "20"])).toBe(3);
    expect(min(["3", 20])).toBe("3");
  });

  it("min(array) returns undefined if the array contains no numbers", () => {
    expect(min([])).toBe(undefined);
    expect(min([null])).toBe(undefined);
    expect(min([undefined])).toBe(undefined);
    expect(min([NaN])).toBe(undefined);
    expect(min([NaN, NaN])).toBe(undefined);
  });

  it("min(array, f) returns the least numeric value for numbers", () => {
    expect(min([1].map(box), unbox)).toBe(1);
    expect(min([5, 1, 2, 3, 4].map(box), unbox)).toBe(1);
    expect(min([20, 3].map(box), unbox)).toBe(3);
    expect(min([3, 20].map(box), unbox)).toBe(3);
  });

  it("min(array, f) returns the least lexicographic value for strings", () => {
    expect(min(["c", "a", "b"].map(box), unbox)).toBe("a");
    expect(min(["20", "3"].map(box), unbox)).toBe("20");
    expect(min(["3", "20"].map(box), unbox)).toBe("20");
  });

  it("min(array, f) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(min([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(1);
    expect(min([o, 1, 2, 3, 4, 5].map(box), unbox)).toBe(1);
    expect(min([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(1);
    expect(min([1, 2, 3, 4, 5, o].map(box), unbox)).toBe(1);
    expect(min([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(3);
    expect(min([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toBe(-5);
  });

  it("min(array, f) compares heterogenous types as numbers", () => {
    expect(min([20, "3"].map(box), unbox)).toBe("3");
    expect(min(["20", 3].map(box), unbox)).toBe(3);
    expect(min([3, "20"].map(box), unbox)).toBe(3);
    expect(min(["3", 20].map(box), unbox)).toBe("3");
  });

  it("min(array, f) returns undefined if the array contains no observed values", () => {
    expect(min([].map(box), unbox)).toBe(undefined);
    expect(min([null].map(box), unbox)).toBe(undefined);
    expect(min([undefined].map(box), unbox)).toBe(undefined);
    expect(min([NaN].map(box), unbox)).toBe(undefined);
    expect(min([NaN, NaN].map(box), unbox)).toBe(undefined);
  });

  it("min(array, f) passes the accessor d, i, and array", () => {
    const results = [];
    const array = ["a", "b", "c"];
    min(array, (d, i, array) => results.push([d, i, array]));
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });

  it("min(array, f) uses the undefined context", () => {
    const results = [];
    min([1, 2], function() { results.push(this); });
    expect(results).toEqual([undefined, undefined]);
  });
})
