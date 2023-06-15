"use strict";

exports.__esModule = true;
exports.millisecond = void 0;
var _interval = require("./interval");
const mathFloor = Math.floor;
const millisecond = (0, _interval.timeInterval)(() => {}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => end - start);

// An optimized implementation for this simple case.
exports.millisecond = millisecond;
millisecond.every = k => {
  k = mathFloor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return (0, _interval.timeInterval)(date => {
    date.setTime(mathFloor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => (end - start) / k);
};
//# sourceMappingURL=millisecond.js.map