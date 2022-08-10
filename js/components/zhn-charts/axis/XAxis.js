"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiApi = require("../../uiApi");

var _Axis = _interopRequireDefault(require("./Axis"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["getMouseDelta", "outerTickSize", "showTicks", "strokeStyle", "strokeWidth", "zoomEnabled"];

var _crAxisLocation = function _crAxisLocation(axisAt, height) {
  return axisAt === 'top' ? 0 : axisAt === 'bottom' ? height : axisAt === 'middle' ? height / 2 : axisAt;
};

var _getXTicks = function _getXTicks(width) {
  return width < 400 ? 2 : width < 500 ? 6 : 8;
};

var _getXScale = function _getXScale(moreProps) {
  var xScale = moreProps.xScale,
      width = moreProps.width;

  if (xScale.invert) {
    var trueRange = [0, width],
        trueDomain = trueRange.map(xScale.invert);
    return xScale.copy().domain(trueDomain).range(trueRange);
  }

  return xScale;
};

var XAxis = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(XAxis, _Component);

  function XAxis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.axisZoomCallback = function (newXDomain) {
      var xAxisZoom = _this.context.xAxisZoom;
      xAxisZoom(newXDomain);
    };

    _this._crMoreProps = function () {
      var _this$props = _this.props,
          axisAt = _this$props.axisAt,
          xZoomHeight = _this$props.xZoomHeight,
          orient = _this$props.orient,
          ticks = _this$props.ticks,
          _this$context$chartCo = _this.context.chartConfig,
          width = _this$context$chartCo.width,
          height = _this$context$chartCo.height,
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

    return _this;
  }

  var _proto = XAxis.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        getMouseDelta = _this$props2.getMouseDelta,
        outerTickSize = _this$props2.outerTickSize,
        showTicks = _this$props2.showTicks,
        strokeStyle = _this$props2.strokeStyle,
        strokeWidth = _this$props2.strokeWidth,
        zoomEnabled = _this$props2.zoomEnabled,
        restProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, _excluded),
        _moreProps = this._crMoreProps();

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis["default"], (0, _extends2["default"])({}, restProps, _moreProps, {
      getMouseDelta: getMouseDelta,
      outerTickSize: outerTickSize,
      showTicks: showTicks,
      strokeStyle: strokeStyle,
      strokeWidth: strokeWidth,
      zoomEnabled: zoomEnabled && showTicks,
      axisZoomCallback: this.axisZoomCallback
    }));
  };

  return XAxis;
}(_uiApi.Component);

XAxis.contextTypes = {
  chartConfig: _propTypes["default"].object.isRequired,
  xAxisZoom: _propTypes["default"].func.isRequired
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