"use strict";

exports.__esModule = true;
exports.zip = void 0;
var _transpose = require("./transpose");
var zip = function zip() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (0, _transpose.transpose)(args);
};
exports.zip = zip;
//# sourceMappingURL=zip.js.map