"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CL = 'progress-line';
var DF_COLOR = '#2f7ed8';
var TR = {
  WIDTH: 'width 500ms ease-out',
  OPACITY: 'opacity 400ms linear'
};

var _crStyle = function _crStyle(backgroundColor, opacity, width, height, transition) {
  return {
    backgroundColor: backgroundColor,
    opacity: opacity,
    width: width,
    height: height,
    transition: transition
  };
};

var ProgressLine = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ProgressLine, _Component);

  var _super = _createSuper(ProgressLine);

  function ProgressLine(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._crLineStyle = function (color, height) {
      if (_this.wasOpacied) {
        _this.wasOpacied = false;
        return _crStyle(color, 1, 0, height);
      } else if (_this.wasCompleted) {
        _this.wasCompleted = false;
        _this.wasOpacied = true;
        return _crStyle(color, 0, '100%', height, TR.OPACITY);
      } else {
        var completed = _this.props.completed;

        if (completed < 0) {
          completed = 0;
        } else if (completed >= 100) {
          completed = 100;
          _this.wasCompleted = true;
        }

        return _crStyle(color, 1, completed + "%", height, TR.WIDTH);
      }
    };

    _this.wasCompleted = false;
    _this.idCompleted = null;
    _this.wasOpacied = false;
    _this.idOpacied = null;
    return _this;
  }

  var _proto = ProgressLine.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.idCompleted) {
      clearTimeout(this.idCompleted);
    }

    if (this.idOpacied) {
      clearTimeout(this.idOpacied);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    if (this.wasCompleted) {
      this.idCompleted = setTimeout(function () {
        _this2.idCompleted = null;

        _this2.forceUpdate();
      }, 800);
    } else if (this.wasOpacied) {
      this.idOpacied = setTimeout(function () {
        _this2.idOpacied = null;

        _this2.forceUpdate();
      }, 800);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        height = _this$props.height,
        _style = this._crLineStyle(color, height);

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: CL,
      style: _style
    });
  };

  return ProgressLine;
}(_react.Component);

ProgressLine.defaultProps = {
  color: DF_COLOR,
  height: 3
};
var _default = ProgressLine;
exports["default"] = _default;
//# sourceMappingURL=ProgressLine.js.map