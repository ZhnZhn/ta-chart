"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var ymdToUTC = function ymdToUTC(date) {
  var _arr = date.split('-'),
      _len = _arr.length;

  if (_len === 3) {
    return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _arr[2]);
  } else if (_len === 2 && _arr[1] !== '') {
    var _m = parseInt(_arr[1], 10),
        _d = new Date(_arr[0], _m, 0).getDate();

    return Date.UTC(_arr[0], _m - 1, _d);
  } else if (_len === 1) {
    return Date.UTC(_arr[0], 11, 31);
  }
};

var _default = ymdToUTC;
exports["default"] = _default;
//# sourceMappingURL=ymdToUTC.js.map