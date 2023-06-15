import { timeInterval } from './interval';
import {
  durationHour,
  durationMinute,
  durationSecond
} from './duration';

export const timeHour = timeInterval(
  (date) => { date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute); },
  (date, step) => { date.setTime(+date + step * durationHour); },
  (start, end) => (end - start) / durationHour,
  (date) => date.getHours()
);

export const utcHour = timeInterval(
  (date) => { date.setUTCMinutes(0, 0, 0); },
  (date, step) => { date.setTime(+date + step * durationHour); },
  (start, end) => (end - start) / durationHour,
  (date) => date.getUTCHours()
);
