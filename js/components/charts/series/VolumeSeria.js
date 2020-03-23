"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = _interopRequireDefault(require("../chartFns"));

var C = _chartFns["default"].C,
    timeIntervalBarWidth = _chartFns["default"].timeIntervalBarWidth,
    format = _chartFns["default"].format;

var _fill = function _fill(d, dPrev) {
  return d.close > dPrev.close ? C.UP : C.DOWN;
};

var VolumeSeria = function VolumeSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      timeInterval = _ref.timeInterval,
      timeFormat = _ref.timeFormat;
  return /*#__PURE__*/_react["default"].createElement(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: function yExtents(d) {
      return d.volume;
    },
    origin: function origin(w, h) {
      return [0, h - 140];
    }
  }, /*#__PURE__*/_react["default"].createElement(_Ch["default"].YAxis, {
    axisAt: "left",
    orient: "left",
    ticks: 5,
    tickFormat: format(".0s"),
    stroke: "black"
  }), /*#__PURE__*/_react["default"].createElement(_Ch["default"].MouseCoordinateY, {
    at: "left",
    orient: "left",
    displayFormat: format(".4s")
  }), /*#__PURE__*/_react["default"].createElement(_Ch["default"].BarSeries, {
    width: timeIntervalBarWidth(timeInterval),
    yAccessor: function yAccessor(d) {
      return d.volume;
    },
    fill: _fill,
    stroke: _fill
  }), /*#__PURE__*/_react["default"].createElement(_Ch["default"].XAxis, {
    axisAt: "bottom",
    orient: "bottom",
    ticks: 6
  }), /*#__PURE__*/_react["default"].createElement(_Ch["default"].MouseCoordinateX, {
    at: "bottom",
    orient: "bottom",
    displayFormat: timeFormat
  }));
};

var _default = VolumeSeria;
exports["default"] = _default;
//# sourceMappingURL=VolumeSeria.js.map