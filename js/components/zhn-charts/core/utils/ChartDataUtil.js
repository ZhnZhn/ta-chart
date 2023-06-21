"use strict";

exports.__esModule = true;
exports.getNewChartConfig = exports.getCurrentItem = exports.getCurrentCharts = exports.getChartConfigWithUpdatedYScales = void 0;
var _uiApi = require("../../../uiApi");
var _d3Array = require("../../d3Array");
var _Chart = require("../Chart");
var _index = require("./index");
//import flattenDeep from 'lodash.flattendeep';

const _isArr = Array.isArray,
  mathAbs = Math.abs;
const getDimensions = (_ref, chartProps) => {
  let {
    width,
    height
  } = _ref;
  return {
    availableHeight: height,
    width,
    height: chartProps.height || height
  };
};
const values = func => d => {
  const obj = func(d);
  return (0, _index.isObject)(obj) ? (0, _index.mapObject)(obj) : obj;
};
const _isNumber = v => typeof v === 'number';
const isArraySize2AndNumber = yExtentsProp => {
  if (_isArr(yExtentsProp) && yExtentsProp.length === 2) {
    const [a, b] = yExtentsProp;
    return _isNumber(a) && _isNumber(b);
  }
  return false;
};
const isChartProps = props => props === void 0 || props.id === void 0 ? false : true;
const getNewChartConfig = function (innerDimension, children, existingChartConfig) {
  if (existingChartConfig === void 0) {
    existingChartConfig = [];
  }
  return _uiApi.Children.map(children, each => {
    if (each != null && isChartProps(each.props)) {
      const chartProps = {
          ..._Chart.ChartDefaultConfig,
          ...each.props
        },
        {
          id,
          origin,
          padding,
          yExtents: yExtentsProp,
          yScale: yScaleProp = _Chart.ChartDefaultConfig.yScale,
          flipYScale,
          yExtentsCalculator
        } = chartProps,
        yScale = yScaleProp.copy(),
        {
          width,
          height,
          availableHeight
        } = getDimensions(innerDimension, chartProps),
        {
          yPan
        } = chartProps,
        yExtents = yExtentsProp ? (_isArr(yExtentsProp) ? yExtentsProp : [yExtentsProp]).map(_index.functor) : undefined,
        prevChartConfig = existingChartConfig.find(d => d.id === id);
      let {
        yPanEnabled
      } = chartProps;
      if (isArraySize2AndNumber(yExtentsProp)) {
        if (prevChartConfig && prevChartConfig.yPan && prevChartConfig.yPanEnabled && yPan && yPanEnabled && (0, _index.shallowEqual)(prevChartConfig.originalYExtentsProp, yExtentsProp)) {
          yScale.domain(prevChartConfig.yScale.domain());
        } else {
          const [a, b] = yExtentsProp;
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
        id,
        origin: (0, _index.functor)(origin)(width, availableHeight),
        padding,
        originalYExtentsProp: yExtentsProp,
        yExtents,
        yExtentsCalculator,
        flipYScale,
        yScale,
        yPan,
        yPanEnabled,
        width,
        height
      };
    }
    return;
  }).filter(each => each !== undefined);
};
exports.getNewChartConfig = getNewChartConfig;
const getCurrentCharts = (chartConfig, mouseXY) => chartConfig.filter(config => {
  const top = config.origin[1],
    bottom = top + config.height;
  return mouseXY[1] > top && mouseXY[1] < bottom;
}).map(config => config.id);
exports.getCurrentCharts = getCurrentCharts;
const setRange = (scale, height, padding, flipYScale) => {
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
    const {
      top,
      bottom
    } = isNaN(padding) ? padding : {
      top: padding,
      bottom: padding
    };
    scale.range(flipYScale ? [top, height - bottom] : [height - bottom, top]);
  }
  return scale;
};

/*
  type Point = [number, number]
  type yValues = Array<Array[number || void 0]> || Array<Array[Point]>
*/
const _flattenYValues = yValues => yValues.reduce((result, arrItem) => {
  if (!_isArr(arrItem[0])) {
    result.push(...arrItem);
  } else {
    arrItem.forEach(point => {
      result.push(...point);
    });
  }
  return result;
}, []);
const yDomainFromYExtents = (yExtents, yScale, plotData) => {
  const yValues = yExtents.map(eachExtent => plotData.map(values(eachExtent)))
    //, allYValues = flattenDeep(yValues)
    ,
    allYValues = _flattenYValues(yValues),
    realYDomain = yScale.invert ? (0, _d3Array.extent)(allYValues) : [...new Set(allYValues).values()];
  return realYDomain;
};
const getChartConfigWithUpdatedYScales = (chartConfig, _ref2, xDomain, dy, chartsToPan) => {
  let {
    plotData,
    xAccessor,
    displayXAccessor,
    fullData
  } = _ref2;
  const yDomains = chartConfig.map(_ref3 => {
    let {
      yExtentsCalculator,
      yExtents,
      yScale
    } = _ref3;
    const realYDomain = yExtentsCalculator ? yExtentsCalculator({
        plotData,
        xDomain,
        xAccessor,
        displayXAccessor,
        fullData
      }) : yDomainFromYExtents(yExtents, yScale, plotData),
      yDomainDY = dy !== undefined ? yScale.range().map(each => each - dy).map(yScale.invert) : yScale.domain();
    return {
      realYDomain,
      yDomainDY,
      prevYDomain: yScale.domain()
    };
  });
  const combine = (0, _index.zipper)().combine((config, _ref4) => {
    let {
      realYDomain,
      yDomainDY,
      prevYDomain
    } = _ref4;
    const {
        id,
        padding,
        height,
        yScale,
        yPan,
        flipYScale,
        yPanEnabled = false
      } = config,
      another = chartsToPan !== undefined ? chartsToPan.indexOf(id) > -1 : true,
      domain = yPan && yPanEnabled ? another ? yDomainDY : prevYDomain : realYDomain,
      newYScale = setRange(yScale.copy().domain(domain), height, padding, flipYScale);
    return {
      ...config,
      yScale: newYScale,
      realYDomain
    };
  });
  const updatedChartConfig = combine(chartConfig, yDomains);
  return updatedChartConfig;
};
exports.getChartConfigWithUpdatedYScales = getChartConfigWithUpdatedYScales;
const getCurrentItem = (xScale, xAccessor, mouseXY, plotData) => {
  let item;
  if (xScale.invert) {
    const xValue = xScale.invert(mouseXY[0]);
    item = (0, _index.getClosestItem)(plotData, xValue, xAccessor);
  } else {
    const dr = xScale.range().map((d, idx) => ({
      x: mathAbs(d - mouseXY[0]),
      idx
    })).reduce((a, b) => a.x < b.x ? a : b);
    item = dr !== undefined ? plotData[dr.idx] : plotData[0];
  }
  return item;
};
exports.getCurrentItem = getCurrentItem;
//# sourceMappingURL=ChartDataUtil.js.map