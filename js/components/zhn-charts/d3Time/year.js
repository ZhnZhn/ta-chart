"use strict";

exports.__esModule = true;
exports.utcYear = exports.timeYear = void 0;
var _interval = require("./interval");
const timeYear = (0, _interval.timeInterval)(date => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => end.getFullYear() - start.getFullYear(), date => date.getFullYear());

// An optimized implementation for this simple case.
exports.timeYear = timeYear;
timeYear.every = k => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.timeInterval)(date => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
const utcYear = (0, _interval.timeInterval)(date => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => end.getUTCFullYear() - start.getUTCFullYear(), date => date.getUTCFullYear());

// An optimized implementation for this simple case.
exports.utcYear = utcYear;
utcYear.every = k => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.timeInterval)(date => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
//# sourceMappingURL=year.js.map