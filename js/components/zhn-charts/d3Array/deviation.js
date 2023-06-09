"use strict";

exports.__esModule = true;
exports.deviation = void 0;
var _variance = require("./variance");
var mathSqrt = Math.sqrt;
var deviation = function deviation(array, f) {
  var v = (0, _variance.variance)(array, f);
  return v ? mathSqrt(v) : v;
};
exports.deviation = deviation;
//# sourceMappingURL=deviation.js.map