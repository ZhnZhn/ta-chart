export default function(callback) {
  let groups = this._groups
  , j = 0
  , m = groups.length
  , group
  , i
  , n
  , node;
  for (; j < m; ++j) {
    for (group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
