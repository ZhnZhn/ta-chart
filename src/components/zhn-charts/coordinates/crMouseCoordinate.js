import GenericChartComponent from '../core/GenericChartComponent';
import { getMouseCanvas } from '../core/contextFn';

import { renderSVG } from './EdgeCoordinateV3';
import { drawOnCanvas } from './EdgeCoordinateV3';

const DRAWN_ON = ['mousemove', 'pan', 'drag'];

const crMouseCoordinate = (
  crCoordinateProps
) => props => {
  const _renderSVG = (moreProps) => {
     const _props = crCoordinateProps(props, moreProps);
     return _props == null
       ? null
       : renderSVG(_props);
  }
  , _drawOnCanvas = (ctx, moreProps) => {
     const _props = crCoordinateProps(props, moreProps);
     if (_props == null) {
       return null;
     }
     drawOnCanvas(ctx, _props);
  };

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
