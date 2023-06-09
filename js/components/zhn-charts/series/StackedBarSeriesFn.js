"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.svgHelper = exports.identityStack = exports.getBarsSVG2 = exports.drawOnCanvasHelper = exports.drawOnCanvas2 = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Collection = require("d3-collection");
var _d3Array = require("../d3Array");
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
var _isArr = Array.isArray,
  mathRound = Math.round;
var identityStack = function identityStack() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var keys = [];
  function stack(data) {
    var response = keys.map(function (key, i) {
      var arrays = data.map(function (d) {
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
    if (!args.length) {
      return keys;
    }
    keys = x;
    return stack;
  };
  return stack;
};
exports.identityStack = identityStack;
var _getBars = function _getBars(props, xAccessor, yAccessor, xScale, yScale, plotData, stack, after) {
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
    spaceBetweenBar = _props$spaceBetweenBa === void 0 ? 0 : _props$spaceBetweenBa,
    getClassName = (0, _utils.functor)(className),
    getFill = (0, _utils.functor)(fill),
    getBase = (0, _utils.functor)(baseAt),
    widthFunctor = (0, _utils.functor)(props.width),
    width = widthFunctor(props, {
      xScale: xScale,
      xAccessor: xAccessor,
      plotData: plotData
    }),
    barWidth = mathRound(width),
    eachBarWidth = (barWidth - spaceBetweenBar * (yAccessor.length - 1)) / yAccessor.length,
    offset = barWidth === 1 ? 0 : 0.5 * width;
  var ds = plotData.map(function (each) {
    var d = {
      appearance: {},
      x: xAccessor(each)
    };
    yAccessor.forEach(function (eachYAccessor, i) {
      var key = "y" + i;
      d[key] = eachYAccessor(each);
      var appearance = {
        className: getClassName(each, i),
        stroke: stroke ? getFill(each, i) : 'none',
        fill: getFill(each, i)
      };
      d.appearance[key] = appearance;
    });
    return d;
  });
  var keys = yAccessor.map(function (_, i) {
      return "y" + i;
    }),
    data = stack().keys(keys)(ds),
    newData = data.map(function (each, i) {
      var key = each.key;
      return each.map(function (d) {
        var array = [d[0], d[1]];
        array.data = {
          x: d.data.x,
          i: i,
          appearance: d.data.appearance[key]
        };
        return array;
      });
    });
  var bars = (0, _d3Array.merge)(newData).map(function (d) {
    var y = yScale(d[1]);
    var h = getBase(xScale, yScale, d.data) - yScale(d[1] - d[0]);
    if (h < 0) {
      y = y + h;
      h = -h;
    }
    return (0, _extends2["default"])({}, d.data.appearance, {
      x: mathRound(xScale(d.data.x) - width / 2),
      y: y,
      groupOffset: mathRound(offset - (d.data.i > 0 ? (eachBarWidth + spaceBetweenBar) * d.data.i : 0)),
      groupWidth: mathRound(eachBarWidth),
      offset: mathRound(offset),
      height: h,
      width: barWidth
    });
  }).filter(function (bar) {
    return !isNaN(bar.y);
  });
  return after(bars);
};
var _convertToArray = function _convertToArray(item) {
  return _isArr(item) ? item : [item];
};
var _doStuff = function _doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction) {
  var _ref = props.swapScales ? [_convertToArray(props.xAccessor), props.yAccessor, yScale, xScale, postRotateAction] : [_convertToArray(props.yAccessor), xAccessor, xScale, yScale, defaultPostAction],
    modifiedYAccessor = _ref[0],
    modifiedXAccessor = _ref[1],
    modifiedXScale = _ref[2],
    modifiedYScale = _ref[3],
    postProcessor = _ref[4];
  return _getBars(props, modifiedXAccessor, modifiedYAccessor, modifiedXScale, modifiedYScale, plotData, stackFn, postProcessor);
};
var _rotateXY = function _rotateXY(array) {
  return array.map(function (each) {
    return (0, _extends2["default"])({}, each, {
      x: each.y,
      y: each.x,
      height: each.width,
      width: each.height
    });
  });
};
var drawOnCanvas2 = function drawOnCanvas2(ctx, props, bars) {
  var stroke = props.stroke,
    nest = (0, _d3Collection.nest)().key(function (d) {
      return d.fill;
    }).entries(bars);
  nest.forEach(function (outer) {
    var key = outer.key,
      values = outer.values;
    if ((0, _utils.head)(values).width > 1) {
      ctx.strokeStyle = key;
    }
    ctx.fillStyle = (0, _utils.head)(values).width <= 1 ? key : (0, _utils.hexToRGBA)(key, props.opacity);
    values.forEach(function (d) {
      if (d.width <= 1) {
        ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
      } else {
        ctx.fillRect(d.x, d.y, d.width, d.height);
        if (stroke) {
          ctx.strokeRect(d.x, d.y, d.width, d.height);
        }
      }
    });
  });
};
exports.drawOnCanvas2 = drawOnCanvas2;
var drawOnCanvasHelper = function drawOnCanvasHelper(ctx, props, moreProps, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }
  if (postRotateAction === void 0) {
    postRotateAction = _rotateXY;
  }
  var xAccessor = moreProps.xAccessor,
    plotData = moreProps.plotData,
    xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale,
    bars = _doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  drawOnCanvas2(ctx, props, bars);
};
exports.drawOnCanvasHelper = drawOnCanvasHelper;
var svgHelper = function svgHelper(props, moreProps, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }
  if (postRotateAction === void 0) {
    postRotateAction = _rotateXY;
  }
  var xAccessor = moreProps.xAccessor,
    plotData = moreProps.plotData,
    xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale,
    bars = _doStuff(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  return getBarsSVG2(props, bars);
};
exports.svgHelper = svgHelper;
var getBarsSVG2 = function getBarsSVG2( //props
_ref2, bars) {
  var opacity = _ref2.opacity;
  return bars.map(function (d, idx) {
    return d.width <= 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      className: d.className,
      stroke: d.fill,
      x1: d.x,
      y1: d.y,
      x2: d.x,
      y2: d.y + d.height
    }, idx) : /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
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
};
exports.getBarsSVG2 = getBarsSVG2;
//# sourceMappingURL=StackedBarSeriesFn.js.map