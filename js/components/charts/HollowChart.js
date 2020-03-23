"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Ch = _interopRequireDefault(require("./Ch"));

var _chartFns = _interopRequireDefault(require("./chartFns"));

var _CandleSeria = _interopRequireDefault(require("./series/CandleSeria"));

var _VolumeSeria = _interopRequireDefault(require("./series/VolumeSeria"));

var _RsiSeria = _interopRequireDefault(require("./series/RsiSeria"));

var _CloseSeria = _interopRequireDefault(require("./series/CloseSeria"));

var sma = _Ch["default"].sma,
    rsi = _Ch["default"].rsi,
    bollingerBand = _Ch["default"].bollingerBand,
    fitWidth = _Ch["default"].fitWidth;
var scaleTime = _chartFns["default"].scaleTime,
    crTimeInterval = _chartFns["default"].crTimeInterval,
    crTimeFormat = _chartFns["default"].crTimeFormat,
    crExtends = _chartFns["default"].crExtends;
var ITEMS_NUM = 150;
var MARGIN = {
  left: 50,
  right: 80,
  //top: 10,
  top: 0,
  bottom: 30
};
var S = {
  EL: {
    width: '98%'
  }
};

var _xAccessor = function _xAccessor(d) {
  return d ? d.date : 0;
};

var HollowChart = function HollowChart(props) {
  var id = props.id,
      style = props.style,
      data = props.data,
      width = props.width,
      resize = props.resize,
      timeframe = props.timeframe;
  var sma20 = sma().options({
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
  });
  var calculatedData = sma50(sma20(bb(rsi14(data))));
  /*
  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor(d => d.date);
  const {
  data: calcData,
  xScale,
  xAccessor,
  displayXAccessor,
  } = xScaleProvider(calculatedData);
  */

  (0, _react.useEffect)(function () {
    resize();
  }, []);
  var timeInterval = crTimeInterval(timeframe),
      timeFormat = crTimeFormat(timeframe),
      xExtents = crExtends(calculatedData, timeframe, ITEMS_NUM);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    style: (0, _extends2["default"])({}, S.EL, {}, style)
  }, /*#__PURE__*/_react["default"].createElement(_Ch["default"].ChartCanvas, {
    ratio: 2,
    width: width,
    height: 550,
    margin: MARGIN,
    type: "hybrid",
    seriesName: "Item",
    data: calculatedData,
    xAccessor: _xAccessor,
    xScale: scaleTime(),
    xExtents: xExtents
  }, (0, _RsiSeria["default"])({
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
  }), /*#__PURE__*/_react["default"].createElement(_Ch["default"].CrossHairCursor, null)));
};

var _default = fitWidth(_react["default"].memo(HollowChart));

exports["default"] = _default;
//# sourceMappingURL=HollowChart.js.map