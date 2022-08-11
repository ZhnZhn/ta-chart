"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));

var _jsxRuntime = require("react/jsx-runtime");

var SVGComponent = function SVGComponent(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
    svgDraw: children
  });
};

var _default = SVGComponent;
exports["default"] = _default;
//# sourceMappingURL=SVGComponent.js.map