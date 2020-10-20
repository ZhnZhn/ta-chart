"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var CL = {
  BT: 'drawer__list-bt'
};
var S = {
  UL: {
    listStyleType: 'none'
  }
};

var PageMenu = function PageMenu(_ref) {
  var style = _ref.style,
      onNextPage = _ref.onNextPage;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
    style: (0, _extends2["default"])({}, S.UL, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
        className: CL.BT,
        caption: "App Settings",
        onClick: function onClick() {
          return onNextPage("p1-1");
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
        className: CL.BT,
        caption: "AltCoins",
        onClick: function onClick() {
          return onNextPage("p1-2");
        }
      })
    })]
  });
};

var _default = PageMenu;
exports["default"] = _default;
//# sourceMappingURL=PageMenu.js.map