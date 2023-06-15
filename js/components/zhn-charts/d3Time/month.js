"use strict";

exports.__esModule = true;
exports.utcMonth = exports.timeMonth = void 0;
var _interval = require("./interval");
const timeMonth = (0, _interval.timeInterval)(date => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12, date => date.getMonth());
exports.timeMonth = timeMonth;
const utcMonth = (0, _interval.timeInterval)(date => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12, date => date.getUTCMonth());
exports.utcMonth = utcMonth;
//# sourceMappingURL=month.js.map