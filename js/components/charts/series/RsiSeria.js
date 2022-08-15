"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../../uiApi");

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var CL_TOOLTIP = 'rs-tooltip';
var _rsiStroke = {
  line: '#000000',
  top: '#b8b2bb',
  middle: 'transparent',
  bottom: '#b8c2cc',
  outsideThreshold: '#b300b3',
  insideThreshold: '#4699cb'
};

var CHART_Y_EXTENDS = [0, 100],
    CHART_ORIGIN = function CHART_ORIGIN(w, h) {
  return [0, h - 510];
},
    YAXIS_TICK_VALUES = [30, 50, 70],
    RSI_Y_ACCESOR = function RSI_Y_ACCESOR(d) {
  return d.rsi;
};

var RsiSeria = function RsiSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      width = _ref.width,
      rsi = _ref.rsi;

  var _rsiTooltipOrigin = (0, _uiApi.useMemo)(function () {
    return [width - 160, 10];
  }, [width]),
      _rsiOptions = (0, _uiApi.useMemo)(function () {
    return rsi.options();
  }, [rsi]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: CHART_Y_EXTENDS,
    origin: CHART_ORIGIN,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "right",
      orient: "right",
      stroke: "black",
      tickStroke: "#4699cb",
      tickValues: YAXIS_TICK_VALUES
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: _chartFns.numberFormat2F
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].RSISeries, {
      yAccessor: RSI_Y_ACCESOR,
      stroke: _rsiStroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].RSITooltip, {
      className: CL_TOOLTIP,
      fontSize: 15,
      yAccessor: RSI_Y_ACCESOR,
      origin: _rsiTooltipOrigin,
      options: _rsiOptions
    })]
  });
};

var _default = RsiSeria;
exports["default"] = _default;
//# sourceMappingURL=RsiSeria.js.map