"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _utils = require("../utils");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var _getLineDash = function _getLineDash(strokeDasharray) {
  return (0, _utils.getStrokeDasharray)(strokeDasharray).split(",");
};

var _getValueFromScale = function _getValueFromScale(scale, value) {
  return Math.round(scale(value));
};

var _getLineCoordinates = function _getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height) {
  return type === "horizontal" ? {
    x1: 0,
    y1: _getValueFromScale(yScale, yValue),
    x2: width,
    y2: _getValueFromScale(yScale, yValue)
  } : {
    x1: _getValueFromScale(xScale, xValue),
    y1: 0,
    x2: _getValueFromScale(xScale, xValue),
    y2: height
  };
};

var StraightLine = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(StraightLine, _Component);

  function StraightLine() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.renderSVG = function (moreProps) {
      var _this$props = _this.props,
          type = _this$props.type,
          className = _this$props.className,
          opacity = _this$props.opacity,
          stroke = _this$props.stroke,
          strokeWidth = _this$props.strokeWidth,
          strokeDasharray = _this$props.strokeDasharray,
          yValue = _this$props.yValue,
          xValue = _this$props.xValue,
          width = moreProps.width,
          height = moreProps.height,
          xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          lineCoordinates = _getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height);

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({
        className: className,
        strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
        stroke: stroke,
        strokeWidth: strokeWidth,
        strokeOpacity: opacity
      }, lineCoordinates));
    };

    _this.drawOnCanvas = function (ctx, moreProps) {
      var _this$props2 = _this.props,
          type = _this$props2.type,
          opacity = _this$props2.opacity,
          stroke = _this$props2.stroke,
          strokeWidth = _this$props2.strokeWidth,
          strokeDasharray = _this$props2.strokeDasharray,
          yValue = _this$props2.yValue,
          xValue = _this$props2.xValue,
          xScale = moreProps.xScale,
          _moreProps$chartConfi = moreProps.chartConfig,
          yScale = _moreProps$chartConfi.yScale,
          width = _moreProps$chartConfi.width,
          height = _moreProps$chartConfi.height,
          _getLineCoordinates2 = _getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height),
          x1 = _getLineCoordinates2.x1,
          y1 = _getLineCoordinates2.y1,
          x2 = _getLineCoordinates2.x2,
          y2 = _getLineCoordinates2.y2;

      ctx.beginPath();
      ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, opacity);
      ctx.lineWidth = strokeWidth;
      ctx.setLineDash(_getLineDash(strokeDasharray));
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    return _this;
  }

  var _proto = StraightLine.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: ["pan"]
    });
  };

  return StraightLine;
}(_react.Component);
/*
StraightLine.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(["vertical", "horizontal"]),
	stroke: PropTypes.string,
	strokeWidth: PropTypes.number,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),
	opacity: PropTypes.number.isRequired,
	yValue: function(props, propName// , componentName ) {
		if (props.type === "vertical" && isDefined(props[propName])) return new Error("Do not define `yValue` when type is `vertical`, define the `xValue` prop");
		if (props.type === "horizontal" && isNotDefined(props[propName])) return new Error("when type = `horizontal` `yValue` is required");
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `yValue` accepts a number");
	},
	xValue: function(props, propName// , componentName ) {
		if (props.type === "horizontal" && isDefined(props[propName])) return new Error("Do not define `xValue` when type is `horizontal`, define the `yValue` prop");
		if (props.type === "vertical" && isNotDefined(props[propName])) return new Error("when type = `vertical` `xValue` is required");
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `xValue` accepts a number");
	},
};
*/


StraightLine.defaultProps = {
  type: 'horizontal',
  className: _CL.CL_LINE,
  opacity: 0.5,
  stroke: '#000000',
  strokeWidth: 1,
  strokeDasharray: 'Solid'
};
var _default = StraightLine;
exports["default"] = _default;
//# sourceMappingURL=StraightLine.js.map