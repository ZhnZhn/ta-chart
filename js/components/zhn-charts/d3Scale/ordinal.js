"use strict";

exports.__esModule = true;
exports.default = ordinal;
exports.implicit = void 0;
var _InternMap = require("./InternMap");
var _init = require("./init");
var _helperFns = require("./helperFns");
const arrayFrom = Array.from;
const implicit = Symbol("implicit");
exports.implicit = implicit;
function ordinal() {
  let index = new _InternMap.InternMap(),
    domain = [],
    range = [],
    unknown = implicit;
  function scale(d) {
    let i = index.get(d);
    if ((0, _helperFns.isUndef)(i)) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }
  scale.domain = function (_) {
    if ((0, _helperFns.isUndef)(_)) return domain.slice();
    domain = [];
    index = new _InternMap.InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = _ => (0, _helperFns.isUndef)(_) ? range.slice() : (range = arrayFrom(_), scale);
  scale.unknown = function () {
    return arguments.length ? (unknown = arguments.length <= 0 ? undefined : arguments[0], scale) : unknown;
  };
  scale.copy = () => ordinal(domain, range).unknown(unknown);
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  _init.initRange.apply(scale, args);
  return scale;
}
//# sourceMappingURL=ordinal.js.map