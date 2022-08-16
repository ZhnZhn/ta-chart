import PropTypes from 'prop-types';
import { Component } from '../../uiApi';
import { interpolateNumber } from 'd3-interpolate';
import { last } from '../utils';

const S_SVG_G = {
  pointerEvents: 'all',
  transform: 'translate(0, 50px)',
}
, S_ZOOM_OUT = {
  transform: 'translate(-40px, 0)'
}
, S_ZOOM_IN = {
  transform: 'translate(-56px, 0)'
}

const _crTransform = (
  zoomX,
  y,
  r
) => `translate (${zoomX - 20}, ${y - 8 + r / 4})`;

class ZoomButtons extends Component {

    _hZoomIn = () => {
      this._zoom(-1);
    }

    _hZoomOut = () => {
      this._zoom(1);
    }

    _zoom = (direction) => {
       const {
         xAxisZoom,
         xScale,
         plotData,
         xAccessor
       } = this.context
       , {
         zoomMultiplier
       } = this.props
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

    render() {
        const {
          chartConfig: { width, height }
        } = this.context
        , {
          heightFromBase,
          r,
          fill,
          fillOpacity,
          stroke,
          strokeWidth,
          textFill
        } = this.props

        , centerX = Math.round(width / 2)
        , y = height - heightFromBase

        , zoomOutX = centerX - 16 - r * 2
        , zoomInX = centerX - 8
        , resetX = centerX + 16 + r * 2
        , _transformZoomOut = _crTransform(zoomOutX, y, r)
        , _transformZoomIn = _crTransform(zoomInX, y, r);

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
                cx={zoomInX - r / 2}
                cy={y + r / 2}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                strokeWidth={strokeWidth}
                r={r}
                onClick={this._hZoomOut}
             />
             <g transform={_transformZoomIn}>
                <path
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                  fill={textFill}
                />
             </g>
             <circle
                style={S_ZOOM_IN}
                cx={resetX - r / 2}
                cy={y + r / 2}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                strokeWidth={strokeWidth}
                r={r}
                onClick={this._hZoomIn}
             />
          </g>
        );
    }
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
}

ZoomButtons.contextTypes = {
  xScale: PropTypes.func.isRequired,
  chartConfig: PropTypes.object.isRequired,
  plotData: PropTypes.array.isRequired,
  xAccessor: PropTypes.func.isRequired,
  xAxisZoom: PropTypes.func.isRequired
}

export default ZoomButtons
