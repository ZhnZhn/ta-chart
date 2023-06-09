"use strict";

exports.__esModule = true;
exports.min = void 0;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var min = function min(values, valueOf) {
  var min;
  if (valueOf === undefined) {
    for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
      var value = _step.value;
      if (value != null && (min > value || min === undefined && value >= value)) {
        min = value;
      }
    }
  } else {
    var index = -1;
    for (var _iterator2 = _createForOfIteratorHelperLoose(values), _step2; !(_step2 = _iterator2()).done;) {
      var _value = _step2.value;
      if ((_value = valueOf(_value, ++index, values)) != null && (min > _value || min === undefined && _value >= _value)) {
        min = _value;
      }
    }
  }
  return min;
};
exports.min = min;
//# sourceMappingURL=min.js.map