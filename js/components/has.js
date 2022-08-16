"use strict";

exports.__esModule = true;
exports.HAS_TOUCH = void 0;

var _isTouchable = function _isTouchable() {
  return document && 'ontouchstart' in document.documentElement;
};

var HAS_TOUCH = _isTouchable();

exports.HAS_TOUCH = HAS_TOUCH;
//# sourceMappingURL=has.js.map