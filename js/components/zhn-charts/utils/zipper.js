"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = zipper;
var _d3Array = require("../d3Array");
var _identity = _interopRequireDefault(require("./identity"));
/* an extension to d3.zip so we call a function instead of an array */

/*
interface Zip {
    (...args: any[]): any[];
    combine(): any;
    combine(x: any): Zip;
}
*/

function zipper() {
  var combine = _identity["default"];
  var d3_zipLength = function d3_zipLength(d) {
    return d.length;
  };
  function zip() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var n = args.length;
    if (!n) return [];
    var m = (0, _d3Array.min)(args, d3_zipLength);
    var zips = new Array(m);
    for (var i = -1; ++i < m;) {
      for (var j = -1, _zip = zips[i] = new Array(n); ++j < n;) {
        _zip[j] = args[j][i];
      }
      zips[i] = combine.apply(this, zips[i]);
    }
    return zips;
  }
  zip.combine = function () {
    return arguments.length ? (combine = arguments.length <= 0 ? undefined : arguments[0], zip) : combine;
  };
  return zip;
}
//# sourceMappingURL=zipper.js.map