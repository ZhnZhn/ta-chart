"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.bollingerBand = void 0;
var _utils = require("../utils");
var _calculator = require("../calculator");
var _baseIndicator = _interopRequireDefault(require("./baseIndicator"));
var _crIndicator = _interopRequireDefault(require("./crIndicator"));
const ALGORITHM_TYPE = "BollingerBand";

/*
interface BollingerBandIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): BollingerBandIndicator;
    accessor(): any;
    accessor(x: any): BollingerBandIndicator;
    stroke(): string | any;
    stroke(x: string | any): BollingerBandIndicator;
    fill(): string | any;
    fill(x: string | any): BollingerBandIndicator;
    echo(): any;
    echo(x: any): BollingerBandIndicator;
    type(): string;
    type(x: string): BollingerBandIndicator;
    merge(): any;
    merge(newMerge: any): BollingerBandIndicator;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandIndicator;
}
*/

const bollingerBand = () => {
  const base = (0, _baseIndicator.default)().type(ALGORITHM_TYPE),
    underlyingAlgorithm = (0, _calculator.bollingerband)(),
    mergedAlgorithm = (0, _utils.merge)().algorithm(underlyingAlgorithm).merge((datum, i) => {
      datum.bollingerBand = i;
    });
  return (0, _crIndicator.default)(ALGORITHM_TYPE, base, underlyingAlgorithm, mergedAlgorithm);
};
exports.bollingerBand = bollingerBand;
//# sourceMappingURL=bollingerBand.js.map