//import PropTypes from "prop-types";
import GenericChartComponent from '../core/GenericChartComponent';
import { getAxisCanvas } from '../core/contextFn';
import { functor } from '../utils';

import StackedBarSeries from './StackedBarSeries';
import {
  drawOnCanvasHelper,
  drawOnCanvas2,
  getBarsSVG2,
  svgHelper,
  identityStack
} from './StackedBarSeriesFn';

const mathRound = Math.round
, mathFloor = Math.floor;

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

	const offset = mathFloor(0.5 * width)

	, bars = plotData
		 .filter(d => yAccessor(d) != null)
		 .map((d,index,_data) => {
        const dPrev = _data[index-1] || d
			  , yValue = yAccessor(d)
        , x = mathRound(xScale(xAccessor(d))) - offset

			  let y = yScale(yValue)
			  , h = getBase(xScale, yScale, d) - yScale(yValue);

			  if (h < 0) {
			    y = y + h;
			    h = -h;
			  }

			  return {
			    x,
			    y: mathRound(y),
			    height: mathRound(h),
			    width: offset * 2,
          fill: fill(d, dPrev),
          stroke: stroke(d, dPrev)
			  };
		});

	return bars;
}

const DRAW_ON = ['pan'];

const BarSeries = (props) => {
  const {
    swapScales,
    clip
  } = props
  , _renderSVG = (moreProps) => (
     <g>
       {swapScales
         ? svgHelper(props, moreProps, identityStack)
         : getBarsSVG2(props, _getBars(props, moreProps))
       }
     </g>
  )
  , _drawOnCanvas = (ctx, moreProps) => {
		 if (swapScales) {
       drawOnCanvasHelper(ctx, props, moreProps, identityStack);
		 } else {
       drawOnCanvas2(ctx, props, _getBars(props, moreProps));
		 }
	};
  return (
    <GenericChartComponent
      clip={clip}
      svgDraw={_renderSVG}
      canvasToDraw={getAxisCanvas}
      canvasDraw={_drawOnCanvas}
      drawOn={DRAW_ON}
    />
  );
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
