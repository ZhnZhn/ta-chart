"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeTicks', () => {
  it("timeTicks(start, stop, interval) respects the specified interval", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 1, 0), (0, _helperFn.local)(2011, 0, 1, 12, 4, 4), _index.timeMinute)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 1), (0, _helperFn.local)(2011, 0, 1, 12, 2), (0, _helperFn.local)(2011, 0, 1, 12, 3), (0, _helperFn.local)(2011, 0, 1, 12, 4)]);
  });
  it("timeTicks(start, stop, interval) returns the empty array for invalid intervals", () => {
    expect((0, _index.timeTicks)(NaN, NaN, 10)).toEqual([]);
  });
  it("timeTicks(start, stop, interval.every(step)) observes the specified tick interval and step", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 33, 4), _index.timeMinute.every(10))).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0), (0, _helperFn.local)(2011, 0, 1, 12, 10), (0, _helperFn.local)(2011, 0, 1, 12, 20), (0, _helperFn.local)(2011, 0, 1, 12, 30)]);
  });
  it("timeTicks(start, stop, count) can generate sub-second ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 1), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 0, 200), (0, _helperFn.local)(2011, 0, 1, 12, 0, 0, 400), (0, _helperFn.local)(2011, 0, 1, 12, 0, 0, 600), (0, _helperFn.local)(2011, 0, 1, 12, 0, 0, 800), (0, _helperFn.local)(2011, 0, 1, 12, 0, 1, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-second ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 4), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 1), (0, _helperFn.local)(2011, 0, 1, 12, 0, 2), (0, _helperFn.local)(2011, 0, 1, 12, 0, 3), (0, _helperFn.local)(2011, 0, 1, 12, 0, 4)]);
  });
  it("timeTicks(start, stop, count) can generate 5-second ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 20), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 5), (0, _helperFn.local)(2011, 0, 1, 12, 0, 10), (0, _helperFn.local)(2011, 0, 1, 12, 0, 15), (0, _helperFn.local)(2011, 0, 1, 12, 0, 20)]);
  });
  it("timeTicks(start, stop, count) can generate 15-second ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 50), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 15), (0, _helperFn.local)(2011, 0, 1, 12, 0, 30), (0, _helperFn.local)(2011, 0, 1, 12, 0, 45)]);
  });
  it("timeTicks(start, stop, count) can generate 30-second ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 1, 50), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 0, 0), (0, _helperFn.local)(2011, 0, 1, 12, 0, 30), (0, _helperFn.local)(2011, 0, 1, 12, 1, 0), (0, _helperFn.local)(2011, 0, 1, 12, 1, 30)]);
  });
  it("timeTicks(start, stop, count) can generate 1-minute ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 0, 27), (0, _helperFn.local)(2011, 0, 1, 12, 4, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 1), (0, _helperFn.local)(2011, 0, 1, 12, 2), (0, _helperFn.local)(2011, 0, 1, 12, 3), (0, _helperFn.local)(2011, 0, 1, 12, 4)]);
  });
  it("timeTicks(start, stop, count) can generate 5-minute ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 3, 27), (0, _helperFn.local)(2011, 0, 1, 12, 21, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 5), (0, _helperFn.local)(2011, 0, 1, 12, 10), (0, _helperFn.local)(2011, 0, 1, 12, 15), (0, _helperFn.local)(2011, 0, 1, 12, 20)]);
  });
  it("timeTicks(start, stop, count) can generate 15-minute ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 8, 27), (0, _helperFn.local)(2011, 0, 1, 13, 4, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 15), (0, _helperFn.local)(2011, 0, 1, 12, 30), (0, _helperFn.local)(2011, 0, 1, 12, 45), (0, _helperFn.local)(2011, 0, 1, 13, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 30-minute ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 28, 27), (0, _helperFn.local)(2011, 0, 1, 14, 4, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 12, 30), (0, _helperFn.local)(2011, 0, 1, 13, 0), (0, _helperFn.local)(2011, 0, 1, 13, 30), (0, _helperFn.local)(2011, 0, 1, 14, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-hour ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 12, 28, 27), (0, _helperFn.local)(2011, 0, 1, 16, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 13, 0), (0, _helperFn.local)(2011, 0, 1, 14, 0), (0, _helperFn.local)(2011, 0, 1, 15, 0), (0, _helperFn.local)(2011, 0, 1, 16, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 3-hour ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 14, 28, 27), (0, _helperFn.local)(2011, 0, 2, 1, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 15, 0), (0, _helperFn.local)(2011, 0, 1, 18, 0), (0, _helperFn.local)(2011, 0, 1, 21, 0), (0, _helperFn.local)(2011, 0, 2, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 6-hour ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 16, 28, 27), (0, _helperFn.local)(2011, 0, 2, 14, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 18, 0), (0, _helperFn.local)(2011, 0, 2, 0, 0), (0, _helperFn.local)(2011, 0, 2, 6, 0), (0, _helperFn.local)(2011, 0, 2, 12, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 12-hour ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 16, 28, 27), (0, _helperFn.local)(2011, 0, 3, 21, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 2, 0, 0), (0, _helperFn.local)(2011, 0, 2, 12, 0), (0, _helperFn.local)(2011, 0, 3, 0, 0), (0, _helperFn.local)(2011, 0, 3, 12, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-day ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 16, 28, 27), (0, _helperFn.local)(2011, 0, 5, 21, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 2, 0, 0), (0, _helperFn.local)(2011, 0, 3, 0, 0), (0, _helperFn.local)(2011, 0, 4, 0, 0), (0, _helperFn.local)(2011, 0, 5, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 2-day ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 2, 16, 28, 27), (0, _helperFn.local)(2011, 0, 9, 21, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 3, 0, 0), (0, _helperFn.local)(2011, 0, 5, 0, 0), (0, _helperFn.local)(2011, 0, 7, 0, 0), (0, _helperFn.local)(2011, 0, 9, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-week ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 1, 16, 28, 27), (0, _helperFn.local)(2011, 0, 23, 21, 34, 12), 4)).toEqual([(0, _helperFn.local)(2011, 0, 2, 0, 0), (0, _helperFn.local)(2011, 0, 9, 0, 0), (0, _helperFn.local)(2011, 0, 16, 0, 0), (0, _helperFn.local)(2011, 0, 23, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-month ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 0, 18), (0, _helperFn.local)(2011, 4, 2), 4)).toEqual([(0, _helperFn.local)(2011, 1, 1, 0, 0), (0, _helperFn.local)(2011, 2, 1, 0, 0), (0, _helperFn.local)(2011, 3, 1, 0, 0), (0, _helperFn.local)(2011, 4, 1, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 3-month ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2010, 11, 18), (0, _helperFn.local)(2011, 10, 2), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 0, 0), (0, _helperFn.local)(2011, 3, 1, 0, 0), (0, _helperFn.local)(2011, 6, 1, 0, 0), (0, _helperFn.local)(2011, 9, 1, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate 1-year ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2010, 11, 18), (0, _helperFn.local)(2014, 2, 2), 4)).toEqual([(0, _helperFn.local)(2011, 0, 1, 0, 0), (0, _helperFn.local)(2012, 0, 1, 0, 0), (0, _helperFn.local)(2013, 0, 1, 0, 0), (0, _helperFn.local)(2014, 0, 1, 0, 0)]);
  });
  it("timeTicks(start, stop, count) can generate multi-year ticks", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(0, 11, 18), (0, _helperFn.local)(2014, 2, 2), 6)).toEqual([(0, _helperFn.local)(500, 0, 1, 0, 0), (0, _helperFn.local)(1000, 0, 1, 0, 0), (0, _helperFn.local)(1500, 0, 1, 0, 0), (0, _helperFn.local)(2000, 0, 1, 0, 0)]);
  });
  it("timeTicks(start, stop, count) returns one tick for an empty domain", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2014, 2, 2), (0, _helperFn.local)(2014, 2, 2), 6)).toEqual([(0, _helperFn.local)(2014, 2, 2)]);
  });
  it("timeTicks(start, stop, count) returns descending ticks for a descending domain", () => {
    expect((0, _index.timeTicks)((0, _helperFn.local)(2014, 2, 2), (0, _helperFn.local)(2010, 11, 18), 4)).toEqual([(0, _helperFn.local)(2014, 0, 1, 0, 0), (0, _helperFn.local)(2013, 0, 1, 0, 0), (0, _helperFn.local)(2012, 0, 1, 0, 0), (0, _helperFn.local)(2011, 0, 1, 0, 0)]);
    expect((0, _index.timeTicks)((0, _helperFn.local)(2011, 10, 2), (0, _helperFn.local)(2010, 11, 18), 4)).toEqual([(0, _helperFn.local)(2011, 9, 1, 0, 0), (0, _helperFn.local)(2011, 6, 1, 0, 0), (0, _helperFn.local)(2011, 3, 1, 0, 0), (0, _helperFn.local)(2011, 0, 1, 0, 0)]);
  });
});
//# sourceMappingURL=timeTicks.test.js.map