"use strict";

var _index = require("../index");
var box = function box(value) {
    return {
      value: value
    };
  },
  unbox = function unbox(box) {
    return box.value;
  };
describe('d3Array min', function () {
  it("min(array) returns the least numeric value for numbers", function () {
    expect((0, _index.min)([1])).toBe(1);
    expect((0, _index.min)([5, 1, 2, 3, 4])).toBe(1);
    expect((0, _index.min)([20, 3])).toBe(3);
    expect((0, _index.min)([3, 20])).toBe(3);
  });
  it("min(array) returns the least lexicographic value for strings", function () {
    expect((0, _index.min)(["c", "a", "b"])).toBe("a");
    expect((0, _index.min)(["20", "3"])).toBe("20");
    expect((0, _index.min)(["3", "20"])).toBe("20");
  });
  it("min(array) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.min)([NaN, 1, 2, 3, 4, 5])).toBe(1);
    expect((0, _index.min)([o, 1, 2, 3, 4, 5])).toBe(1);
    expect((0, _index.min)([1, 2, 3, 4, 5, NaN])).toBe(1);
    expect((0, _index.min)([1, 2, 3, 4, 5, o])).toBe(1);
    expect((0, _index.min)([10, null, 3, undefined, 5, NaN])).toBe(3);
    expect((0, _index.min)([-1, null, -3, undefined, -5, NaN])).toBe(-5);
  });
  it("min(array) compares heterogenous types as numbers", function () {
    expect((0, _index.min)([20, "3"])).toBe("3");
    expect((0, _index.min)(["20", 3])).toBe(3);
    expect((0, _index.min)([3, "20"])).toBe(3);
    expect((0, _index.min)(["3", 20])).toBe("3");
  });
  it("min(array) returns undefined if the array contains no numbers", function () {
    expect((0, _index.min)([])).toBe(undefined);
    expect((0, _index.min)([null])).toBe(undefined);
    expect((0, _index.min)([undefined])).toBe(undefined);
    expect((0, _index.min)([NaN])).toBe(undefined);
    expect((0, _index.min)([NaN, NaN])).toBe(undefined);
  });
  it("min(array, f) returns the least numeric value for numbers", function () {
    expect((0, _index.min)([1].map(box), unbox)).toBe(1);
    expect((0, _index.min)([5, 1, 2, 3, 4].map(box), unbox)).toBe(1);
    expect((0, _index.min)([20, 3].map(box), unbox)).toBe(3);
    expect((0, _index.min)([3, 20].map(box), unbox)).toBe(3);
  });
  it("min(array, f) returns the least lexicographic value for strings", function () {
    expect((0, _index.min)(["c", "a", "b"].map(box), unbox)).toBe("a");
    expect((0, _index.min)(["20", "3"].map(box), unbox)).toBe("20");
    expect((0, _index.min)(["3", "20"].map(box), unbox)).toBe("20");
  });
  it("min(array, f) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.min)([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(1);
    expect((0, _index.min)([o, 1, 2, 3, 4, 5].map(box), unbox)).toBe(1);
    expect((0, _index.min)([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(1);
    expect((0, _index.min)([1, 2, 3, 4, 5, o].map(box), unbox)).toBe(1);
    expect((0, _index.min)([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(3);
    expect((0, _index.min)([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toBe(-5);
  });
  it("min(array, f) compares heterogenous types as numbers", function () {
    expect((0, _index.min)([20, "3"].map(box), unbox)).toBe("3");
    expect((0, _index.min)(["20", 3].map(box), unbox)).toBe(3);
    expect((0, _index.min)([3, "20"].map(box), unbox)).toBe(3);
    expect((0, _index.min)(["3", 20].map(box), unbox)).toBe("3");
  });
  it("min(array, f) returns undefined if the array contains no observed values", function () {
    expect((0, _index.min)([].map(box), unbox)).toBe(undefined);
    expect((0, _index.min)([null].map(box), unbox)).toBe(undefined);
    expect((0, _index.min)([undefined].map(box), unbox)).toBe(undefined);
    expect((0, _index.min)([NaN].map(box), unbox)).toBe(undefined);
    expect((0, _index.min)([NaN, NaN].map(box), unbox)).toBe(undefined);
  });
  it("min(array, f) passes the accessor d, i, and array", function () {
    var results = [];
    var array = ["a", "b", "c"];
    (0, _index.min)(array, function (d, i, array) {
      return results.push([d, i, array]);
    });
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });
  it("min(array, f) uses the undefined context", function () {
    var results = [];
    (0, _index.min)([1, 2], function () {
      results.push(this);
    });
    expect(results).toEqual([undefined, undefined]);
  });
});
//# sourceMappingURL=min.test.js.map