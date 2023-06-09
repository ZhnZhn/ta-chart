"use strict";

exports.__esModule = true;
exports.variance = void 0;
var _number = require("./number");
var variance = function variance(values, valueOf) {
  var n = values.length,
    m = 0,
    i = -1,
    mean = 0,
    value,
    delta,
    sum = 0;
  if (valueOf == null) {
    while (++i < n) {
      if (!isNaN(value = (0, _number.number)(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = (0, _number.number)(valueOf(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }
  if (m > 1) return sum / (m - 1);
};
exports.variance = variance;
//# sourceMappingURL=variance.js.map