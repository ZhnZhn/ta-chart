"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("react");

var _Ch = _interopRequireDefault(require("./Ch"));

var _chartFns = require("./chartFns");

var _CandleSeria = _interopRequireDefault(require("./series/CandleSeria"));

var _VolumeSeria = _interopRequireDefault(require("./series/VolumeSeria"));

var _RsiSeria = _interopRequireDefault(require("./series/RsiSeria"));

var _CloseSeria = _interopRequireDefault(require("./series/CloseSeria"));

var _jsxRuntime = require("react/jsx-runtime");

var sma = _Ch["default"].sma,
    rsi = _Ch["default"].rsi,
    bollingerBand = _Ch["default"].bollingerBand,
    useElementWidth = _Ch["default"].useElementWidth;
var ITEMS_NUM = 150;
var MARGIN = {
  left: 50,
  right: 80,
  //top: 10,
  top: 0,
  bottom: 30
};
var S_EL = {
  width: '98%'
};

var _xAccessor = function _xAccessor(d) {
  return d ? d.date : 0;
};

var HollowChart = function HollowChart(_ref) {
  var id = _ref.id,
      style = _ref.style,
      data = _ref.data,
      height = _ref.height,
      timeframe = _ref.timeframe;

  var _useElementWidth = useElementWidth({
    id: id
  }),
      width = _useElementWidth[0],
      sma20 = sma().options({
    windowSize: 20,
    stroke: 'green'
  }).merge(function (d, c) {
    d.sma20 = c;
  }).accessor(function (d) {
    return d.sma20;
  }),
      sma50 = sma().options({
    windowSize: 50,
    stroke: 'orange'
  }).merge(function (d, c) {
    d.sma50 = c;
  }).accessor(function (d) {
    return d.sma50;
  }),
      bb = bollingerBand().merge(function (d, c) {
    d.bb = c;
  }).accessor(function (d) {
    return d.bb;
  }),
      rsi14 = rsi().options({
    windowSize: 14
  }).merge(function (d, c) {
    d.rsi = c;
  }).accessor(function (d) {
    return d.rsi;
  }),
      calculatedData = sma50(sma20(bb(rsi14(data)))),
      timeInterval = (0, _chartFns.crTimeInterval)(timeframe),
      timeFormat = (0, _chartFns.crTimeFormat)(timeframe),
      xExtents = (0, _chartFns.crExtends)(calculatedData, timeframe, ITEMS_NUM);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: id,
    style: (0, _extends2["default"])({}, S_EL, style),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].ChartCanvas, {
      ratio: 2,
      width: width,
      height: height,
      margin: MARGIN,
      seriesName: "Item",
      data: calculatedData,
      xAccessor: _xAccessor,
      displayXAccessor: _xAccessor,
      xScale: (0, _chartFns.scaleTime)(),
      xExtents: xExtents,
      children: [(0, _RsiSeria["default"])({
        id: 1,
        height: 100,
        width: width,
        rsi: rsi14
      }), (0, _CloseSeria["default"])({
        id: 2,
        height: 100
      }), (0, _CandleSeria["default"])({
        id: 3,
        height: 300,
        timeInterval: timeInterval,
        timeFormat: timeFormat,
        sma20: sma20,
        sma50: sma50,
        bb: bb
      }), (0, _VolumeSeria["default"])({
        id: 4,
        height: 120,
        timeInterval: timeInterval,
        timeFormat: timeFormat
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].CrossHairCursor, {})]
    })
  });
};

var _default = /*#__PURE__*/(0, _react.memo)(HollowChart);

exports["default"] = _default;
//# sourceMappingURL=HollowChart.js.map