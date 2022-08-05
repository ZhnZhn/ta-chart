import {
  GenericChartComponent
} from '../core/GenericChartComponent';
import {
  getMouseCanvas
} from '../core/contextFn';

import useRenderSvg from './useRenderSvg';
import useDrawOnCanvas from './useDrawOnCanvas';

const crMouseCoordinate = crCoordinateProps => props => {
  const _renderSVG = useRenderSvg(props, crCoordinateProps)
  , _drawOnCanvas = useDrawOnCanvas(props, crCoordinateProps);
  return (
    <GenericChartComponent
			clip={false}
			svgDraw={_renderSVG}
			canvasDraw={_drawOnCanvas}
			canvasToDraw={getMouseCanvas}
			drawOn={["mousemove", "pan", "drag"]}
		/>
  );
}

export default crMouseCoordinate
