"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _StackedBarSeries = _interopRequireDefault(require("./StackedBarSeries"));
var _StackedBarSeriesFn = require("./StackedBarSeriesFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

var mathRound = Math.round,
  mathFloor = Math.floor;
var _getBars = function _getBars(props, moreProps) {
  var baseAt = props.baseAt,
    fill = props.fill,
    stroke = props.stroke,
    yAccessor = props.yAccessor,
    xScale = moreProps.xScale,
    xAccessor = moreProps.xAccessor,
    plotData = moreProps.plotData,
    yScale = moreProps.chartConfig.yScale,
    getBase = (0, _utils.functor)(baseAt),
    widthFunctor = (0, _utils.functor)(props.width),
    width = widthFunctor(props, {
      xScale: xScale,
      xAccessor: xAccessor,
      plotData: plotData
    });
  var offset = mathFloor(0.5 * width),
    bars = plotData.filter(function (d) {
      return (0, _utils.isDefined)(yAccessor(d));
    }).map(function (d, index, _data) {
      var dPrev = _data[index - 1] || d,
        yValue = yAccessor(d),
        x = mathRound(xScale(xAccessor(d))) - offset;
      var y = yScale(yValue),
        h = getBase(xScale, yScale, d) - yScale(yValue);
      if (h < 0) {
        y = y + h;
        h = -h;
      }
      return {
        x: x,
        y: mathRound(y),
        height: mathRound(h),
        width: offset * 2,
        fill: fill(d, dPrev),
        stroke: stroke(d, dPrev)
      };
    });
  return bars;
};
var DRAW_ON = ['pan'];
var BarSeries = function BarSeries(props) {
  var swapScales = props.swapScales,
    clip = props.clip,
    _renderSVG = function _renderSVG(moreProps) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: swapScales ? (0, _StackedBarSeriesFn.svgHelper)(props, moreProps, _StackedBarSeriesFn.identityStack) : (0, _StackedBarSeriesFn.getBarsSVG2)(props, _getBars(props, moreProps))
      });
    },
    _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
      if (swapScales) {
        (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, props, moreProps, _StackedBarSeriesFn.identityStack);
      } else {
        (0, _StackedBarSeriesFn.drawOnCanvas2)(ctx, props, _getBars(props, moreProps));
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
    clip: clip,
    svgDraw: _renderSVG,
    canvasToDraw: _contextFn.getAxisCanvas,
    canvasDraw: _drawOnCanvas,
    drawOn: DRAW_ON
  });
};

/*
BarSeries.propTypes = {
	baseAt: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func,
	]),
	stroke: PropTypes.bool,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func
	]),
	yAccessor: PropTypes.func.isRequired,
	opacity: PropTypes.number,
	fill: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]),
	className: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]),
	clip: PropTypes.bool,
	swapScales: PropTypes.bool,
};
*/

BarSeries.defaultProps = _StackedBarSeries["default"].defaultProps;
var _default = BarSeries;
exports["default"] = _default;
//# sourceMappingURL=BarSeries.js.map