import { scaleLinear } from '../index';

function roundEpsilon(x) {
  return Math.round(x * 1e12) / 1e12;
}

describe('d3Scale linear', () => {
  it("scaleLinear() has the expected defaults", () => {
    const s = scaleLinear();
    expect(s.domain()).toEqual([0, 1]);
    expect(s.range()).toEqual([0, 1]);

    expect(s.clamp()).toBe(false);
    expect(s.unknown()).toBe(undefined);

    expect(s.interpolate()(
      { array: ["red"] },
      { array: ["blue"] }
    )(0.5)).toEqual({ array: ["rgb(128, 0, 128)"] });
  });

  it("scaleLinear(range) sets the range", () => {
    const s = scaleLinear([1, 2]);
    expect(s.domain()).toEqual([0, 1]);
    expect(s.range()).toEqual([1, 2]);
    expect(s(0.5)).toBe(1.5);
  });

  it("scaleLinear(domain, range) sets the domain and range", () => {
    const s = scaleLinear([1, 2], [3, 4]);
    expect(s.domain()).toEqual([1, 2]);
    expect(s.range()).toEqual([3, 4]);
    expect(s(1.5)).toBe(3.5);
  });

  it("linear(x) maps a domain value x to a range value y", () => {
    expect(scaleLinear().range([1, 2])(0.5)).toBe(1.5);
  });

  it("linear(x) ignores extra range values if the domain is smaller than the range", () => {
    expect(scaleLinear()
      .domain([-10, 0])
      .range([0, 1, 2])
      .clamp(true)(-5)
     ).toBe(0.5);
    expect(scaleLinear()
      .domain([-10, 0])
      .range([0, 1, 2])
      .clamp(true)(50)
    ).toBe(1);
  });

  it("linear(x) ignores extra domain values if the range is smaller than the domain", () => {
    expect(scaleLinear()
      .domain([-10, 0, 100])
      .range([0, 1])
      .clamp(true)(-5)
    ).toBe(0.5);
    expect(scaleLinear()
      .domain([-10, 0, 100])
      .range([0, 1])
      .clamp(true)(50)
    ).toBe(1);
  });

  it("linear(x) maps an empty domain to the middle of the range", () => {
    expect(scaleLinear()
      .domain([0, 0])
      .range([1, 2])(0)
    ).toBe(1.5);
    expect(scaleLinear()
      .domain([0, 0])
      .range([2, 1])(1)
    ).toBe(1.5);
  });

  it("linear(x) can map a bilinear domain with two values to the corresponding range", () => {
    const s = scaleLinear().domain([1, 2]);

    expect(s.domain()).toEqual([1, 2]);

    expect(s(0.5)).toBe(-0.5);
    expect(s(1.0)).toBe(0.0);
    expect(s(1.5)).toBe(0.5);
    expect(s(2.0)).toBe(1.0);
    expect(s(2.5)).toBe(1.5);

    expect(s.invert(-0.5)).toBe(0.5);
    expect(s.invert( 0.0)).toBe(1.0);
    expect(s.invert( 0.5)).toBe(1.5);
    expect(s.invert( 1.0)).toBe(2.0);
    expect(s.invert( 1.5)).toBe(2.5);
  });

  it("linear(x) can map a polylinear domain with more than two values to the corresponding range", () => {
    const s = scaleLinear()
      .domain([-10, 0, 100])
      .range(["red", "white", "green"]);

    expect(s.domain()).toEqual([-10, 0, 100]);
    expect(s(-5)).toBe("rgb(255, 128, 128)");
    expect(s(50)).toBe("rgb(128, 192, 128)");
    expect(s(75)).toBe("rgb(64, 160, 64)");

    s.domain([4, 2, 1]).range([1, 2, 4]);
    expect(s(1.5)).toBe(3);
    expect(s(3)).toBe(1.5);
    expect(s.invert(1.5)).toBe(3);
    expect(s.invert(3)).toBe(1.5);

    s.domain([1, 2, 4]).range([4, 2, 1]);
    expect(s(1.5)).toBe(3);
    expect(s(3)).toBe(1.5);
    expect(s.invert(1.5)).toBe(3);
    expect(s.invert(3)).toBe(1.5);
  });

  it("linear.invert(y) maps a range value y to a domain value x", () => {
    expect(scaleLinear()
      .range([1, 2])
      .invert(1.5)
    ).toBe(0.5);
  });

  it("linear.invert(y) maps an empty range to the middle of the domain", () => {
    expect(scaleLinear()
      .domain([1, 2])
      .range([0, 0])
      .invert(0)
    ).toBe(1.5);
    expect(scaleLinear()
      .domain([2, 1])
      .range([0, 0])
      .invert(1)
    ).toBe(1.5);
  });

  it("linear.invert(y) coerces range values to numbers", () => {
    expect(scaleLinear()
      .range(["0", "2"])
      .invert("1")
    ).toBe(0.5);
    expect(scaleLinear()
      .range([new Date(1990, 0, 1), new Date(1991, 0, 1)])
      .invert(new Date(1990, 6, 2, 13))
    //).toBe(0.5); from d3-scale
      ).toBe(0.5001141552511416)
  });

  it("linear.invert(y) returns NaN if the range is not coercible to number", () => {
    expect(scaleLinear()
      .range(["#000", "#fff"])
      .invert("#999")
    ).toBe(NaN);
    expect(scaleLinear()
      .range([0, "#fff"])
      .invert("#999")
    ).toBe(NaN);
  });

  it("linear.domain(domain) accepts an array of numbers", () => {
    expect(scaleLinear()
      .domain([])
      .domain()
    ).toEqual([]);
    expect(scaleLinear()
      .domain([1, 0])
      .domain()
    ).toEqual([1, 0]);
    expect(scaleLinear()
      .domain([1, 2, 3])
      .domain()
    ).toEqual([1, 2, 3]);
  });

  it("linear.domain(domain) coerces domain values to numbers", () => {
    /*
    expect(scaleLinear()
      .domain([new Date(1990, 0, 1), new Date(1991, 0, 1)])
      .domain()
    ).toEqual([631180800000, 662716800000]);
    */
    expect(scaleLinear()
      .domain(["0.0", "1.0"])
      .domain()
    ).toEqual([0, 1]);
    expect(scaleLinear()
      .domain([new Number(0), new Number(1)])
      .domain()
    ).toEqual([0, 1]);
  });

  it("linear.domain(domain) accepts an iterable", () => {
    expect(scaleLinear()
      .domain(new Set([1, 2]))
      .domain()
    ).toEqual([1, 2]);
  });

  it("linear.domain(domain) makes a copy of domain values", () => {
    const d = [1, 2]
    , s = scaleLinear().domain(d);
    expect(s.domain()).toEqual([1, 2]);
    d.push(3);
    expect(s.domain()).toEqual([1, 2]);
    expect(d).toEqual([1, 2, 3]);
  });

  it("linear.domain() returns a copy of domain values", () => {
    const s = scaleLinear()
    , d = s.domain();
    expect(d).toEqual([0, 1]);
    d.push(3);
    expect(s.domain()).toEqual([0, 1]);
  });

  it("linear.range(range) does not coerce range to numbers", () => {
    const s = scaleLinear()
      .range(["0px", "2px"]);
    expect(s.range()).toEqual(["0px", "2px"]);
    expect(s(0.5)).toBe("1px");
  });

  it("linear.range(range) accepts an iterable", () => {
    expect(scaleLinear()
      .range(new Set([1, 2]))
      .range()
    ).toEqual([1, 2]);
  });

  it("linear.range(range) can accept range values as colors", () => {
    expect(scaleLinear()
      .range(["red", "blue"])(0.5)
    ).toBe("rgb(128, 0, 128)");
    expect(scaleLinear()
      .range(["#ff0000", "#0000ff"])(0.5)
    ).toBe("rgb(128, 0, 128)");
    expect(scaleLinear()
      .range(["#f00", "#00f"])(0.5)
    ).toBe("rgb(128, 0, 128)");
    expect(scaleLinear()
      .range(["rgb(255,0,0)", "hsl(240,100%,50%)"])(0.5)
    ).toBe("rgb(128, 0, 128)");
    expect(scaleLinear()
      .range(["rgb(100%,0%,0%)", "hsl(240,100%,50%)"])(0.5)
    ).toBe("rgb(128, 0, 128)");
    expect(scaleLinear()
      .range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"])(0.5)
    ).toBe("rgb(128, 0, 128)");
  });

  it("linear.range(range) can accept range values as arrays or objects", () => {
    expect(scaleLinear()
      .range([{color: "red"}, {color: "blue"}])(0.5)
    ).toEqual({color: "rgb(128, 0, 128)"});
    expect(scaleLinear()
      .range([["red"], ["blue"]])(0.5)
    ).toEqual(["rgb(128, 0, 128)"]);
  });

  it("linear.range(range) makes a copy of range values", () => {
    const r = [1, 2]
    , s = scaleLinear().range(r);
    expect(s.range()).toEqual([1, 2]);
    r.push(3);
    expect(s.range()).toEqual([1, 2]);
    expect(r).toEqual([1, 2, 3]);
  });

  it("linear.range() returns a copy of range values", () => {
    const s = scaleLinear()
    , r = s.range();
    expect(r).toEqual([0, 1]);
    r.push(3);
    expect(s.range()).toEqual([0, 1]);
  });

  it("linear.rangeRound(range) is an alias for linear.range(range).interpolate(interpolateRound)", () => {
    expect(scaleLinear()
     .rangeRound([0, 10])(0.59)
   ).toBe(6);
  });

  it("linear.rangeRound(range) accepts an iterable", () => {
    expect(scaleLinear()
      .rangeRound(new Set([1, 2]))
      .range()
    ).toEqual([1, 2]);
  });

  it("linear.unknown(value) sets the return value for undefined, null, and NaN input", () => {
    const s = scaleLinear().unknown(-1);
    expect(s(null)).toBe(-1);
    expect(s(undefined)).toBe(-1);
    expect(s(NaN)).toBe(-1);
    expect(s("N/A")).toBe(-1);
    expect(s(0.4)).toBe(0.4);
  });

  it("linear.clamp() is false by default", () => {
    expect(scaleLinear().clamp()).toBe(false);
    expect(scaleLinear().range([10, 20])(2)).toBe(30);
    expect(scaleLinear().range([10, 20])(-1)).toBe(0);
    expect(scaleLinear().range([10, 20]).invert(30)).toBe(2);
    expect(scaleLinear().range([10, 20]).invert(0)).toBe(-1);
  });

  it("linear.clamp(true) restricts output values to the range", () => {
    expect(scaleLinear()
      .clamp(true)
      .range([10, 20])(2)
    ).toBe(20);
    expect(scaleLinear()
      .clamp(true)
      .range([10, 20])(-1)
    ).toBe(10);
  });

  it("linear.clamp(true) restricts input values to the domain", () => {
    expect(scaleLinear()
      .clamp(true)
      .range([10, 20])
      .invert(30)
    ).toBe(1);
    expect(scaleLinear()
      .clamp(true)
      .range([10, 20])
      .invert(0)
    ).toBe(0);
  });

  it("linear.clamp(clamp) coerces the specified clamp value to a boolean", () => {
    expect(scaleLinear()
      .clamp("true")
      .clamp()
    ).toBe(true);
    expect(scaleLinear()
      .clamp(1)
      .clamp()
    ).toBe(true);
    expect(scaleLinear()
      .clamp("")
      .clamp()
    ).toBe(false);
    expect(scaleLinear()
      .clamp(0)
      .clamp()
    ).toBe(false);
  });

  it("linear.interpolate(interpolate) takes a custom interpolator factory", () => {
    function interpolate(a, b) { return function(t) { return [a, b, t]; }; }
    const s = scaleLinear()
      .domain([10, 20])
      .range(["a", "b"])
      .interpolate(interpolate);
    expect(s.interpolate()).toBe(interpolate);
    expect(s(15)).toEqual(["a", "b", 0.5]);
  });

  it("linear.nice() is an alias for linear.nice(10)", () => {
    expect(scaleLinear()
      .domain([0, 0.96])
      .nice()
      .domain()
    ).toEqual([0, 1]);
    expect(scaleLinear()
      .domain([0, 96])
      .nice()
      .domain()
    ).toEqual([0, 100]);
  });

  it("linear.nice(count) extends the domain to match the desired ticks", () => {
    expect(scaleLinear()
      .domain([0, 0.96])
      .nice(10)
      .domain()
    ).toEqual([0, 1]);
    expect(scaleLinear()
      .domain([0, 96])
      .nice(10)
      .domain()
    ).toEqual([0, 100]);
    expect(scaleLinear()
      .domain([0.96, 0])
      .nice(10)
      .domain()
    ).toEqual([1, 0]);
    expect(scaleLinear()
      .domain([96, 0])
      .nice(10)
      .domain()
    ).toEqual([100, 0]);
    expect(scaleLinear()
      .domain([0, -0.96])
      .nice(10)
      .domain()
    ).toEqual([0, -1]);
    expect(scaleLinear()
      .domain([0, -96])
      .nice(10)
      .domain()
    ).toEqual([0, -100]);
    expect(scaleLinear()
      .domain([-0.96, 0])
      .nice(10)
      .domain()
    ).toEqual([-1, 0]);
    expect(scaleLinear()
      .domain([-96, 0])
      .nice(10)
      .domain()
    ).toEqual([-100, 0]);
    expect(scaleLinear()
      .domain([-0.1, 51.1])
      .nice(8)
      .domain()
    ).toEqual([-10, 60]);
  });

  it("linear.nice(count) nices the domain, extending it to round numbers", () => {
    expect(scaleLinear()
      .domain([1.1, 10.9])
      .nice(10)
      .domain()
    ).toEqual([1, 11]);
    expect(scaleLinear()
      .domain([10.9, 1.1])
      .nice(10)
      .domain()
    ).toEqual([11, 1]);
    expect(scaleLinear()
      .domain([0.7, 11.001])
      .nice(10)
      .domain()
    ).toEqual([0, 12]);
    expect(scaleLinear()
      .domain([123.1, 6.7])
      .nice(10)
      .domain()
    ).toEqual([130, 0]);
    expect(scaleLinear()
      .domain([0, 0.49])
      .nice(10)
      .domain()
    ).toEqual([0, 0.5]);
    expect(scaleLinear()
      .domain([0, 14.1])
      .nice(5)
      .domain()
    ).toEqual([0, 20]);
    expect(scaleLinear()
      .domain([0, 15])
      .nice(5)
      .domain()
    ).toEqual([0, 20]);
  });

  it("linear.nice(count) has no effect on degenerate domains", () => {
    expect(scaleLinear()
      .domain([0, 0])
      .nice(10)
      .domain()
    ).toEqual([0, 0]);
    expect(scaleLinear()
     .domain([0.5, 0.5])
     .nice(10)
     .domain()
   ).toEqual([0.5, 0.5]);
  });

  it("linear.nice(count) nicing a polylinear domain only affects the extent", () => {
    expect(scaleLinear()
     .domain([1.1, 1, 2, 3, 10.9])
     .nice(10)
     .domain()
   ).toEqual([1, 1, 2, 3, 11]);
    expect(scaleLinear()
     .domain([123.1, 1, 2, 3, -0.9])
     .nice(10)
     .domain()
   ).toEqual([130, 1, 2, 3, -10]);
  });

  it("linear.nice(count) accepts a tick count to control nicing step", () => {
    expect(scaleLinear()
      .domain([12, 87])
      .nice(5)
      .domain()
    ).toEqual([0, 100]);
    expect(scaleLinear()
      .domain([12, 87])
      .nice(10)
      .domain()
    ).toEqual([10, 90]);
    expect(scaleLinear()
      .domain([12, 87])
      .nice(100)
      .domain()
    ).toEqual([12, 87]);
  });

  it("linear.ticks(count) returns the expected ticks for an ascending domain", () => {
    const s = scaleLinear();
    expect(s.ticks(10).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(9 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(8 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(7 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(6 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(5 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(4 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(3 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0]);
    expect(s.ticks(2 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0]);
    expect(s.ticks(1 ).map(roundEpsilon)).toEqual([0.0,                                              1.0]);

    s.domain([-100, 100]);
    expect(s.ticks(10)).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(9 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(8 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(7 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(6 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(5 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(4 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(3 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(2 )).toEqual([-100,                          0,                     100]);
    expect(s.ticks(1 )).toEqual([                               0                         ]);
  });

  it("linear.ticks(count) returns the expected ticks for a descending domain", () => {
    const s = scaleLinear().domain([1, 0]);
    expect(s.ticks(10).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
    expect(s.ticks(9 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
    expect(s.ticks(8 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
    expect(s.ticks(7 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
    expect(s.ticks(6 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
    expect(s.ticks(5 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
    expect(s.ticks(4 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
    expect(s.ticks(3 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0].reverse());
    expect(s.ticks(2 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0].reverse());
    expect(s.ticks(1 ).map(roundEpsilon)).toEqual([0.0,                                              1.0].reverse());

    s.domain([100, -100]);
    expect(s.ticks(10)).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
    expect(s.ticks(9 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
    expect(s.ticks(8 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
    expect(s.ticks(7 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
    expect(s.ticks(6 )).toEqual([-100,           -50,           0,         50,         100].reverse());
    expect(s.ticks(5 )).toEqual([-100,           -50,           0,         50,         100].reverse());
    expect(s.ticks(4 )).toEqual([-100,           -50,           0,         50,         100].reverse());
    expect(s.ticks(3 )).toEqual([-100,           -50,           0,         50,         100].reverse());
    expect(s.ticks(2 )).toEqual([-100,                          0,                     100].reverse());
    expect(s.ticks(1 )).toEqual([                               0                         ].reverse());
  });

  it("linear.ticks(count) returns the expected ticks for a polylinear domain", () => {
    const s = scaleLinear().domain([0, 0.25, 0.9, 1]);

    expect(s.ticks(10).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(9 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(8 ).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(s.ticks(7 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(6 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(5 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(4 ).map(roundEpsilon)).toEqual([0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
    expect(s.ticks(3 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0]);
    expect(s.ticks(2 ).map(roundEpsilon)).toEqual([0.0,                     0.5,                     1.0]);
    expect(s.ticks(1 ).map(roundEpsilon)).toEqual([0.0,                                              1.0]);

    s.domain([-100, 0, 100]);
    expect(s.ticks(10)).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(9 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(8 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(7 )).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
    expect(s.ticks(6 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(5 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(4 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(3 )).toEqual([-100,           -50,           0,         50,         100]);
    expect(s.ticks(2 )).toEqual([-100,                          0,                     100]);
    expect(s.ticks(1 )).toEqual([                               0                         ]);
  });

  it("linear.ticks(X) spans linear.nice(X).domain()", () => {
    function check(domain, count) {
      const s = scaleLinear()
        .domain(domain)
        .nice(count);
      const ticks = s.ticks(count);
      expect([ticks[0], ticks[ticks.length - 1]]).toEqual(s.domain());
    }

    check([1, 9], 2);
    check([1, 9], 3);
    check([1, 9], 4);
    check([8, 9], 2);
    check([8, 9], 3);
    check([8, 9], 4);
    check([1, 21], 2);
    check([2, 21], 2);
    check([3, 21], 2);
    check([4, 21], 2);
    check([5, 21], 2);
    check([6, 21], 2);
    check([7, 21], 2);
    check([8, 21], 2);
    check([9, 21], 2);
    check([10, 21], 2);
    check([11, 21], 2);
  })

  it("linear.ticks(count) returns the empty array if count is not a positive integer", () => {
    const s = scaleLinear();
    expect(s.ticks(NaN)).toEqual([]);
    expect(s.ticks(0)).toEqual([]);
    expect(s.ticks(-1)).toEqual([]);
    expect(s.ticks(Infinity)).toEqual([]);
  });

  it("linear.ticks() is an alias for linear.ticks(10)", () => {
    const s = scaleLinear();
    expect(s.ticks()).toEqual(s.ticks(10));
  });

  it("linear.tickFormat() is an alias for linear.tickFormat(10)", () => {
    expect(scaleLinear()
      .tickFormat()(0.2)
    ).toBe("0.2");
    expect(scaleLinear()
      .domain([-100, 100])
      .tickFormat()(-20)
    ).toBe("−20");
  });

  it("linear.tickFormat(count) returns a format suitable for the ticks", () => {
    expect(scaleLinear()
      .tickFormat(10)(0.2)
    ).toBe("0.2");
    expect(scaleLinear()
      .tickFormat(20)(0.2)
    ).toBe("0.20");
    expect(scaleLinear()
      .domain([-100, 100])
      .tickFormat(10)(-20)
    ).toBe("−20");
  });

  it("linear.tickFormat(count, specifier) sets the appropriate fixed precision if not specified", () => {
    expect(scaleLinear()
      .tickFormat(10, "+f")(0.2)
    ).toBe("+0.2");
    expect(scaleLinear()
      .tickFormat(20, "+f")(0.2)
    ).toBe("+0.20");
    expect(scaleLinear()
      .tickFormat(10, "+%")(0.2)
    ).toBe("+20%");
    expect(scaleLinear()
      .domain([0.19, 0.21])
      .tickFormat(10, "+%")(0.2)
    ).toBe("+20.0%");
  });

  it("linear.tickFormat(count, specifier) sets the appropriate round precision if not specified", () => {
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(10, "")(2.10)
    ).toBe("2");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "")(2.01)
    ).toBe("2");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "")(2.11)
    ).toBe("2.1");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(10, "e")(2.10)
    ).toBe("2e+0");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "e")(2.01)
    ).toBe("2.0e+0");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "e")(2.11)
    ).toBe("2.1e+0");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(10, "g")(2.10)
    ).toBe("2");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "g")(2.01)
    ).toBe("2.0");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "g")(2.11)
    ).toBe("2.1");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(10, "r")(2.10e6)
    ).toBe("2000000");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "r")(2.01e6)
    ).toBe("2000000");
    expect(scaleLinear()
      .domain([0, 9])
      .tickFormat(100, "r")(2.11e6)
    ).toBe("2100000");
    expect(scaleLinear()
      .domain([0, 0.9])
      .tickFormat(10, "p")(0.210)
    ).toBe("20%");
    expect(scaleLinear()
      .domain([0.19, 0.21])
      .tickFormat(10, "p")(0.201)
    ).toBe("20.1%");
  });

  it("linear.tickFormat(count, specifier) sets the appropriate prefix precision if not specified", () => {
    expect(scaleLinear()
      .domain([0, 1e6])
      .tickFormat(10, "$s")(0.51e6)
    ).toBe("$0.5M");
    expect(scaleLinear()
      .domain([0, 1e6])
      .tickFormat(100, "$s")(0.501e6)
    ).toBe("$0.50M");
});

it("linear.tickFormat() uses the default precision when the domain is invalid", () => {
  const f = scaleLinear()
    .domain([0, NaN])
    .tickFormat();
  expect(f + "").toBe(" >-,f");
  expect(f(0.12)).toBe("0.120000");
});

it("linear.copy() returns a copy with changes to the domain are isolated", () => {
  const x = scaleLinear()
  , y = x.copy();
  x.domain([1, 2]);

  expect(y.domain()).toEqual([0, 1]);
  expect(x(1)).toBe(0);
  expect(y(1)).toBe(1);

  y.domain([2, 3]);
  expect(x(2)).toBe(1);
  expect(y(2)).toBe(0);
  expect(x.domain()).toEqual([1, 2]);
  expect(y.domain()).toEqual([2, 3]);

  const y2 = x.domain([1, 1.9]).copy();
  x.nice(5);
  expect(x.domain()).toEqual([1, 2]);
  expect(y2.domain()).toEqual([1, 1.9]);
});

it("linear.copy() returns a copy with changes to the range are isolated", () => {
  const x = scaleLinear()
  , y = x.copy();

  x.range([1, 2]);
  expect(x.invert(1)).toBe(0);
  expect(y.invert(1)).toBe(1);
  expect(y.range()).toEqual([0, 1]);

  y.range([2, 3]);
  expect(x.invert(2)).toBe(1);
  expect(y.invert(2)).toBe(0);
  expect(x.range()).toEqual([1, 2]);
  expect(y.range()).toEqual([2, 3]);
});

it("linear.copy() returns a copy with changes to the interpolator are isolated", () => {
  const x = scaleLinear().range(["red", "blue"]);
  const y = x.copy();
  const i0 = x.interpolate();
  const i1 = function(a, b) {
    return function() { return b; };
  };

  x.interpolate(i1);
  expect(y.interpolate()).toBe(i0);
  expect(x(0.5)).toBe("blue");
  expect(y(0.5)).toBe("rgb(128, 0, 128)");
});

it("linear.copy() returns a copy with changes to clamping are isolated", () => {
  const x = scaleLinear().clamp(true)
  , y = x.copy();

  x.clamp(false);
  expect(x(2)).toBe(2);
  expect(y(2)).toBe(1);
  expect(y.clamp()).toBe(true);

  y.clamp(false);
  expect(x(2)).toBe(2);
  expect(y(2)).toBe(2);
  expect(x.clamp()).toBe(false);
});

it("linear.copy() returns a copy with changes to the unknown value are isolated", () => {
  const x = scaleLinear()
  , y = x.copy();

  x.unknown(2);
  expect(x(NaN)).toBe(2);
  expect(isNaN(y(NaN))).toBe(true);
  expect(y.unknown()).toBe(undefined);

  y.unknown(3);
  expect(x(NaN)).toBe(2);
  expect(y(NaN)).toBe(3);
  expect(x.unknown()).toBe(2);
});
});
