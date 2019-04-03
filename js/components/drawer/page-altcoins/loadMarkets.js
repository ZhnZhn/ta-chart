'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageFns = require('./pageFns');

var _enumAltcoin = require('./enumAltcoin');

var _enumAltcoin2 = _interopRequireDefault(_enumAltcoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadMarkets = function loadMarkets(_ref) {
  var dispatch = _ref.dispatch,
      exchImpl = _ref.exchImpl,
      exchange = _ref.exchange;

  dispatch({ type: _enumAltcoin2.default.MARKET_LOADING });
  exchImpl.loadMarkets().then(function () {
    dispatch({
      type: _enumAltcoin2.default.MARKET_LOADED,
      exchange: exchange,
      markets: exchImpl.symbols.map(_pageFns.crOptionItem)
    });
  }).catch(function (err) {
    dispatch({ type: _enumAltcoin2.default.MARKET_LOADING_FAIL });
    console.log(err.message);
  });
};

exports.default = loadMarkets;
//# sourceMappingURL=loadMarkets.js.map