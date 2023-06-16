"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeMonday', () => {
  it("timeMonday.floor(date) returns Mondays", () => {
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 1, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 27));
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 0))).toEqual((0, _helperFn.local)(2010, 11, 27));
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 1))).toEqual((0, _helperFn.local)(2010, 11, 27));
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 2, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 27));
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 3, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 3));
    expect(_index.timeMonday.floor((0, _helperFn.local)(2011, 0, 3, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 3));
  });
  it("timeMonday.range(start, stop, step) returns every step Monday", () => {
    expect(_index.timeMonday.range((0, _helperFn.local)(2011, 11, 1), (0, _helperFn.local)(2012, 0, 15), 2)).toEqual([(0, _helperFn.local)(2011, 11, 5), (0, _helperFn.local)(2011, 11, 19), (0, _helperFn.local)(2012, 0, 2)]);
  });
  it("timeMonday.count(start, end) counts Mondays after start (exclusive) and before end (inclusive)", () => {
    //     January 2014
    // Su Mo Tu We Th Fr Sa
    //           1  2  3  4
    //  5  6  7  8  9 10 11
    // 12 13 14 15 16 17 18
    // 19 20 21 22 23 24 25
    // 26 27 28 29 30 31
    expect(_index.timeMonday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 5))).toBe(0);
    expect(_index.timeMonday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 6))).toBe(1);
    expect(_index.timeMonday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 7))).toBe(1);
    expect(_index.timeMonday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 13))).toBe(2);

    //     January 2018
    // Su Mo Tu We Th Fr Sa
    //     1  2  3  4  5  6
    //  7  8  9 10 11 12 13
    // 14 15 16 17 18 19 20
    // 21 22 23 24 25 26 27
    // 28 29 30 31
    expect(_index.timeMonday.count((0, _helperFn.local)(2018, 0, 1), (0, _helperFn.local)(2018, 0, 7))).toBe(0);
    expect(_index.timeMonday.count((0, _helperFn.local)(2018, 0, 1), (0, _helperFn.local)(2018, 0, 8))).toBe(1);
    expect(_index.timeMonday.count((0, _helperFn.local)(2018, 0, 1), (0, _helperFn.local)(2018, 0, 9))).toBe(1);
  });
  it("timeMonday.count(start, end) observes daylight saving", () => {
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 1))).toBe(10);
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 3))).toBe(10);
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 4))).toBe(10);
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 0))).toBe(44);
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 1))).toBe(44);
    expect(_index.timeMonday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 2))).toBe(44);
  });
});
//# sourceMappingURL=timeMonday.test.js.map