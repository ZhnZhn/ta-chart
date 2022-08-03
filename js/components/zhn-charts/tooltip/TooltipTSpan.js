"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["className", "fill", "children"];
var DF_FILL = '#4682b4';

var TooltipTSpan = function TooltipTSpan(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? _CL.CL_TOOLTIP_LABEL : _ref$className,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? DF_FILL : _ref$fill,
      children = _ref.children,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", (0, _extends2["default"])({
    className: className,
    fill: fill
  }, restProps, {
    children: children
  }));
};

var _default = TooltipTSpan;
exports["default"] = _default;
//# sourceMappingURL=TooltipTSpan.js.map