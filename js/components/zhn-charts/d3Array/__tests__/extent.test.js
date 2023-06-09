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
describe('d3Array extent', function () {
  it("extent(array) returns the least and greatest numeric values for numbers", function () {
    expect((0, _index.extent)([1])).toEqual([1, 1]);
    expect((0, _index.extent)([5, 1, 2, 3, 4])).toEqual([1, 5]);
    expect((0, _index.extent)([20, 3])).toEqual([3, 20]);
    expect((0, _index.extent)([3, 20])).toEqual([3, 20]);
  });
  it("extent(array) returns the least and greatest lexicographic value for strings", function () {
    expect((0, _index.extent)(["c", "a", "b"])).toEqual(["a", "c"]);
    expect((0, _index.extent)(["20", "3"])).toEqual(["20", "3"]);
    expect((0, _index.extent)(["3", "20"])).toEqual(["20", "3"]);
  });
  it("extent(array) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.extent)([NaN, 1, 2, 3, 4, 5])).toEqual([1, 5]);
    expect((0, _index.extent)([o, 1, 2, 3, 4, 5])).toEqual([1, 5]);
    expect((0, _index.extent)([1, 2, 3, 4, 5, NaN])).toEqual([1, 5]);
    expect((0, _index.extent)([1, 2, 3, 4, 5, o])).toEqual([1, 5]);
    expect((0, _index.extent)([10, null, 3, undefined, 5, NaN])).toEqual([3, 10]);
    expect((0, _index.extent)([-1, null, -3, undefined, -5, NaN])).toEqual([-5, -1]);
  });
  it("extent(array) compares heterogenous types as numbers", function () {
    expect((0, _index.extent)([20, "3"])).toEqual(["3", 20]);
    expect((0, _index.extent)(["20", 3])).toEqual([3, "20"]);
    expect((0, _index.extent)([3, "20"])).toEqual([3, "20"]);
    expect((0, _index.extent)(["3", 20])).toEqual(["3", 20]);
  });
  it("extent(array) returns undefined if the array contains no numbers", function () {
    expect((0, _index.extent)([])).toEqual([undefined, undefined]);
    expect((0, _index.extent)([null])).toEqual([undefined, undefined]);
    expect((0, _index.extent)([undefined])).toEqual([undefined, undefined]);
    expect((0, _index.extent)([NaN])).toEqual([undefined, undefined]);
    expect((0, _index.extent)([NaN, NaN])).toEqual([undefined, undefined]);
  });
  it("extent(array, f) returns the least and greatest numeric value for numbers", function () {
    expect((0, _index.extent)([1].map(box), unbox)).toEqual([1, 1]);
    expect((0, _index.extent)([5, 1, 2, 3, 4].map(box), unbox)).toEqual([1, 5]);
    expect((0, _index.extent)([20, 3].map(box), unbox)).toEqual([3, 20]);
    expect((0, _index.extent)([3, 20].map(box), unbox)).toEqual([3, 20]);
  });
  it("extent(array, f) returns the least and greatest lexicographic value for strings", function () {
    expect((0, _index.extent)(["c", "a", "b"].map(box), unbox)).toEqual(["a", "c"]);
    expect((0, _index.extent)(["20", "3"].map(box), unbox)).toEqual(["20", "3"]);
    expect((0, _index.extent)(["3", "20"].map(box), unbox)).toEqual(["20", "3"]);
  });
  it("extent(array, f) ignores null, undefined and NaN", function () {
    var o = {
      valueOf: function valueOf() {
        return NaN;
      }
    };
    expect((0, _index.extent)([NaN, 1, 2, 3, 4, 5].map(box), unbox)).toEqual([1, 5]);
    expect((0, _index.extent)([o, 1, 2, 3, 4, 5].map(box), unbox)).toEqual([1, 5]);
    expect((0, _index.extent)([1, 2, 3, 4, 5, NaN].map(box), unbox)).toEqual([1, 5]);
    expect((0, _index.extent)([1, 2, 3, 4, 5, o].map(box), unbox)).toEqual([1, 5]);
    expect((0, _index.extent)([10, null, 3, undefined, 5, NaN].map(box), unbox)).toEqual([3, 10]);
    expect((0, _index.extent)([-1, null, -3, undefined, -5, NaN].map(box), unbox)).toEqual([-5, -1]);
  });
  it("extent(array, f) compares heterogenous types as numbers", function () {
    expect((0, _index.extent)([20, "3"].map(box), unbox)).toEqual(["3", 20]);
    expect((0, _index.extent)(["20", 3].map(box), unbox)).toEqual([3, "20"]);
    expect((0, _index.extent)([3, "20"].map(box), unbox)).toEqual([3, "20"]);
    expect((0, _index.extent)(["3", 20].map(box), unbox)).toEqual(["3", 20]);
  });
  it("extent(array, f) returns undefined if the array contains no observed values", function () {
    expect((0, _index.extent)([].map(box), unbox)).toEqual([undefined, undefined]);
    expect((0, _index.extent)([null].map(box), unbox)).toEqual([undefined, undefined]);
    expect((0, _index.extent)([undefined].map(box), unbox)).toEqual([undefined, undefined]);
    expect((0, _index.extent)([NaN].map(box), unbox)).toEqual([undefined, undefined]);
    expect((0, _index.extent)([NaN, NaN].map(box), unbox)).toEqual([undefined, undefined]);
  });
  it("extent(array, f) passes the accessor d, i, and array", function () {
    var results = [];
    var array = ["a", "b", "c"];
    (0, _index.extent)(array, function (d, i, array) {
      return results.push([d, i, array]);
    });
    expect(results).toEqual([["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  });
  it("extent(array, f) uses the undefined context", function () {
    var results = [];
    (0, _index.extent)([1, 2], function () {
      results.push(this);
    });
    expect(results).toEqual([undefined, undefined]);
  });
});
//# sourceMappingURL=extent.test.js.map