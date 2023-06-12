"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.scaleLinear = scaleLinear;
var _d3Array = require("./d3Array");
var _continuous = require("./continuous");
var _init = require("./init");
var _tickFormat = _interopRequireDefault(require("./tickFormat"));
const mathFloor = Math.floor,
  mathCeil = Math.ceil;
function linearish(scale) {
  let domain = scale.domain;
  scale.ticks = count => {
    let d = domain();
    return (0, _d3Array.ticks)(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = (count, specifier) => {
    let d = domain();
    return (0, _tickFormat.default)(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = count => {
    if (count == null) count = 10;
    let d = domain(),
      i0 = 0,
      i1 = d.length - 1,
      start = d[i0],
      stop = d[i1],
      prestep,
      step,
      maxIter = 10;
    if (stop < start) {
      step = start;
      start = stop;
      stop = step;
      step = i0;
      i0 = i1;
      i1 = step;
    }
    while (maxIter-- > 0) {
      step = (0, _d3Array.tickIncrement)(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = mathFloor(start / step) * step;
        stop = mathCeil(stop / step) * step;
      } else if (step < 0) {
        start = mathCeil(start * step) / step;
        stop = mathFloor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function scaleLinear() {
  let scale = (0, _continuous.continuous)();
  scale.copy = () => (0, _continuous.copy)(scale, scaleLinear());
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  _init.initRange.apply(scale, args);
  return linearish(scale);
}
//# sourceMappingURL=linear.js.map