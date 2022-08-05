"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _utils = require("../utils");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var StraightLine = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(StraightLine, _Component);

  function StraightLine(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = StraightLine.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    var _this$props = this.props,
        type = _this$props.type,
        stroke = _this$props.stroke,
        strokeWidth = _this$props.strokeWidth,
        opacity = _this$props.opacity,
        strokeDasharray = _this$props.strokeDasharray;
    var _this$props2 = this.props,
        yValue = _this$props2.yValue,
        xValue = _this$props2.xValue;
    var xScale = moreProps.xScale;
    var _moreProps$chartConfi = moreProps.chartConfig,
        yScale = _moreProps$chartConfi.yScale,
        width = _moreProps$chartConfi.width,
        height = _moreProps$chartConfi.height;
    ctx.beginPath();
    ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, opacity);
    ctx.lineWidth = strokeWidth;

    var _getLineCoordinates = getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height),
        x1 = _getLineCoordinates.x1,
        y1 = _getLineCoordinates.y1,
        x2 = _getLineCoordinates.x2,
        y2 = _getLineCoordinates.y2;

    ctx.setLineDash((0, _utils.getStrokeDasharray)(strokeDasharray).split(","));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: ["pan"]
    });
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var width = moreProps.width,
        height = moreProps.height;
    var xScale = moreProps.xScale,
        yScale = moreProps.chartConfig.yScale;
    var className = this.props.className;
    var _this$props3 = this.props,
        type = _this$props3.type,
        stroke = _this$props3.stroke,
        strokeWidth = _this$props3.strokeWidth,
        opacity = _this$props3.opacity,
        strokeDasharray = _this$props3.strokeDasharray;
    var _this$props4 = this.props,
        yValue = _this$props4.yValue,
        xValue = _this$props4.xValue;
    var lineCoordinates = getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({
      className: className,
      strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeOpacity: opacity
    }, lineCoordinates));
  };

  return StraightLine;
}(_react.Component);

function getLineCoordinates(type, xScale, yScale, xValue, yValue, width, height) {
  return type === "horizontal" ? {
    x1: 0,
    y1: Math.round(yScale(yValue)),
    x2: width,
    y2: Math.round(yScale(yValue))
  } : {
    x1: Math.round(xScale(xValue)),
    y1: 0,
    x2: Math.round(xScale(xValue)),
    y2: height
  };
}
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
  className: "line ",
  type: "horizontal",
  stroke: "#000000",
  opacity: 0.5,
  strokeWidth: 1,
  strokeDasharray: "Solid"
};
var _default = StraightLine;
exports["default"] = _default;
//# sourceMappingURL=StraightLine.js.map