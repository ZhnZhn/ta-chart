"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ClipPathRestStack = _interopRequireDefault(require("./ClipPathRestStack"));

var _ID = require("./ID");

var _jsxRuntime = require("react/jsx-runtime");

var ChartCanvasDefs = function ChartCanvasDefs(_ref) {
  var dimensions = _ref.dimensions,
      chartConfig = _ref.chartConfig;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("defs", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: _ID.CLIP_PATH_ID,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "0",
        y: "0",
        width: dimensions.width,
        height: dimensions.height
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRestStack["default"], {
      configs: chartConfig
    })]
  });
};

var _default = ChartCanvasDefs;
exports["default"] = _default;
//# sourceMappingURL=ChartCanvasDefs.js.map