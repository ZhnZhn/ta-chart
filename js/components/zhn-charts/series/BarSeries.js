"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _StackedBarSeries = _interopRequireWildcard(require("./StackedBarSeries"));

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import PropTypes from "prop-types";
var BarSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BarSeries, _Component);

  function BarSeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = BarSeries.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    if (this.props.swapScales) {
      var xAccessor = moreProps.xAccessor;
      (0, _StackedBarSeries.drawOnCanvasHelper)(ctx, this.props, moreProps, xAccessor, _StackedBarSeries.identityStack);
    } else {
      var bars = getBars(this.props, moreProps);
      (0, _StackedBarSeries.drawOnCanvas2)(this.props, ctx, bars);
    }
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    if (this.props.swapScales) {
      var xAccessor = moreProps.xAccessor;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: (0, _StackedBarSeries.svgHelper)(this.props, moreProps, xAccessor, _StackedBarSeries.identityStack)
      });
    } else {
      var bars = getBars(this.props, moreProps);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: (0, _StackedBarSeries.getBarsSVG2)(this.props, bars)
      });
    }
  };

  _proto.render = function render() {
    var clip = this.props.clip;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      clip: clip,
      svgDraw: this.renderSVG,
      canvasToDraw: _contextFn.getAxisCanvas,
      canvasDraw: this.drawOnCanvas,
      drawOn: ["pan"]
    });
  };

  return BarSeries;
}(_react.Component);
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
/*
 Initially, this program was using StackedBarSeries.getBars
 to benefit from code reuse and having a single place that
 contains the logic for drawing all types of bar charts
 simple, grouped, horizontal, but turnes out
 making it highly cuztimizable also made it slow for the
 most simple case, a regular bar chart.
 This function contains just the necessary logic
 to create bars
*/

exports["default"] = _default;

function getBars(props, moreProps) {
  var baseAt = props.baseAt,
      fill = props.fill,
      stroke = props.stroke,
      yAccessor = props.yAccessor;
  var xScale = moreProps.xScale,
      xAccessor = moreProps.xAccessor,
      plotData = moreProps.plotData,
      yScale = moreProps.chartConfig.yScale; //const getFill = functor(fill);

  var getBase = (0, _utils.functor)(baseAt);
  var widthFunctor = (0, _utils.functor)(props.width);
  var width = widthFunctor(props, {
    xScale: xScale,
    xAccessor: xAccessor,
    plotData: plotData
  });
  /*
  const barWidth = Math.round(width);
  const offset = Math.round(barWidth === 1 ? 0 : 0.5 * barWidth);
  */

  var offset = Math.floor(0.5 * width);
  var bars = plotData.filter(function (d) {
    return (0, _utils.isDefined)(yAccessor(d));
  }).map(function (d, index, _data) {
    var dPrev = _data[index - 1] || d;
    var yValue = yAccessor(d);
    var y = yScale(yValue);
    var x = Math.round(xScale(xAccessor(d))) - offset;
    var h = getBase(xScale, yScale, d) - yScale(yValue);

    if (h < 0) {
      y = y + h;
      h = -h;
    }

    return {
      // type: "line"
      x: x,
      y: Math.round(y),
      height: Math.round(h),
      width: offset * 2,
      fill: fill(d, dPrev),
      stroke: stroke(d, dPrev) //fill: getFill(d, 0),
      //stroke: stroke ? getFill(d, 0) : "none",

    };
  });
  return bars;
}
//# sourceMappingURL=BarSeries.js.map