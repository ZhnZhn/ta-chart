"use strict";

exports.__esModule = true;
exports["default"] = _default;
var _d3Array = require("d3-array");
var _utils = require("../utils");
function getNewEnd(fallbackEnd, xAccessor, initialXScale, start) {
  var lastItem = fallbackEnd.lastItem,
    lastItemX = fallbackEnd.lastItemX;
  var lastItemXValue = xAccessor(lastItem);
  var _initialXScale$range = initialXScale.range(),
    rangeStart = _initialXScale$range[0],
    rangeEnd = _initialXScale$range[1];
  var newEnd = (rangeEnd - rangeStart) / (lastItemX.valueOf() - rangeStart) * (lastItemXValue.valueOf() - start.valueOf()) + start.valueOf();
  return newEnd;
}
function extentsWrapper(useWholeData, clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale) {
  function filterData(data, inputDomain, xAccessor, initialXScale, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      currentPlotData = _ref.currentPlotData,
      currentDomain = _ref.currentDomain,
      fallbackStart = _ref.fallbackStart,
      fallbackEnd = _ref.fallbackEnd,
      _ref$ignoreThresholds = _ref.ignoreThresholds,
      ignoreThresholds = _ref$ignoreThresholds === void 0 ? false : _ref$ignoreThresholds;
    if (useWholeData) {
      return {
        plotData: data,
        domain: inputDomain
      };
    }
    var left = (0, _utils.head)(inputDomain);
    var right = (0, _utils.last)(inputDomain);
    var clampedDomain = inputDomain;
    var filteredData = getFilteredResponse(data, left, right, xAccessor);
    if (filteredData.length === 1 && fallbackStart !== undefined) {
      left = fallbackStart;
      right = getNewEnd(fallbackEnd, xAccessor, initialXScale, left);
      clampedDomain = [left, right];
      filteredData = getFilteredResponse(data, left, right, xAccessor);
    }
    if (typeof clamp === "function") {
      clampedDomain = clamp(clampedDomain, [xAccessor((0, _utils.head)(data)), xAccessor((0, _utils.last)(data))]);
    } else {
      if (clamp === "left" || clamp === "both" || clamp === true) {
        clampedDomain = [(0, _d3Array.max)([left, xAccessor((0, _utils.head)(data))]), clampedDomain[1]];
      }
      if (clamp === "right" || clamp === "both" || clamp === true) {
        clampedDomain = [clampedDomain[0], (0, _d3Array.min)([right, xAccessor((0, _utils.last)(data))])];
      }
    }
    if (clampedDomain !== inputDomain) {
      filteredData = getFilteredResponse(data, clampedDomain[0], clampedDomain[1], xAccessor);
    }
    var realInputDomain = clampedDomain;
    var xScale = initialXScale.copy().domain(realInputDomain);
    var width = Math.floor(xScale(xAccessor((0, _utils.last)(filteredData))) - xScale(xAccessor((0, _utils.head)(filteredData))));
    // prevent negative width when flipXScale
    if (flipXScale && width < 0) {
      width = width * -1;
    }
    var plotData;
    var domain;
    var chartWidth = (0, _utils.last)(xScale.range()) - (0, _utils.head)(xScale.range());
    if (ignoreThresholds && filteredData.length > 1 || canShowTheseManyPeriods(width, filteredData.length, pointsPerPxThreshold, minPointsPerPxThreshold)) {
      plotData = filteredData;
      domain = realInputDomain;
    } else {
      if (chartWidth > showMaxThreshold(width, pointsPerPxThreshold) && fallbackEnd != null) {
        plotData = filteredData;
        var newEnd = getNewEnd(fallbackEnd, xAccessor, initialXScale, (0, _utils.head)(realInputDomain));
        domain = [(0, _utils.head)(realInputDomain), newEnd];
      } else {
        plotData = currentPlotData != null ? currentPlotData : filteredData.slice(filteredData.length - showMax(width, pointsPerPxThreshold));
        domain = currentDomain != null ? currentDomain : [xAccessor((0, _utils.head)(plotData)), xAccessor((0, _utils.last)(plotData))];
      }
    }
    return {
      plotData: plotData,
      domain: domain
    };
  }
  return {
    filterData: filterData
  };
}
function canShowTheseManyPeriods(width, arrayLength, maxThreshold, minThreshold) {
  var widthAdjustedMinThreshold = showMinThreshold(width, minThreshold);
  var widthAdjustedMaxTheshold = showMaxThreshold(width, maxThreshold);
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
  var newLeftIndex = (0, _utils.getClosestItemIndexes)(data, left, xAccessor).left;
  var newRightIndex = (0, _utils.getClosestItemIndexes)(data, right, xAccessor).right;
  var filteredData = data.slice(newLeftIndex, newRightIndex + 1);
  return filteredData;
}
function _default(_ref2) {
  var xScale = _ref2.xScale,
    useWholeData = _ref2.useWholeData,
    clamp = _ref2.clamp,
    pointsPerPxThreshold = _ref2.pointsPerPxThreshold,
    minPointsPerPxThreshold = _ref2.minPointsPerPxThreshold,
    flipXScale = _ref2.flipXScale;
  return extentsWrapper(useWholeData || (0, _utils.isNotDefined)(xScale.invert), clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale);
}
//# sourceMappingURL=evaluator.js.map