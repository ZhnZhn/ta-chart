"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fetchImpl = _interopRequireDefault(require("../utils/fetchImpl"));
var _adapterFns = require("./adapter-fns");
const API_URL = 'https://www.bitstamp.net/api/v2',
  MARKET_URL = API_URL + "/trading-pairs-info/",
  OHCLV_URL = API_URL + "/ohlc",
  _crOhlcvUrl = (pair, timeframe) => OHCLV_URL + "/" + pair + "?step=" + timeframe + "&limit=300";
const bitstamp = {
  fetchMarkets: () => (0, _fetchImpl.default)("" + MARKET_URL).then(items => (0, _adapterFns.getItems)(items).reduce((result, item) => {
    const {
      trading,
      name,
      url_symbol
    } = item || {};
    if (trading === 'Enabled') {
      result.push({
        caption: name,
        value: url_symbol
      });
      return result;
    }
  }, [])),
  getTimeframes: () => [{
    caption: "1m",
    value: {
      v: "60",
      tf: '1m'
    }
  }, {
    caption: "3m",
    value: {
      v: "180",
      tf: '3m'
    }
  }, {
    caption: "5m",
    value: {
      v: "300",
      tf: "5m"
    }
  }, {
    caption: "15m",
    value: {
      v: "900",
      tf: "15m"
    }
  }, {
    caption: "30m",
    value: {
      v: "1800",
      tf: "30m"
    }
  }, {
    caption: "1h",
    value: {
      v: "3600",
      tf: "1h"
    }
  }, {
    caption: "2h",
    value: {
      v: "7200",
      tf: "2h"
    }
  }, {
    caption: "4h",
    value: {
      v: "14400",
      tf: "4h"
    }
  }, {
    caption: "10h",
    value: {
      v: "21600",
      tf: "10h"
    }
  }, {
    caption: "12h",
    value: {
      v: "43200",
      tf: "12h"
    }
  }, {
    caption: "1d",
    value: {
      v: "86400",
      tf: "1d"
    }
  }, {
    caption: "3d",
    value: {
      v: "259200",
      tf: "3d"
    }
  }],
  fetchOHLCV: (pair, timeframe) => (0, _fetchImpl.default)(_crOhlcvUrl(pair, timeframe)).then(json => (0, _adapterFns.getItems)((json || {}).data, 'ohlc').reduce((result, p) => {
    if ((0, _adapterFns.isObj)(p)) {
      result.push({
        date: parseFloat(p.timestamp) * 1000,
        open: parseFloat(p.open),
        high: parseFloat(p.high),
        low: parseFloat(p.low),
        close: parseFloat(p.close),
        volume: parseFloat(p.volume)
      });
    }
    return result;
  }, []))
};
var _default = exports.default = bitstamp;
//# sourceMappingURL=bitstamp.js.map