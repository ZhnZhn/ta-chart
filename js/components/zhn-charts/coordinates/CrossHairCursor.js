"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CrossHairCursor = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ChartCanvas = require("../core/ChartCanvas");
var _GenericComponent = require("../core/GenericComponent");
var _contextFn = require("../core/contextFn");
var _CL = require("../CL");
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  mathRound = Math.round;
const _customX = (props, _ref) => {
  let {
    xScale,
    xAccessor,
    currentItem,
    mouseXY
  } = _ref;
  return props.snapX ? mathRound(xScale(xAccessor(currentItem))) : mouseXY[0];
};
const _crLines = (props, moreProps) => {
  const {
      mouseXY,
      currentItem,
      show,
      height,
      width
    } = moreProps,
    {
      customX,
      stroke,
      opacity,
      strokeDasharray
    } = props;
  if (!show || currentItem == null) {
    return null;
  }
  const line1 = {
      x1: 0,
      x2: width,
      y1: mouseXY[1],
      y2: mouseXY[1],
      stroke,
      strokeDasharray,
      opacity
    },
    x = customX(props, moreProps),
    line2 = {
      x1: x,
      x2: x,
      y1: 0,
      y2: height,
      stroke,
      strokeDasharray,
      opacity
    };
  return [line1, line2];
};
const CrossHairCursor = props => {
  const context = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    _drawOnCanvas = (ctx, moreProps) => {
      const lines = _crLines(props, moreProps);
      if (_isArr(lines)) {
        const {
            margin,
            ratio
          } = context,
          originX = 0.5 * ratio + margin.left,
          originY = 0.5 * ratio + margin.top;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        ctx.translate(originX, originY);
        lines.forEach(line => {
          const dashArray = (0, _utils.getStrokeDasharray)(line.strokeDasharray).split(",").map(d => +d);
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
    _renderSvg = moreProps => {
      const lines = _crLines(props, moreProps);
      return _isArr(lines) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        className: (0, _crCn.default)(_CL.CL_CHARTS_CROSSHAIR, props.className),
        children: lines.map((_ref2, index) => {
          let {
            strokeDasharray,
            ...restProps
          } = _ref2;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
            strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
            ...restProps
          }, index);
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
exports.CrossHairCursor = CrossHairCursor;
CrossHairCursor.defaultProps = {
  customX: _customX,
  opacity: 0.3,
  snapX: true,
  stroke: "#000000",
  strokeDasharray: "ShortDash"
};
//# sourceMappingURL=CrossHairCursor.js.map