"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var useEventCallback = function useEventCallback(handler) {
  var ref = (0, _uiApi.useRef)(null);
  (0, _uiApi.useLayoutEffect)(function () {
    ref.current = handler;
  });
  return (0, _uiApi.useCallback)(function () {
    var fn = ref.current;
    return fn ? fn.apply(void 0, arguments) : void 0;
  }, []);
};

var _default = useEventCallback;
exports["default"] = _default;
//# sourceMappingURL=useEventCallback.js.map