"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _d3Scale = require("d3-scale");

var _d3Time = require("d3-time");

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _timeIntervalBarWidth = _interopRequireDefault(require("./utils/timeIntervalBarWidth"));

var _config = _interopRequireDefault(require("./config"));

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _isInclude = function _isInclude(str, ch) {
  return str.indexOf(ch) !== -1;
};

var crTimeInterval = function crTimeInterval(timeframe) {
  if (!timeframe || !_isStr(timeframe)) {
    return _d3Time.utcDay;
  }

  var _n = parseInt(timeframe, 10);

  if (_isInclude(timeframe, 'm')) {
    return _d3Time.utcMinute.every(_n);
  } else if (_isInclude(timeframe, 'h')) {
    return _d3Time.utcHour.every(_n);
  } else if (_isInclude(timeframe, 'd')) {
    return _d3Time.utcDay.every(_n);
  } else if (_isInclude(timeframe, 'w')) {
    return _d3Time.utcWeek.every(_n);
  } else if (_isInclude(timeframe, 'M')) {
    return _d3Time.utcMonth.every(_n);
  }

  return _d3Time.utcDay;
};

var fromDate,
    toDate,
    xExtends = [];

var crExtends = function crExtends(data, timeframe, itemsNum) {
  var _max = data.length - 1,
      _from = _max < itemsNum ? data[0].date : data[_max - itemsNum].date,
      _recentDate = data.slice(-1)[0].date,
      _to = timeframe === '1m' ? _recentDate + 60 * 1000 * 5 : _recentDate;

  return _from === fromDate && _to === toDate ? xExtends : fromDate = _from, toDate = _to, xExtends = [_from, _to];
};

var crTimeFormat = function crTimeFormat(timeframe) {
  return _isStr(timeframe) && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h')) ? (0, _d3TimeFormat.timeFormat)('%m-%d %H:%M') : (0, _d3TimeFormat.timeFormat)("%Y-%m-%d");
};

var chartFns = {
  C: _config["default"],
  timeIntervalBarWidth: _timeIntervalBarWidth["default"],
  scaleTime: _d3Scale.scaleTime,
  crTimeInterval: crTimeInterval,
  crTimeFormat: crTimeFormat,
  utcMinute: _d3Time.utcMinute,
  utcHour: _d3Time.utcHour,
  utcDay: _d3Time.utcDay,
  format: _d3Format.format,
  timeFormat: _d3TimeFormat.timeFormat,
  crExtends: crExtends
};
var _default = chartFns;
exports["default"] = _default;
//# sourceMappingURL=chartFns.js.map