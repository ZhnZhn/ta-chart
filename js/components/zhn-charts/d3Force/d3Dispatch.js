"use strict";

exports.__esModule = true;
exports.default = void 0;
const noop = {
    value: () => {}
  },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function dispatch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  let i,
    n = args.length,
    _ = {},
    t;
  for (i = 0; i < n; ++i) {
    if (!(t = args[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    let name = "",
      i = t.indexOf(".");
    if (i >= 0) {
      name = t.slice(i + 1);
      t = t.slice(0, i);
    }
    if (t && !hasOwnProperty.call(types, t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name: name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function (typename, callback) {
    let _ = this._,
      T = parseTypenames(typename + "", _),
      t,
      i = -1,
      n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      /*eslint-disable no-cond-assign*/
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      /*eslint-enable no-cond-assign*/else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function () {
    let copy = {},
      _ = this._;
    for (let t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function (type, that) {
    let n, t, args, i;
    if ((n = arguments.length - 2) > 0) for (args = new Array(n), i = 0; i < n; ++i) args[i] = arguments[i + 2];
    if (!hasOwnProperty.call(this._, type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function (type, that, args) {
    if (!hasOwnProperty.call(this._, type)) throw new Error("unknown type: " + type);
    let t = this._[type],
      i = 0,
      n = t.length;
    for (; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  let i = 0,
    n = type.length,
    c;
  for (; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set(type, name, callback) {
  let i = 0,
    n = type.length;
  for (; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop;
      type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name: name,
    value: callback
  });
  return type;
}
var _default = dispatch;
exports.default = _default;
//# sourceMappingURL=d3Dispatch.js.map