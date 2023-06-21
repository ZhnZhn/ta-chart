"use strict";

exports.__esModule = true;
exports.useElementWidth = void 0;
var _uiApi = require("../../uiApi");
const useElementWidth = function (_temp) {
  let {
    id,
    minWidth = 100,
    initialWidth = 1000
  } = _temp === void 0 ? {} : _temp;
  const ref = (0, _uiApi.useRef)(),
    [width, setWidth] = (0, _uiApi.useState)(initialWidth)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _calcWidth = (0, _uiApi.useCallback)(() => {
      const _el = id ? document.getElementById(id) : (0, _uiApi.getRefValue)(ref);
      if (_el) {
        const {
            width,
            paddingLeft,
            paddingRight
          } = window.getComputedStyle(_el),
          w = parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));
        setWidth(Math.round(Math.max(w, minWidth)));
      }
    }, []);
  // id, minWidth

  (0, _uiApi.useLayoutEffect)(_calcWidth, []);
  // _calcWidth

  (0, _uiApi.useEffect)(() => {
    window.addEventListener('resize', _calcWidth);
    return () => window.removeEventListener('resize', _calcWidth);
  }, []);
  // _calcWidth
  /*eslint-enable react-hooks/exhaustive-deps */

  return [width, ref];
};
exports.useElementWidth = useElementWidth;
//# sourceMappingURL=useElementWidth.js.map