"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));

var _utils = require("../utils");

var _EdgeCoordinateV = require("./EdgeCoordinateV3");

var useDrawOnCanvas = function useDrawOnCanvas(props, helper) {
  return (0, _useEventCallback["default"])(function (ctx, moreProps) {
    var _props = helper(props, moreProps);

    if ((0, _utils.isNotDefined)(_props)) {
      return null;
    }

    (0, _EdgeCoordinateV.drawOnCanvas)(ctx, _props);
  });
};

var _default = useDrawOnCanvas;
exports["default"] = _default;
//# sourceMappingURL=useDrawOnCanvas.js.map