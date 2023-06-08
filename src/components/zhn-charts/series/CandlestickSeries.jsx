//import PropTypes from "prop-types";

import GenericChartComponent from '../core/GenericChartComponent';
import {
	getAxisCanvas
} from '../core/contextFn';
import {
	CL_CANDLESTICK,
	CL_CANDLESTICK_WICK,
	CL_CANDLESTICK_CANDLE,
	CL_UP,
	CL_DOWN
} from '../CL';

import {
  plotDataLengthBarWidth
} from '../utils';

import {
	drawOnCanvas,
	getCandleData,
	getCandlesSVG,
	getWicksSVG
} from './CandlestickSeriesFn';

const DRAW_ON = ['pan'];

const CandlestickSeries = (props) => {
	const {
		className,
		wickClassName,
		candleClassName,
		clip
	} = props
	, _renderSVG = (moreProps) => {
      const {
	      xAccessor,
        xScale,
        plotData,
        chartConfig: { yScale }
      } = moreProps
      , candleData = getCandleData(
         props,
         xAccessor,
         xScale,
         yScale,
         plotData
       );

      return (
        <g className={className}>
          <g className={wickClassName} key="wicks">
            {getWicksSVG(candleData)}
          </g>
          <g className={candleClassName} key="candles">
            {getCandlesSVG(props, candleData)}
          </g>
       </g>
	   );
	}
	, _drawOnCanvas = (ctx, moreProps) => {
		  drawOnCanvas(ctx, props, moreProps);
	};

	return (
		<GenericChartComponent
			clip={clip}
			svgDraw={_renderSVG}
			canvasDraw={_drawOnCanvas}
			canvasToDraw={getAxisCanvas}
			drawOn={DRAW_ON}
		/>
	);
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

const DF_YACCESSOR = d => ({
	open: d.open,
	high: d.high,
	low: d.low,
	close: d.close
})
, DF_CLASSNAMES = d => d.close > d.open
	 ? CL_UP
	 : CL_DOWN
, DF_FILL = d => d.close > d.open
	 ? '#6ba583'
	 : '#ff0000'

CandlestickSeries.defaultProps = {
	className: CL_CANDLESTICK,
	wickClassName: CL_CANDLESTICK_WICK,
	candleClassName: CL_CANDLESTICK_CANDLE,
	yAccessor: DF_YACCESSOR,
	classNames: DF_CLASSNAMES,
	width: plotDataLengthBarWidth,
	wickStroke: '#000000',
	fill: DF_FILL,
	stroke: '#000000',
	candleStrokeWidth: 0.5,
	widthRatio: 0.8,
	opacity: 0.5,
	clip: true
};

export default CandlestickSeries;
