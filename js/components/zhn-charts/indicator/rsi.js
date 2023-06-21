"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.rsi = void 0;
var _utils = require("../utils");
var _calculator = require("../calculator");
var _baseIndicator = _interopRequireDefault(require("./baseIndicator"));
var _crIndicator = _interopRequireDefault(require("./crIndicator"));
const ALGORITHM_TYPE = "RSI";

/*
interface RSIIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): RSIIndicator;
    accessor(): any;
    accessor(x: any): RSIIndicator;
    stroke(): string | any;
    stroke(x: string | any): RSIIndicator;
    fill(): string | any;
    fill(x: string | any): RSIIndicator;
    echo(): any;
    echo(x: any): RSIIndicator;
    type(): string;
    type(x: string): RSIIndicator;
    merge(): any;
    merge(newMerge: any): RSIIndicator;
    options(): RSIOptions;
    options(newOptions: RSIOptions): RSIIndicator;
}
*/

const rsi = () => {
  const base = (0, _baseIndicator.default)().type(ALGORITHM_TYPE).accessor(d => d.rsi),
    underlyingAlgorithm = (0, _calculator.rsi)(),
    mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge((datum, i) => {
      datum.rsi = i;
    });
  return (0, _crIndicator.default)(ALGORITHM_TYPE, base, underlyingAlgorithm, mergedAlgorithm);
};
exports.rsi = rsi;
//# sourceMappingURL=rsi.js.map