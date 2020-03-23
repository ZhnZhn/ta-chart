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

//import withTheme from '../hoc/withTheme'
//import styleConfig from '../style/Comp.Style'
var CL = {
  DRAWER_BT: 'drawer-bt',
  DRAWER_SPAN: 'drawer-span',
  DRAWER_SVG: 'drawer-svg',
  DRAWER: 'drawer',
  DRAWER_MODAL: 'drawer-modal'
};
var S = {
  BT_DRAWER: {
    position: 'absolute',
    top: 0,
    right: 16
  },
  DRAWER_OFF: {
    //transform: 'translateX(-264px)',
    transform: 'translateX(334px)',
    pointerEvents: 'none'
  },
  DRAWER_ON: {
    transform: 'translate(0px, 0px)'
  },
  MODAL_OFF: {
    display: 'none',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  MODAL_ON: {
    display: 'block',
    opacity: 1,
    zIndex: 1000,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  }
};

var Drawer = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Drawer, _Component);

  var _super = _createSuper(Drawer);

  function Drawer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: false
    };

    _this._setBodyOverflowY = function () {
      var isOpen = _this.state.isOpen;

      if (isOpen) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    };

    _this._hToggle = function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      }, _this._setBodyOverflowY);
    };

    return _this;
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        btStyle = _this$props.btStyle,
        children = _this$props.children,
        isOpen = this.state.isOpen,
        _drawerStyle = isOpen ? S.DRAWER_ON : S.DRAWER_OFF,
        _drawerModalStyle = isOpen ? S.MODAL_ON : S.MODAL_OFF,
        _onClickWrapper = isOpen ? this._hToggle : undefined; //, TS = theme.createStyle(styleConfig);


    return [/*#__PURE__*/_react["default"].createElement("button", {
      key: "bt-drawer",
      className: CL.DRAWER_BT,
      style: (0, _extends2["default"])({}, S.BT_DRAWER, {}, btStyle),
      "aria-label": "Open Drawer",
      onClick: this._hToggle
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: CL.DRAWER_SPAN
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: CL.DRAWER_SVG,
      focusable: "false",
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }), /*#__PURE__*/_react["default"].createElement("path", {
      d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      key: "wrapper",
      "aria-hidden": !isOpen,
      className: CL.DRAWER_MODAL,
      style: _drawerModalStyle,
      onClick: _onClickWrapper
    }), /*#__PURE__*/_react["default"].createElement("aside", {
      key: "aside",
      className: CL.DRAWER //style={{ ..._drawerStyle, ...TS.COMP }}
      ,
      style: _drawerStyle
    }, _react["default"].cloneElement(children, {
      onCloseDrawer: this._hToggle
    }))];
  };

  return Drawer;
}(_react.Component);

var _default = Drawer; //export default withTheme(Drawer)

exports["default"] = _default;
//# sourceMappingURL=Drawer.js.map