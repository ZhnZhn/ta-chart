"use strict";

exports.__esModule = true;
exports.default = _default;
function _default(a, b) {
  const d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
//# sourceMappingURL=date.js.map