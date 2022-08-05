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

var _excluded = ["getMouseDelta", "outerTickSize", "showTicks", "strokeStyle", "strokeWidth", "zoomEnabled"];

var XAxis = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(XAxis, _React$Component);

  function XAxis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.axisZoomCallback = function (newXDomain) {
      var xAxisZoom = _this.context.xAxisZoom;
      xAxisZoom(newXDomain);
    };

    _this.helper = function () {
      var _this$props = _this.props,
          axisAt = _this$props.axisAt,
          xZoomHeight = _this$props.xZoomHeight,
          orient = _this$props.orient,
          ticks = _this$props.ticks,
          _this$context$chartCo = _this.context.chartConfig,
          width = _this$context$chartCo.width,
          height = _this$context$chartCo.height,
          x = 0,
          w = width,
          h = xZoomHeight;
      var axisLocation;

      switch (axisAt) {
        case "top":
          axisLocation = 0;
          break;

        case "bottom":
          axisLocation = height;
          break;

        case "middle":
          axisLocation = height / 2;
          break;

        default:
          axisLocation = axisAt;
      }

      var y = orient === "top" ? -xZoomHeight : 0;
      return {
        transform: [0, axisLocation],
        range: [0, width],
        getScale: _this.getXScale,
        bg: {
          x: x,
          y: y,
          h: h,
          w: w
        },
        ticks: ticks != null ? ticks : _this.getXTicks(width)
      };
    };

    _this.getXTicks = function (width) {
      if (width < 400) {
        return 2;
      }

      if (width < 500) {
        return 6;
      }

      return 8;
    };

    _this.getXScale = function (moreProps) {
      var scale = moreProps.xScale,
          width = moreProps.width;

      if (scale.invert) {
        var trueRange = [0, width],
            trueDomain = trueRange.map(scale.invert);
        return scale.copy().domain(trueDomain).range(trueRange);
      }

      return scale;
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
        _this$helper = this.helper(),
        moreProps = (0, _extends2["default"])({}, _this$helper);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Axis.Axis, (0, _extends2["default"])({}, restProps, moreProps, {
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
}(_react["default"].Component);

XAxis.defaultProps = {
  axisAt: "bottom",
  className: _CL.CL_X_AXIS,
  domainClassName: _CL.CL_AXIS_DOMAIN,
  fontFamily: _CL.FONT_FAMILY,
  fontSize: 12,
  fontWeight: 400,
  getMouseDelta: function getMouseDelta(startXY, mouseXY) {
    return startXY[0] - mouseXY[0];
  },
  gridLinesStrokeStyle: "#e2e4ec",
  gridLinesStrokeWidth: 1,
  orient: "bottom",
  outerTickSize: 0,
  innerTickSize: 4,
  showDomain: true,
  showGridLines: false,
  showTicks: true,
  showTickLabel: true,
  strokeStyle: "#000000",
  strokeWidth: 1,
  tickPadding: 4,
  tickLabelFill: "#000000",
  tickStrokeStyle: "#000000",
  xZoomHeight: 25,
  zoomEnabled: true,
  zoomCursorClassName: _CL.CL_EW_RESIZE_CURSOR
};
XAxis.contextTypes = {
  chartConfig: _propTypes["default"].object.isRequired,
  xAxisZoom: _propTypes["default"].func.isRequired
};
var _default = XAxis;
exports["default"] = _default;
//# sourceMappingURL=XAxis.js.map