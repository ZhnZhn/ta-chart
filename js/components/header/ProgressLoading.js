"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _enumFetch = _interopRequireDefault(require("../enumFetch"));

var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));

var C = {
  LOADING: '#2f7ed8',
  FAILED: 'rgb(237, 88, 19)'
};

var _getFetchingState = function _getFetchingState(fetchStatus) {
  switch (fetchStatus) {
    case _enumFetch["default"].LOADING:
      return {
        completed: 35,
        color: C.LOADING
      };

    case _enumFetch["default"].SUCCESS:
      return {
        completed: 100,
        color: C.LOADING
      };

    case _enumFetch["default"].FAILED:
      return {
        completed: 100,
        color: C.FAILED
      };

    default:
      return {
        completed: 0,
        color: C.LOADING
      };
  }
};

var ProgressLoading = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(ProgressLoading, _PureComponent);

  function ProgressLoading() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ProgressLoading.prototype;

  _proto.render = function render() {
    var fetchStatus = this.props.fetchStatus,
        _getFetchingState2 = _getFetchingState(fetchStatus),
        completed = _getFetchingState2.completed,
        color = _getFetchingState2.color;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine["default"], {
      height: 3,
      color: color,
      completed: completed
    });
  };

  return ProgressLoading;
}(_react.PureComponent);

var _default = ProgressLoading;
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map