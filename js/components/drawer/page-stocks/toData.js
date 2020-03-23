"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ymdToUTC = _interopRequireDefault(require("../../../utils/ymdToUTC"));

var toData = function toData(json) {
  return json.map(function (p) {
    p.date = (0, _ymdToUTC["default"])(p.date);
    return p;
  });
};

var _default = toData;
exports["default"] = _default;
//# sourceMappingURL=toData.js.map