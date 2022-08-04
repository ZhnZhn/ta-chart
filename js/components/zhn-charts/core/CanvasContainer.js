"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.CanvasContainer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../../uiApi");

var _jsxRuntime = require("react/jsx-runtime");

var _getCanvasContext = function _getCanvasContext(ref) {
  var _getRefValue$getConte, _getRefValue;

  return (_getRefValue$getConte = (_getRefValue = (0, _uiApi.getRefValue)(ref)) == null ? void 0 : _getRefValue.getContext('2d')) != null ? _getRefValue$getConte : void 0;
};

var CanvasContainer = (0, _uiApi.memo)((0, _uiApi.forwardRef)(function (_ref, ref) {
  var style = _ref.style,
      width = _ref.width,
      height = _ref.height,
      ratio = _ref.ratio;

  var _refBg = (0, _uiApi.useRef)(),
      _refAxes = (0, _uiApi.useRef)(),
      _refMouse = (0, _uiApi.useRef)();

  (0, _uiApi.useImperativeHandle)(ref, function () {
    return {
      getCanvasContexts: function getCanvasContexts() {
        return {
          bg: _getCanvasContext(_refBg),
          axes: _getCanvasContext(_refAxes),
          mouseCoord: _getCanvasContext(_refMouse)
        };
      }
    };
  });

  var _adjustedWidth = width * ratio,
      _adjustedHeight = height * ratio,
      _canvasStyle = {
    position: 'absolute',
    width: width,
    height: height
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, style, {
      position: 'absolute'
    }),
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
}));
exports.CanvasContainer = CanvasContainer;
//# sourceMappingURL=CanvasContainer.js.map