"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = require("../chartFns");

var _jsxRuntime = require("react/jsx-runtime");

var CL_TOOLTIP = 'rs-tooltip';

var FN_NOOP = function FN_NOOP() {};

var _rsiStroke = {
  line: '#000000',
  top: '#b8b2bb',
  middle: 'transparent',
  bottom: '#b8c2cc',
  outsideThreshold: '#b300b3',
  insideThreshold: '#4699cb'
};

var RsiSeria = function RsiSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      width = _ref.width,
      rsi = _ref.rsi;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: [0, 100],
    origin: function origin(w, h) {
      return [0, h - 510];
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "right",
      orient: "right",
      stroke: "black",
      tickStroke: "#4699cb",
      tickValues: [30, 50, 70]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: _chartFns.numberFormat2F
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].RSISeries, {
      yAccessor: function yAccessor(d) {
        return d.rsi;
      },
      stroke: _rsiStroke
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].RSITooltip, {
      className: CL_TOOLTIP,
      origin: [width - 160, 10],
      fontSize: 15,
      yAccessor: function yAccessor(d) {
        return d.rsi;
      },
      options: rsi.options(),
      onClick: FN_NOOP
    })]
  });
};

var _default = RsiSeria;
exports["default"] = _default;
//# sourceMappingURL=RsiSeria.js.map