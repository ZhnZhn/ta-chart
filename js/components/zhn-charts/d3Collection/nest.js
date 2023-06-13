"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = _default;
var _map = _interopRequireDefault(require("./map"));
/*
function createObject() {
  return {};
}
*/
/*
function setObject(object, key, value) {
  object[key] = value;
}
*/
const createMap = () => (0, _map.default)(),
  setMap = (map, key, value) => {
    map.set(key, value);
  };
function _default() {
  let keys = [],
    sortKeys = [],
    sortValues,
    rollup,
    nest;
  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }
    let i = -1,
      n = array.length,
      key = keys[depth++],
      keyValue,
      value,
      valuesByKey = (0, _map.default)(),
      values,
      result = createResult();
    while (++i < n) {
      /*eslint-disable no-cond-assign*/
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        /*eslint-enable no-cond-assign*/
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }
    valuesByKey.each(function (values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });
    return result;
  }
  function entries(map, depth) {
    if (++depth > keys.length) return map;
    let array,
      sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();else {
      array = [];
      map.each(function (v, k) {
        array.push({
          key: k,
          values: entries(v, depth)
        });
      });
    }
    return sortKey != null ? array.sort(function (a, b) {
      return sortKey(a.key, b.key);
    }) : array;
  }
  return nest = {
    //object: function(array) { return apply(array, 0, createObject, setObject); },
    //map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function (array) {
      return entries(apply(array, 0, createMap, setMap), 0);
    },
    key: function (d) {
      keys.push(d);
      return nest;
    }
    //sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    //sortValues: function(order) { sortValues = order; return nest; },
    //rollup: function(f) { rollup = f; return nest; }
  };
}
//# sourceMappingURL=nest.js.map