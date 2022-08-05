"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _GenericChartComponent = require("../core/GenericChartComponent");

var _contextFn = require("../core/contextFn");

var _useRenderSvg = _interopRequireDefault(require("./useRenderSvg"));

var _useDrawOnCanvas = _interopRequireDefault(require("./useDrawOnCanvas"));

var _jsxRuntime = require("react/jsx-runtime");

var crMouseCoordinate = function crMouseCoordinate(crCoordinateProps) {
  return function (props) {
    var _renderSVG = (0, _useRenderSvg["default"])(props, crCoordinateProps),
        _drawOnCanvas = (0, _useDrawOnCanvas["default"])(props, crCoordinateProps);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.GenericChartComponent, {
      clip: false,
      svgDraw: _renderSVG,
      canvasDraw: _drawOnCanvas,
      canvasToDraw: _contextFn.getMouseCanvas,
      drawOn: ["mousemove", "pan", "drag"]
    });
  };
};

var _default = crMouseCoordinate;
exports["default"] = _default;
//# sourceMappingURL=crMouseCoordinate.js.map