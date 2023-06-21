"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Ch = require("../Ch");
var _chartFns = require("../chartFns");
var _jsxRuntime = require("react/jsx-runtime");
const LS_Y_ACCESSOR = d => d.close;
const CloseChart = _ref => {
  let {
    id,
    height,
    yExtents,
    origin
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch.Chart, {
    id: id,
    height: height,
    yExtents: yExtents,
    origin: origin,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.YAxis, {
      axisAt: "left",
      orient: "left",
      stroke: "black",
      ticks: 5
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.LineSeries, {
      yAccessor: LS_Y_ACCESSOR,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MouseCoordinateY, {
      at: "left",
      orient: "left",
      displayFormat: _chartFns.numberFormat2F
    })]
  });
};
var _default = CloseChart;
exports.default = _default;
//# sourceMappingURL=CloseChart.js.map