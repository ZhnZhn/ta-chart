"use strict";

var _index = require("../index");
var _helperFn = require("./helperFn.test");
describe('d3Time timeInterval', () => {
  it("timeInterval() is equivalent to timeInterval.floor(new Date)", () => {
    const t = new Date();
    expect((0, _index.timeYear)()).toEqual(_index.timeYear.floor(t));
  });
  it("timeInterval(date) is equivalent to timeInterval.floor(date)", () => {
    const t = new Date();
    expect((0, _index.timeYear)(t)).toEqual(_index.timeYear.floor(t));
  });
  it("timeInterval(floor, offset) returns a custom time interval", () => {
    const i = (0, _index.timeInterval)(date => {
      date.setUTCMinutes(0, 0, 0);
    }, (date, step) => {
      date.setUTCHours(date.getUTCHours() + step);
    });
    expect(i((0, _helperFn.utc)(2015, 0, 1, 12, 34, 56, 789))).toEqual((0, _helperFn.utc)(2015, 0, 1, 12));
  });
  it("timeInterval(floor, offset) does not define a count method", () => {
    const i = (0, _index.timeInterval)(date => {
      date.setUTCMinutes(0, 0, 0);
    }, (date, step) => {
      date.setUTCHours(date.getUTCHours() + step);
    });
    expect("count" in i).toBe(false);
  });
  it("timeInterval(floor, offset) floors the step before passing it to offset", () => {
    const steps = [],
      i = (0, _index.timeInterval)(date => {
        date.setUTCMinutes(0, 0, 0);
      }, (date, step) => {
        steps.push(+step);
        date.setUTCHours(date.getUTCHours() + step);
      });
    expect(i.offset((0, _helperFn.utc)(2015, 0, 1, 12, 34, 56, 789), 1.5)).toEqual((0, _helperFn.utc)(2015, 0, 1, 13, 34, 56, 789));
    expect(i.range((0, _helperFn.utc)(2015, 0, 1, 12), (0, _helperFn.utc)(2015, 0, 1, 15), 1.5)).toEqual([(0, _helperFn.utc)(2015, 0, 1, 12), (0, _helperFn.utc)(2015, 0, 1, 13), (0, _helperFn.utc)(2015, 0, 1, 14)]);
    expect(steps.every(step => step === 1)).toBe(true);
  });
  it("timeInterval(floor, offset, count) defines a count method", () => {
    const i = (0, _index.timeInterval)(date => {
      date.setUTCMinutes(0, 0, 0);
    }, (date, step) => {
      date.setUTCHours(date.getUTCHours() + step);
    }, (start, end) => (end - start) / 36e5);
    expect(i.count((0, _helperFn.utc)(2015, 0, 1, 12, 34), (0, _helperFn.utc)(2015, 0, 1, 15, 56))).toBe(3);
  });
  it("timeInterval(floor, offset, count) floors dates before passing them to count", () => {
    const dates = [],
      i = (0, _index.timeInterval)(date => {
        date.setUTCMinutes(0, 0, 0);
      }, (date, step) => {
        date.setUTCHours(date.getUTCHours() + step);
      }, (start, end) => {
        dates.push(new Date(+start), new Date(+end));
        return (end - start) / 36e5;
      });
    i.count((0, _helperFn.utc)(2015, 0, 1, 12, 34), (0, _helperFn.utc)(2015, 0, 1, 15, 56));
    expect(dates).toEqual([(0, _helperFn.utc)(2015, 0, 1, 12), (0, _helperFn.utc)(2015, 0, 1, 15)]);
  });
  it("timeInterval.every(step) returns null if step is invalid", () => {
    expect(_index.timeDay.every()).toBe(null);
    expect(_index.timeMinute.every(null)).toBe(null);
    expect(_index.timeSecond.every(undefined)).toBe(null);
    expect(_index.timeDay.every(NaN)).toBe(null);
    expect(_index.timeMinute.every(0)).toBe(null);
    expect(_index.timeSecond.every(0.8)).toBe(null);
    expect(_index.timeHour.every(-1)).toBe(null);
  });
  it("timeInterval.every(step) returns interval if step is one", () => {
    expect(_index.timeDay.every("1")).toBe(_index.timeDay);
    expect(_index.timeMinute.every(1)).toBe(_index.timeMinute);
    expect(_index.timeSecond.every(1.8)).toBe(_index.timeSecond);
  });
  it("timeInterval.every(step).range(invalid, invalid) returns the empty array", () => {
    expect(_index.timeMinute.every(15).range(NaN, NaN)).toEqual([]);
  });
  it("timeInterval.every(…).offset(date, step) returns the expected value when step is positive", () => {
    const i = _index.timeMinute.every(15);
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 0)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 34));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 1)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 45));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 2)).toEqual((0, _helperFn.local)(2015, 0, 1, 13, 0));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 3)).toEqual((0, _helperFn.local)(2015, 0, 1, 13, 15));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 4)).toEqual((0, _helperFn.local)(2015, 0, 1, 13, 30));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 5)).toEqual((0, _helperFn.local)(2015, 0, 1, 13, 45));
  });
  it("timeInterval.every(…).offset(date, step) returns the expected value when step is negative", () => {
    const i = _index.timeMinute.every(15);
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), -1)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 30));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), -2)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 15));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), -3)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 0));
  });
  it("timeInterval.every(…).offset(date, step) returns the expected value when step is not an integer", () => {
    const i = _index.timeMinute.every(15);
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), 1.2)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 45));
    expect(i.offset((0, _helperFn.local)(2015, 0, 1, 12, 34), -0.8)).toEqual((0, _helperFn.local)(2015, 0, 1, 12, 30));
  });
});
//# sourceMappingURL=timeInterval.test.js.map