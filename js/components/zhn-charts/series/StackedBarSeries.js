"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;
exports.drawOnCanvas2 = drawOnCanvas2;
exports.drawOnCanvasHelper = drawOnCanvasHelper;
exports.getBars = getBars;
exports.getBarsSVG2 = getBarsSVG2;
exports.identityStack = identityStack;
exports.rotateXY = void 0;
exports.svgHelper = svgHelper;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _d3Collection = require("d3-collection");

var _d3Array = require("d3-array");

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var StackedBarSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(StackedBarSeries, _Component);

  function StackedBarSeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = StackedBarSeries.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    var xAccessor = moreProps.xAccessor; // var { xScale, chartConfig: { yScale }, plotData } = moreProps;

    drawOnCanvasHelper(ctx, this.props, moreProps, xAccessor, _d3Shape.stack);
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var xAccessor = moreProps.xAccessor;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      children: svgHelper(this.props, moreProps, xAccessor, _d3Shape.stack)
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

  return StackedBarSeries;
}(_react.Component);
/*
StackedBarSeries.propTypes = {
	baseAt: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func,
	]).isRequired,
	direction: PropTypes.oneOf(["up", "down"]).isRequired,
	stroke: PropTypes.bool.isRequired,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func
	]).isRequired,
	opacity: PropTypes.number.isRequired,
	fill: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	className: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	clip: PropTypes.bool.isRequired,
};
*/


StackedBarSeries.defaultProps = {
  baseAt: function baseAt(xScale, yScale
  /* , d*/
  ) {
    return (0, _utils.head)(yScale.range());
  },
  direction: "up",
  className: "bar",
  stroke: true,
  fill: "#4682B4",
  opacity: 0.5,
  width: _utils.plotDataLengthBarWidth,
  widthRatio: 0.8,
  clip: true,
  swapScales: false
};

function identityStack() {
  var keys = [];

  function stack(data) {
    var response = keys.map(function (key, i) {
      // eslint-disable-next-line prefer-const
      var arrays = data.map(function (d) {
        // eslint-disable-next-line prefer-const
        var array = [0, d[key]];
        array.data = d;
        return array;
      });
      arrays.key = key;
      arrays.index = i;
      return arrays;
    });
    return response;
  }

  stack.keys = function (x) {
    if (!arguments.length) {
      return keys;
    }

    keys = x;
    return stack;
  };

  return stack;
}

function drawOnCanvasHelper(ctx, props, moreProps, xAccessor, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }

  if (postRotateAction === void 0) {
    postRotateAction = rotateXY;
  }

  var xScale = moreProps.xScale,
      yScale = moreProps.chartConfig.yScale,
      plotData = moreProps.plotData;
  var bars = doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  drawOnCanvas2(props, ctx, bars);
}

function convertToArray(item) {
  return Array.isArray(item) ? item : [item];
}

function svgHelper(props, moreProps, xAccessor, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }

  if (postRotateAction === void 0) {
    postRotateAction = rotateXY;
  }

  var xScale = moreProps.xScale,
      yScale = moreProps.chartConfig.yScale,
      plotData = moreProps.plotData;
  var bars = doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  return getBarsSVG2(props, bars);
}

function doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction) {
  var yAccessor = props.yAccessor,
      swapScales = props.swapScales;
  var modifiedYAccessor = swapScales ? convertToArray(props.xAccessor) : convertToArray(yAccessor);
  var modifiedXAccessor = swapScales ? yAccessor : xAccessor;
  var modifiedXScale = swapScales ? yScale : xScale;
  var modifiedYScale = swapScales ? xScale : yScale;
  var postProcessor = swapScales ? postRotateAction : defaultPostAction;
  var bars = getBars(props, modifiedXAccessor, modifiedYAccessor, modifiedXScale, modifiedYScale, plotData, stackFn, postProcessor);
  return bars;
}

var rotateXY = function rotateXY(array) {
  return array.map(function (each) {
    return (0, _extends2["default"])({}, each, {
      x: each.y,
      y: each.x,
      height: each.width,
      width: each.height
    });
  });
};

exports.rotateXY = rotateXY;

function getBarsSVG2(props, bars) {
  var opacity = props.opacity;
  return bars.map(function (d, idx) {
    if (d.width <= 1) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
        className: d.className,
        stroke: d.fill,
        x1: d.x,
        y1: d.y,
        x2: d.x,
        y2: d.y + d.height
      }, idx);
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: d.className,
      stroke: d.stroke,
      fill: d.fill,
      x: d.x,
      y: d.y,
      width: d.width,
      fillOpacity: opacity,
      height: d.height
    }, idx);
  });
}

