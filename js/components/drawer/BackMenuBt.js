"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _Svg = require("../zhn/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAWER_LIST_BT = 'drawer__list-bt',
  S_SVG_ARROW_LEFT = {
    verticalAlign: 'text-bottom'
  };
const svgComp = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgArrowLeft, {
  style: S_SVG_ARROW_LEFT
});
const BackMenuBt = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
  className: CL_DRAWER_LIST_BT,
  svgComp: svgComp,
  caption: "Menu",
  onClick: props.onClick
});
var _default = exports.default = BackMenuBt;
//# sourceMappingURL=BackMenuBt.js.map