'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crOptionItem = exports.crPoint = undefined;

var _ccxt = require('ccxt');

var _ccxt2 = _interopRequireDefault(_ccxt);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var crTimeframes = function crTimeframes(obj) {
  var arr = [];
  for (var key in obj) {
    arr.push({
      value: key,
      caption: obj[key]
    });
  }
  return arr;
};

var crExchanges = function crExchanges() {
  return _ccxt2.default.exchanges.map(crOptionItem);
};
var crExchange = function crExchange(exchange) {
  return new _ccxt2.default[exchange]({
    proxy: _config2.default.PROXY,
    rateLimit: _config2.default.RATE_LIMIT
  });
};

var pageFns = {
  crExchange: crExchange,
  crExchanges: crExchanges,
  crTimeframes: crTimeframes
};

exports.default = pageFns;
//# sourceMappingURL=pageFns.js.map