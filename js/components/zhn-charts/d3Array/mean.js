"use strict";

exports.__esModule = true;
exports.mean = void 0;
var _number = require("./number");
var mean = function mean(values, valueOf) {
  var n = values.length,
    m = n,
    i = -1,
    value,
    sum = 0;
  if (valueOf == null) {
    while (++i < n) {
      if (!isNaN(value = (0, _number.number)(values[i]))) sum += value;else --m;
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = (0, _number.number)(valueOf(values[i], i, values)))) sum += value;else --m;
    }
  }
  if (m) return sum / m;
};
exports.mean = mean;
//# sourceMappingURL=mean.js.map