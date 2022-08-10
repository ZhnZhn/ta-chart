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

var YAxis = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(YAxis, _Component);

  function YAxis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.axisZoomCallback = function (newYDomain) {
      var _this$context = _this.context,
          chartId = _this$context.chartId,
          yAxisZoom = _this$context.yAxisZoom;
      yAxisZoom(chartId, newYDomain);
    };

    _this._crMoreProps = function () {
      var _this$props = _this.props,
          axisAt = _this$props.axisAt,
          ticks = _this$props.ticks,
          yZoomWidth = _this$props.yZoomWidth,
          orient = _this$props.orient,
          _this$context$chartCo = _this.context.chartConfig,
          width = _this$context$chartCo.width,
          height = _this$context$chartCo.height,
          yPan = _this$context$chartCo.yPan,
          x = orient === 'left' ? -yZoomWidth : 0,
          y = 0,
          h = height,
          w = yZoomWidth,
          axisLocation = _crAxisLocation(axisAt, width);

      return {
        transform: [axisLocation, 0],
        range: [0, height],
        bg: {
          x: x,
          y: y,
          h: h,
          w: w
        },
        getScale: _getYScale,
        ticks: ticks != null ? ticks : _getYTicks(height),
        zoomEnabled: yPan
      };
    };

    return _this;
  }

  var _proto = YAxis.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        getMouseDelta = _this$props2.getMouseDelta,
        outerTickSize = _this$props2.outerTickSize,
        strokeStyle = _this$props2.strokeStyle,
        strokeWidth = _this$props2.strokeWidth,
        restProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, _excluded),
        _this$_crMoreProps = this._crMoreProps(),
        zoomEnabled = _this$_crMoreProps.zoomEnabled,
        moreProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$_crMoreProps, _excluded2);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis["default"], (0, _extends2["default"])({}, restProps, moreProps, {
      edgeClip: true,
      outerTickSize: outerTickSize,
      strokeStyle: strokeStyle,
      strokeWidth: strokeWidth,
      zoomEnabled: this.props.zoomEnabled && zoomEnabled,
      getMouseDelta: getMouseDelta,
      axisZoomCallback: this.axisZoomCallback
    }));
  };

  return YAxis;
}(_uiApi.Component);

YAxis.contextTypes = {
  yAxisZoom: _propTypes["default"].func.isRequired,
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  chartConfig: _propTypes["default"].object.isRequired
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