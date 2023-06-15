"use strict";

exports.__esModule = true;
exports.utcMinute = exports.timeMinute = void 0;
var _interval = require("./interval");
var _duration = require("./duration");
const timeMinute = (0, _interval.timeInterval)(date => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationMinute);
}, (start, end) => (end - start) / _duration.durationMinute, date => date.getMinutes());
exports.timeMinute = timeMinute;
const utcMinute = (0, _interval.timeInterval)(date => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationMinute);
}, (start, end) => (end - start) / _duration.durationMinute, date => date.getUTCMinutes());
exports.utcMinute = utcMinute;
//# sourceMappingURL=minute.js.map