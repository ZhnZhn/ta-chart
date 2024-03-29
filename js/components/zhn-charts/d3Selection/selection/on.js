"use strict";

exports.__esModule = true;
exports.default = _default;
const _contextListener = listener => function (event) {
    listener.call(this, event, this.__data__);
  },
  _parseTypenames = typenames => typenames.trim().split(/^|\s+/).map(t => {
    let name = "",
      i = t.indexOf(".");
    if (i >= 0) {
      name = t.slice(i + 1);
      t = t.slice(0, i);
    }
    return {
      type: t,
      name: name
    };
  }),
  _fOnRemove = typename => function () {
    let on = this.__on;
    if (!on) return;
    let j = 0,
      i = -1,
      m = on.length,
      o;
    for (; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  },
  _fOnAdd = (typename, value, options) => function () {
    let on = this.__on,
      o,
      listener = _contextListener(value),
      j = 0,
      m;
    if (on) for (m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o];else on.push(o);
  };

//typename, value, options
function _default() {
  let typenames = _parseTypenames((arguments.length <= 0 ? undefined : arguments[0]) + ""),
    value = arguments.length <= 1 ? undefined : arguments[1],
    options = arguments.length <= 2 ? undefined : arguments[2],
    n = typenames.length,
    i,
    t,
    on,
    j = 0,
    m,
    o;
  if (arguments.length < 2) {
    on = this.node().__on;
    if (on) for (m = on.length; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? _fOnAdd : _fOnRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
//# sourceMappingURL=on.js.map