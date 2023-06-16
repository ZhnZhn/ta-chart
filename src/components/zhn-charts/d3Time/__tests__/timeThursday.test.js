import { timeThursday } from '../index';
import { local } from './helperFn.test';

describe('d3Time timeThursday', () => {
  it("timeThursday.floor(date) returns Thursdays", () => {
    expect(timeThursday.floor(local(2011,  0,  4, 23, 59, 59))).toEqual(local(2010, 11, 30));
    expect(timeThursday.floor(local(2011,  0,  5,  0,  0,  0))).toEqual(local(2010, 11, 30));
    expect(timeThursday.floor(local(2011,  0,  5,  0,  0,  1))).toEqual(local(2010, 11, 30));
    expect(timeThursday.floor(local(2011,  0,  5, 23, 59, 59))).toEqual(local(2010, 11, 30));
    expect(timeThursday.floor(local(2011,  0,  6,  0,  0,  0))).toEqual(local(2011,  0,  6));
    expect(timeThursday.floor(local(2011,  0,  6,  0,  0,  1))).toEqual(local(2011,  0,  6));
  });

  it("timeThursday.count(start, end) counts Thursdays after start (exclusive) and before end (inclusive)", () => {
    //       January 2012
    // Su Mo Tu We Th Fr Sa
    //  1  2  3  4  5  6  7
    //  8  9 10 11 12 13 14
    // 15 16 17 18 19 20 21
    // 22 23 24 25 26 27 28
    // 29 30 31
    expect(timeThursday.count(local(2012,  0,  1), local(2012,  0,  4))).toBe(0);
    expect(timeThursday.count(local(2012,  0,  1), local(2012,  0,  5))).toBe(1);
    expect(timeThursday.count(local(2012,  0,  1), local(2012,  0,  6))).toBe(1);
    expect(timeThursday.count(local(2012,  0,  1), local(2012,  0, 12))).toBe(2);

    //     January 2015
    // Su Mo Tu We Th Fr Sa
    //              1  2  3
    //  4  5  6  7  8  9 10
    // 11 12 13 14 15 16 17
    // 18 19 20 21 22 23 24
    // 25 26 27 28 29 30 31
    expect(timeThursday.count(local(2015,  0,  1), local(2015,  0,  7))).toBe(0);
    expect(timeThursday.count(local(2015,  0,  1), local(2015,  0,  8))).toBe(1);
    expect(timeThursday.count(local(2015,  0,  1), local(2015,  0,  9))).toBe(1);
  });

  it("timeThursday.count(start, end) observes daylight saving", () => {
    expect(timeThursday.count(local(2011,  0,  1), local(2011,  2, 13,  1))).toBe(10);
    expect(timeThursday.count(local(2011,  0,  1), local(2011,  2, 13,  3))).toBe(10);
    expect(timeThursday.count(local(2011,  0,  1), local(2011,  2, 13,  4))).toBe(10);
    expect(timeThursday.count(local(2011,  0,  1), local(2011, 10,  6,  0))).toBe(44);
    expect(timeThursday.count(local(2011,  0,  1), local(2011, 10,  6,  1))).toBe(44);
    expect(timeThursday.count(local(2011,  0,  1), local(2011, 10,  6,  2))).toBe(44);
  });
})
