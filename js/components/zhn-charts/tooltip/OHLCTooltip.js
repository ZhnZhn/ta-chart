"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _d3Format = require("d3-format");
var _utils = require("../utils");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _CL = require("../CL");
var _TooltipText = _interopRequireDefault(require("./TooltipText"));
var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));
var _jsxRuntime = require("react/jsx-runtime");
var displayTextsDefault = {
  o: 'O: ',
  h: ' H: ',
  l: ' L: ',
  c: ' C: ',
  na: 'n/a'
};
var TooltipValue = function TooltipValue(_ref) {
  var labelFill = _ref.labelFill,
    labelFontWeight = _ref.labelFontWeight,
    text = _ref.text,
    valueFill = _ref.valueFill,
    value = _ref.value;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipTSpan["default"], {
      fill: labelFill,
      fontWeight: labelFontWeight,
      children: text
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      fill: valueFill,
      children: value
    }, "value_O")]
  });
};
var DRAW_ON = ['mousemove'];
var OHLCTooltip = function OHLCTooltip(props) {
  var _renderSVG = function _renderSVG(moreProps) {
    var _displayValuesFor;
    var accessor = props.accessor,
      changeFormat = props.changeFormat,
      className = props.className,
      displayTexts = props.displayTexts,
      displayValuesFor = props.displayValuesFor,
      fontFamily = props.fontFamily,
      fontSize = props.fontSize,
      fontWeight = props.fontWeight,
      labelFill = props.labelFill,
      labelFontWeight = props.labelFontWeight,
      ohlcFormat = props.ohlcFormat,
      onClick = props.onClick,
      percentFormat = props.percentFormat,
      textFill = props.textFill,
      _moreProps$chartConfi = moreProps.chartConfig,
      width = _moreProps$chartConfi.width,
      height = _moreProps$chartConfi.height,
      fullData = moreProps.fullData,
      currentItem = (_displayValuesFor = displayValuesFor(props, moreProps)) != null ? _displayValuesFor : (0, _utils.last)(fullData),
      na = displayTexts.na;
    var open = na,
      high = na,
      low = na,
      close = na,
      change = na;
    if (currentItem !== undefined && accessor !== undefined) {
      var item = accessor(currentItem);
      if (item !== undefined) {
        open = ohlcFormat(item.open);
        high = ohlcFormat(item.high);
        low = ohlcFormat(item.low);
        close = ohlcFormat(item.close);
        change = changeFormat(item.close - item.open) + " (" + percentFormat((item.close - item.open) / item.open) + ")";
      }
    }
    var originProp = props.origin,
      _functor = (0, _utils.functor)(originProp)(width, height),
      x = _functor[0],
      y = _functor[1],
      valueFill = (0, _utils.functor)(textFill)(currentItem),
      _transform = (0, _utils.crCssTranslate)([x, y]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: className,
      transform: _transform,
      onClick: onClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipText["default"], {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
    clip: false,
    svgDraw: _renderSVG,
    drawOn: DRAW_ON
  });
};
OHLCTooltip.defaultProps = {
  className: _CL.CL_OHLC_TOOLTIP,
  fontFamily: _CL.FONT_FAMILY,
  fontWeight: 'bold',
  accessor: function accessor(d) {
    return d;
  },
  changeFormat: (0, _d3Format.format)('+.2f'),
  displayTexts: displayTextsDefault,
  displayValuesFor: function displayValuesFor(_, props) {
    return props.currentItem;
  },
  ohlcFormat: (0, _d3Format.format)('.2f'),
  origin: [0, 0],
  percentFormat: (0, _d3Format.format)('+.2%')
};
var _default = OHLCTooltip;
exports["default"] = _default;
//# sourceMappingURL=OHLCTooltip.js.map