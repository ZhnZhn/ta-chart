"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.PureComponent = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _shallowEqual = require("./shallowEqual");

var PureComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(PureComponent, _React$Component);

  function PureComponent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PureComponent.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(0, _shallowEqual.shallowEqual)(this.props, nextProps) || !(0, _shallowEqual.shallowEqual)(this.state, nextState) || !(0, _shallowEqual.shallowEqual)(this.context, nextContext);
  };

  return PureComponent;
}(_react["default"].Component);

exports.PureComponent = PureComponent;
//# sourceMappingURL=PureComponent.js.map