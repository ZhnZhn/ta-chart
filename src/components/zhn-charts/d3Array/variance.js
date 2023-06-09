import { number } from './number';

export const variance = (
  values,
  valueOf
) => {
  let n = values.length
  , m = 0
  , i = -1
  , mean = 0
  , value
  , delta
  , sum = 0;

  if (valueOf == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = number(valueOf(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
}
