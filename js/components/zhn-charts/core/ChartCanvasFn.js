"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.updateChart = exports.shouldResetChart = exports.resetChart = exports.pinchCoordinates = exports.isInteractionEnabled = exports.getDimensions = exports.getCursorStyle = exports.calculateFullData = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Array = require("../d3Array");
var _utils = require("./utils");
var _ChartDataUtil = require("./utils/ChartDataUtil");
var _evaluator2 = _interopRequireDefault(require("./utils/evaluator"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var CANDIDATES_FOR_RESET = ["seriesName"];
var shouldResetChart = function shouldResetChart(thisProps, nextProps) {
  return !CANDIDATES_FOR_RESET.every(function (key) {
    return (0, _utils.shallowEqual)(thisProps[key], nextProps[key]);
  });
};

/*
.${CL_CROSSHAIR_CURSOR} {
  pointer-events: all;
  cursor: crosshair;
}
*/
exports.shouldResetChart = shouldResetChart;
var getCursorStyle = function getCursorStyle() {
  var tooltipStyle = "\n\t." + _CL.CL_GRABBING_CURSOR + " {\n\t\tpointer-events: all;\n\t\tcursor: -moz-grabbing;\n\t\tcursor: -webkit-grabbing;\n\t\tcursor: grabbing;\n\t}\n\t." + _CL.CL_CROSSHAIR_CURSOR + " {\n\t\tpointer-events: all;\n\t\tcursor: arrow;\n\t}\n\t." + _CL.CL_TOOLTIP_HOVER + " {\n\t\tpointer-events: all;\n\t\tcursor: pointer;\n\t}\n\t." + _CL.CL_AVOID_INTERACTION + " {\n\t\tpointer-events: none;\n\t}\n\t." + _CL.CL_ENABLE_INTERACTION + " {\n\t\tpointer-events: all;\n\t}\n\t." + _CL.CL_TOOLTIP + " {\n\t\tpointer-events: all;\n\t\tcursor: pointer;\n\t}\n\t." + _CL.CL_DEFAULT_CURSOR + " {\n\t\tcursor: default;\n\t}\n\t." + _CL.CL_MOVE_CURSOR + " {\n\t\tcursor: move;\n\t}\n\t." + _CL.CL_POINTER_CURSOR + " {\n\t\tcursor: pointer;\n\t}\n\t." + _CL.CL_NS_RESIZE_CURSOR + " {\n\t\tcursor: ns-resize;\n\t}\n\t." + _CL.CL_EW_RESIZE_CURSOR + " {\n\t\tcursor: ew-resize;\n\t}";
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
    type: "text/css",
    children: tooltipStyle
  });
};
exports.getCursorStyle = getCursorStyle;
var getDimensions = function getDimensions(_ref) {
  var _ref$margin = _ref.margin,
    top = _ref$margin.top,
    bottom = _ref$margin.bottom,
    left = _ref$margin.left,
    right = _ref$margin.right,
    height = _ref.height,
    width = _ref.width;
  return {
    height: height - top - bottom,
    width: width - left - right
  };
};
exports.getDimensions = getDimensions;
var calculateFullData = function calculateFullData(props) {
  var fullData = props.data,
    plotFull = props.plotFull,
    xScale = props.xScale,
    clamp = props.clamp,
    pointsPerPxThreshold = props.pointsPerPxThreshold,
    flipXScale = props.flipXScale,
    xAccessor = props.xAccessor,
    displayXAccessor = props.displayXAccessor,
    minPointsPerPxThreshold = props.minPointsPerPxThreshold,
    useWholeData = plotFull !== undefined ? plotFull : xAccessor === _utils.identity,
    _evaluator = (0, _evaluator2["default"])({
      xScale: xScale,
      useWholeData: useWholeData,
      clamp: clamp,
      pointsPerPxThreshold: pointsPerPxThreshold,
      minPointsPerPxThreshold: minPointsPerPxThreshold,
      flipXScale: flipXScale
    }),
    filterData = _evaluator.filterData;
  return {
    xAccessor: xAccessor,
    displayXAccessor: displayXAccessor != null ? displayXAccessor : xAccessor,
    xScale: xScale.copy(),
    fullData: fullData,
    filterData: filterData
  };
};
exports.calculateFullData = calculateFullData;
var setXRange = function setXRange(xScale, dimensions, padding, direction) {
  if (direction === void 0) {
    direction = 1;
  }
  if (xScale.rangeRoundPoints) {
    if (isNaN(padding)) {
      throw new Error("padding has to be a number for ordinal scale");
    }
    xScale.rangeRoundPoints([0, dimensions.width], padding);
  } else if (xScale.padding) {
    if (isNaN(padding)) {
      throw new Error("padding has to be a number for ordinal scale");
    }
    xScale.range([0, dimensions.width]);
    xScale.padding(padding / 2);
  } else {
    var _ref2 = isNaN(padding) ? padding : {
        left: padding,
        right: padding
      },
      left = _ref2.left,
      right = _ref2.right;
    if (direction > 0) {
      xScale.range([left, dimensions.width - right]);
    } else {
      xScale.range([dimensions.width - right, left]);
    }
  }
  return xScale;
};
var getXScaleDirection = function getXScaleDirection(flipXScale) {
  return flipXScale ? -1 : 1;
};
var calculateState = function calculateState(props) {
  var inputXAccesor = props.xAccessor,
    xExtentsProp = props.xExtents,
    data = props.data,
    padding = props.padding,
    flipXScale = props.flipXScale,
    direction = getXScaleDirection(flipXScale),
    dimensions = getDimensions(props),
    extent = typeof xExtentsProp === "function" ? xExtentsProp(data) : (0, _d3Array.extent)(xExtentsProp.map(function (d) {
      return (0, _utils.functor)(d);
    }).map(function (each) {
      return each(data, inputXAccesor);
    })),
    _calculateFullData = calculateFullData(props),
    xAccessor = _calculateFullData.xAccessor,
    displayXAccessor = _calculateFullData.displayXAccessor,
    xScale = _calculateFullData.xScale,
    fullData = _calculateFullData.fullData,
    filterData = _calculateFullData.filterData,
    updatedXScale = setXRange(xScale, dimensions, padding, direction),
    _filterData = filterData(fullData, extent, inputXAccesor, updatedXScale),
    plotData = _filterData.plotData,
    domain = _filterData.domain;
  return {
    plotData: plotData,
    xScale: updatedXScale.domain(domain),
    xAccessor: xAccessor,
    displayXAccessor: displayXAccessor,
    fullData: fullData,
    filterData: filterData
  };
};
var resetChart = function resetChart(props) {
  var state = calculateState(props),
    xAccessor = state.xAccessor,
    displayXAccessor = state.displayXAccessor,
    fullData = state.fullData,
    initialPlotData = state.plotData,
    xScale = state.xScale,
    postCalculator = props.postCalculator,
    children = props.children,
    plotData = postCalculator !== undefined ? postCalculator(initialPlotData) : initialPlotData,
    dimensions = getDimensions(props),
    chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)((0, _ChartDataUtil.getNewChartConfig)(dimensions, children), {
      plotData: plotData,
      xAccessor: xAccessor,
      displayXAccessor: displayXAccessor,
      fullData: fullData
    }, xScale.domain());
  return (0, _extends2["default"])({}, state, {
    xScale: xScale,
    plotData: plotData,
    chartConfigs: chartConfigs
  });
};
exports.resetChart = resetChart;
var updateChart = function updateChart(newState, initialXScale, props, lastItemWasVisible, initialChartConfig) {
  var fullData = newState.fullData,
    xScale = newState.xScale,
    xAccessor = newState.xAccessor,
    displayXAccessor = newState.displayXAccessor,
    filterData = newState.filterData,
    lastItem = (0, _utils.last)(fullData),
    lastXItem = xAccessor(lastItem),
    _initialXScale$domain = initialXScale.domain(),
    start = _initialXScale$domain[0],
    end = _initialXScale$domain[1],
    postCalculator = props.postCalculator,
    children = props.children,
    padding = props.padding,
    flipXScale = props.flipXScale,
    maintainPointsPerPixelOnResize = props.maintainPointsPerPixelOnResize,
    direction = getXScaleDirection(flipXScale),
    dimensions = getDimensions(props),
    updatedXScale = setXRange(xScale, dimensions, padding, direction);
  var initialPlotData;
  if (!lastItemWasVisible || end >= lastXItem) {
    // resize comes here...
    // get plotData between [start, end] and do not change the domain
    var _initialXScale$range = initialXScale.range(),
      rangeStart = _initialXScale$range[0],
      rangeEnd = _initialXScale$range[1],
      _updatedXScale$range = updatedXScale.range(),
      newRangeStart = _updatedXScale$range[0],
      newRangeEnd = _updatedXScale$range[1],
      newDomainExtent = (newRangeEnd - newRangeStart) / (rangeEnd - rangeStart) * (end.valueOf() - start.valueOf()),
      newStart = maintainPointsPerPixelOnResize ? end.valueOf() - newDomainExtent : start,
      lastItemX = initialXScale(lastXItem),
      response = filterData(fullData, [newStart, end], xAccessor, updatedXScale, {
        fallbackStart: start,
        fallbackEnd: {
          lastItem: lastItem,
          lastItemX: lastItemX
        }
      });
    initialPlotData = response.plotData;
    updatedXScale.domain(response.domain);
  } else if (lastItemWasVisible && end < lastXItem) {
    // this is when a new item is added and last item was visible
    // so slide over and show the new item also
    // get plotData between [xAccessor(l) - (end - start), xAccessor(l)] and DO change the domain
    var dx = initialXScale(lastXItem) - initialXScale.range()[1],
      _initialXScale$range$ = initialXScale.range().map(function (x) {
        return x + dx;
      }).map(function (x) {
        return initialXScale.invert(x);
      }),
      _newStart = _initialXScale$range$[0],
      newEnd = _initialXScale$range$[1],
      _response = filterData(fullData, [_newStart, newEnd], xAccessor, updatedXScale);
    initialPlotData = _response.plotData;
    // if last item was visible, then shift
    updatedXScale.domain(_response.domain);
  }
  var plotData = postCalculator(initialPlotData),
    _newChartConfig = (0, _ChartDataUtil.getNewChartConfig)(dimensions, children, initialChartConfig),
    chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(_newChartConfig, {
      plotData: plotData,
      xAccessor: xAccessor,
      displayXAccessor: displayXAccessor,
      fullData: fullData
    }, updatedXScale.domain());
  return {
    xScale: updatedXScale,
    xAccessor: xAccessor,
    chartConfigs: chartConfigs,
    plotData: plotData,
    fullData: fullData,
    filterData: filterData
  };
};
exports.updateChart = updateChart;
var pinchCoordinates = function pinchCoordinates(_ref3) {
  var touch1Pos = _ref3.touch1Pos,
    touch2Pos = _ref3.touch2Pos;
  return {
    topLeft: [Math.min(touch1Pos[0], touch2Pos[0]), Math.min(touch1Pos[1], touch2Pos[1])],
    bottomRight: [Math.max(touch1Pos[0], touch2Pos[0]), Math.max(touch1Pos[1], touch2Pos[1])]
  };
};
exports.pinchCoordinates = pinchCoordinates;
var isInteractionEnabled = function isInteractionEnabled(xScale, xAccessor, data) {
  return !isNaN(xScale(xAccessor((0, _utils.head)(data)))) && xScale.invert != null;
};
exports.isInteractionEnabled = isInteractionEnabled;
//# sourceMappingURL=ChartCanvasFn.js.map