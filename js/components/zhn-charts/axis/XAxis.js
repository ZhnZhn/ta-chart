"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _Chart = require("../core/Chart");
var _Axis = _interopRequireDefault(require("./Axis"));
var _AxisFn = require("./AxisFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["getMouseDelta", "outerTickSize", "showTicks", "strokeStyle", "strokeWidth", "zoomEnabled"];
var _crAxisLocation = function _crAxisLocation(axisAt, height) {
  return axisAt === 'top' ? 0 : axisAt === 'bottom' ? height : axisAt === 'middle' ? height / 2 : axisAt;
};
var _getXTicks = function _getXTicks(width) {
  return width < 400 ? 2 : width < 500 ? 6 : 8;
};
var _getXScale = function _getXScale(_ref) {
  var xScale = _ref.xScale,
    width = _ref.width;
  return xScale.invert ? (0, _AxisFn.crScale)(xScale, [0, width]) : xScale;
};
var _crMoreProps = function _crMoreProps(props, width, height) {
  var axisAt = props.axisAt,
    xZoomHeight = props.xZoomHeight,
    orient = props.orient,
    ticks = props.ticks,
    x = 0,
    y = orient === 'top' ? -xZoomHeight : 0,
    h = xZoomHeight,
    w = width,
    axisLocation = _crAxisLocation(axisAt, height);
  return {
    bg: {
      x: x,
      y: y,
      h: h,
      w: w
    },
    transform: [0, axisLocation],
    range: [0, width],
    getScale: _getXScale,
    ticks: ticks != null ? ticks : _getXTicks(width)
  };
};
var XAxis = function XAxis(props) {
  var _useContext = (0, _uiApi.useContext)(_Chart.ChartContext),
    xAxisZoom = _useContext.xAxisZoom,
    _useContext$chartConf = _useContext.chartConfig,
    width = _useContext$chartConf.width,
    height = _useContext$chartConf.height,
    getMouseDelta = props.getMouseDelta,
    outerTickSize = props.outerTickSize,
    showTicks = props.showTicks,
    strokeStyle = props.strokeStyle,
    strokeWidth = props.strokeWidth,
    zoomEnabled = props.zoomEnabled,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
    _moreProps = _crMoreProps(props, width, height);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis["default"], (0, _extends2["default"])({}, restProps, _moreProps, {
    getMouseDelta: getMouseDelta,
    outerTickSize: outerTickSize,
    showTicks: showTicks,
    strokeStyle: strokeStyle,
    strokeWidth: strokeWidth,
    zoomEnabled: zoomEnabled && showTicks,
    axisZoomCallback: xAxisZoom
  }));
};
var XAXIS_COLOR = '#000000',
  GRID_LINE_COLOR = '#e2e4ec';
XAxis.defaultProps = {
  axisAt: 'bottom',
  className: _CL.CL_X_AXIS,
  domainClassName: _CL.CL_AXIS_DOMAIN,
  fontFamily: _CL.FONT_FAMILY,
  fontSize: 12,
  fontWeight: 400,
  getMouseDelta: function getMouseDelta(startXY, mouseXY) {
    return startXY[0] - mouseXY[0];
  },
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
var _default = XAxis;
exports["default"] = _default;
//# sourceMappingURL=XAxis.js.map