export {
  Component,
  createRef,
  createElement,
  createContext,
  cloneElement,
  forwardRef,
  memo,
  useContext,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useImperativeHandle
} from 'react';

export const getRefValue = ref => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}

export const getRefElementStyle = ref => {
  const _element = getRefValue(ref);
  return (_element && _element.style) || {};
};
