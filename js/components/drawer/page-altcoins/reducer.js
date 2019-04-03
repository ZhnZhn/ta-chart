"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer(state, action) {
  //console.log(action.type)
  switch (action.type) {
    case "MARKET_LOADING":
      return (0, _extends3.default)({}, state, {
        isMarkets: { loading: true, failed: false }
      });
    case "MARKET_LOADED":
      return (0, _extends3.default)({}, state, {
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: { loading: false, failed: false }
      });
    case "MARKET_LOADING_FAIL":
      return (0, _extends3.default)({}, state, {
        isMarkets: { loading: false, failed: true }
      });
    case "EXCHANGES_SET":
      return (0, _extends3.default)({}, state, {
        exchanges: action.exchanges
      });
    case "EXCHANGE_SET":
      return (0, _extends3.default)({}, state, {
        exchange: action.exchange,
        pair: undefined
      });
    case "PAIR_SET":
      return (0, _extends3.default)({}, state, {
        pair: action.pair
      });
    default:
      throw new Error();
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map