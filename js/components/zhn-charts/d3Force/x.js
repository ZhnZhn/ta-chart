"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = _default;
var _constant = _interopRequireDefault(require("./constant"));
const _isFn = v => typeof v === 'function';
function _default(x) {
  let strength = (0, _constant.default)(0.1),
    nodes,
    strengths,
    xz;
  if (!_isFn(x)) x = (0, _constant.default)(x == null ? 0 : +x);
  const force = alpha => {
      let i = 0,
        n = nodes.length,
        node;
      for (; i < n; ++i) {
        node = nodes[i];
        node.vx += (xz[i] - node.x) * strengths[i] * alpha;
      }
    },
    initialize = () => {
      if (!nodes) return;
      let i,
        n = nodes.length;
      strengths = new Array(n);
      xz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
      }
    };
  force.initialize = _ => {
    nodes = _;
    initialize();
  };
  force.strength = function () {
    return arguments.length ? (strength = _isFn(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : (0, _constant.default)(+(arguments.length <= 0 ? undefined : arguments[0])), initialize(), force) : strength;
  };
  force.x = function () {
    return arguments.length ? (x = _isFn(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : (0, _constant.default)(+(arguments.length <= 0 ? undefined : arguments[0])), initialize(), force) : x;
  };
  return force;
}
//# sourceMappingURL=x.js.map