"use strict";

var _index = require("../index");
describe('d3Array zip', function () {
  it("zip() and zip([]) return an empty array", function () {
    expect((0, _index.zip)()).toEqual([]);
    expect((0, _index.zip)([])).toEqual([]);
  });
  it("zip([a, b, …]) returns [[a], [b], …]", function () {
    expect((0, _index.zip)([1, 2, 3, 4, 5])).toEqual([[1], [2], [3], [4], [5]]);
  });
  it("zip([a1, b1, …], [a2, b2, …]) returns [[a1, a2], [b1, b2], …]", function () {
    expect((0, _index.zip)([1, 2], [3, 4])).toEqual([[1, 3], [2, 4]]);
    expect((0, _index.zip)([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])).toEqual([[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
  });
  it("zip([a1, b1, …], [a2, b2, …], [a3, b3, …]) returns [[a1, a2, a3], [b1, b2, b3], …]", function () {
    expect((0, _index.zip)([1, 2, 3], [4, 5, 6], [7, 8, 9])).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
  });
  it("zip(…) ignores extra elements given an irregular matrix", function () {
    expect((0, _index.zip)([1, 2], [3, 4], [5, 6, 7])).toEqual([[1, 3, 5], [2, 4, 6]]);
  });
});
//# sourceMappingURL=zip.test.js.map