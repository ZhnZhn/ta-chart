"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _d3Format = require("d3-format");

var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));

var _GenericChartComponent = require("../core/GenericChartComponent");

var _utils = require("../utils");

var _CL = require("../CL");

var _TooltipText = _interopRequireDefault(require("./TooltipText"));

var _TooltipTSpan = _interopRequireDefault(require("./TooltipTSpan"));

var _jsxRuntime = require("react/jsx-runtime");

var DF_DISPLAY_FORMAT = (0, _d3Format.format)(".2f"),
    DF_DISPLAY_INIT = 'n/a',
    DF_DISPLAY_VALUES_FOR = function DF_DISPLAY_VALUES_FOR(_, props) {
  return props.currentItem;
},
    DF_ORIGIN = [0, 0];

var RSITooltip = function RSITooltip(props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? _CL.CL_TOOLTIP : _props$className,
      _props$displayInit = props.displayInit,
      displayInit = _props$displayInit === void 0 ? DF_DISPLAY_INIT : _props$displayInit,
      _props$displayFormat = props.displayFormat,
      displayFormat = _props$displayFormat === void 0 ? DF_DISPLAY_FORMAT : _props$displayFormat,
      _props$displayValuesF = props.displayValuesFor,
      displayValuesFor = _props$displayValuesF === void 0 ? DF_DISPLAY_VALUES_FOR : _props$displayValuesF,
      _props$origin = props.origin,
      originProp = _props$origin === void 0 ? DF_ORIGIN : _props$origin,
      fontFamily = props.fontFamily,
      fontSize = props.fontSize,
      fontWeight = props.fontWeight,
      yAccessor = props.yAccessor,
      options = props.options,
      labelFill = props.labelFill,
      labelFontWeight = props.labelFontWeight,
      textFill = props.textFill,
      onClick = props.onClick;

  var _renderSvg = (0, _useEventCallback["default"])(function (moreProps) {
    var _moreProps$chartConfi = moreProps.chartConfig,
        width = _moreProps$chartConfi.width,
        height = _moreProps$chartConfi.height,
        currentItem = displayValuesFor(props, moreProps),
        rsi = (0, _utils.isDefined)(currentItem) && yAccessor(currentItem),
        value = rsi && displayFormat(rsi) || displayInit,
        origin = (0, _utils.functor)(originProp),
        _origin = origin(width, height),
        x = _origin[0],
        y = _origin[1],
        tooltipLabel = "RSI (" + options.windowSize + "): ";

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: className,
      transform: "translate(" + x + ", " + y + ")",
      onClick: onClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipText["default"], {
        x: 0,
        y: 0,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipTSpan["default"], {
          fill: labelFill,
          fontWeight: labelFontWeight,
          children: tooltipLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
          fill: textFill,
          children: value
        })]
      })
    });
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
    clip: false,
    svgDraw: _renderSvg,
    drawOn: ['mousemove']
  });
};

var _default = RSITooltip;
exports["default"] = _default;
//# sourceMappingURL=RSITooltip.js.map