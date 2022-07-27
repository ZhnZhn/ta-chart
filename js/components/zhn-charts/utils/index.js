"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.zipper = exports.slidingWindow = exports.rebind = exports.path = exports.overlayColors = exports.merge = exports.identity = exports.functor = void 0;

var _d3Scale = require("d3-scale");

var _rebind = require("./rebind");

exports.rebind = _rebind.rebind;

var _merge = _interopRequireDefault(require("./merge"));

exports.merge = _merge["default"];

var _slidingWindow = _interopRequireDefault(require("./slidingWindow"));

exports.slidingWindow = _slidingWindow["default"];

var _zipper = _interopRequireDefault(require("./zipper"));

exports.zipper = _zipper["default"];

var _identity = _interopRequireDefault(require("./identity"));

exports.identity = _identity["default"];

var _path = require("./path");

exports.path = _path.path;

var _functor = require("./functor");

exports.functor = _functor.functor;
var schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]; //const defaultColors = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#3F51B5", "#03A9F4", "#9C27B0", "#4CAF50"];

var overlayColors = (0, _d3Scale.scaleOrdinal)(schemeCategory10);
exports.overlayColors = overlayColors;
//# sourceMappingURL=index.js.map