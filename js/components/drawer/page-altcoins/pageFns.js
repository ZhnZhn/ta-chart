"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.crOptionItem = exports.crPoint = void 0;

var _ccxt = _interopRequireDefault(require("ccxt"));

var _config = _interopRequireDefault(require("../../config"));

var crPoint = function crPoint(p) {
  return {
    date: p[0],
    open: p[1],
    high: p[2],
    low: p[3],
    close: p[4],
    volume: p[5]
  };
};

exports.crPoint = crPoint;

var crOptionItem = function crOptionItem(str) {
  return {
    caption: str,
    value: str
  };
};

exports.crOptionItem = crOptionItem;

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
  return _ccxt["default"].exchanges.map(crOptionItem);
};

var crExchange = function crExchange(exchange, proxy) {
  return new _ccxt["default"][exchange]({
    proxy: proxy || _config["default"].PROXY,
    rateLimit: _config["default"].RATE_LIMIT
  });
};

var pageFns = {
  crExchange: crExchange,
  crExchanges: crExchanges,
  crTimeframes: crTimeframes
};
var _default = pageFns;
exports["default"] = _default;
//# sourceMappingURL=pageFns.js.map