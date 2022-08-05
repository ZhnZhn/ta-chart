"use strict";

exports.__esModule = true;
exports.shallowEqual = void 0;

var shallowEqual = function shallowEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  var keys = Object.keys(a);
  var length = keys.length;

  for (var i = 0; i < length; i++) {
    if (!(keys[i] in b)) {
      return false;
    }
  }

  for (var _i = 0; _i < length; _i++) {
    if (a[keys[_i]] !== b[keys[_i]]) {
      return false;
    }
  }

  return length === Object.keys(b).length;
};

exports.shallowEqual = shallowEqual;
//# sourceMappingURL=shallowEqual.js.map