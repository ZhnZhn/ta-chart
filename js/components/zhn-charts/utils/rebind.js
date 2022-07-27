"use strict";

exports.__esModule = true;
exports.rebind = void 0;

// d3fc/packages/d3fc-rebind/src/rebind.js same as d3.rebind
var _createReboundMethod = function _createReboundMethod(target, source, name) {
  var method = source[name];

  if (typeof method !== "function") {
    throw new Error("Attempt to rebind " + name + " which isn't a function on the source object");
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var value = method.apply(source, args);
    return value === source ? target : value;
  };
};

var rebind = function rebind(target, source) {
  for (var _len2 = arguments.length, names = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    names[_key2 - 2] = arguments[_key2];
  }

  for (var _i = 0, _names = names; _i < _names.length; _i++) {
    var name = _names[_i];
    target[name] = _createReboundMethod(target, source, name);
  }

  return target;
};

exports.rebind = rebind;
//# sourceMappingURL=rebind.js.map