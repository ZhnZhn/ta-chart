"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _d3Shape = require("../d3Shape");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const mathRound = Math.round;
const _crAreaSeries = (base, defined, xAccessor, yAccessor, xScale, yScale, moreProps) => (0, _d3Shape.d3Area)().defined(d => defined(yAccessor(d))).x(d => mathRound(xScale(xAccessor(d)))).y0(d => (0, _utils.functor)(base)(yScale, d, moreProps)).y1(d => mathRound(yScale(yAccessor(d))));
const DRAW_ON = ['pan'];
const AreaOnlySeries = props => {
  const {
      yAccessor,
      defined,
      base,
      style,
      className,
      stroke,
      fill,
      opacity,
      interpolation,
      canvasGradient,
      canvasClip
    } = props,
    _renderSVG = moreProps => {
      const {
          plotData,
          xScale,
          xAccessor,
          chartConfig: {
            yScale
          }
        } = moreProps,
        areaSeries = _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps);
      if (interpolation != null) {
        areaSeries.curve(interpolation);
      }
      const d = areaSeries(plotData),
        _className = (0, _crCn.default)(className, stroke == null && _CL.CL_LINE_STROKE);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        className: _className,
        style: style,
        stroke: stroke,
        fill: (0, _utils.hexToRGBA)(fill, opacity),
        d: d
      });
    },
    _drawOnCanvas = (ctx, moreProps) => {
      const {
        xScale,
        plotData,
        xAccessor,
        chartConfig: {
          yScale
        }
      } = moreProps;
      if (canvasClip) {
        ctx.save();
        canvasClip(ctx, moreProps);
      }
      ctx.fillStyle = canvasGradient == null ? (0, _utils.hexToRGBA)(fill, opacity) : canvasGradient(moreProps, ctx);
      ctx.strokeStyle = stroke;
      ctx.beginPath();
      const areaSeries = _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps).context(ctx);
      if (interpolation != null) {
        areaSeries.curve(interpolation);
      }
      areaSeries(plotData);
      ctx.fill();
      if (canvasClip) {
        ctx.restore();
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
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

const DF_DEFINED = d => !isNaN(d),
  DF_BASE = yScale => (0, _utils.first)(yScale.range());
AreaOnlySeries.defaultProps = {
  className: _CL.CL_LINE,
  fill: 'none',
  opacity: 1,
  defined: DF_DEFINED,
  base: DF_BASE
};
var _default = AreaOnlySeries;
exports.default = _default;
//# sourceMappingURL=AreaOnlySeries.js.map