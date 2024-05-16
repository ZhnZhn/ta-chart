"use strict";

exports.__esModule = true;
exports.svgHelper = exports.identityStack = exports.getBarsSVG2 = exports.drawOnCanvasHelper = exports.drawOnCanvas2 = exports.DF_PROPS = void 0;
var _d3Collection = require("../d3Collection");
var _d3Array = require("../d3Array");
var _utils = require("../utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  mathRound = Math.round;
const DF_BASE_AT = (xScale, yScale) => (0, _utils.head)(yScale.range());
const DF_PROPS = exports.DF_PROPS = {
  baseAt: DF_BASE_AT,
  direction: 'up',
  className: _CL.CL_BAR,
  stroke: true,
  fill: '#4682b4',
  opacity: 0.5,
  width: _utils.plotDataLengthBarWidth,
  widthRatio: 0.8,
  clip: true,
  swapScales: false
};
const identityStack = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  let keys = [];
  const stack = data => keys.map((key, i) => {
    const arrays = data.map(d => {
      const array = [0, d[key]];
      array.data = d;
      return array;
    });
    arrays.key = key;
    arrays.index = i;
    return arrays;
  });
  stack.keys = x => args.length ? (keys = x, stack) : keys;
  return stack;
};
exports.identityStack = identityStack;
const _crYKey = i => "y" + i;
const _getBars = function (props, xAccessor, yAccessor, xScale, yScale, plotData, stack, after) {
  if (stack === void 0) {
    stack = identityStack;
  }
  if (after === void 0) {
    after = _utils.identity;
  }
  const {
      baseAt,
      className,
      fill,
      stroke,
      spaceBetweenBar = 0,
      width: propsWidth
    } = props,
    getClassName = (0, _utils.functor)(className),
    getFill = (0, _utils.functor)(fill),
    getBase = (0, _utils.functor)(baseAt),
    widthFunctor = (0, _utils.functor)(propsWidth),
    width = widthFunctor(props, {
      xScale,
      xAccessor,
      plotData
    }),
    barWidth = mathRound(width),
    eachBarWidth = (barWidth - spaceBetweenBar * (yAccessor.length - 1)) / yAccessor.length,
    offset = barWidth === 1 ? 0 : 0.5 * width;
  const ds = plotData.map(each => {
    const d = {
      appearance: {},
      x: xAccessor(each)
    };
    yAccessor.forEach((eachYAccessor, i) => {
      const key = _crYKey(i),
        appearance = {
          className: getClassName(each, i),
          stroke: stroke ? getFill(each, i) : 'none',
          fill: getFill(each, i)
        };
      d[key] = eachYAccessor(each);
      d.appearance[key] = appearance;
    });
    return d;
  });
  const keys = yAccessor.map((_, i) => _crYKey(i)),
    data = stack().keys(keys)(ds),
    newData = data.map((each, i) => {
      const key = each.key;
      return each.map(d => {
        const array = [d[0], d[1]];
        array.data = {
          i,
          x: d.data.x,
          appearance: d.data.appearance[key]
        };
        return array;
      });
    });
  const bars = (0, _d3Array.merge)(newData).map(d => {
    let y = yScale(d[1]),
      h = getBase(xScale, yScale, d.data) - yScale(d[1] - d[0]);
    if (h < 0) {
      y = y + h;
      h = -h;
    }
    return {
      ...d.data.appearance,
      x: mathRound(xScale(d.data.x) - width / 2),
      y: y,
      groupOffset: mathRound(offset - (d.data.i > 0 ? (eachBarWidth + spaceBetweenBar) * d.data.i : 0)),
      groupWidth: mathRound(eachBarWidth),
      offset: mathRound(offset),
      height: h,
      width: barWidth
    };
  }).filter(bar => !isNaN(bar.y));
  return after(bars);
};
const _convertToArray = item => _isArr(item) ? item : [item];
const _crBars = (props, morePropsXAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction) => {
  const {
      xAccessor,
      yAccessor,
      swapScales
    } = props,
    [modifiedYAccessor, modifiedXAccessor, modifiedXScale, modifiedYScale, postProcessor] = swapScales ? [_convertToArray(xAccessor), yAccessor, yScale, xScale, postRotateAction] : [_convertToArray(yAccessor), morePropsXAccessor, xScale, yScale, defaultPostAction];
  return _getBars(props, modifiedXAccessor, modifiedYAccessor, modifiedXScale, modifiedYScale, plotData, stackFn, postProcessor);
};
const _rotateXY = array => array.map(each => ({
  ...each,
  x: each.y,
  y: each.x,
  height: each.width,
  width: each.height
}));
const drawOnCanvas2 = (ctx, props, bars) => {
  const {
      stroke,
      opacity
    } = props,
    nest = (0, _d3Collection.nest)().key(d => d.fill).entries(bars);
  nest.forEach(outer => {
    const {
      key,
      values
    } = outer;
    if ((0, _utils.head)(values).width > 1) {
      ctx.strokeStyle = key;
    }
    ctx.fillStyle = (0, _utils.head)(values).width <= 1 ? key : (0, _utils.hexToRGBA)(key, opacity);
    values.forEach(_ref => {
      let {
        x,
        y,
        width,
        height
      } = _ref;
      if (width <= 1) {
        ctx.fillRect(x - 0.5, y, 1, height);
      } else {
        ctx.fillRect(x, y, width, height);
        if (stroke) {
          ctx.strokeRect(x, y, width, height);
        }
      }
    });
  });
};
exports.drawOnCanvas2 = drawOnCanvas2;
const drawOnCanvasHelper = function (ctx, props, moreProps, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }
  if (postRotateAction === void 0) {
    postRotateAction = _rotateXY;
  }
  const {
      xAccessor,
      plotData,
      xScale,
      chartConfig: {
        yScale
      }
    } = moreProps,
    bars = _crBars(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  drawOnCanvas2(ctx, props, bars);
};
exports.drawOnCanvasHelper = drawOnCanvasHelper;
const svgHelper = function (props, moreProps, stackFn, defaultPostAction, postRotateAction) {
  if (defaultPostAction === void 0) {
    defaultPostAction = _utils.identity;
  }
  if (postRotateAction === void 0) {
    postRotateAction = _rotateXY;
  }
  const {
      xAccessor,
      plotData,
      xScale,
      chartConfig: {
        yScale
      }
    } = moreProps,
    bars = _crBars(props, xAccessor, plotData, xScale, yScale, stackFn, postRotateAction, defaultPostAction);
  return getBarsSVG2(props, bars);
};
exports.svgHelper = svgHelper;
const getBarsSVG2 = ( //props
_ref2, bars) => {
  let {
    opacity
  } = _ref2;
  return bars.map((d, idx) => {
    const {
      className,
      fill,
      stroke,
      x,
      y,
      width,
      height
    } = d;
    return width <= 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      className: className,
      stroke: fill,
      x1: x,
      y1: y,
      x2: x,
      y2: y + height
    }, idx) : /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: className,
      fill: fill,
      fillOpacity: opacity,
      stroke: stroke,
      x: x,
      y: y,
      width: width,
      height: height
    }, idx);
  });
};
exports.getBarsSVG2 = getBarsSVG2;
//# sourceMappingURL=StackedBarSeriesFn.js.map