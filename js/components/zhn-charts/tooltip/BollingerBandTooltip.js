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

var BollingerBandTooltip = function BollingerBandTooltip(props) {
  var _renderSVG = (0, _useEventCallback["default"])(function (moreProps) {
    var _displayValuesFor;

    var onClick = props.onClick,
        displayFormat = props.displayFormat,
        yAccessor = props.yAccessor,
        options = props.options,
        originProp = props.origin,
        textFill = props.textFill,
        labelFill = props.labelFill,
        labelFontWeight = props.labelFontWeight,
        className = props.className,
        displayValuesFor = props.displayValuesFor,
        displayInit = props.displayInit,
        fontFamily = props.fontFamily,
        fontSize = props.fontSize,
        fontWeight = props.fontWeight,
        _moreProps$chartConfi = moreProps.chartConfig,
        width = _moreProps$chartConfi.width,
        height = _moreProps$chartConfi.height,
        fullData = moreProps.fullData,
        currentItem = (_displayValuesFor = displayValuesFor(props, moreProps)) != null ? _displayValuesFor : (0, _utils.last)(fullData);
    var top = displayInit,
        middle = displayInit,
        bottom = displayInit;

    if (currentItem !== undefined) {
      var item = yAccessor(currentItem);

      if (item !== undefined) {
        top = displayFormat(item.top);
        middle = displayFormat(item.middle);
        bottom = displayFormat(item.bottom);
      }
    }

    var origin = (0, _utils.functor)(originProp),
        _origin = origin(width, height),
        x = _origin[0],
        y = _origin[1],
        sourcePath = options.sourcePath,
        windowSize = options.windowSize,
        multiplier = options.multiplier,
        movingAverageType = options.movingAverageType,
        tooltipLabel = "BB(" + sourcePath + ", " + windowSize + ", " + multiplier + ", " + movingAverageType + "): ",
        tooltipValue = top + ", " + middle + ", " + bottom,
        _transform = (0, _utils.crCssTranslate)([x, y]);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transform,
      className: className,
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
          children: tooltipValue
        })]
      })
    });
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
    clip: false,
    svgDraw: _renderSVG,
    drawOn: ["mousemove"]
  });
};

BollingerBandTooltip.defaultProps = {
  className: _CL.CL_BB_TOOLTIP,
  displayFormat: (0, _d3Format.format)(".2f"),
  displayValuesFor: function displayValuesFor(_, props) {
    return props.currentItem;
  },
  displayInit: "n/a",
  origin: [8, 8],
  yAccessor: function yAccessor(data) {
    return data.bb;
  }
};
var _default = BollingerBandTooltip;
exports["default"] = _default;
//# sourceMappingURL=BollingerBandTooltip.js.map