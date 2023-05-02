"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../../uiApi");
var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _AxisZoomCapture = _interopRequireDefault(require("./AxisZoomCapture"));
var _contextFn = require("../core/contextFn");
var _utils = require("../utils");
var _AxisFn = require("./AxisFn");
var _jsxRuntime = require("react/jsx-runtime");
var _crFont = function _crFont(_ref) {
  var fontWeight = _ref.fontWeight,
    fontSize = _ref.fontSize,
    fontFamily = _ref.fontFamily;
  return fontWeight + " " + fontSize + "px " + fontFamily;
};
var DRAW_ON = ['pan'];
var Axis = function Axis(props) {
  var getScale = props.getScale,
    edgeClip = props.edgeClip,
    zoomEnabled = props.zoomEnabled,
    zoomCursorClassName = props.zoomCursorClassName,
    bg = props.bg,
    className = props.className,
    inverted = props.inverted,
    transform = props.transform,
    getMouseDelta = props.getMouseDelta,
    axisZoomCallback = props.axisZoomCallback,
    onContextMenu = props.onContextMenu,
    onDoubleClick = props.onDoubleClick,
    _refChart = (0, _uiApi.useRef)(),
    _getAxisScale = (0, _uiApi.useCallback)(function () {
      return getScale((0, _uiApi.getRefValue)(_refChart).getMoreProps());
    }, [getScale]),
    _drawOnCanvas = (0, _useEventCallback["default"])(function (ctx, moreProps) {
      var showDomain = props.showDomain,
        showGridLines = props.showGridLines,
        showTickLabel = props.showTickLabel,
        showTicks = props.showTicks,
        transform = props.transform,
        range = props.range,
        tickLabelFill = props.tickLabelFill;
      ctx.save();
      ctx.translate(transform[0], transform[1]);
      var scale = getScale(moreProps),
        tickProps = (0, _AxisFn.tickHelper)(props, scale);
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
        ctx.textAlign = textAnchor === 'middle' ? 'center' : textAnchor;
        tickProps.ticks.forEach(function (tick) {
          (0, _AxisFn.drawEachTickLabel)(ctx, tick, tickProps);
        });
      }
      if (showDomain) {
        (0, _AxisFn.drawAxisLine)(ctx, props, range);
      }
      ctx.restore();
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    transform: (0, _utils.crCssTranslate)(transform),
    children: [zoomEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_AxisZoomCapture["default"], {
      className: className,
      zoomCursorClassName: zoomCursorClassName,
      inverted: inverted,
      bg: bg,
      axisZoomCallback: axisZoomCallback,
      getScale: _getAxisScale,
      getMouseDelta: getMouseDelta,
      onContextMenu: onContextMenu,
      onDoubleClick: onDoubleClick
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
      refComp: _refChart,
      clip: false,
      edgeClip: edgeClip,
      canvasToDraw: _contextFn.getAxisCanvas,
      canvasDraw: _drawOnCanvas,
      drawOn: DRAW_ON
    })]
  });
};
var _default = Axis;
exports["default"] = _default;
//# sourceMappingURL=Axis.js.map