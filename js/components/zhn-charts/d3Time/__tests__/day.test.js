"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
//4 skipped test (1 dayTime.floor, 3 dayTime.ceil)

describe('d3Time timeDay, timeYear', () => {
  it("timeDay() is equivalent to timeDay.floor(new Date)", () => {
    const t = new Date();
    expect((0, _index.timeDay)()).toEqual(_index.timeDay.floor(t));
  });
  it("timeDay(date) is equivalent to timeDay.floor(date)", () => {
    const t = new Date();
    expect((0, _index.timeDay)(t)).toEqual(_index.timeDay.floor(t));
  });
  it("timeDay.floor(date) returns days", () => {
    expect(_index.timeDay.floor((0, _helperFn.local)(2010, 11, 31, 23))).toEqual((0, _helperFn.local)(2010, 11, 31));
    expect(_index.timeDay.floor((0, _helperFn.local)(2011, 0, 1, 0))).toEqual((0, _helperFn.local)(2011, 0, 1));
    expect(_index.timeDay.floor((0, _helperFn.local)(2011, 0, 1, 1))).toEqual((0, _helperFn.local)(2011, 0, 1));
  });
  it.skip("timeDay.floor(date) observes daylight saving", () => {
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.local)(2011, 2, 12));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.floor((0, _helperFn.utc)(2011, 10, 6, 10))).toEqual((0, _helperFn.local)(2011, 10, 6));
  });
  it("timeDay.floor(date) handles years in the first century", () => {
    expect(_index.timeDay.floor((0, _helperFn.local)(9, 10, 6, 7))).toEqual((0, _helperFn.local)(9, 10, 6));
  });
  it("timeDay.round(date) returns days", () => {
    expect(_index.timeDay.round((0, _helperFn.local)(2010, 11, 30, 13))).toEqual((0, _helperFn.local)(2010, 11, 31));
    expect(_index.timeDay.round((0, _helperFn.local)(2010, 11, 30, 11))).toEqual((0, _helperFn.local)(2010, 11, 30));
  });
  it("timeDay.round(date) observes daylight saving", () => {
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 2, 13, 20))).toEqual((0, _helperFn.local)(2011, 2, 14));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.round((0, _helperFn.utc)(2011, 10, 6, 20))).toEqual((0, _helperFn.local)(2011, 10, 7));
  });
  it("timeDay.round(date) handles midnight in leap years", () => {
    expect(_index.timeDay.round((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.local)(2012, 2, 1));
    expect(_index.timeDay.round((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.local)(2012, 2, 1));
  });
  it("timeDay.ceil(date) returns days", () => {
    expect(_index.timeDay.ceil((0, _helperFn.local)(2010, 11, 30, 23))).toEqual((0, _helperFn.local)(2010, 11, 31));
    expect(_index.timeDay.ceil((0, _helperFn.local)(2010, 11, 31, 0))).toEqual((0, _helperFn.local)(2010, 11, 31));
    expect(_index.timeDay.ceil((0, _helperFn.local)(2010, 11, 31, 1))).toEqual((0, _helperFn.local)(2011, 0, 1));
  });
  it.skip("timeDay.ceil(date) observes start of daylight saving", () => {
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 2, 13, 7))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 2, 13, 8))).toEqual((0, _helperFn.local)(2011, 2, 13));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 2, 13, 9))).toEqual((0, _helperFn.local)(2011, 2, 14));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 2, 13, 10))).toEqual((0, _helperFn.local)(2011, 2, 14));
  });
  it.skip("timeDay.ceil(date) observes end of daylight saving", () => {
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 10, 6, 7))).toEqual((0, _helperFn.local)(2011, 10, 6));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 10, 6, 8))).toEqual((0, _helperFn.local)(2011, 10, 7));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 10, 6, 9))).toEqual((0, _helperFn.local)(2011, 10, 7));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2011, 10, 6, 10))).toEqual((0, _helperFn.local)(2011, 10, 7));
  });
  it.skip("timeDay.ceil(date) handles midnight for leap years", () => {
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.local)(2012, 2, 1));
    expect(_index.timeDay.ceil((0, _helperFn.utc)(2012, 2, 1, 0))).toEqual((0, _helperFn.local)(2012, 2, 1));
  });
  it("timeDay.offset(date) is an alias for timeDay.offset(date, 1)", () => {
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.local)(2011, 0, 1, 23, 59, 59, 999));
  });
  it("timeDay.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeDay.offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeDay.offset(date, step) does not round the passed-in date", () => {
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 0, 1, 23, 59, 59, 999));
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2010, 11, 29, 23, 59, 59, 456));
  });
  it("timeDay.offset(date, step) allows step to be negative", () => {
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31), -1)).toEqual((0, _helperFn.local)(2010, 11, 30));
    expect(_index.timeDay.offset((0, _helperFn.local)(2011, 0, 1), -2)).toEqual((0, _helperFn.local)(2010, 11, 30));
    expect(_index.timeDay.offset((0, _helperFn.local)(2011, 0, 1), -1)).toEqual((0, _helperFn.local)(2010, 11, 31));
  });
  it("timeDay.offset(date, step) allows step to be positive", () => {
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31), +1)).toEqual((0, _helperFn.local)(2011, 0, 1));
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 30), +2)).toEqual((0, _helperFn.local)(2011, 0, 1));
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 30), +1)).toEqual((0, _helperFn.local)(2010, 11, 31));
  });
  it("timeDay.offset(date, step) allows step to be zero", () => {
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.timeDay.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("timeDay.range(start, stop) returns days between start (inclusive) and stop (exclusive)", () => {
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 10, 4), (0, _helperFn.local)(2011, 10, 10))).toEqual([(0, _helperFn.local)(2011, 10, 4), (0, _helperFn.local)(2011, 10, 5), (0, _helperFn.local)(2011, 10, 6), (0, _helperFn.local)(2011, 10, 7), (0, _helperFn.local)(2011, 10, 8), (0, _helperFn.local)(2011, 10, 9)]);
  });
  it("timeDay.range(start, stop) returns days", () => {
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 10, 4, 2), (0, _helperFn.local)(2011, 10, 10, 13))).toEqual([(0, _helperFn.local)(2011, 10, 5), (0, _helperFn.local)(2011, 10, 6), (0, _helperFn.local)(2011, 10, 7), (0, _helperFn.local)(2011, 10, 8), (0, _helperFn.local)(2011, 10, 9), (0, _helperFn.local)(2011, 10, 10)]);
  });
  it("timeDay.range(start, stop) coerces start and stop to dates", () => {
    expect(_index.timeDay.range(+(0, _helperFn.local)(2011, 10, 4), +(0, _helperFn.local)(2011, 10, 7))).toEqual([(0, _helperFn.local)(2011, 10, 4), (0, _helperFn.local)(2011, 10, 5), (0, _helperFn.local)(2011, 10, 6)]);
  });
  it("timeDay.range(start, stop) returns the empty array for invalid dates", () => {
    expect(_index.timeDay.range(new Date(NaN), Infinity)).toEqual([]);
  });
  it("timeDay.range(start, stop) returns the empty array if start >= stop", () => {
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 10, 10), (0, _helperFn.local)(2011, 10, 4))).toEqual([]);
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 10, 10), (0, _helperFn.local)(2011, 10, 10))).toEqual([]);
  });
  it("timeDay.range(start, stop, step) returns every step day", () => {
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 10, 4, 2), (0, _helperFn.local)(2011, 10, 14, 13), 3)).toEqual([(0, _helperFn.local)(2011, 10, 5), (0, _helperFn.local)(2011, 10, 8), (0, _helperFn.local)(2011, 10, 11), (0, _helperFn.local)(2011, 10, 14)]);
  });
  it("timeDay.range(start, stop, step) returns the empty array if step is zero, negative or NaN", () => {
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 0), 0)).toEqual([]);
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 0), -1)).toEqual([]);
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 0), 0.5)).toEqual([]);
    expect(_index.timeDay.range((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 0), NaN)).toEqual([]);
  });
  it("timeDay.count(start, end) counts days after start (exclusive) and before end (inclusive)", () => {
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 0))).toBe(128);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1, 1), (0, _helperFn.local)(2011, 4, 9, 0))).toBe(128);
    expect(_index.timeDay.count((0, _helperFn.local)(2010, 11, 31, 23), (0, _helperFn.local)(2011, 4, 9, 0))).toBe(129);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 8, 23))).toBe(127);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1, 0), (0, _helperFn.local)(2011, 4, 9, 1))).toBe(128);
  });
  it("timeDay.count(start, end) observes daylight saving", () => {
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 1))).toBe(71);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 3))).toBe(71);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 2, 13, 4))).toBe(71);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 0))).toBe(309);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 1))).toBe(309);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 10, 6, 2))).toBe(309);
  });
  it("timeDay.count(start, stop) does not exhibit floating-point rounding error", () => {
    const date = new Date(2011, 4, 9);
    expect(_index.timeDay.count((0, _index.timeYear)(date), date)).toBe(128);
  });
  it("timeDay.count(start, end) returns 364 or 365 for a full year", () => {
    expect(_index.timeDay.count((0, _helperFn.local)(1999, 0, 1), (0, _helperFn.local)(1999, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2000, 0, 1), (0, _helperFn.local)(2000, 11, 31))).toBe(365); // leap year
    expect(_index.timeDay.count((0, _helperFn.local)(2001, 0, 1), (0, _helperFn.local)(2001, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2002, 0, 1), (0, _helperFn.local)(2002, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2003, 0, 1), (0, _helperFn.local)(2003, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2004, 0, 1), (0, _helperFn.local)(2004, 11, 31))).toBe(365); // leap year
    expect(_index.timeDay.count((0, _helperFn.local)(2005, 0, 1), (0, _helperFn.local)(2005, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2006, 0, 1), (0, _helperFn.local)(2006, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2007, 0, 1), (0, _helperFn.local)(2007, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2008, 0, 1), (0, _helperFn.local)(2008, 11, 31))).toBe(365); // leap year
    expect(_index.timeDay.count((0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2009, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2010, 11, 31))).toBe(364);
    expect(_index.timeDay.count((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 11, 31))).toBe(364);
  });
  it("timeDay.every(step) returns every stepth day, starting with the first day of the month", () => {
    expect(_index.timeDay.every(3).range((0, _helperFn.local)(2008, 11, 30, 0, 12), (0, _helperFn.local)(2009, 0, 5, 23, 48))).toEqual([(0, _helperFn.local)(2008, 11, 31), (0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2009, 0, 4)]);
    expect(_index.timeDay.every(5).range((0, _helperFn.local)(2008, 11, 30, 0, 12), (0, _helperFn.local)(2009, 0, 6, 23, 48))).toEqual([(0, _helperFn.local)(2008, 11, 31), (0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2009, 0, 6)]);
    expect(_index.timeDay.every(7).range((0, _helperFn.local)(2008, 11, 30, 0, 12), (0, _helperFn.local)(2009, 0, 8, 23, 48))).toEqual([(0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2009, 0, 8)]);
  });
});
//# sourceMappingURL=day.test.js.map