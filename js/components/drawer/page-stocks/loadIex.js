'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throttle = require('../../../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _toData = require('./toData');

var _toData2 = _interopRequireDefault(_toData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock',
  DF_PERIOD: '1y'
};

var _crUri = function _crUri(symbol) {
  if (!symbol) {
    throw new Error("Symbol is empty");
  }
  return C.BASE_URL + '/' + symbol + '/chart/' + C.DF_PERIOD;
};

var loadIex = function loadIex(symbol, loadData) {
  return fetch(_crUri(symbol)).then(function (res) {
    var status = res.status;

    if (status >= 200 && status < 400) {
      return res.json();
    } else {
      throw new Error('Loading Error: ' + status);
    }
  }).then(function (json) {
    if (Array.isArray(json)) {
      loadData({
        providerTitle: 'IEX Platform',
        itemTitle: symbol,
        data: (0, _toData2.default)(json)
      });
    } else {
      throw new Error("Json response is empty");
    }
  }).catch(function (err) {
    console.log(err);
  });
};

exports.default = (0, _throttle2.default)(loadIex, 3000, { trailing: false });
//# sourceMappingURL=loadIex.js.map