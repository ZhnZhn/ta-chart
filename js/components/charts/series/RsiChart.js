"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _Ch = require("../Ch");
var _chartFns = require("../chartFns");
var _jsxRuntime = require("react/jsx-runtime");
const CL_TOOLTIP = 'rs-tooltip';
const _rsiStroke = {
  line: '#000000',
  top: '#b8b2bb',
  middle: 'transparent',
  bottom: '#b8c2cc',
  outsideThreshold: '#b300b3',
  insideThreshold: '#4699cb'
};
const YAXIS_TICK_VALUES = [30, 50, 70],
  RSI_Y_ACCESOR = d => d.rsi;
const RsiChart = _ref => {
  let {
    id,
    height,
    width,
    rsi,
    yExtents,
    origin
  } = _ref;
  const _rsiTooltipOrigin = (0, _uiApi.useMemo)(() => [width - 160, 10], [width]),
    _rsiOptions = (0, _uiApi.useMemo)(() => rsi.options(), [rsi]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch.Chart, {
    id: id,
    height: height,
    yExtents: yExtents,
    origin: origin,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.YAxis, {
      axisAt: "right",
      orient: "right",
      stroke: "black",
      tickStroke: "#4699cb",
      tickValues: YAXIS_TICK_VALUES
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: _chartFns.numberFormat2F
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.RSISeries, {
      yAccessor: RSI_Y_ACCESOR,
      stroke: _rsiStroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch.RSITooltip, {
      className: CL_TOOLTIP,
      fontSize: 15,
      yAccessor: RSI_Y_ACCESOR,
      origin: _rsiTooltipOrigin,
      options: _rsiOptions
    })]
  });
};
var _default = RsiChart;
exports.default = _default;
//# sourceMappingURL=RsiChart.js.map