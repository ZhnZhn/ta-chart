"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time utcYear', () => {
  it("utcYear.floor(date) returns years", () => {
    expect(_index.utcYear.floor((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.utc)(2010, 0, 1));
    expect(_index.utcYear.floor((0, _helperFn.utc)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcYear.floor((0, _helperFn.utc)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcYear.floor(date) does not modify the specified date", () => {
    const d = (0, _helperFn.utc)(2010, 11, 31, 23, 59, 59);
    expect(_index.utcYear.floor(d)).toEqual((0, _helperFn.utc)(2010, 0, 1));
    expect(d).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59));
  });
  it("utcYear.floor(date) correctly handles years in the first century", () => {
    expect(_index.utcYear.floor((0, _helperFn.utc)(9, 10, 6, 7))).toEqual((0, _helperFn.utc)(9, 0, 1));
  });
  it("utcYear.ceil(date) returns years", () => {
    expect(_index.utcYear.ceil((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcYear.ceil((0, _helperFn.utc)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcYear.ceil((0, _helperFn.utc)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.utc)(2012, 0, 1));
  });
  it("utcYear.offset(date, count) does not modify the passed-in date", () => {
    const d = (0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999);
    _index.utcYear.offset(d, +1);
    expect(d).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
  });
  it("utcYear.offset(date, count) does not round the passed-in-date", () => {
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.utc)(2011, 11, 31, 23, 59, 59, 999));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.utc)(2008, 11, 31, 23, 59, 59, 456));
  });
  it("utcYear.offset(date, count) allows negative offsets", () => {
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 11, 1), -1)).toEqual((0, _helperFn.utc)(2009, 11, 1));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2011, 0, 1), -2)).toEqual((0, _helperFn.utc)(2009, 0, 1));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2011, 0, 1), -1)).toEqual((0, _helperFn.utc)(2010, 0, 1));
  });
  it("utcYear.offset(date, count) allows positive offsets", () => {
    expect(_index.utcYear.offset((0, _helperFn.utc)(2009, 11, 1), +1)).toEqual((0, _helperFn.utc)(2010, 11, 1));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2009, 0, 1), +2)).toEqual((0, _helperFn.utc)(2011, 0, 1));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 0, 1), +1)).toEqual((0, _helperFn.utc)(2011, 0, 1));
  });
  it("utcYear.offset(date, count) allows zero offset", () => {
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 59, 999));
    expect(_index.utcYear.offset((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.utc)(2010, 11, 31, 23, 59, 58, 0));
  });
  it("utcYear.every(step) returns every stepth year, starting with year zero", () => {
    expect(_index.utcYear.every(5).range((0, _helperFn.utc)(2008), (0, _helperFn.utc)(2023))).toEqual([(0, _helperFn.utc)(2010), (0, _helperFn.utc)(2015), (0, _helperFn.utc)(2020)]);
  });
  it("utcYear.range(start, stop) returns years", () => {
    expect(_index.utcYear.range((0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2013, 0, 1))).toEqual([(0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2011, 0, 1), (0, _helperFn.utc)(2012, 0, 1)]);
  });
  it("utcYear.range(start, stop) has an inclusive lower bound", () => {
    expect(_index.utcYear.range((0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2013, 0, 1))[0]).toEqual((0, _helperFn.utc)(2010, 0, 1));
  });
  it("utcYear.range(start, stop) has an exclusive upper bound", () => {
    expect(_index.utcYear.range((0, _helperFn.utc)(2010, 0, 1), (0, _helperFn.utc)(2013, 0, 1))[2]).toEqual((0, _helperFn.utc)(2012, 0, 1));
  });
  it("utcYear.range(start, stop, step) can skip years", () => {
    expect(_index.utcYear.range((0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2029, 0, 1), 5)).toEqual([(0, _helperFn.utc)(2009, 0, 1), (0, _helperFn.utc)(2014, 0, 1), (0, _helperFn.utc)(2019, 0, 1), (0, _helperFn.utc)(2024, 0, 1)]);
  });
});
//# sourceMappingURL=utcYear.test.js.map