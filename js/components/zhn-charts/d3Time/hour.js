"use strict";

exports.__esModule = true;
exports.utcHour = exports.timeHour = void 0;
var _interval = require("./interval");
var _duration = require("./duration");
const timeHour = (0, _interval.timeInterval)(date => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond - date.getMinutes() * _duration.durationMinute);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationHour);
}, (start, end) => (end - start) / _duration.durationHour, date => date.getHours());
exports.timeHour = timeHour;
const utcHour = (0, _interval.timeInterval)(date => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationHour);
}, (start, end) => (end - start) / _duration.durationHour, date => date.getUTCHours());
exports.utcHour = utcHour;
//# sourceMappingURL=hour.js.map