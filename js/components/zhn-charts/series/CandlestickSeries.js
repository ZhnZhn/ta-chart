"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _d3Collection = require("d3-collection");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _CL = require("../CL");

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

var CandlestickSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CandlestickSeries, _Component);

  function CandlestickSeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = CandlestickSeries.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    _drawOnCanvas(ctx, this.props, moreProps);
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var _this$props = this.props,
        className = _this$props.className,
        wickClassName = _this$props.wickClassName,
        candleClassName = _this$props.candleClassName;
    var xScale = moreProps.xScale,
        yScale = moreProps.chartConfig.yScale,
        plotData = moreProps.plotData,
        xAccessor = moreProps.xAccessor;
    var candleData = getCandleData(this.props, xAccessor, xScale, yScale, plotData);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        className: wickClassName,
        children: getWicksSVG(candleData)
      }, "wicks"), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        className: candleClassName,
        children: getCandlesSVG(this.props, candleData)
      }, "candles")]
    });
  };

  _proto.render = function render() {
    var clip = this.props.clip;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      clip: clip,
      svgDraw: this.renderSVG,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getAxisCanvas,
      drawOn: ["pan"]
    });
  };

  return CandlestickSeries;
}(_react.Component);

CandlestickSeries.propTypes = {
  className: _propTypes["default"].string,
  wickClassName: _propTypes["default"].string,
  candleClassName: _propTypes["default"].string,
  widthRatio: _propTypes["default"].number,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  classNames: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]),
  fill: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]),
  stroke: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]),
  wickStroke: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]),
  yAccessor: _propTypes["default"].func,
  clip: _propTypes["default"].bool
};
CandlestickSeries.defaultProps = {
  className: _CL.CL_CANDLESTICK,
  wickClassName: _CL.CL_CANDLESTICK_WICK,
  candleClassName: _CL.CL_CANDLESTICK_CANDLE,
  yAccessor: function yAccessor(d) {
    return {
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close
    };
  },
  classNames: function classNames(d) {
    return d.close > d.open ? "up" : "down";
  },
  width: _utils.plotDataLengthBarWidth,
  wickStroke: "#000000",
  // wickStroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
  fill: function fill(d) {
    return d.close > d.open ? "#6BA583" : "#FF0000";
  },
  // stroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
  stroke: "#000000",
  candleStrokeWidth: 0.5,
  // stroke: "none",
  widthRatio: 0.8,
  opacity: 0.5,
  clip: true
};

function getWicksSVG(candleData) {
  var wicks = candleData.map(function (each, idx) {
    var d = each.wick;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      className: each.className,
      stroke: d.stroke,
      d: "M" + d.x + "," + d.y1 + " L" + d.x + "," + d.y2 + " M" + d.x + "," + d.y3 + " L" + d.x + "," + d.y4
    }, idx);
  });
  return wicks;
}

function getCandlesSVG(props, candleData) {
  /* eslint-disable react/prop-types */
  var opacity = props.opacity,
      candleStrokeWidth = props.candleStrokeWidth;
  /* eslint-enable react/prop-types */

  var candles = candleData.map(function (d, idx) {
    if (d.width <= 1) return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      className: d.className,
      x1: d.x,
      y1: d.y,
      x2: d.x,
      y2: d.y + d.height,
      stroke: d.fill
    }, idx);else if (d.height === 0) return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: d.x,
      y1: d.y,
      x2: d.x + d.width,
      y2: d.y + d.height,
      stroke: d.fill
    }, idx);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: d.className,
      fillOpacity: opacity,
      x: d.x,
      y: d.y,
      width: d.width,
      height: d.height,
      fill: d.fill,
      stroke: d.stroke,
      strokeWidth: candleStrokeWidth
    }, idx);
  });
  return candles;
}

