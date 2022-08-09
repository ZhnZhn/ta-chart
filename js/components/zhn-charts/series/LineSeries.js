"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../core/utils");

var _utils2 = require("../utils");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var FN_NOOP = function FN_NOOP() {};

var LineSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(LineSeries, _Component);

  function LineSeries() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.isHover = function (moreProps) {
      var _this$props = _this.props,
          yAccessor = _this$props.yAccessor,
          hoverTolerance = _this$props.hoverTolerance,
          highlightOnHover = _this$props.highlightOnHover;

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
            cx = xScale(xAccessor(currentItem)) + origin[0],
            hovering1 = Math.pow(x - cx, 2) + Math.pow(y - cy, 2) < Math.pow(radius, 2);
        return hovering1;
      } else {
        var l = plotData[left],
            r = plotData[right],
            x1 = xScale(xAccessor(l)) + origin[0],
            y1 = yScale(yAccessor(l)) + origin[1],
            x2 = xScale(xAccessor(r)) + origin[0],
            y2 = yScale(yAccessor(r)) + origin[1] // y = m * x + b
        ,
            m
        /* slope */
        = (y2 - y1) / (x2 - x1),
            b
        /* y intercept */
        = -1 * m * x1 + y1,
            desiredY = Math.round(m * x + b),
            hovering2 = y >= desiredY - radius && y <= desiredY + radius;
        return hovering2;
      }
    };

    _this.drawOnCanvas = function (ctx, moreProps) {
      var _this$props2 = _this.props,
          yAccessor = _this$props2.yAccessor,
          stroke = _this$props2.stroke,
          strokeOpacity = _this$props2.strokeOpacity,
          strokeWidth = _this$props2.strokeWidth,
          hoverStrokeWidth = _this$props2.hoverStrokeWidth,
          defined = _this$props2.defined,
          strokeDasharray = _this$props2.strokeDasharray,
          interpolation = _this$props2.interpolation,
          canvasClip = _this$props2.canvasClip,
          connectNulls = _this$props2.connectNulls,
          hovering = moreProps.hovering,
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

    _this.renderSVG = function (moreProps) {
      var _this$props3 = _this.props,
          yAccessor = _this$props3.yAccessor,
          stroke = _this$props3.stroke,
          strokeOpacity = _this$props3.strokeOpacity,
          strokeWidth = _this$props3.strokeWidth,
          strokeDasharray = _this$props3.strokeDasharray,
          hoverStrokeWidth = _this$props3.hoverStrokeWidth,
          defined = _this$props3.defined,
          connectNulls = _this$props3.connectNulls,
          interpolation = _this$props3.interpolation,
          style = _this$props3.style,
          xAccessor = moreProps.xAccessor,
          xScale = moreProps.xScale,
          plotData = moreProps.plotData,
          hovering = moreProps.hovering,
          chartConfig = moreProps.chartConfig,
          yScale = chartConfig.yScale,
          dataSeries = (0, _d3Shape.line)().x(function (d) {
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

      var d = dataSeries(plotData),
          _this$props4 = _this.props,
          fill = _this$props4.fill,
          className = _this$props4.className;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        style: style,
        className: className + " " + (stroke ? '' : _CL.CL_LINE_STROKE),
        d: d,
        stroke: stroke,
        strokeOpacity: strokeOpacity,
        strokeWidth: hovering ? hoverStrokeWidth : strokeWidth,
        strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
        fill: fill
      });
    };

    return _this;
  }

  var _proto = LineSeries.prototype;

  _proto.render = function render() {
    var _this$props5 = this.props,
        highlightOnHover = _this$props5.highlightOnHover,
        onHover = _this$props5.onHover,
        onUnHover = _this$props5.onUnHover,
        hoverProps = highlightOnHover || onHover || onUnHover ? {
      isHover: this.isHover,
      drawOn: ['mousemove', 'pan'],
      canvasToDraw: _contextFn.getMouseCanvas
    } : {
      drawOn: ['pan'],
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
  className: _CL.CL_LINE,
  strokeWidth: 1,
  strokeOpacity: 1,
  hoverStrokeWidth: 4,
  fill: 'none',
  stroke: '#4682b4',
  strokeDasharray: 'Solid',
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