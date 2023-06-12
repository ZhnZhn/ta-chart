"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.timeIntervalBarWidth = exports.scaleTime = exports.numberFormat8Trim = exports.numberFormat4S = exports.numberFormat4F = exports.numberFormat2F = exports.numberFormat0S = exports.crTimeInterval = exports.crTimeFormat = exports.crExtends = exports.COLOR = void 0;
var _d3Scale = require("../zhn-charts/d3Scale");
exports.scaleTime = _d3Scale.scaleTime;
var _d3Time = require("d3-time");
exports.utcMinute = _d3Time.utcMinute;
exports.utcHour = _d3Time.utcHour;
exports.utcDay = _d3Time.utcDay;
var _d3TimeFormat = require("d3-time-format");
exports.timeFormat = _d3TimeFormat.timeFormat;
var _timeIntervalBarWidth = _interopRequireDefault(require("./utils/timeIntervalBarWidth"));
exports.timeIntervalBarWidth = _timeIntervalBarWidth.default;
var _config = _interopRequireDefault(require("./config"));
exports.COLOR = _config.default;
var _d3Format = require("d3-format");
const _isStr = str => typeof str === 'string';
const _isInclude = (str, ch) => str.indexOf(ch) !== -1;
const numberFormat8Trim = (0, _d3Format.format)('.8~');
exports.numberFormat8Trim = numberFormat8Trim;
const numberFormat4F = (0, _d3Format.format)('.4f');
exports.numberFormat4F = numberFormat4F;
const numberFormat2F = (0, _d3Format.format)('.2f');
exports.numberFormat2F = numberFormat2F;
const numberFormat4S = (0, _d3Format.format)('.4s');
exports.numberFormat4S = numberFormat4S;
const numberFormat0S = (0, _d3Format.format)('.0s');
exports.numberFormat0S = numberFormat0S;
const crTimeInterval = timeframe => {
  if (!timeframe || !_isStr(timeframe)) {
    return _d3Time.utcDay;
  }
  const _n = parseInt(timeframe, 10);
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
const crTimeFormat = timeframe => _isStr(timeframe) && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h')) ? (0, _d3TimeFormat.timeFormat)('%m-%d %H:%M') : (0, _d3TimeFormat.timeFormat)("%Y-%m-%d");
exports.crTimeFormat = crTimeFormat;
let fromDate,
  toDate,
  xExtends = [];
const crExtends = (data, timeframe, itemsNum) => {
  const _max = data.length - 1,
    _from = _max < itemsNum ? (data[0] || {}).date : (data[_max - itemsNum] || {}).date,
    _recentDate = (data.slice(-1)[0] || {}).date,
    _to = timeframe === '1m' ? _recentDate + 60 * 1000 * 5 : _recentDate;
  return _from === fromDate && _to === toDate ? xExtends : fromDate = _from, toDate = _to, xExtends = [_from, _to];
};
exports.crExtends = crExtends;
//# sourceMappingURL=chartFns.js.map