"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.XAxis = void 0;
var _uiApi = require("../../uiApi");
var _Chart = require("../core/Chart");
var _Axis = _interopRequireDefault(require("./Axis"));
var _AxisFn = require("./AxisFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crAxisLocation = (axisAt, height) => axisAt === 'top' ? 0 : axisAt === 'bottom' ? height : axisAt === 'middle' ? height / 2 : axisAt;
const _getXTicks = width => width < 400 ? 2 : width < 500 ? 6 : 8;
const _getXScale = _ref => {
  let {
    xScale,
    width
  } = _ref;
  return xScale.invert ? (0, _AxisFn.crScale)(xScale, [0, width]) : xScale;
};
const _crMoreProps = (props, width, height) => {
  const {
      axisAt,
      xZoomHeight,
      orient,
      ticks
    } = props,
    x = 0,
    y = orient === 'top' ? -xZoomHeight : 0,
    h = xZoomHeight,
    w = width,
    axisLocation = _crAxisLocation(axisAt, height);
  return {
    bg: {
      x,
      y,
      h,
      w
    },
    transform: [0, axisLocation],
    range: [0, width],
    getScale: _getXScale,
    ticks: ticks != null ? ticks : _getXTicks(width)
  };
};
const XAXIS_COLOR = '#000000',
  GRID_LINE_COLOR = '#e2e4ec',
  DF_PROPS = {
    axisAt: 'bottom',
    className: _CL.CL_X_AXIS,
    domainClassName: _CL.CL_AXIS_DOMAIN,
    fontFamily: _CL.FONT_FAMILY,
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
    zoomCursorClassName: _CL.CL_EW_RESIZE_CURSOR
  };
const XAxis = props => {
  const _props = (0, _uiApi.getProps)(props, DF_PROPS),
    {
      xAxisZoom,
      chartConfig: {
        width,
        height
      }
    } = (0, _uiApi.useContext)(_Chart.ChartContext),
    {
      getMouseDelta,
      outerTickSize,
      showTicks,
      strokeStyle,
      strokeWidth,
      zoomEnabled,
      ...restProps
    } = _props,
    _moreProps = _crMoreProps(_props, width, height);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis.default, {
    ...restProps,
    ..._moreProps,
    getMouseDelta: getMouseDelta,
    outerTickSize: outerTickSize,
    showTicks: showTicks,
    strokeStyle: strokeStyle,
    strokeWidth: strokeWidth,
    zoomEnabled: zoomEnabled && showTicks,
    axisZoomCallback: xAxisZoom
  });
};
exports.XAxis = XAxis;
//# sourceMappingURL=XAxis.js.map