'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enumFetch = require('./enumFetch');

var _enumFetch2 = _interopRequireDefault(_enumFetch);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  providerTitle: _config2.default.INITIAL_PROVIDER_TITLE,
  itemTitle: _config2.default.INITIAL_ITEM_TITLE,
  data: _config2.default.DF_DATA,
  fetchStatus: _enumFetch2.default.INITIAL
};

exports.default = initialState;
//# sourceMappingURL=initialState.js.map