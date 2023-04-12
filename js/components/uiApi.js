"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.setRefValue = exports.memo = exports.getRefValue = exports.forwardRef = exports.createRef = exports.createElement = exports.createContext = exports.cloneElement = exports.Component = void 0;
var _react = require("react");
exports.Component = _react.Component;
exports.createRef = _react.createRef;
exports.createElement = _react.createElement;
exports.createContext = _react.createContext;
exports.cloneElement = _react.cloneElement;
exports.forwardRef = _react.forwardRef;
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
var getRefValue = function getRefValue(ref) {
  return (ref || {}).current;
};
exports.getRefValue = getRefValue;
var setRefValue = function setRefValue(ref, value) {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
//# sourceMappingURL=uiApi.js.map