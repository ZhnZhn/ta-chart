import {
  bisector,
  tickStep
} from '../d3Array';

import {
  durationDay,
  durationHour,
  durationMinute,
  durationMonth,
  durationSecond,
  durationWeek,
  durationYear
} from './duration';
import { millisecond } from './millisecond';
import { second } from './second';
import { timeMinute } from './minute';
import { timeHour } from './hour';
import { timeDay } from './day';
import { timeSunday } from './week';
import { timeMonth } from './month';
import { timeYear } from './year';

const mathAbs = Math.abs
, mathMax = Math.max
, ticker = (
  year,
  month,
  week,
  day,
  hour,
  minute
) => {
  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ]
  , ticks = (
    start,
    stop,
    count
  ) => {
    const _isReverse = stop < start;
    if (_isReverse) [start, stop] = [stop, start];

    const interval = count && typeof count.range === "function"
      ? count
      : tickInterval(start, stop, count)
    , ticks = interval
      ? interval.range(start, +stop + 1)
      : [];
    return _isReverse
      ? ticks.reverse()
      : ticks;
  }
  , tickInterval = (
    start,
    stop,
    count
  ) => {
    const target = mathAbs(stop - start) / count
    , i = bisector(([,,step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(mathMax(tickStep(start, stop, count), 1));
    const [
      t,
      step
    ] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [
    ticks,
    tickInterval
  ];
}

const [
  timeTicks,
  timeTickInterval
] = ticker(
  timeYear,
  timeMonth,
  timeSunday,
  timeDay,
  timeHour,
  timeMinute
);

export {
  timeTicks,
  timeTickInterval
};
