"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("./Svg100"));
var _jsxRuntime = require("react/jsx-runtime");
const STROKE_COLOR = '#f44336',
  CL = "svg-close",
  S_SVG = {
    padding: 3
  };
const SvgClose = _ref => {
  let {
    style,
    tabIndex = -1,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL,
    style: style,
    tabIndex: tabIndex,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
      w: "12",
      style: S_SVG,
      strokeWidth: "2",
      stroke: STROKE_COLOR,
      strokeLinecap: "round",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 0,0 L 12,12"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 12,0 L 0,12"
      })]
    })
  });
};
var _default = exports.default = SvgClose;
//# sourceMappingURL=SvgClose.js.map