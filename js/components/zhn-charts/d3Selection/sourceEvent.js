"use strict";

exports.__esModule = true;
exports.default = _default;
function _default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}
//# sourceMappingURL=sourceEvent.js.map