"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
var _exportNames = {
  zipper: true,
  slidingWindow: true,
  identity: true,
  path: true,
  functor: true,
  isNotDefined: true,
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
  getTouchProps: true,
  isObject: true,
  touchPosition: true,
  mousePosition: true,
  clearCanvas: true,
  mapObject: true
};
exports.zipper = exports.touchPosition = exports.slidingWindow = exports.sign = exports.path = exports.mousePosition = exports.mapObject = exports.last = exports.isObject = exports.isNotDefined = exports.identity = exports.head = exports.getTouchProps = exports.getClosestValue = exports.functor = exports.first = exports.d3Window = exports.clearCanvas = exports.TOUCHMOVE = exports.TOUCHEND = exports.MOUSEUP = exports.MOUSEMOVE = exports.MOUSELEAVE = exports.MOUSEENTER = void 0;
var _zipper = _interopRequireDefault(require("../../utils/zipper"));
exports.zipper = _zipper["default"];
var _slidingWindow = _interopRequireDefault(require("../../utils/slidingWindow"));
exports.slidingWindow = _slidingWindow["default"];
var _identity = _interopRequireDefault(require("../../utils/identity"));
exports.identity = _identity["default"];
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
exports.isNotDefined = _utils.isNotDefined;
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
var _isArr = Array.isArray;
var sign = function sign(x) {
  return (x > 0) - (x < 0);
};
exports.sign = sign;
var getClosestValue = function getClosestValue(inputValue, currentValue) {
  var values = _isArr(inputValue) ? inputValue : [inputValue],
    diff = values.map(function (each) {
      return each - currentValue;
    }).reduce(function (diff1, diff2) {
      return Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2;
    });
  return currentValue + diff;
};
exports.getClosestValue = getClosestValue;
var d3Window = function d3Window(node) {
  return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
};
exports.d3Window = d3Window;
var MOUSEENTER = "mouseenter.interaction";
exports.MOUSEENTER = MOUSEENTER;
var MOUSELEAVE = "mouseleave.interaction";
exports.MOUSELEAVE = MOUSELEAVE;
var MOUSEMOVE = "mousemove.pan";
exports.MOUSEMOVE = MOUSEMOVE;
var MOUSEUP = "mouseup.pan";
exports.MOUSEUP = MOUSEUP;
var TOUCHMOVE = "touchmove.pan";
exports.TOUCHMOVE = TOUCHMOVE;
var TOUCHEND = "touchend.pan touchcancel.pan";
exports.TOUCHEND = TOUCHEND;
var getTouchProps = function getTouchProps(touch) {
  return {
    pageX: touch.pageX,
    pageY: touch.pageY,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
};
exports.getTouchProps = getTouchProps;
var isObject = function isObject(d) {
  return d && typeof d === "object" && !_isArr(d);
};
exports.isObject = isObject;
var _crPosition = function _crPosition(eventOrTouchProps, rect, container) {
  return [Math.round(eventOrTouchProps.clientX - rect.left - container.clientLeft), Math.round(eventOrTouchProps.clientY - rect.top - container.clientTop)];
};
var touchPosition = function touchPosition(touch, e) {
  var container = e.currentTarget,
    rect = container.getBoundingClientRect();
  return _crPosition(touch, rect, container);
};
exports.touchPosition = touchPosition;
var mousePosition = function mousePosition(e, defaultRect) {
  var container = e.currentTarget,
    rect = defaultRect != null ? defaultRect : container.getBoundingClientRect();
  return _crPosition(e, rect, container);
};
exports.mousePosition = mousePosition;
var clearCanvas = function clearCanvas(canvasList, ratio) {
  canvasList.forEach(function (each) {
    each.setTransform(1, 0, 0, 1, 0, 0);
    each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
    each.scale(ratio, ratio);
  });
};

// copied from https://github.com/lodash/lodash/blob/master/mapObject.js
exports.clearCanvas = clearCanvas;
var mapObject = function mapObject(object, iteratee) {
  if (object === void 0) {
    object = {};
  }
  if (iteratee === void 0) {
    iteratee = function iteratee(x) {
      return x;
    };
  }
  var props = Object.keys(object),
    result = new Array(props.length);
  props.forEach(function (key, index) {
    result[index] = iteratee(object[key], key, object);
  });
  return result;
};
exports.mapObject = mapObject;
//# sourceMappingURL=index.js.map