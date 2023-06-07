import {
  d3Area as area,
  curveLinear
} from "../index";
import {
  assertPathEqual
} from "./asserts.test";

describe('d3Shape area' , () => {
  it("area() returns a default area shape", () => {
    const a = area();
    expect(a.x0()([42, 34])).toBe(42);
    expect(a.x1()).toBe(null);
    expect(a.y0()([42, 34])).toBe(0);
    expect(a.y1()([42, 34])).toBe(34);
    expect(a.defined()([42, 34])).toBe(true);
    expect(a.curve()).toBe(curveLinear);
    expect(a.context()).toBe(null);
    assertPathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  });

  it("area(x, y0, y1) sets x0, y0 and y1", () => {
    const x = function() {}
    , y = function() {};
    expect(area(x).x0()).toBe(x);
    expect(area(x, y).y0()).toBe(y);
    expect(area(x, 0, y).y1()).toBe(y);
    expect(area(3, 2, 1).x0()("aa")).toBe(3);
    expect(area(3, 2, 1).y0()("aa")).toBe(2);
    expect(area(3, 2, 1).y1()("aa")).toBe(1);
  });

  it("area.x(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().x(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.x0(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"]
    , actual = [];
    area().x0(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.x1(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().x1(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.y(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().y(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.y0(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().y0(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.y1(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().y1(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.defined(f)(data) passes d, i and data to the specified function f", () => {
    const data = ["a", "b"], actual = [];
    area().defined(function() { actual.push([].slice.call(arguments)); })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });

  it("area.x(x)(data) observes the specified function", () => {
    const x = function(d) { return d.x; };
    const a = area().x(x);
    expect(a.x()).toBe(x);
    expect(a.x0()).toBe(x);
    expect(a.x1()).toBe(null);
    assertPathEqual(a([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  });

  it("area.x(x)(data) observes the specified constant", () => {
    const x = 0;
    const a = area().x(x);
    expect(a.x()()).toBe(0);
    expect(a.x0()()).toBe(0);
    expect(a.x1()).toBe(null);
    assertPathEqual(a([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5L0,0L0,0L0,0Z");
  });

  it("area.y(y)(data) observes the specified function", () => {
    const y = function(d) { return d.y; };
    const a = area().y(y);
    expect(a.y()).toBe(y);
    expect(a.y0()).toBe(y);
    expect(a.y1()).toBe(null);
    assertPathEqual(a([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5L4,5L2,3L0,1Z");
  });

  it("area.y(y)(data) observes the specified constant", () => {
    const a = area().y(0);
    expect(a.y()()).toBe(0);
    expect(a.y0()()).toBe(0);
    expect(a.y1()).toBe(null);
    assertPathEqual(a([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0L4,0L2,0L0,0Z");
  });
})
