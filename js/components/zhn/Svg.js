"use strict";

exports.__esModule = true;
exports.SvgX = exports.SvgArrowLeft = exports.SvgArrowDown = exports.Svg100 = exports.Svg = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const _crWidthHeightViewBoxProps = (width, height, viewBox) => ({
  "aria-hidden": "true",
  xlmns: "http://www.w3.org/2000/svg",
  width,
  height,
  viewBox
});
const Svg100 = ({
  w,
  h = w,
  children,
  ...restProps
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
  ..._crWidthHeightViewBoxProps("100%", "100%", `0 0 ${w} ${h}`),
  preserveAspectRatio: "none",
  ...restProps,
  children: children
});
exports.Svg100 = Svg100;
const SvgX = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)(Svg100, {
  w: "12",
  strokeWidth: "2",
  strokeLinecap: "round",
  style: props.style,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 0,0 L 12,12"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 12,0 L 0,12"
  })]
});
exports.SvgX = SvgX;
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
const S_ARROW = {
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round'
  },
  S_ARROW_LEFT = {
    transform: 'rotate(90deg)'
  };
const _fSvgArrow = arrowStyle => ({
  style
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgArrowDown, {
  style: {
    ...S_ARROW,
    ...arrowStyle,
    ...style
  }
});
const SvgArrowLeft = exports.SvgArrowLeft = _fSvgArrow(S_ARROW_LEFT);
//# sourceMappingURL=Svg.js.map