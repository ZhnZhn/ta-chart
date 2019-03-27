'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PageMenu = require('./PageMenu');

var _PageMenu2 = _interopRequireDefault(_PageMenu);

var _PageAltCoins = require('./page-altcoins/PageAltCoins');

var _PageAltCoins2 = _interopRequireDefault(_PageAltCoins);

var _PageStocks = require('./page-stocks/PageStocks');

var _PageStocks2 = _interopRequireDefault(_PageStocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageRouter = {
  "p1": _PageMenu2.default,
  "p1-1": _PageAltCoins2.default,
  "p1-2": _PageStocks2.default
};

exports.default = pageRouter;
//# sourceMappingURL=pageRouter.js.map