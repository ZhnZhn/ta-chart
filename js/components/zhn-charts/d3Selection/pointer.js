"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
function _default(evt, node) {
  evt = (0, _sourceEvent.default)(evt);
  if (node === undefined) node = evt.currentTarget;
  if (node) {
    const svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      let point = svg.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      const rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
//# sourceMappingURL=pointer.js.map