import {
  timeYear,
  timeMonth,
  timeWeek,
  timeDay,
  timeHour,
  timeMinute,
  timeSecond,
  timeTicks,
  timeTickInterval
} from '../d3Time';
import { timeFormat } from '../d3TimeFormat';

import { continuous, copy } from './continuous';
import { initRange } from './init';
import nice from './nice';

const arrayFrom = Array.from
, crDate = (t) => new Date(t)
, crDateMls = (t) => t instanceof Date
    ? +t
    : +new Date(+t);


export function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  let scale = continuous()
  , invert = scale.invert
  , domain = scale.domain;

  const formatMillisecond = format(".%L")
  , formatSecond = format(":%S")
  , formatMinute = format("%I:%M")
  , formatHour = format("%I %p")
  , formatDay = format("%a %d")
  , formatWeek = format("%b %d")
  , formatMonth = format("%B")
  , formatYear = format("%Y")

  , tickFormat = (date) => (second(date) < date ? formatMillisecond
     : minute(date) < date ? formatSecond
     : hour(date) < date ? formatMinute
     : day(date) < date ? formatHour
     : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
     : year(date) < date ? formatMonth
     : formatYear)(date);

  scale.invert = (y) => new Date(invert(y));

  scale.domain = (..._args) => _args.length
    ? domain(arrayFrom(_args[0], crDateMls))
    : domain().map(crDate);

  scale.ticks = (interval) => {
    let d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = (
    count,
    specifier
  ) => specifier == null
    ? tickFormat
    : format(specifier);

  scale.nice = (interval) => {
    let d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval
      ? domain(nice(d, interval))
      : scale;
  };

  scale.copy = () => copy(
    scale,
    calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format)
  );

  return scale;
}

export default function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeWeek, timeDay, timeHour, timeMinute, timeSecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}
