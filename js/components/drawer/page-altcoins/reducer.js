'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _enumAltcoin = require('./enumAltcoin');

var _enumAltcoin2 = _interopRequireDefault(_enumAltcoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumAltcoin2.default.MARKET_LOADING:
      return (0, _extends3.default)({}, state, {
        isMarkets: { loading: true, failed: false }
      });
    case _enumAltcoin2.default.MARKET_LOADED:
      return (0, _extends3.default)({}, state, {
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: { loading: false, failed: false }
      });
    case _enumAltcoin2.default.MARKET_LOADING_FAIL:
      return (0, _extends3.default)({}, state, {
        isMarkets: { loading: false, failed: true }
      });
    case _enumAltcoin2.default.EXCHANGES_SET:
      return (0, _extends3.default)({}, state, {
        exchanges: action.exchanges
      });
    case _enumAltcoin2.default.EXCHANGE_SET:
      return (0, _extends3.default)({}, state, {
        exchange: action.exchange,
        pair: undefined
      });
    case _enumAltcoin2.default.PAIR_SET:
      return (0, _extends3.default)({}, state, {
        pair: action.pair
      });
    default:
      throw new TypeError('Not existed action ' + action.type);
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map