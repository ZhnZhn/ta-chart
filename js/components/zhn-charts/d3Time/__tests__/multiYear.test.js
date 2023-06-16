"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeYear multiYear', () => {
  it("timeYear.every(n).floor(date) returns integer multiples of n years", () => {
    expect(_index.timeYear.every(10).floor((0, _helperFn.local)(2009, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2000, 0, 1));
    expect(_index.timeYear.every(10).floor((0, _helperFn.local)(2010, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2010, 0, 1));
    expect(_index.timeYear.every(10).floor((0, _helperFn.local)(2010, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2010, 0, 1));
  });
  it("timeYear.every(n).ceil(date) returns integer multiples of n years", () => {
    expect(_index.timeYear.every(100).ceil((0, _helperFn.local)(1999, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2000, 0, 1));
    expect(_index.timeYear.every(100).ceil((0, _helperFn.local)(2000, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2000, 0, 1));
    expect(_index.timeYear.every(100).ceil((0, _helperFn.local)(2000, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2100, 0, 1));
  });
  it("timeYear.every(n).offset(date, count) does not modify the passed-in date", () => {
    const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
    _index.timeYear.every(5).offset(d, +1);
    expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("timeYear.every(n).offset(date, count) does not round the passed-in-date", () => {
    expect(_index.timeYear.every(5).offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2015, 11, 31, 23, 59, 59, 999));
    expect(_index.timeYear.every(5).offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2000, 11, 31, 23, 59, 59, 456));
  });
  it("timeYear.every(n) does not define interval.count or interval.every", () => {
    const decade = _index.timeYear.every(10);
    expect(decade.count).toBe(void 0);
    expect(decade.every).toBe(void 0);
  });
  it("timeYear.every(n).range(start, stop) returns multiples of n years", () => {
    expect(_index.timeYear.every(10).range((0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2031, 0, 1))).toEqual([(0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2020, 0, 1), (0, _helperFn.local)(2030, 0, 1)]);
  });
});
//# sourceMappingURL=multiYear.test.js.map