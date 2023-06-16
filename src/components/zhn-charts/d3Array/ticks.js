const mathMax = Math.max
, mathSqrt = Math.sqrt
, mathFloor = Math.floor
, mathPow = Math.pow
, mathLog10 = Math.log10
, mathRound = Math.round;

const e10 = mathSqrt(50)
, e5 = mathSqrt(10)
, e2 = mathSqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / mathMax(0, count)
  , power = mathFloor(mathLog10(step))
  , error = step / mathPow(10, power)
  , factor = error >= e10
     ? 10
     : error >= e5
        ? 5
        : error >= e2
           ? 2
           : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = mathPow(10, -power) / factor;
    i1 = mathRound(start * inc);
    i2 = mathRound(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = mathPow(10, power) * factor;
    i1 = mathRound(start / inc);
    i2 = mathRound(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

export function ticks(start, stop, count) {
  stop = +stop
  start = +start
  count = +count
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse
    ? tickSpec(stop, start, count)
    : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1
  , ticks = new Array(n);
  let i = 0;
  if (reverse) {
    if (inc < 0) for (; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

export function tickIncrement(start, stop, count) {
  stop = +stop
  start = +start
  count = +count
  return tickSpec(start, stop, count)[2];
}

export function tickStep(start, stop, count) {
  stop = +stop
  start = +start
  count = +count;
  const reverse = stop < start, inc = reverse
    ? tickIncrement(stop, start, count)
    : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
