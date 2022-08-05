"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../core/utils");

var _utils2 = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var FN_NOOP = function FN_NOOP() {};

var LineSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(LineSeries, _Component);

  function LineSeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    _this.isHover = _this.isHover.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = LineSeries.prototype;

  _proto.isHover = function isHover(moreProps) {
    // console.log("HERE")
    var _this$props = this.props,
        highlightOnHover = _this$props.highlightOnHover,
        yAccessor = _this$props.yAccessor,
        hoverTolerance = _this$props.hoverTolerance;
    if (!highlightOnHover) return false;
    var mouseXY = moreProps.mouseXY,
        currentItem = moreProps.currentItem,
        xScale = moreProps.xScale,
        plotData = moreProps.plotData;
    var _moreProps$chartConfi = moreProps.chartConfig,
        yScale = _moreProps$chartConfi.yScale,
        origin = _moreProps$chartConfi.origin;
    var xAccessor = moreProps.xAccessor;
    var x = mouseXY[0],
        y = mouseXY[1];
    var radius = hoverTolerance;

    var _getClosestItemIndexe = (0, _utils.getClosestItemIndexes)(plotData, xScale.invert(x), xAccessor),
        left = _getClosestItemIndexe.left,
        right = _getClosestItemIndexe.right;

    if (left === right) {
      var cy = yScale(yAccessor(currentItem)) + origin[1];
      var cx = xScale(xAccessor(currentItem)) + origin[0];
      var hovering1 = Math.pow(x - cx, 2) + Math.pow(y - cy, 2) < Math.pow(radius, 2);
      return hovering1;
    } else {
      var l = plotData[left];
      var r = plotData[right];
      var x1 = xScale(xAccessor(l)) + origin[0];
      var y1 = yScale(yAccessor(l)) + origin[1];
      var x2 = xScale(xAccessor(r)) + origin[0];
      var y2 = yScale(yAccessor(r)) + origin[1]; // y = m * x + b

      var m
      /* slope */
      = (y2 - y1) / (x2 - x1);
      var b
      /* y intercept */
      = -1 * m * x1 + y1;
      var desiredY = Math.round(m * x + b);
      var hovering2 = y >= desiredY - radius && y <= desiredY + radius;
      return hovering2;
    }
  };

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    var _this$props2 = this.props,
        yAccessor = _this$props2.yAccessor,
        stroke = _this$props2.stroke,
        strokeOpacity = _this$props2.strokeOpacity,
        strokeWidth = _this$props2.strokeWidth,
        hoverStrokeWidth = _this$props2.hoverStrokeWidth,
        defined = _this$props2.defined,
        strokeDasharray = _this$props2.strokeDasharray,
        interpolation = _this$props2.interpolation,
        canvasClip = _this$props2.canvasClip;
    var connectNulls = this.props.connectNulls;
    var xAccessor = moreProps.xAccessor;
    var xScale = moreProps.xScale,
        yScale = moreProps.chartConfig.yScale,
        plotData = moreProps.plotData,
        hovering = moreProps.hovering;

    if (canvasClip) {
      ctx.save();
      canvasClip(ctx, moreProps);
    }

    ctx.lineWidth = hovering ? hoverStrokeWidth : strokeWidth;
    ctx.strokeStyle = (0, _utils2.hexToRGBA)(stroke, strokeOpacity);
    ctx.setLineDash((0, _utils.getStrokeDasharray)(strokeDasharray).split(","));
    var dataSeries = (0, _d3Shape.line)().x(function (d) {
      return Math.round(xScale(xAccessor(d)));
    }).y(function (d) {
      return Math.round(yScale(yAccessor(d)));
    });

    if ((0, _utils.isDefined)(interpolation)) {
      dataSeries.curve(interpolation);
    }

    if (!connectNulls) {
      dataSeries.defined(function (d) {
        return defined(yAccessor(d));
      });
    }

    ctx.beginPath();
    dataSeries.context(ctx)(plotData);
    ctx.stroke();

    if (canvasClip) {
      ctx.restore();
    }
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var _this$props3 = this.props,
        yAccessor = _this$props3.yAccessor,
        stroke = _this$props3.stroke,
        strokeOpacity = _this$props3.strokeOpacity,
        strokeWidth = _this$props3.strokeWidth,
        hoverStrokeWidth = _this$props3.hoverStrokeWidth,
        defined = _this$props3.defined,
        strokeDasharray = _this$props3.strokeDasharray;
    var connectNulls = this.props.connectNulls;
    var _this$props4 = this.props,
        interpolation = _this$props4.interpolation,
        style = _this$props4.style;
    var xAccessor = moreProps.xAccessor,
        chartConfig = moreProps.chartConfig;
    var xScale = moreProps.xScale,
        plotData = moreProps.plotData,
        hovering = moreProps.hovering;
    var yScale = chartConfig.yScale;
    var dataSeries = (0, _d3Shape.line)().x(function (d) {
      return Math.round(xScale(xAccessor(d)));
    }).y(function (d) {
      return Math.round(yScale(yAccessor(d)));
    });

    if ((0, _utils.isDefined)(interpolation)) {
      dataSeries.curve(interpolation);
    }

    if (!connectNulls) {
      dataSeries.defined(function (d) {
        return defined(yAccessor(d));
      });
    }

    var d = dataSeries(plotData);
    var _this$props5 = this.props,
        fill = _this$props5.fill,
        className = _this$props5.className;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      style: style,
      className: className + " " + (stroke ? "" : " line-stroke"),
      d: d,
      stroke: stroke,
      strokeOpacity: strokeOpacity,
      strokeWidth: hovering ? hoverStrokeWidth : strokeWidth,
      strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
      fill: fill
    });
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        highlightOnHover = _this$props6.highlightOnHover,
        onHover = _this$props6.onHover,
        onUnHover = _this$props6.onUnHover,
        hoverProps = highlightOnHover || onHover || onUnHover ? {
      isHover: this.isHover,
      drawOn: ["mousemove", "pan"],
      canvasToDraw: _contextFn.getMouseCanvas
    } : {
      drawOn: ["pan"],
      canvasToDraw: _contextFn.getAxisCanvas
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, (0, _extends2["default"])({
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      onClickWhenHover: this.props.onClick,
      onDoubleClickWhenHover: this.props.onDoubleClick,
      onContextMenuWhenHover: this.props.onContextMenu,
      onHover: this.props.onHover,
      onUnHover: this.props.onUnHover
    }, hoverProps));
  };

  return LineSeries;
}(_react.Component);

LineSeries.defaultProps = {
  className: "line ",
  strokeWidth: 1,
  strokeOpacity: 1,
  hoverStrokeWidth: 4,
  fill: "none",
  stroke: "#4682B4",
  strokeDasharray: "Solid",
  defined: function defined(d) {
    return !isNaN(d);
  },
  hoverTolerance: 6,
  highlightOnHover: false,
  connectNulls: false,
  onClick: FN_NOOP,
  onDoubleClick: FN_NOOP,
  onContextMenu: FN_NOOP
};
var _default = LineSeries;
exports["default"] = _default;
//# sourceMappingURL=LineSeries.js.map