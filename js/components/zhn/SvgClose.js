"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var CL = "svg-close";
var S = {
  //"#ED5813"
  COLOR: '#f44336',
  SVG: {
    padding: 3
  }
};

var SvgClose = function SvgClose(_ref) {
  var style = _ref.style,
      _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? -1 : _ref$tabIndex,
      onClick = _ref.onClick;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL,
    style: style,
    tabIndex: tabIndex,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      viewBox: "0 0 12 12",
      width: "100%",
      height: "100%",
      style: S.SVG,
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      strokeWidth: "2",
      stroke: S.COLOR,
      strokeLinecap: "round",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 0,0 L 12,12"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 12,0 L 0,12"
      })]
    })
  });
};
/*
SvgClose.propTypes = {
  style: PropTypes.object,
  onClose: PropTypes.func
}
*/


var _default = SvgClose;
exports["default"] = _default;
//# sourceMappingURL=SvgClose.js.map