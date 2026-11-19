"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("../zhn/Svg");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_OPEN = {
    color: "#1b75bb"
  },
  S_SVG_CLOSE = {
    color: "#858585"
  };
const ArrowCell = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  "aria-label": "Toggle suggestions",
  type: "button",
  className: _CL.CL_BT_ARROW,
  tabIndex: "-1",
  onClick: props.onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgArrowDown, {
    style: props.isShowOption ? S_SVG_OPEN : S_SVG_CLOSE
  })
});
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map