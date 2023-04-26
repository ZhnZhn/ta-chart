"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var useProperty = function useProperty(initialValue, dfValue) {
  var ref = (0, _uiApi.useRef)(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return (0, _uiApi.useMemo)(function () {
    return [
    //setValue
    function (v) {
      ref.current = v;
    },
    //getValue
    function () {
      return ref.current === void 0 ? dfValue : ref.current;
    }];
  }, []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
};
var _default = useProperty;
exports["default"] = _default;
//# sourceMappingURL=useProperty.js.map