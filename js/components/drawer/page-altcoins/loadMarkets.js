"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _pageFns = require("./pageFns");

var _enumAltcoin = _interopRequireDefault(require("./enumAltcoin"));

var loadMarkets = function loadMarkets(_ref) {
  var dispatch = _ref.dispatch,
      exchImpl = _ref.exchImpl,
      exchange = _ref.exchange;
  dispatch({
    type: _enumAltcoin["default"].MARKET_LOADING
  });
  exchImpl.loadMarkets().then(function () {
    dispatch({
      type: _enumAltcoin["default"].MARKET_LOADED,
      exchange: exchange,
      markets: exchImpl.symbols.map(_pageFns.crOptionItem)
    });
  })["catch"](function (err) {
    dispatch({
      type: _enumAltcoin["default"].MARKET_LOADING_FAIL
    });
    console.log(err.message);
  });
};

var _default = loadMarkets;
exports["default"] = _default;
//# sourceMappingURL=loadMarkets.js.map