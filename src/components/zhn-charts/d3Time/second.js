import { timeInterval } from './interval';
import { durationSecond } from './duration';

export const second = timeInterval(
  (date) => { date.setTime(date - date.getMilliseconds());},
  (date, step) => { date.setTime(+date + step * durationSecond); },
  (start, end) => (end - start) / durationSecond,
  (date) => date.getUTCSeconds()
);
