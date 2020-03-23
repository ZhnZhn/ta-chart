"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _enumAltcoin = _interopRequireDefault(require("./enumAltcoin"));

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumAltcoin["default"].MARKET_LOADING:
      return (0, _extends2["default"])({}, state, {
        isMarkets: {
          loading: true,
          failed: false
        }
      });

    case _enumAltcoin["default"].MARKET_LOADED:
      return (0, _extends2["default"])({}, state, {
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: {
          loading: false,
          failed: false
        }
      });

    case _enumAltcoin["default"].MARKET_LOADING_FAIL:
      return (0, _extends2["default"])({}, state, {
        isMarkets: {
          loading: false,
          failed: true
        }
      });

    case _enumAltcoin["default"].EXCHANGES_SET:
      return (0, _extends2["default"])({}, state, {
        exchanges: action.exchanges
      });

    case _enumAltcoin["default"].EXCHANGE_SET:
      return (0, _extends2["default"])({}, state, {
        exchange: action.exchange,
        pair: undefined
      });

    case _enumAltcoin["default"].PAIR_SET:
      return (0, _extends2["default"])({}, state, {
        pair: action.pair
      });

    default:
      throw new TypeError('Not existed action ' + action.type);
  }
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map