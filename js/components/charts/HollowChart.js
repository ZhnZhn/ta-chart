"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _Ch = _interopRequireDefault(require("./Ch"));

var _chartFns = require("./chartFns");

var _CandlestickChart = _interopRequireDefault(require("./series/CandlestickChart"));

var _VolumeChart = _interopRequireDefault(require("./series/VolumeChart"));

var _RsiChart = _interopRequireDefault(require("./series/RsiChart"));

var _CloseChart = _interopRequireDefault(require("./series/CloseChart"));

var _jsxRuntime = require("react/jsx-runtime");

var sma = _Ch["default"].sma,
    rsi = _Ch["default"].rsi,
    bollingerBand = _Ch["default"].bollingerBand,
    useElementWidth = _Ch["default"].useElementWidth;
var INITIAL_ITEMS_NUMBER = 150;
var MARGIN = {
  left: 50,
  right: 80,
  top: 0,
  bottom: 30
};
var S_EL = {
  width: '98%'
};

var _xAccessor = function _xAccessor(d) {
  return d ? d.date : 0;
};

var CHART_CANVAS_X_SCALE = (0, _chartFns.scaleTime)();

var CS_ORIGIN = function CS_ORIGIN(w, h) {
  return [0, h - 510];
};

var RSI_Y_EXTENDS = [0, 100];

var OHLC_Y_EXTENDS = function OHLC_Y_EXTENDS(d) {
  return [d.high, d.low];
},
    OHLC_ORIGIN = function OHLC_ORIGIN(w, h) {
  return [0, h - 420];
};

var VOLUME_Y_EXTENDS = function VOLUME_Y_EXTENDS(d) {
  return d.volume;
},
    VOLUME_ORIGIN = function VOLUME_ORIGIN(w, h) {
  return [0, h - 120];
};

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
}); //Math.round(width/12.5)

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
      _refItemsMumber = (0, _uiApi.useRef)(INITIAL_ITEMS_NUMBER),
      calculatedData = (0, _uiApi.useMemo)(function () {
    return sma50(sma20(bb(rsi14(data))));
  }, [data]),
      _useMemo = (0, _uiApi.useMemo)(function () {
    return [(0, _chartFns.crTimeInterval)(timeframe), (0, _chartFns.crTimeFormat)(timeframe)];
  }, [timeframe]),
      timeInterval = _useMemo[0],
      timeFormat = _useMemo[1],
      xExtents = (0, _uiApi.useMemo)(function () {
    return (0, _chartFns.crExtends)(calculatedData, timeframe, (0, _uiApi.getRefValue)(_refItemsMumber));
  }, [calculatedData, timeframe]),
      onZoom = (0, _uiApi.useMemo)(function () {
    return function (itemsNumber) {
      _refItemsMumber.current = itemsNumber;
    };
  }, []);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: id,
    style: (0, _extends2["default"])({}, S_EL, style),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].ChartCanvas, {
      ratio: 2,
      width: width,
      height: height,
      margin: MARGIN,
      data: calculatedData,
      xAccessor: _xAccessor,
      displayXAccessor: _xAccessor,
      xScale: CHART_CANVAS_X_SCALE,
      xExtents: xExtents,
      onZoom: onZoom,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RsiChart["default"], {
        id: 1,
        height: 100,
        width: width,
        rsi: rsi14,
        yExtents: RSI_Y_EXTENDS,
        origin: CS_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseChart["default"], {
        id: 2,
        height: 100,
        yExtents: OHLC_Y_EXTENDS,
        origin: CS_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CandlestickChart["default"], {
        id: 3,
        height: 300,
        timeInterval: timeInterval,
        timeFormat: timeFormat,
        sma20: sma20,
        sma50: sma50,
        bb: bb,
        yExtents: OHLC_Y_EXTENDS,
        origin: OHLC_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VolumeChart["default"], {
        id: 4,
        height: 100,
        timeInterval: timeInterval,
        timeFormat: timeFormat,
        yExtents: VOLUME_Y_EXTENDS,
        origin: VOLUME_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].CrossHairCursor, {})]
    })
  });
};

var _default = (0, _uiApi.memo)(HollowChart);

exports["default"] = _default;
//# sourceMappingURL=HollowChart.js.map