"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeMinute', () => {
  it("timeMinute.floor(date) returns minutes", () => {
    expect(_index.timeMinute.floor((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59));
    expect(_index.timeMinute.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0));
    expect(_index.timeMinute.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 59))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0));
    expect(_index.timeMinute.floor((0, _helperFn.local)(2011, 0, 1, 0, 1, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 1));
  });
  it("timeMinute.ceil(date) returns minutes", () => {
    expect(_index.timeMinute.ceil((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0));
    expect(_index.timeMinute.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0));
    expect(_index.timeMinute.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 59))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 1));
    expect(_index.timeMinute.ceil((0, _helperFn.local)(2011, 0, 1, 0, 1, 0))).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 1));
  });
  it("timeMinute.offset(date) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeMinute.offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeMinute.offset(date) does not round the passed-in-date", () => {
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0, 59, 999));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 57, 59, 456));
  });
  it("timeMinute.offset(date) allows negative offsets", () => {
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 12), -1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 11));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2011, 0, 1, 0, 1), -2)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2011, 0, 1, 0, 0), -1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59));
  });
  it("timeMinute.offset(date) allows positive offsets", () => {
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 11), +1)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 12));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59), +2)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 1));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59), +1)).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 0));
  });
  it("timeMinute.offset(date) allows zero offset", () => {
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.timeMinute.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("timeMinute.range(start, stop), returns minutes", () => {
    expect(_index.timeMinute.range((0, _helperFn.local)(2010, 11, 31, 23, 59), (0, _helperFn.local)(2011, 0, 1, 0, 2))).toEqual([(0, _helperFn.local)(2010, 11, 31, 23, 59), (0, _helperFn.local)(2011, 0, 1, 0, 0), (0, _helperFn.local)(2011, 0, 1, 0, 1)]);
  });
  it("timeMinute.range(start, stop), has an inclusive lower bound", () => {
    expect(_index.timeMinute.range((0, _helperFn.local)(2010, 11, 31, 23, 59), (0, _helperFn.local)(2011, 0, 1, 0, 2))[0]).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59));
  });
  it("timeMinute.range(start, stop), has an exclusive upper bound", () => {
    expect(_index.timeMinute.range((0, _helperFn.local)(2010, 11, 31, 23, 59), (0, _helperFn.local)(2011, 0, 1, 0, 2))[2]).toEqual((0, _helperFn.local)(2011, 0, 1, 0, 1));
  });
  it("timeMinute.range(start, stop), can skip minutes", () => {
    expect(_index.timeMinute.range((0, _helperFn.local)(2011, 1, 1, 12, 7), (0, _helperFn.local)(2011, 1, 1, 13, 7), 15)).toEqual([(0, _helperFn.local)(2011, 1, 1, 12, 7), (0, _helperFn.local)(2011, 1, 1, 12, 22), (0, _helperFn.local)(2011, 1, 1, 12, 37), (0, _helperFn.local)(2011, 1, 1, 12, 52)]);
  });
  it("timeMinute.range(start, stop), observes start of daylight savings time", () => {
    expect(_index.timeMinute.range((0, _helperFn.utc)(2011, 2, 13, 9, 59), (0, _helperFn.utc)(2011, 2, 13, 10, 2))).toEqual([(0, _helperFn.utc)(2011, 2, 13, 9, 59), (0, _helperFn.utc)(2011, 2, 13, 10, 0), (0, _helperFn.utc)(2011, 2, 13, 10, 1)]);
  });
  it("timeMinute.range(start, stop), observes end of daylight savings time", () => {
    expect(_index.timeMinute.range((0, _helperFn.utc)(2011, 10, 6, 8, 59), (0, _helperFn.utc)(2011, 10, 6, 9, 2))).toEqual([(0, _helperFn.utc)(2011, 10, 6, 8, 59), (0, _helperFn.utc)(2011, 10, 6, 9, 0), (0, _helperFn.utc)(2011, 10, 6, 9, 1)]);
  });
  it("timeMinute.every(step) returns every stepth minute, starting with the first minute of the hour", () => {
    expect(_index.timeMinute.every(15).range((0, _helperFn.local)(2008, 11, 30, 12, 47), (0, _helperFn.local)(2008, 11, 30, 13, 57))).toEqual([(0, _helperFn.local)(2008, 11, 30, 13, 0), (0, _helperFn.local)(2008, 11, 30, 13, 15), (0, _helperFn.local)(2008, 11, 30, 13, 30), (0, _helperFn.local)(2008, 11, 30, 13, 45)]);
    expect(_index.timeMinute.every(30).range((0, _helperFn.local)(2008, 11, 30, 12, 47), (0, _helperFn.local)(2008, 11, 30, 13, 57))).toEqual([(0, _helperFn.local)(2008, 11, 30, 13, 0), (0, _helperFn.local)(2008, 11, 30, 13, 30)]);
  });
  it("timeMinute.range(start, stop) returns every minute crossing the daylight savings boundary", () => {
    expect(_index.timeMinute.range(new Date(1478422800000 - 2 * 6e4), new Date(1478422800000 + 2 * 6e4))).toEqual([new Date(1478422680000),
    // Sun Nov  6 2016  1:58:00 GMT-0700 (PDT)
    new Date(1478422740000),
    // Sun Nov  6 2016  1:59:00 GMT-0700 (PDT)
    new Date(1478422800000),
    // Sun Nov  6 2016  1:00:00 GMT-0800 (PDT)
    new Date(1478422860000) // Sun Nov  6 2016  1:01:00 GMT-0800 (PDT)
    ]);
  });
});
//# sourceMappingURL=minute.test.js.map