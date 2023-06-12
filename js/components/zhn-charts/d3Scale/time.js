"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.calendar = calendar;
exports.default = time;
var _d3Time = require("d3-time");
var _d3TimeFormat = require("d3-time-format");
var _continuous = require("./continuous");
var _init = require("./init");
var _nice = _interopRequireDefault(require("./nice"));
const arrayFrom = Array.from,
  crDate = t => new Date(t),
  crDateMls = t => t instanceof Date ? +t : +new Date(+t);
function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  let scale = (0, _continuous.continuous)(),
    invert = scale.invert,
    domain = scale.domain;
  const formatMillisecond = format(".%L"),
    formatSecond = format(":%S"),
    formatMinute = format("%I:%M"),
    formatHour = format("%I %p"),
    formatDay = format("%a %d"),
    formatWeek = format("%b %d"),
    formatMonth = format("%B"),
    formatYear = format("%Y"),
    tickFormat = date => (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
  scale.invert = y => new Date(invert(y));
  scale.domain = function () {
    return arguments.length ? domain(arrayFrom(arguments.length <= 0 ? undefined : arguments[0], crDateMls)) : domain().map(crDate);
  };
  scale.ticks = interval => {
    let d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = (count, specifier) => specifier == null ? tickFormat : format(specifier);
  scale.nice = interval => {
    let d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain((0, _nice.default)(d, interval)) : scale;
  };
  scale.copy = () => (0, _continuous.copy)(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  return scale;
}
function time() {
  return _init.initRange.apply(calendar(_d3Time.timeTicks, _d3Time.timeTickInterval, _d3Time.timeYear, _d3Time.timeMonth, _d3Time.timeWeek, _d3Time.timeDay, _d3Time.timeHour, _d3Time.timeMinute, _d3Time.timeSecond, _d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}
//# sourceMappingURL=time.js.map