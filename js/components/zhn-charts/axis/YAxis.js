"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Axis = require("./Axis");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["getMouseDelta", "outerTickSize", "strokeStyle", "strokeWidth"],
    _excluded2 = ["zoomEnabled"];

var YAxis = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(YAxis, _React$Component);

  function YAxis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.axisZoomCallback = function (newYDomain) {
      var _this$context = _this.context,
          chartId = _this$context.chartId,
          yAxisZoom = _this$context.yAxisZoom;
      yAxisZoom(chartId, newYDomain);
    };

    _this.helper = function () {
      var _this$props = _this.props,
          axisAt = _this$props.axisAt,
          ticks = _this$props.ticks,
          yZoomWidth = _this$props.yZoomWidth,
          orient = _this$props.orient,
          _this$context$chartCo = _this.context.chartConfig,
          width = _this$context$chartCo.width,
          height = _this$context$chartCo.height,
          y = 0,
          w = yZoomWidth,
          h = height;
      var axisLocation;

      switch (axisAt) {
        case "left":
          axisLocation = 0;
          break;

        case "right":
          axisLocation = width;
          break;

        case "middle":
          axisLocation = width / 2;
          break;

        default:
          axisLocation = axisAt;
      }

      var x = orient === "left" ? -yZoomWidth : 0;
      return {
        transform: [axisLocation, 0],
        range: [0, height],
        getScale: _this.getYScale,
        bg: {
          x: x,
          y: y,
          h: h,
          w: w
        },
        ticks: ticks != null ? ticks : _this.getYTicks(height),
        zoomEnabled: _this.context.chartConfig.yPan
      };
    };

    _this.getYTicks = function (height) {
      if (height < 300) {
        return 2;
      }

      if (height < 500) {
        return 6;
      }

      return 8;
    };

    _this.getYScale = function (moreProps) {
      var _moreProps$chartConfi = moreProps.chartConfig,
          scale = _moreProps$chartConfi.yScale,
          flipYScale = _moreProps$chartConfi.flipYScale,
          height = _moreProps$chartConfi.height;

      if (scale.invert) {
        var trueRange = flipYScale ? [0, height] : [height, 0],
            trueDomain = trueRange.map(scale.invert);
        return scale.copy().domain(trueDomain).range(trueRange);
      }

      return scale;
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
        _this$helper = this.helper(),
        zoomEnabled = _this$helper.zoomEnabled,
        moreProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$helper, _excluded2);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis.Axis, (0, _extends2["default"])({}, restProps, moreProps, {
      edgeClip: true,
      getMouseDelta: getMouseDelta,
      outerTickSize: outerTickSize,
      strokeStyle: strokeStyle,
      strokeWidth: strokeWidth,
      zoomEnabled: this.props.zoomEnabled && zoomEnabled,
      axisZoomCallback: this.axisZoomCallback
    }));
  };

  return YAxis;
}(_react["default"].Component);

YAxis.defaultProps = {
  axisAt: "right",
  className: _CL.CL_Y_AXIS,
  domainClassName: _CL.CL_AXIS_DOMAIN,
  fontFamily: _CL.FONT_FAMILY,
  fontSize: 12,
  fontWeight: 400,
  getMouseDelta: function getMouseDelta(startXY, mouseXY) {
    return startXY[1] - mouseXY[1];
  },
  gridLinesStrokeStyle: "#e2e4ec",
  gridLinesStrokeWidth: 1,
  innerTickSize: 4,
  outerTickSize: 0,
  orient: "right",
  showDomain: true,
  showGridLines: false,
  showTicks: true,
  showTickLabel: true,
  strokeStyle: "#000000",
  strokeWidth: 1,
  tickPadding: 4,
  tickLabelFill: "#000000",
  tickStrokeStyle: "#000000",
  yZoomWidth: 40,
  zoomEnabled: true,
  zoomCursorClassName: _CL.CL_NS_RESIZE_CURSOR
};
YAxis.contextTypes = {
  yAxisZoom: _propTypes["default"].func.isRequired,
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  chartConfig: _propTypes["default"].object.isRequired
};
var _default = YAxis;
exports["default"] = _default;
//# sourceMappingURL=YAxis.js.map