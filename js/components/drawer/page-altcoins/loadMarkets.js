"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enumAltcoin = require("./enumAltcoin");

var loadMarkets = function loadMarkets(_ref) {
  var dispatch = _ref.dispatch,
      exchImpl = _ref.exchImpl,
      exchange = _ref.exchange,
      proxy = _ref.proxy;
  dispatch({
    type: _enumAltcoin.MARKET_LOADING
  });
  exchImpl.fetchMarkets(proxy).then(function (markets) {
    dispatch({
      type: _enumAltcoin.MARKET_LOADED,
      exchange: exchange,
      markets: markets
    });
  })["catch"](function (err) {
    dispatch({
      type: _enumAltcoin.MARKET_LOADING_FAIL
    });
    console.log(err.message);
  });
};

var _default = loadMarkets;
exports["default"] = _default;
//# sourceMappingURL=loadMarkets.js.map