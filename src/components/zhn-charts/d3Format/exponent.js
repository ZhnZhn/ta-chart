import { formatDecimalParts } from './formatDecimal';

export default function(x) {
  x = formatDecimalParts(Math.abs(x));
  return x ? x[1] : NaN;
}
