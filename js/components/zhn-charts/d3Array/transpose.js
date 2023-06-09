"use strict";

exports.__esModule = true;
exports.transpose = void 0;
var _min = require("./min");
var length = function length(d) {
  return d.length;
};
var transpose = function transpose(matrix) {
  var n = matrix.length;
  if (!n) return [];
  var i = -1,
    m = (0, _min.min)(matrix, length),
    transposed = new Array(m),
    j,
    row;
  for (; ++i < m;) {
    for (j = -1, row = transposed[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transposed;
};
exports.transpose = transpose;
//# sourceMappingURL=transpose.js.map