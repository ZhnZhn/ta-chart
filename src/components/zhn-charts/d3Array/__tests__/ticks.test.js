import { ticks } from '../index';

describe('d3Array ticks', () => {
  it("ticks(start, stop, count) returns the empty array if any argument is NaN", () => {
    expect(ticks(NaN, 1, 1)).toEqual([]);
    expect(ticks(0, NaN, 1)).toEqual([]);
    expect(ticks(0, 1, NaN)).toEqual([]);
    expect(ticks(NaN, NaN, 1)).toEqual([]);
    expect(ticks(0, NaN, NaN)).toEqual([]);
    expect(ticks(NaN, 1, NaN)).toEqual([]);
    expect(ticks(NaN, NaN, NaN)).toEqual([]);
  });

  it("ticks(start, stop, count) returns the empty array if start === stop and count is non-positive", () => {
    expect(ticks(1, 1, -1)).toEqual([]);
    expect(ticks(1, 1, 0)).toEqual([]);
    expect(ticks(1, 1, NaN)).toEqual([]);
  });

  it("ticks(start, stop, count) returns the empty array if start === stop and count is positive", () => {
    expect(ticks(1, 1, 1)).toEqual([1]);
    expect(ticks(1, 1, 10)).toEqual([1]);
  });

  it("ticks(start, stop, count) returns the empty array if count is not positive", () => {
    expect(ticks(0, 1, 0)).toEqual([]);
    expect(ticks(0, 1, -1)).toEqual([]);
    expect(ticks(0, 1, NaN)).toEqual([]);
  });

  it("ticks(start, stop, count) returns the empty array if count is infinity", () => {
    expect(ticks(0, 1, Infinity)).toEqual([]);
  });

  it("ticks(start, stop, count) does not include negative zero", () => {
    expect(1 / ticks(-1, 0, 5).pop()).toEqual(Infinity);
  });

  it("ticks(start, stop, count) remains within the domain", () => {
    expect(ticks(0, 2.2, 3)).toEqual([0, 1, 2]);
  });

  it("ticks(start, stop, count) returns approximately count + 1 ticks when start < stop", () => {
    expect(ticks(  0,  1, 10)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(ticks(  0,  1,  9)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(ticks(  0,  1,  8)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(ticks(  0,  1,  7)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(ticks(  0,  1,  6)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(ticks(  0,  1,  5)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(ticks(  0,  1,  4)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(ticks(  0,  1,  3)).toEqual([0.0,                     0.5,                     1.0]);
    expect(ticks(  0,  1,  2)).toEqual([0.0,                     0.5,                     1.0]);
    expect(ticks(  0,  1,  1)).toEqual([0.0,                                              1.0]);
    expect(ticks(  0, 10, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(ticks(  0, 10,  9)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(ticks(  0, 10,  8)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(ticks(  0, 10,  7)).toEqual([0,    2,    4,    6,    8,    10]);
    expect(ticks(  0, 10,  6)).toEqual([0,    2,    4,    6,    8,    10]);
    expect(ticks(  0, 10,  5)).toEqual([0,    2,    4,    6,    8,    10]);
    expect(ticks(  0, 10,  4)).toEqual([0,    2,    4,    6,    8,    10]);
    expect(ticks(  0, 10,  3)).toEqual([0,             5,             10]);
    expect(ticks(  0, 10,  2)).toEqual([0,             5,             10]);
    expect(ticks(  0, 10,  1)).toEqual([0,                            10]);
    expect(ticks(-10, 10, 10)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
    expect(ticks(-10, 10,  9)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
    expect(ticks(-10, 10,  8)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
    expect(ticks(-10, 10,  7)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
    expect(ticks(-10, 10,  6)).toEqual([-10,       -5,       0,      5,     10]);
    expect(ticks(-10, 10,  5)).toEqual([-10,       -5,       0,      5,     10]);
    expect(ticks(-10, 10,  4)).toEqual([-10,       -5,       0,      5,     10]);
    expect(ticks(-10, 10,  3)).toEqual([-10,       -5,       0,      5,     10]);
    expect(ticks(-10, 10,  2)).toEqual([-10,                 0,             10]);
    expect(ticks(-10, 10,  1)).toEqual([                     0,               ]);
  });

  it("ticks(start, stop, count) returns the reverse of ticks(stop, start, count)", () => {
    expect(ticks( 1,   0, 10)).toEqual(ticks(  0,  1, 10).reverse());
    expect(ticks( 1,   0,  9)).toEqual(ticks(  0,  1,  9).reverse());
    expect(ticks( 1,   0,  8)).toEqual(ticks(  0,  1,  8).reverse());
    expect(ticks( 1,   0,  7)).toEqual(ticks(  0,  1,  7).reverse());
    expect(ticks( 1,   0,  6)).toEqual(ticks(  0,  1,  6).reverse());
    expect(ticks( 1,   0,  5)).toEqual(ticks(  0,  1,  5).reverse());
    expect(ticks( 1,   0,  4)).toEqual(ticks(  0,  1,  4).reverse());
    expect(ticks( 1,   0,  3)).toEqual(ticks(  0,  1,  3).reverse());
    expect(ticks( 1,   0,  2)).toEqual(ticks(  0,  1,  2).reverse());
    expect(ticks( 1,   0,  1)).toEqual(ticks(  0,  1,  1).reverse());
    expect(ticks(10,   0, 10)).toEqual(ticks(  0, 10, 10).reverse());
    expect(ticks(10,   0,  9)).toEqual(ticks(  0, 10,  9).reverse());
    expect(ticks(10,   0,  8)).toEqual(ticks(  0, 10,  8).reverse());
    expect(ticks(10,   0,  7)).toEqual(ticks(  0, 10,  7).reverse());
    expect(ticks(10,   0,  6)).toEqual(ticks(  0, 10,  6).reverse());
    expect(ticks(10,   0,  5)).toEqual(ticks(  0, 10,  5).reverse());
    expect(ticks(10,   0,  4)).toEqual(ticks(  0, 10,  4).reverse());
    expect(ticks(10,   0,  3)).toEqual(ticks(  0, 10,  3).reverse());
    expect(ticks(10,   0,  2)).toEqual(ticks(  0, 10,  2).reverse());
    expect(ticks(10,   0,  1)).toEqual(ticks(  0, 10,  1).reverse());
    expect(ticks(10, -10, 10)).toEqual(ticks(-10, 10, 10).reverse());
    expect(ticks(10, -10,  9)).toEqual(ticks(-10, 10,  9).reverse());
    expect(ticks(10, -10,  8)).toEqual(ticks(-10, 10,  8).reverse());
    expect(ticks(10, -10,  7)).toEqual(ticks(-10, 10,  7).reverse());
    expect(ticks(10, -10,  6)).toEqual(ticks(-10, 10,  6).reverse());
    expect(ticks(10, -10,  5)).toEqual(ticks(-10, 10,  5).reverse());
    expect(ticks(10, -10,  4)).toEqual(ticks(-10, 10,  4).reverse());
    expect(ticks(10, -10,  3)).toEqual(ticks(-10, 10,  3).reverse());
    expect(ticks(10, -10,  2)).toEqual(ticks(-10, 10,  2).reverse());
    expect(ticks(10, -10,  1)).toEqual(ticks(-10, 10,  1).reverse());
  });

  it("ticks(start, stop, count) handles precision problems", () => {
    expect(ticks(0.98, 1.14, 10)).toEqual([0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14]);
  });

  it("ticks(start, stop, count) tries to return at least one tick if count >= 0.5", () => {
    expect(ticks(1, 364, 0.1)).toEqual([]);
    expect(ticks(1, 364, 0.499)).toEqual([]);
    expect(ticks(1, 364, 0.5)).toEqual([200]);
    expect(ticks(1, 364, 1)).toEqual([200]);
    expect(ticks(1, 364, 1.5)).toEqual([200]);
    expect(ticks(1, 499, 1)).toEqual([200, 400]);
    expect(ticks(364, 1, 0.5)).toEqual([200]);
    expect(ticks(0.001, 0.364, 0.5)).toEqual([0.2]);
    expect(ticks(0.364, 0.001, 0.5)).toEqual([0.2]);
    expect(ticks(-1, -364, 0.5)).toEqual([-200]);
    expect(ticks(-364, -1, 0.5)).toEqual([-200]);
    expect(ticks(-0.001, -0.364, 0.5)).toEqual([-0.2]);
    expect(ticks(-0.364, -0.001, 0.5)).toEqual([-0.2]);
  });
})
