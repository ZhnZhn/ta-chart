"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time utcHour', () => {
  it("utcHour.floor(date) returns hours", () => {
    expect(_index.utcHour.floor((0, _helperFn.utc)(2010, 11, 31, 23, 59))).toEqual((0, _helperFn.utc)(2010, 11, 31, 23));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 0, 1, 0, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1, 0));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 0, 1, 0, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1, 0));
  });
  it("utcHour.floor(date) observes start of daylight savings time", () => {
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 8, 59))).toEqual((0, _helperFn.utc)(2011, 2, 13, 8));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 9, 0))).toEqual((0, _helperFn.utc)(2011, 2, 13, 9));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 9, 1))).toEqual((0, _helperFn.utc)(2011, 2, 13, 9));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 9, 59))).toEqual((0, _helperFn.utc)(2011, 2, 13, 9));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 10, 0))).toEqual((0, _helperFn.utc)(2011, 2, 13, 10));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 2, 13, 10, 1))).toEqual((0, _helperFn.utc)(2011, 2, 13, 10));
  });
  it("utcHour.floor(date) observes end of daylight savings time", () => {
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 7, 59))).toEqual((0, _helperFn.utc)(2011, 10, 6, 7));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 8, 0))).toEqual((0, _helperFn.utc)(2011, 10, 6, 8));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 8, 1))).toEqual((0, _helperFn.utc)(2011, 10, 6, 8));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 8, 59))).toEqual((0, _helperFn.utc)(2011, 10, 6, 8));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 9, 0))).toEqual((0, _helperFn.utc)(2011, 10, 6, 9));
    expect(_index.utcHour.floor((0, _helperFn.utc)(2011, 10, 6, 9, 1))).toEqual((0, _helperFn.utc)(2011, 10, 6, 9));
  });
  it("utcHour.ceil(date) returns hours", () => {
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2010, 11, 31, 23, 59))).toEqual((0, _helperFn.utc)(2011, 0, 1, 0));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 0, 1, 0, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1, 0));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 0, 1, 0, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1, 1));
  });
  it("utcHour.ceil(date) observes start of daylight savings time", () => {
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 8, 59))).toEqual((0, _helperFn.utc)(2011, 2, 13, 9));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 9, 0))).toEqual((0, _helperFn.utc)(2011, 2, 13, 9));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 9, 1))).toEqual((0, _helperFn.utc)(2011, 2, 13, 10));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 9, 59))).toEqual((0, _helperFn.utc)(2011, 2, 13, 10));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 10, 0))).toEqual((0, _helperFn.utc)(2011, 2, 13, 10));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 2, 13, 10, 1))).toEqual((0, _helperFn.utc)(2011, 2, 13, 11));
  });
  it("utcHour.ceil(date) observes end of daylight savings time", () => {
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 7, 59))).toEqual((0, _helperFn.utc)(2011, 10, 6, 8));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 8, 0))).toEqual((0, _helperFn.utc)(2011, 10, 6, 8));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 8, 1))).toEqual((0, _helperFn.utc)(2011, 10, 6, 9));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 8, 59))).toEqual((0, _helperFn.utc)(2011, 10, 6, 9));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 9, 0))).toEqual((0, _helperFn.utc)(2011, 10, 6, 9));
    expect(_index.utcHour.ceil((0, _helperFn.utc)(2011, 10, 6, 9, 1))).toEqual((0, _helperFn.utc)(2011, 10, 6, 10));
  });
  it("utcHour.offset(date) does not modify the passed-in date", () => {
    const d = (0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999);
    _index.utcHour.offset(d, +1);
    expect(d).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("utcHour.offset(date) does not round the passed-in-date", () => {
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.utc)(2011, 0, 1, 0, 59, 59, 999));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.utc)(2010, 11, 31, 21, 59, 59, 456));
  });
  it("utcHour.offset(date) allows negative offsets", () => {
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 12), -1)).toEqual((0, _helperFn.utc)(2010, 11, 31, 11));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2011, 0, 1, 1), -2)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2011, 0, 1, 0), -1)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23));
  });
  it("utcHour.offset(date) allows positive offsets", () => {
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 11), +1)).toEqual((0, _helperFn.utc)(2010, 11, 31, 12));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23), +2)).toEqual((0, _helperFn.utc)(2011, 0, 1, 1));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23), +1)).toEqual((0, _helperFn.utc)(2011, 0, 1, 0));
  });
  it("utcHour.offset(date) allows zero offset", () => {
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.utcHour.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("utcHour.range(start, stop) returns hours", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2010, 11, 31, 12, 30), (0, _helperFn.utc)(2010, 11, 31, 15, 30))).toEqual([(0, _helperFn.utc)(2010, 11, 31, 13), (0, _helperFn.utc)(2010, 11, 31, 14), (0, _helperFn.utc)(2010, 11, 31, 15)]);
  });
  it("utcHour.range(start, stop) has an inclusive lower bound", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2010, 11, 31, 23), (0, _helperFn.utc)(2011, 0, 1, 2))[0]).toEqual((0, _helperFn.utc)(2010, 11, 31, 23));
  });
  it("utcHour.range(start, stop) has an exclusive upper bound", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2010, 11, 31, 23), (0, _helperFn.utc)(2011, 0, 1, 2))[2]).toEqual((0, _helperFn.utc)(2011, 0, 1, 1));
  });
  it("utcHour.range(start, stop) can skip hours", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2011, 1, 1, 1), (0, _helperFn.utc)(2011, 1, 1, 13), 3)).toEqual([(0, _helperFn.utc)(2011, 1, 1, 1), (0, _helperFn.utc)(2011, 1, 1, 4), (0, _helperFn.utc)(2011, 1, 1, 7), (0, _helperFn.utc)(2011, 1, 1, 10)]);
  });
  it("utcHour.range(start, stop) does not observe the start of daylight savings time", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2011, 2, 13, 1), (0, _helperFn.utc)(2011, 2, 13, 5))).toEqual([(0, _helperFn.utc)(2011, 2, 13, 1), (0, _helperFn.utc)(2011, 2, 13, 2), (0, _helperFn.utc)(2011, 2, 13, 3), (0, _helperFn.utc)(2011, 2, 13, 4)]);
  });
  it("utcHour.range(start, stop) does not observe the end of daylight savings time", () => {
    expect(_index.utcHour.range((0, _helperFn.utc)(2011, 10, 6, 0), (0, _helperFn.utc)(2011, 10, 6, 2))).toEqual([(0, _helperFn.utc)(2011, 10, 6, 0), (0, _helperFn.utc)(2011, 10, 6, 1)]);
  });
  it("utcHour.every(step) returns every stepth hour, starting with the first hour of the day", () => {
    expect(_index.utcHour.every(4).range((0, _helperFn.utc)(2008, 11, 30, 12, 47), (0, _helperFn.utc)(2008, 11, 31, 13, 57))).toEqual([(0, _helperFn.utc)(2008, 11, 30, 16), (0, _helperFn.utc)(2008, 11, 30, 20), (0, _helperFn.utc)(2008, 11, 31, 0), (0, _helperFn.utc)(2008, 11, 31, 4), (0, _helperFn.utc)(2008, 11, 31, 8), (0, _helperFn.utc)(2008, 11, 31, 12)]);
    expect(_index.utcHour.every(12).range((0, _helperFn.utc)(2008, 11, 30, 12, 47), (0, _helperFn.utc)(2008, 11, 31, 13, 57))).toEqual([(0, _helperFn.utc)(2008, 11, 31, 0), (0, _helperFn.utc)(2008, 11, 31, 12)]);
  });
});
//# sourceMappingURL=utcHour.test.js.map