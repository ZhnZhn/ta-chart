"use strict";

exports.__esModule = true;
exports.default = _default;
exports.isNumberArray = isNumberArray;
function _default(a, b) {
  if (!b) b = [];
  let n = a ? Math.min(b.length, a.length) : 0,
    c = b.slice(),
    i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
//# sourceMappingURL=numberArray.js.map