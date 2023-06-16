"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time utcMonth', () => {
  it("utcMonth.floor(date) returns months", () => {
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2010, 11, 31, 23))).toEqual((0, _helperFn.utc)(2010, 11, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 0, 1, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 0, 1, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcMonth.floor(date) observes daylight saving", () => {
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.floor((0, _helperFn.utc)(2011, 10, 6, 10))).toEqual((0, _helperFn.utc)(2011, 10, 1));
  });
  it("utcMonth.floor(date) handles years in the first century", () => {
    expect(_index.utcMonth.floor((0, _helperFn.utc)(9, 10, 6, 7))).toEqual((0, _helperFn.utc)(9, 10, 1));
  });
  it("utcMonth.round(date) returns months", () => {
    expect(_index.utcMonth.round((0, _helperFn.utc)(2010, 11, 16, 12))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2010, 11, 16, 11))).toEqual((0, _helperFn.utc)(2010, 11, 1));
  });
  it("utcMonth.round(date) observes daylight saving", () => {
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 2, 13, 20))).toEqual((0, _helperFn.utc)(2011, 2, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.utc)(2011, 10, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2011, 10, 6, 20))).toEqual((0, _helperFn.utc)(2011, 10, 1));
  });
  it("utcMonth.round(date) handles midnight for leap years", () => {
    expect(_index.utcMonth.round((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.utc)(2012, 2, 1));
    expect(_index.utcMonth.round((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.utc)(2012, 2, 1));
  });
  it("utcMonth.ceil(date) returns months", () => {
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2010, 10, 30, 23))).toEqual((0, _helperFn.utc)(2010, 11, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2010, 11, 1, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcMonth.ceil(date) observes daylight saving", () => {
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.utc)(2011, 3, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.utc)(2011, 3, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.utc)(2011, 3, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.utc)(2011, 3, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.utc)(2011, 11, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.utc)(2011, 11, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.utc)(2011, 11, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2011, 10, 6, 10))).toEqual((0, _helperFn.utc)(2011, 11, 1));
  });
  it("utcMonth.ceil(date) handles midnight for leap years", () => {
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.utc)(2012, 2, 1));
    expect(_index.utcMonth.ceil((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.utc)(2012, 2, 1));
  });
  it("utcMonth.offset(date) is an alias for utcMonth.offset(date, 1)", () => {
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.utc)(2011, 0, 31, 23, 59, 59, 999));
  });
  it("utcMonth.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999);
    _index.utcMonth.offset(d, +1);
    expect(d).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("utcMonth.offset(date, step) does not round the passed-in date", () => {
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.utc)(2011, 0, 31, 23, 59, 59, 999));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.utc)(2010, 9, 31, 23, 59, 59, 456));
  });
  it("utcMonth.offset(date, step) allows step to be negative", () => {
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31), -1)).toEqual((0, _helperFn.utc)(2010, 10, 31));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2011, 0, 1), -2)).toEqual((0, _helperFn.utc)(2010, 10, 1));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2011, 0, 1), -1)).toEqual((0, _helperFn.utc)(2010, 11, 1));
  });
  it("utcMonth.offset(date, step) allows step to be positive", () => {
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31), +1)).toEqual((0, _helperFn.utc)(2011, 0, 31));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 30), +2)).toEqual((0, _helperFn.utc)(2011, 1, 30));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 30), +1)).toEqual((0, _helperFn.utc)(2011, 0, 30));
  });
  it("utcMonth.offset(date, step) allows step to be zero", () => {
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.utcMonth.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("utcMonth.range(start, stop) returns months between start (inclusive) and stop (exclusive)", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 11, 1), (0, _helperFn.utc)(2012, 5, 1))).toEqual([(0, _helperFn.utc)(2011, 11, 1), (0, _helperFn.utc)(2012, 0, 1), (0, _helperFn.utc)(2012, 1, 1), (0, _helperFn.utc)(2012, 2, 1), (0, _helperFn.utc)(2012, 3, 1), (0, _helperFn.utc)(2012, 4, 1)]);
  });
  it("utcMonth.range(start, stop) returns months", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 10, 4, 2), (0, _helperFn.utc)(2012, 4, 10, 13))).toEqual([(0, _helperFn.utc)(2011, 11, 1), (0, _helperFn.utc)(2012, 0, 1), (0, _helperFn.utc)(2012, 1, 1), (0, _helperFn.utc)(2012, 2, 1), (0, _helperFn.utc)(2012, 3, 1), (0, _helperFn.utc)(2012, 4, 1)]);
  });
  it("utcMonth.range(start, stop) coerces start and stop to dates", () => {
    expect(_index.utcMonth.range(+(0, _helperFn.utc)(2011, 10, 4), +(0, _helperFn.utc)(2012, 1, 7))).toEqual([(0, _helperFn.utc)(2011, 11, 1), (0, _helperFn.utc)(2012, 0, 1), (0, _helperFn.utc)(2012, 1, 1)]);
  });
  it("utcMonth.range(start, stop) returns the empty array for invalid dates", () => {
    expect(_index.utcMonth.range(new Date(NaN), Infinity)).toEqual([]);
  });
  it("utcMonth.range(start, stop) returns the empty array if start >= stop", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 11, 10), (0, _helperFn.utc)(2011, 10, 4))).toEqual([]);
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 10, 1), (0, _helperFn.utc)(2011, 10, 1))).toEqual([]);
  });
  it("utcMonth.range(start, stop) returns months", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2010, 10, 31), (0, _helperFn.utc)(2011, 2, 1))).toEqual([(0, _helperFn.utc)(2010, 11, 1), (0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 1, 1)]);
  });
  it("utcMonth.range(start, stop) has an inclusive lower bound", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2010, 10, 31), (0, _helperFn.utc)(2011, 2, 1))[0]).toEqual((0, _helperFn.utc)(2010, 11, 1));
  });
  it("utcMonth.range(start, stop) has an exclusive upper bound", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2010, 10, 31), (0, _helperFn.utc)(2011, 2, 1))[2]).toEqual((0, _helperFn.utc)(2011, 1, 1));
  });
  it("utcMonth.range(start, stop) can skip months", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 1, 1), (0, _helperFn.utc)(2012, 1, 1), 3)).toEqual([(0, _helperFn.utc)(2011, 1, 1), (0, _helperFn.utc)(2011, 4, 1), (0, _helperFn.utc)(2011, 7, 1), (0, _helperFn.utc)(2011, 10, 1)]);
  });
  it("utcMonth.range(start, stop) observes start of daylight savings time", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 4, 1))).toEqual([(0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 1, 1), (0, _helperFn.utc)(2011, 2, 1), (0, _helperFn.utc)(2011, 3, 1)]);
  });
  it("utcMonth.range(start, stop) observes end of daylight savings time", () => {
    expect(_index.utcMonth.range((0, _helperFn.utc)(2011, 9, 1), (0, _helperFn.utc)(2012, 1, 1))).toEqual([(0, _helperFn.utc)(2011, 9, 1), (0, _helperFn.utc)(2011, 10, 1), (0, _helperFn.utc)(2011, 11, 1), (0, _helperFn.utc)(2012, 0, 1)]);
  });
  it("utcMonth.count(start, end) counts months after start (exclusive) and before end (inclusive)", () => {
    expect(_index.utcMonth.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 4, 1))).toBe(4);
    expect(_index.utcMonth.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 3, 30))).toBe(3);
    expect(_index.utcMonth.count((0, _helperFn.utc)(2010, 11, 31), (0, _helperFn.utc)(2011, 3, 30))).toBe(4);
    expect(_index.utcMonth.count((0, _helperFn.utc)(2010, 11, 31), (0, _helperFn.utc)(2011, 4, 1))).toBe(5);
    expect(_index.utcMonth.count((0, _helperFn.utc)(2009, 11, 31), (0, _helperFn.utc)(2012, 4, 1))).toBe(29);
    expect(_index.utcMonth.count((0, _helperFn.utc)(2012, 4, 1), (0, _helperFn.utc)(2009, 11, 31))).toBe(-29);
  });
  it("utcMonth.every(step) returns every stepth month, starting with the first month of the year", () => {
    expect(_index.utcMonth.every(3).range((0, _helperFn.utc)(2008, 11, 3), (0, _helperFn.utc)(2010, 6, 5))).toEqual([(0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2009, 3, 1), (0, _helperFn.utc)(2009, 6, 1), (0, _helperFn.utc)(2009, 9, 1), (0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2010, 3, 1), (0, _helperFn.utc)(2010, 6, 1)]);
  });
});
//# sourceMappingURL=utcMonth.test.js.map