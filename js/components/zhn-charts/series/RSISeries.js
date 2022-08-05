"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _LineSeries = _interopRequireDefault(require("./LineSeries"));

var _StraightLine = _interopRequireDefault(require("./StraightLine"));

var _SVGComponent = _interopRequireDefault(require("./SVGComponent"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var RSISeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(RSISeries, _Component);

  function RSISeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderClip = _this.renderClip.bind((0, _assertThisInitialized2["default"])(_this));
    _this.topAndBottomClip = _this.topAndBottomClip.bind((0, _assertThisInitialized2["default"])(_this));
    _this.mainClip = _this.mainClip.bind((0, _assertThisInitialized2["default"])(_this));
    var id1 = String(Math.round(Math.random() * 10000 * 10000));
    _this.clipPathId1 = "rsi-clip-" + id1;
    var id2 = String(Math.round(Math.random() * 10000 * 10000));
    _this.clipPathId2 = "rsi-clip-" + id2;
    return _this;
  }

  var _proto = RSISeries.prototype;

  _proto.topAndBottomClip = function topAndBottomClip(ctx, moreProps) {
    var chartConfig = moreProps.chartConfig;
    var _this$props = this.props,
        overSold = _this$props.overSold,
        overBought = _this$props.overBought;
    var yScale = chartConfig.yScale,
        width = chartConfig.width;
    ctx.beginPath();
    ctx.rect(0, yScale(overSold), width, yScale(overBought) - yScale(overSold));
    ctx.clip();
  };

  _proto.mainClip = function mainClip(ctx, moreProps) {
    var chartConfig = moreProps.chartConfig;
    var _this$props2 = this.props,
        overSold = _this$props2.overSold,
        overBought = _this$props2.overBought;
    var yScale = chartConfig.yScale,
        width = chartConfig.width,
        height = chartConfig.height;
    ctx.beginPath();
    ctx.rect(0, 0, width, yScale(overSold));
    ctx.rect(0, yScale(overBought), width, height - yScale(overBought));
    ctx.clip();
  };

  _proto.renderClip = function renderClip(moreProps) {
    var chartConfig = moreProps.chartConfig;
    var _this$props3 = this.props,
        overSold = _this$props3.overSold,
        overBought = _this$props3.overBought;
    var yScale = chartConfig.yScale,
        width = chartConfig.width,
        height = chartConfig.height;
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

  _proto.render = function render() {
    var _this$props4 = this.props,
        className = _this$props4.className,
        stroke = _this$props4.stroke,
        opacity = _this$props4.opacity,
        strokeDasharray = _this$props4.strokeDasharray,
        strokeWidth = _this$props4.strokeWidth;
    var yAccessor = this.props.yAccessor;
    var _this$props5 = this.props,
        overSold = _this$props5.overSold,
        middle = _this$props5.middle,
        overBought = _this$props5.overBought;
    var style1 = {
      "clipPath": "url(#" + this.clipPathId1 + ")"
    };
    var style2 = {
      "clipPath": "url(#" + this.clipPathId2 + ")"
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SVGComponent["default"], {
        children: this.renderClip
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        stroke: stroke.top,
        opacity: opacity.top,
        yValue: overSold,
        strokeDasharray: strokeDasharray.top,
        strokeWidth: strokeWidth.top
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        stroke: stroke.middle,
        opacity: opacity.middle,
        yValue: middle,
        strokeDasharray: strokeDasharray.middle,
        strokeWidth: strokeWidth.middle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StraightLine["default"], {
        stroke: stroke.bottom,
        opacity: opacity.bottom,
        yValue: overBought,
        strokeDasharray: strokeDasharray.bottom,
        strokeWidth: strokeWidth.bottom
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

RSISeries.defaultProps = {
  className: _CL.CL_RSI_SERIES,
  stroke: {
    line: "#000000",
    top: "#B8C2CC",
    middle: "#8795A1",
    bottom: "#B8C2CC",
    outsideThreshold: "#b300b3",
    insideThreshold: "#ffccff"
  },
  opacity: {
    top: 1,
    middle: 1,
    bottom: 1
  },
  strokeDasharray: {
    line: "Solid",
    top: "ShortDash",
    middle: "ShortDash",
    bottom: "ShortDash"
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