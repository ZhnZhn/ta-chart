import PropTypes from 'prop-types';
import { Component } from '../../uiApi';

import Axis from './Axis';
import { crScale } from './AxisFn';
import {
  CL_X_AXIS,
  CL_AXIS_DOMAIN,
  CL_EW_RESIZE_CURSOR,
  FONT_FAMILY
} from '../CL';

const _crAxisLocation = (
  axisAt,
  height
) => axisAt === 'top'
  ? 0
  : axisAt === 'bottom'
      ? height
      : axisAt === 'middle'
         ? height / 2
         : axisAt;

const _getXTicks = (
  width
) => width < 400
  ? 2
  : width < 500
     ? 6
     : 8;

const _getXScale = ({
  xScale,
  width
}) => xScale.invert
  ? crScale(xScale, [0, width])
  : xScale;


class XAxis extends Component {
    static contextTypes = {
       chartConfig: PropTypes.object.isRequired,
       xAxisZoom: PropTypes.func.isRequired
    }

    axisZoomCallback = (newXDomain) => {
       const { xAxisZoom } = this.context;
       xAxisZoom(newXDomain);
    }

    _crMoreProps = () => {
        const {
          axisAt,
          xZoomHeight,
          orient,
          ticks
        } = this.props
        , {
          chartConfig: {width, height}
        } = this.context
        , x = 0
        , y = orient === 'top'
           ? -xZoomHeight
           : 0
        , h = xZoomHeight
        , w = width
        , axisLocation = _crAxisLocation(axisAt, height);

        return {
          bg: {x, y, h, w},
          transform: [0, axisLocation],
          range: [0, width],
          getScale: _getXScale,
          ticks: ticks ?? _getXTicks(width)
        };
    }

    render() {
        const {
          getMouseDelta,
          outerTickSize,
          showTicks,
          strokeStyle,
          strokeWidth,
          zoomEnabled,
          ...restProps
        } = this.props
        , _moreProps = this._crMoreProps();

        return (
          <Axis
            {...restProps}
            {..._moreProps}
            getMouseDelta={getMouseDelta}
            outerTickSize={outerTickSize}
            showTicks={showTicks}
            strokeStyle={strokeStyle}
            strokeWidth={strokeWidth}
            zoomEnabled={zoomEnabled && showTicks}
            axisZoomCallback={this.axisZoomCallback}
        />);
    }
}

const XAXIS_COLOR = '#000000'
, GRID_LINE_COLOR = '#e2e4ec';

XAxis.defaultProps = {
   axisAt: 'bottom',
   className: CL_X_AXIS,
   domainClassName: CL_AXIS_DOMAIN,
   fontFamily: FONT_FAMILY,
   fontSize: 12,
   fontWeight: 400,
   getMouseDelta: (startXY, mouseXY) => startXY[0] - mouseXY[0],
   gridLinesStrokeStyle: GRID_LINE_COLOR,
   gridLinesStrokeWidth: 1,
   orient: 'bottom',
   outerTickSize: 0,
   innerTickSize: 4,
   showDomain: true,
   showGridLines: false,
   showTicks: true,
   showTickLabel: true,
   strokeStyle: XAXIS_COLOR,
   strokeWidth: 1,
   tickPadding: 4,
   tickLabelFill: XAXIS_COLOR,
   tickStrokeStyle: XAXIS_COLOR,
   xZoomHeight: 25,
   zoomEnabled: true,
   zoomCursorClassName: CL_EW_RESIZE_CURSOR
}

export default XAxis
