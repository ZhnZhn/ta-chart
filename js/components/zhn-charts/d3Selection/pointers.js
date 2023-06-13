"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = _default;
var _pointer = _interopRequireDefault(require("./pointer"));
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
const arrayFrom = Array.from;
function _default(events, node) {
  // i.e., instanceof Event, not TouchList or iterable
  if (events.target) {
    events = (0, _sourceEvent.default)(events);
    if (node === void 0) node = events.currentTarget;
    events = events.touches || [events];
  }
  return arrayFrom(events, event => (0, _pointer.default)(event, node));
}
//# sourceMappingURL=pointers.js.map