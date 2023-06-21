"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Ch = require("../Ch");
var _chartFns = require("../chartFns");
var _useTimeIntervalBarWidth = _interopRequireDefault(require("./useTimeIntervalBarWidth"));
var _jsxRuntime = require("react/jsx-runtime");
const _fill = (d, dPrev) => (d || {}).close > (dPrev || {}).close ? _chartFns.COLOR.UP : _chartFns.COLOR.DOWN;
const BS_Y_ACCESOR = d => d.volume;
const VolumeChart = _ref => {
  let {
    id,
    height,
    timeInterval,
    timeFormat,
    yExtents,
    origin
  } = _ref;
  const _bsWidth = (0, _useTimeIntervalBarWidth.default)(timeInterval);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch.Chart, {
    id: id,
    height: height,
    yExtents: yExtents,
    origin: origin,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.YAxis, {
      axisAt: "left",
      orient: "left",
      ticks: 3,
      tickFormat: _chartFns.numberFormat0S,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MouseCoordinateY, {
      at: "left",
      orient: "left",
      displayFormat: _chartFns.numberFormat4S
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.BarSeries, {
      width: _bsWidth,
      yAccessor: BS_Y_ACCESOR,
      fill: _fill,
      stroke: _fill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.XAxis, {
      axisAt: "bottom",
      orient: "bottom",
      ticks: 6
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MouseCoordinateX, {
      at: "bottom",
      orient: "bottom",
      displayFormat: timeFormat
    })]
  });
};
var _default = VolumeChart;
exports.default = _default;
//# sourceMappingURL=VolumeChart.js.map