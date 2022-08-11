"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../../uiApi");

var useElementWidth = function useElementWidth(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      id = _ref.id,
      _ref$minWidth = _ref.minWidth,
      minWidth = _ref$minWidth === void 0 ? 100 : _ref$minWidth,
      _ref$initialWidth = _ref.initialWidth,
      initialWidth = _ref$initialWidth === void 0 ? 1000 : _ref$initialWidth;

  var ref = (0, _uiApi.useRef)(),
      _useState = (0, _uiApi.useState)(initialWidth),
      width = _useState[0],
      setWidth = _useState[1],
      _calcWidth = (0, _uiApi.useCallback)(function () {
    var _el = id ? document.getElementById(id) : (0, _uiApi.getRefValue)(ref);

    if (_el) {
      var _window$getComputedSt = window.getComputedStyle(_el),
          _width = _window$getComputedSt.width,
          paddingLeft = _window$getComputedSt.paddingLeft,
          paddingRight = _window$getComputedSt.paddingRight,
          w = parseFloat(_width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));

      setWidth(Math.round(Math.max(w, minWidth)));
    }
  }, []); // id, minWidth


  (0, _uiApi.useLayoutEffect)(_calcWidth, []); // _calcWidth

  (0, _uiApi.useEffect)(function () {
    window.addEventListener('resize', _calcWidth);
    return function () {
      return window.removeEventListener('resize', _calcWidth);
    };
  }, []); // _calcWidth

  /*eslint-enable react-hooks/exhaustive-deps */

  return [width, ref];
};

var _default = useElementWidth;
exports["default"] = _default;
//# sourceMappingURL=useElementWidth.js.map