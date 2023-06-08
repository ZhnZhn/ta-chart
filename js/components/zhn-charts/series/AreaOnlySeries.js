"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _d3Shape = require("../d3Shape");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

var mathRound = Math.round;
var _crAreaSeries = function _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps) {
  return (0, _d3Shape.d3Area)().defined(function (d) {
    return defined(yAccessor(d));
  }).x(function (d) {
    return mathRound(xScale(xAccessor(d)));
  }).y0(function (d) {
    return (0, _utils.functor)(base)(yScale, d, moreProps);
  }).y1(function (d) {
    return mathRound(yScale(yAccessor(d)));
  });
};
var DRAW_ON = ['pan'];
var AreaOnlySeries = function AreaOnlySeries(props) {
  var yAccessor = props.yAccessor,
    defined = props.defined,
    base = props.base,
    style = props.style,
    className = props.className,
    stroke = props.stroke,
    fill = props.fill,
    opacity = props.opacity,
    interpolation = props.interpolation,
    canvasGradient = props.canvasGradient,
    canvasClip = props.canvasClip,
    _renderSVG = function _renderSVG(moreProps) {
      var plotData = moreProps.plotData,
        xScale = moreProps.xScale,
        xAccessor = moreProps.xAccessor,
        yScale = moreProps.chartConfig.yScale,
        areaSeries = _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps);
      if (interpolation != null) {
        areaSeries.curve(interpolation);
      }
      var d = areaSeries(plotData),
        newClassName = className.concat(stroke != null ? '' : " " + _CL.CL_LINE_STROKE);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        className: newClassName,
        style: style,
        stroke: stroke,
        fill: (0, _utils.hexToRGBA)(fill, opacity),
        d: d
      });
    },
    _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
      var xScale = moreProps.xScale,
        plotData = moreProps.plotData,
        xAccessor = moreProps.xAccessor,
        yScale = moreProps.chartConfig.yScale;
      if (canvasClip) {
        ctx.save();
        canvasClip(ctx, moreProps);
      }
      ctx.fillStyle = canvasGradient != null ? canvasGradient(moreProps, ctx) : (0, _utils.hexToRGBA)(fill, opacity);
      ctx.strokeStyle = stroke;
      ctx.beginPath();
      var areaSeries = _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps).context(ctx);
      if (interpolation != null) {
        areaSeries.curve(interpolation);
      }
      areaSeries(plotData);
      ctx.fill();
      if (canvasClip) {
        ctx.restore();
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
    svgDraw: _renderSVG,
    canvasDraw: _drawOnCanvas,
    canvasToDraw: _contextFn.getAxisCanvas,
    drawOn: DRAW_ON
  });
};

/*
AreaOnlySeries.propTypes = {
	className: PropTypes.string,
	yAccessor: PropTypes.func.isRequired,
	stroke: PropTypes.string,
	fill: PropTypes.string,
	opacity: PropTypes.number,
	defined: PropTypes.func,
	base: PropTypes.oneOfType([
		PropTypes.func, PropTypes.number
	]),
	interpolation: PropTypes.func,
	canvasClip: PropTypes.func,
	style: PropTypes.object,
	canvasGradient: PropTypes.func
};
*/

var DF_DEFINED = function DF_DEFINED(d) {
    return !isNaN(d);
  },
  DF_BASE = function DF_BASE(yScale) {
    return (0, _utils.first)(yScale.range());
  };
AreaOnlySeries.defaultProps = {
  className: _CL.CL_LINE,
  fill: 'none',
  opacity: 1,
  defined: DF_DEFINED,
  base: DF_BASE
};
var _default = AreaOnlySeries;
exports["default"] = _default;
//# sourceMappingURL=AreaOnlySeries.js.map