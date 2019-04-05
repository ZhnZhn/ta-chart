'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _proxy = _config2.default.PROXY;

var appSettings = {
  proxy: function proxy(_proxy2) {
    return _proxy2 ? (_proxy = _proxy2, true) : _proxy || '';
  },
  restoreProxy: function restoreProxy() {
    return _proxy = _config2.default.PROXY;
  }
};

exports.default = appSettings;
//# sourceMappingURL=appSettings.js.map