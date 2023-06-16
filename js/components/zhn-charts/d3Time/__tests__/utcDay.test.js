"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time utcDay', () => {
  it("utcDay.floor(date) returns days", () => {
    expect(_index.utcDay.floor((0, _helperFn.utc)(2010, 11, 31, 23))).toEqual((0, _helperFn.utc)(2010, 11, 31));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 0, 1, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 0, 1, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcDay.floor(date) does not observe daylight saving", () => {
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.utc)(2011, 2, 13));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.utc)(2011, 2, 13));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.utc)(2011, 2, 13));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.utc)(2011, 2, 13));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 10, 6, 5))).toEqual((0, _helperFn.utc)(2011, 10, 6));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 10, 6, 6))).toEqual((0, _helperFn.utc)(2011, 10, 6));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.utc)(2011, 10, 6));
    expect(_index.utcDay.floor((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.utc)(2011, 10, 6));
  });
  it("utcDay.round(date) returns days", () => {
    expect(_index.utcDay.round((0, _helperFn.utc)(2010, 11, 30, 13))).toEqual((0, _helperFn.utc)(2010, 11, 31));
    expect(_index.utcDay.round((0, _helperFn.utc)(2010, 11, 30, 11))).toEqual((0, _helperFn.utc)(2010, 11, 30));
  });
  it("utcDay.ceil(date) returns days", () => {
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2010, 11, 30, 23))).toEqual((0, _helperFn.utc)(2010, 11, 31));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2010, 11, 31, 0))).toEqual((0, _helperFn.utc)(2010, 11, 31));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2010, 11, 31, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcDay.ceil(date) does not observe daylight saving", () => {
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.utc)(2011, 2, 14));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.utc)(2011, 2, 14));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.utc)(2011, 2, 14));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.utc)(2011, 2, 14));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 10, 6, 5))).toEqual((0, _helperFn.utc)(2011, 10, 7));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 10, 6, 6))).toEqual((0, _helperFn.utc)(2011, 10, 7));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.utc)(2011, 10, 7));
    expect(_index.utcDay.ceil((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.utc)(2011, 10, 7));
  });
  it("utcDay.offset(date) is an alias for utcDay.offset(date, 1)", () => {
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.utc)(2011, 0, 1, 23, 59, 59, 999));
  });
  it("utcDay.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999);
    _index.utcDay.offset(d, +1);
    expect(d).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("utcDay.offset(date, step) does not round the passed-in date", () => {
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.utc)(2011, 0, 1, 23, 59, 59, 999));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.utc)(2010, 11, 29, 23, 59, 59, 456));
  });
  it("utcDay.offset(date, step) allows step to be negative", () => {
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31), -1)).toEqual((0, _helperFn.utc)(2010, 11, 30));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2011, 0, 1), -2)).toEqual((0, _helperFn.utc)(2010, 11, 30));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2011, 0, 1), -1)).toEqual((0, _helperFn.utc)(2010, 11, 31));
  });
  it("utcDay.offset(date, step) allows step to be positive", () => {
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31), +1)).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 30), +2)).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 30), +1)).toEqual((0, _helperFn.utc)(2010, 11, 31));
  });
  it("utcDay.offset(date, step) allows step to be zero", () => {
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.utcDay.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("utcDay.count(start, end) counts days after start (exclusive) and before end (inclusive)", () => {
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1, 0), (0, _helperFn.utc)(2011, 4, 9, 0))).toBe(128);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1, 1), (0, _helperFn.utc)(2011, 4, 9, 0))).toBe(128);
    expect(_index.utcDay.count((0, _helperFn.utc)(2010, 11, 31, 23), (0, _helperFn.utc)(2011, 4, 9, 0))).toBe(129);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1, 0), (0, _helperFn.utc)(2011, 4, 8, 23))).toBe(127);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1, 0), (0, _helperFn.utc)(2011, 4, 9, 1))).toBe(128);
  });
  it("utcDay.count(start, end) does not observe daylight saving", () => {
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 2, 13, 1))).toBe(71);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 2, 13, 3))).toBe(71);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 2, 13, 4))).toBe(71);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 10, 6, 0))).toBe(309);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 10, 6, 1))).toBe(309);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 10, 6, 2))).toBe(309);
  });
  it("utcDay.count(start, end) returns 364 or 365 for a full year", () => {
    expect(_index.utcDay.count((0, _helperFn.utc)(1999, 0, 1), (0, _helperFn.utc)(1999, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2000, 0, 1), (0, _helperFn.utc)(2000, 11, 31))).toBe(365); // leap year
    expect(_index.utcDay.count((0, _helperFn.utc)(2001, 0, 1), (0, _helperFn.utc)(2001, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2002, 0, 1), (0, _helperFn.utc)(2002, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2003, 0, 1), (0, _helperFn.utc)(2003, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2004, 0, 1), (0, _helperFn.utc)(2004, 11, 31))).toBe(365); // leap year
    expect(_index.utcDay.count((0, _helperFn.utc)(2005, 0, 1), (0, _helperFn.utc)(2005, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2006, 0, 1), (0, _helperFn.utc)(2006, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2007, 0, 1), (0, _helperFn.utc)(2007, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2008, 0, 1), (0, _helperFn.utc)(2008, 11, 31))).toBe(365); // leap year
    expect(_index.utcDay.count((0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2009, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2010, 11, 31))).toBe(364);
    expect(_index.utcDay.count((0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2011, 11, 31))).toBe(364);
  });
  it("utcDay.every(step) returns every stepth day, starting with the first day of the month", () => {
    expect(_index.utcDay.every(3).range((0, _helperFn.utc)(2008, 11, 30, 0, 12), (0, _helperFn.utc)(2009, 0, 5, 23, 48))).toEqual([(0, _helperFn.utc)(2008, 11, 31), (0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2009, 0, 4)]);
    expect(_index.utcDay.every(5).range((0, _helperFn.utc)(2008, 11, 30, 0, 12), (0, _helperFn.utc)(2009, 0, 6, 23, 48))).toEqual([(0, _helperFn.utc)(2008, 11, 31), (0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2009, 0, 6)]);
    expect(_index.utcDay.every(7).range((0, _helperFn.utc)(2008, 11, 30, 0, 12), (0, _helperFn.utc)(2009, 0, 8, 23, 48))).toEqual([(0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2009, 0, 8)]);
  });
});
//# sourceMappingURL=utcDay.test.js.map