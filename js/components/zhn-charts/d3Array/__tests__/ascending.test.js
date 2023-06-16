"use strict";

var _index = require("../index");
describe('d3Array ascending', () => {
  it("ascending(a, b) returns a negative number if a < b", () => {
    expect((0, _index.ascending)(0, 1) < 0).toBe(true);
    expect((0, _index.ascending)("a", "b") < 0).toBe(true);
  });
  it("ascending(a, b) returns a positive number if a > b", () => {
    expect((0, _index.ascending)(1, 0) > 0).toBe(true);
    expect((0, _index.ascending)("b", "a") > 0).toBe(true);
  });
  it("ascending(a, b) returns zero if a >= b and a <= b", () => {
    expect((0, _index.ascending)(0, 0)).toBe(0);
    expect((0, _index.ascending)("a", "a")).toBe(0);
    expect((0, _index.ascending)("0", 0)).toBe(0);
    expect((0, _index.ascending)(0, "0")).toBe(0);
  });
  it("ascending(a, b) returns NaN if a and b are not comparable", () => {
    expect(isNaN((0, _index.ascending)(0, undefined))).toBe(true);
    expect(isNaN((0, _index.ascending)(undefined, 0))).toBe(true);
    expect(isNaN((0, _index.ascending)(undefined, undefined))).toBe(true);
    expect(isNaN((0, _index.ascending)(0, NaN))).toBe(true);
    expect(isNaN((0, _index.ascending)(NaN, 0))).toBe(true);
    expect(isNaN((0, _index.ascending)(NaN, NaN))).toBe(true);
  });
});
//# sourceMappingURL=ascending.test.js.map