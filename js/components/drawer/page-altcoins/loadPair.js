'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageFns = require('./pageFns');

var loadPair = function loadPair(_ref) {
  var exchImpl = _ref.exchImpl,
      exchange = _ref.exchange,
      pair = _ref.pair,
      loadData = _ref.loadData;

  exchImpl.fetchOHLCV(pair, '1d').then(function (ohlcv) {
    return loadData({
      providerTitle: exchange,
      itemTitle: pair,
      data: ohlcv.map(_pageFns.crPoint)
    });
  }).catch(function (err) {
    console.log(err.message);
  });
};

exports.default = loadPair;
//# sourceMappingURL=loadPair.js.map