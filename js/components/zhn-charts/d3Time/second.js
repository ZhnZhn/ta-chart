"use strict";

exports.__esModule = true;
exports.second = void 0;
var _interval = require("./interval");
var _duration = require("./duration");
const second = (0, _interval.timeInterval)(date => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * _duration.durationSecond);
}, (start, end) => (end - start) / _duration.durationSecond, date => date.getUTCSeconds());
exports.second = second;
//# sourceMappingURL=second.js.map