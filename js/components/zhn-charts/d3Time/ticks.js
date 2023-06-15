"use strict";

exports.__esModule = true;
exports.timeTicks = exports.timeTickInterval = void 0;
var _d3Array = require("../d3Array");
var _duration = require("./duration");
var _millisecond = require("./millisecond");
var _second = require("./second");
var _minute = require("./minute");
var _hour = require("./hour");
var _day = require("./day");
var _week = require("./week");
var _month = require("./month");
var _year = require("./year");
const mathAbs = Math.abs,
  mathMax = Math.max,
  ticker = (year, month, week, day, hour, minute) => {
    const tickIntervals = [[_second.second, 1, _duration.durationSecond], [_second.second, 5, 5 * _duration.durationSecond], [_second.second, 15, 15 * _duration.durationSecond], [_second.second, 30, 30 * _duration.durationSecond], [minute, 1, _duration.durationMinute], [minute, 5, 5 * _duration.durationMinute], [minute, 15, 15 * _duration.durationMinute], [minute, 30, 30 * _duration.durationMinute], [hour, 1, _duration.durationHour], [hour, 3, 3 * _duration.durationHour], [hour, 6, 6 * _duration.durationHour], [hour, 12, 12 * _duration.durationHour], [day, 1, _duration.durationDay], [day, 2, 2 * _duration.durationDay], [week, 1, _duration.durationWeek], [month, 1, _duration.durationMonth], [month, 3, 3 * _duration.durationMonth], [year, 1, _duration.durationYear]];
    function ticks(start, stop, count) {
      const reverse = stop < start;
      if (reverse) [start, stop] = [stop, start];
      const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count),
        ticks = interval ? interval.range(start, +stop + 1) : [];
      return reverse ? ticks.reverse() : ticks;
    }
    function tickInterval(start, stop, count) {
      const target = mathAbs(stop - start) / count,
        i = (0, _d3Array.bisector)(_ref => {
          let [,, step] = _ref;
          return step;
        }).right(tickIntervals, target);
      if (i === tickIntervals.length) return year.every((0, _d3Array.tickStep)(start / _duration.durationYear, stop / _duration.durationYear, count));
      if (i === 0) return _millisecond.millisecond.every(mathMax((0, _d3Array.tickStep)(start, stop, count), 1));
      const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
      return t.every(step);
    }
    return [ticks, tickInterval];
  };
const [timeTicks, timeTickInterval] = ticker(_year.timeYear, _month.timeMonth, _week.timeSunday, _day.timeDay, _hour.timeHour, _minute.timeMinute);
exports.timeTickInterval = timeTickInterval;
exports.timeTicks = timeTicks;
//# sourceMappingURL=ticks.js.map