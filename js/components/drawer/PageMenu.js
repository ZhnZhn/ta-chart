"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

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
  return /*#__PURE__*/_react["default"].createElement("ul", {
    style: (0, _extends2["default"])({}, S.UL, {}, style)
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    className: CL.BT,
    caption: "App Settings",
    onClick: function onClick() {
      return onNextPage("p1-1");
    }
  })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    className: CL.BT,
    caption: "AltCoins",
    onClick: function onClick() {
      return onNextPage("p1-2");
    }
  })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    className: CL.BT,
    caption: "Stocks",
    onClick: function onClick() {
      return onNextPage("p1-3");
    }
  })));
};

var _default = PageMenu;
exports["default"] = _default;
//# sourceMappingURL=PageMenu.js.map