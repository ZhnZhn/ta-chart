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
describe('d3Array max', function () {
  it("max(array) returns the greatest numeric value for numbers", function () {
    expect((0, _index.max)([1])).toBe(1);
    expect((0, _index.max)([5, 1, 2, 3, 4])).toBe(5);
    expect((0, _index.max)([20, 3])).toBe(20);
    expect((0, _index.max)([3, 20])).toBe(20);
  });
  it("max(array) returns the greatest lexicographic value for strings", function () {
    expect((0, _index.max)(["c", "a", "b"])).toBe("c");
    expect((0, _index.max)(["20", "3"])).toBe("3");
    expect((0, _index.max)(["3", "20"])).toBe("3");
  });
  it("max(array) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.max)([NaN, 1, 2, 3, 4, 5])).toBe(5);
    expect((0, _index.max)([o, 1, 2, 3, 4, 5])).toBe(5);
    expect((0, _index.max)([1, 2, 3, 4, 5, NaN])).toBe(5);
    expect((0, _index.max)([1, 2, 3, 4, 5, o])).toBe(5);
    expect((0, _index.max)([10, null, 3, undefined, 5, NaN])).toBe(10);
    expect((0, _index.max)([-1, null, -3, undefined, -5, NaN])).toBe(-1);
  });
  it("max(array) compares heterogenous types as numbers", function () {
    expect((0, _index.max)([20, "3"])).toBe(20);
    expect((0, _index.max)(["20", 3])).toBe("20");
    expect((0, _index.max)([3, "20"])).toBe("20");
    expect((0, _index.max)(["3", 20])).toBe(20);
  });
  it("max(array) returns undefined if the array contains no numbers", function () {
    expect((0, _index.max)([])).toBe(undefined);
    expect((0, _index.max)([null])).toBe(undefined);
    expect((0, _index.max)([undefined])).toBe(undefined);
    expect((0, _index.max)([NaN])).toBe(undefined);
    expect((0, _index.max)([NaN, NaN])).toBe(undefined);
  });
  it("max(array, f) returns the greatest numeric value for numbers", function () {
    expect((0, _index.max)([1].map(box), unbox)).toBe(1);
    expect((0, _index.max)([5, 1, 2, 3, 4].map(box), unbox)).toBe(5);
    expect((0, _index.max)([20, 3].map(box), unbox)).toBe(20);
    expect((0, _index.max)([3, 20].map(box), unbox)).toBe(20);
  });
  it("max(array, f) returns the greatest lexicographic value for strings", function () {
    expect((0, _index.max)(["c", "a", "b"].map(box), unbox)).toBe("c");
    expect((0, _index.max)(["20", "3"].map(box), unbox)).toBe("3");
    expect((0, _index.max)(["3", "20"].map(box), unbox)).toBe("3");
  });
  it("max(array, f) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.max)([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toBe(5);
    expect((0, _index.max)([o, 1, 2, 3, 4, 5].map(box), unbox)).toBe(5);
    expect((0, _index.max)([1, 2, 3, 4, 5, NaN].map(box), unbox)).toBe(5);
    expect((0, _index.max)([1, 2, 3, 4, 5, o].map(box), unbox)).toBe(5);
    expect((0, _index.max)([10, null, 3, undefined, 5, NaN].map(box), unbox)).toBe(10);
    expect((0, _index.max)([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toBe(-1);
  });
  it("max(array, f) compares heterogenous types as numbers", function () {
    expect((0, _index.max)([20, "3"].map(box), unbox)).toBe(20);
    expect((0, _index.max)(["20", 3].map(box), unbox)).toBe("20");
    expect((0, _index.max)([3, "20"].map(box), unbox)).toBe("20");
    expect((0, _index.max)(["3", 20].map(box), unbox)).toBe(20);
  });
  it("max(array, f) returns undefined if the array contains no observed values", function () {
    expect((0, _index.max)([].map(box), unbox)).toBe(undefined);
    expect((0, _index.max)([null].map(box), unbox)).toBe(undefined);
    expect((0, _index.max)([undefined].map(box), unbox)).toBe(undefined);
    expect((0, _index.max)([NaN].map(box), unbox)).toBe(undefined);
    expect((0, _index.max)([NaN, NaN].map(box), unbox)).toBe(undefined);
  });
  it("max(array, f) passes the accessor d, i, and array", function () {
    var results = [];
    var array = ["a", "b", "c"];
    (0, _index.max)(array, function (d, i, array) {
      return results.push([d, i, array]);
    });
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });
  it("max(array, f) uses the undefined context", function () {
    var results = [];
    (0, _index.max)([1, 2], function () {
      results.push(this);
    });
    expect(results).toEqual([undefined, undefined]);
  });
});
//# sourceMappingURL=max.test.js.map