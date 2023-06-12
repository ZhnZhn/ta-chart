"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _d3Format = require("../d3Format");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _utils = require("../utils");
var _CL = require("../CL");
var _MovingAverage = _interopRequireDefault(require("./MovingAverage"));
var _jsxRuntime = require("react/jsx-runtime");
const DRAW_ON = ['mousemove'];
const MovingAverageTooltip = props => {
  const _renderSVG = moreProps => {
    var _displayValuesFor;
    const {
        chartId,
        chartConfig,
        chartConfig: {
          height
        },
        fullData
      } = moreProps,
      {
        className,
        displayInit,
        onClick,
        width,
        fontFamily,
        fontSize,
        fontWeight,
        textFill,
        labelFill,
        origin: originProp,
        displayFormat,
        displayValuesFor,
        options
      } = props,
      currentItem = (_displayValuesFor = displayValuesFor(props, moreProps)) != null ? _displayValuesFor : (0, _utils.last)(fullData),
      origin = (0, _utils.functor)(originProp),
      [x, y] = origin(width, height),
      [ox, oy] = chartConfig.origin,
      _transform = (0, _utils.crCssTranslate)([ox + x, oy + y]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transform,
      className: className,
      children: options.map((each, idx) => {
        const yValue = currentItem && each.yAccessor(currentItem),
          tooltipLabel = each.type + " (" + each.windowSize + ")",
          yDisplayValue = yValue ? displayFormat(yValue) : displayInit;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MovingAverage.default, {
          origin: [width * idx, 0],
          color: each.stroke,
          displayName: tooltipLabel,
          value: yDisplayValue,
          options: each,
          forChart: chartId,
          onClick: onClick,
          fontFamily: fontFamily,
          fontSize: fontSize,
          fontWeight: fontWeight,
          textFill: textFill,
          labelFill: labelFill
        }, idx);
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: false,
    svgDraw: _renderSVG,
    drawOn: DRAW_ON
  });
};
MovingAverageTooltip.defaultProps = {
  className: _CL.CL_MA_TOOLTIP,
  displayFormat: (0, _d3Format.format)('.2f'),
  displayInit: 'n/a',
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 10],
  width: 65
};
var _default = MovingAverageTooltip;
exports.default = _default;
//# sourceMappingURL=MovingAverageTooltip.js.map