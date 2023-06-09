import { variance } from './variance';

const mathSqrt = Math.sqrt;
export const deviation = (
  array,
  f
) => {
  const v = variance(array, f);
  return v ? mathSqrt(v) : v;
}
