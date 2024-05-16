"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _GenericChartComponent = _interopRequireDefault(require("../core/GenericChartComponent"));
var _contextFn = require("../core/contextFn");
var _EdgeCoordinateV = require("./EdgeCoordinateV3");
var _jsxRuntime = require("react/jsx-runtime");
const DRAWN_ON = ['mousemove', 'pan', 'drag'];
const crMouseCoordinate = (crCoordinateProps, dfProps) => props => {
  const _props = (0, _uiApi.getProps)(props, dfProps),
    _renderSVG = moreProps => {
      const _coordinateProps = crCoordinateProps(_props, moreProps);
      return _coordinateProps == null ? null : (0, _EdgeCoordinateV.renderSVG)(_coordinateProps);
    },
    _drawOnCanvas = (ctx, moreProps) => {
      const _coordinateProps = crCoordinateProps(_props, moreProps);
      if (_coordinateProps == null) {
        return null;
      }
      (0, _EdgeCoordinateV.drawOnCanvas)(ctx, _coordinateProps);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericChartComponent.default, {
    clip: false,
    svgDraw: _renderSVG,
    canvasDraw: _drawOnCanvas,
    canvasToDraw: _contextFn.getMouseCanvas,
    drawOn: DRAWN_ON
  });
};
var _default = exports.default = crMouseCoordinate;
//# sourceMappingURL=crMouseCoordinate.js.map