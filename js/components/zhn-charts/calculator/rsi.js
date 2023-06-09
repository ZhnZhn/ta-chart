"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Array = require("../d3Array");
var _utils = require("../utils");
var _defaultOptionsForComputation = require("./defaultOptionsForComputation");
/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/relativeStrengthIndex.js
The MIT License (MIT)
Copyright (c) 2014-2015 Scott Logic Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
export interface RSIOptions {
    windowSize: number;
    sourcePath?: string;
}
*/

function _default() {
  var options = _defaultOptionsForComputation.RSI;
  var calculator = function calculator(data) {
    var prevAvgGain, prevAvgLoss;
    var _options = options,
      windowSize = _options.windowSize,
      sourcePath = _options.sourcePath,
      source = (0, _utils.path)(sourcePath),
      rsiAlgorithm = (0, _utils.slidingWindow)().windowSize(windowSize).accumulator(function (values) {
        var avgGain = prevAvgGain !== undefined ? (prevAvgGain * (windowSize - 1) + values[values.length - 1].gain) / windowSize : (0, _d3Array.mean)(values, function (each) {
          return each.gain;
        });
        if (avgGain === undefined) {
          return;
        }
        var avgLoss = prevAvgLoss !== undefined ? (prevAvgLoss * (windowSize - 1) + values[values.length - 1].loss) / windowSize : (0, _d3Array.mean)(values, function (each) {
          return each.loss;
        });
        if (avgLoss === undefined) {
          return;
        }
        var relativeStrength = avgGain / avgLoss,
          rsi = 100 - 100 / (1 + relativeStrength);
        prevAvgGain = avgGain;
        prevAvgLoss = avgLoss;
        return rsi;
      }),
      gainsAndLossesCalculator = (0, _utils.slidingWindow)().windowSize(2).undefinedValue(function () {
        return [0, 0];
      }).accumulator(function (tuple) {
        var prev = tuple[0],
          now = tuple[1],
          change = source(now) - source(prev);
        return {
          gain: Math.max(change, 0),
          loss: Math.abs(Math.min(change, 0))
        };
      }),
      gainsAndLosses = gainsAndLossesCalculator(data),
      rsiData = rsiAlgorithm(gainsAndLosses);
    return rsiData;
  };
  calculator.undefinedLength = function () {
    return options.windowSize - 1;
  };
  calculator.options = function () {
    return arguments.length ? (options = (0, _extends2["default"])({}, _defaultOptionsForComputation.RSI, arguments.length <= 0 ? undefined : arguments[0]), calculator) : options;
  };
  return calculator;
}
//# sourceMappingURL=rsi.js.map