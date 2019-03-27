"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crAppValue = function crAppValue(_ref) {
  var dispatch = _ref.dispatch,
      theme = _ref.theme;
  return {
    theme: theme,
    loadData: function loadData(payload) {
      return dispatch((0, _extends3.default)({
        type: "DATA_LOADED"
      }, payload));
    }
  };
};

exports.default = crAppValue;
//# sourceMappingURL=crAppValue.js.map