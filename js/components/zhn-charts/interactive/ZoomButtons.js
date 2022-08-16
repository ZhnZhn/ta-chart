"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiApi = require("../../uiApi");

var _d3Interpolate = require("d3-interpolate");

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

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

var ZoomButtons = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ZoomButtons, _Component);

  function ZoomButtons() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hZoomIn = function () {
      _this._zoom(-1);
    };

    _this._hZoomOut = function () {
      _this._zoom(1);
    };

    _this._zoom = function (direction) {
      var _this$context = _this.context,
          xAxisZoom = _this$context.xAxisZoom,
          xScale = _this$context.xScale,
          plotData = _this$context.plotData,
          xAccessor = _this$context.xAccessor,
          zoomMultiplier = _this.props.zoomMultiplier,
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
    };

    return _this;
  }

  var _proto = ZoomButtons.prototype;

  _proto.render = function render() {
    var _this$context$chartCo = this.context.chartConfig,
        width = _this$context$chartCo.width,
        height = _this$context$chartCo.height,
        _this$props = this.props,
        heightFromBase = _this$props.heightFromBase,
        r = _this$props.r,
        fill = _this$props.fill,
        fillOpacity = _this$props.fillOpacity,
        stroke = _this$props.stroke,
        strokeWidth = _this$props.strokeWidth,
        textFill = _this$props.textFill,
        centerX = Math.round(width / 2),
        y = height - heightFromBase,
        zoomOutX = centerX - 16 - r * 2,
        zoomInX = centerX - 8,
        resetX = centerX + 16 + r * 2,
        _transformZoomOut = _crTransform(zoomOutX, y, r),
        _transformZoomIn = _crTransform(zoomInX, y, r);

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
        cx: zoomInX - r / 2,
        cy: y + r / 2,
        fill: fill,
        fillOpacity: fillOpacity,
        stroke: stroke,
        strokeWidth: strokeWidth,
        r: r,
        onClick: this._hZoomOut
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        transform: _transformZoomIn,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z",
          fill: textFill
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        style: S_ZOOM_IN,
        cx: resetX - r / 2,
        cy: y + r / 2,
        fill: fill,
        fillOpacity: fillOpacity,
        stroke: stroke,
        strokeWidth: strokeWidth,
        r: r,
        onClick: this._hZoomIn
      })]
    });
  };

  return ZoomButtons;
}(_uiApi.Component);

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
ZoomButtons.contextTypes = {
  xScale: _propTypes["default"].func.isRequired,
  chartConfig: _propTypes["default"].object.isRequired,
  plotData: _propTypes["default"].array.isRequired,
  xAccessor: _propTypes["default"].func.isRequired,
  xAxisZoom: _propTypes["default"].func.isRequired
};
var _default = ZoomButtons;
exports["default"] = _default;
//# sourceMappingURL=ZoomButtons.js.map