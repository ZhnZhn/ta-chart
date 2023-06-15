"use strict";

exports.__esModule = true;
exports.utcDay = exports.timeDay = void 0;
var _interval = require("./interval");
var _duration = require("./duration");
const timeDay = (0, _interval.timeInterval)(date => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationDay, date => date.getDate() - 1);
exports.timeDay = timeDay;
const utcDay = (0, _interval.timeInterval)(date => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => (end - start) / _duration.durationDay, date => date.getUTCDate() - 1);
exports.utcDay = utcDay;
//# sourceMappingURL=day.js.map