"use strict";

exports.__esModule = true;
exports["default"] = _default;
var _d3Array = require("../../d3Array");
var _utils = require("../utils");
var mathFloor = Math.floor,
  mathMax = Math.max,
  mathCeil = Math.ceil;
var getNewEnd = function getNewEnd(fallbackEnd, xAccessor, initialXScale, start) {
    var lastItem = fallbackEnd.lastItem,
      lastItemX = fallbackEnd.lastItemX,
      lastItemXValue = xAccessor(lastItem),
      _initialXScale$range = initialXScale.range(),
      rangeStart = _initialXScale$range[0],
      rangeEnd = _initialXScale$range[1],
      newEnd = (rangeEnd - rangeStart) / (lastItemX.valueOf() - rangeStart) * (lastItemXValue.valueOf() - start.valueOf()) + start.valueOf();
    return newEnd;
  },
  extentsWrapper = function extentsWrapper(useWholeData, clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale) {
    var filterData = function filterData(data, inputDomain, xAccessor, initialXScale, _temp) {
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
      var left = (0, _utils.head)(inputDomain),
        right = (0, _utils.last)(inputDomain),
        clampedDomain = inputDomain,
        filteredData = getFilteredResponse(data, left, right, xAccessor);
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
      var realInputDomain = clampedDomain,
        xScale = initialXScale.copy().domain(realInputDomain);
      var width = mathFloor(xScale(xAccessor((0, _utils.last)(filteredData))) - xScale(xAccessor((0, _utils.head)(filteredData))));
      // prevent negative width when flipXScale
      if (flipXScale && width < 0) {
        width = width * -1;
      }
      var plotData, domain;
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
    };
    return {
      filterData: filterData
    };
  },
  canShowTheseManyPeriods = function canShowTheseManyPeriods(width, arrayLength, maxThreshold, minThreshold) {
    var widthAdjustedMinThreshold = showMinThreshold(width, minThreshold),
      widthAdjustedMaxTheshold = showMaxThreshold(width, maxThreshold);
    return arrayLength >= widthAdjustedMinThreshold && arrayLength < widthAdjustedMaxTheshold;
  },
  showMinThreshold = function showMinThreshold(width, threshold) {
    return mathMax(1, mathCeil(width * threshold));
  },
  showMaxThreshold = function showMaxThreshold(width, threshold) {
    return mathFloor(width * threshold);
  },
  showMax = function showMax(width, threshold) {
    return mathFloor(showMaxThreshold(width, threshold) * 0.97);
  },
  getFilteredResponse = function getFilteredResponse(data, left, right, xAccessor) {
    return data.slice((0, _utils.getClosestItemIndexes)(data, left, xAccessor).left, (0, _utils.getClosestItemIndexes)(data, right, xAccessor).right + 1);
  };
function _default(_ref2) {
  var xScale = _ref2.xScale,
    useWholeData = _ref2.useWholeData,
    clamp = _ref2.clamp,
    pointsPerPxThreshold = _ref2.pointsPerPxThreshold,
    minPointsPerPxThreshold = _ref2.minPointsPerPxThreshold,
    flipXScale = _ref2.flipXScale;
  return extentsWrapper(useWholeData || xScale.invert == null, clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale);
}
//# sourceMappingURL=evaluator.js.map