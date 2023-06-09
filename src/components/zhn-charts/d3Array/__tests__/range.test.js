import { range } from '../index';

describe('d3Array range', () => {
  it("range(stop) returns [0, 1, 2, … stop - 1]", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(2.01)).toEqual([0, 1, 2]);
    expect(range(1)).toEqual([0]);
    expect(range(.5)).toEqual([0]);
  });

  it("range(stop) returns an empty array if stop <= 0", () => {
    expect(range(0)).toEqual([]);
    expect(range(-0.5)).toEqual([]);
    expect(range(-1)).toEqual([]);
  });

  it("range(stop) returns an empty array if stop is NaN", () => {
    expect(range(NaN)).toEqual([]);
    expect(range()).toEqual([]);
  });

  it("range(start, stop) returns [start, start + 1, … stop - 1]", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(2, 5)).toEqual([2, 3, 4]);
    expect(range(2.5, 5)).toEqual([2.5, 3.5, 4.5]);
    expect(range(-1, 3)).toEqual([-1, 0, 1, 2]);
  });

  it("range(start, stop) returns an empty array if start or stop is NaN", () => {
    expect(range(0, NaN)).toEqual([]);
    expect(range(1, NaN)).toEqual([]);
    expect(range(-1, NaN)).toEqual([]);
    expect(range(0, undefined)).toEqual([]);
    expect(range(1, undefined)).toEqual([]);
    expect(range(-1, undefined)).toEqual([]);
    expect(range(NaN, 0)).toEqual([]);
    expect(range(NaN, 1)).toEqual([]);
    expect(range(NaN, -1)).toEqual([]);
    expect(range(undefined, 0)).toEqual([]);
    expect(range(undefined, 1)).toEqual([]);
    expect(range(undefined, -1)).toEqual([]);
    expect(range(NaN, NaN)).toEqual([]);
    expect(range(undefined, undefined)).toEqual([]);
  });

  it("range(start, stop) returns an empty array if start >= stop", () => {
    expect(range(0, 0)).toEqual([]);
    expect(range(5, 5)).toEqual([]);
    expect(range(6, 5)).toEqual([]);
    expect(range(10, 10)).toEqual([]);
    expect(range(20, 10)).toEqual([]);
  });

  it("range(start, stop, step) returns [start, start + step, start + 2 * step, … stop - step]", () => {
    expect(range(0, 5, 1)).toEqual([0, 1, 2, 3, 4]);
    expect(range(0, 5, 2)).toEqual([0, 2, 4]);
    expect(range(2, 5, 2)).toEqual([2, 4]);
    expect(range(-1, 3, 2)).toEqual([-1, 1]);
  });

  it("range(start, stop, step) allows a negative step", () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
    expect(range(5, 0, -2)).toEqual([5, 3, 1]);
    expect(range(5, 2, -2)).toEqual([5, 3]);
    expect(range(3, -1, -2)).toEqual([3, 1]);
  });

  it("range(start, stop, step) returns an empty array if start >= stop and step > 0", () => {
    expect(range(5, 5, 2)).toEqual([]);
    expect(range(6, 5, 2)).toEqual([]);
    expect(range(10, 10, 1)).toEqual([]);
    expect(range(10, 10, 0.5)).toEqual([]);
    expect(range(0, 0, 1)).toEqual([]);
    expect(range(0, 0, 0.5)).toEqual([]);
    expect(range(20, 10, 2)).toEqual([]);
    expect(range(20, 10, 1)).toEqual([]);
    expect(range(20, 10, 0.5)).toEqual([]);
  });

  it("range(start, stop, step) returns an empty array if start >= stop and step < 0", () => {
    expect(range(5, 5, -2)).toEqual([]);
    expect(range(5, 6, -2)).toEqual([]);
    expect(range(10, 10, -1)).toEqual([]);
    expect(range(10, 10, -0.5)).toEqual([]);
    expect(range(0, 0, -1)).toEqual([]);
    expect(range(0, 0, -0.5)).toEqual([]);
    expect(range(10, 20, -2)).toEqual([]);
    expect(range(10, 20, -1)).toEqual([]);
    expect(range(10, 20, -0.5)).toEqual([]);
  });

  it("range(start, stop, step) returns an empty array if start, stop or step is NaN", () => {
    expect(range(NaN, 3, 2)).toEqual([]);
    expect(range(3, NaN, 2)).toEqual([]);
    expect(range(0, 5, NaN)).toEqual([]);
    expect(range(NaN, NaN, NaN)).toEqual([]);
    expect(range(NaN, NaN, NaN)).toEqual([]);
    expect(range(undefined, undefined, undefined)).toEqual([]);
    expect(range(0, 10, NaN)).toEqual([]);
    expect(range(10, 0, NaN)).toEqual([]);
    expect(range(0, 10, undefined)).toEqual([]);
    expect(range(10, 0, undefined)).toEqual([]);
  });

  it("range(start, stop, step) returns an empty array if step is zero", () => {
    expect(range(0, 5, 0)).toEqual([]);
  });

  it("range(start, stop, step) returns exactly [start + step * i, …] for fractional steps", () => {
    expect(range(0, 0.5, 0.1)).toEqual([0 + 0.1 * 0, 0 + 0.1 * 1, 0 + 0.1 * 2, 0 + 0.1 * 3, 0 + 0.1 * 4]);
    expect(range(0.5, 0, -0.1)).toEqual([0.5 - 0.1 * 0, 0.5 - 0.1 * 1, 0.5 - 0.1 * 2, 0.5 - 0.1 * 3, 0.5 - 0.1 * 4]);
    expect(range(-2, -1.2, 0.1)).toEqual([-2 + 0.1 * 0, -2 + 0.1 * 1, -2 + 0.1 * 2, -2 + 0.1 * 3, -2 + 0.1 * 4, -2 + 0.1 * 5, -2 + 0.1 * 6, -2 + 0.1 * 7]);
    expect(range(-1.2, -2, -0.1)).toEqual([-1.2 - 0.1 * 0, -1.2 - 0.1 * 1, -1.2 - 0.1 * 2, -1.2 - 0.1 * 3, -1.2 - 0.1 * 4, -1.2 - 0.1 * 5, -1.2 - 0.1 * 6, -1.2 - 0.1 * 7]);
  });

  it("range(start, stop, step) returns exactly [start + step * i, …] for very small fractional steps", () => {
    expect(range(2.1e-31, 5e-31, 1.1e-31)).toEqual([2.1e-31 + 1.1e-31 * 0, 2.1e-31 + 1.1e-31 * 1, 2.1e-31 + 1.1e-31 * 2]);
    expect(range(5e-31, 2.1e-31, -1.1e-31)).toEqual([5e-31 - 1.1e-31 * 0, 5e-31 - 1.1e-31 * 1, 5e-31 - 1.1e-31 * 2]);
  });

  it("range(start, stop, step) returns exactly [start + step * i, …] for very large fractional steps", () => {
    expect(range(1e300, 2e300, 0.3e300)).toEqual([1e300 + 0.3e300 * 0, 1e300 + 0.3e300 * 1, 1e300 + 0.3e300 * 2, 1e300 + 0.3e300 * 3]);
    expect(range(2e300, 1e300, -0.3e300)).toEqual([2e300 - 0.3e300 * 0, 2e300 - 0.3e300 * 1, 2e300 - 0.3e300 * 2, 2e300 - 0.3e300 * 3]);
  });
})
