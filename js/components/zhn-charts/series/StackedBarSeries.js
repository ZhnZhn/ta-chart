"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../utils");

var _StackedBarSeriesFn = require("./StackedBarSeriesFn");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var StackedBarSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(StackedBarSeries, _Component);

  function StackedBarSeries() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.drawOnCanvas = function (ctx, moreProps) {
      var xAccessor = moreProps.xAccessor;
      (0, _StackedBarSeriesFn.drawOnCanvasHelper)(ctx, _this.props, moreProps, xAccessor, _d3Shape.stack);
    };

    _this.renderSVG = function (moreProps) {
      var xAccessor = moreProps.xAccessor;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        children: (0, _StackedBarSeriesFn.svgHelper)(_this.props, moreProps, xAccessor, _d3Shape.stack)
      });
    };

    return _this;
  }

  var _proto = StackedBarSeries.prototype;

  _proto.render = function render() {
    var clip = this.props.clip;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      clip: clip,
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: ['pan']
    });
  };

  return StackedBarSeries;
}(_react.Component);
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


StackedBarSeries.defaultProps = {
  baseAt: function baseAt(xScale, yScale
  /* , d*/
  ) {
    return (0, _utils.head)(yScale.range());
  },
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