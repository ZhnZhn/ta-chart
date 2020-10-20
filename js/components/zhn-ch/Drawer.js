"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

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


    return [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL.DRAWER_BT,
      style: (0, _extends2["default"])({}, S.BT_DRAWER, btStyle),
      "aria-label": "Open Drawer",
      onClick: this._hToggle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL.DRAWER_SPAN,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
          className: CL.DRAWER_SVG,
          focusable: "false",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            fill: "none",
            d: "M0 0h24v24H0z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          })]
        })
      })
    }, "bt-drawer"), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-hidden": !isOpen,
      className: CL.DRAWER_MODAL,
      style: _drawerModalStyle,
      onClick: _onClickWrapper
    }, "wrapper"), /*#__PURE__*/(0, _jsxRuntime.jsx)("aside", {
      className: CL.DRAWER //style={{ ..._drawerStyle, ...TS.COMP }}
      ,
      style: _drawerStyle,
      children: /*#__PURE__*/(0, _react.cloneElement)(children, {
        onCloseDrawer: this._hToggle
      })
    }, "aside")];
  };

  return Drawer;
}(_react.Component);

var _default = Drawer; //export default withTheme(Drawer)

exports["default"] = _default;
//# sourceMappingURL=Drawer.js.map