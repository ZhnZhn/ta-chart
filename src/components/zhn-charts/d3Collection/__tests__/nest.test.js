import { nest } from '../index';
import { ascending } from '../../d3Array';

describe('d3Collection nest', () => {
  it("nest.entries(array) returns the array of input values, in input order", () => {
    expect(nest().entries([1, 2, 3])).toEqual([1, 2, 3]);
    expect(nest().entries([1, 3, 2])).toEqual([1, 3, 2]);
    expect(nest().entries([3, 1, 2])).toEqual([3, 1, 2]);
  });

  it("nest.sortValues(order).entries(array) returns input values in sorted order", () => {
    const nestAscending = nest()
      .sortValues((a, b) => a.foo - b.foo)
    , nestDescending = nest()
      .sortValues((a, b) => b.foo - a.foo)
    , a = {foo: 1}
    , b = {foo: 2}
    , c = {foo: 3};

    expect(nestAscending.entries([a, b, c])).toEqual([a, b, c]);
    expect(nestAscending.entries([a, c, b])).toEqual([a, b, c]);
    expect(nestAscending.entries([c, a, b])).toEqual([a, b, c]);

    expect(nestDescending.entries([a, b, c])).toEqual([c, b, a]);
    expect(nestDescending.entries([a, c, b])).toEqual([c, b, a]);
    expect(nestDescending.entries([c, a, b])).toEqual([c, b, a]);
  });

  it("nest.key(key).entries(array) returns entries for each distinct key, with values in input order", () => {
    const _nest = nest()
      .key(d => d.foo)
      .sortKeys(ascending)
    , a = {foo: 1}
    , b = {foo: 1}
    , c = {foo: 2};

    expect(
      _nest.entries([c, a, b, c])
    ).toEqual([
       {key: "1", values: [a, b]},
       {key: "2", values: [c, c]}
    ]);
    expect(
      _nest.entries([c, b, a, c])
    ).toEqual([
       {key: "1", values: [b, a]},
       {key: "2", values: [c, c]}
    ]);
  });

  it("nest.key(key) coerces key values to strings", () => {
    const _nest = nest()
      .key(d => d.number ? 1 : "1")
      .sortKeys(ascending)
    , a = {number: true}
    , b = {number: false};

    expect(
      _nest.entries([a, b])
    ).toEqual([
      {key: "1", values: [a, b]}
    ]);
  });

  it("nest.key(key1).key(key2).entries(array) returns entries for each distinct key set, with values in input order", () => {
    const _nest = nest()
      .key(d => d.foo)
      .sortKeys(ascending)
      .key(d => d.bar)
      .sortKeys(ascending)
    , a = {foo: 1, bar: "a"}
    , b = {foo: 1, bar: "a"}
    , c = {foo: 2, bar: "a"}
    , d = {foo: 1, bar: "b"}
    , e = {foo: 1, bar: "b"}
    , f = {foo: 2, bar: "b"};

    expect(
      _nest.entries([a, b, c, d, e, f])
    ).toEqual([
      {key: "1", values: [{key: "a", values: [a, b]},
      {key: "b", values: [d, e]}]},
      {key: "2", values: [{key: "a", values: [c]},
      {key: "b", values: [f]}]}
    ]);
    expect(
      _nest.entries([f, e, d, c, b, a])
    ).toEqual([
      {key: "1", values: [{key: "a", values: [b, a]},
      {key: "b", values: [e, d]}]},
      {key: "2", values: [{key: "a", values: [c]},
      {key: "b", values: [f]}]}
    ]);
  });

  it("nest.key(key).sortKeys(order).entries(array) sorts entries by key using the specified order function", () => {
    const _nest = nest()
      .key(d => d.foo)
      .sortKeys(ascending)
    , a = {foo: 1}
    , b = {foo: 1}
    , c = {foo: 2};

    expect(
      _nest.entries([c, a, b, c])
    ).toEqual([
      {key: "1", values: [a, b]},
      {key: "2", values: [c, c]}
    ]);
    expect(
      _nest.entries([c, b, a, c])
    ).toEqual([
      {key: "1", values: [a, b]},
      {key: "2", values: [c, c]}
    ]);
  });

  it("nest.key(key1).sortKeys(order1).key(key2).sortKeys(order2).entries(array) sorts entries by key using the specified order functions", () => {
    const _nest = nest()
      .key(d => d.foo)
      .sortKeys(ascending)
      .key(d => d.bar)
      .sortKeys(ascending)
    , a = {foo: 1, bar: "a"}
    , b = {foo: 1, bar: "a"}
    , c = {foo: 2, bar: "a"}
    , d = {foo: 1, bar: "b"}
    , e = {foo: 1, bar: "b"}
    , f = {foo: 2, bar: "b"};
    expect(
      _nest.entries([a, b, c, d, e, f])
    ).toEqual([{
        key: "1",
        values: [
          {key: "a", values: [a, b]},
          {key: "b", values: [d, e]}
        ]
      },{
        key: "2",
        values: [
          {key: "a", values: [c]},
          {key: "b", values: [f]}
        ]
    }]);
    expect(
      _nest.entries([f, e, d, c, b, a])
    ).toEqual([
      {
        key: "1",
        values: [
          {key: "a", values: [b, a]},
          {key: "b", values: [e, d]}
        ]
      },
      {
        key: "2",
        values: [
          {key: "a", values: [c]},
          {key: "b", values: [f]}
        ]
      }
    ]);
  });
})
