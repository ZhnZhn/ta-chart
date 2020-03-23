"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _enumFetch = _interopRequireDefault(require("../enumFetch"));

var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

  var _super = _createSuper(ProgressLoading);

  function ProgressLoading() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ProgressLoading.prototype;

  _proto.render = function render() {
    var fetchStatus = this.props.fetchStatus,
        _getFetchingState2 = _getFetchingState(fetchStatus),
        completed = _getFetchingState2.completed,
        color = _getFetchingState2.color;

    return /*#__PURE__*/_react["default"].createElement(_ProgressLine["default"], {
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