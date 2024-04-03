"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _binance = _interopRequireDefault(require("./binance"));
var _bitstamp = _interopRequireDefault(require("./bitstamp"));
const adapters = {
  binance: _binance.default,
  bitstamp: _bitstamp.default
};
var _default = exports.default = adapters;
//# sourceMappingURL=adapters.js.map