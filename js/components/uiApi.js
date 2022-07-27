"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.memo = exports.getRefValue = exports.forwardRef = exports.cloneElement = void 0;

var _react = require("react");

exports.forwardRef = _react.forwardRef;
exports.memo = _react.memo;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useCallback = _react.useCallback;
exports.useEffect = _react.useEffect;
exports.useLayoutEffect = _react.useLayoutEffect;
exports.useImperativeHandle = _react.useImperativeHandle;
exports.cloneElement = _react.cloneElement;

var getRefValue = function getRefValue(ref) {
  return (ref || {}).current;
};

exports.getRefValue = getRefValue;
//# sourceMappingURL=uiApi.js.map