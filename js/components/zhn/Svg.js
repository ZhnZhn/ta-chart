"use strict";

exports.__esModule = true;
exports.SvgArrowDown = exports.Svg = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const _crWidthHeightViewBoxProps = (width, height, viewBox) => ({
  "aria-hidden": "true",
  xlmns: "http://www.w3.org/2000/svg",
  width,
  height,
  viewBox
});
const Svg = ({
  w,
  h = w,
  children,
  ...restProps
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
  ..._crWidthHeightViewBoxProps(`${w}px`, `${h}px`, `0 0 ${w} ${h}`),
  ...restProps,
  children: children
});
exports.Svg = Svg;
const SvgArrowDown = ({
  style
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Svg, {
  w: "20",
  "aria-hidden": "true",
  focusable: "false",
  style: style,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 3,6 L 10,12.5 M 10,12.5 L 17,6"
  })
});
exports.SvgArrowDown = SvgArrowDown;
//# sourceMappingURL=Svg.js.map