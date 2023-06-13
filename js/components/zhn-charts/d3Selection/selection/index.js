"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Selection = Selection;
exports.root = exports.default = void 0;
var _each = _interopRequireDefault(require("./each"));
var _on = _interopRequireDefault(require("./on"));
//import selection_iterator from "./iterator";

let root = [null];
exports.root = root;
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}

/*
function selection_selection() {
  return this;
}
*/

Selection.prototype = selection.prototype = {
  constructor: Selection,
  each: _each.default,
  on: _on.default
  //[Symbol.iterator]: selection_iterator
};
var _default = selection;
exports.default = _default;
//# sourceMappingURL=index.js.map