function _drawOnCanvas(ctx, props, moreProps) {
  var opacity = props.opacity,
      candleStrokeWidth = props.candleStrokeWidth;
  var xScale = moreProps.xScale,
      yScale = moreProps.chartConfig.yScale,
      plotData = moreProps.plotData,
      xAccessor = moreProps.xAccessor; // const wickData = getWickData(props, xAccessor, xScale, yScale, plotData);

  var candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);
  var wickNest = (0, _d3Collection.nest)().key(function (d) {
    return d.wick.stroke;
  }).entries(candleData);
  wickNest.forEach(function (outer) {
    var key = outer.key,
        values = outer.values;
    ctx.strokeStyle = key;
    ctx.fillStyle = key;
    values.forEach(function (each) {
      /*
      ctx.moveTo(d.x, d.y1);
      ctx.lineTo(d.x, d.y2);
      ctx.beginPath();
      ctx.moveTo(d.x, d.y3);
      ctx.lineTo(d.x, d.y4);
      ctx.stroke(); */
      var d = each.wick;
      ctx.fillRect(d.x - 0.5, d.y1, 1, d.y2 - d.y1);
      ctx.fillRect(d.x - 0.5, d.y3, 1, d.y4 - d.y3);
    });
  }); // const candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);

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
          // <line className={d.className} key={idx} x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.height}/>

          /*
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x, d.y + d.height);
          ctx.stroke();
          */
          ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
        } else if (d.height === 0) {
          // <line key={idx} x1={d.x} y1={d.y} x2={d.x + d.width} y2={d.y + d.height} />

          /*
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.width, d.y + d.height);
          ctx.stroke();
          */
          ctx.fillRect(d.x, d.y - 0.5, d.width, 1);
        } else {
          /*
          ctx.beginPath();
          ctx.rect(d.x, d.y, d.width, d.height);
          ctx.closePath();
          ctx.fill();
          if (strokeKey !== "none") ctx.stroke();
          */
          ctx.fillRect(d.x, d.y, d.width, d.height);
          if (strokeKey !== "none") ctx.strokeRect(d.x, d.y, d.width, d.height);
        }
      });
    });
  });
}
/*
function getWickData(props, xAccessor, xScale, yScale, plotData) {
	const { classNames: classNameProp, wickStroke: wickStrokeProp, yAccessor } = props;
	const wickStroke = functor(wickStrokeProp);
	const className = functor(classNameProp);
	const wickData = plotData
			.filter(d => isDefined(yAccessor(d).close))
			.map(d => {
				// console.log(yAccessor);
				const ohlc = yAccessor(d);
				const x = Math.round(xScale(xAccessor(d))),
					y1 = yScale(ohlc.high),
					y2 = yScale(Math.max(ohlc.open, ohlc.close)),
					y3 = yScale(Math.min(ohlc.open, ohlc.close)),
					y4 = yScale(ohlc.low);
				return {
					x,
					y1,
					y2,
					y3,
					y4,
					className: className(ohlc),
					direction: (ohlc.close - ohlc.open),
					stroke: wickStroke(ohlc),
				};
			});
	return wickData;
}
*/


function getCandleData(props, xAccessor, xScale, yScale, plotData) {
  var wickStrokeProp = props.wickStroke;
  var wickStroke = (0, _utils.functor)(wickStrokeProp);
  var classNames = props.classNames,
      fillProp = props.fill,
      strokeProp = props.stroke,
      yAccessor = props.yAccessor;
  var className = (0, _utils.functor)(classNames);
  var fill = (0, _utils.functor)(fillProp);
  var stroke = (0, _utils.functor)(strokeProp);
  var widthFunctor = (0, _utils.functor)(props.width);
  var width = widthFunctor(props, {
    xScale: xScale,
    xAccessor: xAccessor,
    plotData: plotData
  });
  /*
  const candleWidth = Math.round(width);
  const offset = Math.round(candleWidth === 1 ? 0 : 0.5 * width);
  */

  var trueOffset = 0.5 * width;
  var offset = trueOffset > 0.7 ? Math.round(trueOffset) : Math.floor(trueOffset); // eslint-disable-next-line prefer-const

  var candles = [];

  for (var i = 0; i < plotData.length; i++) {
    var d = plotData[i] //for better colors
    ,
        _prevD = i > 0 ? plotData[i - 1] : {};

    if ((0, _utils.isDefined)(yAccessor(d).close)) {
      var x = Math.round(xScale(xAccessor(d))); // const x = Math.round(xScale(xAccessor(d)) - offset);

      var ohlc = yAccessor(d);

      var _prevOhcl = yAccessor(_prevD);

      var y = Math.round(yScale(Math.max(ohlc.open, ohlc.close)));
      var height = Math.round(Math.abs(yScale(ohlc.open) - yScale(ohlc.close)));
      candles.push({
        // type: "line"
        x: x - offset,
        y: y,
        wick: {
          stroke: wickStroke(ohlc, _prevOhcl),
          x: x,
          y1: Math.round(yScale(ohlc.high)),
          y2: y,
          y3: y + height,
          // Math.round(yScale(Math.min(ohlc.open, ohlc.close))),
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
}

var _default = CandlestickSeries;
exports["default"] = _default;
//# sourceMappingURL=CandlestickSeries.js.map