"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../../uiApi");

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

var CHART_Y_EXTENDS = function CHART_Y_EXTENDS(d) {
  return [d.high, d.low];
},
    CHART_ORIGIN = function CHART_ORIGIN(w, h) {
  return [0, h - 420];
},
    OHCL_TOOLTIP_ORIGIN = [5, -90],
    MA_TOOLTIP_ORIGIN = [5, 320],
    BB_TOOLTIP_ORIGIN = [190, 440],
    BB_Y_ACCESSOR = function BB_Y_ACCESSOR(d) {
  return d.bb;
};

var CandleSeria = function CandleSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      timeInterval = _ref.timeInterval,
      timeFormat = _ref.timeFormat,
      sma20 = _ref.sma20,
      sma50 = _ref.sma50,
      bb = _ref.bb;

  var _csWidth = (0, _uiApi.useMemo)(function () {
    return (0, _chartFns.timeIntervalBarWidth)(timeInterval);
  }, [timeInterval]),
      _useMemo = (0, _uiApi.useMemo)(function () {
    return [sma20.accessor(), sma20.options()];
  }, [sma20]),
      accessorSma20 = _useMemo[0],
      optionsSma20 = _useMemo[1],
      _useMemo2 = (0, _uiApi.useMemo)(function () {
    return [sma50.accessor(), sma50.options()];
  }, [sma50]),
      accessorSma50 = _useMemo2[0],
      optionsSma50 = _useMemo2[1],
      _maTooltipOption = (0, _uiApi.useMemo)(function () {
    return [_crMaTooltipOption(accessorSma20, optionsSma20), _crMaTooltipOption(accessorSma50, optionsSma50)];
  }, [accessorSma20, optionsSma20, accessorSma50, optionsSma50]),
      _bbTooltipOptions = (0, _uiApi.useMemo)(function () {
    return bb.options();
  }, [bb]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: CHART_Y_EXTENDS,
    origin: CHART_ORIGIN,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "right",
      orient: "right",
      ticks: 5,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].BollingerSeries, {
      yAccessor: BB_Y_ACCESSOR,
      stroke: bbStroke,
      fill: bbFill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: accessorSma20,
      stroke: optionsSma20.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: accessorSma50,
      stroke: optionsSma50.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].CandlestickSeries, {
      width: _csWidth,
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
      origin: OHCL_TOOLTIP_ORIGIN
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MovingAverageTooltip, {
      className: CL_TOOLTIP,
      width: 100,
      fontSize: 15,
      origin: MA_TOOLTIP_ORIGIN,
      options: _maTooltipOption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].BollingerBandTooltip, {
      className: CL_TOOLTIP,
      fontSize: 15,
      origin: BB_TOOLTIP_ORIGIN,
      yAccessor: BB_Y_ACCESSOR,
      options: _bbTooltipOptions
    })]
  });
};

var _default = CandleSeria;
exports["default"] = _default;
//# sourceMappingURL=CandleSeria.js.map