const mathMax = Math.max
, mathCeil = Math.ceil;

export const range = (
  ...args
) => {
  let start = +args[0]
  , stop = +args[1]
  , n = args.length
  , step = n < 2
    ? (stop = start, start = 0, 1)
    : n < 3 ? 1 : +args[2]
  , ranged = new Array(n)
  , i = -1;

  n = mathMax(0, mathCeil((stop - start) / step)) | 0
  while (++i < n) {
    ranged[i] = start + i * step;
  }

  return ranged;
}
