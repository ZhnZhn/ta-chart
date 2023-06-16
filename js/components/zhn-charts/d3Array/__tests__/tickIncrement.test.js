"use strict";

var _index = require("../index");
describe('d3Array tickIncrement', () => {
  it("tickIncrement(start, stop, count) returns NaN if any argument is NaN", () => {
    expect(isNaN((0, _index.tickIncrement)(NaN, 1, 1))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(0, NaN, 1))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(0, 1, NaN))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(NaN, NaN, 1))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(0, NaN, NaN))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(NaN, 1, NaN))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(NaN, NaN, NaN))).toBe(true);
  });
  it("tickIncrement(start, stop, count) returns NaN or -Infinity if start === stop", () => {
    expect(isNaN((0, _index.tickIncrement)(1, 1, -1))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(1, 1, 0))).toBe(true);
    expect(isNaN((0, _index.tickIncrement)(1, 1, NaN))).toBe(true);
    expect((0, _index.tickIncrement)(1, 1, 1)).toBe(-Infinity);
    expect((0, _index.tickIncrement)(1, 1, 10)).toBe(-Infinity);
  });
  it("tickIncrement(start, stop, count) returns 0 or Infinity if count is not positive", () => {
    expect((0, _index.tickIncrement)(0, 1, -1)).toBe(Infinity);
    expect((0, _index.tickIncrement)(0, 1, 0)).toBe(Infinity);
  });
  it("tickIncrement(start, stop, count) returns -Infinity if count is infinity", () => {
    expect((0, _index.tickIncrement)(0, 1, Infinity)).toBe(-Infinity);
  });
  it("tickIncrement(start, stop, count) returns approximately count + 1 tickIncrement when start < stop", () => {
    expect((0, _index.tickIncrement)(0, 1, 10)).toBe(-10);
    expect((0, _index.tickIncrement)(0, 1, 9)).toBe(-10);
    expect((0, _index.tickIncrement)(0, 1, 8)).toBe(-10);
    expect((0, _index.tickIncrement)(0, 1, 7)).toBe(-5);
    expect((0, _index.tickIncrement)(0, 1, 6)).toBe(-5);
    expect((0, _index.tickIncrement)(0, 1, 5)).toBe(-5);
    expect((0, _index.tickIncrement)(0, 1, 4)).toBe(-5);
    expect((0, _index.tickIncrement)(0, 1, 3)).toBe(-2);
    expect((0, _index.tickIncrement)(0, 1, 2)).toBe(-2);
    expect((0, _index.tickIncrement)(0, 1, 1)).toBe(1);
    expect((0, _index.tickIncrement)(0, 10, 10)).toBe(1);
    expect((0, _index.tickIncrement)(0, 10, 9)).toBe(1);
    expect((0, _index.tickIncrement)(0, 10, 8)).toBe(1);
    expect((0, _index.tickIncrement)(0, 10, 7)).toBe(2);
    expect((0, _index.tickIncrement)(0, 10, 6)).toBe(2);
    expect((0, _index.tickIncrement)(0, 10, 5)).toBe(2);
    expect((0, _index.tickIncrement)(0, 10, 4)).toBe(2);
    expect((0, _index.tickIncrement)(0, 10, 3)).toBe(5);
    expect((0, _index.tickIncrement)(0, 10, 2)).toBe(5);
    expect((0, _index.tickIncrement)(0, 10, 1)).toBe(10);
    expect((0, _index.tickIncrement)(-10, 10, 10)).toBe(2);
    expect((0, _index.tickIncrement)(-10, 10, 9)).toBe(2);
    expect((0, _index.tickIncrement)(-10, 10, 8)).toBe(2);
    expect((0, _index.tickIncrement)(-10, 10, 7)).toBe(2);
    expect((0, _index.tickIncrement)(-10, 10, 6)).toBe(5);
    expect((0, _index.tickIncrement)(-10, 10, 5)).toBe(5);
    expect((0, _index.tickIncrement)(-10, 10, 4)).toBe(5);
    expect((0, _index.tickIncrement)(-10, 10, 3)).toBe(5);
    expect((0, _index.tickIncrement)(-10, 10, 2)).toBe(10);
    expect((0, _index.tickIncrement)(-10, 10, 1)).toBe(20);
  });
});
//# sourceMappingURL=tickIncrement.test.js.map