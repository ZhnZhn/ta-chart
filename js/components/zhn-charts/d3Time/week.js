"use strict";

exports.__esModule = true;
exports.utcSunday = exports.timeThursday = exports.timeSunday = exports.timeMonday = void 0;
var _interval = require("./interval");
var _duration = require("./duration");
const _timeWeekday = i => (0, _interval.timeInterval)(date => {
  date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setDate(date.getDate() + step * 7);
}, (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationWeek);
const timeSunday = _timeWeekday(0);
exports.timeSunday = timeSunday;
const timeMonday = _timeWeekday(1);
exports.timeMonday = timeMonday;
const timeThursday = _timeWeekday(4);
exports.timeThursday = timeThursday;
const _utcWeekday = i => (0, _interval.timeInterval)(date => {
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step * 7);
}, (start, end) => (end - start) / _duration.durationWeek);
const utcSunday = _utcWeekday(0);
exports.utcSunday = utcSunday;
//# sourceMappingURL=week.js.map