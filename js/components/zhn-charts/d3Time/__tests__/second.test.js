"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeSecond', () => {
  it("timeSecond.floor(date) returns seconds", () => {
    expect(_index.timeSecond.floor((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59));
    expect(_index.timeSecond.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
  });
  it("timeSecond.round(date) returns seconds", () => {
    expect(_index.timeSecond.round((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.round((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 499))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.round((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 500))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 1));
  });
  it("timeSecond.ceil(date) returns seconds", () => {
    expect(_index.timeSecond.ceil((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 1));
  });
  it("timeSecond.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeSecond.offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeSecond.offset(date, step) does not round the passed-in-date", () => {
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0, 999));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 57, 456));
  });
  it("timeSecond.offset(date, step) allows negative offsets", () => {
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59), -1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2011, 0, 1, 0, 0, 0), -2)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2011, 0, 1, 0, 0, 0), -1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59));
  });
  it("timeSecond.offset(date, step) allows positive offsets", () => {
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58), +1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58), +2)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59), +1)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 0));
  });
  it("timeSecond.offset(date, step) allows zero offset", () => {
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.timeSecond.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("timeSecond.range(start, stop) returns seconds", () => {
    expect(_index.timeSecond.range((0, _helperFn.local)(2010, 11, 31, 23, 59, 59), (0, _helperFn.local)(2011, 0, 1, 0, 0, 2))).toEqual([(0, _helperFn.local)(2010, 11, 31, 23, 59, 59), (0, _helperFn.local)(2011, 0, 1, 0, 0, 0), (0, _helperFn.local)(2011, 0, 1, 0, 0, 1)]);
  });
  it("timeSecond.range(start, stop) has an inclusive lower bound", () => {
    expect(_index.timeSecond.range((0, _helperFn.local)(2010, 11, 31, 23, 59, 59), (0, _helperFn.local)(2011, 0, 1, 0, 0, 2))[0]).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59));
  });
  it("timeSecond.range(start, stop) has an exclusive upper bound", () => {
    expect(_index.timeSecond.range((0, _helperFn.local)(2010, 11, 31, 23, 59, 59), (0, _helperFn.local)(2011, 0, 1, 0, 0, 2))[2]).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 1));
  });
  it("timeSecond.range(start, stop, step) can skip seconds", () => {
    expect(_index.timeSecond.range((0, _helperFn.local)(2011, 1, 1, 12, 0, 7), (0, _helperFn.local)(2011, 1, 1, 12, 1, 7), 15)).toEqual([(0, _helperFn.local)(2011, 1, 1, 12, 0, 7), (0, _helperFn.local)(2011, 1, 1, 12, 0, 22), (0, _helperFn.local)(2011, 1, 1, 12, 0, 37), (0, _helperFn.local)(2011, 1, 1, 12, 0, 52)]);
  });
  it("timeSecond.range(start, stop) observes start of daylight savings time", () => {
    expect(_index.timeSecond.range((0, _helperFn.utc)(2011, 2, 13, 9, 59, 59), (0, _helperFn.utc)(2011, 2, 13, 10, 0, 2))).toEqual([(0, _helperFn.utc)(2011, 2, 13, 9, 59, 59), (0, _helperFn.utc)(2011, 2, 13, 10, 0, 0), (0, _helperFn.utc)(2011, 2, 13, 10, 0, 1)]);
  });
  it("timeSecond.range(start, stop) observes end of daylight savings time", () => {
    expect(_index.timeSecond.range((0, _helperFn.utc)(2011, 10, 6, 8, 59, 59), (0, _helperFn.utc)(2011, 10, 6, 9, 0, 2))).toEqual([(0, _helperFn.utc)(2011, 10, 6, 8, 59, 59), (0, _helperFn.utc)(2011, 10, 6, 9, 0, 0), (0, _helperFn.utc)(2011, 10, 6, 9, 0, 1)]);
  });
  it("timeSecond.every(step) returns every stepth second, starting with the first second of the minute", () => {
    expect(_index.timeSecond.every(15).range((0, _helperFn.local)(2008, 11, 30, 12, 36, 47), (0, _helperFn.local)(2008, 11, 30, 12, 37, 57))).toEqual([(0, _helperFn.local)(2008, 11, 30, 12, 37, 0), (0, _helperFn.local)(2008, 11, 30, 12, 37, 15), (0, _helperFn.local)(2008, 11, 30, 12, 37, 30), (0, _helperFn.local)(2008, 11, 30, 12, 37, 45)]);
    expect(_index.timeSecond.every(30).range((0, _helperFn.local)(2008, 11, 30, 12, 36, 47), (0, _helperFn.local)(2008, 11, 30, 12, 37, 57))).toEqual([(0, _helperFn.local)(2008, 11, 30, 12, 37, 0), (0, _helperFn.local)(2008, 11, 30, 12, 37, 30)]);
  });
  it("timeSecond.range(start, stop) returns every second crossing the daylight savings boundary", () => {
    expect(_index.timeSecond.range(new Date(1478422800000 - 2 * 1e3), new Date(1478422800000 + 2 * 1e3))).toEqual([new Date(1478422798000),
    // Sun Nov  6 2016  1:59:58 GMT-0700 (PDT)
    new Date(1478422799000),
    // Sun Nov  6 2016  1:59:59 GMT-0700 (PDT)
    new Date(1478422800000),
    // Sun Nov  6 2016  1:00:00 GMT-0800 (PDT)
    new Date(1478422801000) // Sun Nov  6 2016  1:00:01 GMT-0800 (PDT)
    ]);
  });
});
//# sourceMappingURL=second.test.js.map