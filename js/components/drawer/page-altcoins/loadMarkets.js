"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageFns = require("./pageFns");

var loadMarkets = function loadMarkets(_ref) {
  var dispatch = _ref.dispatch,
      exchImpl = _ref.exchImpl,
      exchange = _ref.exchange;

  dispatch({ type: "MARKET_LOADING" });
  exchImpl.loadMarkets().then(function () {
    dispatch({
      type: "MARKET_LOADED",
      exchange: exchange,
      markets: exchImpl.symbols.map(_pageFns.crOptionItem)
    });
  }).catch(function (err) {
    dispatch({ type: "MARKET_LOADING_FAIL" });
    console.log(err.message);
  });
};

exports.default = loadMarkets;
//# sourceMappingURL=loadMarkets.js.map