"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _d3Format = require("../d3Format");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _utils = require("../utils");
var _CL = require("../CL");
var _TooltipText = _interopRequireDefault(require("./TooltipText"));
var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));
var _jsxRuntime = require("react/jsx-runtime");
const DRAW_ON = ['mousemove'];
const BollingerBandTooltip = props => {
  const _renderSVG = moreProps => {
    var _displayValuesFor;
    const {
        onClick,
        displayFormat,
        yAccessor,
        options,
        origin: originProp,
        textFill,
        labelFill,
        labelFontWeight,
        className,
        displayValuesFor,
        displayInit,
        fontFamily,
        fontSize,
        fontWeight
      } = props,
      {
        chartConfig: {
          width,
          height
        },
        fullData
      } = moreProps,
      currentItem = (_displayValuesFor = displayValuesFor(props, moreProps)) != null ? _displayValuesFor : (0, _utils.last)(fullData);
    let top = displayInit,
      middle = displayInit,
      bottom = displayInit;
    if (currentItem !== undefined) {
      const item = yAccessor(currentItem);
      if (item !== undefined) {
        top = displayFormat(item.top);
        middle = displayFormat(item.middle);
        bottom = displayFormat(item.bottom);
      }
    }
    const origin = (0, _utils.functor)(originProp),
      [x, y] = origin(width, height),
      {
        sourcePath,
        windowSize,
        multiplier,
        movingAverageType
      } = options,
      tooltipLabel = "BB(" + sourcePath + ", " + windowSize + ", " + multiplier + ", " + movingAverageType + ")",
      tooltipValue = top + ", " + middle + ", " + bottom,
      _transform = (0, _utils.crCssTranslate)([x, y]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transform,
      className: className,
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
          x: 0,
          dy: 15,
          fill: textFill,
          children: tooltipValue
        })]
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: false,
    svgDraw: _renderSVG,
    drawOn: DRAW_ON
  });
};
BollingerBandTooltip.defaultProps = {
  className: _CL.CL_BB_TOOLTIP,
  displayFormat: (0, _d3Format.format)('.2f'),
  displayValuesFor: (_, props) => props.currentItem,
  displayInit: 'n/a',
  origin: [8, 8],
  yAccessor: data => data.bb
};
var _default = BollingerBandTooltip;
exports.default = _default;
//# sourceMappingURL=BollingerBandTooltip.js.map