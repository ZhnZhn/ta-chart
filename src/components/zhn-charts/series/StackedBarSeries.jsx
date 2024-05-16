//import PropTypes from "prop-types";
import { getProps } from '../../uiApi';
import { d3Stack } from '../d3Shape';

import GenericChartComponent from '../core/GenericChartComponent';
import { getAxisCanvas } from '../core/contextFn';

import {
  DF_PROPS,
  drawOnCanvasHelper,
  svgHelper
} from './StackedBarSeriesFn';

const DRAW_ON = ['pan'];

const StackedBarSeries = (props) => {
  const _props = getProps(props, DF_PROPS)
  , _renderSVG = (moreProps) => (
     <g>
       {svgHelper(_props, moreProps, d3Stack)}
     </g>
  )
  , _drawOnCanvas = (ctx, moreProps) => {
		 drawOnCanvasHelper(ctx, _props, moreProps, d3Stack);
	};

  return (
    <GenericChartComponent
      clip={_props.clip}
      svgDraw={_renderSVG}
      canvasDraw={_drawOnCanvas}
      canvasToDraw={getAxisCanvas}
      drawOn={DRAW_ON}
    />
  );
}

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

export default StackedBarSeries;
