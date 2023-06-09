"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Array = require("../d3Array");
var _utils = require("../utils");
var _ema = _interopRequireDefault(require("./ema"));
var _defaultOptionsForComputation = require("./defaultOptionsForComputation");
/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/bollingerBands.js
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
export interface BollingerBandOptions {
    readonly windowSize: number;
    readonly sourcePath: string;
    readonly multiplier: number;
    readonly movingAverageType: string;
}

interface BollingerBandCalculator {
    (data: any[]): any;
    undefinedLength(): number;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandCalculator;
}
*/

function _default() {
  var options = _defaultOptionsForComputation.BOLLINGER_BAND;
  var calculator = function calculator(data) {
    var _options = options,
      windowSize = _options.windowSize,
      multiplier = _options.multiplier,
      movingAverageType = _options.movingAverageType,
      sourcePath = _options.sourcePath,
      source = (0, _utils.path)(sourcePath),
      meanAlgorithm = movingAverageType === "ema" ? (0, _ema["default"])().options({
        windowSize: windowSize,
        sourcePath: sourcePath
      }) : (0, _utils.slidingWindow)().windowSize(windowSize).accumulator(function (values) {
        return (0, _d3Array.mean)(values);
      }).sourcePath(sourcePath),
      bollingerBandAlgorithm = (0, _utils.slidingWindow)().windowSize(windowSize).accumulator(function (values) {
        var avg = values[values.length - 1].mean,
          stdDev = (0, _d3Array.deviation)(values, function (each) {
            return source(each.datum);
          });
        return stdDev === undefined ? void 0 : {
          top: avg + multiplier * stdDev,
          middle: avg,
          bottom: avg - multiplier * stdDev
        };
      }),
      zip = (0, _utils.zipper)().combine(function (datum, mean) {
        return {
          datum: datum,
          mean: mean
        };
      }),
      tuples = zip(data, meanAlgorithm(data));
    return bollingerBandAlgorithm(tuples);
  };
  calculator.undefinedLength = function () {
    return options.windowSize - 1;
  };
  calculator.options = function () {
    return arguments.length ? (options = (0, _extends2["default"])({}, _defaultOptionsForComputation.BOLLINGER_BAND, arguments.length <= 0 ? undefined : arguments[0]), calculator) : options;
  };
  return calculator;
}
//# sourceMappingURL=bollingerband.js.map