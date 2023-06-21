"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BarSeries = void 0;
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _StackedBarSeries = _interopRequireDefault(require("./StackedBarSeries"));
var _StackedBarSeriesFn = require("./StackedBarSeriesFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const mathRound = Math.round,
  mathFloor = Math.floor;
const _getBars = (props, moreProps) => {
  const {
      baseAt,
      fill,
      stroke,
      yAccessor
    } = props,
    {
      xScale,
      xAccessor,
      plotData,
      chartConfig: {
        yScale
      }
    } = moreProps,
    getBase = (0, _utils.functor)(baseAt),
    widthFunctor = (0, _utils.functor)(props.width),
    width = widthFunctor(props, {
      xScale,
      xAccessor,
      plotData
    });
  const offset = mathFloor(0.5 * width),
    bars = plotData.filter(d => yAccessor(d) != null).map((d, index, _data) => {
      const dPrev = _data[index - 1] || d,
        yValue = yAccessor(d),
        x = mathRound(xScale(xAccessor(d))) - offset;
      let y = yScale(yValue),
        h = getBase(xScale, yScale, d) - yScale(yValue);
      if (h < 0) {
        y = y + h;
        h = -h;
      }
      return {
        x,
        y: mathRound(y),
        height: mathRound(h),
        width: offset * 2,
        fill: fill(d, dPrev),
        stroke: stroke(d, dPrev)
      };
    });
  return bars;
};
const DRAW_ON = ['pan'];
const BarSeries = props => {
  const {
      swapScales,
      clip
    } = props,
    _renderSVG = moreProps => /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      children: swapScales ? (0, _StackedBarSeriesFn.svgHelper)(props, moreProps, _StackedBarSeriesFn.identityStack) : (0, _StackedBarSeriesFn.getBarsSVG2)(props, _getBars(props, moreProps))
    }),
    _drawOnCanvas = (ctx, moreProps) => {
      if (swapScales) {
        (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, props, moreProps, _StackedBarSeriesFn.identityStack);
      } else {
        (0, _StackedBarSeriesFn.drawOnCanvas2)(ctx, props, _getBars(props, moreProps));
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
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
exports.BarSeries = BarSeries;
BarSeries.defaultProps = _StackedBarSeries.default.defaultProps;
//# sourceMappingURL=BarSeries.js.map