import {
  useContext,
  useCallback
} from '../../uiApi';

import { ChartContext } from '../core/Chart';
import Axis from './Axis';
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

const _getYScale = (
  moreProps
) => {
   const {
     yScale,
     flipYScale,
     height
   } = moreProps.chartConfig;
   if (yScale.invert) {
     const trueRange = flipYScale
        ? [0, height]
        : [height, 0]
     , trueDomain = trueRange.map(yScale.invert);
     return yScale
       .copy()
       .domain(trueDomain)
       .range(trueRange);
   }
   return yScale;
};

const _crMoreProps = (
  props,
  width,
  height,
  yPan
) => {
    const {
      axisAt,
      ticks,
      yZoomWidth,
      orient
    } = props
    , axisLocation = _crAxisLocation(axisAt, width);

    return {
       transform: [axisLocation, 0],
       range: [0, height],
       bg: {
         x: orient === 'left' ? -yZoomWidth : 0,
         y: 0,
         h: height,
         w: yZoomWidth
       },
       getScale: _getYScale,
       ticks: ticks ?? _getYTicks(height),
       zoomEnabled: yPan
    };
};

export const YAxis = (props) => {
  const context = useContext(ChartContext)
  , {
    chartId,
    chartConfig: {width, height, yPan},
    yAxisZoom
  } = context
  , _axisZoomCallback = useCallback((newYDomain) => {
    yAxisZoom(chartId, newYDomain);
  }, [chartId, yAxisZoom]);

  const {
    getMouseDelta,
    outerTickSize,
    strokeStyle,
    strokeWidth,
    ...restProps
  } = props
  , {
    zoomEnabled,
    ...moreProps
  } = _crMoreProps(
    props,
    width,
    height,
    yPan
  );

  return (
    <Axis
      {...restProps}
      {...moreProps}
      edgeClip={true}
      outerTickSize={outerTickSize}
      strokeStyle={strokeStyle}
      strokeWidth={strokeWidth}
      zoomEnabled={props.zoomEnabled && zoomEnabled}
      getMouseDelta={getMouseDelta}
      axisZoomCallback={_axisZoomCallback}
    />
  );
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
};
