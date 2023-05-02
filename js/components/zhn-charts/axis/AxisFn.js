"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.tickHelper = exports.drawTicks = exports.drawTickLabels = exports.drawGridLines = exports.drawAxisLine = exports.crScale = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _d3Array = require("d3-array");
var _d3Force = require("d3-force");
var _utils = require("../utils");
var _excluded = ["orient", "innerTickSize", "tickFormat", "tickPadding", "tickLabelFill", "tickStrokeWidth", "tickStrokeDasharray", "fontSize", "fontFamily", "fontWeight", "showTicks", "showTickLabel", "ticks", "tickValues", "tickStrokeStyle", "tickInterval", "tickIntervalFunction"];
var drawEachTick = function drawEachTick(ctx, tick, result) {
  var tickStrokeWidth = result.tickStrokeWidth,
    tickStrokeDasharray = result.tickStrokeDasharray;
  ctx.beginPath();
  ctx.moveTo(tick.x1, tick.y1);
  ctx.lineTo(tick.x2, tick.y2);
  ctx.lineWidth = tickStrokeWidth;
  var lineDash = (0, _utils.getStrokeDasharrayCanvas)(tickStrokeDasharray);
  ctx.setLineDash(lineDash);
  ctx.stroke();
};
var tickHelper = function tickHelper(props, scale) {
  var orient = props.orient,
    _props$innerTickSize = props.innerTickSize,
    innerTickSize = _props$innerTickSize === void 0 ? 4 : _props$innerTickSize,
    tickFormat = props.tickFormat,
    _props$tickPadding = props.tickPadding,
    tickPadding = _props$tickPadding === void 0 ? 4 : _props$tickPadding,
    tickLabelFill = props.tickLabelFill,
    tickStrokeWidth = props.tickStrokeWidth,
    tickStrokeDasharray = props.tickStrokeDasharray,
    _props$fontSize = props.fontSize,
    fontSize = _props$fontSize === void 0 ? 12 : _props$fontSize,
    fontFamily = props.fontFamily,
    fontWeight = props.fontWeight,
    showTicks = props.showTicks,
    showTickLabel = props.showTickLabel,
    tickArguments = props.ticks,
    tickValuesProp = props.tickValues,
    tickStrokeStyle = props.tickStrokeStyle,
    tickInterval = props.tickInterval,
    tickIntervalFunction = props.tickIntervalFunction,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var tickValues;
  if (tickValuesProp !== undefined) {
    if (typeof tickValuesProp === "function") {
      tickValues = tickValuesProp(scale.domain());
    } else {
      tickValues = tickValuesProp;
    }
  } else if (tickInterval !== undefined) {
    var _scale$domain = scale.domain(),
      min = _scale$domain[0],
      max = _scale$domain[1],
      baseTickValues = (0, _d3Array.range)(min, max, (max - min) / tickInterval);
    tickValues = tickIntervalFunction ? tickIntervalFunction(min, max, tickInterval) : baseTickValues;
  } else if (scale.ticks !== undefined) {
    tickValues = scale.ticks(tickArguments);
  } else {
    tickValues = scale.domain();
  }
  var format = tickFormat === undefined ? scale.tickFormat(tickArguments) : function (d) {
      return tickFormat(d) || "";
    },
    sign = orient === "top" || orient === "left" ? -1 : 1,
    tickSpacing = Math.max(innerTickSize, 0) + tickPadding;
  var ticks, dy, canvas_dy, textAnchor;
  if (orient === "bottom" || orient === "top") {
    var y2 = sign * innerTickSize,
      labelY = sign * tickSpacing;
    dy = sign < 0 ? "0em" : ".71em";
    canvas_dy = sign < 0 ? 0 : fontSize * 0.71;
    textAnchor = "middle";
    ticks = tickValues.map(function (d) {
      var x = Math.round(scale(d));
      return {
        value: d,
        x1: x,
        y1: 0,
        x2: x,
        y2: y2,
        labelX: x,
        labelY: labelY
      };
    });
    if (showTicks) {
      var nodes = ticks.map(function (d) {
          return {
            id: d.value,
            value: d.value,
            fy: d.y2,
            origX: d.x1
          };
        }),
        simulation = (0, _d3Force.forceSimulation)(nodes).force("x", (0, _d3Force.forceX)(function (d) {
          return d.origX;
        }).strength(1)).force("collide", (0, _d3Force.forceCollide)(22)).stop();
      for (var i = 0; i < 100; ++i) {
        simulation.tick();
      }
      ticks = (0, _d3Array.zip)(ticks, nodes).map(function (d) {
        var a = d[0],
          b = d[1];
        if (Math.abs(b.x - b.origX) > 0.01) {
          return (0, _extends2["default"])({}, a, {
            x2: b.x,
            labelX: b.x
          });
        }
        return a;
      });
    }
  } else {
    ticks = tickValues.map(function (d) {
      var y = Math.round(scale(d));
      return {
        value: d,
        x1: 0,
        y1: y,
        x2: sign * innerTickSize,
        y2: y,
        labelX: sign * tickSpacing,
        labelY: y
      };
    });
    dy = ".32em";
    canvas_dy = fontSize * 0.32;
    textAnchor = sign < 0 ? "end" : "start";
  }
  return (0, _extends2["default"])({
    orient: orient,
    ticks: ticks,
    scale: scale,
    tickStrokeStyle: tickStrokeStyle,
    tickLabelFill: tickLabelFill || tickStrokeStyle,
    tickStrokeWidth: tickStrokeWidth,
    tickStrokeDasharray: tickStrokeDasharray,
    dy: dy,
    canvas_dy: canvas_dy,
    textAnchor: textAnchor,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    format: format,
    showTickLabel: showTickLabel
  }, rest);
};
exports.tickHelper = tickHelper;
var drawAxisLine = function drawAxisLine(ctx, props, range) {
  var orient = props.orient,
    outerTickSize = props.outerTickSize,
    strokeStyle = props.strokeStyle,
    strokeWidth = props.strokeWidth,
    sign = orient === "top" || orient === "left" ? -1 : 1,
    xAxis = orient === "bottom" || orient === "top";
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  var firstPoint = (0, _utils.first)(range),
    lastPoint = (0, _utils.last)(range),
    tickSize = sign * outerTickSize;
  if (xAxis) {
    ctx.moveTo(firstPoint, tickSize);
    ctx.lineTo(firstPoint, 0);
    ctx.lineTo(lastPoint, 0);
    ctx.lineTo(lastPoint, tickSize);
  } else {
    ctx.moveTo(tickSize, firstPoint);
    ctx.lineTo(0, firstPoint);
    ctx.lineTo(0, lastPoint);
    ctx.lineTo(tickSize, lastPoint);
  }
  ctx.stroke();
};
exports.drawAxisLine = drawAxisLine;
var drawTicks = function drawTicks(ctx, result) {
  var ticks = result.ticks,
    tickStrokeStyle = result.tickStrokeStyle;
  if (tickStrokeStyle !== undefined) {
    ctx.strokeStyle = tickStrokeStyle;
    ctx.fillStyle = tickStrokeStyle;
  }
  ticks.forEach(function (tick) {
    drawEachTick(ctx, tick, result);
  });
};
exports.drawTicks = drawTicks;
var _drawGridLine = function _drawGridLine(ctx, tick, result, moreProps) {
  var orient = result.orient,
    gridLinesStrokeWidth = result.gridLinesStrokeWidth,
    gridLinesStrokeStyle = result.gridLinesStrokeStyle,
    gridLinesStrokeDasharray = result.gridLinesStrokeDasharray,
    chartConfig = moreProps.chartConfig,
    height = chartConfig.height,
    width = chartConfig.width;
  if (gridLinesStrokeStyle !== undefined) {
    ctx.strokeStyle = gridLinesStrokeStyle;
  }
  ctx.beginPath();
  var sign = orient === "top" || orient === "left" ? 1 : -1;
  switch (orient) {
    case "top":
    case "bottom":
      ctx.moveTo(tick.x1, 0);
      ctx.lineTo(tick.x2, sign * height);
      break;
    default:
      ctx.moveTo(0, tick.y1);
      ctx.lineTo(sign * width, tick.y2);
      break;
  }
  ctx.lineWidth = gridLinesStrokeWidth;
  var lineDash = (0, _utils.getStrokeDasharrayCanvas)(gridLinesStrokeDasharray);
  ctx.setLineDash(lineDash);
  ctx.stroke();
};
var drawGridLines = function drawGridLines(ctx, tickProps, moreProps) {
  tickProps.ticks.forEach(function (tick) {
    _drawGridLine(ctx, tick, tickProps, moreProps);
  });
};
exports.drawGridLines = drawGridLines;
var _drawEachTickLabel = function _drawEachTickLabel(ctx, tick, result) {
  var canvas_dy = result.canvas_dy,
    format = result.format,
    text = format(tick.value);
  ctx.beginPath();
  ctx.fillText(text, tick.labelX, tick.labelY + canvas_dy);
};
var _crFont = function _crFont(_ref) {
  var fontWeight = _ref.fontWeight,
    fontSize = _ref.fontSize,
    fontFamily = _ref.fontFamily;
  return fontWeight + " " + fontSize + "px " + fontFamily;
};
var drawTickLabels = function drawTickLabels(ctx, tickProps) {
  var textAnchor = tickProps.textAnchor,
    tickLabelFill = tickProps.tickLabelFill;
  ctx.font = _crFont(tickProps);
  if (tickLabelFill !== undefined) {
    ctx.fillStyle = tickLabelFill;
  }
  ctx.textAlign = textAnchor === 'middle' ? 'center' : textAnchor;
  tickProps.ticks.forEach(function (tick) {
    _drawEachTickLabel(ctx, tick, tickProps);
  });
};
exports.drawTickLabels = drawTickLabels;
var crScale = function crScale(scale, trueRange) {
  var trueDomain = trueRange.map(scale.invert);
  return scale.copy().domain(trueDomain).range(trueRange);
};
exports.crScale = crScale;
//# sourceMappingURL=AxisFn.js.map