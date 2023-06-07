"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _StackedBarSeries = _interopRequireDefault(require("./StackedBarSeries"));
var _StackedBarSeriesFn = require("./StackedBarSeriesFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

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
  var offset = Math.floor(0.5 * width),
    bars = plotData.filter(function (d) {
      return (0, _utils.isDefined)(yAccessor(d));
    }).map(function (d, index, _data) {
      var dPrev = _data[index - 1] || d,
        yValue = yAccessor(d),
        x = Math.round(xScale(xAccessor(d))) - offset;
      var y = yScale(yValue),
        h = getBase(xScale, yScale, d) - yScale(yValue);
      if (h < 0) {
        y = y + h;
        h = -h;
      }
      return {
        x: x,
        y: Math.round(y),
        height: Math.round(h),
        width: offset * 2,
        fill: fill(d, dPrev),
        stroke: stroke(d, dPrev)
      };
    });
  return bars;
};
var DRAW_ON = ['pan'];
var BarSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BarSeries, _Component);
  function BarSeries() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.drawOnCanvas = function (ctx, moreProps) {
      var props = _this.props;
      if (props.swapScales) {
        (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, props, moreProps, _StackedBarSeriesFn.identityStack);
      } else {
        (0, _StackedBarSeriesFn.drawOnCanvas2)(props, ctx, _getBars(props, moreProps));
      }
    };
    _this.renderSVG = function (moreProps) {
      var props = _this.props;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: props.swapScales ? (0, _StackedBarSeriesFn.svgHelper)(props, moreProps, _StackedBarSeriesFn.identityStack) : (0, _StackedBarSeriesFn.getBarsSVG2)(props, _getBars(props, moreProps))
      });
    };
    return _this;
  }
  var _proto = BarSeries.prototype;
  _proto.render = function render() {
    var clip = this.props.clip;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
      clip: clip,
      svgDraw: this.renderSVG,
      canvasToDraw: _contextFn.getAxisCanvas,
      canvasDraw: this.drawOnCanvas,
      drawOn: DRAW_ON
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
exports["default"] = _default;
//# sourceMappingURL=BarSeries.js.map