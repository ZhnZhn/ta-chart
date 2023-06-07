//import PropTypes from "prop-types";
import useEventCallback from '../../hooks/useEventCallback';

import { d3Stack } from '../d3Shape';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  getAxisCanvas
} from '../core/contextFn';

import {
  head,
  plotDataLengthBarWidth
} from '../utils';

import {
  drawOnCanvasHelper,
  svgHelper
} from './StackedBarSeriesFn';

import {
  CL_BAR
} from '../CL';

const DRAW_ON = ['pan'];

const StackedBarSeries = (props) => {
  const drawOnCanvas = useEventCallback((ctx, moreProps) => {
		drawOnCanvasHelper(ctx, props, moreProps, d3Stack);
	})
  , renderSVG = useEventCallback(moreProps => (
     <g>
       {svgHelper(props, moreProps, d3Stack)}
     </g>
  ));
  return (
    <GenericChartComponent
      clip={props.clip}
      svgDraw={renderSVG}
      canvasDraw={drawOnCanvas}
      canvasToDraw={getAxisCanvas}
      drawOn={DRAW_ON}
    />
  );
}

/*
class StackedBarSeries extends Component {

	drawOnCanvas = (ctx, moreProps) => {
		drawOnCanvasHelper(ctx, this.props, moreProps, d3Stack);
	}

	renderSVG = (moreProps) => {
		return (
      <g>
        {svgHelper(this.props, moreProps, d3Stack)}
      </g>
    );
	}

	render() {
		const { clip } = this.props;
		return (
      <GenericChartComponent
			  clip={clip}
			  svgDraw={this.renderSVG}
			  canvasDraw={this.drawOnCanvas}
			  canvasToDraw={getAxisCanvas}
			  drawOn={DRAW_ON}
		  />
    );
	}
}
*/

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

const DF_BASE_AT = (
  xScale,
  yScale
) => head(yScale.range());

StackedBarSeries.defaultProps = {
	baseAt: DF_BASE_AT,
	direction: 'up',
	className: CL_BAR,
	stroke: true,
	fill: '#4682b4',
	opacity: 0.5,
	width: plotDataLengthBarWidth,
	widthRatio: 0.8,
	clip: true,
	swapScales: false
};

export default StackedBarSeries;
