'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _enumFetch = require('./enumFetch');

var _enumFetch2 = _interopRequireDefault(_enumFetch);

var _enumData = require('./enumData');

var _enumData2 = _interopRequireDefault(_enumData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isDataValid = function _isDataValid(data) {
  return Array.isArray(data) || data.length > 20;
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumData2.default.LOADING:
      return (0, _extends3.default)({}, state, {
        fetchStatus: _enumFetch2.default.LOADING
      });
    case _enumData2.default.LOADED:
      {
        var data = action.data;

        if (!_isDataValid(data)) {
          return state;
        }
        return (0, _extends3.default)({}, state, {
          data: action.data,
          providerTitle: action.providerTitle,
          itemTitle: action.itemTitle,
          timeframe: action.timeframe,
          fetchStatus: _enumFetch2.default.SUCCESS
        });
      }
    case _enumData2.default.LOAD_FAILED:
      return (0, _extends3.default)({}, state, {
        fetchStatus: _enumFetch2.default.FAILED
      });
    default:
      throw new TypeError('Not existed action', action.type);
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map