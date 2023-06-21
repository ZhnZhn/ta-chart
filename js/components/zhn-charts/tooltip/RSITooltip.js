"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RSITooltip = void 0;
var _d3Format = require("../d3Format");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _utils = require("../utils");
var _CL = require("../CL");
var _TooltipText = _interopRequireDefault(require("./TooltipText"));
var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));
var _jsxRuntime = require("react/jsx-runtime");
const DF_DISPLAY_FORMAT = (0, _d3Format.format)('.2f'),
  DF_DISPLAY_INIT = 'n/a',
  DF_DISPLAY_VALUES_FOR = (_, props) => props.currentItem,
  DF_ORIGIN = [0, 0],
  DRAW_ON = ['mousemove'];
const RSITooltip = props => {
  const {
    className = _CL.CL_TOOLTIP,
    displayInit = DF_DISPLAY_INIT,
    displayFormat = DF_DISPLAY_FORMAT,
    displayValuesFor = DF_DISPLAY_VALUES_FOR,
    origin: originProp = DF_ORIGIN,
    fontFamily,
    fontSize,
    fontWeight,
    yAccessor,
    options,
    labelFill,
    labelFontWeight,
    textFill,
    onClick
  } = props;
  const _renderSvg = moreProps => {
    const {
        chartConfig: {
          width,
          height
        }
      } = moreProps,
      currentItem = displayValuesFor(props, moreProps),
      rsi = currentItem && yAccessor(currentItem),
      value = rsi && displayFormat(rsi) || displayInit,
      origin = (0, _utils.functor)(originProp),
      [x, y] = origin(width, height),
      tooltipLabel = "RSI (" + options.windowSize + "): ";
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: className,
      transform: "translate(" + x + ", " + y + ")",
      onClick: onClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipText.default, {
        x: 0,
        y: 0,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipTSpan.default, {
          fill: labelFill,
          fontWeight: labelFontWeight,
          children: tooltipLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
          fill: textFill,
          children: value
        })]
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: false,
    svgDraw: _renderSvg,
    drawOn: DRAW_ON
  });
};
exports.RSITooltip = RSITooltip;
//# sourceMappingURL=RSITooltip.js.map