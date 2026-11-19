"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("./Svg");
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#64e346',
  S_SPAN = {
    display: 'inline-block',
    width: 16,
    height: 16
  };
const SvgChecked = ({
  style,
  color = DF_COLOR
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: {
    ...S_SPAN,
    ...style
  },
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100, {
    w: "16",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M 2,5 L 8,14 14,1",
      stroke: color,
      fill: "transparent",
      strokeWidth: "3",
      strokeLinecap: "round"
    })
  })
});
var _default = exports.default = SvgChecked;
//# sourceMappingURL=SvgChecked.js.map