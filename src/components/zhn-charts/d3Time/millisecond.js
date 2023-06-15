import { timeInterval } from './interval';

const mathFloor = Math.floor;

export const millisecond = timeInterval(
  () => {},
  (date, step) => { date.setTime(+date + step); },
  (start, end) => end - start
);

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = mathFloor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval(
    (date) => { date.setTime(mathFloor(date / k) * k); },
    (date, step) => { date.setTime(+date + step * k); },
    (start, end) => (end - start) / k
  );
};
