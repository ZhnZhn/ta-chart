"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));

var _contextFn = require("../core/contextFn");

var _CL = require("../CL");

var _utils = require("../utils");

var _CandlestickSeriesFn = require("./CandlestickSeriesFn");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var DRAW_ON = ['pan'];

var CandlestickSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CandlestickSeries, _Component);

  function CandlestickSeries() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.drawOnCanvas = function (ctx, moreProps) {
      (0, _CandlestickSeriesFn.drawOnCanvas)(ctx, _this.props, moreProps);
    };

    _this.renderSVG = function (moreProps) {
      var _this$props = _this.props,
          className = _this$props.className,
          wickClassName = _this$props.wickClassName,
          candleClassName = _this$props.candleClassName,
          xAccessor = moreProps.xAccessor,
          xScale = moreProps.xScale,
          plotData = moreProps.plotData,
          yScale = moreProps.chartConfig.yScale,
          candleData = (0, _CandlestickSeriesFn.getCandleData)(_this.props, xAccessor, xScale, yScale, plotData);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        className: className,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          className: wickClassName,
          children: (0, _CandlestickSeriesFn.getWicksSVG)(candleData)
        }, "wicks"), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          className: candleClassName,
          children: (0, _CandlestickSeriesFn.getCandlesSVG)(_this.props, candleData)
        }, "candles")]
      });
    };

    return _this;
  }

  var _proto = CandlestickSeries.prototype;

  _proto.render = function render() {
    var clip = this.props.clip;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
      clip: clip,
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: DRAW_ON
    });
  };

  return CandlestickSeries;
}(_react.Component);
/*
CandlestickSeries.propTypes = {
	className: PropTypes.string,
	wickClassName: PropTypes.string,
	candleClassName: PropTypes.string,
	widthRatio: PropTypes.number,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func
	]),
	classNames: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string
	]),
	fill: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string
	]),
	stroke: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string
	]),
	wickStroke: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string
	]),
	yAccessor: PropTypes.func,
	clip: PropTypes.bool,
};
*/


CandlestickSeries.defaultProps = {
  className: _CL.CL_CANDLESTICK,
  wickClassName: _CL.CL_CANDLESTICK_WICK,
  candleClassName: _CL.CL_CANDLESTICK_CANDLE,
  yAccessor: function yAccessor(d) {
    return {
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close
    };
  },
  classNames: function classNames(d) {
    return d.close > d.open ? _CL.CL_UP : _CL.CL_DOWN;
  },
  width: _utils.plotDataLengthBarWidth,
  wickStroke: '#000000',
  fill: function fill(d) {
    return d.close > d.open ? '#6ba583' : '#ff0000';
  },
  stroke: '#000000',
  candleStrokeWidth: 0.5,
  widthRatio: 0.8,
  opacity: 0.5,
  clip: true
};
var _default = CandlestickSeries;
exports["default"] = _default;
//# sourceMappingURL=CandlestickSeries.js.map