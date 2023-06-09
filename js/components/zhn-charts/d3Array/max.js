"use strict";

exports.__esModule = true;
exports.max = void 0;
var max = function max(values, valueof) {
  var n = values.length,
    i = -1,
    value,
    max;

  // Find the first comparable value.
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        max = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  } else {
    // Find the first comparable value.
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }
  return max;
};
exports.max = max;
//# sourceMappingURL=max.js.map