"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.YAxis = void 0;
var _uiApi = require("../../uiApi");
var _Chart = require("../core/Chart");
var _Axis = _interopRequireDefault(require("./Axis"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crAxisLocation = (axisAt, width) => axisAt === 'left' ? 0 : axisAt === 'right' ? width : axisAt === 'middle' ? width / 2 : axisAt;
const _getYTicks = height => height < 300 ? 2 : height < 500 ? 6 : 8;
const _getYScale = moreProps => {
  const {
    yScale,
    flipYScale,
    height
  } = moreProps.chartConfig;
  if (yScale.invert) {
    const trueRange = flipYScale ? [0, height] : [height, 0],
      trueDomain = trueRange.map(yScale.invert);
    return yScale.copy().domain(trueDomain).range(trueRange);
  }
  return yScale;
};
const _crMoreProps = (props, width, height, yPan) => {
  const {
      axisAt,
      ticks,
      yZoomWidth,
      orient
    } = props,
    axisLocation = _crAxisLocation(axisAt, width);
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
    ticks: ticks != null ? ticks : _getYTicks(height),
    zoomEnabled: yPan
  };
};
const YAXIS_COLOR = '#000000',
  GRID_LINE_COLOR = '#e2e4ec',
  DF_PROPS = {
    axisAt: 'right',
    className: _CL.CL_Y_AXIS,
    domainClassName: _CL.CL_AXIS_DOMAIN,
    fontFamily: _CL.FONT_FAMILY,
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
    zoomCursorClassName: _CL.CL_NS_RESIZE_CURSOR
  };
const YAxis = props => {
  const _props = (0, _uiApi.getProps)(props, DF_PROPS),
    context = (0, _uiApi.useContext)(_Chart.ChartContext),
    {
      chartId,
      chartConfig: {
        width,
        height,
        yPan
      },
      yAxisZoom
    } = context,
    _axisZoomCallback = (0, _uiApi.useCallback)(newYDomain => {
      yAxisZoom(chartId, newYDomain);
    }, [chartId, yAxisZoom]);
  const {
      getMouseDelta,
      outerTickSize,
      strokeStyle,
      strokeWidth,
      ...restProps
    } = _props,
    {
      zoomEnabled,
      ...moreProps
    } = _crMoreProps(_props, width, height, yPan);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis.default, {
    ...restProps,
    ...moreProps,
    edgeClip: true,
    outerTickSize: outerTickSize,
    strokeStyle: strokeStyle,
    strokeWidth: strokeWidth,
    zoomEnabled: props.zoomEnabled && zoomEnabled,
    getMouseDelta: getMouseDelta,
    axisZoomCallback: _axisZoomCallback
  });
};
exports.YAxis = YAxis;
//# sourceMappingURL=YAxis.js.map