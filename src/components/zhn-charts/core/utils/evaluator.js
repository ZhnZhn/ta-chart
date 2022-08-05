import {
  max,
  min
} from "d3-array";

import {
  getClosestItemIndexes,
  head,
  isDefined,
  isNotDefined,
  last
} from '../utils';

function getNewEnd(fallbackEnd, xAccessor, initialXScale, start) {
    const { lastItem, lastItemX } = fallbackEnd;
    const lastItemXValue = xAccessor(lastItem);
    const [rangeStart, rangeEnd] = initialXScale.range();
    const newEnd = ((rangeEnd - rangeStart) / (lastItemX.valueOf() - rangeStart)) * (lastItemXValue.valueOf() - start.valueOf()) +
        start.valueOf();
    return newEnd;
}

function extentsWrapper(useWholeData, clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale) {
    function filterData(data, inputDomain, xAccessor, initialXScale, { currentPlotData, currentDomain, fallbackStart, fallbackEnd, ignoreThresholds = false } = {}) {
        if (useWholeData) {
            return { plotData: data, domain: inputDomain };
        }
        let left = head(inputDomain);
        let right = last(inputDomain);
        let clampedDomain = inputDomain;
        let filteredData = getFilteredResponse(data, left, right, xAccessor);
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
        const realInputDomain = clampedDomain;
        const xScale = initialXScale.copy().domain(realInputDomain);
        let width = Math.floor(xScale(xAccessor(last(filteredData))) - xScale(xAccessor(head(filteredData))));
        // prevent negative width when flipXScale
        if (flipXScale && width < 0) {
            width = width * -1;
        }
        let plotData;
        let domain;
        const chartWidth = last(xScale.range()) - head(xScale.range());
        if ((ignoreThresholds && filteredData.length > 1) ||
            canShowTheseManyPeriods(width, filteredData.length, pointsPerPxThreshold, minPointsPerPxThreshold)) {
            plotData = filteredData;
            domain = realInputDomain;
        } else {
            if (chartWidth > showMaxThreshold(width, pointsPerPxThreshold) && isDefined(fallbackEnd)) {
                plotData = filteredData;
                const newEnd = getNewEnd(fallbackEnd, xAccessor, initialXScale, head(realInputDomain));
                domain = [head(realInputDomain), newEnd];
            } else {
                plotData =
                    currentPlotData ?? filteredData.slice(filteredData.length - showMax(width, pointsPerPxThreshold));
                domain = currentDomain ?? [xAccessor(head(plotData)), xAccessor(last(plotData))];
            }
        }
        return { plotData, domain };
    }
    return { filterData };
}

function canShowTheseManyPeriods(width, arrayLength, maxThreshold, minThreshold) {
    const widthAdjustedMinThreshold = showMinThreshold(width, minThreshold);
    const widthAdjustedMaxTheshold = showMaxThreshold(width, maxThreshold);
    return arrayLength >= widthAdjustedMinThreshold && arrayLength < widthAdjustedMaxTheshold;
}

function showMinThreshold(width, threshold) {
    return Math.max(1, Math.ceil(width * threshold));
}

function showMaxThreshold(width, threshold) {
    return Math.floor(width * threshold);
}

function showMax(width, threshold) {
    return Math.floor(showMaxThreshold(width, threshold) * 0.97);
}

function getFilteredResponse(data, left, right, xAccessor) {
    const newLeftIndex = getClosestItemIndexes(data, left, xAccessor).left;
    const newRightIndex = getClosestItemIndexes(data, right, xAccessor).right;
    const filteredData = data.slice(newLeftIndex, newRightIndex + 1);
    return filteredData;
}

export default function ({
  xScale,
  useWholeData,
  clamp,
  pointsPerPxThreshold,
  minPointsPerPxThreshold,
  flipXScale
 }) {
    return extentsWrapper(useWholeData || isNotDefined(xScale.invert), clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale);
}
