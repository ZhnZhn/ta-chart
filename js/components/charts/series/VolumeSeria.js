"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var _fill = function _fill(d, dPrev) {
  return (d || {}).close > (dPrev || {}).close ? _chartFns.COLOR.UP : _chartFns.COLOR.DOWN;
};

var VolumeSeria = function VolumeSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      timeInterval = _ref.timeInterval,
      timeFormat = _ref.timeFormat;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: function yExtents(d) {
      return d.volume;
    },
    origin: function origin(w, h) {
      return [0, h - 140];
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "left",
      orient: "left",
      ticks: 5,
      tickFormat: _chartFns.numberFormat0S,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "left",
      orient: "left",
      displayFormat: _chartFns.numberFormat4S
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].BarSeries, {
      width: (0, _chartFns.timeIntervalBarWidth)(timeInterval),
      yAccessor: function yAccessor(d) {
        return d.volume;
      },
      fill: _fill,
      stroke: _fill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].XAxis, {
      axisAt: "bottom",
      orient: "bottom",
      ticks: 6
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateX, {
      at: "bottom",
      orient: "bottom",
      displayFormat: timeFormat
    })]
  });
};

var _default = VolumeSeria;
exports["default"] = _default;
//# sourceMappingURL=VolumeSeria.js.map