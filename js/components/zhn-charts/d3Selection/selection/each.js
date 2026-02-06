"use strict";

exports.__esModule = true;
exports.default = _default;
function _default(callback) {
  let groups = this._groups,
    j = 0,
    m = groups.length,
    group,
    i,
    n,
    node;
  for (; j < m; ++j) {
    for (group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      node = group[i];
      if (node) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
//# sourceMappingURL=each.js.map