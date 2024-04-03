"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fetchImpl = _interopRequireDefault(require("../utils/fetchImpl"));
var _adapterFns = require("./adapter-fns");
const API_URL = 'https://api.binance.com/api/v3',
  MARKET_URL = API_URL + "/exchangeInfo",
  KLINE_URL = API_URL + "/klines",
  _crOhlcvUrl = (pair, interval) => KLINE_URL + "?symbol=" + pair + "&interval=" + interval;
const binance = {
  fetchMarkets: () => (0, _fetchImpl.default)(MARKET_URL).then(json => (0, _adapterFns.getItems)(json, 'symbols').reduce((result, item) => {
    const {
      baseAsset,
      quoteAsset,
      status
    } = item || {};
    if (status === 'TRADING') {
      result.push({
        caption: baseAsset + "/" + quoteAsset,
        value: "" + baseAsset + quoteAsset
      });
    }
    return result;
  }, []).sort(_adapterFns.compareByCaption)),
  getTimeframes: () => [{
    caption: '1m',
    value: '1m'
  }, {
    caption: '3m',
    value: '3m'
  }, {
    caption: '5m',
    value: '5m'
  }, {
    caption: '15m',
    value: '15m'
  }, {
    caption: '30m',
    value: '30m'
  }, {
    caption: '1h',
    value: '1h'
  }, {
    caption: '2h',
    value: '2h'
  }, {
    caption: '4h',
    value: '4h'
  }, {
    caption: '8h',
    value: '8h'
  }, {
    caption: '12h',
    value: '12h'
  }, {
    caption: '1d',
    value: '1d'
  }, {
    caption: '3d',
    value: '3d'
  }, {
    caption: '1w',
    value: '1w'
  }, {
    caption: '1M',
    value: '1M'
  }],
  fetchOHLCV: (pair, interval) => (0, _fetchImpl.default)(_crOhlcvUrl(pair, interval)).then(points => (0, _adapterFns.getItems)(points).reduce((result, p) => {
    if ((0, _adapterFns.isObj)(p)) {
      result.push({
        date: p[0],
        open: parseFloat(p[1]),
        high: parseFloat(p[2]),
        low: parseFloat(p[3]),
        close: parseFloat(p[4]),
        volume: parseFloat(p[5])
      });
    }
    return result;
  }, []))
};
var _default = exports.default = binance;
//# sourceMappingURL=binance.js.map