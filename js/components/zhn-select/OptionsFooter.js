"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("../zhn/Svg");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_BT_X = {
  backgroundColor: '#e1e1cb',
  height: '32px',
  padding: '8px',
  stroke: "#1b75bb",
  borderRadius: '50%'
};
;
const OptionsFooter = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: `${_CL.CL_FOOTER} ${_CL.CL_NOT_SELECTED}`,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: _CL.CL_FOOTER_INDEX,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: props.refIndexActive,
      children: props.indexActiveOption
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [": ", props.nFiltered, ": ", props.nAll]
    })]
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: _CL.CL_FOOTER_BTS,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      "aria-label": "Clear input and close options",
      style: S_BT_X,
      onClick: props.onClear,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgX, {})
    })
  })]
});
var _default = exports.default = OptionsFooter;
//# sourceMappingURL=OptionsFooter.js.map