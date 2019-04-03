'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageFns = require('./pageFns');

var loadPair = function loadPair(_ref) {
  var exchImpl = _ref.exchImpl,
      exchange = _ref.exchange,
      pair = _ref.pair,
      timeframe = _ref.timeframe,
      dataAction = _ref.dataAction;

  dataAction.loading();
  exchImpl.fetchOHLCV(pair, timeframe).then(function (ohlcv) {
    return dataAction.loadData({
      providerTitle: exchange,
      itemTitle: pair,
      data: ohlcv.map(_pageFns.crPoint),
      timeframe: timeframe
    });
  }).catch(function (err) {
    dataAction.loadFailed();
    console.log(err.message);
  });
};

exports.default = loadPair;
//# sourceMappingURL=loadPair.js.map