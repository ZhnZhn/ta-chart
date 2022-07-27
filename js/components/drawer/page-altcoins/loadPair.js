"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isObj = function _isObj(obj) {
  return typeof obj === 'object';
};

var loadPair = function loadPair(_ref) {
  var exchImpl = _ref.exchImpl,
      exchange = _ref.exchange,
      pair = _ref.pair,
      timeframe = _ref.timeframe,
      dataAction = _ref.dataAction,
      proxy = _ref.proxy;
  dataAction.loading();

  var _ref2 = _isObj(timeframe) ? timeframe : {
    v: timeframe,
    tf: timeframe
  },
      v = _ref2.v,
      tf = _ref2.tf;

  exchImpl.fetchOHLCV(pair, v, proxy).then(function (ohlcv) {
    if (ohlcv.length !== 0) {
      dataAction.loadData({
        providerTitle: exchange,
        itemTitle: pair,
        data: ohlcv,
        timeframe: tf
      });
    }
  })["catch"](function (err) {
    dataAction.loadFailed();
    console.log(err.message);
  });
};

var _default = loadPair;
exports["default"] = _default;
//# sourceMappingURL=loadPair.js.map