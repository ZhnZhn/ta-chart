"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _EdgeCoordinateV = require("./EdgeCoordinateV3");
var _jsxRuntime = require("react/jsx-runtime");
var DRAWN_ON = ['mousemove', 'pan', 'drag'];
var crMouseCoordinate = function crMouseCoordinate(crCoordinateProps) {
  return function (props) {
    var _renderSVG = function _renderSVG(moreProps) {
        var _props = crCoordinateProps(props, moreProps);
        return _props == null ? null : (0, _EdgeCoordinateV.renderSVG)(_props);
      },
      _drawOnCanvas = function _drawOnCanvas(ctx, moreProps) {
        var _props = crCoordinateProps(props, moreProps);
        if (_props == null) {
          return null;
        }
        (0, _EdgeCoordinateV.drawOnCanvas)(ctx, _props);
      };
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