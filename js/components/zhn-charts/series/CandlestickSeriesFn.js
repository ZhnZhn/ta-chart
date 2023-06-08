"use strict";

exports.__esModule = true;
exports.getWicksSVG = exports.getCandlesSVG = exports.getCandleData = exports.drawOnCanvas = void 0;
var _d3Collection = require("d3-collection");
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
var getWicksSVG = function getWicksSVG(candleData) {
  return candleData.map(function (each, index) {
    var d = each.wick,
      stroke = d.stroke,
      x = d.x,
      y1 = d.y1,
      y2 = d.y2,
      y3 = d.y3,
      y4 = d.y4;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      className: each.className,
      stroke: stroke,
      d: "M" + x + "," + y1 + " L" + x + "," + y2 + " M" + x + "," + y3 + " L" + x + "," + y4
    }, index);
  });
};
exports.getWicksSVG = getWicksSVG;
var getCandlesSVG = function getCandlesSVG(props, candleData) {
  var opacity = props.opacity,
    candleStrokeWidth = props.candleStrokeWidth;
  var candles = candleData.map(function (d, index) {
    if (d.width <= 1) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
        className: d.className,
        x1: d.x,
        y1: d.y,
        x2: d.x,
        y2: d.y + d.height,
        stroke: d.fill
      }, index);
    } else if (d.height === 0) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
        stroke: d.fill,
        x1: d.x,
        y1: d.y,
        x2: d.x + d.width,
        y2: d.y + d.height
      }, index);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: d.className,
      fillOpacity: opacity,
      fill: d.fill,
      stroke: d.stroke,
      strokeWidth: candleStrokeWidth,
      x: d.x,
      y: d.y,
      width: d.width,
      height: d.height
    }, index);
  });
  return candles;
};
exports.getCandlesSVG = getCandlesSVG;
var drawOnCanvas = function drawOnCanvas(ctx, props, moreProps) {
  var opacity = props.opacity,
    candleStrokeWidth = props.candleStrokeWidth,
    xAccessor = moreProps.xAccessor,
    xScale = moreProps.xScale,
    plotData = moreProps.plotData,
    yScale = moreProps.chartConfig.yScale,
    candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);
  var wickNest = (0, _d3Collection.nest)().key(function (d) {
    return d.wick.stroke;
  }).entries(candleData);
  wickNest.forEach(function (outer) {
    var key = outer.key,
      values = outer.values;
    ctx.strokeStyle = key;
    ctx.fillStyle = key;
    values.forEach(function (each) {
      var d = each.wick;
      ctx.fillRect(d.x - 0.5, d.y1, 1, d.y2 - d.y1);
      ctx.fillRect(d.x - 0.5, d.y3, 1, d.y4 - d.y3);
    });
  });
  var candleNest = (0, _d3Collection.nest)().key(function (d) {
    return d.stroke;
  }).key(function (d) {
    return d.fill;
  }).entries(candleData);
  candleNest.forEach(function (outer) {
    var strokeKey = outer.key,
      strokeValues = outer.values;
    if (strokeKey !== "none") {
      ctx.strokeStyle = strokeKey;
      ctx.lineWidth = candleStrokeWidth;
    }
    strokeValues.forEach(function (inner) {
      var key = inner.key,
        values = inner.values;
      var fillStyle = (0, _utils.head)(values).width <= 1 ? key : (0, _utils.hexToRGBA)(key, opacity);
      ctx.fillStyle = fillStyle;
      values.forEach(function (d) {
        if (d.width <= 1) {
          ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
        } else if (d.height === 0) {
          ctx.fillRect(d.x, d.y - 0.5, d.width, 1);
        } else {
          ctx.fillRect(d.x, d.y, d.width, d.height);
          if (strokeKey !== "none") {
            ctx.strokeRect(d.x, d.y, d.width, d.height);
          }
        }
      });
    });
  });
};
exports.drawOnCanvas = drawOnCanvas;
var getCandleData = function getCandleData(props, xAccessor, xScale, yScale, plotData) {
  var classNames = props.classNames,
    yAccessor = props.yAccessor,
    fillProp = props.fill,
    strokeProp = props.stroke,
    wickStrokeProp = props.wickStroke,
    wickStroke = (0, _utils.functor)(wickStrokeProp),
    className = (0, _utils.functor)(classNames),
    fill = (0, _utils.functor)(fillProp),
    stroke = (0, _utils.functor)(strokeProp),
    widthFunctor = (0, _utils.functor)(props.width),
    width = widthFunctor(props, {
      xScale: xScale,
      xAccessor: xAccessor,
      plotData: plotData
    }),
    trueOffset = 0.5 * width,
    offset = trueOffset > 0.7 ? Math.round(trueOffset) : Math.floor(trueOffset);
  var candles = [];
  for (var i = 0; i < plotData.length; i++) {
    var d = plotData[i]
      //for better colors
      ,
      _prevD = i > 0 ? plotData[i - 1] : {};
    if (yAccessor(d).close != null) {
      var x = Math.round(xScale(xAccessor(d))),
        ohlc = yAccessor(d),
        _prevOhcl = yAccessor(_prevD),
        y = Math.round(yScale(Math.max(ohlc.open, ohlc.close))),
        height = Math.round(Math.abs(yScale(ohlc.open) - yScale(ohlc.close)));
      candles.push({
        x: x - offset,
        y: y,
        wick: {
          stroke: wickStroke(ohlc, _prevOhcl),
          x: x,
          y1: Math.round(yScale(ohlc.high)),
          y2: y,
          y3: y + height,
          y4: Math.round(yScale(ohlc.low))
        },
        height: height,
        width: offset * 2,
        className: className(ohlc),
        fill: fill(ohlc, _prevOhcl),
        stroke: stroke(ohlc, _prevOhcl),
        direction: ohlc.close - ohlc.open
      });
    }
  }
  return candles;
};
exports.getCandleData = getCandleData;
//# sourceMappingURL=CandlestickSeriesFn.js.map