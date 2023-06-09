"use strict";

var _index = require("../index");
function OneTimeNumber(value) {
  this.value = value;
}
OneTimeNumber.prototype.valueOf = function () {
  var v = this.value;
  this.value = NaN;
  return v;
};
var box = function box(value) {
    return {
      value: value
    };
  },
  unbox = function unbox(box) {
    return box.value;
  };
describe('d3Array mean', function () {
  it("mean(array) returns the mean value for numbers", function () {
    expect((0, _index.mean)([1])).toBe(1);
    expect((0, _index.mean)([5, 1, 2, 3, 4])).toBe(3);
    expect((0, _index.mean)([20, 3])).toBe(11.5);
    expect((0, _index.mean)([3, 20])).toBe(11.5);
  });
  it("mean(array) ignores null, undefined and NaN", function () {
    expect((0, _index.mean)([NaN, 1, 2, 3, 4, 5])).toBe(3);
    expect((0, _index.mean)([1, 2, 3, 4, 5, NaN])).toBe(3);
    expect((0, _index.mean)([10, null, 3, undefined, 5, NaN])).toBe(6);
  });
  it("mean(array) returns undefined if the array contains no observed values", function () {
    expect((0, _index.mean)([])).toBe(undefined);
    expect((0, _index.mean)([null])).toBe(undefined);
    expect((0, _index.mean)([undefined])).toBe(undefined);
    expect((0, _index.mean)([NaN])).toBe(undefined);
    expect((0, _index.mean)([NaN, NaN])).toBe(undefined);
  });
  it("mean(array) coerces values to numbers", function () {
    expect((0, _index.mean)(["1"])).toBe(1);
    expect((0, _index.mean)(["5", "1", "2", "3", "4"])).toBe(3);
    expect((0, _index.mean)(["20", "3"])).toBe(11.5);
    expect((0, _index.mean)(["3", "20"])).toBe(11.5);
  });
  it("mean(array) coerces values exactly once", function () {
    var numbers = [1, new OneTimeNumber(3)];
    expect((0, _index.mean)(numbers)).toBe(2);
    expect((0, _index.mean)(numbers)).toBe(1);
  });
  it("mean(array, f) returns the mean value for numbers", function () {
    expect((0, _index.mean)([1].map(box), unbox)).toBe(1);
    expect((0, _index.mean)([5, 1, 2, 3, 4].map(box), unbox)).toBe(3);
    expect((0, _index.mean)([20, 3].map(box), unbox)).toBe(11.5);
    expect((0, _index.mean)([3, 20].map(box), unbox)).toBe(11.5);
  });
  it("mean(array, f) ignores null, undefined and NaN", function () {
    expect((0, _index.mean)([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(3);
    expect((0, _index.mean)([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(3);
    expect((0, _index.mean)([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(6);
  });
  it("mean(array, f) returns undefined if the array contains no observed values", function () {
    expect((0, _index.mean)([].map(box), unbox)).toBe(undefined);
    expect((0, _index.mean)([null].map(box), unbox)).toBe(undefined);
    expect((0, _index.mean)([undefined].map(box), unbox)).toBe(undefined);
    expect((0, _index.mean)([NaN].map(box), unbox)).toBe(undefined);
    expect((0, _index.mean)([NaN, NaN].map(box), unbox)).toBe(undefined);
  });
  it("mean(array, f) coerces values to numbers", function () {
    expect((0, _index.mean)(["1"].map(box), unbox)).toBe(1);
    expect((0, _index.mean)(["5", "1", "2", "3", "4"].map(box), unbox)).toBe(3);
    expect((0, _index.mean)(["20", "3"].map(box), unbox)).toBe(11.5);
    expect((0, _index.mean)(["3", "20"].map(box), unbox)).toBe(11.5);
  });
  it("mean(array, f) coerces values exactly once", function () {
    var numbers = [1, new OneTimeNumber(3)].map(box);
    expect((0, _index.mean)(numbers, unbox)).toBe(2);
    expect((0, _index.mean)(numbers, unbox)).toBe(1);
  });
  it("mean(array, f) passes the accessor d, i, and array", function () {
    var results = [];
    var strings = ["a", "b", "c"];
    (0, _index.mean)(strings, function (d, i, array) {
      return results.push([d, i, array]);
    });
    expect(results).toEqual([["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
  });
  it("mean(array, f) uses the undefined context", function () {
    var results = [];
    (0, _index.mean)([1, 2], function () {
      results.push(this);
    });
    expect(results).toEqual([undefined, undefined]);
  });
});
//# sourceMappingURL=mean.test.js.map