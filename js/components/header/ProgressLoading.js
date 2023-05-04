"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var _enumFetch = _interopRequireDefault(require("../enumFetch"));
var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));
var _jsxRuntime = require("react/jsx-runtime");
var LOADING_COLOR = '#2f7ed8',
  FAILED_COLOR = '#ed5813',
  _crFetchState = function _crFetchState(completed, color) {
    return [completed, color];
  };
var _getFetchingState = function _getFetchingState(fetchStatus) {
  return fetchStatus === _enumFetch["default"].LOADING ? _crFetchState(35, LOADING_COLOR) : fetchStatus === _enumFetch["default"].SUCCESS ? _crFetchState(100, LOADING_COLOR) : fetchStatus === _enumFetch["default"].FAILED ? _crFetchState(100, FAILED_COLOR) : _crFetchState(0, LOADING_COLOR);
};
var ProgressLoading = function ProgressLoading(_ref) {
  var fetchStatus = _ref.fetchStatus;
  var _getFetchingState2 = _getFetchingState(fetchStatus),
    completed = _getFetchingState2[0],
    color = _getFetchingState2[1];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine["default"], {
    color: color,
    completed: completed
  });
};
var _default = (0, _uiApi.memo)(ProgressLoading);
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map