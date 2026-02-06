"use strict";

exports.__esModule = true;
exports.default = _default;
function _default(evt) {
  let sourceEvent;
  while (sourceEvent = evt.sourceEvent) evt = sourceEvent;
  return evt;
}
//# sourceMappingURL=sourceEvent.js.map