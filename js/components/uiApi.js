"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.setRefValue = exports.memo = exports.getRefValue = exports.getRefElementStyle = exports.getProps = exports.createRef = exports.createElement = exports.createContext = exports.cloneElement = exports.bindTo = exports.Component = exports.Children = void 0;
var _react = require("react");
exports.Component = _react.Component;
exports.Children = _react.Children;
exports.createRef = _react.createRef;
exports.createElement = _react.createElement;
exports.createContext = _react.createContext;
exports.cloneElement = _react.cloneElement;
exports.memo = _react.memo;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useEffect = _react.useEffect;
exports.useLayoutEffect = _react.useLayoutEffect;
exports.useImperativeHandle = _react.useImperativeHandle;
const getProps = (props, dfProps) => ({
  ...dfProps,
  ...props
});
exports.getProps = getProps;
const getRefValue = ref => (ref || {}).current;
exports.getRefValue = getRefValue;
const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
const getRefElementStyle = ref => {
  const _element = getRefValue(ref);
  return _element && _element.style || {};
};
exports.getRefElementStyle = getRefElementStyle;
const bindTo = function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return fn.bind(null, ...args);
};
exports.bindTo = bindTo;
//# sourceMappingURL=uiApi.js.map