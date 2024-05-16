"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _d3Shape = require("../d3Shape");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _StackedBarSeriesFn = require("./StackedBarSeriesFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DRAW_ON = ['pan'];
const StackedBarSeries = props => {
  const _props = (0, _uiApi.getProps)(props, _StackedBarSeriesFn.DF_PROPS),
    _renderSVG = moreProps => /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      children: (0, _StackedBarSeriesFn.svgHelper)(_props, moreProps, _d3Shape.d3Stack)
    }),
    _drawOnCanvas = (ctx, moreProps) => {
      (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, _props, moreProps, _d3Shape.d3Stack);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: _props.clip,
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
var _default = exports.default = StackedBarSeries;
//# sourceMappingURL=StackedBarSeries.js.map