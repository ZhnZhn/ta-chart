"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ChartCanvas = require("../core/ChartCanvas");
var _GenericComponent = require("../core/GenericComponent");
var _contextFn = require("../core/contextFn");
var _CL = require("../CL");
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["strokeDasharray"];
var _isArr = Array.isArray,
  mathRound = Math.round;
var _customX = function _customX(props, _ref) {
  var xScale = _ref.xScale,
    xAccessor = _ref.xAccessor,
    currentItem = _ref.currentItem,
    mouseXY = _ref.mouseXY;
  return props.snapX ? mathRound(xScale(xAccessor(currentItem))) : mouseXY[0];
};
var _crLines = function _crLines(props, moreProps) {
  var mouseXY = moreProps.mouseXY,
    currentItem = moreProps.currentItem,
    show = moreProps.show,
    height = moreProps.height,
    width = moreProps.width,
    customX = props.customX,
    stroke = props.stroke,
    opacity = props.opacity,
    strokeDasharray = props.strokeDasharray;
  if (!show || currentItem == null) {
    return null;
  }
  var line1 = {
      x1: 0,
      x2: width,
      y1: mouseXY[1],
      y2: mouseXY[1],
      stroke: stroke,
      strokeDasharray: strokeDasharray,
      opacity: opacity
    },
    x = customX(props, moreProps),
    line2 = {
      x1: x,
      x2: x,
      y1: 0,
      y2: height,
      stroke: stroke,
      strokeDasharray: strokeDasharray,
      opacity: opacity
    };
  return [line1, line2];
};
var CrossHairCursor = function CrossHairCursor(props) {
  var context = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
      var lines = _crLines(props, moreProps);
      if (_isArr(lines)) {
        var margin = context.margin,
          ratio = context.ratio,
          originX = 0.5 * ratio + margin.left,
          originY = 0.5 * ratio + margin.top;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        ctx.translate(originX, originY);
        lines.forEach(function (line) {
          var dashArray = (0, _utils.getStrokeDasharray)(line.strokeDasharray).split(",").map(function (d) {
            return +d;
          });
          ctx.strokeStyle = (0, _utils.hexToRGBA)(line.stroke, line.opacity);
          ctx.setLineDash(dashArray);
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
        ctx.restore();
      }
    },
    _renderSvg = function _renderSvg(moreProps) {
      var lines = _crLines(props, moreProps);
      return _isArr(lines) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        className: (0, _crCn["default"])(_CL.CL_CHARTS_CROSSHAIR, props.className),
        children: lines.map(function (_ref2, index) {
          var strokeDasharray = _ref2.strokeDasharray,
            restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, _excluded);
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({
            strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray)
          }, restProps), index);
        })
      }) : null;
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericComponent.GenericComponent, {
    clip: false,
    canvasDraw: _drawOnCanvas,
    canvasToDraw: _contextFn.getMouseCanvas,
    drawOn: ["mousemove", "pan", "drag"],
    svgDraw: _renderSvg
  });
};
CrossHairCursor.defaultProps = {
  customX: _customX,
  opacity: 0.3,
  snapX: true,
  stroke: "#000000",
  strokeDasharray: "ShortDash"
};
var _default = CrossHairCursor;
exports["default"] = _default;
//# sourceMappingURL=CrossHairCursor.js.map