"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CandlestickSeries = void 0;
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _CL = require("../CL");
var _utils = require("../utils");
var _CandlestickSeriesFn = require("./CandlestickSeriesFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DRAW_ON = ['pan'];
const CandlestickSeries = props => {
  const {
      className,
      wickClassName,
      candleClassName,
      clip
    } = props,
    _renderSVG = moreProps => {
      const {
          xAccessor,
          xScale,
          plotData,
          chartConfig: {
            yScale
          }
        } = moreProps,
        candleData = (0, _CandlestickSeriesFn.getCandleData)(props, xAccessor, xScale, yScale, plotData);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        className: className,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          className: wickClassName,
          children: (0, _CandlestickSeriesFn.getWicksSVG)(candleData)
        }, "wicks"), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          className: candleClassName,
          children: (0, _CandlestickSeriesFn.getCandlesSVG)(props, candleData)
        }, "candles")]
      });
    },
    _drawOnCanvas = (ctx, moreProps) => {
      (0, _CandlestickSeriesFn.drawOnCanvas)(ctx, props, moreProps);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: clip,
    svgDraw: _renderSVG,
    canvasDraw: _drawOnCanvas,
    canvasToDraw: _contextFn.getAxisCanvas,
    drawOn: DRAW_ON
  });
};

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
exports.CandlestickSeries = CandlestickSeries;
const DF_YACCESSOR = d => ({
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close
  }),
  DF_CLASSNAMES = d => d.close > d.open ? _CL.CL_UP : _CL.CL_DOWN,
  DF_FILL = d => d.close > d.open ? '#6ba583' : '#ff0000';
CandlestickSeries.defaultProps = {
  className: _CL.CL_CANDLESTICK,
  wickClassName: _CL.CL_CANDLESTICK_WICK,
  candleClassName: _CL.CL_CANDLESTICK_CANDLE,
  yAccessor: DF_YACCESSOR,
  classNames: DF_CLASSNAMES,
  width: _utils.plotDataLengthBarWidth,
  wickStroke: '#000000',
  fill: DF_FILL,
  stroke: '#000000',
  candleStrokeWidth: 0.5,
  widthRatio: 0.8,
  opacity: 0.5,
  clip: true
};
//# sourceMappingURL=CandlestickSeries.js.map