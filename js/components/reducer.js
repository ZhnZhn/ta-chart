"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isDataValid = function _isDataValid(data) {
  return Array.isArray(data) || data.length > 20;
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "DATA_LOADED":
      {
        var data = action.data;

        if (!_isDataValid(data)) {
          return state;
        }
        return (0, _extends3.default)({}, state, {
          data: action.data,
          providerTitle: action.providerTitle,
          itemTitle: action.itemTitle
        });
      }
    default:
      throw new Error();
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map