"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _Chart = require("../core/Chart");
var _Axis = _interopRequireDefault(require("./Axis"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["getMouseDelta", "outerTickSize", "strokeStyle", "strokeWidth"],
  _excluded2 = ["zoomEnabled"];
var _crAxisLocation = function _crAxisLocation(axisAt, width) {
  return axisAt === 'left' ? 0 : axisAt === 'right' ? width : axisAt === 'middle' ? width / 2 : axisAt;
};
var _getYTicks = function _getYTicks(height) {
  return height < 300 ? 2 : height < 500 ? 6 : 8;
};
var _getYScale = function _getYScale(moreProps) {
  var _moreProps$chartConfi = moreProps.chartConfig,
    yScale = _moreProps$chartConfi.yScale,
    flipYScale = _moreProps$chartConfi.flipYScale,
    height = _moreProps$chartConfi.height;
  if (yScale.invert) {
    var trueRange = flipYScale ? [0, height] : [height, 0],
      trueDomain = trueRange.map(yScale.invert);
    return yScale.copy().domain(trueDomain).range(trueRange);
  }
  return yScale;
};
var _crMoreProps = function _crMoreProps(props, width, height, yPan) {
  var axisAt = props.axisAt,
    ticks = props.ticks,
    yZoomWidth = props.yZoomWidth,
    orient = props.orient,
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
var YAxis = function YAxis(props) {
  var context = (0, _uiApi.useContext)(_Chart.ChartContext),
    chartId = context.chartId,
    _context$chartConfig = context.chartConfig,
    width = _context$chartConfig.width,
    height = _context$chartConfig.height,
    yPan = _context$chartConfig.yPan,
    yAxisZoom = context.yAxisZoom,
    _axisZoomCallback = (0, _uiApi.useCallback)(function (newYDomain) {
      yAxisZoom(chartId, newYDomain);
    }, [chartId, yAxisZoom]);
  var getMouseDelta = props.getMouseDelta,
    outerTickSize = props.outerTickSize,
    strokeStyle = props.strokeStyle,
    strokeWidth = props.strokeWidth,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
    _crMoreProps2 = _crMoreProps(props, width, height, yPan),
    zoomEnabled = _crMoreProps2.zoomEnabled,
    moreProps = (0, _objectWithoutPropertiesLoose2["default"])(_crMoreProps2, _excluded2);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis["default"], (0, _extends2["default"])({}, restProps, moreProps, {
    edgeClip: true,
    outerTickSize: outerTickSize,
    strokeStyle: strokeStyle,
    strokeWidth: strokeWidth,
    zoomEnabled: props.zoomEnabled && zoomEnabled,
    getMouseDelta: getMouseDelta,
    axisZoomCallback: _axisZoomCallback
  }));
};
var YAXIS_COLOR = '#000000',
  GRID_LINE_COLOR = '#e2e4ec';
YAxis.defaultProps = {
  axisAt: 'right',
  className: _CL.CL_Y_AXIS,
  domainClassName: _CL.CL_AXIS_DOMAIN,
  fontFamily: _CL.FONT_FAMILY,
  fontSize: 12,
  fontWeight: 400,
  getMouseDelta: function getMouseDelta(startXY, mouseXY) {
    return startXY[1] - mouseXY[1];
  },
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
var _default = YAxis;
exports["default"] = _default;
//# sourceMappingURL=YAxis.js.map