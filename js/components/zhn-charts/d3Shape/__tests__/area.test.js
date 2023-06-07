"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
describe('d3Shape area', function () {
  it("area() returns a default area shape", function () {
    var a = (0, _index.d3Area)();
    expect(a.x0()([42, 34])).toBe(42);
    expect(a.x1()).toBe(null);
    expect(a.y0()([42, 34])).toBe(0);
    expect(a.y1()([42, 34])).toBe(34);
    expect(a.defined()([42, 34])).toBe(true);
    expect(a.curve()).toBe(_index.curveLinear);
    expect(a.context()).toBe(null);
    (0, _asserts.assertPathEqual)(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  });
  it("area(x, y0, y1) sets x0, y0 and y1", function () {
    var x = function x() {},
      y = function y() {};
    expect((0, _index.d3Area)(x).x0()).toBe(x);
    expect((0, _index.d3Area)(x, y).y0()).toBe(y);
    expect((0, _index.d3Area)(x, 0, y).y1()).toBe(y);
    expect((0, _index.d3Area)(3, 2, 1).x0()("aa")).toBe(3);
    expect((0, _index.d3Area)(3, 2, 1).y0()("aa")).toBe(2);
    expect((0, _index.d3Area)(3, 2, 1).y1()("aa")).toBe(1);
  });
  it("area.x(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().x(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.x0(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().x0(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.x1(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().x1(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.y(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().y(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.y0(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().y0(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.y1(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().y1(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.defined(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.d3Area)().defined(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("area.x(x)(data) observes the specified function", function () {
    var x = function x(d) {
      return d.x;
    };
    var a = (0, _index.d3Area)().x(x);
    expect(a.x()).toBe(x);
    expect(a.x0()).toBe(x);
    expect(a.x1()).toBe(null);
    (0, _asserts.assertPathEqual)(a([{
      x: 0,
      1: 1
    }, {
      x: 2,
      1: 3
    }, {
      x: 4,
      1: 5
    }]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  });
  it("area.x(x)(data) observes the specified constant", function () {
    var x = 0;
    var a = (0, _index.d3Area)().x(x);
    expect(a.x()()).toBe(0);
    expect(a.x0()()).toBe(0);
    expect(a.x1()).toBe(null);
    (0, _asserts.assertPathEqual)(a([{
      1: 1
    }, {
      1: 3
    }, {
      1: 5
    }]), "M0,1L0,3L0,5L0,0L0,0L0,0Z");
  });
  it("area.y(y)(data) observes the specified function", function () {
    var y = function y(d) {
      return d.y;
    };
    var a = (0, _index.d3Area)().y(y);
    expect(a.y()).toBe(y);
    expect(a.y0()).toBe(y);
    expect(a.y1()).toBe(null);
    (0, _asserts.assertPathEqual)(a([{
      0: 0,
      y: 1
    }, {
      0: 2,
      y: 3
    }, {
      0: 4,
      y: 5
    }]), "M0,1L2,3L4,5L4,5L2,3L0,1Z");
  });
  it("area.y(y)(data) observes the specified constant", function () {
    var a = (0, _index.d3Area)().y(0);
    expect(a.y()()).toBe(0);
    expect(a.y0()()).toBe(0);
    expect(a.y1()).toBe(null);
    (0, _asserts.assertPathEqual)(a([{
      0: 0
    }, {
      0: 2
    }, {
      0: 4
    }]), "M0,0L2,0L4,0L4,0L2,0L0,0Z");
  });
});
//# sourceMappingURL=area.test.js.map