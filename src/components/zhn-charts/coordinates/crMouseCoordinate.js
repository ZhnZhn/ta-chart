import GenericChartComponent from '../core/GenericChartComponent';
import {
  getMouseCanvas
} from '../core/contextFn';

import useRenderSvg from './useRenderSvg';
import useDrawOnCanvas from './useDrawOnCanvas';

const DRAWN_ON = ['mousemove', 'pan', 'drag'];

const crMouseCoordinate = crCoordinateProps => props => {
  const _renderSVG = useRenderSvg(props, crCoordinateProps)
  , _drawOnCanvas = useDrawOnCanvas(props, crCoordinateProps);
  return (
    <GenericChartComponent
			clip={false}
			svgDraw={_renderSVG}
			canvasDraw={_drawOnCanvas}
			canvasToDraw={getMouseCanvas}
			drawOn={DRAWN_ON}
		/>
  );
}

export default crMouseCoordinate
