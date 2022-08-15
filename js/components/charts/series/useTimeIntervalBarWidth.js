"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../../uiApi");

var _chartFns = require("../chartFns");

var useTimeIntervalBarWidth = function useTimeIntervalBarWidth(timeInterval) {
  return (0, _uiApi.useMemo)(function () {
    return (0, _chartFns.timeIntervalBarWidth)(timeInterval);
  }, [timeInterval]);
};

var _default = useTimeIntervalBarWidth;
exports["default"] = _default;
//# sourceMappingURL=useTimeIntervalBarWidth.js.map