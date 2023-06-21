"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _has = require("../../has");
var _Ch = require("../Ch");
var _chartFns = require("../chartFns");
var _useTimeIntervalBarWidth = _interopRequireDefault(require("./useTimeIntervalBarWidth"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_TOOLTIP = 'rs-tooltip';
const _stroke = (d, dPrev) => (d || {}).close > (dPrev || {}).close ? _chartFns.COLOR.UP : _chartFns.COLOR.DOWN;
const _fill = (d, dPrev) => (d || {}).close > (d || {}).open ? _chartFns.COLOR.TRANSPARENT : _stroke(d, dPrev);
const bbStroke = {
  top: '#964b00',
  middle: '#000000',
  bottom: '#964b00'
};
const bbFill = '#4682b4';
const _crMaTooltipOption = (accessor, options) => ({
  type: 'SMA',
  yAccessor: accessor,
  stroke: options.stroke,
  windowSize: options.windowSize
});
const OHLC_TOOLTIP_ORIGIN = [5, -90],
  MA_TOOLTIP_ORIGIN = [5, 320],
  BB_TOOLTIP_ORIGIN = [190, 432] //440
  ,
  BB_Y_ACCESSOR = d => d.bb;
const CandlestickChart = _ref => {
  let {
    id,
    height,
    timeInterval,
    timeFormat,
    sma20,
    sma50,
    bb,
    yExtents,
    origin
  } = _ref;
  const _csWidth = (0, _useTimeIntervalBarWidth.default)(timeInterval),
    [accessorSma20, optionsSma20] = (0, _uiApi.useMemo)(() => [sma20.accessor(), sma20.options()], [sma20]),
    [accessorSma50, optionsSma50] = (0, _uiApi.useMemo)(() => [sma50.accessor(), sma50.options()], [sma50]),
    _maTooltipOption = (0, _uiApi.useMemo)(() => [_crMaTooltipOption(accessorSma20, optionsSma20), _crMaTooltipOption(accessorSma50, optionsSma50)], [accessorSma20, optionsSma20, accessorSma50, optionsSma50]),
    _bbTooltipOptions = (0, _uiApi.useMemo)(() => bb.options(), [bb]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch.Chart, {
    id: id,
    height: height,
    yExtents: yExtents,
    origin: origin,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.YAxis, {
      axisAt: "right",
      orient: "right",
      ticks: 5,
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.BollingerSeries, {
      yAccessor: BB_Y_ACCESSOR,
      stroke: bbStroke,
      fill: bbFill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.LineSeries, {
      yAccessor: accessorSma20,
      stroke: optionsSma20.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.LineSeries, {
      yAccessor: accessorSma50,
      stroke: optionsSma50.stroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.CandlestickSeries, {
      width: _csWidth,
      fill: _fill,
      stroke: _stroke,
      wickStroke: _stroke,
      candleStrokeWidth: 0.8
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: _chartFns.numberFormat4F
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.OHLCTooltip, {
      fontSize: 15,
      xDisplayFormat: timeFormat,
      textFill: "black",
      ohlcFormat: _chartFns.numberFormat8Trim,
      forChart: 3,
      origin: OHLC_TOOLTIP_ORIGIN
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MovingAverageTooltip, {
      className: CL_TOOLTIP,
      width: 100,
      fontSize: 15,
      origin: MA_TOOLTIP_ORIGIN,
      options: _maTooltipOption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.BollingerBandTooltip, {
      className: CL_TOOLTIP,
      fontSize: 15,
      origin: BB_TOOLTIP_ORIGIN,
      yAccessor: BB_Y_ACCESSOR,
      options: _bbTooltipOptions
    }), _has.HAS_TOUCH && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.ZoomButtons, {})]
  });
};
var _default = CandlestickChart;
exports.default = _default;
//# sourceMappingURL=CandlestickChart.js.map