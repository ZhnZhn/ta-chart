"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("./Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SVG_CLOSE = "svg-close",
  S_SVG_X = {
    padding: 3,
    stroke: '#f44336'
  };
const SvgClose = ({
  style,
  tabIndex = -1,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  className: CL_SVG_CLOSE,
  style: style,
  tabIndex: tabIndex,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgX, {
    style: S_SVG_X
  })
});
var _default = exports.default = SvgClose;
//# sourceMappingURL=SvgClose.js.map