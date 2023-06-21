"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Ch = _interopRequireDefault(require("./Ch"));
var _chartFns = require("./chartFns");
var _CandlestickChart = _interopRequireDefault(require("./series/CandlestickChart"));
var _VolumeChart = _interopRequireDefault(require("./series/VolumeChart"));
var _RsiChart = _interopRequireDefault(require("./series/RsiChart"));
var _CloseChart = _interopRequireDefault(require("./series/CloseChart"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  sma,
  rsi,
  bollingerBand,
  useElementWidth
} = _Ch.default;
const INITIAL_ITEMS_NUMBER = 150;
const MARGIN = {
  left: 50,
  right: 80,
  top: 0,
  bottom: 30
};
const S_EL = {
  width: '98%'
};
const _xAccessor = d => d ? d.date : 0;
const CHART_CANVAS_X_SCALE = (0, _chartFns.scaleTime)();
const CS_ORIGIN = (w, h) => [0, h - 510];
const RSI_Y_EXTENDS = [0, 100];
const OHLC_Y_EXTENDS = d => [d.high, d.low],
  OHLC_ORIGIN = (w, h) => [0, h - 420];
const VOLUME_Y_EXTENDS = d => d.volume,
  VOLUME_ORIGIN = (w, h) => [0, h - 120];
const _fSma = (propName, windowSize, stroke) => sma().options({
  windowSize,
  stroke
}).merge((d, c) => {
  d[propName] = c;
}).accessor(d => d[propName]);
const bb = bollingerBand().merge((d, c) => {
    d.bb = c;
  }).accessor(d => d.bb),
  rsi14 = rsi().options({
    windowSize: 14
  }).merge((d, c) => {
    d.rsi = c;
  }).accessor(d => d.rsi);
const HollowChart = _ref => {
  let {
    id,
    style,
    data,
    height,
    timeframe
  } = _ref;
  const [width] = useElementWidth({
      id
    }),
    _refItemsMumber = (0, _uiApi.useRef)(INITIAL_ITEMS_NUMBER),
    [smaPeriod1] = (0, _uiApi.useState)(20),
    [smaPeriod2] = (0, _uiApi.useState)(50),
    sma20 = (0, _uiApi.useMemo)(() => _fSma('sma20', smaPeriod1, 'green'), [smaPeriod1]),
    sma50 = (0, _uiApi.useMemo)(() => _fSma('sma50', smaPeriod2, 'orange'), [smaPeriod2]),
    calculatedData = (0, _uiApi.useMemo)(() => sma50(sma20(bb(rsi14(data)))), [data, sma20, sma50]),
    [timeInterval, timeFormat] = (0, _uiApi.useMemo)(() => [(0, _chartFns.crTimeInterval)(timeframe), (0, _chartFns.crTimeFormat)(timeframe)], [timeframe]),
    xExtents = (0, _uiApi.useMemo)(() => (0, _chartFns.crExtends)(calculatedData, timeframe, (0, _uiApi.getRefValue)(_refItemsMumber)), [calculatedData, timeframe]),
    onZoom = (0, _uiApi.useMemo)(() => itemsNumber => {
      _refItemsMumber.current = itemsNumber;
    }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: id,
    style: {
      ...S_EL,
      ...style
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch.default.ChartCanvas, {
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RsiChart.default, {
        id: 1,
        height: 100,
        width: width,
        rsi: rsi14,
        yExtents: RSI_Y_EXTENDS,
        origin: CS_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseChart.default, {
        id: 2,
        height: 100,
        yExtents: OHLC_Y_EXTENDS,
        origin: CS_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CandlestickChart.default, {
        id: 3,
        height: 300,
        timeInterval: timeInterval,
        timeFormat: timeFormat,
        sma20: sma20,
        sma50: sma50,
        bb: bb,
        yExtents: OHLC_Y_EXTENDS,
        origin: OHLC_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VolumeChart.default, {
        id: 4,
        height: 100,
        timeInterval: timeInterval,
        timeFormat: timeFormat,
        yExtents: VOLUME_Y_EXTENDS,
        origin: VOLUME_ORIGIN
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.default.CrossHairCursor, {})]
    })
  });
};
var _default = (0, _uiApi.memo)(HollowChart);
exports.default = _default;
//# sourceMappingURL=HollowChart.js.map