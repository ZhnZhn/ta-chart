"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var AreaOnlySeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AreaOnlySeries, _Component);

  function AreaOnlySeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = AreaOnlySeries.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    var _this$props = this.props,
        yAccessor = _this$props.yAccessor,
        defined = _this$props.defined,
        base = _this$props.base,
        canvasGradient = _this$props.canvasGradient;
    var _this$props2 = this.props,
        fill = _this$props2.fill,
        stroke = _this$props2.stroke,
        opacity = _this$props2.opacity,
        interpolation = _this$props2.interpolation,
        canvasClip = _this$props2.canvasClip;
    var xScale = moreProps.xScale,
        yScale = moreProps.chartConfig.yScale,
        plotData = moreProps.plotData,
        xAccessor = moreProps.xAccessor;

    if (canvasClip) {
      ctx.save();
      canvasClip(ctx, moreProps);
    }

    if (canvasGradient != null) {
      ctx.fillStyle = canvasGradient(moreProps, ctx);
    } else {
      ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
    }

    ctx.strokeStyle = stroke;
    ctx.beginPath();
    var newBase = (0, _utils.functor)(base);
    var areaSeries = (0, _d3Shape.area)().defined(function (d) {
      return defined(yAccessor(d));
    }).x(function (d) {
      return Math.round(xScale(xAccessor(d)));
    }).y0(function (d) {
      return newBase(yScale, d, moreProps);
    }).y1(function (d) {
      return Math.round(yScale(yAccessor(d)));
    }).context(ctx);

    if ((0, _utils.isDefined)(interpolation)) {
      areaSeries.curve(interpolation);
    }

    areaSeries(plotData);
    ctx.fill();

    if (canvasClip) {
      ctx.restore();
    }
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var _this$props3 = this.props,
        yAccessor = _this$props3.yAccessor,
        defined = _this$props3.defined,
        base = _this$props3.base,
        style = _this$props3.style;
    var _this$props4 = this.props,
        stroke = _this$props4.stroke,
        fill = _this$props4.fill,
        className = _this$props4.className,
        opacity = _this$props4.opacity,
        interpolation = _this$props4.interpolation;
    var xScale = moreProps.xScale,
        yScale = moreProps.chartConfig.yScale,
        plotData = moreProps.plotData,
        xAccessor = moreProps.xAccessor;
    var newBase = (0, _utils.functor)(base);
    var areaSeries = (0, _d3Shape.area)().defined(function (d) {
      return defined(yAccessor(d));
    }).x(function (d) {
      return Math.round(xScale(xAccessor(d)));
    }).y0(function (d) {
      return newBase(yScale, d, moreProps);
    }).y1(function (d) {
      return Math.round(yScale(yAccessor(d)));
    });

    if ((0, _utils.isDefined)(interpolation)) {
      areaSeries.curve(interpolation);
    }

    var d = areaSeries(plotData);
    var newClassName = className.concat((0, _utils.isDefined)(stroke) ? "" : " line-stroke");
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      style: style,
      d: d,
      stroke: stroke,
      fill: (0, _utils.hexToRGBA)(fill, opacity),
      className: newClassName
    });
  };

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: ["pan"]
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
	canvasGradient: PropTypes.func,
};
*/


AreaOnlySeries.defaultProps = {
  className: "line ",
  fill: "none",
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