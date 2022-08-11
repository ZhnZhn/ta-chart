"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.timeIntervalBarWidth = exports.scaleTime = exports.format = exports.crTimeInterval = exports.crTimeFormat = exports.crExtends = exports.COLOR = void 0;

var _d3Scale = require("d3-scale");

exports.scaleTime = _d3Scale.scaleTime;

var _d3Time = require("d3-time");

exports.utcMinute = _d3Time.utcMinute;
exports.utcHour = _d3Time.utcHour;
exports.utcDay = _d3Time.utcDay;

var _d3Format = require("d3-format");

exports.format = _d3Format.format;

var _d3TimeFormat = require("d3-time-format");

exports.timeFormat = _d3TimeFormat.timeFormat;

var _timeIntervalBarWidth = _interopRequireDefault(require("./utils/timeIntervalBarWidth"));

exports.timeIntervalBarWidth = _timeIntervalBarWidth["default"];

var _config = _interopRequireDefault(require("./config"));

exports.COLOR = _config["default"];

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

exports.crTimeInterval = crTimeInterval;

var crTimeFormat = function crTimeFormat(timeframe) {
  return _isStr(timeframe) && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h')) ? (0, _d3TimeFormat.timeFormat)('%m-%d %H:%M') : (0, _d3TimeFormat.timeFormat)("%Y-%m-%d");
};

exports.crTimeFormat = crTimeFormat;
var fromDate,
    toDate,
    xExtends = [];

var crExtends = function crExtends(data, timeframe, itemsNum) {
  var _max = data.length - 1,
      _from = _max < itemsNum ? (data[0] || {}).date : (data[_max - itemsNum] || {}).date,
      _recentDate = (data.slice(-1)[0] || {}).date,
      _to = timeframe === '1m' ? _recentDate + 60 * 1000 * 5 : _recentDate;

  return _from === fromDate && _to === toDate ? xExtends : fromDate = _from, toDate = _to, xExtends = [_from, _to];
};

exports.crExtends = crExtends;
//# sourceMappingURL=chartFns.js.map