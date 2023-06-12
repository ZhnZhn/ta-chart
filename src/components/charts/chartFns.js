export { scaleTime } from '../zhn-charts/d3Scale';
export {
  utcMinute,
  utcHour,
  utcDay
} from 'd3-time';
export { timeFormat } from 'd3-time-format';

export {default as timeIntervalBarWidth} from './utils/timeIntervalBarWidth';
export {default as COLOR} from './config';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  utcMinute,
  utcHour,
  utcDay,
  utcWeek,
  utcMonth
} from 'd3-time';

const _isStr = str => typeof str === 'string';
const _isInclude = (str, ch) => str.indexOf(ch) !== -1;

export const numberFormat8Trim = format('.8~')
export const numberFormat4F = format('.4f')
export const numberFormat2F = format('.2f')
export const numberFormat4S = format('.4s')
export const numberFormat0S = format('.0s')

export const crTimeInterval = (
  timeframe
) => {
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

export const crTimeFormat = (
  timeframe
) => _isStr(timeframe)
 && (_isInclude(timeframe, 'm') || _isInclude(timeframe, 'h'))
  ? timeFormat('%m-%d %H:%M')
  : timeFormat("%Y-%m-%d");

  let fromDate, toDate, xExtends = [];
  export const crExtends = (
    data,
    timeframe,
    itemsNum
  ) => {
    const _max = data.length - 1
    , _from = _max < itemsNum
         ? (data[0] || {}).date
         : (data[_max-itemsNum] || {}).date
    , _recentDate = (data.slice(-1)[0] || {}).date
    , _to = timeframe === '1m'
        ? _recentDate + 60*1000*5
        : _recentDate ;
    return _from === fromDate && _to === toDate
      ? xExtends
      : fromDate = _from, toDate = _to, (xExtends = [_from, _to]);
  };
