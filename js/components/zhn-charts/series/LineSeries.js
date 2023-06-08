"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Shape = require("../d3Shape");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _utils = require("../core/utils");
var _utils2 = require("../utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

var FN_NOOP = function FN_NOOP() {},
  mathRound = Math.round,
  mathPow = Math.pow;
var LineSeries = function LineSeries(props) {
  var yAccessor = props.yAccessor,
    hoverTolerance = props.hoverTolerance,
    highlightOnHover = props.highlightOnHover,
    stroke = props.stroke,
    strokeOpacity = props.strokeOpacity,
    strokeWidth = props.strokeWidth,
    strokeDasharray = props.strokeDasharray,
    hoverStrokeWidth = props.hoverStrokeWidth,
    defined = props.defined,
    connectNulls = props.connectNulls,
    interpolation = props.interpolation,
    style = props.style,
    fill = props.fill,
    className = props.className,
    canvasClip = props.canvasClip,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    onContextMenu = props.onContextMenu,
    onHover = props.onHover,
    onUnHover = props.onUnHover,
    _isHover = function _isHover(moreProps) {
      if (!highlightOnHover) {
        return false;
      }
      var mouseXY = moreProps.mouseXY,
        currentItem = moreProps.currentItem,
        xScale = moreProps.xScale,
        xAccessor = moreProps.xAccessor,
        plotData = moreProps.plotData,
        _moreProps$chartConfi = moreProps.chartConfig,
        yScale = _moreProps$chartConfi.yScale,
        origin = _moreProps$chartConfi.origin,
        x = mouseXY[0],
        y = mouseXY[1],
        radius = hoverTolerance,
        _getClosestItemIndexe = (0, _utils.getClosestItemIndexes)(plotData, xScale.invert(x), xAccessor),
        left = _getClosestItemIndexe.left,
        right = _getClosestItemIndexe.right;
      if (left === right) {
        var cy = yScale(yAccessor(currentItem)) + origin[1],
          cx = xScale(xAccessor(currentItem)) + origin[0];
        return mathPow(x - cx, 2) + mathPow(y - cy, 2) < mathPow(radius, 2);
      } else {
        var l = plotData[left],
          r = plotData[right],
          x1 = xScale(xAccessor(l)) + origin[0],
          y1 = yScale(yAccessor(l)) + origin[1],
          x2 = xScale(xAccessor(r)) + origin[0],
          y2 = yScale(yAccessor(r)) + origin[1]
          // y = m * x + b
          ,
          m = (y2 - y1) / (x2 - x1),
          b = -1 * m * x1 + y1,
          desiredY = mathRound(m * x + b);
        return y >= desiredY - radius && y <= desiredY + radius;
      }
    },
    _renderSVG = function _renderSVG(moreProps) {
      var xAccessor = moreProps.xAccessor,
        xScale = moreProps.xScale,
        plotData = moreProps.plotData,
        hovering = moreProps.hovering,
        chartConfig = moreProps.chartConfig,
        yScale = chartConfig.yScale,
        dataSeries = (0, _d3Shape.d3Line)().x(function (d) {
          return mathRound(xScale(xAccessor(d)));
        }).y(function (d) {
          return mathRound(yScale(yAccessor(d)));
        });
      if ((0, _utils.isDefined)(interpolation)) {
        dataSeries.curve(interpolation);
      }
      if (!connectNulls) {
        dataSeries.defined(function (d) {
          return defined(yAccessor(d));
        });
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        style: style,
        className: className + " " + (stroke ? '' : _CL.CL_LINE_STROKE),
        d: dataSeries(plotData),
        stroke: stroke,
        strokeOpacity: strokeOpacity,
        strokeWidth: hovering ? hoverStrokeWidth : strokeWidth,
        strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
        fill: fill
      });
    },
    _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
      var hovering = moreProps.hovering,
        xScale = moreProps.xScale,
        xAccessor = moreProps.xAccessor,
        plotData = moreProps.plotData,
        yScale = moreProps.chartConfig.yScale;
      if (canvasClip) {
        ctx.save();
        canvasClip(ctx, moreProps);
      }
      ctx.lineWidth = hovering ? hoverStrokeWidth : strokeWidth;
      ctx.strokeStyle = (0, _utils2.hexToRGBA)(stroke, strokeOpacity);
      ctx.setLineDash((0, _utils.getStrokeDasharray)(strokeDasharray).split(","));
      var dataSeries = (0, _d3Shape.d3Line)().x(function (d) {
        return mathRound(xScale(xAccessor(d)));
      }).y(function (d) {
        return mathRound(yScale(yAccessor(d)));
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
    },
    _hoverProps = highlightOnHover || onHover || onUnHover ? {
      isHover: _isHover,
      drawOn: ['mousemove', 'pan'],
      canvasToDraw: _contextFn.getMouseCanvas
    } : {
      drawOn: ['pan'],
      canvasToDraw: _contextFn.getAxisCanvas
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], (0, _extends2["default"])({
    svgDraw: _renderSVG,
    canvasDraw: _drawOnCanvas,
    onClickWhenHover: onClick,
    onDoubleClickWhenHover: onDoubleClick,
    onContextMenuWhenHover: onContextMenu,
    onHover: onHover,
    onUnHover: onUnHover
  }, _hoverProps));
};
var DF_DEFINED = function DF_DEFINED(d) {
  return !isNaN(d);
};
LineSeries.defaultProps = {
  className: _CL.CL_LINE,
  strokeWidth: 1,
  strokeOpacity: 1,
  hoverStrokeWidth: 4,
  fill: 'none',
  stroke: '#4682b4',
  strokeDasharray: 'Solid',
  defined: DF_DEFINED,
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