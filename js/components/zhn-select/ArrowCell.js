"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const S_ARROW_CELL = {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  S_ARROW = {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  },
  ANIMATION_CIRCLE = "circle infinite 1.25s linear",
  BORDER_COLOR = "#1b75bb transparent transparent";
const ArrowCell = _ref => {
  let {
    refEl,
    arrowStyle,
    onClick
  } = _ref;
  const _refArrowCell = (0, _uiApi.useRef)(),
    _refArrow = (0, _uiApi.useRef)();
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    startAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = ANIMATION_CIRCLE;
      (0, _uiApi.getRefElementStyle)(_refArrow).borderColor = BORDER_COLOR;
    },
    stopAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = "";
    }
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    ref: _refArrowCell,
    style: S_ARROW_CELL,
    tabIndex: "-1",
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: _refArrow,
      style: {
        ...S_ARROW,
        ...arrowStyle
      }
    })
  });
};
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map