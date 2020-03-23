"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config"));

var _proxy = _config["default"].PROXY;
var appSettings = {
  proxy: function proxy(_proxy2) {
    return _proxy2 ? (_proxy = _proxy2, true) : _proxy || '';
  },
  restoreProxy: function restoreProxy() {
    return _proxy = _config["default"].PROXY;
  }
};
var _default = appSettings;
exports["default"] = _default;
//# sourceMappingURL=appSettings.js.map