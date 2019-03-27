"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var crPoint = exports.crPoint = function crPoint(p) {
  return {
    date: p[0],
    open: p[1],
    high: p[2],
    low: p[3],
    close: p[4],
    volume: p[5]
  };
};

var crOptionItem = exports.crOptionItem = function crOptionItem(str) {
  return {
    caption: str,
    value: str
  };
};
//# sourceMappingURL=pageFns.js.map