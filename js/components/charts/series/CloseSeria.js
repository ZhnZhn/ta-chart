"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _Ch = _interopRequireDefault(require("../Ch"));

var _chartFns = _interopRequireDefault(require("../chartFns"));

var format = _chartFns["default"].format;

var CloseSeria = function CloseSeria(_ref) {
  var id = _ref.id,
      height = _ref.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Ch["default"].Chart, {
    id: id,
    height: height,
    yExtents: function yExtents(d) {
      return [d.high, d.low];
    },
    origin: function origin(w, h) {
      return [0, h - 510];
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].YAxis, {
      axisAt: "left",
      orient: "left",
      stroke: "black",
      ticks: 5
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].LineSeries, {
      yAccessor: function yAccessor(d) {
        return d.close;
      },
      stroke: "black"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ch["default"].MouseCoordinateY, {
      at: "left",
      orient: "left",
      displayFormat: format(".2f")
    })]
  });
};

var _default = CloseSeria;
exports["default"] = _default;
//# sourceMappingURL=CloseSeria.js.map