"use strict";

exports.__esModule = true;
exports.merge = void 0;
var merge = function merge(arrays) {
  var n = arrays.length,
    m,
    i = -1,
    j = 0,
    merged,
    array;
  while (++i < n) j += arrays[i].length;
  merged = new Array(j);
  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }
  return merged;
};

/*
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

export const merge = (arrays) => {
  return Array.from(flatten(arrays));
}
*/
exports.merge = merge;
//# sourceMappingURL=merge.js.map