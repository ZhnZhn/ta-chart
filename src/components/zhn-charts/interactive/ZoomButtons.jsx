import { useContext } from '../../uiApi';

import { interpolateNumber } from '../d3Interpolate';
import { last } from '../utils';

import { ChartContext } from '../core/Chart';

const mathRound = Math.round;

const S_SVG_G = {
  pointerEvents: 'all',
  transform: 'translate(0, 50px)',
}
, S_ZOOM_OUT = {
  transform: 'translate(-40px, 0)'
}
, S_ZOOM_IN = {
  transform: 'translate(-56px, 0)'
};

const _crTransform = (
  zoomX,
  y,
  r
) => `translate (${zoomX - 20}, ${y - 8 + r / 4})`;

export const ZoomButtons = ({
  zoomMultiplier,
  heightFromBase,
  r,
  fill,
  fillOpacity,
  stroke,
  strokeWidth,
  textFill
}) => {
  const context = useContext(ChartContext)
  , _zoom = (direction) => {
      const {
        xAxisZoom,
        xScale,
        plotData,
        xAccessor
      } = context
      , cx = xScale(xAccessor(last(plotData)))
      , c = direction > 0
         ? 1 * zoomMultiplier
         : 1 / zoomMultiplier
      , [
        start,
        end
      ] = xScale.domain()
      , [
        newStart,
        newEnd
      ] = xScale
        .range()
        .map((x) => cx + (x - cx) * c)
        .map(xScale.invert)

      , left = interpolateNumber(start, newStart)
      , right = interpolateNumber(end, newEnd);

      xAxisZoom([left(0.2), right(0.2)]);
  }
  , _hZoomIn = () => _zoom(-1)
  , _hZoomOut = () => _zoom(1)

  , {
    chartConfig: {width, height}
  } = context

  , _centerX = mathRound(width / 2)
  , _y = height - heightFromBase
  , _zoomOutX = _centerX - 16 - r * 2
  , _zoomInX = _centerX - 8
  , _resetX = _centerX + 16 + r * 2

  , _transformZoomOut = _crTransform(_zoomOutX, _y, r)
  , _transformZoomIn = _crTransform(_zoomInX, _y, r)

  , _cy = _y + r/2
  , _cxZoomOut = _zoomInX - r/2
  , _cxZoomIn = _resetX - r/2;

  return (
    <g style={S_SVG_G} >
       <g transform={_transformZoomOut}>
          <path
            d="M19,13H5V11H19V13Z"
            fill={textFill}
          />
       </g>
       <circle
          style={S_ZOOM_OUT}
          cx={_cxZoomOut}
          cy={_cy}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          r={r}
          onClick={_hZoomOut}
       />
       <g transform={_transformZoomIn}>
          <path
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
            fill={textFill}
          />
       </g>
       <circle
          style={S_ZOOM_IN}
          cx={_cxZoomIn}
          cy={_cy}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          r={r}
          onClick={_hZoomIn}
       />
    </g>
  );
}

ZoomButtons.defaultProps = {
  fill: '#ffffff',
  fillOpacity: 0.4,
  heightFromBase: 32,
  r: 16,
  stroke: 'grey',
  strokeWidth: 1,
  textFill: '#000000',
  zoomMultiplier: 1.5
};
