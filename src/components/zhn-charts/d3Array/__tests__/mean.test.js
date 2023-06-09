import { mean } from '../index';

function OneTimeNumber(value) {
  this.value = value;
}
OneTimeNumber.prototype.valueOf = function() {
  const v = this.value;
  this.value = NaN;
  return v;
};

const box = (value) => ({
 value: value
})
, unbox = (box) => box.value;

describe('d3Array mean', () => {
  it("mean(array) returns the mean value for numbers", () => {
    expect(mean([1])).toBe(1);
    expect(mean([5, 1, 2, 3, 4])).toBe(3);
    expect(mean([20, 3])).toBe(11.5);
    expect(mean([3, 20])).toBe(11.5);
  });

  it("mean(array) ignores null, undefined and NaN", () => {
    expect(mean([NaN, 1, 2, 3, 4, 5])).toBe(3);
    expect(mean([1, 2, 3, 4, 5, NaN])).toBe(3);
    expect(mean([10, null, 3, undefined, 5, NaN])).toBe(6);
  });

  it("mean(array) returns undefined if the array contains no observed values", () => {
    expect(mean([])).toBe(undefined);
    expect(mean([null])).toBe(undefined);
    expect(mean([undefined])).toBe(undefined);
    expect(mean([NaN])).toBe(undefined);
    expect(mean([NaN, NaN])).toBe(undefined);
  });

  it("mean(array) coerces values to numbers", () => {
    expect(mean(["1"])).toBe(1);
    expect(mean(["5", "1", "2", "3", "4"])).toBe(3);
    expect(mean(["20", "3"])).toBe(11.5);
    expect(mean(["3", "20"])).toBe(11.5);
  });

  it("mean(array) coerces values exactly once", () => {
    const numbers = [1, new OneTimeNumber(3)];
    expect(mean(numbers)).toBe(2);
    expect(mean(numbers)).toBe(1);
  });

  it("mean(array, f) returns the mean value for numbers", () => {
    expect(mean([1].map(box), unbox)).toBe(1);
    expect(mean([5, 1, 2, 3, 4].map(box), unbox)).toBe(3);
    expect(mean([20, 3].map(box), unbox)).toBe(11.5);
    expect(mean([3, 20].map(box), unbox)).toBe(11.5);
  });

  it("mean(array, f) ignores null, undefined and NaN", () => {
    expect(mean([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(3);
    expect(mean([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(3);
    expect(mean([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(6);
  });

  it("mean(array, f) returns undefined if the array contains no observed values", () => {
    expect(mean([].map(box), unbox)).toBe(undefined);
    expect(mean([null].map(box), unbox)).toBe(undefined);
    expect(mean([undefined].map(box), unbox)).toBe(undefined);
    expect(mean([NaN].map(box), unbox)).toBe(undefined);
    expect(mean([NaN, NaN].map(box), unbox)).toBe(undefined);
  });

  it("mean(array, f) coerces values to numbers", () => {
    expect(mean(["1"].map(box), unbox)).toBe(1);
    expect(mean(["5", "1", "2", "3", "4"].map(box), unbox)).toBe(3);
    expect(mean(["20", "3"].map(box), unbox)).toBe(11.5);
    expect(mean(["3", "20"].map(box), unbox)).toBe(11.5);
  });

  it("mean(array, f) coerces values exactly once", () => {
    const numbers = [1, new OneTimeNumber(3)].map(box);
    expect(mean(numbers, unbox)).toBe(2);
    expect(mean(numbers, unbox)).toBe(1);
  });

  it("mean(array, f) passes the accessor d, i, and array", () => {
    const results = [];
    const strings = ["a", "b", "c"];
    mean(strings, (d, i, array) => results.push([d, i, array]));
    expect(results).toEqual([["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
  });

  it("mean(array, f) uses the undefined context", () => {
    const results = [];
    mean([1, 2], function() { results.push(this); });
    expect(results).toEqual([undefined, undefined]);
  });
})
