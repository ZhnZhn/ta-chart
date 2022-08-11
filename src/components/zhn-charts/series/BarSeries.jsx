//import PropTypes from "prop-types";
import { Component } from 'react';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  getAxisCanvas
} from '../core/contextFn';

import {
  functor,
  isDefined
} from '../utils';

import StackedBarSeries from './StackedBarSeries';
import {
  drawOnCanvasHelper,
  drawOnCanvas2,
  getBarsSVG2,
  svgHelper,
  identityStack
} from './StackedBarSeriesFn';

const _getBars = (
  props,
  moreProps
) => {
	const {
    baseAt,
    fill,
    stroke,
    yAccessor
  } = props
  , {
    xScale,
    xAccessor,
    plotData,
    chartConfig: { yScale }
  } = moreProps

	, getBase = functor(baseAt)
	, widthFunctor = functor(props.width)

	, width = widthFunctor(props, {
		xScale,
		xAccessor,
		plotData
	});

	const offset = Math.floor(0.5 * width)

	, bars = plotData
		 .filter(d => isDefined(yAccessor(d)))
		 .map((d,index,_data) => {
        const dPrev = _data[index-1] || d
			  , yValue = yAccessor(d)
        , x = Math.round(xScale(xAccessor(d))) - offset

			  let y = yScale(yValue)
			  , h = getBase(xScale, yScale, d) - yScale(yValue);

			  if (h < 0) {
			    y = y + h;
			    h = -h;
			  }

			  return {
			    x,
			    y: Math.round(y),
			    height: Math.round(h),
			    width: offset * 2,
          fill: fill(d, dPrev),
          stroke: stroke(d, dPrev)
			  };
		});

	return bars;
}

const DRAW_ON = ['pan'];

class BarSeries extends Component {

	drawOnCanvas = (ctx, moreProps) => {
		if (this.props.swapScales) {
			const { xAccessor } = moreProps;
			drawOnCanvasHelper(ctx, this.props, moreProps, xAccessor, identityStack);
		} else {
			const bars = _getBars(this.props, moreProps);
			drawOnCanvas2(this.props, ctx, bars);
		}
	}

	renderSVG = (moreProps) => {
		if (this.props.swapScales) {
			const { xAccessor } = moreProps;
			return (
        <g>
          {svgHelper(this.props, moreProps, xAccessor, identityStack)}
        </g>
      );
		} else {
			const bars = _getBars(this.props, moreProps);
			return (
        <g>
          {getBarsSVG2(this.props, bars)}
        </g>
      );
		}
	}

	render() {
		const { clip } = this.props;
		return (
			<GenericChartComponent
				clip={clip}
				svgDraw={this.renderSVG}
				canvasToDraw={getAxisCanvas}
				canvasDraw={this.drawOnCanvas}
				drawOn={DRAW_ON}
			/>
		);
	}
}

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

BarSeries.defaultProps = StackedBarSeries.defaultProps;

export default BarSeries;
