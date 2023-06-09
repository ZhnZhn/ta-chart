export const mean = (
  values,
  valueOf
) => {
  let count = 0
  , sum = 0;
  if (valueOf === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueOf(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
        sum += value;
      }
    }
  }
  if (count) return sum / count;
}
