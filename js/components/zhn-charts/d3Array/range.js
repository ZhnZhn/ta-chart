"use strict";

exports.__esModule = true;
exports.range = void 0;
var mathMax = Math.max,
  mathCeil = Math.ceil;
var range = function range() {
  var start = +(arguments.length <= 0 ? undefined : arguments[0]),
    stop = +(arguments.length <= 1 ? undefined : arguments[1]),
    n = arguments.length,
    step = n < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +(arguments.length <= 2 ? undefined : arguments[2]),
    ranged = new Array(n),
    i = -1;
  n = mathMax(0, mathCeil((stop - start) / step)) | 0;
  while (++i < n) {
    ranged[i] = start + i * step;
  }
  return ranged;
};
exports.range = range;
//# sourceMappingURL=range.js.map