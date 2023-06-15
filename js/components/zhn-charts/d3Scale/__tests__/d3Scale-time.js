"use strict";

var _d3Time = require("../../d3Time");
var _index = require("../index");
var _d3Scale = require("./d3Scale.test");
//import {interpolateHsl} from "d3-interpolate";

describe('d3Scale time', () => {
  it("time.domain([-1e50, 1e50]) is equivalent to time.domain([NaN, NaN])", () => {
    const x = (0, _index.scaleTime)().domain([-1e50, 1e50]);
    expect(isNaN(x.domain()[0])).toBe(true); // Note: also coerced on retrieval, so insufficient test!
    expect(isNaN(x.domain()[1])).toBe(true);
    expect(x.ticks(10)).toEqual([]);
  });
  it("time.domain(domain) accepts an iterable", () => {
    const x = (0, _index.scaleTime)().domain(new Set([(0, _d3Scale.local)(2009), (0, _d3Scale.local)(2010)]));
    expect(x.domain()).toEqual([(0, _d3Scale.local)(2009), (0, _d3Scale.local)(2010)]);
  });
  it("time.nice() is an alias for time.nice(10)", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 17), (0, _d3Scale.local)(2009, 0, 1, 23, 42)]);
    expect(x.nice().domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 2)]);
  });
  it("time.nice() can nice sub-second domains", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2013, 0, 1, 12, 0, 0, 0), (0, _d3Scale.local)(2013, 0, 1, 12, 0, 0, 128)]);
    expect(x.nice().domain()).toEqual([(0, _d3Scale.local)(2013, 0, 1, 12, 0, 0, 0), (0, _d3Scale.local)(2013, 0, 1, 12, 0, 0, 130)]);
  });
  it("time.nice() can nice multi-year domains", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2001, 0, 1), (0, _d3Scale.local)(2138, 0, 1)]);
    expect(x.nice().domain()).toEqual([(0, _d3Scale.local)(2000, 0, 1), (0, _d3Scale.local)(2140, 0, 1)]);
  });
  it("time.nice() can nice empty domains", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 0, 12)]);
    expect(x.nice().domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 0, 12)]);
  });
  it("time.nice(count) nices using the specified tick count", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 17), (0, _d3Scale.local)(2009, 0, 1, 23, 42)]);
    expect(x.nice(100).domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1, 0, 15), (0, _d3Scale.local)(2009, 0, 1, 23, 45)]);
    expect(x.nice(10).domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 2)]);
  });
  it("time.nice(interval) nices using the specified time interval", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 23, 48)]);
    expect(x.nice(_d3Time.timeDay).domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 2)]);
    expect(x.nice(_d3Time.timeWeek).domain()).toEqual([(0, _d3Scale.local)(2008, 11, 28), (0, _d3Scale.local)(2009, 0, 4)]);
    expect(x.nice(_d3Time.timeMonth).domain()).toEqual([(0, _d3Scale.local)(2008, 11, 1), (0, _d3Scale.local)(2009, 1, 1)]);
    expect(x.nice(_d3Time.timeYear).domain()).toEqual([(0, _d3Scale.local)(2008, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]);
  });
  it("time.nice(interval) can nice empty domains", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 0, 12)]);
    expect(x.nice(_d3Time.timeDay).domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 2)]);
  });
  it("time.nice(interval) can nice a polylinear domain, only affecting its extent", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 23, 48), (0, _d3Scale.local)(2009, 0, 2, 23, 48)]).nice(_d3Time.timeDay);
    expect(x.domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 1, 23, 48), (0, _d3Scale.local)(2009, 0, 3)]);
  });
  it("time.nice(interval.every(step)) nices using the specified time interval and step", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1, 0, 12), (0, _d3Scale.local)(2009, 0, 1, 23, 48)]);
    expect(x.nice(_d3Time.timeDay.every(3)).domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2009, 0, 4)]);
    expect(x.nice(_d3Time.timeWeek.every(2)).domain()).toEqual([(0, _d3Scale.local)(2008, 11, 21), (0, _d3Scale.local)(2009, 0, 4)]);
    expect(x.nice(_d3Time.timeMonth.every(3)).domain()).toEqual([(0, _d3Scale.local)(2008, 9, 1), (0, _d3Scale.local)(2009, 3, 1)]);
    expect(x.nice(_d3Time.timeYear.every(10)).domain()).toEqual([(0, _d3Scale.local)(2000, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]);
  });
  it("time.copy() isolates changes to the domain", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]),
      y = x.copy();
    x.domain([(0, _d3Scale.local)(2010, 0, 1), (0, _d3Scale.local)(2011, 0, 1)]);
    expect(y.domain()).toEqual([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]);
    expect(x((0, _d3Scale.local)(2010, 0, 1))).toBe(0);
    expect(y((0, _d3Scale.local)(2010, 0, 1))).toBe(1);
    y.domain([(0, _d3Scale.local)(2011, 0, 1), (0, _d3Scale.local)(2012, 0, 1)]);
    expect(x((0, _d3Scale.local)(2011, 0, 1))).toBe(1);
    expect(y((0, _d3Scale.local)(2011, 0, 1))).toBe(0);
    expect(x.domain()).toEqual([(0, _d3Scale.local)(2010, 0, 1), (0, _d3Scale.local)(2011, 0, 1)]);
    expect(y.domain()).toEqual([(0, _d3Scale.local)(2011, 0, 1), (0, _d3Scale.local)(2012, 0, 1)]);
  });
  it("time.copy() isolates changes to the range", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]),
      y = x.copy();
    x.range([1, 2]);
    expect(x.invert(1)).toEqual((0, _d3Scale.local)(2009, 0, 1));
    expect(y.invert(1)).toEqual((0, _d3Scale.local)(2010, 0, 1));
    expect(y.range()).toEqual([0, 1]);
    y.range([2, 3]);
    expect(x.invert(2)).toEqual((0, _d3Scale.local)(2010, 0, 1));
    expect(y.invert(2)).toEqual((0, _d3Scale.local)(2009, 0, 1));
    expect(x.range()).toEqual([1, 2]);
    expect(y.range()).toEqual([2, 3]);
  });

  /*
  it("time.copy() isolates changes to the interpolator", () => {
    const x = scaleTime().domain([local(2009, 0, 1), local(2010, 0, 1)]).range(["red", "blue"])
    , i = x.interpolate()
    , y = x.copy();
    x.interpolate(interpolateHsl);
      expect(x(local(2009, 6, 1))).toBe("rgb(255, 0, 253)");
    expect(y(local(2009, 6, 1))).toBe("rgb(129, 0, 126)");
    expect(y.interpolate()).toBe(i);
  });
  */

  it("time.copy() isolates changes to clamping", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2009, 0, 1), (0, _d3Scale.local)(2010, 0, 1)]).clamp(true),
      y = x.copy();
    x.clamp(false);
    expect(x((0, _d3Scale.local)(2011, 0, 1))).toBe(2);
    expect(y((0, _d3Scale.local)(2011, 0, 1))).toBe(1);
    expect(y.clamp()).toBe(true);
    y.clamp(false);
    expect(x((0, _d3Scale.local)(2011, 0, 1))).toBe(2);
    expect(y((0, _d3Scale.local)(2011, 0, 1))).toBe(2);
    expect(x.clamp()).toBe(false);
  });
  it("time.clamp(true).invert(value) never returns a value outside the domain", () => {
    const x = (0, _index.scaleTime)().clamp(true);
    expect(x.invert(0) instanceof Date).toBe(true);
    expect(x.invert(0) !== x.invert(0)).toBe(true); // returns a distinct copy
    expect(+x.invert(-1)).toBe(+x.domain()[0]);
    expect(+x.invert(0)).toBe(+x.domain()[0]);
    expect(+x.invert(1)).toBe(+x.domain()[1]);
    expect(+x.invert(2)).toBe(+x.domain()[1]);
  });
  it("time.ticks(interval) observes the specified tick interval", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 1, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 4, 4)]);
    expect(x.ticks(_d3Time.timeMinute)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 1), (0, _d3Scale.local)(2011, 0, 1, 12, 2), (0, _d3Scale.local)(2011, 0, 1, 12, 3), (0, _d3Scale.local)(2011, 0, 1, 12, 4)]);
  });
  it("time.ticks(interval.every(step)) observes the specified tick interval and step", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 33, 4)]);
    expect(x.ticks(_d3Time.timeMinute.every(10))).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 10), (0, _d3Scale.local)(2011, 0, 1, 12, 20), (0, _d3Scale.local)(2011, 0, 1, 12, 30)]);
  });
  it("time.ticks(count) can generate sub-second ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 1)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 0, 200), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 0, 400), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 0, 600), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 0, 800), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 1, 0)]);
  });
  it("time.ticks(count) can generate 1-second ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 4)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 1), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 2), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 3), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 4)]);
  });
  it("time.ticks(count) can generate 5-second ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 20)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 5), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 10), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 15), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 20)]);
  });
  it("time.ticks(count) can generate 15-second ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 50)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 15), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 30), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 45)]);
  });
  it("time.ticks(count) can generate 30-second ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 1, 50)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 0, 30), (0, _d3Scale.local)(2011, 0, 1, 12, 1, 0), (0, _d3Scale.local)(2011, 0, 1, 12, 1, 30)]);
  });
  it("time.ticks(count) can generate 1-minute ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 0, 27), (0, _d3Scale.local)(2011, 0, 1, 12, 4, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 1), (0, _d3Scale.local)(2011, 0, 1, 12, 2), (0, _d3Scale.local)(2011, 0, 1, 12, 3), (0, _d3Scale.local)(2011, 0, 1, 12, 4)]);
  });
  it("time.ticks(count) can generate 5-minute ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 3, 27), (0, _d3Scale.local)(2011, 0, 1, 12, 21, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 5), (0, _d3Scale.local)(2011, 0, 1, 12, 10), (0, _d3Scale.local)(2011, 0, 1, 12, 15), (0, _d3Scale.local)(2011, 0, 1, 12, 20)]);
  });
  it("time.ticks(count) can generate 15-minute ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 8, 27), (0, _d3Scale.local)(2011, 0, 1, 13, 4, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 15), (0, _d3Scale.local)(2011, 0, 1, 12, 30), (0, _d3Scale.local)(2011, 0, 1, 12, 45), (0, _d3Scale.local)(2011, 0, 1, 13, 0)]);
  });
  it("time.ticks(count) can generate 30-minute ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 28, 27), (0, _d3Scale.local)(2011, 0, 1, 14, 4, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 12, 30), (0, _d3Scale.local)(2011, 0, 1, 13, 0), (0, _d3Scale.local)(2011, 0, 1, 13, 30), (0, _d3Scale.local)(2011, 0, 1, 14, 0)]);
  });
  it("time.ticks(count) can generate 1-hour ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 12, 28, 27), (0, _d3Scale.local)(2011, 0, 1, 16, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 13, 0), (0, _d3Scale.local)(2011, 0, 1, 14, 0), (0, _d3Scale.local)(2011, 0, 1, 15, 0), (0, _d3Scale.local)(2011, 0, 1, 16, 0)]);
  });
  it("time.ticks(count) can generate 3-hour ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 14, 28, 27), (0, _d3Scale.local)(2011, 0, 2, 1, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 15, 0), (0, _d3Scale.local)(2011, 0, 1, 18, 0), (0, _d3Scale.local)(2011, 0, 1, 21, 0), (0, _d3Scale.local)(2011, 0, 2, 0, 0)]);
  });
  it("time.ticks(count) can generate 6-hour ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 16, 28, 27), (0, _d3Scale.local)(2011, 0, 2, 14, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 18, 0), (0, _d3Scale.local)(2011, 0, 2, 0, 0), (0, _d3Scale.local)(2011, 0, 2, 6, 0), (0, _d3Scale.local)(2011, 0, 2, 12, 0)]);
  });
  it("time.ticks(count) can generate 12-hour ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 16, 28, 27), (0, _d3Scale.local)(2011, 0, 3, 21, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 2, 0, 0), (0, _d3Scale.local)(2011, 0, 2, 12, 0), (0, _d3Scale.local)(2011, 0, 3, 0, 0), (0, _d3Scale.local)(2011, 0, 3, 12, 0)]);
  });
  it("time.ticks(count) can generate 1-day ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 16, 28, 27), (0, _d3Scale.local)(2011, 0, 5, 21, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 2, 0, 0), (0, _d3Scale.local)(2011, 0, 3, 0, 0), (0, _d3Scale.local)(2011, 0, 4, 0, 0), (0, _d3Scale.local)(2011, 0, 5, 0, 0)]);
  });
  it("time.ticks(count) can generate 2-day ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 2, 16, 28, 27), (0, _d3Scale.local)(2011, 0, 9, 21, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 3, 0, 0), (0, _d3Scale.local)(2011, 0, 5, 0, 0), (0, _d3Scale.local)(2011, 0, 7, 0, 0), (0, _d3Scale.local)(2011, 0, 9, 0, 0)]);
  });
  it("time.ticks(count) can generate 1-week ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 1, 16, 28, 27), (0, _d3Scale.local)(2011, 0, 23, 21, 34, 12)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 2, 0, 0), (0, _d3Scale.local)(2011, 0, 9, 0, 0), (0, _d3Scale.local)(2011, 0, 16, 0, 0), (0, _d3Scale.local)(2011, 0, 23, 0, 0)]);
  });
  it("time.ticks(count) can generate 1-month ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2011, 0, 18), (0, _d3Scale.local)(2011, 4, 2)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 1, 1, 0, 0), (0, _d3Scale.local)(2011, 2, 1, 0, 0), (0, _d3Scale.local)(2011, 3, 1, 0, 0), (0, _d3Scale.local)(2011, 4, 1, 0, 0)]);
  });
  it("time.ticks(count) can generate 3-month ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2010, 11, 18), (0, _d3Scale.local)(2011, 10, 2)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 0, 0), (0, _d3Scale.local)(2011, 3, 1, 0, 0), (0, _d3Scale.local)(2011, 6, 1, 0, 0), (0, _d3Scale.local)(2011, 9, 1, 0, 0)]);
  });
  it("time.ticks(count) can generate 1-year ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2010, 11, 18), (0, _d3Scale.local)(2014, 2, 2)]);
    expect(x.ticks(4)).toEqual([(0, _d3Scale.local)(2011, 0, 1, 0, 0), (0, _d3Scale.local)(2012, 0, 1, 0, 0), (0, _d3Scale.local)(2013, 0, 1, 0, 0), (0, _d3Scale.local)(2014, 0, 1, 0, 0)]);
  });
  it("time.ticks(count) can generate multi-year ticks", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(0, 11, 18), (0, _d3Scale.local)(2014, 2, 2)]);
    expect(x.ticks(6)).toEqual([(0, _d3Scale.local)(500, 0, 1, 0, 0), (0, _d3Scale.local)(1000, 0, 1, 0, 0), (0, _d3Scale.local)(1500, 0, 1, 0, 0), (0, _d3Scale.local)(2000, 0, 1, 0, 0)]);
  });
  it("time.ticks(count) returns one tick for an empty domain", () => {
    const x = (0, _index.scaleTime)().domain([(0, _d3Scale.local)(2014, 2, 2), (0, _d3Scale.local)(2014, 2, 2)]);
    expect(x.ticks(6)).toEqual([(0, _d3Scale.local)(2014, 2, 2)]);
  });
  it("time.ticks() returns descending ticks for a descending domain", () => {
    const x = (0, _index.scaleTime)();
    expect(x.domain([(0, _d3Scale.local)(2014, 2, 2), (0, _d3Scale.local)(2010, 11, 18)]).ticks(4)).toEqual([(0, _d3Scale.local)(2014, 0, 1, 0, 0), (0, _d3Scale.local)(2013, 0, 1, 0, 0), (0, _d3Scale.local)(2012, 0, 1, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 0, 0)]);
    expect(x.domain([(0, _d3Scale.local)(2011, 10, 2), (0, _d3Scale.local)(2010, 11, 18)]).ticks(4)).toEqual([(0, _d3Scale.local)(2011, 9, 1, 0, 0), (0, _d3Scale.local)(2011, 6, 1, 0, 0), (0, _d3Scale.local)(2011, 3, 1, 0, 0), (0, _d3Scale.local)(2011, 0, 1, 0, 0)]);
  });
  it("time.tickFormat()(date) formats year on New Year's", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 0, 1))).toBe("2011");
    expect(f((0, _d3Scale.local)(2012, 0, 1))).toBe("2012");
    expect(f((0, _d3Scale.local)(2013, 0, 1))).toBe("2013");
  });
  it("time.tickFormat()(date) formats month on the 1st of each month", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 1))).toBe("February");
    expect(f((0, _d3Scale.local)(2011, 2, 1))).toBe("March");
    expect(f((0, _d3Scale.local)(2011, 3, 1))).toBe("April");
  });
  it("time.tickFormat()(date) formats week on Sunday midnight", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 6))).toBe("Feb 06");
    expect(f((0, _d3Scale.local)(2011, 1, 13))).toBe("Feb 13");
    expect(f((0, _d3Scale.local)(2011, 1, 20))).toBe("Feb 20");
  });
  it("time.tickFormat()(date) formats date on midnight", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 2))).toBe("Wed 02");
    expect(f((0, _d3Scale.local)(2011, 1, 3))).toBe("Thu 03");
    expect(f((0, _d3Scale.local)(2011, 1, 4))).toBe("Fri 04");
  });
  it("time.tickFormat()(date) formats hour on minute zero", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 2, 11))).toBe("11 AM");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12))).toBe("12 PM");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 13))).toBe("01 PM");
  });
  it("time.tickFormat()(date) formats minute on second zero", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 2, 11, 59))).toBe("11:59");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12, 1))).toBe("12:01");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12, 2))).toBe("12:02");
  });
  it("time.tickFormat()(date) otherwise, formats second", () => {
    const f = (0, _index.scaleTime)().tickFormat();
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12, 1, 9))).toBe(":09");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12, 1, 10))).toBe(":10");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12, 1, 11))).toBe(":11");
  });
  it("time.tickFormat(count, specifier) returns a time format for the specified specifier", () => {
    const f = (0, _index.scaleTime)().tickFormat(10, "%c");
    expect(f((0, _d3Scale.local)(2011, 1, 2, 12))).toBe("2/2/2011, 12:00:00 PM");
  });
});
//# sourceMappingURL=d3Scale-time.js.map