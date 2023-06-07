"use strict";

var _index = require("../index");
function series(series, data, key, index) {
  data.forEach(function (d, i) {
    series[i].data = d;
  });
  series.key = key;
  series.index = index;
  return series;
}
describe('d3Shape stack', function () {
  it("stack() has the expected defaults", function () {
    var s = (0, _index.d3Stack)();
    expect(s.keys()()).toEqual([]);
    expect(s.value()({
      foo: 42
    }, "foo")).toBe(42);
  });
  it("stack(data) computes the stacked series for the given data", function () {
    var s = (0, _index.d3Stack)().keys([0, 1, 2, 3]),
      data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
    expect(s(data)).toEqual([series([[0, 1], [0, 2], [0, 1]], data, 0, 0), series([[1, 4], [2, 6], [1, 3]], data, 1, 1), series([[4, 9], [6, 8], [3, 7]], data, 2, 2), series([[9, 10], [8, 11], [7, 9]], data, 3, 3)]);
  });
  it("stack.keys(array) sets the array of constant keys", function () {
    var s = (0, _index.d3Stack)().keys(["0.0", "2.0", "4.0"]);
    expect(s.keys()()).toEqual(["0.0", "2.0", "4.0"]);
  });
  it("stack.keys(function) sets the key accessor function", function () {
    var s = (0, _index.d3Stack)().keys(function () {
      return "abc".split("");
    });
    expect(s.keys()()).toEqual(["a", "b", "c"]);
  });
  it("stack(data, arguments…) passes the key accessor any additional arguments", function () {
    var A;
    var B;
    var k = function k(data, a, b) {
      A = a;
      B = b;
      return Object.keys(data[0]);
    };
    var s = (0, _index.d3Stack)().keys(k);
    var data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
    expect(s(data, "foo", "bar")).toEqual([series([[0, 1], [0, 2], [0, 1]], data, "0", 0), series([[1, 4], [2, 6], [1, 3]], data, "1", 1), series([[4, 9], [6, 8], [3, 7]], data, "2", 2), series([[9, 10], [8, 11], [7, 9]], data, "3", 3)]);
    expect(A).toBe("foo");
    expect(B).toBe("bar");
  });
  it("stack.value(number) sets the constant value", function () {
    var s = (0, _index.d3Stack)().value("42.0");
    expect(s.value()()).toBe(42);
  });
  it("stack.value(function) sets the value accessor function", function () {
    var v = function v() {
        return 42;
      },
      s = (0, _index.d3Stack)().value(v);
    expect(s.value()).toBe(v);
  });
  it("stack(data) passes the value accessor datum, key, index and data", function () {
    var actual;
    var v = function v(d, k, i, data) {
      actual = {
        datum: d,
        key: k,
        index: i,
        data: data
      };
      return 2;
    };
    var s = (0, _index.d3Stack)().keys(["foo"]).value(v);
    var data = [{
      foo: 1
    }];
    expect(s(data)).toEqual([series([[0, 2]], data, "foo", 0)]);
    expect(actual).toEqual({
      datum: data[0],
      key: "foo",
      index: 0,
      data: data
    });
  });
  it("stack(data) coerces the return value of the value accessor to a number", function () {
    var v = function v() {
      return "2.0";
    };
    var s = (0, _index.d3Stack)().keys(["foo"]).value(v);
    var data = [{
      foo: 1
    }];
    expect(s(data)).toEqual([series([[0, 2]], data, "foo", 0)]);
  });
  it("stack.order(null) is equivalent to stack.order(stackOrderNone)", function () {
    var s = (0, _index.d3Stack)().order(null);
    expect(typeof s.order()).toBe("function");
  });
  it("stack.offset(null) is equivalent to stack.offset(stackOffsetNone)", function () {
    var s = (0, _index.d3Stack)().offset(null);
    expect(typeof s.offset()).toBe("function");
  });
});
//# sourceMappingURL=stack.test.js.map