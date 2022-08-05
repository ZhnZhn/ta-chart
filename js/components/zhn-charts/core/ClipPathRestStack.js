"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var CLIP_PATH_ID_PREFIX = 'chart-area-clip';

var ClipPathRestStack = function ClipPathRestStack(_ref) {
  var configs = _ref.configs;
  return configs.map(function (config, index) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: CLIP_PATH_ID_PREFIX + "-" + config.id,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "0",
        y: "0",
        width: config.width,
        height: config.height
      })
    }, index);
  });
};

var _default = ClipPathRestStack;
exports["default"] = _default;
//# sourceMappingURL=ClipPathRestStack.js.map