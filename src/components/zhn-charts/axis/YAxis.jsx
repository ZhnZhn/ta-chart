import PropTypes from 'prop-types';
import { Component } from '../../uiApi';

import Axis from './Axis';
import { crScale } from './AxisFn';
import {
  CL_Y_AXIS,
  CL_AXIS_DOMAIN,
  CL_NS_RESIZE_CURSOR,
  FONT_FAMILY
} from '../CL';

const _crAxisLocation = (
  axisAt,
  width
) => axisAt === 'left'
 ? 0
 : axisAt === 'right'
    ? width
    : axisAt === 'middle'
        ? width / 2
        : axisAt;

const _getYTicks = (
  height
) => height < 300
  ? 2
  : height < 500
     ? 6
     : 8;

const _getYScale = ({
  chartConfig: {yScale, flipYScale, height}
}) => yScale.invert
  ? crScale(
     yScale,
     flipYScale ? [0, height] : [height, 0]
   )
  : yScale;

class YAxis extends Component {

    static contextTypes = {
       yAxisZoom: PropTypes.func.isRequired,
       chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
       chartConfig: PropTypes.object.isRequired,
    }

    axisZoomCallback = (newYDomain) => {
       const {
         chartId,
         yAxisZoom
       } = this.context;
       yAxisZoom(chartId, newYDomain);
    }

    _crMoreProps = () => {
        const {
          axisAt,
          ticks,
          yZoomWidth,
          orient
        } = this.props
        , {
          chartConfig: {width, height, yPan}
        } = this.context
        , x = orient === 'left'
           ? -yZoomWidth
           : 0
        , y = 0
        , h = height
        , w = yZoomWidth
        , axisLocation = _crAxisLocation(axisAt, width);

        return {
           transform: [axisLocation, 0],
           range: [0, height],
           bg: {x, y, h, w},
           getScale: _getYScale,
           ticks: ticks ?? _getYTicks(height),
           zoomEnabled: yPan
        };
    }

    render() {
        const {
          getMouseDelta,
          outerTickSize,
          strokeStyle,
          strokeWidth,
          ...restProps
        } = this.props
        , {
          zoomEnabled,
          ...moreProps
        } = this._crMoreProps();

        return (
          <Axis
            {...restProps}
            {...moreProps}
            edgeClip={true}
            outerTickSize={outerTickSize}
            strokeStyle={strokeStyle}
            strokeWidth={strokeWidth}
            zoomEnabled={this.props.zoomEnabled && zoomEnabled}
            getMouseDelta={getMouseDelta}
            axisZoomCallback={this.axisZoomCallback}
        />);
    }
}

const YAXIS_COLOR = '#000000'
, GRID_LINE_COLOR = '#e2e4ec';

YAxis.defaultProps = {
    axisAt: 'right',
    className: CL_Y_AXIS,
    domainClassName: CL_AXIS_DOMAIN,
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    getMouseDelta: (startXY, mouseXY) => startXY[1] - mouseXY[1],
    gridLinesStrokeStyle: GRID_LINE_COLOR,
    gridLinesStrokeWidth: 1,
    innerTickSize: 4,
    outerTickSize: 0,
    orient: 'right',
    showDomain: true,
    showGridLines: false,
    showTicks: true,
    showTickLabel: true,
    strokeStyle: YAXIS_COLOR,
    strokeWidth: 1,
    tickPadding: 4,
    tickLabelFill: YAXIS_COLOR,
    tickStrokeStyle: YAXIS_COLOR,
    yZoomWidth: 40,
    zoomEnabled: true,
    zoomCursorClassName: CL_NS_RESIZE_CURSOR
}

export default YAxis
