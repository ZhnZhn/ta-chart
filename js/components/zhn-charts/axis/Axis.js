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
      var transform = props.transform;
      ctx.save();
      ctx.translate(transform[0], transform[1]);
      var tickProps = (0, _AxisFn.tickHelper)(props, getScale(moreProps));
      if (props.showTicks) {
        (0, _AxisFn.drawTicks)(ctx, tickProps);
      }
      if (props.showGridLines) {
        (0, _AxisFn.drawGridLines)(ctx, tickProps, moreProps);
      }
      if (props.showTickLabel) {
        (0, _AxisFn.drawTickLabels)(ctx, tickProps);
      }
      if (props.showDomain) {
        (0, _AxisFn.drawAxisLine)(ctx, props);
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