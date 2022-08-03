"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["className", "fontFamily", "fontSize", "children"];
var DF_FONT_SIZE = 11,
    DF_FONT_FAMILY = "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif";

var TooltipText = function TooltipText(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? _CL.CL_TOOLTIP : _ref$className,
      _ref$fontFamily = _ref.fontFamily,
      fontFamily = _ref$fontFamily === void 0 ? DF_FONT_FAMILY : _ref$fontFamily,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? DF_FONT_SIZE : _ref$fontSize,
      children = _ref.children,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", (0, _extends2["default"])({
    className: className,
    fontFamily: fontFamily,
    fontSize: fontSize
  }, restProps, {
    children: children
  }));
};

var _default = TooltipText;
exports["default"] = _default;
//# sourceMappingURL=TooltipText.js.map