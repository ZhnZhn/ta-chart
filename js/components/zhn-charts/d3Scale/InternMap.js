"use strict";

exports.__esModule = true;
exports.InternMap = void 0;
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
function intern_get(_ref, value) {
  let {
    _intern,
    _key
  } = _ref;
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set(_ref2, value) {
  let {
    _intern,
    _key
  } = _ref2;
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete(_ref3, value) {
  let {
    _intern,
    _key
  } = _ref3;
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
class InternMap extends Map {
  constructor(entries, key) {
    if (key === void 0) {
      key = keyof;
    }
    super();
    Object.defineProperties(this, {
      _intern: {
        value: new Map()
      },
      _key: {
        value: key
      }
    });
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
exports.InternMap = InternMap;
//# sourceMappingURL=InternMap.js.map