export const extent = (
  values,
  valueOf
) => {
  let n = values.length
  , i = -1
  , value
  , min
  , max;
  // Find the first comparable value.
  if (valueOf == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  } else {
    // Find the first comparable value.
    while (++i < n) {
      if ((value = valueOf(values[i], i, values)) != null && value >= value) {
        min = max = value;
        // Compare the remaining values.
        while (++i < n) {
          if ((value = valueOf(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}
