"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeSunday', () => {
  it("timeSunday.floor(date) returns Sundays", () => {
    expect(_index.timeSunday.floor((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 0, 1, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 2));
  });
  it("timeSunday.floor(date) observes daylight saving", () => {
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 2, 13, 1))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeSunday.floor((0, _helperFn.local)(2011, 10, 6, 1))).toEqual((0, _helperFn.local)(2011, 10, 6));
  });
  it("timeSunday.floor(date) handles years in the first century", () => {
    expect(_index.timeSunday.floor((0, _helperFn.local)(9, 10, 6, 7))).toEqual((0, _helperFn.local)(9, 10, 1));
  });
  it("timeSunday.ceil(date) returns Sundays", () => {
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 0, 1, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 0, 2, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 0, 2, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 9));
  });
  it("timeSunday.ceil(date) observes daylight saving", () => {
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 2, 13, 1))).toEqual((0, _helperFn.local)(2011, 2, 20));
    expect(_index.timeSunday.ceil((0, _helperFn.local)(2011, 10, 6, 1))).toEqual((0, _helperFn.local)(2011, 10, 13));
  });
  it("timeSunday.offset(date) is an alias for timeSunday.offset(date, 1)", () => {
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.local)(2011, 0, 7, 23, 59, 59, 999));
  });
  it("timeSunday.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeSunday.offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeSunday.offset(date, step) does not round the passed-in date", () => {
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 0, 7, 23, 59, 59, 999));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2010, 11, 17, 23, 59, 59, 456));
  });
  it("timeSunday.offset(date, step) allows step to be negative", () => {
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 1), -1)).toEqual((0, _helperFn.local)(2010, 10, 24));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2011, 0, 1), -2)).toEqual((0, _helperFn.local)(2010, 11, 18));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2011, 0, 1), -1)).toEqual((0, _helperFn.local)(2010, 11, 25));
  });
  it("timeSunday.offset(date, step) allows step to be positive", () => {
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 10, 24), +1)).toEqual((0, _helperFn.local)(2010, 11, 1));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 18), +2)).toEqual((0, _helperFn.local)(2011, 0, 1));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 25), +1)).toEqual((0, _helperFn.local)(2011, 0, 1));
  });
  it("timeSunday.offset(date, step) allows step to be zero", () => {
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.timeSunday.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("timeSunday.range(start, stop) returns Sundays between start (inclusive) and stop (exclusive)", () => {
    expect(_index.timeSunday.range((0, _helperFn.local)(2011, 11, 1), (0, _helperFn.local)(2012, 0, 15))).toEqual([(0, _helperFn.local)(2011, 11, 4), (0, _helperFn.local)(2011, 11, 11), (0, _helperFn.local)(2011, 11, 18), (0, _helperFn.local)(2011, 11, 25), (0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 8)]);
  });
  it("timeSunday.range(start, stop) returns Sundays", () => {
    expect(_index.timeSunday.range((0, _helperFn.local)(2011, 11, 1, 12, 23), (0, _helperFn.local)(2012, 0, 14, 12, 23))).toEqual([(0, _helperFn.local)(2011, 11, 4), (0, _helperFn.local)(2011, 11, 11), (0, _helperFn.local)(2011, 11, 18), (0, _helperFn.local)(2011, 11, 25), (0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 8)]);
  });
  it("timeSunday.range(start, stop) coerces start and stop to dates", () => {
    expect(_index.timeSunday.range(+(0, _helperFn.local)(2011, 11, 1), +(0, _helperFn.local)(2012, 0, 15))).toEqual([(0, _helperFn.local)(2011, 11, 4), (0, _helperFn.local)(2011, 11, 11), (0, _helperFn.local)(2011, 11, 18), (0, _helperFn.local)(2011, 11, 25), (0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 8)]);
  });
  it("timeSunday.range(start, stop) returns the empty array for invalid dates", () => {
    expect(_index.timeSunday.range(new Date(NaN), Infinity)).toEqual([]);
  });
  it("timeSunday.range(start, stop) returns the empty array if start >= stop", () => {
    expect(_index.timeSunday.range((0, _helperFn.local)(2011, 11, 10), (0, _helperFn.local)(2011, 10, 4))).toEqual([]);
    expect(_index.timeSunday.range((0, _helperFn.local)(2011, 10, 1), (0, _helperFn.local)(2011, 10, 1))).toEqual([]);
  });
  it("timeSunday.range(start, stop, step) returns every step Sunday", () => {
    expect(_index.timeSunday.range((0, _helperFn.local)(2011, 11, 1), (0, _helperFn.local)(2012, 0, 15), 2)).toEqual([(0, _helperFn.local)(2011, 11, 4), (0, _helperFn.local)(2011, 11, 18), (0, _helperFn.local)(2012, 0, 1)]);
  });
  it("timeSunday.count(start, end) counts Sundays after start (exclusive) and before end (inclusive)", () => {
    //     January 2014
    // Su Mo Tu We Th Fr Sa
    //           1  2  3  4
    //  5  6  7  8  9 10 11
    // 12 13 14 15 16 17 18
    // 19 20 21 22 23 24 25
    // 26 27 28 29 30 31
    expect(_index.timeSunday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 4))).toBe(0);
    expect(_index.timeSunday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 5))).toBe(1);
    expect(_index.timeSunday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 6))).toBe(1);
    expect(_index.timeSunday.count((0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2014, 0, 12))).toBe(2);

    //       January 2012
    // Su Mo Tu We Th Fr Sa
    //  1  2  3  4  5  6  7
    //  8  9 10 11 12 13 14
    // 15 16 17 18 19 20 21
    // 22 23 24 25 26 27 28
    // 29 30 31
    expect(_index.timeSunday.count((0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 7))).toBe(0);
    expect(_index.timeSunday.count((0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 8))).toBe(1);
    expect(_index.timeSunday.count((0, _helperFn.local)(2012, 0, 1), (0, _helperFn.local)(2012, 0, 9))).toBe(1);
  });
  it("timeSunday.count(start, end) observes daylight saving", () => {
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 1))).toBe(11);
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 3))).toBe(11);
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 4))).toBe(11);
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 0))).toBe(45);
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 1))).toBe(45);
    expect(_index.timeSunday.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 2))).toBe(45);
  });
});
//# sourceMappingURL=timeSunday.test.js.map