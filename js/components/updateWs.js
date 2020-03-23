"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URI_BASE: 'wss://stream.binance.com:9443/ws/',
  URI_SUFFIX: '@kline_1m'
};

var _crPoint = function _crPoint(E, k) {
  return {
    date: E,
    high: parseFloat(k.h),
    low: parseFloat(k.l),
    open: parseFloat(k.o),
    close: parseFloat(k.c),
    volume: parseFloat(k.v)
  };
};

var ws;

function closeWs() {
  if (ws) {
    ws.close();
  }
}

function connect(pair, onMessage, onOpen, onClose, onSecond) {
  var _prevMinute;

  ws = new WebSocket("" + C.URI_BASE + pair + C.URI_SUFFIX);
  ws.addEventListener('open', function () {
    _prevMinute = new Date().getMinutes();
    onOpen();
  });
  ws.addEventListener('message', function (event) {
    try {
      var _JSON$parse = JSON.parse(event.data),
          E = _JSON$parse.E,
          k = _JSON$parse.k,
          _d = new Date(E),
          _m = _d.getMinutes();

      if (_prevMinute !== _m) {
        _prevMinute = _m;
        onMessage(_crPoint(E, k));
        onSecond('');
      } else {
        onSecond(_d.getSeconds());
      }
    } catch (err) {
      console.log(err);
    }
  });
  ws.addEventListener('error', function (err) {
    onClose();
  });
  ws.addEventListener('close', function (event) {
    onClose();
  });
}

var _toPair = function _toPair(pair) {
  return ('' + pair).replace('/', '').toLowerCase();
};

var updateWs = {
  startLiveUpdate: function startLiveUpdate(_ref) {
    var pair = _ref.pair,
        onMessage = _ref.onMessage,
        onOpen = _ref.onOpen,
        onClose = _ref.onClose,
        onSecond = _ref.onSecond;
    connect(_toPair(pair), onMessage, onOpen, onClose, onSecond);
  },
  stopLiveUpdate: function stopLiveUpdate() {
    try {
      closeWs();
    } catch (err) {
      console.log(err);
    }
  }
};
var _default = updateWs;
exports["default"] = _default;
//# sourceMappingURL=updateWs.js.map