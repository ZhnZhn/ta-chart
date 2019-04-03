import { scaleTime } from "d3-scale";
import { utcMinute, utcHour, utcDay, utcWeek, utcMonth } from "d3-time";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import timeIntervalBarWidth from './utils/timeIntervalBarWidth'

import config from './config'

const _isStr = str => typeof str === 'string';

const _isInclude = (str, ch) => str.indexOf(ch) !== -1;

const crTimeInterval = (timeframe) => {
  if (!timeframe || !_isStr(timeframe)) {
    return utcDay;
  }
  const _n = parseInt(timeframe, 10);
  if (_isInclude(timeframe, 'm')) {
    return utcMinute.every(_n)
  } else if (_isInclude(timeframe, 'h')) {
    return utcHour.every(_n);
  } else if (_isInclude(timeframe, 'd')) {
    return utcDay.every(_n);
  } else if (_isInclude(timeframe, 'w')) {
    return utcWeek.every(_n);
  } else if (_isInclude(timeframe, 'M')) {
    return utcMonth.every(_n);
  }

  return utcDay;
};

const crTimeFormat = timeframe => _isStr(timeframe)
 && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h'))
  ? timeFormat('%m-%d %H:%M')
  : timeFormat("%Y-%m-%d");
  
const chartFns = {
  C: config,
  timeIntervalBarWidth,

  scaleTime,

  crTimeInterval,
  crTimeFormat,
  utcMinute,
  utcHour,
  utcDay,

  format,
  timeFormat
};

export default chartFns
