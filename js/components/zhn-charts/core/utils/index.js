"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
var _exportNames = {
  zipper: true,
  slidingWindow: true,
  identity: true,
  path: true,
  functor: true,
  head: true,
  first: true,
  last: true,
  sign: true,
  getClosestValue: true,
  d3Window: true,
  MOUSEENTER: true,
  MOUSELEAVE: true,
  MOUSEMOVE: true,
  MOUSEUP: true,
  TOUCHMOVE: true,
  TOUCHEND: true,
  WHEEL: true,
  getTouchProps: true,
  isObject: true,
  touchPosition: true,
  mousePosition: true,
  clearCanvas: true,
  mapObject: true
};
exports.zipper = exports.touchPosition = exports.slidingWindow = exports.sign = exports.path = exports.mousePosition = exports.mapObject = exports.last = exports.isObject = exports.identity = exports.head = exports.getTouchProps = exports.getClosestValue = exports.functor = exports.first = exports.d3Window = exports.clearCanvas = exports.WHEEL = exports.TOUCHMOVE = exports.TOUCHEND = exports.MOUSEUP = exports.MOUSEMOVE = exports.MOUSELEAVE = exports.MOUSEENTER = void 0;
var _zipper = _interopRequireDefault(require("../../utils/zipper"));
exports.zipper = _zipper.default;
var _slidingWindow = _interopRequireDefault(require("../../utils/slidingWindow"));
exports.slidingWindow = _slidingWindow.default;
var _identity = _interopRequireDefault(require("../../utils/identity"));
exports.identity = _identity.default;
var _path = require("../../utils/path");
exports.path = _path.path;
var _functor = require("../../utils/functor");
exports.functor = _functor.functor;
var _strokeDasharray = require("../../utils/strokeDasharray");
Object.keys(_strokeDasharray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _strokeDasharray[key]) return;
  exports[key] = _strokeDasharray[key];
});
var _utils = require("../../utils");
exports.head = _utils.head;
exports.first = _utils.first;
exports.last = _utils.last;
var _closestItem = require("./closestItem");
Object.keys(_closestItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _closestItem[key]) return;
  exports[key] = _closestItem[key];
});
var _noop = require("./noop");
Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _noop[key]) return;
  exports[key] = _noop[key];
});
var _shallowEqual = require("./shallowEqual");
Object.keys(_shallowEqual).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _shallowEqual[key]) return;
  exports[key] = _shallowEqual[key];
});
var _PureComponent = require("./PureComponent");
Object.keys(_PureComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PureComponent[key]) return;
  exports[key] = _PureComponent[key];
});
const _isArr = Array.isArray,
  _getObjKeys = Object.keys,
  mathRound = Math.round,
  mathAbs = Math.abs;
const sign = x => (x > 0) - (x < 0);
exports.sign = sign;
const getClosestValue = (inputValue, currentValue) => {
  const values = _isArr(inputValue) ? inputValue : [inputValue],
    diff = values.map(each => each - currentValue).reduce((diff1, diff2) => mathAbs(diff1) < mathAbs(diff2) ? diff1 : diff2);
  return currentValue + diff;
};
exports.getClosestValue = getClosestValue;
const d3Window = node => node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
exports.d3Window = d3Window;
const MOUSEENTER = "mouseenter.interaction";
exports.MOUSEENTER = MOUSEENTER;
const MOUSELEAVE = "mouseleave.interaction";
exports.MOUSELEAVE = MOUSELEAVE;
const MOUSEMOVE = "mousemove.pan";
exports.MOUSEMOVE = MOUSEMOVE;
const MOUSEUP = "mouseup.pan";
exports.MOUSEUP = MOUSEUP;
const TOUCHMOVE = "touchmove.pan";
exports.TOUCHMOVE = TOUCHMOVE;
const TOUCHEND = "touchend.pan touchcancel.pan";
exports.TOUCHEND = TOUCHEND;
const WHEEL = "wheel";
exports.WHEEL = WHEEL;
const getTouchProps = touch => ({
  pageX: touch.pageX,
  pageY: touch.pageY,
  clientX: touch.clientX,
  clientY: touch.clientY
});
exports.getTouchProps = getTouchProps;
const isObject = d => d && typeof d === "object" && !_isArr(d);
exports.isObject = isObject;
const _crPosition = (eventOrTouchProps, rect, container) => [mathRound(eventOrTouchProps.clientX - rect.left - container.clientLeft), mathRound(eventOrTouchProps.clientY - rect.top - container.clientTop)];
const touchPosition = (touch, e) => {
  const container = e.currentTarget,
    rect = container.getBoundingClientRect();
  return _crPosition(touch, rect, container);
};
exports.touchPosition = touchPosition;
const mousePosition = (e, defaultRect) => {
  const container = e.currentTarget,
    rect = defaultRect != null ? defaultRect : container.getBoundingClientRect();
  return _crPosition(e, rect, container);
};
exports.mousePosition = mousePosition;
const clearCanvas = (canvasList, ratio) => {
  canvasList.forEach(each => {
    each.setTransform(1, 0, 0, 1, 0, 0);
    each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
    each.scale(ratio, ratio);
  });
};

// copied from https://github.com/lodash/lodash/blob/master/mapObject.js
exports.clearCanvas = clearCanvas;
const mapObject = function (object, iteratee) {
  if (object === void 0) {
    object = {};
  }
  if (iteratee === void 0) {
    iteratee = x => x;
  }
  const props = _getObjKeys(object),
    result = new Array(props.length);
  props.forEach((key, index) => {
    result[index] = iteratee(object[key], key, object);
  });
  return result;
};
exports.mapObject = mapObject;
//# sourceMappingURL=index.js.map