function drawOnCanvas2(props, ctx, bars) {
  var stroke = props.stroke;
  var nest = (0, _d3Collection.nest)().key(function (d) {
    return d.fill;
  }).entries(bars);
  nest.forEach(function (outer) {
    var key = outer.key,
        values = outer.values;

    if ((0, _utils.head)(values).width > 1) {
      ctx.strokeStyle = key;
    }

    var fillStyle = (0, _utils.head)(values).width <= 1 ? key : (0, _utils.hexToRGBA)(key, props.opacity);
    ctx.fillStyle = fillStyle;
    values.forEach(function (d) {
      if (d.width <= 1) {
        /* <line key={idx} className={d.className}
        			stroke={stroke}
        			fill={fill}
        			x1={d.x} y1={d.y}
        			x2={d.x} y2={d.y + d.height} />*/

        /*
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.height);
        ctx.stroke();
        */
        ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
      } else {
        /* <rect key={idx} className={d.className}
        		stroke={stroke}
        		fill={fill}
        		x={d.x}
        		y={d.y}
        		width={d.width}
        		height={d.height} /> */

        /*
        ctx.beginPath();
        ctx.rect(d.x, d.y, d.width, d.height);
        ctx.fill();
        */
        ctx.fillRect(d.x, d.y, d.width, d.height);
        if (stroke) ctx.strokeRect(d.x, d.y, d.width, d.height);
      }
    });
  });
}

function getBars(props, xAccessor, yAccessor, xScale, yScale, plotData, stack, after) {
  if (stack === void 0) {
    stack = identityStack;
  }

  if (after === void 0) {
    after = _utils.identity;
  }

  var baseAt = props.baseAt,
      className = props.className,
      fill = props.fill,
      stroke = props.stroke,
      _props$spaceBetweenBa = props.spaceBetweenBar,
      spaceBetweenBar = _props$spaceBetweenBa === void 0 ? 0 : _props$spaceBetweenBa;
  var getClassName = (0, _utils.functor)(className);
  var getFill = (0, _utils.functor)(fill);
  var getBase = (0, _utils.functor)(baseAt);
  var widthFunctor = (0, _utils.functor)(props.width);
  var width = widthFunctor(props, {
    xScale: xScale,
    xAccessor: xAccessor,
    plotData: plotData
  });
  var barWidth = Math.round(width);
  var eachBarWidth = (barWidth - spaceBetweenBar * (yAccessor.length - 1)) / yAccessor.length;
  var offset = barWidth === 1 ? 0 : 0.5 * width;
  var ds = plotData.map(function (each) {
    // eslint-disable-next-line prefer-const
    var d = {
      appearance: {},
      x: xAccessor(each)
    };
    yAccessor.forEach(function (eachYAccessor, i) {
      var key = "y" + i;
      d[key] = eachYAccessor(each);
      var appearance = {
        className: getClassName(each, i),
        stroke: stroke ? getFill(each, i) : "none",
        fill: getFill(each, i)
      };
      d.appearance[key] = appearance;
    });
    return d;
  });
  var keys = yAccessor.map(function (_, i) {
    return "y" + i;
  }); // console.log(ds);

  var data = stack().keys(keys)(ds); // console.log(data);

  var newData = data.map(function (each, i) {
    var key = each.key;
    return each.map(function (d) {
      // eslint-disable-next-line prefer-const
      var array = [d[0], d[1]];
      array.data = {
        x: d.data.x,
        i: i,
        appearance: d.data.appearance[key]
      };
      return array;
    });
  }); // console.log(newData);
  // console.log(merge(newData));

  var bars = (0, _d3Array.merge)(newData) // .filter(d => isDefined(d.y))
  .map(function (d) {
    // let baseValue = yScale.invert(getBase(xScale, yScale, d.datum));
    var y = yScale(d[1]);
    /* let h = isDefined(d.y0) && d.y0 !== 0 && !isNaN(d.y0)
    		? yScale(d.y0) - y
    		: getBase(xScale, yScale, d.datum) - yScale(d.y)*/

    var h = getBase(xScale, yScale, d.data) - yScale(d[1] - d[0]); // console.log(d.y, yScale.domain(), yScale.range())
    // let h = ;
    // if (d.y < 0) h = -h;
    // console.log(d, y, h)

    if (h < 0) {
      y = y + h;
      h = -h;
    } // console.log(d.data.i, Math.round(offset - (d.data.i > 0 ? (eachBarWidth + spaceBetweenBar) * d.data.i : 0)))

    /* console.log(d.series, d.datum.date, d.x,
    		getBase(xScale, yScale, d.datum), `d.y=${d.y}, d.y0=${d.y0}, y=${y}, h=${h}`)*/


    return (0, _extends2["default"])({}, d.data.appearance, {
      // series: d.series,
      // i: d.x,
      x: Math.round(xScale(d.data.x) - width / 2),
      y: y,
      groupOffset: Math.round(offset - (d.data.i > 0 ? (eachBarWidth + spaceBetweenBar) * d.data.i : 0)),
      groupWidth: Math.round(eachBarWidth),
      offset: Math.round(offset),
      height: h,
      width: barWidth
    });
  }).filter(function (bar) {
    return !isNaN(bar.y);
  });
  return after(bars);
}

var _default = StackedBarSeries;
exports["default"] = _default;
//# sourceMappingURL=StackedBarSeries.js.map