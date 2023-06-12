"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.precisionRound = exports.precisionPrefix = exports.precisionFixed = void 0;
var _exponent = _interopRequireDefault(require("./exponent"));
const mathMax = Math.max,
  mathMin = Math.min,
  mathAbs = Math.abs,
  mathFloor = Math.floor;
const precisionFixed = step => mathMax(0, -(0, _exponent.default)(mathAbs(step)));
exports.precisionFixed = precisionFixed;
const precisionPrefix = (step, value) => mathMax(0, mathMax(-8, mathMin(8, mathFloor((0, _exponent.default)(value) / 3))) * 3 - (0, _exponent.default)(mathAbs(step)));
exports.precisionPrefix = precisionPrefix;
const precisionRound = (step, max) => {
  step = mathAbs(step);
  max = mathAbs(max) - step;
  return mathMax(0, (0, _exponent.default)(max) - (0, _exponent.default)(step)) + 1;
};
exports.precisionRound = precisionRound;
//# sourceMappingURL=precision.js.map