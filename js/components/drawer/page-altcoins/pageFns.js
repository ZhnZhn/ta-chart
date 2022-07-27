"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crExchanges = exports.crExchange = void 0;

var _adapters = _interopRequireDefault(require("../../../adapters/adapters"));

var EXCHANGES_OPTION = [{
  caption: 'Binance',
  value: 'binance'
}, {
  caption: 'Bitstamp',
  value: 'bitstamp'
}];

var crExchanges = function crExchanges() {
  return EXCHANGES_OPTION;
};

exports.crExchanges = crExchanges;

var crExchange = function crExchange(exchange) {
  return _adapters["default"][exchange];
};

exports.crExchange = crExchange;
//# sourceMappingURL=pageFns.js.map