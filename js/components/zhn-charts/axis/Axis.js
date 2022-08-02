"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Axis = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../core/utils");

var _GenericChartComponent = require("../core2/GenericChartComponent");

var _AxisZoomCapture = require("./AxisZoomCapture");

var _AxisFn = require("./AxisFn");

var _jsxRuntime = require("react/jsx-runtime");

var _crFont = function _crFont(_ref) {
  var fontWeight = _ref.fontWeight,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return fontWeight + " " + fontSize + "px " + fontFamily;
};

var Axis = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Axis, _React$Component);

  function Axis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.chartRef = /*#__PURE__*/_react["default"].createRef();

    _this.getMoreProps = function () {
      return _this.chartRef.current.getMoreProps();
    };

    _this.drawOnCanvas = function (ctx, moreProps) {
      var _this$props = _this.props,
          showDomain = _this$props.showDomain,
          showGridLines = _this$props.showGridLines,
          showTickLabel = _this$props.showTickLabel,
          showTicks = _this$props.showTicks,
          transform = _this$props.transform,
          range = _this$props.range,
          getScale = _this$props.getScale,
          tickLabelFill = _this$props.tickLabelFill;
      ctx.save();
      ctx.translate(transform[0], transform[1]);
      var scale = getScale(moreProps),
          tickProps = (0, _AxisFn.tickHelper)(_this.props, scale);

      if (showTicks) {
        (0, _AxisFn.drawTicks)(ctx, tickProps);
      }

      if (showGridLines) {
        tickProps.ticks.forEach(function (tick) {
          (0, _AxisFn.drawGridLine)(ctx, tick, tickProps, moreProps);
        });
      }

      if (showTickLabel) {
        var textAnchor = tickProps.textAnchor;
        ctx.font = _crFont(tickProps);

        if (tickLabelFill !== undefined) {
          ctx.fillStyle = tickLabelFill;
        }

        ctx.textAlign = textAnchor === "middle" ? "center" : textAnchor;
        tickProps.ticks.forEach(function (tick) {
          (0, _AxisFn.drawEachTickLabel)(ctx, tick, tickProps);
        });
      }

      if (showDomain) {
        (0, _AxisFn.drawAxisLine)(ctx, _this.props, range);
      }

      ctx.restore();
    };

    return _this;
  }

  var _proto = Axis.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        bg = _this$props2.bg,
        axisZoomCallback = _this$props2.axisZoomCallback,
        className = _this$props2.className,
        zoomCursorClassName = _this$props2.zoomCursorClassName,
        zoomEnabled = _this$props2.zoomEnabled,
        getScale = _this$props2.getScale,
        inverted = _this$props2.inverted,
        transform = _this$props2.transform,
        getMouseDelta = _this$props2.getMouseDelta,
        edgeClip = _this$props2.edgeClip,
        onContextMenu = _this$props2.onContextMenu,
        onDoubleClick = _this$props2.onDoubleClick;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      transform: "translate(" + transform[0] + ", " + transform[1] + ")",
      children: [zoomEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_AxisZoomCapture.AxisZoomCapture, {
        bg: bg,
        getScale: getScale,
        getMoreProps: this.getMoreProps,
        getMouseDelta: getMouseDelta,
        axisZoomCallback: axisZoomCallback,
        className: className,
        zoomCursorClassName: zoomCursorClassName,
        inverted: inverted,
        onContextMenu: onContextMenu,
        onDoubleClick: onDoubleClick
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
        ref: this.chartRef,
        canvasToDraw: _utils.getAxisCanvas,
        clip: false,
        edgeClip: edgeClip,
        canvasDraw: this.drawOnCanvas,
        drawOn: ["pan"]
      })]
    });
  };

  return Axis;
}(_react["default"].Component);

exports.Axis = Axis;
Axis.defaultProps = {
  edgeClip: false,
  zoomEnabled: false,
  zoomCursorClassName: ""
};
//# sourceMappingURL=Axis.js.map