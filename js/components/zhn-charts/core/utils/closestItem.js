"use strict";

exports.__esModule = true;
exports.getClosestItemIndexes = exports.getClosestItem = void 0;

var getClosestItemIndexes = function getClosestItemIndexes(array, value, accessor) {
  var lo = 0;
  var hi = array.length - 1;

  while (hi - lo > 1) {
    var mid = Math.round((lo + hi) / 2),
        itemAtMid = array[mid],
        valueAtMid = accessor(itemAtMid);

    if (valueAtMid <= value) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  var lowItemValue = accessor(array[lo]),
      highItemValue = accessor(array[hi]); // for Date object === does not work, so using the <= in combination with >=
  // the same code works for both dates and numbers

  if ((lowItemValue == null ? void 0 : lowItemValue.valueOf()) === (value == null ? void 0 : value.valueOf())) {
    hi = lo;
  }

  if ((highItemValue == null ? void 0 : highItemValue.valueOf()) === (value == null ? void 0 : value.valueOf())) {
    lo = hi;
  }

  if (lowItemValue < value && highItemValue < value) {
    lo = hi;
  }

  if (lowItemValue > value && highItemValue > value) {
    hi = lo;
  }

  return {
    left: lo,
    right: hi
  };
};

exports.getClosestItemIndexes = getClosestItemIndexes;

var getClosestItem = function getClosestItem(array, value, accessor) {
  var _getClosestItemIndexe = getClosestItemIndexes(array, value, accessor),
      left = _getClosestItemIndexe.left,
      right = _getClosestItemIndexe.right;

  if (left === right) {
    return array[left];
  }

  var leftItem = accessor(array[left]),
      rightItem = accessor(array[right]),
      closest = Math.abs(leftItem.valueOf() - value.valueOf()) < Math.abs(rightItem.valueOf() - value.valueOf()) ? array[left] : array[right];
  return closest;
};

exports.getClosestItem = getClosestItem;
//# sourceMappingURL=closestItem.js.map