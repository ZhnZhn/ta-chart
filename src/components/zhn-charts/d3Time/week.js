import { timeInterval } from './interval';
import {
  durationMinute,
  durationWeek
} from './duration';

const _timeWeekday = (i) => timeInterval(
  (date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  },
  (date, step) => { date.setDate(date.getDate() + step * 7); },
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek
);

export const timeSunday = _timeWeekday(0);
export const timeMonday = _timeWeekday(1);
export const timeThursday = _timeWeekday(4);

const _utcWeekday = (i) => timeInterval(
  (date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  },
  (date, step) => { date.setUTCDate(date.getUTCDate() + step * 7); },
  (start, end) => (end - start) / durationWeek
);

export const utcSunday = _utcWeekday(0);
