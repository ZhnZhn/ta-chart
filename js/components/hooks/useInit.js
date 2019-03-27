"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var obj = void 0;

var useInit = function useInit(fn) {
  return obj ? obj : obj = fn();
};

exports.default = useInit;
//# sourceMappingURL=useInit.js.map