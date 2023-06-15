const ascending = (
  a,
  b
) => a == null || b == null
  ? NaN
  : a < b
    ? -1
    : a > b
      ? 1
      : a >= b
        ? 0
        : NaN;

/*
function descending(a, b) {
  return a == null || b == null
    ? NaN
    : b < a
      ? -1
      : b > a
        ? 1
        : b >= a
          ? 0
          : NaN;
}
*/

const zero = () => 0;

export const bisector = (f) => {
  let compare1
  , compare2
  , delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We canÔÇÖt do this
  // for a comparator (except for specific, known comparators) because we canÔÇÖt
  // tell if the comparator is symmetric, and an asymmetric comparator canÔÇÖt be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    //compare1 = f === ascending || f === descending ? f : zero;
    compare1 = f === ascending ? f : zero;
    compare2 = f;
    delta = f;
  }

  const left = (a, x, lo = 0, hi = a.length) => {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  };

  const right = (a, x, lo = 0, hi = a.length) => {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  };

  const center = (a, x, lo = 0, hi = a.length) => {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x)
      ? i - 1
      : i;
  }

  return {
    left,
    center,
    right
  };
}

const ascendingBisect = bisector(ascending);
export const bisect = ascendingBisect.right
