"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var LS_Y_ACCESSOR = function LS_Y_ACCESSOR(d) {
  return d.close;
};

var CloseChart = function CloseChart(_ref) {
  var id = _ref.id,
      height = _ref.height,
      yExtents = _ref.yExtents,
      origin = _ref.origin;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: yExtents,
    origin: origin,
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

var _default = CloseChart;
exports["default"] = _default;
//# sourceMappingURL=CloseChart.js.map