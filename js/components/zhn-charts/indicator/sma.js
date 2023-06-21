"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sma = void 0;
var _utils = require("../utils");
var _calculator = require("../calculator");
var _baseIndicator = _interopRequireDefault(require("./baseIndicator"));
var _crIndicator = _interopRequireDefault(require("./crIndicator"));
const ALGORITHM_TYPE = "SMA";

/*
interface SMAIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): SMAIndicator;
    accessor(): any;
    accessor(x: any): SMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): SMAIndicator;
    fill(): string | any;
    fill(x: string | any): SMAIndicator;
    echo(): any;
    echo(x: any): SMAIndicator;
    type(): string;
    type(x: string): SMAIndicator;
    merge(): any;
    merge(newMerge: any): SMAIndicator;
    options(): SMAOptions;
    options(newOptions: SMAOptions): SMAIndicator;
}
*/

const sma = () => {
  const base = (0, _baseIndicator.default)().type(ALGORITHM_TYPE).accessor(d => d.sma),
    underlyingAlgorithm = (0, _calculator.sma)(),
    mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge((datum, i) => {
      datum.sma = i;
    });
  return (0, _crIndicator.default)(ALGORITHM_TYPE, base, underlyingAlgorithm, mergedAlgorithm);
};
exports.sma = sma;
//# sourceMappingURL=sma.js.map