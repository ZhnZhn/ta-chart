"use strict";

exports.__esModule = true;
exports.default = _default;
var _index = require("./selection/index");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
//# sourceMappingURL=select.js.map