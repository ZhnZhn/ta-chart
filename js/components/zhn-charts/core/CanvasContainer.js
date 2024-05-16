"use strict";

exports.__esModule = true;
exports.CanvasContainer = void 0;
var _uiApi = require("../../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const _getCanvasContext = ref => {
  var _getRefValue$getConte, _getRefValue;
  return (_getRefValue$getConte = (_getRefValue = (0, _uiApi.getRefValue)(ref)) == null ? void 0 : _getRefValue.getContext('2d')) != null ? _getRefValue$getConte : void 0;
};
const CanvasContainer = exports.CanvasContainer = (0, _uiApi.memo)(_ref => {
  let {
    refEl,
    style,
    width,
    height,
    ratio
  } = _ref;
  const _refBg = (0, _uiApi.useRef)(),
    _refAxes = (0, _uiApi.useRef)(),
    _refMouse = (0, _uiApi.useRef)();
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getCanvasContexts: () => ({
      bg: _getCanvasContext(_refBg),
      axes: _getCanvasContext(_refAxes),
      mouseCoord: _getCanvasContext(_refMouse)
    })
  }));
  const _adjustedWidth = width * ratio,
    _adjustedHeight = height * ratio,
    _canvasStyle = {
      position: 'absolute',
      width,
      height
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...style,
      position: 'absolute'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
      ref: _refBg,
      width: _adjustedWidth,
      height: _adjustedHeight,
      style: _canvasStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
      ref: _refAxes,
      width: _adjustedWidth,
      height: _adjustedHeight,
      style: _canvasStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
      ref: _refMouse,
      width: _adjustedWidth,
      height: _adjustedHeight,
      style: _canvasStyle
    })]
  });
});
//# sourceMappingURL=CanvasContainer.js.map