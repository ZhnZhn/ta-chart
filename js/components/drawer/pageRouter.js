"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _PageMenu = _interopRequireDefault(require("./PageMenu"));

var _PageAltCoins = _interopRequireDefault(require("./page-altcoins/PageAltCoins"));

var _PageStocks = _interopRequireDefault(require("./page-stocks/PageStocks"));

var _PageSettings = _interopRequireDefault(require("./page-settings/PageSettings"));

var pageRouter = {
  "p1": _PageMenu["default"],
  "p1-1": _PageSettings["default"],
  "p1-2": _PageAltCoins["default"],
  "p1-3": _PageStocks["default"]
};
var _default = pageRouter;
exports["default"] = _default;
//# sourceMappingURL=pageRouter.js.map