"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var CL_TOOLTIP = 'rs-tooltip';

var _stroke = function _stroke(d, dPrev) {
  return (d || {}).close > (dPrev || {}).close ? _chartFns.COLOR.UP : _chartFns.COLOR.DOWN;
};

var _fill = function _fill(d, dPrev) {
  return (d || {}).close > (d || {}).open ? _chartFns.COLOR.TRANSPARENT : _stroke(d, dPrev);
};

var bbStroke = {
  top: '#964b00',
  middle: '#000000',
  bottom: '#964b00'
};
var bbFill = '#4682b4';

var _crMaTooltipOption = function _crMaTooltipOption(accessor, options) {
  return {
    type: 'SMA',
    yAccessor: accessor,
    stroke: options.stroke,
    windowSize: options.windowSize
  };
};

var CandleSeria = function CandleSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      timeInterval = _ref.timeInterval,
      timeFormat = _ref.timeFormat,
      sma20 = _ref.sma20,
      sma50 = _ref.sma50,
      bb = _ref.bb;
  var accessorSma20 = sma20.accessor(),
      optionsSma20 = sma20.options(),
      accessorSma50 = sma50.accessor(),
      optionsSma50 = sma50.options();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: function yExtents(d) {
      return [d.high, d.low];
    },
    origin: function origin(w, h) {
      return [0, h - 420];
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "right",
      orient: "right",
      ticks: 5,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].BollingerSeries, {
      yAccessor: function yAccessor(d) {
        return d.bb;
      },
      stroke: bbStroke,
      fill: bbFill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: accessorSma20,
      stroke: optionsSma20.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: accessorSma50,
      stroke: optionsSma50.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].CandlestickSeries, {
      width: (0, _chartFns.timeIntervalBarWidth)(timeInterval),
      fill: _fill,
      stroke: _stroke,
      wickStroke: _stroke,
      candleStrokeWidth: 0.8
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: _chartFns.numberFormat4F
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].OHLCTooltip, {
      fontSize: 15,
      xDisplayFormat: timeFormat,
      textFill: "black",
      ohlcFormat: _chartFns.numberFormat8Trim,
      forChart: 3,
      origin: [5, -90]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MovingAverageTooltip, {
      className: CL_TOOLTIP,
      width: 100,
      fontSize: 15,
      origin: [5, 320],
      options: [_crMaTooltipOption(accessorSma20, optionsSma20), _crMaTooltipOption(accessorSma50, optionsSma50)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].BollingerBandTooltip, {
      className: CL_TOOLTIP,
      fontSize: 15,
      origin: [190, 440],
      yAccessor: function yAccessor(d) {
        return d.bb;
      },
      options: bb.options()
    })]
  });
};

var _default = CandleSeria;
exports["default"] = _default;
//# sourceMappingURL=CandleSeria.js.map