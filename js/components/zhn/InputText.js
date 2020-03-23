"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

//import PropTypes from "prop-types";
var S = {
  INPUT_TEXT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#E1E1CB',
    marginLeft: '5px',
    marginRight: '5px'
  }
};
var C = {
  BLANK: '',
  TEXT: 'text',
  //NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getInitStateFrom = function _getInitStateFrom(_ref) {
  var initValue = _ref.initValue;
  return {
    initValue: initValue,
    value: initValue != null ? initValue : C.BLANK
  };
};

var InputText = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(InputText, _Component);

  var _super = _createSuper(InputText);

  /*
  static propTypes = {
    style: PropTypes.object,
    initValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onEnter: PropTypes.func
  }
  */
  function InputText(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleInputChange = function (event) {
      var value = event.target.value,
          maxLenght = _this.props.maxLenght;

      if (value.length <= maxLenght) {
        _this.setState({
          value: value
        });
      }
    };

    _this._handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 27:
        case 46:
          event.preventDefault();

          _this.setState({
            value: C.BLANK
          });

          break;

        case 13:
          if (_this.isOnEnter) {
            _this.props.onEnter(event.target.value);
          }

          break;

        default:
          return;
      }
    };

    _this.isOnEnter = _isFn(props.onEnter) ? true : false;
    _this.state = _getInitStateFrom(props);
    return _this;
  }

  var _proto = InputText.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (_isFn(onReg)) {
      onReg(this);
    }
  };

  InputText.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        type = _this$props.type,
        spellCheck = _this$props.spellCheck,
        placeholder = _this$props.placeholder,
        maxLenght = _this$props.maxLenght,
        value = this.state.value,
        _autoCorrect = spellCheck ? C.ON : C.OFF,
        _spellCheck = spellCheck ? true : false;

    return /*#__PURE__*/_react["default"].createElement("input", {
      style: (0, _extends2["default"])({}, S.INPUT_TEXT, {}, style),
      type: type || C.TEXT,
      name: C.TEXT,
      autoCapitalize: C.OFF,
      autoComplete: C.OFF,
      autoCorrect: _autoCorrect,
      spellCheck: _spellCheck,
      translate: false,
      value: value,
      placeholder: placeholder,
      maxLength: maxLenght,
      onChange: this._handleInputChange,
      onKeyDown: this._handleKeyDown
    });
  };

  _proto.getValue = function getValue() {
    return this.state.value;
  };

  _proto.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  return InputText;
}(_react.Component);

InputText.defaultProps = {
  maxLenght: 125
};
var _default = InputText;
exports["default"] = _default;
//# sourceMappingURL=InputText.js.map