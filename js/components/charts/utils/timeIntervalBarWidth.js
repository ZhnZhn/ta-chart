"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var isDefined = function isDefined(d) {
  return d != null;
};

var head = function head(array, accessor) {
  if (accessor && array) {
    for (var i = 0; i < array.length; i++) {
      var value = array[i];

      if (isDefined(accessor(value))) {
        return value;
      }
    }

    return undefined;
  }

  return array ? array[0] : undefined;
};

var timeIntervalBarWidth = function timeIntervalBarWidth(interval) {
  return function (props, moreProps) {
    var widthRatio = props.widthRatio,
        xScale = moreProps.xScale,
        xAccessor = moreProps.xAccessor,
        plotData = moreProps.plotData,
        first = xAccessor(head(plotData));
    return Math.abs(xScale(interval.offset(first, 1)) - xScale(first)) * widthRatio;
  };
};

var _default = timeIntervalBarWidth;
exports["default"] = _default;
//# sourceMappingURL=timeIntervalBarWidth.js.map