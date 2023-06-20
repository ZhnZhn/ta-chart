"use strict";

exports.__esModule = true;
exports.path = void 0;
const _isArr = Array.isArray;
const path = function (loc) {
  if (loc === void 0) {
    loc = [];
  }
  const key = _isArr(loc) ? loc : [loc],
    length = key.length;
  return (obj, defaultValue) => {
    if (length === 0) {
      return obj == null ? defaultValue : obj;
    }
    let index = 0;
    while (obj != null && index < length) {
      obj = obj[key[index++]];
    }
    return index === length ? obj : defaultValue;
  };
};
exports.path = path;
//# sourceMappingURL=path.js.map