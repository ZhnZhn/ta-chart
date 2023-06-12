"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
var _exportNames = {
  rebind: true,
  merge: true,
  slidingWindow: true,
  zipper: true,
  identity: true,
  path: true,
  functor: true,
  crCssTranslate: true,
  overlayColors: true,
  find: true,
  hexToRGBA: true,
  last: true,
  head: true,
  first: true,
  plotDataLengthBarWidth: true
};
exports.crCssTranslate = void 0;
exports.find = find;
exports.zipper = exports.slidingWindow = exports.rebind = exports.plotDataLengthBarWidth = exports.path = exports.overlayColors = exports.merge = exports.last = exports.identity = exports.hexToRGBA = exports.head = exports.functor = exports.first = void 0;
var _d3Scale = require("../d3Scale");
var _rebind = require("./rebind");
exports.rebind = _rebind.rebind;
var _merge = _interopRequireDefault(require("./merge"));
exports.merge = _merge.default;
var _slidingWindow = _interopRequireDefault(require("./slidingWindow"));
exports.slidingWindow = _slidingWindow.default;
var _zipper = _interopRequireDefault(require("./zipper"));
exports.zipper = _zipper.default;
var _identity = _interopRequireDefault(require("./identity"));
exports.identity = _identity.default;
var _path = require("./path");
exports.path = _path.path;
var _functor = require("./functor");
exports.functor = _functor.functor;
var _strokeDasharray = require("./strokeDasharray");
Object.keys(_strokeDasharray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _strokeDasharray[key]) return;
  exports[key] = _strokeDasharray[key];
});
var _crCssTranslate = require("./crCssTranslate");
exports.crCssTranslate = _crCssTranslate.crCssTranslate;
const schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
//const defaultColors = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#3F51B5", "#03A9F4", "#9C27B0", "#4CAF50"];

const overlayColors = (0, _d3Scale.scaleOrdinal)(schemeCategory10);

/*
const isDefined = d => d !== null
  && typeof d != "undefined"
*/
exports.overlayColors = overlayColors;
function find(list, predicate, context) {
  if (context === void 0) {
    context = this;
  }
  for (let i = 0; i < list.length; ++i) {
    if (predicate.call(context, list[i], i, list)) {
      return list[i];
    }
  }
  return;
}
const hexToRGBA = (inputHex, opacity) => {
  const hex = inputHex.replace("#", "");
  if (inputHex.indexOf("#") > -1 && (hex.length === 3 || hex.length === 6)) {
    const multiplier = hex.length === 3 ? 1 : 2,
      r = parseInt(hex.substring(0, 1 * multiplier), 16),
      g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16),
      b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16),
      result = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    return result;
  }
  return inputHex;
};
exports.hexToRGBA = hexToRGBA;
const last = (array, accessor) => {
  if (accessor && array) {
    let value;
    for (let i = array.length - 1; i >= 0; i--) {
      value = array[i];
      if (accessor(value) != null) {
        return value;
      }
    }
    return;
  }
  const length = array ? array.length : 0;
  return length ? array[length - 1] : void 0;
};

//CandlestickSeries
exports.last = last;
const head = (array, accessor) => {
  if (accessor && array) {
    let value;
    for (let i = 0; i < array.length; i++) {
      value = array[i];
      if (accessor(value) != null) {
        return value;
      }
    }
    return;
  }
  return array ? array[0] : void 0;
};
exports.head = head;
const first = head;

/**
 * Bar width is based on the amount of items in the plot data and the distance between the first and last of those
 * items.
 * @param props the props passed to the series.
 * @param moreProps an object holding the xScale, xAccessor and plotData.
 * @return {number} the bar width.
 */
exports.first = first;
const plotDataLengthBarWidth = (props, moreProps) => {
  const {
      widthRatio
    } = props,
    {
      xScale
    } = moreProps,
    [l, r] = xScale.range(),
    totalWidth = Math.abs(r - l);
  let width;
  if (xScale.invert != null) {
    const [dl, dr] = xScale.domain();
    width = totalWidth / Math.abs(dl - dr);
  } else {
    width = totalWidth / xScale.domain().length;
  }
  return width * widthRatio;
};
exports.plotDataLengthBarWidth = plotDataLengthBarWidth;
//# sourceMappingURL=index.js.map