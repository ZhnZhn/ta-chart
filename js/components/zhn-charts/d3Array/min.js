"use strict";

exports.__esModule = true;
exports.min = void 0;
var min = function min(values, valueOf) {
  var n = values.length,
    i = -1,
    value,
    min;

  // Find the first comparable value.
  if (valueOf == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        min = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  } else {
    // Find the first comparable value.
    while (++i < n) {
      if ((value = valueOf(values[i], i, values)) != null && value >= value) {
        min = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = valueOf(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }
  return min;
};
exports.min = min;
//# sourceMappingURL=min.js.map