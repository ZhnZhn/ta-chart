const t0 = new Date
, t1 = new Date
, mathFloor = Math.floor;

export const timeInterval = (
  floori,
  offseti,
  count,
  field
) => {

  const interval = (date) => (
    floori(date = date === void 0 ? new Date : new Date(+date)),
    date
  );

  interval.floor = (
    date
  ) => (
    floori(date = new Date(+date)),
    date
  );

  interval.ceil = (
    date
  ) => (
    floori(date = new Date(date - 1)),
    offseti(date, 1),
    floori(date),
    date
  );

  interval.round = (date) => {
    const d0 = interval(date)
    , d1 = interval.ceil(date);
    return date - d0 < d1 - date
      ? d0
      : d1;
  };

  interval.offset = (
    date,
    step
  ) => (
    offseti(date = new Date(+date),
    step == null ? 1 : mathFloor(step)),
    date
  );

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : mathFloor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do {
      range.push(previous = new Date(+start));
      offseti(start, step);
      floori(start);
    } while (previous < start && start < stop);
    return range;
  };

  interval.filter = (
    test
  ) => timeInterval(
     (date) => {
       if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
     },
     (date, step) => {
       if (date >= date) {
         if (step < 0) while (++step <= 0) {
           while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
         } else while (--step >= 0) {
           while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
         }
       }
     }
  );

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start);
      t1.setTime(+end);
      floori(t0);
      floori(t1);
      return mathFloor(count(t0, t1));
    };

    interval.every = (step) => {
      step = mathFloor(step);
      return !isFinite(step) || !(step > 0)
        ? null
        : !(step > 1)
           ? interval
           : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}
