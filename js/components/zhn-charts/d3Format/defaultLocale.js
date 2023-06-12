"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.formatPrefix = exports.format = void 0;
var _locale = _interopRequireDefault(require("./locale"));
let locale;
let format;
exports.format = format;
let formatPrefix;
exports.formatPrefix = formatPrefix;
const _DF_LOCALE_DEFINITION = {
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};
(function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.format = format = locale.format;
  exports.formatPrefix = formatPrefix = locale.formatPrefix;
  return locale;
})(_DF_LOCALE_DEFINITION);
//# sourceMappingURL=defaultLocale.js.map