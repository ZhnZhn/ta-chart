"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _enumFetch = _interopRequireDefault(require("./enumFetch"));

var _config = _interopRequireDefault(require("./config"));

var initialState = {
  providerTitle: _config["default"].INITIAL_PROVIDER_TITLE,
  itemTitle: _config["default"].INITIAL_ITEM_TITLE,
  data: _config["default"].DF_DATA,
  timeframe: _config["default"].DF_TIMEFRAME,
  fetchStatus: _enumFetch["default"].INITIAL,
  isLiveUpdating: false
};
var _default = initialState;
exports["default"] = _default;
//# sourceMappingURL=initialState.js.map