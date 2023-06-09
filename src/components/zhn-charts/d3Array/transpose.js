import { min } from './min';

const length = d => d.length;

export const transpose = (
  matrix
) => {
  let n = matrix.length;
  if (!n) return [];
  let i = -1
  , m = min(matrix, length)
  , transposed = new Array(m)
  , j
  , row;

  for (; ++i < m;) {
    for (j = -1, row = transposed[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transposed;
}
