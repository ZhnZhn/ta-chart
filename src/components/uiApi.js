export {
  Component,
  Children,
  createRef,
  createElement,
  createContext,
  cloneElement,
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

export const getProps = (
  props,
  dfProps
) => ({
  ...dfProps,
  ...props
})

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

export const bindTo = (
  fn,
  ...args
) => fn.bind(null, ...args)
