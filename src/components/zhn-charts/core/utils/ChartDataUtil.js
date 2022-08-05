import { extent } from 'd3-array';
import flattenDeep from 'lodash.flattendeep';
import React from 'react';
import Chart  from '../Chart';

import {
  functor,
  getClosestItem,
  isDefined,
  isNotDefined,
  isObject,
  mapObject,
  shallowEqual,
  zipper
} from "./index";

const _isArr = Array.isArray;

const getDimensions = ({
    width,
    height
  },
  chartProps
) => ({
  availableHeight: height,
  width,
  height: chartProps.height || height,
})

const values = (func) => (d) => {
  const obj = func(d);
  return isObject(obj)
    ? mapObject(obj)
    : obj;
}

const isArraySize2AndNumber = (
  yExtentsProp
) => {
  if (_isArr(yExtentsProp) && yExtentsProp.length === 2) {
    const [a, b] = yExtentsProp;
    return typeof a === "number"
      && typeof b === "number";
  }
  return false;
}

const isChartProps = (
  props
) => props === void 0 || props.id === void 0
  ? false
  : true;

export const getNewChartConfig = (
  innerDimension,
  children,
  existingChartConfig = []
) => React.Children.map(children, each => {
    if (each != null && isChartProps(each.props)) {
        const chartProps = {
          ...Chart.defaultProps,
          ...each.props
        }
        , {
          id,
          origin,
          padding,
          yExtents: yExtentsProp,
          yScale: yScaleProp,
          flipYScale,
          yExtentsCalculator
        } = chartProps
        , yScale = yScaleProp.copy()
        , {
          width,
          height,
          availableHeight
        } = getDimensions(innerDimension, chartProps)
        , { yPan } = chartProps
        , yExtents = isDefined(yExtentsProp)
            ? (_isArr(yExtentsProp) ? yExtentsProp : [yExtentsProp]).map(functor)
            : undefined
        , prevChartConfig = existingChartConfig.find((d) => d.id === id);
        let { yPanEnabled } = chartProps;

        if (isArraySize2AndNumber(yExtentsProp)) {
            if (isDefined(prevChartConfig)
              && prevChartConfig.yPan
              && prevChartConfig.yPanEnabled
              && yPan
              && yPanEnabled
              && shallowEqual(prevChartConfig.originalYExtentsProp, yExtentsProp)) {
               yScale.domain(prevChartConfig.yScale.domain());
            } else {
               const [a, b] = yExtentsProp;
               yScale.domain([a, b]);
            }
        } else if (isDefined(prevChartConfig) && prevChartConfig.yPanEnabled) {
            if (isArraySize2AndNumber(prevChartConfig.originalYExtentsProp)) {
              // do nothing
            } else {
              yScale.domain(prevChartConfig.yScale.domain());
              yPanEnabled = true;
            }
        }
        return {
           id,
           origin: functor(origin)(width, availableHeight),
           padding,
           originalYExtentsProp: yExtentsProp,
           yExtents,
           yExtentsCalculator,
           flipYScale,
           yScale,
           yPan,
           yPanEnabled,
           width,
           height,
        };
    }
    return;
 })
 .filter(each => each !== undefined);

export const getCurrentCharts = (
  chartConfig,
  mouseXY
) => chartConfig
  .filter(config => {
     const top = config.origin[1]
     , bottom = top + config.height;
     return mouseXY[1] > top && mouseXY[1] < bottom;
   })
  .map(config => config.id)

const setRange = (
  scale,
  height,
  padding,
  flipYScale
) => {
   if (scale.rangeRoundPoints || isNotDefined(scale.invert)) {
     if (isNaN(padding)) {
       throw new Error("padding has to be a number for ordinal scale");
     }
     if (scale.rangeRoundPoints) {
       scale.rangeRoundPoints(
         flipYScale ? [0, height] : [height, 0],
         padding
       );
     }
     if (scale.rangeRound) {
       scale.range(
         flipYScale ? [0, height] : [height, 0]
       ).padding(padding);
     }
   } else {
       const {
         top,
         bottom
       } = isNaN(padding)
         ? padding
         : { top: padding, bottom: padding };
       scale.range(
         flipYScale
           ? [top, height - bottom]
           : [height - bottom, top]
       );
   }
   return scale;
}

const yDomainFromYExtents = (
  yExtents,
  yScale,
  plotData
) => {
    const yValues = yExtents
      .map(eachExtent => plotData.map(values(eachExtent)))
    , allYValues = flattenDeep(yValues)
    , realYDomain = yScale.invert
        ? extent(allYValues)
        : [...new Set(allYValues).values()];
    return realYDomain;
}

export const getChartConfigWithUpdatedYScales = (
  chartConfig, {
    plotData,
    xAccessor,
    displayXAccessor,
    fullData
  },
  xDomain,
  dy,
  chartsToPan
) => {
    const yDomains = chartConfig.map(({ yExtentsCalculator, yExtents, yScale }) => {
        const realYDomain = isDefined(yExtentsCalculator)
          ? yExtentsCalculator({ plotData, xDomain, xAccessor, displayXAccessor, fullData })
          : yDomainFromYExtents(yExtents, yScale, plotData)
        , yDomainDY = dy !== undefined
          ? yScale
             .range()
             .map((each) => each - dy)
             .map(yScale.invert)
          : yScale.domain();
        return {
            realYDomain,
            yDomainDY,
            prevYDomain: yScale.domain(),
        };
    });

    const combine = zipper()
      .combine((config, { realYDomain, yDomainDY, prevYDomain }) => {
        const {
          id,
          padding,
          height,
          yScale,
          yPan,
          flipYScale,
          yPanEnabled = false
        } = config
        , another = chartsToPan !== undefined
           ? chartsToPan.indexOf(id) > -1
           : true
        , domain = yPan && yPanEnabled
           ? another
              ? yDomainDY
              : prevYDomain
           : realYDomain
        , newYScale = setRange(
            yScale.copy().domain(domain),
            height,
            padding,
            flipYScale
          );
        return {
          ...config,
          yScale: newYScale,
          realYDomain
        };
    });

    const updatedChartConfig = combine(chartConfig, yDomains);
    return updatedChartConfig;
}

export const getCurrentItem = (
  xScale,
  xAccessor,
  mouseXY,
  plotData
) => {
   let item;
   if (xScale.invert) {
     const xValue = xScale.invert(mouseXY[0]);
     item = getClosestItem(plotData, xValue, xAccessor);
   } else {
     const dr = xScale
       .range()
       .map((d, idx) => ({ x: Math.abs(d - mouseXY[0]), idx }))
       .reduce((a, b) => (a.x < b.x ? a : b));
     item = dr !== undefined
       ? plotData[dr.idx]
       : plotData[0];
   }
   return item;
}