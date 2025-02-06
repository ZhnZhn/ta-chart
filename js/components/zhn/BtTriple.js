"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT = 'bt-triple',
  CL_BT_ONE = `${CL_BT}__one`,
  CL_BT_TWO = `${CL_BT}__two`,
  CL_BT_THREE = `${CL_BT}__three`,
  S_SELECTED = {
    backgroundColor: '#1b2836'
  };
const _crBtStyle = (nowValue, btValue) => nowValue === btValue ? S_SELECTED : void 0;
const BtTriple = _ref => {
  let {
    style,
    tabIndex = -1,
    initialValue = 1,
    oneC = 'One',
    twoC = 'Two',
    threeC = 'Three',
    onClick
  } = _ref;
  const [value, setValue] = (0, _uiApi.useState)(initialValue),
    _oneStyle = _crBtStyle(value, 1),
    _twoStyle = _crBtStyle(value, 2),
    _threeStyle = _crBtStyle(value, 3),
    _onClick = value => {
      onClick(value);
      setValue(value);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_BT,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      className: CL_BT_ONE,
      style: _oneStyle,
      tabIndex: tabIndex,
      onClick: (0, _uiApi.bindTo)(_onClick, 1),
      children: oneC
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      className: CL_BT_TWO,
      style: _twoStyle,
      tabIndex: tabIndex,
      onClick: (0, _uiApi.bindTo)(_onClick, 2),
      children: twoC
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      className: CL_BT_THREE,
      style: _threeStyle,
      tabIndex: tabIndex,
      onClick: (0, _uiApi.bindTo)(_onClick, 3),
      children: threeC
    })]
  });
};
var _default = exports.default = BtTriple;
//# sourceMappingURL=BtTriple.js.map