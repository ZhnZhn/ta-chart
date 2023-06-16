"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
it("timeYear.floor(date) returns years", () => {
  expect(_index.timeYear.floor((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2010, 0, 1));
  expect(_index.timeYear.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1));
  expect(_index.timeYear.floor((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2011, 0, 1));
});
it("timeYear.floor(date) does not modify the specified date", () => {
  const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59);
  expect(_index.timeYear.floor(d)).toEqual((0, _helperFn.local)(2010, 0, 1));
  expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59));
});
it("timeYear.floor(date) correctly handles years in the first century", () => {
  expect(_index.timeYear.floor((0, _helperFn.local)(9, 10, 6, 7))).toEqual((0, _helperFn.local)(9, 0, 1));
});
it("timeYear.ceil(date) returns years", () => {
  expect(_index.timeYear.ceil((0, _helperFn.local)(2010, 11, 31, 23, 59, 59))).toEqual((0, _helperFn.local)(2011, 0, 1));
  expect(_index.timeYear.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 0))).toEqual((0, _helperFn.local)(2011, 0, 1));
  expect(_index.timeYear.ceil((0, _helperFn.local)(2011, 0, 1, 0, 0, 1))).toEqual((0, _helperFn.local)(2012, 0, 1));
});
it("timeYear.offset(date, count) does not modify the passed-in date", () => {
  const d = (0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999);
  _index.timeYear.offset(d, +1);
  expect(d).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
});
it("timeYear.offset(date, count) does not round the passed-in-date", () => {
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), +1)).toEqual((0, _helperFn.local)(2011, 11, 31, 23, 59, 59, 999));
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 456), -2)).toEqual((0, _helperFn.local)(2008, 11, 31, 23, 59, 59, 456));
});
it("timeYear.offset(date, count) allows negative offsets", () => {
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 11, 1), -1)).toEqual((0, _helperFn.local)(2009, 11, 1));
  expect(_index.timeYear.offset((0, _helperFn.local)(2011, 0, 1), -2)).toEqual((0, _helperFn.local)(2009, 0, 1));
  expect(_index.timeYear.offset((0, _helperFn.local)(2011, 0, 1), -1)).toEqual((0, _helperFn.local)(2010, 0, 1));
});
it("timeYear.offset(date, count) allows positive offsets", () => {
  expect(_index.timeYear.offset((0, _helperFn.local)(2009, 11, 1), +1)).toEqual((0, _helperFn.local)(2010, 11, 1));
  expect(_index.timeYear.offset((0, _helperFn.local)(2009, 0, 1), +2)).toEqual((0, _helperFn.local)(2011, 0, 1));
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 0, 1), +1)).toEqual((0, _helperFn.local)(2011, 0, 1));
});
it("timeYear.offset(date, count) allows zero offset", () => {
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 59, 999));
  expect(_index.timeYear.offset((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0), 0)).toEqual((0, _helperFn.local)(2010, 11, 31, 23, 59, 58, 0));
});
it("timeYear.every(step) returns every stepth year, starting with year zero", () => {
  expect(_index.timeYear.every(5).range((0, _helperFn.local)(2008), (0, _helperFn.local)(2023))).toEqual([(0, _helperFn.local)(2010), (0, _helperFn.local)(2015), (0, _helperFn.local)(2020)]);
});
it("timeYear.range(start, stop) returns years", () => {
  expect(_index.timeYear.range((0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2013, 0, 1))).toEqual([(0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2011, 0, 1), (0, _helperFn.local)(2012, 0, 1)]);
});
it("timeYear.range(start, stop) has an inclusive lower bound", () => {
  expect(_index.timeYear.range((0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2013, 0, 1))[0]).toEqual((0, _helperFn.local)(2010, 0, 1));
});
it("timeYear.range(start, stop) has an exclusive upper bound", () => {
  expect(_index.timeYear.range((0, _helperFn.local)(2010, 0, 1), (0, _helperFn.local)(2013, 0, 1))[2]).toEqual((0, _helperFn.local)(2012, 0, 1));
});
it("timeYear.range(start, stop, step) can skip years", () => {
  expect(_index.timeYear.range((0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2029, 0, 1), 5)).toEqual([(0, _helperFn.local)(2009, 0, 1), (0, _helperFn.local)(2014, 0, 1), (0, _helperFn.local)(2019, 0, 1), (0, _helperFn.local)(2024, 0, 1)]);
});
//# sourceMappingURL=year.test.js.map