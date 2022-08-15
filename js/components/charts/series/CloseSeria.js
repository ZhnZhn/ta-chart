"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var CHART_Y_EXTENDS = function CHART_Y_EXTENDS(d) {
  return [d.high, d.low];
},
    CHART_ORIGIN = function CHART_ORIGIN(w, h) {
  return [0, h - 510];
},
    LS_Y_ACCESSOR = function LS_Y_ACCESSOR(d) {
  return d.close;
};

var CloseSeria = function CloseSeria(_ref) {
  var id = _ref.id,
      height = _ref.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: CHART_Y_EXTENDS,
    origin: CHART_ORIGIN,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "left",
      orient: "left",
      stroke: "black",
      ticks: 5
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: LS_Y_ACCESSOR,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "left",
      orient: "left",
      displayFormat: _chartFns.numberFormat2F
    })]
  });
};

var _default = CloseSeria;
exports["default"] = _default;
//# sourceMappingURL=CloseSeria.js.map