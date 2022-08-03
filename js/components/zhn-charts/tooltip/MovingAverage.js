"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../../uiApi");

var _TooltipText = _interopRequireDefault(require("./TooltipText"));

var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

var MovingAverage = function MovingAverage(_ref) {
  var color = _ref.color,
      displayName = _ref.displayName,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily,
      fontWeight = _ref.fontWeight,
      textFill = _ref.textFill,
      labelFill = _ref.labelFill,
      labelFontWeight = _ref.labelFontWeight,
      value = _ref.value,
      origin = _ref.origin,
      onClick = _ref.onClick,
      forChart = _ref.forChart,
      options = _ref.options;

  var _onClick = (0, _uiApi.useCallback)(function (event) {
    if (onClick !== undefined) {
      onClick(event, (0, _extends2["default"])({
        chartId: forChart
      }, options));
    }
  }, [onClick, forChart, options]),
      translate = (0, _utils.crCssTranslate)(origin);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    transform: translate,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: 0,
      y1: 2,
      x2: 0,
      y2: 28,
      stroke: color,
      strokeWidth: 4
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipText["default"], {
      x: 5,
      y: 11,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipTSpan["default"], {
        fill: labelFill,
        fontWeight: labelFontWeight,
        children: displayName
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
        x: 5,
        dy: 15,
        fill: textFill,
        children: value
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: 0,
      y: 0,
      width: 55,
      height: 30,
      fill: "none",
      stroke: "none",
      onClick: _onClick
    })]
  });
};

var _default = MovingAverage;
exports["default"] = _default;
//# sourceMappingURL=MovingAverage.js.map