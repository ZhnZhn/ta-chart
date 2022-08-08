"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _LineSeries = _interopRequireDefault(require("./LineSeries"));

var _StraightLine = _interopRequireDefault(require("./StraightLine"));

var _SVGComponent = _interopRequireDefault(require("./SVGComponent"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _crId = function _crId() {
  return String(Math.round(Math.random() * 10000 * 10000));
},
    _crClipPathId = function _crClipPathId() {
  return "rsi-clip-" + _crId();
},
    _crClipPathStyle = function _crClipPathStyle(id) {
  return {
    clipPath: "url(#" + id + ")"
  };
};

var RSISeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(RSISeries, _Component);

  function RSISeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.topAndBottomClip = function (ctx, moreProps) {
      var _this$props = _this.props,
          overSold = _this$props.overSold,
          overBought = _this$props.overBought,
          _moreProps$chartConfi = moreProps.chartConfig,
          yScale = _moreProps$chartConfi.yScale,
          width = _moreProps$chartConfi.width;
      ctx.beginPath();
      ctx.rect(0, yScale(overSold), width, yScale(overBought) - yScale(overSold));
      ctx.clip();
    };

    _this.mainClip = function (ctx, moreProps) {
      var _this$props2 = _this.props,
          overSold = _this$props2.overSold,
          overBought = _this$props2.overBought,
          _moreProps$chartConfi2 = moreProps.chartConfig,
          yScale = _moreProps$chartConfi2.yScale,
          width = _moreProps$chartConfi2.width,
          height = _moreProps$chartConfi2.height;
      ctx.beginPath();
      ctx.rect(0, 0, width, yScale(overSold));
      ctx.rect(0, yScale(overBought), width, height - yScale(overBought));
      ctx.clip();
    };

    _this.renderClip = function (moreProps) {
      var _this$props3 = _this.props,
          overSold = _this$props3.overSold,
          overBought = _this$props3.overBought,
          _moreProps$chartConfi3 = moreProps.chartConfig,
          yScale = _moreProps$chartConfi3.yScale,
          width = _moreProps$chartConfi3.width,
          height = _moreProps$chartConfi3.height;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("defs", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
          id: _this.clipPathId1,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            x: 0,
            y: yScale(overSold),
            width: width,
            height: yScale(overBought) - yScale(overSold)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("clipPath", {
          id: _this.clipPathId2,
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

    _this.clipPathId1 = _crClipPathId();
    _this.clipPathId2 = _crClipPathId();
    return _this;
  }

  var _proto = RSISeries.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        className = _this$props4.className,
        opacity = _this$props4.opacity,
        stroke = _this$props4.stroke,
        strokeDasharray = _this$props4.strokeDasharray,
        strokeWidth = _this$props4.strokeWidth,
        yAccessor = _this$props4.yAccessor,
        overSold = _this$props4.overSold,
        middle = _this$props4.middle,
        overBought = _this$props4.overBought,
        style1 = _crClipPathStyle(this.clipPathId1),
        style2 = _crClipPathStyle(this.clipPathId2);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SVGComponent["default"], {
        children: this.renderClip
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        opacity: opacity.top,
        stroke: stroke.top,
        strokeWidth: strokeWidth.top,
        strokeDasharray: strokeDasharray.top,
        yValue: overSold
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        opacity: opacity.middle,
        stroke: stroke.middle,
        strokeWidth: strokeWidth.middle,
        strokeDasharray: strokeDasharray.middle,
        yValue: middle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        opacity: opacity.bottom,
        stroke: stroke.bottom,
        strokeWidth: strokeWidth.bottom,
        strokeDasharray: strokeDasharray.bottom,
        yValue: overBought
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries["default"], {
        style: style1,
        canvasClip: this.topAndBottomClip,
        className: className,
        yAccessor: yAccessor,
        stroke: stroke.insideThreshold || stroke.line,
        strokeWidth: strokeWidth.insideThreshold,
        strokeDasharray: strokeDasharray.line
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries["default"], {
        style: style2,
        canvasClip: this.mainClip
        /* baseAt={yScale => yScale(middle)} */
        ,
        className: className,
        yAccessor: yAccessor,
        stroke: stroke.outsideThreshold || stroke.line,
        strokeWidth: strokeWidth.outsideThreshold,
        strokeDasharray: strokeDasharray.line
        /* fill={stroke.outsideThreshold || stroke.line} */

      })]
    });
  };

  return RSISeries;
}(_react.Component);

var SHORT_DASH = 'ShortDash';
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
var _default = RSISeries;
exports["default"] = _default;
//# sourceMappingURL=RSISeries.js.map