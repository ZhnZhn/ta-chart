import { getProps } from '../../uiApi';

import GenericChartComponent from '../core/GenericChartComponent';
import { getMouseCanvas } from '../core/contextFn';

import { renderSVG } from './EdgeCoordinateV3';
import { drawOnCanvas } from './EdgeCoordinateV3';

const DRAWN_ON = ['mousemove', 'pan', 'drag'];

const crMouseCoordinate = (
  crCoordinateProps,
  dfProps
) => (
  props
) => {
  const _props = getProps(props, dfProps)
  , _renderSVG = (moreProps) => {
     const _coordinateProps = crCoordinateProps(_props, moreProps);
     return _coordinateProps == null
       ? null
       : renderSVG(_coordinateProps);
  }
  , _drawOnCanvas = (ctx, moreProps) => {
     const _coordinateProps = crCoordinateProps(_props, moreProps);
     if (_coordinateProps == null) {
       return null;
     }
     drawOnCanvas(ctx, _coordinateProps);
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
