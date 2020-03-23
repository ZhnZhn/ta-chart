"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var obj;

var useInit = function useInit(fn) {
  return obj ? obj : obj = fn();
};

var _default = useInit;
exports["default"] = _default;
//# sourceMappingURL=useInit.js.map