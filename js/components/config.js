"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _rand = Math.random;

var _randDirection = function _randDirection() {
  return _rand() > 0.5 ? 1 : -1;
};

var _randDelta = function _randDelta() {
  return _rand() * _randDirection();
};

var _crHigh = function _crHigh(open, close) {
  return open > close ? open + 0.2 : close + 0.2;
};

var _crLow = function _crLow(open, close) {
  return open > close ? close - 0.2 : open - 0.2;
};

var NUM_POINTS = 100;

var _crData = function _crData() {
  var DAY_PERIOD = 1000 * 60 * 60 * 24,
      _now = new Date(),
      data = [];

  var closePrev = 1,
      close,
      open;

  for (var i = 0; i < NUM_POINTS; i++) {
    open = closePrev + _randDelta();
    close = closePrev + _randDelta();
    data.push({
      date: _now.getTime() - i * DAY_PERIOD,
      open: open,
      close: close,
      high: _crHigh(open, close),
      low: _crLow(open, close)
    });
  }

  return data.reverse();
};

var C = {
  INITIAL_PROVIDER_TITLE: 'Data Provider (Random)',
  INITIAL_ITEM_TITLE: 'Item',
  PROXY: 'https://cors-anywhere.herokuapp.com/',
  RATE_LIMIT: 3000,
  DF_DATA: _crData(),
  DF_TIMEFRAME: '1d'
};

var _default = Object.freeze(C);

exports["default"] = _default;
//# sourceMappingURL=config.js.map