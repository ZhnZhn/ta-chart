"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CL = _interopRequireDefault(require("../styles/CL"));

var TITLE = "Logo of web app TA Chart v0.2.0";

var IconLogoErc = function IconLogoErc(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? _CL["default"].LOGO : _ref$className,
      style = _ref.style,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? TITLE : _ref$title;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: className,
    style: style,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: "2",
    strokeWidth: "2"
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    ry: "1.8825414",
    rx: "194.14471",
    y: "1.434558",
    x: "19.176462",
    height: "12.460618",
    width: "10.85316",
    fill: "#8ecc2d",
    stroke: "#8ecc2d"
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    ry: "1.87537",
    rx: "204.478",
    y: "16.639841",
    x: "8.8410215",
    height: "13.752699",
    width: "18.307165",
    fill: "#232f3b",
    stroke: "#232f3b"
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    ry: "1.87537",
    rx: "204.478",
    y: "3.4229634",
    x: "2.5897937",
    height: "10.894996",
    width: "10.001963",
    fill: "#a487d4",
    stroke: "#a487d4"
  })));
};

var _default = IconLogoErc;
exports["default"] = _default;
//# sourceMappingURL=Logo.js.map