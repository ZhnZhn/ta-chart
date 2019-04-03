"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Scale = require("d3-scale");

var _d3Time = require("d3-time");

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _timeIntervalBarWidth = require("./utils/timeIntervalBarWidth");

var _timeIntervalBarWidth2 = _interopRequireDefault(_timeIntervalBarWidth);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var crTimeFormat = function crTimeFormat(timeframe) {
  return _isStr(timeframe) && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h')) ? (0, _d3TimeFormat.timeFormat)('%m-%d %H:%M') : (0, _d3TimeFormat.timeFormat)("%Y-%m-%d");
};

var chartFns = {
  C: _config2.default,
  timeIntervalBarWidth: _timeIntervalBarWidth2.default,

  scaleTime: _d3Scale.scaleTime,

  crTimeInterval: crTimeInterval,
  crTimeFormat: crTimeFormat,
  utcMinute: _d3Time.utcMinute,
  utcHour: _d3Time.utcHour,
  utcDay: _d3Time.utcDay,

  format: _d3Format.format,
  timeFormat: _d3TimeFormat.timeFormat
};

exports.default = chartFns;
//# sourceMappingURL=chartFns.js.map