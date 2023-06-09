import {
  max,
  min
} from '../../d3Array';

import {
  getClosestItemIndexes,
  head,
  last
} from '../utils';

const mathFloor = Math.floor
, mathMax = Math.max
, mathCeil = Math.ceil;

const getNewEnd = (
  fallbackEnd,
  xAccessor,
  initialXScale,
  start
) => {
  const { lastItem, lastItemX } = fallbackEnd
  , lastItemXValue = xAccessor(lastItem)
  , [rangeStart, rangeEnd] = initialXScale.range()
  , newEnd = ((rangeEnd - rangeStart) / (lastItemX.valueOf() - rangeStart)) * (lastItemXValue.valueOf() - start.valueOf()) + start.valueOf();
  return newEnd;
}
, extentsWrapper = (
  useWholeData,
  clamp,
  pointsPerPxThreshold,
  minPointsPerPxThreshold,
  flipXScale
) => {
    const filterData = (
      data,
      inputDomain,
      xAccessor,
      initialXScale, {
        currentPlotData,
        currentDomain,
        fallbackStart,
        fallbackEnd,
        ignoreThresholds = false
      } = {}
    ) => {
        if (useWholeData) {
          return {
            plotData: data,
            domain: inputDomain
          };
        }
        let left = head(inputDomain)
        , right = last(inputDomain)
        , clampedDomain = inputDomain
        , filteredData = getFilteredResponse(data, left, right, xAccessor);
        if (filteredData.length === 1 && fallbackStart !== undefined) {
          left = fallbackStart;
          right = getNewEnd(fallbackEnd, xAccessor, initialXScale, left);
          clampedDomain = [left, right];
          filteredData = getFilteredResponse(data, left, right, xAccessor);
        }
        if (typeof clamp === "function") {
          clampedDomain = clamp(clampedDomain, [xAccessor(head(data)), xAccessor(last(data))]);
        } else {
            if (clamp === "left" || clamp === "both" || clamp === true) {
              clampedDomain = [max([left, xAccessor(head(data))]), clampedDomain[1]];
            }
            if (clamp === "right" || clamp === "both" || clamp === true) {
              clampedDomain = [clampedDomain[0], min([right, xAccessor(last(data))])];
            }
        }
        if (clampedDomain !== inputDomain) {
          filteredData = getFilteredResponse(data, clampedDomain[0], clampedDomain[1], xAccessor);
        }
        const realInputDomain = clampedDomain
        , xScale = initialXScale
           .copy()
           .domain(realInputDomain);
        let width = mathFloor(xScale(xAccessor(last(filteredData))) - xScale(xAccessor(head(filteredData))));
        // prevent negative width when flipXScale
        if (flipXScale && width < 0) {
          width = width * -1;
        }
        let plotData, domain;
        const chartWidth = last(xScale.range()) - head(xScale.range());
        if ((ignoreThresholds && filteredData.length > 1) ||
          canShowTheseManyPeriods(width, filteredData.length, pointsPerPxThreshold, minPointsPerPxThreshold)) {
          plotData = filteredData;
          domain = realInputDomain;
        } else {
           if (chartWidth > showMaxThreshold(width, pointsPerPxThreshold) && fallbackEnd != null) {
             plotData = filteredData;
             const newEnd = getNewEnd(fallbackEnd, xAccessor, initialXScale, head(realInputDomain));
             domain = [head(realInputDomain), newEnd];
           } else {
             plotData = currentPlotData ?? filteredData.slice(filteredData.length - showMax(width, pointsPerPxThreshold));
             domain = currentDomain ?? [xAccessor(head(plotData)), xAccessor(last(plotData))];
           }
        }
        return { plotData, domain };
    }
    return { filterData };
}
, canShowTheseManyPeriods = (
  width,
  arrayLength,
  maxThreshold,
  minThreshold
) => {
  const widthAdjustedMinThreshold = showMinThreshold(width, minThreshold)
  , widthAdjustedMaxTheshold = showMaxThreshold(width, maxThreshold);
  return arrayLength >= widthAdjustedMinThreshold && arrayLength < widthAdjustedMaxTheshold;
}
, showMinThreshold = (
  width,
  threshold
) => mathMax(1, mathCeil(width * threshold))
, showMaxThreshold = (
  width,
  threshold
) => mathFloor(width * threshold)
, showMax = (
  width,
  threshold
) => mathFloor(showMaxThreshold(width, threshold) * 0.97)
, getFilteredResponse = (
  data,
  left,
  right,
  xAccessor
) => data.slice(
  getClosestItemIndexes(data, left, xAccessor).left,
  getClosestItemIndexes(data, right, xAccessor).right + 1
);

export default function ({
  xScale,
  useWholeData,
  clamp,
  pointsPerPxThreshold,
  minPointsPerPxThreshold,
  flipXScale
 }) {
    return extentsWrapper(
      useWholeData || xScale.invert == null,
      clamp,
      pointsPerPxThreshold,
      minPointsPerPxThreshold,
      flipXScale
    );
}
