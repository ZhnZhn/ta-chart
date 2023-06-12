import { color } from '../d3Color';
import rgb from './rgb';
import { genericArray } from './array';
import date from './date';
import number from './number';
import object from './object';
import string from './string';
import constant from './constant';
import numberArray, {isNumberArray} from './numberArray';

export default function(a, b) {
  let t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
    : (t === "number" ? number
    : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
    : b instanceof color ? rgb
    : b instanceof Date ? date
    : isNumberArray(b) ? numberArray
    : Array.isArray(b) ? genericArray
    : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
    : number)(a, b);
}
