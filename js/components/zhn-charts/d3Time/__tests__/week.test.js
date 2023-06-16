"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeWeek', () => {
  it("timeWeek.floor(date) returns sundays", () => {
    expect(_index.timeWeek.floor((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 0, 1, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 11, 26));
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 0, 2, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 2));
  });
  it("timeWeek.floor(date) observes the start of daylight savings time", () => {
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 2, 13, 1))).toEqual((0, _helperFn.local)(2011, 2, 13));
  });
  it("timeWeek.floor(date) observes the end of the daylight savings time", () => {
    expect(_index.timeWeek.floor((0, _helperFn.local)(2011, 10, 6, 1))).toEqual((0, _helperFn.local)(2011, 10, 6));
  });
  it("timeWeek.floor(date) correctly handles years in the first century", () => {
    expect(_index.timeWeek.floor((0, _helperFn.local)(9, 10, 6, 7))).toEqual((0, _helperFn.local)(9, 10, 1));
  });
  it("timeWeek.ceil(date) returns sundays", () => {
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 0, 1, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 0, 2, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 2));
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 0, 2, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 9));
  });
  it("timeWeek.ceil(date) observes the start of daylight savings time", () => {
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 2, 13, 1))).toEqual((0, _helperFn.local)(2011, 2, 20));
  });
  it("timeWeek.ceil(date) observes the end of the daylight savings time", () => {
    expect(_index.timeWeek.ceil((0, _helperFn.local)(2011, 10, 6, 1))).toEqual((0, _helperFn.local)(2011, 10, 13));
  });
  it("timeWeek.offset(date, step) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeWeek.offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeWeek.offset(date, step) does not round the passed-in-date", () => {
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 0, 7, 23, 59, 59, 999));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2010, 11, 17, 23, 59, 59, 456));
  });
  it("timeWeek.offset(date, step) allows negative offsets", () => {
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 1), -1)).toEqual((0, _helperFn.local)(2010, 10, 24));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2011, 0, 1), -2)).toEqual((0, _helperFn.local)(2010, 11, 18));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2011, 0, 1), -1)).toEqual((0, _helperFn.local)(2010, 11, 25));
  });
  it("timeWeek.offset(date, step) allows positive offsets", () => {
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 10, 24), +1)).toEqual((0, _helperFn.local)(2010, 11, 1));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 18), +2)).toEqual((0, _helperFn.local)(2011, 0, 1));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 25), +1)).toEqual((0, _helperFn.local)(2011, 0, 1));
  });
  it("timeWeek.offset(date, step) allows zero offset", () => {
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.timeWeek.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("timeWeek.range(start, stop) returns sundays", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2010, 11, 21), (0, _helperFn.local)(2011, 0, 12))).toEqual([(0, _helperFn.local)(2010, 11, 26), (0, _helperFn.local)(2011, 0, 2), (0, _helperFn.local)(2011, 0, 9)]);
  });
  it("timeWeek.range(start, stop) has an inclusive lower bound", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2010, 11, 21), (0, _helperFn.local)(2011, 0, 12))[0]).toEqual((0, _helperFn.local)(2010, 11, 26));
  });
  it("timeWeek.range(start, stop) has an exclusive upper bound", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2010, 11, 21), (0, _helperFn.local)(2011, 0, 12))[2]).toEqual((0, _helperFn.local)(2011, 0, 9));
  });
  it("timeWeek.range(start, stop) can skip weeks", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2011, 3, 1), 4)).toEqual([(0, _helperFn.local)(2011, 0, 2), (0, _helperFn.local)(2011, 0, 30), (0, _helperFn.local)(2011, 1, 27), (0, _helperFn.local)(2011, 2, 27)]);
  });
  it("timeWeek.range(start, stop) observes start of daylight savings time", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2011, 2, 1), (0, _helperFn.local)(2011, 2, 28))).toEqual([(0, _helperFn.local)(2011, 2, 6), (0, _helperFn.local)(2011, 2, 13), (0, _helperFn.local)(2011, 2, 20), (0, _helperFn.local)(2011, 2, 27)]);
  });
  it("timeWeek.range(start, stop) observes end of daylight savings time", () => {
    expect(_index.timeWeek.range((0, _helperFn.local)(2011, 10, 1), (0, _helperFn.local)(2011, 10, 30))).toEqual([(0, _helperFn.local)(2011, 10, 6), (0, _helperFn.local)(2011, 10, 13), (0, _helperFn.local)(2011, 10, 20), (0, _helperFn.local)(2011, 10, 27)]);
  });
  it("timeWeek is an alias for timeSunday", () => {
    expect(_index.timeWeek).toEqual(_index.timeSunday);
  });
  it("timeWeek.every(step) returns every stepth Sunday, starting with the first Sunday of the month", () => {
    expect(_index.timeWeek.every(2).range((0, _helperFn.local)(2008, 11, 3), (0, _helperFn.local)(2009, 1, 5))).toEqual([(0, _helperFn.local)(2008, 11, 7), (0, _helperFn.local)(2008, 11, 21), (0, _helperFn.local)(2009, 0, 4), (0, _helperFn.local)(2009, 0, 18), (0, _helperFn.local)(2009, 1, 1)]);
  });
});
//# sourceMappingURL=week.test.js.map