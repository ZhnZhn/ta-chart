"use strict";

exports.__esModule = true;
exports.default = _default;
const createMap = () => new Map(),
  setMap = (map, key, value) => {
    map.set(key, value);
  };
function _default() {
  let keys = [],
    sortKeys = [],
    sortValues,
    nest;
  const apply = (array, depth, createResult, setResult) => {
      if (depth >= keys.length) {
        return sortValues == null ? array : array.sort(sortValues);
      }
      let i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = new Map(),
        values,
        result = createResult();
      while (++i < n) {
        values = valuesByKey.get(keyValue = key(value = array[i]) + "");
        if (values) {
          values.push(value);
        } else {
          valuesByKey.set(keyValue, [value]);
        }
      }
      valuesByKey.forEach((values, key) => {
        setResult(result, key, apply(values, depth, createResult, setResult));
      });
      return result;
    },
    entries = (map, depth) => {
      if (++depth > keys.length) return map;
      let array,
        sortKey = sortKeys[depth - 1];
      array = [];
      map.forEach((v, k) => {
        array.push({
          key: k,
          values: entries(v, depth)
        });
      });
      return sortKey == null ? array : array.sort((a, b) => sortKey(a.key, b.key));
    };
  return nest = {
    entries: array => entries(apply(array, 0, createMap, setMap), 0),
    key: d => {
      keys.push(d);
      return nest;
    },
    //Required properties for unit tests
    sortKeys: order => {
      sortKeys[keys.length - 1] = order;
      return nest;
    },
    sortValues: order => {
      sortValues = order;
      return nest;
    }
  };
}
//# sourceMappingURL=nest.js.map