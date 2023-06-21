"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RSISeries = void 0;
var _uiApi = require("../../uiApi");
var _LineSeries = require("./LineSeries");
var _StraightLine = _interopRequireDefault(require("./StraightLine"));
var _SVGComponent = _interopRequireDefault(require("./SVGComponent"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const mathRound = Math.round,
  mathRandom = Math.random,
  _crId = () => String(mathRound(mathRandom() * 10000 * 10000)),
  _crClipPathId = () => "rsi-clip-" + _crId(),
  _crClipPathStyle = id => ({
    clipPath: "url(#" + id + ")"
  });
class RSISeries extends _uiApi.Component {
  constructor(props) {
    super(props);
    this.topAndBottomClip = (ctx, moreProps) => {
      const {
          overSold,
          overBought
        } = this.props,
        {
          chartConfig: {
            yScale,
            width
          }
        } = moreProps;
      ctx.beginPath();
      ctx.rect(0, yScale(overSold), width, yScale(overBought) - yScale(overSold));
      ctx.clip();
    };
    this.mainClip = (ctx, moreProps) => {
      const {
          overSold,
          overBought
        } = this.props,
        {
          chartConfig: {
            yScale,
            width,
            height
          }
        } = moreProps;
      ctx.beginPath();
      ctx.rect(0, 0, width, yScale(overSold));
      ctx.rect(0, yScale(overBought), width, height - yScale(overBought));
      ctx.clip();
    };
    this.renderClip = moreProps => {
      const {
          overSold,
          overBought
        } = this.props,
        {
          chartConfig: {
            yScale,
            width,
            height
          }
        } = moreProps;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("defs", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
          id: this.clipPathId1,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            x: 0,
            y: yScale(overSold),
            width: width,
            height: yScale(overBought) - yScale(overSold)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("clipPath", {
          id: this.clipPathId2,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            x: 0,
            y: 0,
            width: width,
            height: yScale(overSold)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            x: 0,
            y: yScale(overBought),
            width: width,
            height: height - yScale(overBought)
          })]
        })]
      });
    };
    this.clipPathId1 = _crClipPathId();
    this.clipPathId2 = _crClipPathId();
  }
  render() {
    const {
        className,
        opacity,
        stroke,
        strokeDasharray,
        strokeWidth,
        yAccessor,
        overSold,
        middle,
        overBought
      } = this.props,
      style1 = _crClipPathStyle(this.clipPathId1),
      style2 = _crClipPathStyle(this.clipPathId2);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SVGComponent.default, {
        children: this.renderClip
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine.default, {
        opacity: opacity.top,
        stroke: stroke.top,
        strokeWidth: strokeWidth.top,
        strokeDasharray: strokeDasharray.top,
        yValue: overSold
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine.default, {
        opacity: opacity.middle,
        stroke: stroke.middle,
        strokeWidth: strokeWidth.middle,
        strokeDasharray: strokeDasharray.middle,
        yValue: middle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine.default, {
        opacity: opacity.bottom,
        stroke: stroke.bottom,
        strokeWidth: strokeWidth.bottom,
        strokeDasharray: strokeDasharray.bottom,
        yValue: overBought
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries.LineSeries, {
        style: style1,
        canvasClip: this.topAndBottomClip,
        className: className,
        yAccessor: yAccessor,
        stroke: stroke.insideThreshold || stroke.line,
        strokeWidth: strokeWidth.insideThreshold,
        strokeDasharray: strokeDasharray.line
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries.LineSeries, {
        style: style2,
        canvasClip: this.mainClip
        /* baseAt={yScale => yScale(middle)} */,
        className: className,
        yAccessor: yAccessor,
        stroke: stroke.outsideThreshold || stroke.line,
        strokeWidth: strokeWidth.outsideThreshold,
        strokeDasharray: strokeDasharray.line
        /* fill={stroke.outsideThreshold || stroke.line} */
      })]
    });
  }
}
exports.RSISeries = RSISeries;
const SHORT_DASH = 'ShortDash';
RSISeries.defaultProps = {
  className: _CL.CL_RSI_SERIES,
  stroke: {
    line: "#000000",
    top: "#b8b2bb",
    middle: "#8795a1",
    bottom: "#b8c2cc",
    outsideThreshold: "#b300b3",
    insideThreshold: "#ffccff"
  },
  opacity: {
    top: 1,
    middle: 1,
    bottom: 1
  },
  strokeDasharray: {
    line: 'Solid',
    top: SHORT_DASH,
    middle: SHORT_DASH,
    bottom: SHORT_DASH
  },
  strokeWidth: {
    outsideThreshold: 1,
    insideThreshold: 1,
    top: 1,
    middle: 1,
    bottom: 1
  },
  overSold: 70,
  middle: 50,
  overBought: 30
};
//# sourceMappingURL=RSISeries.js.map