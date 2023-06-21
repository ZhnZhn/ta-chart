"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.OHLCTooltip = void 0;
var _d3Format = require("../d3Format");
var _utils = require("../utils");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _CL = require("../CL");
var _TooltipText = _interopRequireDefault(require("./TooltipText"));
var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));
var _jsxRuntime = require("react/jsx-runtime");
const displayTextsDefault = {
  o: 'O: ',
  h: ' H: ',
  l: ' L: ',
  c: ' C: ',
  na: 'n/a'
};
const TooltipValue = _ref => {
  let {
    labelFill,
    labelFontWeight,
    text,
    valueFill,
    value
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipTSpan.default, {
      fill: labelFill,
      fontWeight: labelFontWeight,
      children: text
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      fill: valueFill,
      children: value
    }, "value_O")]
  });
};
const DRAW_ON = ['mousemove'];
const OHLCTooltip = props => {
  const _renderSVG = moreProps => {
    var _displayValuesFor;
    const {
        accessor,
        changeFormat,
        className,
        displayTexts,
        displayValuesFor,
        fontFamily,
        fontSize,
        fontWeight,
        labelFill,
        labelFontWeight,
        ohlcFormat,
        onClick,
        percentFormat,
        textFill
      } = props,
      {
        chartConfig: {
          width,
          height
        },
        fullData
      } = moreProps,
      currentItem = (_displayValuesFor = displayValuesFor(props, moreProps)) != null ? _displayValuesFor : (0, _utils.last)(fullData),
      {
        na
      } = displayTexts;
    let open = na,
      high = na,
      low = na,
      close = na,
      change = na;
    if (currentItem !== undefined && accessor !== undefined) {
      const item = accessor(currentItem);
      if (item !== undefined) {
        open = ohlcFormat(item.open);
        high = ohlcFormat(item.high);
        low = ohlcFormat(item.low);
        close = ohlcFormat(item.close);
        change = changeFormat(item.close - item.open) + " (" + percentFormat((item.close - item.open) / item.open) + ")";
      }
    }
    const {
        origin: originProp
      } = props,
      [x, y] = (0, _utils.functor)(originProp)(width, height),
      valueFill = (0, _utils.functor)(textFill)(currentItem),
      _transform = (0, _utils.crCssTranslate)([x, y]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: className,
      transform: _transform,
      onClick: onClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipText.default, {
        x: 0,
        y: 0,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipValue, {
          fill: labelFill,
          fontWeight: labelFontWeight,
          text: displayTexts.o,
          valueFill: valueFill,
          value: open
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipValue, {
          fill: labelFill,
          fontWeight: labelFontWeight,
          text: displayTexts.h,
          valueFill: valueFill,
          value: high
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipValue, {
          fill: labelFill,
          fontWeight: labelFontWeight,
          text: displayTexts.l,
          valueFill: valueFill,
          value: low
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipValue, {
          fill: labelFill,
          fontWeight: labelFontWeight,
          text: displayTexts.c,
          valueFill: valueFill,
          value: close
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
          fill: valueFill,
          children: " " + change
        }, "value_Change")]
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: false,
    svgDraw: _renderSVG,
    drawOn: DRAW_ON
  });
};
exports.OHLCTooltip = OHLCTooltip;
OHLCTooltip.defaultProps = {
  className: _CL.CL_OHLC_TOOLTIP,
  fontFamily: _CL.FONT_FAMILY,
  fontWeight: 'bold',
  accessor: d => d,
  changeFormat: (0, _d3Format.format)('+.2f'),
  displayTexts: displayTextsDefault,
  displayValuesFor: (_, props) => props.currentItem,
  ohlcFormat: (0, _d3Format.format)('.2f'),
  origin: [0, 0],
  percentFormat: (0, _d3Format.format)('+.2%')
};
//# sourceMappingURL=OHLCTooltip.js.map