export let prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    let property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (let property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    const keys = [];
    for (let property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    const values = [];
    for (let property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    const entries = [];
    for (let property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    let size = 0;
    for (let property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (let property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (let property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  const map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    let i = -1
    , n = object.length
    , o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (let key in object) map.set(key, object[key]);

  return map;
}

export default map;