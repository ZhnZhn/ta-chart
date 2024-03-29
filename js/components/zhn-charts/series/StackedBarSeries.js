"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _d3Shape = require("../d3Shape");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _StackedBarSeriesFn = require("./StackedBarSeriesFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

var DRAW_ON = ['pan'];
var StackedBarSeries = function StackedBarSeries(props) {
  var _renderSVG = function _renderSVG(moreProps) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: (0, _StackedBarSeriesFn.svgHelper)(props, moreProps, _d3Shape.d3Stack)
      });
    },
    _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
      (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, props, moreProps, _d3Shape.d3Stack);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
    clip: props.clip,
    svgDraw: _renderSVG,
    canvasDraw: _drawOnCanvas,
    canvasToDraw: _contextFn.getAxisCanvas,
    drawOn: DRAW_ON
  });
};

/*
StackedBarSeries.propTypes = {
	baseAt: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func,
	]).isRequired,
	direction: PropTypes.oneOf(["up", "down"]).isRequired,
	stroke: PropTypes.bool.isRequired,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func
	]).isRequired,
	opacity: PropTypes.number.isRequired,
	fill: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	className: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	clip: PropTypes.bool.isRequired,
};
*/

var DF_BASE_AT = function DF_BASE_AT(xScale, yScale) {
  return (0, _utils.head)(yScale.range());
};
StackedBarSeries.defaultProps = {
  baseAt: DF_BASE_AT,
  direction: 'up',
  className: _CL.CL_BAR,
  stroke: true,
  fill: '#4682b4',
  opacity: 0.5,
  width: _utils.plotDataLengthBarWidth,
  widthRatio: 0.8,
  clip: true,
  swapScales: false
};
var _default = StackedBarSeries;
exports["default"] = _default;
//# sourceMappingURL=StackedBarSeries.js.map