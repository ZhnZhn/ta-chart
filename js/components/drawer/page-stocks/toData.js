'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ymdToUTC = require('../../../utils/ymdToUTC');

var _ymdToUTC2 = _interopRequireDefault(_ymdToUTC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toData = function toData(json) {
  return json.map(function (p) {
    p.date = (0, _ymdToUTC2.default)(p.date);
    return p;
  });
};

exports.default = toData;
//# sourceMappingURL=toData.js.map