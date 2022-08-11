"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));

var _contextFn = require("../core/contextFn");

var _utils = require("../utils");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var _crAreaSeries = function _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps) {
  var newBase = (0, _utils.functor)(base);
  return (0, _d3Shape.area)().defined(function (d) {
    return defined(yAccessor(d));
  }).x(function (d) {
    return Math.round(xScale(xAccessor(d)));
  }).y0(function (d) {
    return newBase(yScale, d, moreProps);
  }).y1(function (d) {
    return Math.round(yScale(yAccessor(d)));
  });
};

var DRAW_ON = ['pan'];

var AreaOnlySeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AreaOnlySeries, _Component);

  function AreaOnlySeries() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.drawOnCanvas = function (ctx, moreProps) {
      var _this$props = _this.props,
          yAccessor = _this$props.yAccessor,
          defined = _this$props.defined,
          base = _this$props.base,
          canvasGradient = _this$props.canvasGradient,
          fill = _this$props.fill,
          stroke = _this$props.stroke,
          opacity = _this$props.opacity,
          interpolation = _this$props.interpolation,
          canvasClip = _this$props.canvasClip,
          xScale = moreProps.xScale,
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

      if ((0, _utils.isDefined)(interpolation)) {
        areaSeries.curve(interpolation);
      }

      areaSeries(plotData);
      ctx.fill();

      if (canvasClip) {
        ctx.restore();
      }
    };

    _this.renderSVG = function (moreProps) {
      var _this$props2 = _this.props,
          yAccessor = _this$props2.yAccessor,
          defined = _this$props2.defined,
          base = _this$props2.base,
          style = _this$props2.style,
          className = _this$props2.className,
          stroke = _this$props2.stroke,
          fill = _this$props2.fill,
          opacity = _this$props2.opacity,
          interpolation = _this$props2.interpolation,
          plotData = moreProps.plotData,
          xScale = moreProps.xScale,
          xAccessor = moreProps.xAccessor,
          yScale = moreProps.chartConfig.yScale,
          areaSeries = _crAreaSeries(base, defined, xAccessor, yAccessor, xScale, yScale, moreProps);

      if ((0, _utils.isDefined)(interpolation)) {
        areaSeries.curve(interpolation);
      }

      var d = areaSeries(plotData),
          newClassName = className.concat((0, _utils.isDefined)(stroke) ? '' : " " + _CL.CL_LINE_STROKE);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        className: newClassName,
        style: style,
        stroke: stroke,
        fill: (0, _utils.hexToRGBA)(fill, opacity),
        d: d
      });
    };

    return _this;
  }

  var _proto = AreaOnlySeries.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: DRAW_ON
    });
  };

  return AreaOnlySeries;
}(_react.Component);
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


AreaOnlySeries.defaultProps = {
  className: _CL.CL_LINE,
  fill: 'none',
  opacity: 1,
  defined: function defined(d) {
    return !isNaN(d);
  },
  base: function base(yScale
  /* , d, moreProps */
  ) {
    return (0, _utils.first)(yScale.range());
  }
};
var _default = AreaOnlySeries;
exports["default"] = _default;
//# sourceMappingURL=AreaOnlySeries.js.map