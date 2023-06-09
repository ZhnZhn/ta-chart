import { extent } from '../index';

const box = (value) => ({
 value: value
})
, unbox = (box) => box.value;

describe('d3Array extent', () => {
  it("extent(array) returns the least and greatest numeric values for numbers", () => {
    expect(extent([1])).toEqual([1, 1]);
    expect(extent([5, 1, 2, 3, 4])).toEqual([1, 5]);
    expect(extent([20, 3])).toEqual([3, 20]);
    expect(extent([3, 20])).toEqual([3, 20]);
  });

  it("extent(array) returns the least and greatest lexicographic value for strings", () => {
    expect(extent(["c", "a", "b"])).toEqual(["a", "c"]);
    expect(extent(["20", "3"])).toEqual(["20", "3"]);
    expect(extent(["3", "20"])).toEqual(["20", "3"]);
  });

  it("extent(array) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(extent([NaN, 1, 2, 3, 4, 5])).toEqual([1, 5]);
    expect(extent([o, 1, 2, 3, 4, 5])).toEqual([1, 5]);
    expect(extent([1, 2, 3, 4, 5, NaN])).toEqual([1, 5]);
    expect(extent([1, 2, 3, 4, 5, o])).toEqual([1, 5]);
    expect(extent([10, null, 3, undefined, 5, NaN])).toEqual([3, 10]);
    expect(extent([-1, null, -3, undefined, -5, NaN])).toEqual([-5, -1]);
  });

  it("extent(array) compares heterogenous types as numbers", () => {
    expect(extent([20, "3"])).toEqual(["3", 20]);
    expect(extent(["20", 3])).toEqual([3, "20"]);
    expect(extent([3, "20"])).toEqual([3, "20"]);
    expect(extent(["3", 20])).toEqual(["3", 20]);
  });

  it("extent(array) returns undefined if the array contains no numbers", () => {
    expect(extent([])).toEqual([undefined, undefined]);
    expect(extent([null])).toEqual([undefined, undefined]);
    expect(extent([undefined])).toEqual([undefined, undefined]);
    expect(extent([NaN])).toEqual([undefined, undefined]);
    expect(extent([NaN, NaN])).toEqual([undefined, undefined]);
  });

  it("extent(array, f) returns the least and greatest numeric value for numbers", () => {
    expect(extent([1].map(box), unbox)).toEqual([1, 1]);
    expect(extent([5, 1, 2, 3, 4].map(box), unbox)).toEqual([1, 5]);
    expect(extent([20, 3].map(box), unbox)).toEqual([3, 20]);
    expect(extent([3, 20].map(box), unbox)).toEqual([3, 20]);
  });

  it("extent(array, f) returns the least and greatest lexicographic value for strings", () => {
    expect(extent(["c", "a", "b"].map(box), unbox)).toEqual(["a", "c"]);
    expect(extent(["20", "3"].map(box), unbox)).toEqual(["20", "3"]);
    expect(extent(["3", "20"].map(box), unbox)).toEqual(["20", "3"]);
  });

  it("extent(array, f) ignores null, undefined and NaN", () => {
    const o = {valueOf: () => NaN};
    expect(extent([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toEqual([1, 5]);
    expect(extent([o, 1, 2, 3, 4, 5].map(box), unbox)).toEqual([1, 5]);
    expect(extent([1, 2, 3, 4, 5, NaN].map(box), unbox)).toEqual([1, 5]);
    expect(extent([1, 2, 3, 4, 5, o].map(box), unbox)).toEqual([1, 5]);
    expect(extent([10, null, 3, undefined, 5, NaN].map(box), unbox)).toEqual([3, 10]);
    expect(extent([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toEqual([-5, -1]);
  });

  it("extent(array, f) compares heterogenous types as numbers", () => {
    expect(extent([20, "3"].map(box), unbox)).toEqual(["3", 20]);
    expect(extent(["20", 3].map(box), unbox)).toEqual([3, "20"]);
    expect(extent([3, "20"].map(box), unbox)).toEqual([3, "20"]);
    expect(extent(["3", 20].map(box), unbox)).toEqual(["3", 20]);
  });

  it("extent(array, f) returns undefined if the array contains no observed values", () => {
    expect(extent([].map(box), unbox)).toEqual([undefined, undefined]);
    expect(extent([null].map(box), unbox)).toEqual([undefined, undefined]);
    expect(extent([undefined].map(box), unbox)).toEqual([undefined, undefined]);
    expect(extent([NaN].map(box), unbox)).toEqual([undefined, undefined]);
    expect(extent([NaN, NaN].map(box), unbox)).toEqual([undefined, undefined]);
  });

  it("extent(array, f) passes the accessor d, i, and array", () => {
    const results = [];
    const array = ["a", "b", "c"];
    extent(array, (d, i, array) => results.push([d, i, array]));
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });

  it("extent(array, f) uses the undefined context", () => {
    const results = [];
    extent([1, 2], function() { results.push(this); });
    expect(results).toEqual([undefined, undefined]);
  });
})
