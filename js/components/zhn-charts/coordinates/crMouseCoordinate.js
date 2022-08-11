"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));

var _contextFn = require("../core/contextFn");

var _useRenderSvg = _interopRequireDefault(require("./useRenderSvg"));

var _useDrawOnCanvas = _interopRequireDefault(require("./useDrawOnCanvas"));

var _jsxRuntime = require("react/jsx-runtime");

var DRAWN_ON = ['mousemove', 'pan', 'drag'];

var crMouseCoordinate = function crMouseCoordinate(crCoordinateProps) {
  return function (props) {
    var _renderSVG = (0, _useRenderSvg["default"])(props, crCoordinateProps),
        _drawOnCanvas = (0, _useDrawOnCanvas["default"])(props, crCoordinateProps);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent["default"], {
      clip: false,
      svgDraw: _renderSVG,
      canvasDraw: _drawOnCanvas,
      canvasToDraw: _contextFn.getMouseCanvas,
      drawOn: DRAWN_ON
    });
  };
};

var _default = crMouseCoordinate;
exports["default"] = _default;
//# sourceMappingURL=crMouseCoordinate.js.map