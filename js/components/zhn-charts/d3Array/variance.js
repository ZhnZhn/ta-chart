"use strict";

exports.__esModule = true;
exports.variance = void 0;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var variance = function variance(values, valueOf) {
  var count = 0,
    delta,
    mean = 0,
    sum = 0;
  if (valueOf === undefined) {
    for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
      var value = _step.value;
      if (value != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  } else {
    var index = -1;
    for (var _iterator2 = _createForOfIteratorHelperLoose(values), _step2; !(_step2 = _iterator2()).done;) {
      var _value = _step2.value;
      if ((_value = valueOf(_value, ++index, values)) != null && (_value = +_value) >= _value) {
        delta = _value - mean;
        mean += delta / ++count;
        sum += delta * (_value - mean);
      }
    }
  }
  if (count > 1) return sum / (count - 1);
};
exports.variance = variance;
//# sourceMappingURL=variance.js.map