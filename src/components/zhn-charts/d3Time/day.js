import { timeInterval } from './interval';
import {
  durationDay,
  durationMinute
} from './duration';

export const timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

export const utcDay = timeInterval(
  (date) => { date.setUTCHours(0, 0, 0, 0); },
  (date, step) => { date.setUTCDate(date.getUTCDate() + step); },
  (start, end) => (end - start) / durationDay,
  (date) => date.getUTCDate() - 1
);
