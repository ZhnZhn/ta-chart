import { timeInterval } from './interval';
import {
  durationMinute,
  durationSecond
} from './duration';

export const timeMinute = timeInterval(
  (date) => { date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond); },
  (date, step) => { date.setTime(+date + step * durationMinute); },
  (start, end) => (end - start) / durationMinute,
  (date) => date.getMinutes()
);

export const utcMinute = timeInterval(
  (date) => { date.setUTCSeconds(0, 0); },
  (date, step) => { date.setTime(+date + step * durationMinute); },
  (start, end) => (end - start) / durationMinute,
  (date) => date.getUTCMinutes()
);
