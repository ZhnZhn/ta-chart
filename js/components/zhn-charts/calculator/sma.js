"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Array = require("../d3Array");
var _utils = require("../utils");
var _defaultOptionsForComputation = require("./defaultOptionsForComputation");
function _default() {
  var options = _defaultOptionsForComputation.SMA;
  function calculator(data) {
    var _options = options,
      windowSize = _options.windowSize,
      sourcePath = _options.sourcePath;
    var average = (0, _utils.slidingWindow)().windowSize(windowSize).sourcePath(sourcePath).accumulator(function (values) {
      return (0, _d3Array.mean)(values);
    });
    return average(data);
  }
  calculator.undefinedLength = function () {
    return options.windowSize - 1;
  };
  calculator.options = function () {
    return arguments.length ? (options = (0, _extends2["default"])({}, _defaultOptionsForComputation.SMA, arguments.length <= 0 ? undefined : arguments[0]), calculator) : options;
  };
  return calculator;
}
//# sourceMappingURL=sma.js.map