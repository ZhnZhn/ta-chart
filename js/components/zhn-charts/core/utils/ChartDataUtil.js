"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getNewChartConfig = exports.getCurrentItem = exports.getCurrentCharts = exports.getChartConfigWithUpdatedYScales = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash.flattendeep"));
var _d3Array = require("../../d3Array");
var _Chart = require("../Chart");
var _index = require("./index");
var _isArr = Array.isArray,
  mathAbs = Math.abs;
var getDimensions = function getDimensions(_ref, chartProps) {
  var width = _ref.width,
    height = _ref.height;
  return {
    availableHeight: height,
    width: width,
    height: chartProps.height || height
  };
};
var values = function values(func) {
  return function (d) {
    var obj = func(d);
    return (0, _index.isObject)(obj) ? (0, _index.mapObject)(obj) : obj;
  };
};
var isArraySize2AndNumber = function isArraySize2AndNumber(yExtentsProp) {
  if (_isArr(yExtentsProp) && yExtentsProp.length === 2) {
    var a = yExtentsProp[0],
      b = yExtentsProp[1];
    return typeof a === "number" && typeof b === "number";
  }
  return false;
};
var isChartProps = function isChartProps(props) {
  return props === void 0 || props.id === void 0 ? false : true;
};
var getNewChartConfig = function getNewChartConfig(innerDimension, children, existingChartConfig) {
  if (existingChartConfig === void 0) {
    existingChartConfig = [];
  }
  return _react["default"].Children.map(children, function (each) {
    if (each != null && isChartProps(each.props)) {
      var chartProps = (0, _extends2["default"])({}, _Chart.ChartDefaultConfig, each.props),
        id = chartProps.id,
        origin = chartProps.origin,
        padding = chartProps.padding,
        yExtentsProp = chartProps.yExtents,
        _chartProps$yScale = chartProps.yScale,
        yScaleProp = _chartProps$yScale === void 0 ? _Chart.ChartDefaultConfig.yScale : _chartProps$yScale,
        flipYScale = chartProps.flipYScale,
        yExtentsCalculator = chartProps.yExtentsCalculator,
        yScale = yScaleProp.copy(),
        _getDimensions = getDimensions(innerDimension, chartProps),
        width = _getDimensions.width,
        height = _getDimensions.height,
        availableHeight = _getDimensions.availableHeight,
        yPan = chartProps.yPan,
        yExtents = yExtentsProp ? (_isArr(yExtentsProp) ? yExtentsProp : [yExtentsProp]).map(_index.functor) : undefined,
        prevChartConfig = existingChartConfig.find(function (d) {
          return d.id === id;
        });
      var yPanEnabled = chartProps.yPanEnabled;
      if (isArraySize2AndNumber(yExtentsProp)) {
        if (prevChartConfig && prevChartConfig.yPan && prevChartConfig.yPanEnabled && yPan && yPanEnabled && (0, _index.shallowEqual)(prevChartConfig.originalYExtentsProp, yExtentsProp)) {
          yScale.domain(prevChartConfig.yScale.domain());
        } else {
          var a = yExtentsProp[0],
            b = yExtentsProp[1];
          yScale.domain([a, b]);
        }
      } else if (prevChartConfig && prevChartConfig.yPanEnabled) {
        if (isArraySize2AndNumber(prevChartConfig.originalYExtentsProp)) {
          // do nothing
        } else {
          yScale.domain(prevChartConfig.yScale.domain());
          yPanEnabled = true;
        }
      }
      return {
        id: id,
        origin: (0, _index.functor)(origin)(width, availableHeight),
        padding: padding,
        originalYExtentsProp: yExtentsProp,
        yExtents: yExtents,
        yExtentsCalculator: yExtentsCalculator,
        flipYScale: flipYScale,
        yScale: yScale,
        yPan: yPan,
        yPanEnabled: yPanEnabled,
        width: width,
        height: height
      };
    }
    return;
  }).filter(function (each) {
    return each !== undefined;
  });
};
exports.getNewChartConfig = getNewChartConfig;
var getCurrentCharts = function getCurrentCharts(chartConfig, mouseXY) {
  return chartConfig.filter(function (config) {
    var top = config.origin[1],
      bottom = top + config.height;
    return mouseXY[1] > top && mouseXY[1] < bottom;
  }).map(function (config) {
    return config.id;
  });
};
exports.getCurrentCharts = getCurrentCharts;
var setRange = function setRange(scale, height, padding, flipYScale) {
  if (scale.rangeRoundPoints || scale.invert == null) {
    if (isNaN(padding)) {
      throw new Error("padding has to be a number for ordinal scale");
    }
    if (scale.rangeRoundPoints) {
      scale.rangeRoundPoints(flipYScale ? [0, height] : [height, 0], padding);
    }
    if (scale.rangeRound) {
      scale.range(flipYScale ? [0, height] : [height, 0]).padding(padding);
    }
  } else {
    var _ref2 = isNaN(padding) ? padding : {
        top: padding,
        bottom: padding
      },
      top = _ref2.top,
      bottom = _ref2.bottom;
    scale.range(flipYScale ? [top, height - bottom] : [height - bottom, top]);
  }
  return scale;
};
var yDomainFromYExtents = function yDomainFromYExtents(yExtents, yScale, plotData) {
  var yValues = yExtents.map(function (eachExtent) {
      return plotData.map(values(eachExtent));
    }),
    allYValues = (0, _lodash["default"])(yValues),
    realYDomain = yScale.invert ? (0, _d3Array.extent)(allYValues) : [].concat(new Set(allYValues).values());
  return realYDomain;
};
var getChartConfigWithUpdatedYScales = function getChartConfigWithUpdatedYScales(chartConfig, _ref3, xDomain, dy, chartsToPan) {
  var plotData = _ref3.plotData,
    xAccessor = _ref3.xAccessor,
    displayXAccessor = _ref3.displayXAccessor,
    fullData = _ref3.fullData;
  var yDomains = chartConfig.map(function (_ref4) {
    var yExtentsCalculator = _ref4.yExtentsCalculator,
      yExtents = _ref4.yExtents,
      yScale = _ref4.yScale;
    var realYDomain = yExtentsCalculator ? yExtentsCalculator({
        plotData: plotData,
        xDomain: xDomain,
        xAccessor: xAccessor,
        displayXAccessor: displayXAccessor,
        fullData: fullData
      }) : yDomainFromYExtents(yExtents, yScale, plotData),
      yDomainDY = dy !== undefined ? yScale.range().map(function (each) {
        return each - dy;
      }).map(yScale.invert) : yScale.domain();
    return {
      realYDomain: realYDomain,
      yDomainDY: yDomainDY,
      prevYDomain: yScale.domain()
    };
  });
  var combine = (0, _index.zipper)().combine(function (config, _ref5) {
    var realYDomain = _ref5.realYDomain,
      yDomainDY = _ref5.yDomainDY,
      prevYDomain = _ref5.prevYDomain;
    var id = config.id,
      padding = config.padding,
      height = config.height,
      yScale = config.yScale,
      yPan = config.yPan,
      flipYScale = config.flipYScale,
      _config$yPanEnabled = config.yPanEnabled,
      yPanEnabled = _config$yPanEnabled === void 0 ? false : _config$yPanEnabled,
      another = chartsToPan !== undefined ? chartsToPan.indexOf(id) > -1 : true,
      domain = yPan && yPanEnabled ? another ? yDomainDY : prevYDomain : realYDomain,
      newYScale = setRange(yScale.copy().domain(domain), height, padding, flipYScale);
    return (0, _extends2["default"])({}, config, {
      yScale: newYScale,
      realYDomain: realYDomain
    });
  });
  var updatedChartConfig = combine(chartConfig, yDomains);
  return updatedChartConfig;
};
exports.getChartConfigWithUpdatedYScales = getChartConfigWithUpdatedYScales;
var getCurrentItem = function getCurrentItem(xScale, xAccessor, mouseXY, plotData) {
  var item;
  if (xScale.invert) {
    var xValue = xScale.invert(mouseXY[0]);
    item = (0, _index.getClosestItem)(plotData, xValue, xAccessor);
  } else {
    var dr = xScale.range().map(function (d, idx) {
      return {
        x: mathAbs(d - mouseXY[0]),
        idx: idx
      };
    }).reduce(function (a, b) {
      return a.x < b.x ? a : b;
    });
    item = dr !== undefined ? plotData[dr.idx] : plotData[0];
  }
  return item;
};
exports.getCurrentItem = getCurrentItem;
//# sourceMappingURL=ChartDataUtil.js.map