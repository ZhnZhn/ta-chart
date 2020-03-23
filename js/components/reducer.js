"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _enumFetch = _interopRequireDefault(require("./enumFetch"));

var _enumData = _interopRequireDefault(require("./enumData"));

var _isDataValid = function _isDataValid(data) {
  return Array.isArray(data) || data.length > 20;
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumData["default"].LOADING:
      return (0, _extends2["default"])({}, state, {
        fetchStatus: _enumFetch["default"].LOADING
      });

    case _enumData["default"].LOADED:
      {
        var data = action.data;

        if (!_isDataValid(data)) {
          return state;
        }

        return (0, _extends2["default"])({}, state, {
          data: action.data,
          providerTitle: action.providerTitle,
          itemTitle: action.itemTitle,
          timeframe: action.timeframe,
          fetchStatus: _enumFetch["default"].SUCCESS
        });
      }

    case _enumData["default"].LOAD_FAILED:
      return (0, _extends2["default"])({}, state, {
        fetchStatus: _enumFetch["default"].FAILED
      });

    case _enumData["default"].UPDATE:
      return (0, _extends2["default"])({}, state, {
        data: [].concat(state.data, [action.point])
      });

    default:
      throw new TypeError('Not existed action ' + action.type);
  }
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map