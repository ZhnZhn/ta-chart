"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAWER = 'drawer',
  CL_DRAWER_BT = CL_DRAWER + "-bt",
  CL_DRAWER_SPAN = CL_DRAWER + "-span",
  CL_DRAWER_SVG = CL_DRAWER + "-svg",
  CL_DRAWER_MODAL = CL_DRAWER + "-modal",
  S_BT_DRAWER = {
    position: 'absolute',
    top: 0,
    right: 16
  },
  S_DRAWER_OFF = {
    transform: 'translateX(334px)',
    pointerEvents: 'none'
  },
  S_DRAWER_ON = {
    transform: 'translate(0px, 0px)'
  },
  S_MODAL_OFF = {
    display: 'none',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  S_MODAL_ON = {
    display: 'block',
    opacity: 1,
    zIndex: 1000,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  };
const Drawer = _ref => {
  let {
    btStyle,
    children
  } = _ref;
  const [isOpen, toggleIsOpen] = (0, _useToggle.default)();
  (0, _uiApi.useEffect)(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);
  const _drawerStyle = isOpen ? S_DRAWER_ON : S_DRAWER_OFF,
    _drawerModalStyle = isOpen ? S_MODAL_ON : S_MODAL_OFF,
    _onClickWrapper = isOpen ? toggleIsOpen : void 0;
  return [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_DRAWER_BT,
    style: {
      ...S_BT_DRAWER,
      ...btStyle
    },
    "aria-label": "Open Drawer",
    onClick: toggleIsOpen,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_DRAWER_SPAN,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        className: CL_DRAWER_SVG,
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
    role: "presentation",
    "aria-hidden": !isOpen,
    className: CL_DRAWER_MODAL,
    style: _drawerModalStyle,
    onClick: _onClickWrapper
  }, "wrapper"), /*#__PURE__*/(0, _jsxRuntime.jsx)("aside", {
    className: CL_DRAWER,
    style: _drawerStyle,
    children: (0, _uiApi.cloneElement)(children, {
      onCloseDrawer: toggleIsOpen
    })
  }, "aside")];
};
var _default = Drawer;
exports.default = _default;
//# sourceMappingURL=Drawer.js.map