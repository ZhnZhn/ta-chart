"use strict";

exports.__esModule = true;
exports.isObj = exports.getItems = exports.compareByCaption = void 0;
const _isArr = Array.isArray;
const getItems = (json, propName) => {
  const _items = propName ? (json || {})[propName] : json;
  return _isArr(_items) ? _items : [];
};
exports.getItems = getItems;
const compareByCaption = (a, b) => {
  if (a.caption < b.caption) {
    return -1;
  } else if (a.caption > b.caption) {
    return 1;
  } else {
    return 0;
  }
};
exports.compareByCaption = compareByCaption;
const isObj = obj => typeof obj === 'object';
exports.isObj = isObj;
//# sourceMappingURL=adapter-fns.js.map