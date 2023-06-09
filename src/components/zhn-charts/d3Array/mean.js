import { number } from './number';

export const mean = (
  values,
  valueOf
) => {
  let n = values.length
  , m = n
  , i = -1
  , value
  , sum = 0;

  if (valueOf == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = number(valueOf(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
}
