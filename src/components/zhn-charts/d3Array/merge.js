export const merge = (
  arrays
) => {
  let n = arrays.length
  , m
  , i = -1
  , j = 0
  , merged
  , array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}


/*
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

export const merge = (arrays) => {
  return Array.from(flatten(arrays));
}
*/
