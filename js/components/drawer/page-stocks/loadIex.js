"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _throttle = _interopRequireDefault(require("../../../utils/throttle"));

var _toData = _interopRequireDefault(require("./toData"));

var C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock',
  DF_PERIOD: '1y'
};

var _crUri = function _crUri(symbol) {
  if (!symbol) {
    throw new Error("Symbol is empty");
  }

  return C.BASE_URL + "/" + symbol + "/chart/" + C.DF_PERIOD;
};

var loadIex = function loadIex(_ref) {
  var symbol = _ref.symbol,
      dataAction = _ref.dataAction;
  dataAction.loading();
  fetch(_crUri(symbol)).then(function (res) {
    var status = res.status;

    if (status >= 200 && status < 400) {
      return res.json();
    } else {
      throw new Error("Loading Error: " + status);
    }
  }).then(function (json) {
    if (Array.isArray(json)) {
      dataAction.loadData({
        providerTitle: 'IEX Platform',
        itemTitle: symbol,
        data: (0, _toData["default"])(json)
      });
    } else {
      throw new Error("Json response is empty");
    }
  })["catch"](function (err) {
    dataAction.loadFailed();
    console.log(err);
  });
};

var _default = (0, _throttle["default"])(loadIex, 3000, {
  trailing: false
});

exports["default"] = _default;
//# sourceMappingURL=loadIex.js.map