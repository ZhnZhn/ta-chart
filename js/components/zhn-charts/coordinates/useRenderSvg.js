"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));

var _utils = require("../utils");

var _EdgeCoordinateV = require("./EdgeCoordinateV3");

var useRenderSvg = function useRenderSvg(props, helper) {
  return (0, _useEventCallback["default"])(function (moreProps) {
    var _props = helper(props, moreProps);

    return (0, _utils.isNotDefined)(_props) ? null : (0, _EdgeCoordinateV.renderSVG)(_props);
  });
};

var _default = useRenderSvg;
exports["default"] = _default;
//# sourceMappingURL=useRenderSvg.js.map