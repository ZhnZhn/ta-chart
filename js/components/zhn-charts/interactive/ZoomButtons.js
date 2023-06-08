"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../../uiApi");
var _d3Interpolate = require("d3-interpolate");
var _utils = require("../utils");
var _Chart = require("../core/Chart");
var _jsxRuntime = require("react/jsx-runtime");
var mathRound = Math.round;
var S_SVG_G = {
    pointerEvents: 'all',
    transform: 'translate(0, 50px)'
  },
  S_ZOOM_OUT = {
    transform: 'translate(-40px, 0)'
  },
  S_ZOOM_IN = {
    transform: 'translate(-56px, 0)'
  };
var _crTransform = function _crTransform(zoomX, y, r) {
  return "translate (" + (zoomX - 20) + ", " + (y - 8 + r / 4) + ")";
};
var ZoomButtons = function ZoomButtons(_ref) {
  var zoomMultiplier = _ref.zoomMultiplier,
    heightFromBase = _ref.heightFromBase,
    r = _ref.r,
    fill = _ref.fill,
    fillOpacity = _ref.fillOpacity,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    textFill = _ref.textFill;
  var context = (0, _uiApi.useContext)(_Chart.ChartContext),
    _zoom = function _zoom(direction) {
      var xAxisZoom = context.xAxisZoom,
        xScale = context.xScale,
        plotData = context.plotData,
        xAccessor = context.xAccessor,
        cx = xScale(xAccessor((0, _utils.last)(plotData))),
        c = direction > 0 ? 1 * zoomMultiplier : 1 / zoomMultiplier,
        _xScale$domain = xScale.domain(),
        start = _xScale$domain[0],
        end = _xScale$domain[1],
        _xScale$range$map$map = xScale.range().map(function (x) {
          return cx + (x - cx) * c;
        }).map(xScale.invert),
        newStart = _xScale$range$map$map[0],
        newEnd = _xScale$range$map$map[1],
        left = (0, _d3Interpolate.interpolateNumber)(start, newStart),
        right = (0, _d3Interpolate.interpolateNumber)(end, newEnd);
      xAxisZoom([left(0.2), right(0.2)]);
    },
    _hZoomIn = function _hZoomIn() {
      return _zoom(-1);
    },
    _hZoomOut = function _hZoomOut() {
      return _zoom(1);
    },
    _context$chartConfig = context.chartConfig,
    width = _context$chartConfig.width,
    height = _context$chartConfig.height,
    _centerX = mathRound(width / 2),
    _y = height - heightFromBase,
    _zoomOutX = _centerX - 16 - r * 2,
    _zoomInX = _centerX - 8,
    _resetX = _centerX + 16 + r * 2,
    _transformZoomOut = _crTransform(_zoomOutX, _y, r),
    _transformZoomIn = _crTransform(_zoomInX, _y, r),
    _cy = _y + r / 2,
    _cxZoomOut = _zoomInX - r / 2,
    _cxZoomIn = _resetX - r / 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    style: S_SVG_G,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transformZoomOut,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M19,13H5V11H19V13Z",
        fill: textFill
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      style: S_ZOOM_OUT,
      cx: _cxZoomOut,
      cy: _cy,
      fill: fill,
      fillOpacity: fillOpacity,
      stroke: stroke,
      strokeWidth: strokeWidth,
      r: r,
      onClick: _hZoomOut
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transformZoomIn,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z",
        fill: textFill
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      style: S_ZOOM_IN,
      cx: _cxZoomIn,
      cy: _cy,
      fill: fill,
      fillOpacity: fillOpacity,
      stroke: stroke,
      strokeWidth: strokeWidth,
      r: r,
      onClick: _hZoomIn
    })]
  });
};
ZoomButtons.defaultProps = {
  fill: '#ffffff',
  fillOpacity: 0.4,
  heightFromBase: 32,
  r: 16,
  stroke: 'grey',
  strokeWidth: 1,
  textFill: '#000000',
  zoomMultiplier: 1.5
};
var _default = ZoomButtons;
exports["default"] = _default;
//# sourceMappingURL=ZoomButtons.js.map