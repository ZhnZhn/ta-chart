import { max } from '../index';

const box = (value) => ({
 value: value
})
, unbox = (box) => box.value;

describe('d3Array max' , () => {
  it("max(array) returns the greatest numeric value for numbers", () => {
    expect(max([1])).toBe(1);
    expect(max([5, 1, 2, 3, 4])).toBe(5);
    expect(max([20, 3])).toBe(20);
    expect(max([3, 20])).toBe(20);
  });

  it("max(array) returns the greatest lexicographic value for strings", () => {
    expect(max(["c", "a", "b"])).toBe("c");
    expect(max(["20", "3"])).toBe("3");
    expect(max(["3", "20"])).toBe("3");
  });

  it("max(array) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(max([NaN, 1, 2, 3, 4, 5])).toBe(5);
    expect(max([o, 1, 2, 3, 4, 5])).toBe(5);
    expect(max([1, 2, 3, 4, 5, NaN])).toBe(5);
    expect(max([1, 2, 3, 4, 5, o])).toBe(5);
    expect(max([10, null, 3, undefined, 5, NaN])).toBe(10);
    expect(max([-1, null, -3, undefined, -5, NaN])).toBe(-1);
  });

  it("max(array) compares heterogenous types as numbers", () => {
    expect(max([20, "3"])).toBe(20);
    expect(max(["20", 3])).toBe("20");
    expect(max([3, "20"])).toBe("20");
    expect(max(["3", 20])).toBe(20);
  });

  it("max(array) returns undefined if the array contains no numbers", () => {
    expect(max([])).toBe(undefined);
    expect(max([null])).toBe(undefined);
    expect(max([undefined])).toBe(undefined);
    expect(max([NaN])).toBe(undefined);
    expect(max([NaN, NaN])).toBe(undefined);
  });

  it("max(array, f) returns the greatest numeric value for numbers", () => {
    expect(max([1].map(box), unbox)).toBe(1);
    expect(max([5, 1, 2, 3, 4].map(box), unbox)).toBe(5);
    expect(max([20, 3].map(box), unbox)).toBe(20);
    expect(max([3, 20].map(box), unbox)).toBe(20);
  });

  it("max(array, f) returns the greatest lexicographic value for strings", () => {
    expect(max(["c", "a", "b"].map(box), unbox)).toBe("c");
    expect(max(["20", "3"].map(box), unbox)).toBe("3");
    expect(max(["3", "20"].map(box), unbox)).toBe("3");
  });

  it("max(array, f) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(max([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(5);
    expect(max([o, 1, 2, 3, 4, 5].map(box), unbox)).toBe(5);
    expect(max([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(5);
    expect(max([1, 2, 3, 4, 5, o].map(box), unbox)).toBe(5);
    expect(max([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(10);
    expect(max([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toBe(-1);
  });

  it("max(array, f) compares heterogenous types as numbers", () => {
    expect(max([20, "3"].map(box), unbox)).toBe(20);
    expect(max(["20", 3].map(box), unbox)).toBe("20");
    expect(max([3, "20"].map(box), unbox)).toBe("20");
    expect(max(["3", 20].map(box), unbox)).toBe(20);
  });

  it("max(array, f) returns undefined if the array contains no observed values", () => {
    expect(max([].map(box), unbox)).toBe(undefined);
    expect(max([null].map(box), unbox)).toBe(undefined);
    expect(max([undefined].map(box), unbox)).toBe(undefined);
    expect(max([NaN].map(box), unbox)).toBe(undefined);
    expect(max([NaN, NaN].map(box), unbox)).toBe(undefined);
  });

  it("max(array, f) passes the accessor d, i, and array", () => {
    const results = [];
    const array = ["a", "b", "c"];
    max(array, (d, i, array) => results.push([d, i, array]));
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });

  it("max(array, f) uses the undefined context", () => {
    const results = [];
    max([1, 2], function() { results.push(this); });
    expect(results).toEqual([undefined, undefined]);
  });
})
