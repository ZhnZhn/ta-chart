"use strict";

exports.__esModule = true;
exports.default = _default;
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

function _default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}
//# sourceMappingURL=lcg.js.map